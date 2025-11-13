import { Card, CardContent } from '@/components/ui/card';
import { ResumeUploadSection } from '@/components/talent/ResumeUploadSection';
import { TalentProfileData } from '@/types/talentProfile';

interface Step1ResumeProps {
  data: TalentProfileData;
  onResumeDataParsed: (parsedData: any, filePath: string) => void;
}

export const Step1Resume = ({ data, onResumeDataParsed }: Step1ResumeProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">Upload Your Resume</h2>
            <p className="text-muted-foreground mt-1">
              Our AI will automatically extract and pre-fill your information
            </p>
          </div>

          <ResumeUploadSection onResumeDataParsed={onResumeDataParsed} />

          <div className="bg-muted/30 rounded-lg p-4 mt-6">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Tip:</strong> Upload your resume to save time! Our AI will automatically fill out
              most fields. You can review and edit everything in the following steps.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
