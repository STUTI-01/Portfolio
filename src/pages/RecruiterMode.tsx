import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import AnimatedCounter from "@/components/AnimatedCounter";
import { experiences, education, skillCategories, projects, honors } from "@/data/portfolioData";
import { Briefcase, GraduationCap, Wrench, FolderOpen, Award } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

const RecruiterMode = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 space-y-24">
        {/* About */}
        <motion.section {...fadeInUp}>
          <h2 className="section-heading mb-6">About</h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
            Software Engineer with experience at Akamai Technologies, specializing in distributed C++ backend systems,
            AI architectures, and reliability engineering. Passionate about building systems that scale and perform under pressure.
          </p>
        </motion.section>

        {/* Experience Roadmap */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-10">
            <Briefcase className="w-7 h-7 text-primary" />
            <h2 className="section-heading">Professional Experience</h2>
          </div>
          <div className="relative pl-10">
            <div className="timeline-line" />
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                className="relative mb-14 last:mb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <div className="absolute -left-10 top-1">
                  <div className={i === 0 ? "timeline-dot-filled" : "timeline-dot"}>
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                </div>
                <p className="text-primary font-mono text-sm mb-1">{exp.timeline}</p>
                <h3 className="text-xl font-display font-bold">{exp.role}</h3>
                <p className="text-muted-foreground mb-3">{exp.company}</p>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{exp.description}</p>

                {exp.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-4">
                    {exp.metrics.map((metric) => (
                      <div key={metric} className="glass-card px-4 py-2 text-sm text-primary">
                        → {metric}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {exp.techStack.map((tech) => (
                    <span key={tech} className="badge-tech">{tech}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Animated Counters */}
        <motion.section {...fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { end: 40, suffix: "%", label: "Throughput Improvement" },
            { end: 500, suffix: "+", label: "Members Impacted" },
            { end: 3, suffix: "x", label: "Latency Reduction" },
            { end: 99, suffix: "%", label: "Uptime SLA" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-5 text-center space-y-2">
              <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.section>

        {/* Education */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-7 h-7 text-accent" />
            <h2 className="section-heading">Academic Milestones</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                className="glass-card-hover p-6 space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="font-display font-bold text-lg">{edu.degree}</h3>
                <p className="text-muted-foreground text-sm">{edu.institution}</p>
                <p className="text-primary font-mono text-sm">{edu.year}</p>
                <p className="text-accent font-bold text-lg">{edu.score}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technical Arsenal */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-8">
            <Wrench className="w-7 h-7 text-secondary" />
            <h2 className="section-heading">Technical Arsenal</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.category}
                className="glass-card p-5 space-y-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h3 className="font-display font-semibold text-sm text-foreground">{cat.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="badge-tech">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-8">
            <FolderOpen className="w-7 h-7 text-primary" />
            <h2 className="section-heading">Projects</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                className="glass-card-hover p-6 space-y-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h3 className="font-display font-bold text-lg">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.summary}</p>
                <p className="text-primary text-sm font-medium">{project.metrics}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="badge-tech">{tech}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Honors */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-7 h-7 text-accent" />
            <h2 className="section-heading">Honors & Certifications</h2>
          </div>
          <div className="space-y-3">
            {honors.map((honor, i) => (
              <motion.div
                key={i}
                className="glass-card px-5 py-3 text-sm text-foreground/90"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                {honor}
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default RecruiterMode;
