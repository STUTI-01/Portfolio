import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EngineeringAtScale from "@/components/EngineeringAtScale";
import AnimatedCounter from "@/components/AnimatedCounter";
import { experiences, education, skillCategories, projects, honors } from "@/data/portfolioData";
import {
  Briefcase, GraduationCap, Wrench, FolderOpen, Award,
  ChevronDown, ExternalLink, Github, Terminal
} from "lucide-react";

const PROJECTS_PER_PAGE = 6;

const allSkillTags = Array.from(
  new Set(skillCategories.flatMap((c) => c.skills))
);

const RecruiterMode = () => {
  const [searchParams] = useSearchParams();
  const [expandedExp, setExpandedExp] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [projectPage, setProjectPage] = useState(0);

  useEffect(() => {
    const skills = searchParams.get("skills");
    if (skills) {
      setActiveFilters(skills.split(","));
    }
  }, [searchParams]);

  const toggleFilter = (skill: string) => {
    setActiveFilters((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
    setProjectPage(0);
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setProjectPage(0);
  };

  const filteredProjects =
    activeFilters.length === 0
      ? projects
      : projects.filter((p) =>
          p.techStack.some((t) => activeFilters.includes(t))
        );

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    projectPage * PROJECTS_PER_PAGE,
    (projectPage + 1) * PROJECTS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-14">
        <HeroSection />
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* About + Engineering at Scale combined */}
      <div className="max-w-5xl mx-auto px-6 pt-20">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2
            className="section-heading mb-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            About
          </motion.h2>
          <div className="glass-card p-8 space-y-4">
            <p className="text-foreground text-lg leading-relaxed">
              I'm a <span className="text-primary font-semibold">Software Engineer</span> with experience building
              high-performance systems at <span className="text-accent font-semibold">Akamai Technologies</span>,{" "}
              <span className="text-accent font-semibold">Hewlett Packard Enterprise (HPE)</span>, and{" "}
              <span className="text-accent font-semibold">Pyramid Developers</span> — optimizing latency, throughput,
              and reliability across CDN-scale infrastructure and enterprise platforms.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My work spans from writing lock-free C++ data structures to designing ML pipelines that predict system
              failures before they happen. Beyond industry, I've led engineering initiatives across student tech
              communities — driving hackathons, mentoring peers, and shipping open-source tools. I believe great
              engineering is invisible: users should only feel the speed, never the complexity.
            </p>
          </div>
        </motion.section>
      </div>

      {/* Engineering at Scale (stats only, no terminal) */}
      <EngineeringAtScale />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Rest of recruiter content */}
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-28">

        {/* ── EXPERIENCE ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-10">
            <Briefcase className="w-7 h-7 text-[hsl(142,71%,45%)]" />
            <h2 className="section-heading">Professional Experience</h2>
          </div>

          <div className="space-y-5">
            {experiences.map((exp, i) => {
              const isOpen = expandedExp === exp.id;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="relative"
                >
                  <div className="absolute -left-5 top-7 z-10">
                    <div className={`w-4 h-4 rounded-full border-2 border-current ${exp.typeColor}`}>
                      <div className="w-2 h-2 rounded-full bg-current m-auto mt-[2px]" />
                    </div>
                  </div>

                  <div
                    className="glass-card ml-3 cursor-pointer transition-all duration-300 hover:border-primary/30"
                    onClick={() => setExpandedExp(isOpen ? null : exp.id)}
                  >
                    <div className="flex items-start justify-between p-6">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-mono font-semibold ${exp.typeColor}`}>
                            {exp.type}
                          </span>
                          <span className="text-xs text-muted-foreground font-mono">{exp.timeline}</span>
                        </div>
                        <h3 className="text-lg font-display font-bold tracking-wide uppercase">{exp.role}</h3>
                        <p className={`text-sm font-medium ${exp.typeColor}`}>{exp.company}</p>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      </motion.div>
                    </div>

                    <div className="flex flex-wrap gap-8 px-6 pb-5">
                      {exp.stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                          <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                          <p className="text-[11px] text-muted-foreground mt-1">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 border-t border-border/30 space-y-4">
                            <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {exp.techStack.map((tech) => (
                                <span key={tech} className="badge-tech">{tech}</span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ── EDUCATION ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
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

        {/* ── TECHNICAL ARSENAL ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Wrench className="w-7 h-7 text-secondary" />
            <h2 className="section-heading">Technical Arsenal</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.category}
                className="glass-card p-5 space-y-3"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h3 className="font-display font-semibold text-sm text-foreground">{cat.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => {
                    const isActive = activeFilters.includes(skill);
                    return (
                      <button
                        key={skill}
                        onClick={() => toggleFilter(skill)}
                        className={`badge-tech cursor-pointer transition-all duration-200 ${
                          isActive
                            ? "!bg-primary/20 !border-primary/50 !text-primary"
                            : "hover:border-primary/30 hover:text-foreground"
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
          {activeFilters.length > 0 && (
            <motion.div
              className="mt-4 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-xs text-muted-foreground">
                Filtering by: {activeFilters.join(", ")}
              </span>
              <button
                onClick={clearFilters}
                className="text-xs text-primary hover:underline"
              >
                Clear all
              </button>
            </motion.div>
          )}
        </motion.section>

        {/* ── PROJECTS ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <FolderOpen className="w-7 h-7 text-[hsl(142,71%,45%)]" />
            <h2 className="section-heading">Projects</h2>
          </div>

          <div className="mb-8 overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              <button
                onClick={clearFilters}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                  activeFilters.length === 0
                    ? "bg-primary/20 border-primary/50 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                All
              </button>
              {allSkillTags.map((skill) => {
                const isActive = activeFilters.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => toggleFilter(skill)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? "bg-primary/20 border-primary/50 text-primary"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeFilters.join(",")}-${projectPage}`}
              className="grid gap-4 md:grid-cols-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {paginatedProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  className="glass-card-hover p-6 space-y-3 flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <h3 className="font-display font-bold text-lg">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{project.summary}</p>
                  <p className="text-primary text-sm font-medium">{project.metrics}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="badge-tech">{tech}</span>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setProjectPage(i)}
                  className={`w-9 h-9 rounded-full text-sm font-display font-medium transition-all duration-200 ${
                    projectPage === i
                      ? "bg-primary text-primary-foreground"
                      : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No projects match the selected skills.{" "}
              <button onClick={clearFilters} className="text-primary hover:underline">
                Clear filters
              </button>
            </p>
          )}
        </motion.section>

        {/* ── HONORS ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-7 h-7 text-[hsl(142,71%,45%)]" />
            <h2 className="section-heading">Honors & Certifications</h2>
          </div>
          <div className="space-y-3">
            {honors.map((honor, i) => (
              <motion.div
                key={i}
                className="glass-card px-5 py-3 text-sm text-foreground/90"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                {honor}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── ENGINEERING MINDSET (terminal moved to end) ── */}
        <motion.div
          className="glass-card p-5 max-w-xl mx-auto font-mono text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-accent/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-primary/70" />
            <span className="text-muted-foreground ml-2">stuti@systems ~</span>
          </div>
          <div className="space-y-1 text-muted-foreground">
            <p><span className="text-secondary">$</span> cat engineering_mindset.txt</p>
            <p className="text-foreground/80 pl-2">"Great engineering is invisible —</p>
            <p className="text-foreground/80 pl-2"> users should only feel the speed,</p>
            <p className="text-foreground/80 pl-2"> never the complexity."</p>
            <p className="mt-2"><span className="text-secondary">$</span> <span className="animate-cursor-blink border-r-2 border-secondary">&nbsp;</span></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RecruiterMode;
