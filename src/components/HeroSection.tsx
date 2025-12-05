import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TypewriterText from "./TypewriterText";
import profilePhoto from "@/assets/profile-photo.jpg";
import { Cpu, Shield, Code, Cloud, Github, Linkedin, Mail, Phone } from "lucide-react";

const rotatingPhrases = [
  "I turn chaos into systems.",
  "I turn ideas into scale.",
  "I turn caffeine into architecture.",
  "I turn complexity into clarity.",
];

const skillCards = [
  {
    icon: Cpu,
    title: "Distributed Systems & Performance",
    description: "Building high-throughput, fault-tolerant distributed systems at scale.",
    filterSkills: ["Distributed Systems", "C++"],
  },
  {
    icon: Shield,
    title: "C++ Concurrency & Systems Programming",
    description: "Low-level systems optimization with multi-threaded architectures.",
    filterSkills: ["C++"],
  },
  {
    icon: Code,
    title: "AI & Machine Learning",
    description: "Designing intelligent systems that automate and enhance decisions.",
    filterSkills: ["PyTorch", "TensorFlow", "NLP"],
  },
  {
    icon: Cloud,
    title: "Cloud & Backend Architecture",
    description: "Scalable cloud-native backend solutions with modern tooling.",
    filterSkills: ["AWS", "Docker", "Kubernetes"],
  },
];

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/STUTI-01",
    label: "GitHub",
    color: "hover:bg-[#333] hover:border-[#333]",
    iconColor: "group-hover:text-white",
    baseColor: "text-[#6e7681]",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/stuti-mohanty-817a231aa/",
    label: "LinkedIn",
    color: "hover:bg-[#0A66C2] hover:border-[#0A66C2]",
    iconColor: "group-hover:text-white",
    baseColor: "text-[#0A66C2]",
  },
  {
    icon: Mail,
    href: "mailto:stutimohanty01@gmail.com",
    label: "Email",
    color: "hover:bg-[#EA4335] hover:border-[#EA4335]",
    iconColor: "group-hover:text-white",
    baseColor: "text-[#EA4335]",
  },
  {
    icon: Phone,
    href: "tel:+919019158174",
    label: "Phone",
    color: "hover:bg-[#25D366] hover:border-[#25D366]",
    iconColor: "group-hover:text-white",
    baseColor: "text-[#25D366]",
  },
];

// Circuit board animated background
const CircuitBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    interface Node {
      x: number; y: number; vx: number; vy: number;
      radius: number; pulse: number; pulseSpeed: number;
      hue: number; isJunction: boolean;
    }
    interface Line {
      i: number; j: number; progress: number; speed: number;
      active: boolean; cooldown: number; hue: number; trail: number[];
    }

    const nodes: Node[] = [];
    const lines: Line[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const nodeCount = Math.floor((w * h) / 12000);

    for (let i = 0; i < nodeCount; i++) {
      const isJunction = Math.random() > 0.7;
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: isJunction ? Math.random() * 2 + 1.5 : Math.random() * 1.2 + 0.4,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.025,
        hue: Math.random() > 0.8 ? 142 : Math.random() > 0.5 ? 38 : 217,
        isJunction,
      });
    }

    const createLines = () => {
      lines.length = 0;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && Math.random() > 0.5) {
            lines.push({
              i, j,
              progress: 0,
              speed: 0.003 + Math.random() * 0.007,
              active: Math.random() > 0.4,
              cooldown: 0,
              hue: [217, 142, 38][Math.floor(Math.random() * 3)],
              trail: [],
            });
          }
        }
      }
    };
    createLines();

    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, w, h);

      // Draw lines with circuit-board right-angle paths
      for (const line of lines) {
        const n1 = nodes[line.i];
        const n2 = nodes[line.j];
        const midX = (n1.x + n2.x) / 2;

        // Base circuit trace
        const baseAlpha = line.active ? 0.15 + Math.sin(time * 2) * 0.05 : 0.03;
        ctx.beginPath();
        ctx.strokeStyle = `hsla(${line.hue}, 91%, 60%, ${baseAlpha})`;
        ctx.lineWidth = line.active ? 0.8 : 0.4;
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(midX, n1.y);
        ctx.lineTo(midX, n2.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();

        if (line.active) {
          line.progress += line.speed;
          if (line.progress > 1) {
            line.progress = 0;
            line.cooldown = 60 + Math.random() * 120;
            line.active = false;
          }

          const t = line.progress;
          let px: number, py: number;
          if (t < 0.33) {
            const lt = t / 0.33;
            px = n1.x + (midX - n1.x) * lt;
            py = n1.y;
          } else if (t < 0.66) {
            const lt = (t - 0.33) / 0.33;
            px = midX;
            py = n1.y + (n2.y - n1.y) * lt;
          } else {
            const lt = (t - 0.66) / 0.34;
            px = midX + (n2.x - midX) * lt;
            py = n2.y;
          }

          // Store trail positions
          line.trail.push(px, py);
          if (line.trail.length > 20) line.trail.splice(0, 2);

          // Draw trail
          for (let ti = 0; ti < line.trail.length - 2; ti += 2) {
            const alpha = (ti / line.trail.length) * 0.4;
            ctx.beginPath();
            ctx.fillStyle = `hsla(${line.hue}, 91%, 70%, ${alpha})`;
            ctx.arc(line.trail[ti], line.trail[ti + 1], 2, 0, Math.PI * 2);
            ctx.fill();
          }

          // Bright pulse head
          const grad = ctx.createRadialGradient(px, py, 0, px, py, 14);
          grad.addColorStop(0, `hsla(${line.hue}, 91%, 80%, 0.9)`);
          grad.addColorStop(0.3, `hsla(${line.hue}, 91%, 65%, 0.4)`);
          grad.addColorStop(1, `hsla(${line.hue}, 91%, 60%, 0)`);
          ctx.beginPath();
          ctx.fillStyle = grad;
          ctx.arc(px, py, 14, 0, Math.PI * 2);
          ctx.fill();

          // Inner bright core
          ctx.beginPath();
          ctx.fillStyle = `hsla(${line.hue}, 80%, 90%, 0.95)`;
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          line.trail = [];
          if (line.cooldown > 0) {
            line.cooldown--;
          } else if (Math.random() > 0.997) {
            line.active = true;
            line.progress = 0;
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.pulse += node.pulseSpeed;

        const glowIntensity = 0.4 + Math.sin(node.pulse) * 0.4;
        const r = node.radius + Math.sin(node.pulse) * 0.4;

        // Outer glow
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 8);
        glow.addColorStop(0, `hsla(${node.hue}, 91%, 65%, ${glowIntensity * 0.35})`);
        glow.addColorStop(0.5, `hsla(${node.hue}, 91%, 60%, ${glowIntensity * 0.1})`);
        glow.addColorStop(1, `hsla(${node.hue}, 91%, 60%, 0)`);
        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(node.x, node.y, r * 8, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.fillStyle = `hsla(${node.hue}, 85%, ${node.isJunction ? 80 : 70}%, ${glowIntensity + 0.3})`;
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Junction ring
        if (node.isJunction) {
          ctx.beginPath();
          ctx.strokeStyle = `hsla(${node.hue}, 91%, 65%, ${glowIntensity * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
          ctx.stroke();
        }
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
      style={{ opacity: 0.8 }}
    />
  );
};

const HeroSection = () => {
  const navigate = useNavigate();

  const handleSkillCardClick = (filterSkills: string[]) => {
    const params = new URLSearchParams();
    params.set("skills", filterSkills.join(","));
    navigate(`/recruiter?${params.toString()}`);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6 md:px-16 lg:px-24 py-20">
      <CircuitBackground />

      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 70% 30%, hsla(217, 91%, 60%, 0.06) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, hsla(142, 71%, 45%, 0.04) 0%, transparent 50%)",
      }} />

      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-7xl mx-auto w-full relative z-10">
        {/* Left: Text */}
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              Hi, I am{" "}
              <span className="text-name-highlight italic">Stuti Mohanty</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              I turn coffee into code.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground h-8">
              <TypewriterText phrases={rotatingPhrases} />
            </p>
          </div>

          {/* Social links — colored */}
          <motion.div
            className="flex items-center gap-3 pt-2"
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
                className={`group relative w-10 h-10 rounded-lg border border-border bg-muted/50 flex items-center justify-center transition-all duration-300 hover:scale-110 ${link.color}`}
              >
                <link.icon className={`w-4 h-4 transition-colors ${link.baseColor} ${link.iconColor}`} />
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {link.label}
                </div>
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Photo */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <motion.div
              className="absolute -inset-3 rounded-full border border-secondary/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-secondary/60" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-secondary/40" />
            </motion.div>
            <div className="absolute inset-0 rounded-full blur-[50px] bg-secondary/15 animate-glow-pulse" />
            <img
              src={profilePhoto}
              alt="Stuti Mohanty"
              className="w-full h-full object-cover rounded-full relative z-10 shadow-2xl"
              style={{
                border: "2px solid hsla(217, 91%, 60%, 0.25)",
                boxShadow: "0 0 40px hsla(217, 91%, 60%, 0.1), inset 0 0 30px hsla(220, 44%, 8%, 0.5)",
              }}
            />
            <div
              className="absolute inset-0 rounded-full z-20 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, hsla(0, 0%, 100%, 0.06) 0%, transparent 50%)",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Skill Cards — clickable, navigate to projects */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-7xl mx-auto w-full relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {skillCards.map((card, i) => (
          <motion.div
            key={card.title}
            className="glass-card-hover p-5 space-y-3 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
            onClick={() => handleSkillCardClick(card.filterSkills)}
          >
            <card.icon className="w-8 h-8 text-secondary" />
            <h3 className="font-display font-semibold text-sm">{card.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>
            <span className="inline-flex items-center text-[10px] text-secondary/70 font-mono mt-1">
              View projects →
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HeroSection;
