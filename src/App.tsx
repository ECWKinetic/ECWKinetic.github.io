
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ChrisHussPage from "./pages/ChrisHussPage";
import DaleCabreiraPage from "./pages/DaleCabreiraPage";
import EricWestPage from "./pages/EricWestPage";
import ScrollToTop from "./components/ScrollToTop";
import ChatWidget from "./components/chat/ChatWidget";

const queryClient = new QueryClient();

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatContext, setChatContext] = useState<any>(null);
  const [initialMessage, setInitialMessage] = useState<string | null>(null);

  useEffect(() => {
    // Subscribe to chat trigger events from n8n
    const channel = supabase.channel('chat-triggers');
    
    channel
      .on('broadcast', { event: 'open-chat' }, (payload) => {
        console.log('Received chat trigger:', payload);
        setChatContext(payload.payload.context);
        setInitialMessage(payload.payload.initialMessage);
        setIsChatOpen(true);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setChatContext(null);
    setInitialMessage(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<NotFound />} />
            <Route path="/approach" element={<NotFound />} />
            <Route path="/industries" element={<NotFound />} />
            <Route path="/team" element={<NotFound />} />
            <Route path="/contact" element={<NotFound />} />
            <Route path="/profile/chris-huss" element={<ChrisHussPage />} />
            <Route path="/profile/dale-cabreira" element={<DaleCabreiraPage />} />
            <Route path="/profile/eric-west" element={<EricWestPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        
        {/* Global ChatWidget triggered by n8n */}
        <ChatWidget
          isOpen={isChatOpen}
          onClose={handleCloseChat}
          webhookUrl="https://kineticconsulting.app.n8n.cloud/webhook-test/73768bb4-7a6e-4ae4-9b08-d0679279f69f"
          initialContext={chatContext}
          initialBotMessage={initialMessage}
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
