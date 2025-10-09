import { useEffect, useRef } from 'react';
import '@n8n/chat/style.css';
import './chat-styles.css';
import { createChat } from '@n8n/chat';

const N8nChatWidget = () => {
  const chatRef = useRef<HTMLDivElement>(null);
  const chatInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!chatRef.current) return;

    const chat = createChat({
      webhookUrl: 'https://kineticconsulting.app.n8n.cloud/webhook/3d53ee8c-386f-4d74-aac5-f452fc26bf0d/chat',
      webhookConfig: {
        method: 'POST',
        headers: {},
      },
      target: chatRef.current,
      mode: 'window',
      showWelcomeScreen: false,
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      initialMessages: [
        "Hi, I'm Ken - KCP's AI Agent"
      ],
      i18n: {
        en: {
          title: 'Chat with Ken',
          subtitle: '',
          footer: '',
          getStarted: '',
          inputPlaceholder: 'Type your message...',
          closeButtonTooltip: 'Close',
        },
      },
    });

    chatInstanceRef.current = chat;

    // Listen for custom events to open chat with context
    const handleOpenChat = (event: CustomEvent) => {
      const { detail } = event;
      if (detail && chatInstanceRef.current) {
        // Open the chat widget
        const chatWindow = chatRef.current?.querySelector('.chat-window');
        if (chatWindow) {
          (chatWindow as HTMLElement).style.display = 'flex';
        }
        
        // Send initial context message
        const contextMessage = `New ${detail.type} submission:\nName: ${detail.name}\nEmail: ${detail.email}${detail.companyName ? `\nCompany: ${detail.companyName}` : ''}${detail.phone ? `\nPhone: ${detail.phone}` : ''}\nSession ID: ${detail.sessionId}`;
        
        // You can send this via the chat if the API supports it
        console.log('Context:', contextMessage);
      }
    };

    window.addEventListener('openN8nChat', handleOpenChat as EventListener);

    return () => {
      window.removeEventListener('openN8nChat', handleOpenChat as EventListener);
    };
  }, []);

  return <div ref={chatRef} className="n8n-chat-widget" />;
};

export default N8nChatWidget;
