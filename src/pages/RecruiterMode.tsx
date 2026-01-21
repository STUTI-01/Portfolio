import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EngineeringAtScale from "@/components/EngineeringAtScale";
import AnimatedCounter from "@/components/AnimatedCounter";
import { supabase } from "@/integrations/supabase/client";
import {
  Briefcase, GraduationCap, Wrench, FolderOpen, Award,
  ChevronDown, ExternalLink, Github, Terminal, Loader2
} from "lucide-react";

const PROJECTS_PER_PAGE = 6;

interface Experience {
  id: string;
  type: string;
  type_color: string;
  role: string;
  company: string;
  timeline: string;
  description: string | null;
  stats: any;
  tech_stack: string[] | null;
  display_order: number | null;
}

interface Project {
  id: string;
  title: string;
  summary: string | null;
  tech_stack: string[] | null;
  metrics: string | null;
  demo_url: string | null;
  github_url: string | null;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  score: string | null;
}

interface SkillCategory {
  id: string;
  category: string;
  skills: string[] | null;
}

const RecruiterMode = () => {
  const [searchParams] = useSearchParams();
  const [expandedExp, setExpandedExp] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [projectPage, setProjectPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [honors, setHonors] = useState<string[]>([]);
  const [siteContent, setSiteContent] = useState<Record<string, string>>({});

  useEffect(() => {
    const skills = searchParams.get("skills");
    if (skills) setActiveFilters(skills.split(","));
  }, [searchParams]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const client = supabase as any;
      const [expRes, projRes, eduRes, skillRes, honorRes, contentRes] = await Promise.all([
        client.from("experiences").select("*").order("display_order"),
        client.from("projects").select("*").order("display_order"),
        client.from("education").select("*").order("display_order"),
        client.from("skill_categories").select("*").order("display_order"),
        client.from("honors").select("*").order("display_order"),
        client.from("site_content").select("*"),
      ]);
      if (expRes.data) setExperiences(expRes.data);
      if (projRes.data) setProjects(projRes.data);
      if (eduRes.data) setEducationList(eduRes.data);
      if (skillRes.data) setSkillCategories(skillRes.data);
      if (honorRes.data) setHonors(honorRes.data.map((h: any) => h.title));
      if (contentRes.data) {
        const map: Record<string, string> = {};
        contentRes.data.forEach((c: any) => { map[c.key] = c.value; });
        setSiteContent(map);
      }
      setLoading(false);
    };
    fetchAll();
  }, []);

  const allSkillTags = Array.from(
    new Set(skillCategories.flatMap((c) => c.skills || []))
  );

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
          (p.tech_stack || []).some((t) => activeFilters.includes(t))
        );

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    projectPage * PROJECTS_PER_PAGE,
    (projectPage + 1) * PROJECTS_PER_PAGE
  );

  const parseStats = (stats: any): { value: number; suffix: string; label: string }[] => {
    if (!stats) return [];
    if (typeof stats === "string") {
      try { return JSON.parse(stats); } catch { return []; }
    }
    if (Array.isArray(stats)) return stats;
    return [];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

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
            {siteContent.about_paragraph_1 && (
              <p
                className="text-foreground text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: siteContent.about_paragraph_1 }}
              />
            )}
            {siteContent.about_paragraph_2 && (
              <p
                className="text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: siteContent.about_paragraph_2 }}
              />
            )}
          </div>
        </motion.section>
      </div>

      {/* Engineering at Scale */}
      <EngineeringAtScale />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Rest of recruiter content */}
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-28">

        {/* ── EXPERIENCE ── */}
        {experiences.length > 0 && (
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

            <div className="relative space-y-5">
              {/* Timeline connecting line */}
              <div className="absolute -left-3 top-7 bottom-7 w-px bg-gradient-to-b from-blue-400/50 via-yellow-400/30 to-transparent" />

              {experiences.map((exp, i) => {
                const isOpen = expandedExp === exp.id;
                const stats = parseStats(exp.stats);
                const isFullTime = exp.type === 'Full-time';
                const isInternship = exp.type === 'Internship';
                const typeColor = isFullTime ? '#60a5fa' : isInternship ? '#fbbf24' : '#ffffff';
                const dotColor = isFullTime ? 'border-blue-400 bg-blue-400' : isInternship ? 'border-yellow-400 bg-yellow-400' : 'border-white bg-white';

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
                      <div className={`w-4 h-4 rounded-full border-2 ${dotColor}`}>
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
                            <span className="text-xs font-mono font-semibold" style={{ color: typeColor }}>
                              {exp.type}
                            </span>
                            <span className="text-xs text-muted-foreground font-mono">{exp.timeline}</span>
                          </div>
                          <h3 className="text-lg font-display font-bold" style={{ color: typeColor }}>{exp.role}</h3>
                          <p className="text-sm font-medium" style={{ color: '#34d399' }}>{exp.company}</p>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        </motion.div>
                      </div>

                      {stats.length > 0 && (
                        <div className="flex flex-wrap gap-8 px-6 pb-5">
                          {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                              <AnimatedCounter end={stat.value} suffix={stat.suffix} className="font-display font-bold text-2xl text-[hsl(142,71%,45%)]" />
                              <p className="text-[11px] text-muted-foreground mt-1">{stat.label}</p>
                            </div>
                          ))}
                        </div>
                      )}

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
                                {(exp.tech_stack || []).map((tech) => (
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
        )}

        {/* ── EDUCATION ── */}
        {educationList.length > 0 && (
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
              {educationList.map((edu, i) => (
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
                  {edu.score && <p className="text-accent font-bold text-lg">{edu.score}</p>}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── TECHNICAL ARSENAL ── */}
        {skillCategories.length > 0 && (
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
                  key={cat.id}
                  className="glass-card p-5 space-y-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <h3 className="font-display font-semibold text-sm text-foreground">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {(cat.skills || []).map((skill) => {
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
        )}

        {/* ── PROJECTS ── */}
        {projects.length > 0 && (
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

            <div className="mb-8">
              <p className="text-xs font-mono text-muted-foreground/60 tracking-wider uppercase mb-3">Filter by tech stack</p>
              <div className="flex flex-wrap gap-2">
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
                      className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
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
                    {project.metrics && <p className="text-primary text-sm font-medium">{project.metrics}</p>}
                    <div className="flex flex-wrap gap-2">
                      {(project.tech_stack || []).map((tech) => (
                        <span key={tech} className="badge-tech">{tech}</span>
                      ))}
                    </div>
                    <div className="flex gap-3 pt-2">
                      {project.demo_url && project.demo_url !== "#" && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          View Demo
                        </a>
                      )}
                      {project.github_url && project.github_url !== "#" && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          GitHub
                        </a>
                      )}
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
        )}

        {/* ── HONORS ── */}
        {honors.length > 0 && (
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
        )}

        {/* ── ENGINEERING MINDSET (terminal) ── */}
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
