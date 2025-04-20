
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ChrisHussPage from "./pages/ChrisHussPage";
import DaleCabreiraPage from "./pages/DaleCabreiraPage";
import EricWestPage from "./pages/EricWestPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
