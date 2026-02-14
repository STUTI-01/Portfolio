import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { usePageTracker } from "./hooks/usePageTracker";
import Index from "./pages/Index";
import RecruiterMode from "./pages/RecruiterMode";
import WandererMode from "./pages/WandererMode";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import AdornmentArchive from "./pages/wanderer/AdornmentArchive";
import AdornmentDetail from "./pages/wanderer/AdornmentDetail";
import VerseVault from "./pages/wanderer/VerseVault";
import ThroughMyLens from "./pages/wanderer/ThroughMyLens";
import GalleryDetail from "./pages/wanderer/GalleryDetail";
import ThoughtObservatory from "./pages/wanderer/ThoughtObservatory";
import ThoughtDetail from "./pages/wanderer/ThoughtDetail";
import FieldNotes from "./pages/wanderer/FieldNotes";
import BirdDetail from "./pages/wanderer/BirdDetail";

const queryClient = new QueryClient();

const PageTracker = () => {
  usePageTracker();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <PageTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/recruiter" element={<RecruiterMode />} />
          <Route path="/wanderer" element={<WandererMode />} />
          <Route path="/wanderer/adornments" element={<AdornmentArchive />} />
          <Route path="/wanderer/adornments/:id" element={<AdornmentDetail />} />
          <Route path="/wanderer/poetry" element={<VerseVault />} />
          <Route path="/wanderer/gallery" element={<ThroughMyLens />} />
          <Route path="/wanderer/gallery/:id" element={<GalleryDetail />} />
          <Route path="/wanderer/thoughts" element={<ThoughtObservatory />} />
          <Route path="/wanderer/thoughts/:id" element={<ThoughtDetail />} />
          <Route path="/wanderer/birds" element={<FieldNotes />} />
          <Route path="/wanderer/birds/:id" element={<BirdDetail />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
