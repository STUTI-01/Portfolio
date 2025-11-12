import { useState, useCallback } from "react";
import CinematicLoader from "@/components/CinematicLoader";
import HeroSection from "@/components/HeroSection";
import ProfileSelector from "@/components/ProfileSelector";
import { motion } from "framer-motion";

const Index = () => {
  const [loaderDone, setLoaderDone] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {!loaderDone && <CinematicLoader onComplete={handleLoaderComplete} />}

      {loaderDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection />

          {/* Divider */}
          <div className="max-w-7xl mx-auto px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          <ProfileSelector />
        </motion.div>
      )}
    </div>
  );
};

export default Index;
