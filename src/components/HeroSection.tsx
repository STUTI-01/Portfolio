import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TypewriterText from "./TypewriterText";
import ResumeDownload from "./ResumeDownload";
import profilePhoto from "@/assets/profile-photo.png";
import { Github, Linkedin, Mail, Phone, Download, ArrowRight } from "lucide-react";

const rotatingPhrases = [
  "I turn chaos into systems.",
  "I turn ideas into scale.",
  "I turn caffeine into architecture.",
  "I turn complexity into clarity.",
];

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/STUTI-01",
    label: "GitHub",
    hoverBg: "hover:bg-[hsl(220,13%,18%)] hover:border-[hsl(220,13%,18%)]",
    iconColor: "text-[hsl(215,14%,46%)]",
    hoverIcon: "group-hover:text-white",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/stuti-mohanty-817a231aa/",
    label: "LinkedIn",
    hoverBg: "hover:bg-[hsl(210,82%,40%)] hover:border-[hsl(210,82%,40%)]",
    iconColor: "text-[hsl(210,82%,40%)]",
    hoverIcon: "group-hover:text-white",
  },
  {
    icon: Mail,
    href: "mailto:stutimohanty01@gmail.com",
    label: "Email",
    hoverBg: "hover:bg-[hsl(45,97%,54%)] hover:border-[hsl(45,97%,54%)]",
    iconColor: "text-[hsl(45,97%,54%)]",
    hoverIcon: "group-hover:text-[hsl(220,44%,8%)]",
  },
  {
    icon: Phone,
    href: "tel:+919019158174",
    label: "Phone",
    hoverBg: "hover:bg-[hsl(217,91%,60%)] hover:border-[hsl(217,91%,60%)]",
    iconColor: "text-[hsl(217,91%,60%)]",
    hoverIcon: "group-hover:text-white",
  },
];

const skillCards = [
  { title: "Backend & Systems", skills: "C++, Go, Rust, Distributed Systems", filter: "C++" },
  { title: "AI & ML", skills: "PyTorch, TensorFlow, NLP, Computer Vision", filter: "Python" },
  { title: "Full Stack", skills: "React, Node.js, TypeScript, PostgreSQL", filter: "React" },
  { title: "Cloud & DevOps", skills: "AWS, Docker, Kubernetes, CI/CD", filter: "AWS" },
];

// Subtle particle background
const CircuitBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; pulse: number; pulseSpeed: number }[] = [];
    const lines: { x1: number; y1: number; x2: number; y2: number; progress: number; speed: number; active: boolean }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const nodeCount = Math.floor((w * h) / 22000);
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        radius: Math.random() * 1.2 + 0.4,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.015,
      });
    }

    const createLines = () => {
      lines.length = 0;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100 && Math.random() > 0.65) {
            lines.push({
              x1: nodes[i].x, y1: nodes[i].y,
              x2: nodes[j].x, y2: nodes[j].y,
              progress: 0,
              speed: 0.002 + Math.random() * 0.003,
              active: Math.random() > 0.75,
            });
          }
        }
      }
    };
    createLines();

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      for (const line of lines) {
        ctx.beginPath();
        ctx.strokeStyle = `hsla(217, 91%, 60%, ${line.active ? 0.08 : 0.03})`;
        ctx.lineWidth = 0.5;
        const midX = (line.x1 + line.x2) / 2;
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(midX, line.y1);
        ctx.lineTo(midX, line.y2);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();

        if (line.active) {
          line.progress += line.speed;
          if (line.progress > 1) {
            line.progress = 0;
            line.active = Math.random() > 0.5;
          }
          const t = line.progress;
          let px: number, py: number;
          if (t < 0.33) {
            const lt = t / 0.33;
            px = line.x1 + (midX - line.x1) * lt;
            py = line.y1;
          } else if (t < 0.66) {
            const lt = (t - 0.33) / 0.33;
            px = midX;
            py = line.y1 + (line.y2 - line.y1) * lt;
          } else {
            const lt = (t - 0.66) / 0.34;
            px = midX + (line.x2 - midX) * lt;
            py = line.y2;
          }
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(px, py, 0, px, py, 6);
          gradient.addColorStop(0, "hsla(217, 91%, 60%, 0.4)");
          gradient.addColorStop(1, "hsla(217, 91%, 60%, 0)");
          ctx.fillStyle = gradient;
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.pulse += node.pulseSpeed;
        const glowIntensity = 0.2 + Math.sin(node.pulse) * 0.2;
        const r = node.radius + Math.sin(node.pulse) * 0.2;

        ctx.beginPath();
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 5);
        glow.addColorStop(0, `hsla(217, 91%, 60%, ${glowIntensity * 0.25})`);
        glow.addColorStop(1, "hsla(217, 91%, 60%, 0)");
        ctx.fillStyle = glow;
        ctx.arc(node.x, node.y, r * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `hsla(217, 91%, 70%, ${glowIntensity + 0.15})`;
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  );
};


const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6 md:px-16 lg:px-24 py-20">
      <CircuitBackground />

      {/* Subtle radial ambient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 75% 25%, hsla(217, 91%, 60%, 0.05) 0%, transparent 55%), radial-gradient(ellipse at 25% 75%, hsla(217, 70%, 50%, 0.03) 0%, transparent 50%)",
      }} />

      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 max-w-7xl mx-auto w-full relative z-10">
        {/* Left: Text */}
        <motion.div
          className="flex-1 space-y-8"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Subtle label */}
          <motion.p
            className="text-xs font-mono tracking-[0.3em] uppercase text-secondary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Software Engineer
          </motion.p>

          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight">
              Hi, I'm{" "}
              <span className="text-name-highlight italic inline-block overflow-hidden">
                {"Stuti Mohanty".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 30, rotateX: 90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.6 + i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
              I turn coffee into code.
            </p>
            <p className="text-base md:text-lg text-muted-foreground/80 h-7">
              <TypewriterText phrases={rotatingPhrases} />
            </p>
          </div>

          {/* Social links — monochrome with blue accent on hover */}
          <motion.div
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={link.label}
                className={`group relative w-10 h-10 rounded-lg border border-border/60 bg-muted/30 flex items-center justify-center transition-all duration-300 hover:scale-110 ${link.hoverBg}`}
              >
                <link.icon className={`w-4 h-4 transition-colors duration-300 ${link.iconColor} ${link.hoverIcon}`} />
              </a>
            ))}
          </motion.div>

          {/* Resume download */}
          <ResumeDownload />
        </motion.div>

        {/* Right: Photo */}
        <motion.div
          className="relative flex-shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative w-72 h-72 md:w-80 md:h-80">
            {/* Outer orbital ring */}
            <motion.div
              className="absolute -inset-6 rounded-full"
              style={{ border: "1px solid hsla(217, 91%, 60%, 0.12)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: "hsla(217, 91%, 60%, 0.5)" }} />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: "hsla(217, 91%, 60%, 0.3)" }} />
            </motion.div>

            {/* Inner glow */}
            <div
              className="absolute inset-0 rounded-full animate-glow-pulse"
              style={{ background: "hsla(217, 91%, 60%, 0.08)", filter: "blur(40px)" }}
            />

            {/* Photo */}
            <img
              src={profilePhoto}
              alt="Stuti Mohanty"
              className="w-full h-full object-cover object-top rounded-full relative z-10"
              style={{
                border: "2px solid hsla(217, 91%, 60%, 0.2)",
                boxShadow: "0 0 50px hsla(217, 91%, 60%, 0.08), 0 20px 60px hsla(220, 44%, 4%, 0.5)",
              }}
            />

            {/* Subtle shine overlay */}
            <div
              className="absolute inset-0 rounded-full z-20 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, hsla(0, 0%, 100%, 0.04) 0%, transparent 50%)",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Skill Cards */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto w-full mt-20 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
      >
        {skillCards.map((card, i) => (
          <motion.div
            key={card.title}
            className="group glass-card p-5 space-y-3 cursor-pointer transition-all duration-300 hover:border-secondary/30"
            whileHover={{ y: -4 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 + i * 0.1 }}
            onClick={() => navigate(`/recruiter?skills=${card.filter}`)}
          >
            <h3 className="font-display font-bold text-sm text-foreground group-hover:text-secondary transition-colors duration-300">
              {card.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{card.skills}</p>
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-secondary/60 group-hover:text-secondary transition-colors pt-1">
              <Download className="w-3 h-3" />
              <span>Download Resume</span>
              <ArrowRight className="w-2.5 h-2.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HeroSection;
