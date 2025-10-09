import { useEffect, useRef } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

interface N8nChatProps {
  webhookUrl: string;
  initialMessages?: string[];
  metadata?: Record<string, any>;
  onChatCreated?: (chat: any) => void;
}

export const N8nChat = ({ webhookUrl, initialMessages, metadata, onChatCreated }: N8nChatProps) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const chatInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!chatRef.current) return;

    const chat = createChat({
      webhookUrl,
      webhookConfig: {
        method: 'POST',
        headers: {},
      },
      target: chatRef.current,
      mode: 'window',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      metadata,
      initialMessages,
    });

    chatInstanceRef.current = chat;
    onChatCreated?.(chat);

    return () => {
      // Cleanup if needed
    };
  }, [webhookUrl, initialMessages, metadata, onChatCreated]);

  return <div ref={chatRef} className="n8n-chat-container" />;
};

export default N8nChat;
