import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profilePhoto from "@/assets/profile-photo.png";

interface CinematicLoaderProps {
  onComplete: () => void;
}

const CinematicLoader = ({ onComplete }: CinematicLoaderProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.src = profilePhoto;

    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 3000),
      setTimeout(() => setPhase(3), 4800),
      setTimeout(() => onComplete(), 5600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Animated grid lines */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.04 }}
            transition={{ duration: 2 }}
            style={{
              backgroundImage: `linear-gradient(hsla(217, 91%, 60%, 0.5) 1px, transparent 1px), linear-gradient(90deg, hsla(217, 91%, 60%, 0.5) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-[1px] pointer-events-none z-10"
            style={{
              background: "linear-gradient(90deg, transparent, hsla(217, 91%, 60%, 0.3), transparent)",
              boxShadow: "0 0 30px 10px hsla(217, 91%, 60%, 0.08)",
            }}
            initial={{ top: "-5%" }}
            animate={{ top: "105%" }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          />

          {/* Pulsing corner accents */}
          <motion.div
            className="absolute top-12 left-12 w-16 h-16 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-secondary to-transparent" />
            <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-secondary to-transparent" />
          </motion.div>
          <motion.div
            className="absolute bottom-12 right-12 w-16 h-16 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          >
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-secondary to-transparent" />
            <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-secondary to-transparent" />
          </motion.div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-secondary/40 pointer-events-none"
              style={{
                left: `${15 + i * 14}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}

          {/* Ambient glow - blue */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={phase >= 1 ? { opacity: 0.5 } : {}}
            transition={{ duration: 2.5 }}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
              style={{ background: "radial-gradient(circle, hsla(217, 91%, 60%, 0.12), hsla(217, 91%, 60%, 0.04), transparent)" }}
            />
          </motion.div>

          {/* Second glow - golden accent */}
          <motion.div
            className="absolute pointer-events-none"
            style={{ top: "30%", right: "20%" }}
            initial={{ opacity: 0 }}
            animate={phase >= 1 ? { opacity: [0, 0.3, 0.15] } : {}}
            transition={{ duration: 3, delay: 0.5 }}
          >
            <div
              className="w-[300px] h-[300px] rounded-full blur-[120px]"
              style={{ background: "radial-gradient(circle, hsla(45, 97%, 64%, 0.08), transparent)" }}
            />
          </motion.div>

          {/* Content */}
          <div className="relative text-center z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Decorative line above text */}
              <motion.div
                className="w-12 h-[1px] mx-auto mb-8 bg-gradient-to-r from-transparent via-secondary to-transparent"
                initial={{ scaleX: 0 }}
                animate={phase >= 1 ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
              />

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
                {"My world has different stories.".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-[0.3em]"
                    initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
                    animate={phase >= 1 ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{
                      duration: 0.7,
                      delay: 0.2 + i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              {phase >= 2 && (
                <>
                  <motion.div
                    className="w-8 h-[1px] mx-auto mt-8 mb-6 bg-gradient-to-r from-transparent via-name-highlight to-transparent"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.p
                    className="text-lg md:text-xl text-muted-foreground tracking-widest uppercase font-mono"
                    initial={{ opacity: 0, letterSpacing: "0.6em" }}
                    animate={{ opacity: 1, letterSpacing: "0.3em" }}
                    transition={{ duration: 1 }}
                  >
                    Choose yours.
                  </motion.p>
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicLoader;
