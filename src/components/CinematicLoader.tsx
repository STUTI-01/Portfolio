import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profilePhoto from "@/assets/profile-pic.jpg";

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
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background: "radial-gradient(ellipse 120% 80% at 50% 40%, hsla(217, 91%, 8%, 1), hsla(220, 30%, 4%, 1))",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Subtle noise texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          {/* Animated grid lines */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            transition={{ duration: 2 }}
            style={{
              backgroundImage: `linear-gradient(hsla(217, 91%, 60%, 0.4) 1px, transparent 1px), linear-gradient(90deg, hsla(217, 91%, 60%, 0.4) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Pulsing corner accents */}
          <motion.div
            className="absolute top-8 left-8 sm:top-12 sm:left-12 w-12 h-12 sm:w-16 sm:h-16 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-secondary to-transparent" />
            <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-secondary to-transparent" />
          </motion.div>
          <motion.div
            className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 w-12 h-12 sm:w-16 sm:h-16 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          >
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-secondary to-transparent" />
            <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-secondary to-transparent" />
          </motion.div>

          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-secondary/30 pointer-events-none"
              style={{
                left: `${10 + i * 11}%`,
                top: `${15 + (i % 4) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.5, 0.1],
              }}
              transition={{
                duration: 4 + i * 0.6,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}

          {/* Ambient glow - deep blue */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={phase >= 1 ? { opacity: 0.6 } : {}}
            transition={{ duration: 2.5 }}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full blur-[180px]"
              style={{ background: "radial-gradient(circle, hsla(217, 91%, 60%, 0.15), hsla(217, 91%, 60%, 0.05), transparent)" }}
            />
          </motion.div>

          {/* Second glow - warm golden accent */}
          <motion.div
            className="absolute pointer-events-none"
            style={{ top: "25%", right: "15%" }}
            initial={{ opacity: 0 }}
            animate={phase >= 1 ? { opacity: [0, 0.4, 0.2] } : {}}
            transition={{ duration: 3, delay: 0.5 }}
          >
            <div
              className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] rounded-full blur-[140px]"
              style={{ background: "radial-gradient(circle, hsla(45, 97%, 64%, 0.1), transparent)" }}
            />
          </motion.div>

          {/* Third glow - subtle purple bottom-left */}
          <motion.div
            className="absolute pointer-events-none"
            style={{ bottom: "20%", left: "10%" }}
            initial={{ opacity: 0 }}
            animate={phase >= 1 ? { opacity: [0, 0.25, 0.12] } : {}}
            transition={{ duration: 4, delay: 1 }}
          >
            <div
              className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full blur-[120px]"
              style={{ background: "radial-gradient(circle, hsla(260, 70%, 50%, 0.08), transparent)" }}
            />
          </motion.div>

          {/* Earth Glow Arc */}
          <div className="absolute left-0 right-0 bottom-[18%] sm:bottom-[22%] h-[100px] sm:h-[120px] md:h-[160px] pointer-events-none z-10">
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

          {/* Content — title pushes up when CTA appears */}
          <div className="relative text-center z-20 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={phase >= 1
                ? { opacity: 1, scale: 1, y: phase >= 2 ? -30 : 0 }
                : {}
              }
              transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold text-foreground leading-tight">
                {"My world has different stories.".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-[0.3em]"
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    animate={phase >= 1 ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{
                      duration: 1,
                      delay: 0.3 + i * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {phase >= 2 && (
              <motion.button
                onClick={handleChooseClick}
                className="mt-6 sm:mt-10 cursor-pointer bg-transparent border-none outline-none group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.p
                  className="text-base sm:text-lg md:text-2xl tracking-widest uppercase font-mono"
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
                  Choose your version.
                </motion.p>
                <motion.p
                  className="text-sm sm:text-base md:text-lg lg:text-xl font-poetry italic text-muted-foreground/70 mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  Every version of me tells a different story.
                </motion.p>
                <motion.div
                  className="w-12 sm:w-16 h-[1px] mx-auto mt-4"
                  style={{
                    background: "linear-gradient(90deg, transparent, hsla(217, 91%, 70%, 0.6), transparent)",
                  }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicLoader;
