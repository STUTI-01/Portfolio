import { useState, useCallback } from "react";
import CinematicLoader from "@/components/CinematicLoader";
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
          transition={{ duration: 0.6 }}
        >
          <ProfileSelector />
        </motion.div>
      )}
    </div>
  );
};

export default Index;
