import { useEffect, useState, useRef } from 'react';
import { X, Minimize2, Send, Loader2, Paperclip, FileText, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAssistantChat, FormData, UploadedFile } from '@/hooks/useAssistantChat';
import { formatTimestamp, validateFileType, validateFileSize, formatFileSize } from '@/utils/assistantChatHelpers';
import { useToast } from '@/hooks/use-toast';

const AssistantChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const {
    messages,
    isLoading,
    isCompleted,
    uploadingFiles,
    sendMessage,
    uploadFile,
    startConversation,
    handleClose,
  } = useAssistantChat(formData || {
    name: '',
    email: '',
    type: 'candidate',
    sessionId: '',
  });

  // Listen for form submission events
  useEffect(() => {
    const handleOpenChat = (event: CustomEvent) => {
      const { detail } = event;
      if (detail) {
        const data: FormData = {
          name: detail.name,
          email: detail.email,
          type: detail.type,
          sessionId: detail.sessionId,
          companyName: detail.companyName,
          phone: detail.phone,
        };
        setFormData(data);
        setIsOpen(true);
        setIsMinimized(false);
      }
    };

    window.addEventListener('openN8nChat', handleOpenChat as EventListener);

    return () => {
      window.removeEventListener('openN8nChat', handleOpenChat as EventListener);
    };
  }, []);

  // Start conversation when chat opens
  useEffect(() => {
    if (isOpen && formData && messages.length === 0) {
      startConversation();
    }
  }, [isOpen, formData, messages.length, startConversation]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Handle window close
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isOpen && !isCompleted) {
        handleClose();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isOpen, isCompleted, handleClose]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    const validFiles: File[] = [];
    for (const file of files) {
      if (!validateFileType(file)) {
        toast({
          title: "Unsupported file type",
          description: `${file.name} is not a supported file type. Please use PDF, DOC, DOCX, TXT, MD, JSON, or CSV.`,
          variant: "destructive",
        });
        continue;
      }
      
      if (!validateFileSize(file)) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 20MB limit.`,
          variant: "destructive",
        });
        continue;
      }
      
      validFiles.push(file);
    }
    
    setSelectedFiles(prev => [...prev, ...validFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = async () => {
    if ((!inputValue.trim() && selectedFiles.length === 0) || isLoading || isCompleted || uploadingFiles) return;

    try {
      // Upload files first if any
      const fileIds: string[] = [];
      const files: UploadedFile[] = [];
      
      for (const file of selectedFiles) {
        const uploaded = await uploadFile(file);
        fileIds.push(uploaded.id);
        files.push(uploaded);
      }

      // Send message with file IDs
      await sendMessage(inputValue || '(attached files)', fileIds, files);
      setInputValue('');
      setSelectedFiles([]);
      setUploadedFiles([]);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload files. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCloseChat = () => {
    handleClose();
    setIsOpen(false);
    setFormData(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        isMinimized ? 'w-80 h-14' : 'w-96 h-[600px]'
      }`}
    >
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="bg-kinetic-navy text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <h3 className="font-semibold">
              {formData?.type === 'candidate' ? 'Talent Network Chat' : 'Client Inquiry Chat'}
            </h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="hover:bg-white/10 p-1 rounded transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleCloseChat}
              className="hover:bg-white/10 p-1 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages Area */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                     <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-kinetic-navy text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                      {message.files && message.files.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {message.files.map((file, idx) => (
                            <div key={idx} className="flex items-center gap-1 text-xs opacity-90">
                              <FileText className="w-3 h-3" />
                              <span>{file.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <span className="text-xs opacity-70 mt-1 block">
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <Loader2 className="w-5 h-5 animate-spin text-kinetic-navy" />
                    </div>
                  </div>
                )}

                {isCompleted && (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">
                      This conversation has ended. Someone will follow up with you soon.
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
              {!isCompleted ? (
                <div className="space-y-2">
                  {/* Selected Files Preview */}
                  {selectedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1 text-xs"
                        >
                          <FileText className="w-3 h-3" />
                          <span className="max-w-[120px] truncate">{file.name}</span>
                          <span className="text-gray-500">({formatFileSize(file.size)})</span>
                          <button
                            onClick={() => handleRemoveFile(index)}
                            className="hover:text-red-600"
                          >
                            <XCircle className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Message Input */}
                  <div className="flex gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt,.md,.json,.csv"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isLoading || uploadingFiles}
                      variant="outline"
                      size="icon"
                      className="shrink-0"
                    >
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      disabled={isLoading || uploadingFiles}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={isLoading || uploadingFiles || (!inputValue.trim() && selectedFiles.length === 0)}
                      className="bg-kinetic-navy hover:bg-kinetic-navy/90"
                    >
                      {uploadingFiles ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={handleCloseChat}
                  className="w-full bg-kinetic-navy hover:bg-kinetic-navy/90"
                >
                  Close Chat
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AssistantChatWidget;
