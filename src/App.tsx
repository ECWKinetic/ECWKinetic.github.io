import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AssistantChatWidget from "@/components/chat/AssistantChatWidget";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ChrisHussPage from "./pages/ChrisHussPage";
import DaleCabreiraPage from "./pages/DaleCabreiraPage";
import EricWestPage from "./pages/EricWestPage";
import LoginPage from "./pages/LoginPage";
import EmailSentPage from "./pages/EmailSentPage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import TalentNetworkPage from "./pages/TalentNetworkPage";
import ProjectBriefPage from "./pages/ProjectBriefPage";
import SetupProfilePage from "./pages/SetupProfilePage";
import SelectRolePage from "./pages/SelectRolePage";

const queryClient = new QueryClient();

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/login/email-sent" element={<EmailSentPage />} />
              <Route path="/auth/callback" element={<AuthCallbackPage />} />
              <Route path="/setup-profile" element={<SetupProfilePage />} />
              <Route path="/select-role" element={<SelectRolePage />} />
              <Route 
                path="/talent-network" 
                element={
                  <ProtectedRoute requiredProfileType="talent">
                    <TalentNetworkPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/project-brief" 
                element={
                  <ProtectedRoute requiredProfileType="customer">
                    <ProjectBriefPage />
                  </ProtectedRoute>
                } 
              />
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
          <AssistantChatWidget />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
