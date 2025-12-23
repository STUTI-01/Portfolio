import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profilePhoto from "@/assets/profile-photo.png";

interface CinematicLoaderProps {
  onComplete: () => void;
}

const CinematicLoader = ({ onComplete }: CinematicLoaderProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Preload profile photo during loader
    const img = new Image();
    img.src = profilePhoto;

    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 2200),
      setTimeout(() => setPhase(3), 3200),
      setTimeout(() => onComplete(), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  My world has different stories.
                </motion.span>
              </h1>

              {phase >= 2 && (
                <motion.p
                  className="mt-6 text-lg md:text-xl text-muted-foreground tracking-widest uppercase font-mono"
                  initial={{ opacity: 0, letterSpacing: "0.5em" }}
                  animate={{ opacity: 1, letterSpacing: "0.3em" }}
                  transition={{ duration: 0.8 }}
                >
                  Choose yours.
                </motion.p>
              )}
            </motion.div>
          </div>

          {/* Ambient glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={phase >= 1 ? { opacity: 0.4 } : {}}
            transition={{ duration: 2 }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px]"
              style={{ background: "radial-gradient(circle, hsl(var(--secondary) / 0.15), hsl(var(--primary) / 0.08), transparent)" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicLoader;
