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
    bg: "bg-[#24292e]",
    hoverBg: "hover:bg-[#1a1e22]",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/stuti-mohanty-817a231aa/",
    label: "LinkedIn",
    bg: "bg-[#0A66C2]",
    hoverBg: "hover:bg-[#084e96]",
  },
  {
    icon: Mail,
    href: "mailto:stutimohanty01@gmail.com",
    label: "Email",
    bg: "bg-[#EA4335]",
    hoverBg: "hover:bg-[#c5362a]",
  },
  {
    icon: Phone,
    href: "tel:+919019158174",
    label: "Phone",
    bg: "bg-[#25D366]",
    hoverBg: "hover:bg-[#1da851]",
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

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    // ── Hexagonal grid ──
    const hexSize = 50;
    const hexW = hexSize * 2;
    const hexH = Math.sqrt(3) * hexSize;
    const hexCenters: { x: number; y: number }[] = [];

    for (let row = -1; row < h / hexH + 2; row++) {
      for (let col = -1; col < w / hexW + 2; col++) {
        const x = col * hexW * 0.75;
        const y = row * hexH + (col % 2 === 0 ? 0 : hexH / 2);
        hexCenters.push({ x, y });
      }
    }

    const drawHex = (cx: number, cy: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = cx + size * Math.cos(angle);
        const py = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    // ── Circuit nodes at hex intersections ──
    type CircuitNode = { x: number; y: number; pulse: number; pulseSpeed: number; radius: number };
    const circuitNodes: CircuitNode[] = [];
    // Place nodes at a subset of hex centers
    for (const hc of hexCenters) {
      if (Math.random() > 0.65) {
        circuitNodes.push({
          x: hc.x,
          y: hc.y,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.02,
          radius: 1.5 + Math.random() * 1.5,
        });
      }
    }

    // ── Circuit traces (wires) connecting nearby nodes ──
    type Wire = {
      from: CircuitNode; to: CircuitNode;
      progress: number; speed: number; active: boolean;
      nextActivation: number;
    };
    const wires: Wire[] = [];
    for (let i = 0; i < circuitNodes.length; i++) {
      for (let j = i + 1; j < circuitNodes.length; j++) {
        const dx = circuitNodes[i].x - circuitNodes[j].x;
        const dy = circuitNodes[i].y - circuitNodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < hexSize * 2.5 && Math.random() > 0.5) {
          wires.push({
            from: circuitNodes[i],
            to: circuitNodes[j],
            progress: 0,
            speed: 0.003 + Math.random() * 0.006,
            active: Math.random() > 0.6,
            nextActivation: Math.random() * 300,
          });
        }
      }
    }

    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      frame++;

      // ── Draw hexagonal grid ──
      for (const hc of hexCenters) {
        drawHex(hc.x, hc.y, hexSize);
        ctx.strokeStyle = "hsla(217, 91%, 60%, 0.04)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // ── Draw wires (circuit traces) ──
      for (const wire of wires) {
        const { from, to } = wire;
        // Right-angle circuit path
        const midX = (from.x + to.x) / 2;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(midX, from.y);
        ctx.lineTo(midX, to.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = wire.active
          ? "hsla(217, 91%, 60%, 0.15)"
          : "hsla(217, 91%, 60%, 0.05)";
        ctx.lineWidth = wire.active ? 1 : 0.5;
        ctx.stroke();

        // Electricity pulse traveling along wire
        if (wire.active) {
          wire.progress += wire.speed;
          if (wire.progress > 1) {
            wire.progress = 0;
            wire.active = false;
            wire.nextActivation = frame + 60 + Math.random() * 200;
          }

          // Calculate position along the L-shaped path
          const t = wire.progress;
          let px: number, py: number;
          const seg1 = Math.abs(midX - from.x);
          const seg2 = Math.abs(to.y - from.y);
          const seg3 = Math.abs(to.x - midX);
          const total = seg1 + seg2 + seg3;
          const d = t * total;

          if (d <= seg1) {
            const lt = d / seg1;
            px = from.x + (midX - from.x) * lt;
            py = from.y;
          } else if (d <= seg1 + seg2) {
            const lt = (d - seg1) / seg2;
            px = midX;
            py = from.y + (to.y - from.y) * lt;
          } else {
            const lt = (d - seg1 - seg2) / seg3;
            px = midX + (to.x - midX) * lt;
            py = to.y;
          }

          // Electric glow particle
          const grad = ctx.createRadialGradient(px, py, 0, px, py, 12);
          grad.addColorStop(0, "hsla(217, 91%, 70%, 0.8)");
          grad.addColorStop(0.3, "hsla(217, 91%, 60%, 0.4)");
          grad.addColorStop(1, "hsla(217, 91%, 60%, 0)");
          ctx.beginPath();
          ctx.fillStyle = grad;
          ctx.arc(px, py, 12, 0, Math.PI * 2);
          ctx.fill();

          // Bright core
          ctx.beginPath();
          ctx.fillStyle = "hsla(210, 100%, 85%, 0.9)";
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (frame > wire.nextActivation) {
          wire.active = true;
          wire.progress = 0;
        }
      }

      // ── Draw circuit nodes (junction dots) ──
      for (const node of circuitNodes) {
        node.pulse += node.pulseSpeed;
        const intensity = 0.4 + Math.sin(node.pulse) * 0.4;
        const r = node.radius + Math.sin(node.pulse) * 0.5;

        // Outer glow
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 5);
        glow.addColorStop(0, `hsla(217, 91%, 60%, ${intensity * 0.35})`);
        glow.addColorStop(1, "hsla(217, 91%, 60%, 0)");
        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(node.x, node.y, r * 5, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.fillStyle = `hsla(217, 91%, 75%, ${intensity + 0.1})`;
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
      style={{ opacity: 0.6 }}
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
                className={`group relative w-10 h-10 rounded-lg border-0 flex items-center justify-center transition-all duration-300 hover:scale-110 ${link.bg} ${link.hoverBg}`}
              >
                <link.icon className="w-4 h-4 text-white font-bold" />
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
