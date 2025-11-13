import { useState, useCallback } from 'react';
import { Upload, FileText, X, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ResumeUploadSectionProps {
  onParsed: (data: any) => void;
  currentResumeUrl?: string;
}

export const ResumeUploadSection = ({ onParsed, currentResumeUrl }: ResumeUploadSectionProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  }, []);

  const handleFileSelect = (selectedFile: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(selectedFile.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF or DOCX file.',
        variant: 'destructive',
      });
      return;
    }

    if (selectedFile.size > maxSize) {
      toast({
        title: 'File too large',
        description: 'Please upload a file smaller than 10MB.',
        variant: 'destructive',
      });
      return;
    }

    setFile(selectedFile);
  };

  const handleUploadAndParse = async () => {
    if (!file || !user) return;

    setIsUploading(true);
    setIsParsing(true);

    try {
      // Upload to storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('talent-resumes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      setIsUploading(false);

      toast({
        title: 'Resume uploaded',
        description: 'Parsing your resume with AI...',
      });

      // Call parse function
      const { data: parseData, error: parseError } = await supabase.functions.invoke('parse-resume', {
        body: { filePath }
      });

      if (parseError) throw parseError;

      setIsParsing(false);

      toast({
        title: 'Resume parsed successfully',
        description: 'Your information has been pre-filled.',
      });

      // Pass parsed data to parent
      onParsed({
        ...parseData,
        resume_url: filePath
      });

    } catch (error) {
      console.error('Error uploading/parsing resume:', error);
      setIsUploading(false);
      setIsParsing(false);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to process resume',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <Card className="p-6 border-2 border-dashed border-border/50 bg-background/50">
      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center py-12 transition-colors ${
            isDragging ? 'bg-primary/5' : ''
          }`}
        >
          <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2 text-foreground">Upload Your Resume</h3>
          <p className="text-sm text-muted-foreground mb-4 text-center max-w-sm">
            Upload your resume to pre-fill your information automatically
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>AI-powered parsing</span>
          </div>
          <label htmlFor="resume-upload">
            <Button type="button" variant="outline" asChild>
              <span className="cursor-pointer">
                Choose File
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.docx"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                  className="hidden"
                />
              </span>
            </Button>
          </label>
          <p className="text-xs text-muted-foreground mt-4">PDF or DOCX • Max 10MB</p>
          {currentResumeUrl && (
            <p className="text-xs text-primary mt-2">Current resume on file</p>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center py-6">
          <FileText className="w-12 h-12 mb-4 text-primary" />
          <p className="text-sm font-medium mb-1 text-foreground">{file.name}</p>
          <p className="text-xs text-muted-foreground mb-4">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
          <div className="flex gap-2">
            <Button
              onClick={handleUploadAndParse}
              disabled={isUploading || isParsing}
              className="gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : isParsing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Parsing with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Upload & Parse
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={handleRemoveFile}
              disabled={isUploading || isParsing}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
