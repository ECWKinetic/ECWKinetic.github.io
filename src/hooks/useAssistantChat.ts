import { useState, useCallback, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  files?: Array<{ id: string; name: string }>;
}

export interface UploadedFile {
  id: string;
  name: string;
}

export interface FormData {
  name: string;
  email: string;
  type: 'candidate' | 'projectlead';
  sessionId: string;
  companyName?: string;
  phone?: string;
}

export const useAssistantChat = (formData: FormData) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const messageCountRef = useRef(0);

  // 5-minute inactivity timeout
  useEffect(() => {
    if (isCompleted) return;

    const checkInactivity = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivityTime;
      const fiveMinutes = 5 * 60 * 1000;

      if (timeSinceLastActivity >= fiveMinutes && messages.length > 0) {
        console.log('5-minute inactivity timeout reached');
        handleTimeout();
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(checkInactivity);
  }, [lastActivityTime, isCompleted, messages.length]);

  const uploadFile = useCallback(async (file: File): Promise<UploadedFile> => {
    setUploadingFiles(true);
    try {
      const fileReader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.onerror = reject;
        fileReader.readAsDataURL(file);
      });

      const base64Data = await base64Promise;

      const { data, error } = await supabase.functions.invoke('openai-assistant-chat', {
        body: {
          action: 'upload_file',
          fileData: base64Data,
          fileName: file.name,
          fileType: file.type,
          formData,
        },
      });

      if (error) throw error;

      return {
        id: data.fileId,
        name: data.fileName,
      };
    } finally {
      setUploadingFiles(false);
    }
  }, [formData]);

  const sendMessage = useCallback(async (content: string, fileIds?: string[], files?: UploadedFile[]) => {
    if (isCompleted) return;

    // Add user message to UI
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
      files: files,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setLastActivityTime(Date.now());
    messageCountRef.current += 1;

    try {
      const { data, error } = await supabase.functions.invoke('openai-assistant-chat', {
        body: {
          action: 'message',
          threadId,
          message: content,
          formData,
          messageCount: messageCountRef.current,
          fileIds: fileIds || [],
        },
      });

      if (error) throw error;

      if (data.completed) {
        // Conversation is complete
        const completionMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: data.message,
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, completionMessage]);
        setIsCompleted(true);
      } else {
        // Add assistant response
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: data.message,
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, assistantMessage]);
        
        if (!threadId && data.threadId) {
          setThreadId(data.threadId);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [threadId, formData, isCompleted]);

  const startConversation = useCallback(async () => {
    setIsLoading(true);
    setLastActivityTime(Date.now());

    try {
      const initialMessage = `Hello! I'm here to help with your ${formData.type === 'candidate' ? 'career' : 'project'} inquiry.`;
      
      const { data, error } = await supabase.functions.invoke('openai-assistant-chat', {
        body: {
          action: 'start',
          message: `New ${formData.type} inquiry from ${formData.name} (${formData.email})${formData.companyName ? ` at ${formData.companyName}` : ''}.`,
          formData,
          messageCount: 0,
        },
      });

      if (error) throw error;

      const welcomeMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.message || initialMessage,
        timestamp: new Date().toISOString(),
      };

      setMessages([welcomeMessage]);
      setThreadId(data.threadId);
    } catch (error) {
      console.error('Error starting conversation:', error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I had trouble starting the conversation. Please try refreshing the page.',
        timestamp: new Date().toISOString(),
      };
      setMessages([errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  const handleClose = useCallback(async () => {
    if (isCompleted) return;

    try {
      await supabase.functions.invoke('openai-assistant-chat', {
        body: {
          action: 'close',
          threadId,
          formData,
          messageCount: messageCountRef.current,
        },
      });
    } catch (error) {
      console.error('Error handling close:', error);
    }
  }, [threadId, formData, isCompleted]);

  const handleTimeout = useCallback(async () => {
    if (isCompleted) return;

    setIsCompleted(true);
    
    try {
      await supabase.functions.invoke('openai-assistant-chat', {
        body: {
          action: 'timeout',
          threadId,
          formData,
          messageCount: messageCountRef.current,
        },
      });

      const timeoutMessage: ChatMessage = {
        id: `system-${Date.now()}`,
        role: 'assistant',
        content: 'This conversation has been automatically closed due to inactivity. Your information has been saved and someone will follow up with you soon.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, timeoutMessage]);
    } catch (error) {
      console.error('Error handling timeout:', error);
    }
  }, [threadId, formData, isCompleted]);

  return {
    messages,
    isLoading,
    isCompleted,
    uploadingFiles,
    sendMessage,
    uploadFile,
    startConversation,
    handleClose,
  };
};
