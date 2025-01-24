import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Bienestar from "./pages/Bienestar";
import Diario from "./pages/Diario";
import Tests from "./pages/Tests";
import BottomNav from "./components/BottomNav";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/bienestar" element={<Bienestar />} />
          <Route path="/diario" element={<Diario />} />
          <Route path="/tests" element={<Tests />} />
        </Routes>
        <BottomNav />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;