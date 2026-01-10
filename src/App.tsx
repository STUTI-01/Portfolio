import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RecruiterMode from "./pages/RecruiterMode";
import WandererMode from "./pages/WandererMode";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import AdornmentArchive from "./pages/wanderer/AdornmentArchive";
import VerseVault from "./pages/wanderer/VerseVault";
import ThroughMyLens from "./pages/wanderer/ThroughMyLens";
import ThoughtObservatory from "./pages/wanderer/ThoughtObservatory";
import FieldNotes from "./pages/wanderer/FieldNotes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/recruiter" element={<RecruiterMode />} />
          <Route path="/wanderer" element={<WandererMode />} />
          <Route path="/wanderer/adornments" element={<AdornmentArchive />} />
          <Route path="/wanderer/poetry" element={<VerseVault />} />
          <Route path="/wanderer/gallery" element={<ThroughMyLens />} />
          <Route path="/wanderer/thoughts" element={<ThoughtObservatory />} />
          <Route path="/wanderer/birds" element={<FieldNotes />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
