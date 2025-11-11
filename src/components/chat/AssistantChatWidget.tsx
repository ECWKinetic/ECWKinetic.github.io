import { useEffect, useState, useRef } from 'react';
import { X, Minimize2, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAssistantChat, FormData } from '@/hooks/useAssistantChat';
import { formatTimestamp } from '@/utils/assistantChatHelpers';

const AssistantChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isLoading,
    isCompleted,
    sendMessage,
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

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading || isCompleted) return;

    sendMessage(inputValue);
    setInputValue('');
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
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    className="bg-kinetic-navy hover:bg-kinetic-navy/90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
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
