import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicLoaderProps {
  onComplete: () => void;
}

const TypewriterOnce = ({ text, delay = 0, speed = 35 }: { text: string; delay?: number; speed?: number }) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const tick = useCallback(() => {
    if (!started || done) return;
    setDisplayed((prev) => {
      const next = text.slice(0, prev.length + 1);
      if (next.length === text.length) setDone(true);
      return next;
    });
  }, [started, done, text]);

  useEffect(() => {
    if (!started || done) return;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, started, done, displayed, speed]);

  if (!started) return null;

  return (
    <span>
      {displayed}
      {!done && (
        <span className="border-r-2 border-primary animate-cursor-blink ml-0.5">&nbsp;</span>
      )}
    </span>
  );
};

const CinematicLoader = ({ onComplete }: CinematicLoaderProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleChooseClick = () => {
    setPhase(3);
    setTimeout(() => onComplete(), 900);
  };

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "hsl(220 30% 4%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* ── Mesh gradient blobs ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute rounded-full blur-[120px] sm:blur-[160px]"
              style={{
                width: "60vw", height: "60vw", maxWidth: 750, maxHeight: 750,
                top: "-15%", left: "-20%",
                background: "hsla(217, 91%, 30%, 0.45)",
              }}
              animate={{ x: [0, 50, 0], y: [0, 40, 0], scale: [1, 1.12, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full blur-[100px] sm:blur-[140px]"
              style={{
                width: "50vw", height: "50vw", maxWidth: 650, maxHeight: 650,
                bottom: "-10%", right: "-15%",
                background: "hsla(260, 60%, 35%, 0.35)",
              }}
              animate={{ x: [0, -40, 0], y: [0, -30, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />
            <motion.div
              className="absolute rounded-full blur-[100px] sm:blur-[120px]"
              style={{
                width: "40vw", height: "40vw", maxWidth: 500, maxHeight: 500,
                top: "35%", right: "20%",
                background: "hsla(45, 90%, 55%, 0.12)",
              }}
              animate={{ x: [0, 25, -15, 0], y: [0, -20, 15, 0], scale: [1, 1.15, 0.95, 1] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
          </div>

          {/* Noise texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          {/* Subtle diagonal lines */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.02 }}
            transition={{ duration: 4 }}
            style={{
              backgroundImage: `repeating-linear-gradient(135deg, hsla(217, 91%, 60%, 0.5) 0px, transparent 1px, transparent 80px)`,
            }}
          />

          {/* Corner accents */}
          <motion.div
            className="absolute top-6 left-6 sm:top-10 sm:left-10 w-10 h-10 sm:w-14 sm:h-14 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-secondary to-transparent" />
            <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-secondary to-transparent" />
          </motion.div>
          <motion.div
            className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-10 h-10 sm:w-14 sm:h-14 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          >
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-secondary to-transparent" />
            <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-secondary to-transparent" />
          </motion.div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-secondary/30 pointer-events-none"
              style={{ left: `${12 + i * 14}%`, top: `${18 + (i % 3) * 22}%` }}
              animate={{ y: [0, -25, 0], opacity: [0.1, 0.5, 0.1] }}
              transition={{ duration: 5 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}

          {/* ── Earth Glow Arc ── */}
          <div className="absolute left-0 right-0 bottom-[6%] sm:bottom-[8%] pointer-events-none z-10" style={{ height: "clamp(160px, 25vh, 280px)" }}>
            <svg viewBox="-100 -40 1600 320" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMax slice" style={{ overflow: "visible" }}>
              <defs>
                <linearGradient id="arcGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsla(217, 91%, 60%, 0)" />
                  <stop offset="10%" stopColor="hsla(217, 91%, 55%, 0.2)" />
                  <stop offset="30%" stopColor="hsla(200, 80%, 60%, 0.4)" />
                  <stop offset="50%" stopColor="hsla(45, 97%, 64%, 0.6)" />
                  <stop offset="70%" stopColor="hsla(200, 80%, 60%, 0.4)" />
                  <stop offset="90%" stopColor="hsla(217, 91%, 55%, 0.2)" />
                  <stop offset="100%" stopColor="hsla(217, 91%, 60%, 0)" />
                </linearGradient>
                <radialGradient id="earthGlow" cx="50%" cy="100%" r="70%">
                  <stop offset="0%" stopColor="hsla(200, 80%, 50%, 0.18)" />
                  <stop offset="50%" stopColor="hsla(217, 91%, 40%, 0.06)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <filter id="arcBlur"><feGaussianBlur stdDeviation="5" /></filter>
                <filter id="arcBlurWide"><feGaussianBlur stdDeviation="14" /></filter>
                <radialGradient id="starDot" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="white" />
                  <stop offset="40%" stopColor="hsla(45, 97%, 80%, 0.9)" />
                  <stop offset="100%" stopColor="hsla(217, 91%, 70%, 0)" />
                </radialGradient>
              </defs>

              {/* Atmospheric glow */}
              <motion.ellipse
                cx="700" cy="260" rx="700" ry="200"
                fill="url(#earthGlow)"
                initial={{ opacity: 0 }}
                animate={phase >= 1 ? { opacity: 1 } : {}}
                transition={{ duration: 4, ease: "easeOut", delay: 0.5 }}
              />

              {/* Wide soft glow */}
              <motion.path
                d="M -50 260 Q 700 40 1450 260"
                stroke="url(#arcGlow)" strokeWidth="22" strokeLinecap="round" fill="none" filter="url(#arcBlurWide)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={phase >= 1 ? { pathLength: 1, opacity: 0.35 } : {}}
                transition={{ duration: 3.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              />

              {/* Main arc */}
              <motion.path
                d="M -50 260 Q 700 40 1450 260"
                stroke="url(#arcGlow)" strokeWidth="6" strokeLinecap="round" fill="none" filter="url(#arcBlur)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={phase >= 1 ? { pathLength: 1, opacity: 0.6 } : {}}
                transition={{ duration: 3.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
              />

              {/* Crisp thin arc */}
              <motion.path
                d="M -50 260 Q 700 40 1450 260"
                stroke="url(#arcGlow)" strokeWidth="1.5" strokeLinecap="round" fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={phase >= 1 ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 3.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              />

              {/* Star — grows slightly as it travels, stops at 85% with twinkle */}
              {phase >= 1 && (
                <motion.g
                  style={{
                    offsetPath: `path("M -50 260 Q 700 40 1450 260")`,
                    offsetRotate: "0deg",
                  }}
                  initial={{ offsetDistance: "0%", opacity: 0 }}
                  animate={{ offsetDistance: "85%", opacity: [0, 0.8, 1, 1, 1] }}
                  transition={{ duration: 8, ease: [0.25, 0.1, 0.25, 1], delay: 1 }}
                >
                  {/* Core dot — grows from 4 to 7 */}
                  <motion.circle
                    cx="0" cy="0"
                    fill="url(#starDot)"
                    initial={{ r: 4 }}
                    animate={{ r: [4, 5, 6, 7, 7] }}
                    transition={{ duration: 8, ease: [0.25, 0.1, 0.25, 1], delay: 1 }}
                  />
                  {/* 4-point star lines */}
                  {[0, 90, 45, 135].map((angle) => (
                    <motion.line
                      key={angle}
                      x1="0" y1="0" x2="0" y2="-12"
                      stroke="white"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                      transform={`rotate(${angle})`}
                      initial={{ opacity: 0, y2: -6 }}
                      animate={{ opacity: [0, 0.3, 0.6, 0.8], y2: [-6, -8, -10, -12] }}
                      transition={{ duration: 8, ease: [0.25, 0.1, 0.25, 1], delay: 1 }}
                    />
                  ))}
                  {/* Twinkle pulse after resting */}
                  <motion.circle
                    cx="0" cy="0" r="10"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 0, 0, 0, 0.6, 0.2, 0.5, 0.15, 0.4, 0.1], scale: [0.5, 0.5, 0.5, 0.5, 1.2, 0.8, 1.1, 0.9, 1.15, 0.85] }}
                    transition={{ duration: 16, ease: "easeInOut", delay: 1, repeat: Infinity }}
                  />
                </motion.g>
              )}
            </svg>
          </div>

          {/* ── Content ── */}
          <div className="relative z-20 px-6 sm:px-8 max-w-3xl w-full text-center flex flex-col items-center" style={{ marginBottom: "clamp(120px, 18vh, 220px)" }}>
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={phase >= 1
                ? { opacity: 1, scale: 1, y: phase >= 2 ? -20 : 0 }
                : {}
              }
              transition={{
                opacity: { duration: 2, ease: "easeOut" },
                scale: { duration: 2.5, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-display font-bold text-foreground leading-tight">
                {"My world has different stories.".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-[0.3em]"
                    initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                    animate={phase >= 1 ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{
                      duration: 1.2,
                      delay: 0.4 + i * 0.12,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {phase >= 2 && (
              <motion.div
                className="mt-5 sm:mt-7 flex flex-col items-center"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Subtitle — typewriter, fast, types once */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-poetry italic text-muted-foreground/70 min-h-[1.5em]">
                  <TypewriterOnce text="Every version of me tells a different story." delay={200} speed={18} />
                </p>

                {/* CTA button */}
                <button
                  onClick={handleChooseClick}
                  className="cursor-pointer bg-transparent border-none outline-none group mt-6 sm:mt-8"
                >
                  <motion.p
                    className="text-sm sm:text-base md:text-xl tracking-widest uppercase font-mono"
                    initial={{
                      opacity: 0, letterSpacing: "0.6em",
                      color: "hsla(0, 0%, 50%, 1)", scale: 0.9,
                    }}
                    animate={{
                      opacity: 1, letterSpacing: "0.3em",
                      color: "hsla(217, 91%, 70%, 1)", scale: 1,
                    }}
                    transition={{
                      opacity: { duration: 1, delay: 1.5 },
                      letterSpacing: { duration: 1.8, delay: 1.5 },
                      color: { duration: 3, ease: "easeOut", delay: 1.5 },
                      scale: { duration: 3, ease: "easeOut", delay: 1.5 },
                    }}
                    whileHover={{
                      scale: 1.08,
                      textShadow: "0 0 24px hsla(217, 91%, 70%, 0.5)",
                    }}
                  >
                    Choose your version.
                  </motion.p>
                </button>

                {/* Click hint — brighter white */}
                <motion.p
                  className="mt-5 sm:mt-6 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-mono"
                  style={{ color: "hsla(0, 0%, 85%, 0.7)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.9, 0.7] }}
                  transition={{ duration: 2.5, delay: 3 }}
                >
                  ↑ click above to explore ↑
                </motion.p>

                <motion.div
                  className="w-10 sm:w-14 h-[1px] mx-auto mt-4"
                  style={{
                    background: "linear-gradient(90deg, transparent, hsla(217, 91%, 70%, 0.6), transparent)",
                  }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 2, delay: 2, ease: "easeOut" }}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicLoader;
