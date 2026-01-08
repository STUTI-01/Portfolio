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
      setTimeout(() => setPhase(2), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleChooseClick = () => {
    setPhase(3);
    setTimeout(() => onComplete(), 800);
  };

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

          {/* Earth Glow Arc — full-width curved line below content */}
          <div className="absolute left-0 right-0 bottom-[22%] h-[120px] md:h-[160px] pointer-events-none z-10">
            <svg
              viewBox="0 0 1200 160"
              fill="none"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="arcGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsla(217, 91%, 60%, 0)" />
                  <stop offset="15%" stopColor="hsla(217, 91%, 60%, 0.3)" />
                  <stop offset="50%" stopColor="hsla(45, 97%, 64%, 0.5)" />
                  <stop offset="85%" stopColor="hsla(217, 91%, 60%, 0.3)" />
                  <stop offset="100%" stopColor="hsla(217, 91%, 60%, 0)" />
                </linearGradient>
                <filter id="arcBlur">
                  <feGaussianBlur stdDeviation="4" />
                </filter>
                <filter id="sparkGlow">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
              </defs>

              {/* Soft outer glow */}
              <motion.path
                d="M 0 150 Q 600 -30 1200 150"
                stroke="url(#arcGlow)"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
                filter="url(#arcBlur)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={phase >= 1 ? { pathLength: 1, opacity: 0.5 } : {}}
                transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
              />

              {/* Main arc line */}
              <motion.path
                d="M 0 150 Q 600 -30 1200 150"
                stroke="url(#arcGlow)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={phase >= 1 ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
              />

              {/* Traveling spark — goes once left to right then stops */}
              {phase >= 1 && (
                <>
                  <motion.circle
                    r="5"
                    fill="white"
                    filter="url(#sparkGlow)"
                    style={{
                      offsetPath: `path("M 0 150 Q 600 -30 1200 150")`,
                      offsetRotate: "0deg",
                    }}
                    initial={{ offsetDistance: "0%", opacity: 0 }}
                    animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0.8] }}
                    transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
                  />
                  <motion.circle
                    r="2.5"
                    fill="hsla(45, 97%, 74%, 1)"
                    style={{
                      offsetPath: `path("M 0 150 Q 600 -30 1200 150")`,
                      offsetRotate: "0deg",
                    }}
                    initial={{ offsetDistance: "0%", opacity: 0 }}
                    animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
                  />
                </>
              )}
            </svg>
          </div>

          {/* Content */}
          <div className="relative text-center z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
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
                <motion.button
                  onClick={handleChooseClick}
                  className="mt-10 cursor-pointer bg-transparent border-none outline-none group"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.p
                    className="text-lg md:text-2xl tracking-widest uppercase font-mono"
                    initial={{ 
                      opacity: 0, 
                      letterSpacing: "0.6em",
                      color: "hsla(0, 0%, 50%, 1)",
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: 1,
                      letterSpacing: "0.3em",
                      color: "hsla(217, 91%, 70%, 1)",
                      scale: 1,
                    }}
                    transition={{
                      opacity: { duration: 0.6 },
                      letterSpacing: { duration: 1.2 },
                      color: { duration: 2.5, ease: "easeOut" },
                      scale: { duration: 2.5, ease: "easeOut" },
                    }}
                    whileHover={{
                      scale: 1.08,
                      textShadow: "0 0 24px hsla(217, 91%, 70%, 0.5)",
                    }}
                  >
                    Choose yours.
                  </motion.p>
                  <motion.div
                    className="w-16 h-[1px] mx-auto mt-3"
                    style={{
                      background: "linear-gradient(90deg, transparent, hsla(217, 91%, 70%, 0.6), transparent)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </motion.button>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicLoader;
