import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicLoaderProps {
  onComplete: () => void;
}

const TypewriterOnce = ({ text, delay = 0, speed = 12 }: { text: string; delay?: number; speed?: number }) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started || indexRef.current >= text.length) return;
    const timer = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [started, text, speed]);

  if (!started) return null;

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="border-r-2 border-primary animate-cursor-blink ml-0.5">&nbsp;</span>
      )}
    </span>
  );
};

/* 4-point sparkle SVG path — pointy elongated tips with narrow waist */
const sparkle = (s: number) =>
  `M 0 ${-s} C ${s * 0.08} ${-s * 0.08} ${s * 0.08} ${-s * 0.08} ${s} 0 C ${s * 0.08} ${s * 0.08} ${s * 0.08} ${s * 0.08} 0 ${s} C ${-s * 0.08} ${s * 0.08} ${-s * 0.08} ${s * 0.08} ${-s} 0 C ${-s * 0.08} ${-s * 0.08} ${-s * 0.08} ${-s * 0.08} 0 ${-s} Z`;

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
          {/* ── Background blobs — CSS only, no framer-motion ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute rounded-full"
              style={{
                width: "55vw", height: "55vw", maxWidth: 700, maxHeight: 700,
                top: "-15%", left: "-20%",
                background: "hsla(217, 91%, 30%, 0.4)",
                filter: "blur(100px)",
                animation: "blob1 12s ease-in-out infinite",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: "45vw", height: "45vw", maxWidth: 600, maxHeight: 600,
                bottom: "-10%", right: "-15%",
                background: "hsla(260, 60%, 35%, 0.3)",
                filter: "blur(100px)",
                animation: "blob2 14s ease-in-out infinite",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: "35vw", height: "35vw", maxWidth: 450, maxHeight: 450,
                top: "35%", right: "20%",
                background: "hsla(45, 90%, 55%, 0.1)",
                filter: "blur(90px)",
                animation: "blob3 16s ease-in-out infinite",
              }}
            />
          </div>

          {/* CSS keyframes */}
          <style>{`
            @keyframes blob1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,30px) scale(1.1); } }
            @keyframes blob2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-30px,-20px) scale(1.06); } }
            @keyframes blob3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(15px,-12px) scale(1.08); } }
            @keyframes twinkle { 0%,100% { transform: scale(1); opacity: 0.85; } 50% { transform: scale(1.18); opacity: 1; } }
            @keyframes starFloat { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(-100vh); opacity: 0; } }
            @keyframes starTwinkle { 0%,100% { opacity: 0.08; } 40% { opacity: 0.35; } 70% { opacity: 0.12; } }
          `}</style>

          {/* Twinkling star dots — subtle, soft circles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${1 + (i % 2)}px`,
                  height: `${1 + (i % 2)}px`,
                  left: `${(i * 13 + 5) % 95}%`,
                  top: `${(i * 19 + 7) % 92}%`,
                  backgroundColor: "hsla(0, 0%, 100%, 0.25)",
                  animation: `starTwinkle ${3 + (i % 4) * 1.2}s ease-in-out infinite ${i * 0.6}s`,
                }}
              />
            ))}</div>

          {/* Noise texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
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
                <filter id="arcBlurWide"><feGaussianBlur stdDeviation="12" /></filter>
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
                stroke="url(#arcGlow)" strokeWidth="20" strokeLinecap="round" fill="none" filter="url(#arcBlurWide)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={phase >= 1 ? { pathLength: 1, opacity: 0.35 } : {}}
                transition={{ duration: 3.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              />

              {/* Main arc */}
              <motion.path
                d="M -50 260 Q 700 40 1450 260"
                stroke="url(#arcGlow)" strokeWidth="5" strokeLinecap="round" fill="none" filter="url(#arcBlur)"
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

              {/* Star sparkle — travels along arc, grows via scale, twinkles at rest */}
              {phase >= 1 && (
                <motion.g
                  style={{
                    offsetPath: `path("M -50 260 Q 700 40 1450 260")`,
                    offsetRotate: "0deg",
                  }}
                  initial={{ offsetDistance: "0%", opacity: 0, scale: 0.15 }}
                  animate={{ offsetDistance: "85%", opacity: [0, 0.9, 1, 1, 1], scale: [0.15, 0.4, 0.7, 1] }}
                  transition={{ duration: 8, ease: [0.25, 0.1, 0.25, 1], delay: 1 }}
                >
                  <g style={{ animation: "twinkle 2.5s ease-in-out infinite", animationDelay: "9s" }}>
                    <path fill="white" d={sparkle(16)} />
                  </g>
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
                    initial={{ opacity: 0, y: 15 }}
                    animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
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
                {/* Subtitle — fast typewriter, types once */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-poetry italic text-muted-foreground/70 min-h-[1.5em]">
                  <TypewriterOnce text="Every version of me tells a different story." delay={200} speed={12} />
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

                {/* Click hint */}
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
