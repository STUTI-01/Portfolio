import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ContentManager, { FieldConfig } from "@/components/admin/ContentManager";
import { LogOut, Gem, PenTool, Camera, BookOpen, Bird, Image, Briefcase, FolderOpen, GraduationCap, Award, Wrench, FileText, Settings, BarChart3, MessageSquare, Eye, Loader2 } from "lucide-react";
import { adminApi } from "@/lib/adminApi";

const ADMIN_PASSCODE = () => sessionStorage.getItem("admin_passcode") || "";

const wandererTabs = [
  { key: "adornments", label: "Jewellery", icon: Gem },
  { key: "poems", label: "Poems", icon: PenTool },
  { key: "gallery_photos", label: "Photos", icon: Camera },
  { key: "thoughts", label: "Thoughts", icon: BookOpen },
  { key: "bird_logs", label: "Birds", icon: Bird },
  { key: "detail_images", label: "Gallery Images", icon: Image },
];

const recruiterTabs = [
  { key: "experiences", label: "Experiences", icon: Briefcase },
  { key: "projects", label: "Projects", icon: FolderOpen },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "skill_categories", label: "Skills", icon: Wrench },
  { key: "honors", label: "Honors", icon: Award },
  { key: "resumes", label: "Resumes", icon: FileText },
  { key: "site_content", label: "Site Content", icon: Settings },
  { key: "site_stats", label: "Stats", icon: BarChart3 },
];

const analyticsTabs = [
  { key: "contact_submissions", label: "Messages", icon: MessageSquare },
  { key: "page_visits", label: "Page Visits", icon: Eye },
];

const fieldConfigs: Record<string, { fields: FieldConfig[]; displayField: string; imageField?: string; hasGallery?: boolean; galleryEntityType?: string }> = {
  adornments: {
    displayField: "title",
    imageField: "image_url",
    hasGallery: true,
    galleryEntityType: "adornments",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "category", label: "Category", type: "select", options: ["earrings", "necklaces", "rings", "bracelets", "general"] },
      { key: "materials", label: "Materials", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "footnote", label: "The Footnote", type: "textarea" },
      { key: "image_url", label: "Image", type: "image", imageFolder: "adornments" },
      { key: "is_featured", label: "Featured", type: "boolean" },
      { key: "display_order", label: "Display Order", type: "number" },
    ],
  },
  poems: {
    displayField: "title",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "language", label: "Language", type: "select", options: ["English", "Hindi", "Odia"] },
      { key: "theme", label: "Theme", type: "text" },
      { key: "content", label: "Content", type: "textarea", required: true },
      { key: "is_featured", label: "Featured", type: "boolean" },
    ],
  },
  gallery_photos: {
    displayField: "title",
    imageField: "image_url",
    hasGallery: true,
    galleryEntityType: "gallery_photos",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "category", label: "Category", type: "select", options: ["landscape", "portrait", "street", "wildlife", "architecture", "general"] },
      { key: "location", label: "Location", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "footnote", label: "The Footnote", type: "textarea" },
      { key: "image_url", label: "Image", type: "image", imageFolder: "gallery" },
      { key: "is_featured", label: "Featured", type: "boolean" },
      { key: "display_order", label: "Display Order", type: "number" },
    ],
  },
  thoughts: {
    displayField: "title",
    imageField: "cover_image_url",
    hasGallery: true,
    galleryEntityType: "thoughts",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "category", label: "Category", type: "select", options: ["essay", "reflection", "science", "personal"] },
      { key: "content", label: "Content", type: "textarea", required: true },
      { key: "footnote", label: "The Footnote", type: "textarea" },
      { key: "tags", label: "Tags", type: "tags" },
      { key: "cover_image_url", label: "Cover Image", type: "image", imageFolder: "thoughts" },
      { key: "is_published", label: "Published", type: "boolean" },
    ],
  },
  bird_logs: {
    displayField: "species_name",
    imageField: "image_url",
    hasGallery: true,
    galleryEntityType: "bird_logs",
    fields: [
      { key: "species_name", label: "Species Name", type: "text", required: true },
      { key: "common_name", label: "Common Name", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "habitat", label: "Habitat", type: "text" },
      { key: "sighting_date", label: "Sighting Date", type: "date" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "footnote", label: "The Footnote", type: "textarea" },
      { key: "image_url", label: "Image", type: "image", imageFolder: "birds" },
    ],
  },
  detail_images: {
    displayField: "caption",
    imageField: "image_url",
    fields: [
      { key: "entity_type", label: "Entity Type", type: "select", required: true, options: ["adornments", "thoughts", "bird_logs", "gallery_photos"] },
      { key: "entity_id", label: "Entity ID", type: "text", required: true },
      { key: "image_url", label: "Image", type: "image", imageFolder: "detail-gallery" },
      { key: "caption", label: "Caption", type: "text" },
      { key: "display_order", label: "Display Order", type: "number" },
    ],
  },
  experiences: {
    displayField: "role",
    fields: [
      { key: "role", label: "Role", type: "text", required: true },
      { key: "company", label: "Company", type: "text", required: true },
      { key: "type", label: "Type", type: "select", options: ["Full-time", "Internship", "Freelance", "Research", "Open Source", "Teaching"] },
      { key: "type_color", label: "Type Color", type: "select", options: ["text-secondary", "text-primary", "text-accent"] },
      { key: "timeline", label: "Timeline", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "stats", label: "Stats (JSON)", type: "textarea" },
      { key: "tech_stack", label: "Tech Stack", type: "tags" },
      { key: "display_order", label: "Display Order", type: "number" },
    ],
  },
  projects: {
    displayField: "title",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "summary", label: "Summary", type: "textarea" },
      { key: "tech_stack", label: "Tech Stack", type: "tags" },
      { key: "metrics", label: "Metrics", type: "text" },
      { key: "demo_url", label: "Demo URL", type: "text" },
      { key: "github_url", label: "GitHub URL", type: "text" },
      { key: "display_order", label: "Display Order", type: "number" },
    ],
  },
  education: {
    displayField: "degree",
    fields: [
      { key: "degree", label: "Degree", type: "text", required: true },
      { key: "institution", label: "Institution", type: "text", required: true },
      { key: "year", label: "Year", type: "text", required: true },
      { key: "score", label: "Score", type: "text" },
      { key: "display_order", label: "Display Order", type: "number" },
    ],
  },
  skill_categories: {
    displayField: "category",
    fields: [
      { key: "category", label: "Category Name", type: "text", required: true },
      { key: "skills", label: "Skills", type: "tags" },
      { key: "display_order", label: "Display Order", type: "number" },
    ],
  },
  honors: {
    displayField: "title",
    fields: [
      { key: "title", label: "Honor/Certification", type: "text", required: true },
      { key: "display_order", label: "Display Order", type: "number" },
    ],
  },
  resumes: {
    displayField: "role_label",
    fields: [
      { key: "role_label", label: "Role Label", type: "text", required: true },
      { key: "summary", label: "One-line Summary", type: "text" },
      { key: "tags", label: "Tags (skills)", type: "tags" },
      { key: "file_url", label: "Resume PDF", type: "file", imageFolder: "resumes", fileAccept: ".pdf,application/pdf" },
      { key: "display_order", label: "Display Order", type: "number" },
    ],
  },
  site_content: {
    displayField: "key",
    fields: [
      { key: "key", label: "Key", type: "text", required: true },
      { key: "value", label: "Value", type: "textarea", required: true },
    ],
  },
  site_stats: {
    displayField: "label",
    fields: [
      { key: "icon", label: "Icon (Terminal/Zap/Globe/ArrowUp)", type: "text", required: true },
      { key: "value", label: "Value", type: "text", required: true },
      { key: "label", label: "Label", type: "text", required: true },
      { key: "color", label: "Color Class", type: "text" },
      { key: "display_order", label: "Display Order", type: "number" },
    ],
  },
};

interface ContactSubmission {
  id: string;
  name: string;
  email: string | null;
  message: string;
  page_source: string;
  created_at: string;
}

interface PageVisit {
  id: string;
  page_path: string;
  referrer: string | null;
  user_agent: string | null;
  screen_width: number | null;
  created_at: string;
}

const AnalyticsView = ({ table }: { table: string }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await adminApi({ action: "list", table });
        if (result) setData(result);
      } catch (e) {
        console.error("Failed to fetch analytics:", e);
      }
      setLoading(false);
    };
    fetchData();
  }, [table]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (table === "contact_submissions") {
    const submissions = data as ContactSubmission[];
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">{submissions.length} message{submissions.length !== 1 ? "s" : ""} received</p>
        {submissions.length === 0 ? (
          <div className="glass-card p-10 text-center text-muted-foreground">No messages yet.</div>
        ) : (
          submissions.map((sub) => (
            <div key={sub.id} className="glass-card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-foreground">{sub.name}</h3>
                <span className="text-xs text-muted-foreground font-mono">
                  {new Date(sub.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              {sub.email && <p className="text-xs text-primary">{sub.email}</p>}
              <p className="text-sm text-muted-foreground">{sub.message}</p>
              <span className="inline-block text-[10px] font-mono text-muted-foreground/50 bg-muted/20 px-2 py-0.5 rounded">
                from: {sub.page_source}
              </span>
            </div>
          ))
        )}
      </div>
    );
  }

  if (table === "page_visits") {
    const visits = data as PageVisit[];

    // Group by page path
    const pageCounts: Record<string, number> = {};
    visits.forEach((v) => {
      pageCounts[v.page_path] = (pageCounts[v.page_path] || 0) + 1;
    });
    const sortedPages = Object.entries(pageCounts).sort((a, b) => b[1] - a[1]);

    // Group by date
    const dailyCounts: Record<string, number> = {};
    visits.forEach((v) => {
      const day = new Date(v.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      dailyCounts[day] = (dailyCounts[day] || 0) + 1;
    });

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card p-5 text-center">
            <p className="text-3xl font-display font-bold text-primary">{visits.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Page Views</p>
          </div>
          <div className="glass-card p-5 text-center">
            <p className="text-3xl font-display font-bold text-accent">{sortedPages.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Unique Pages</p>
          </div>
          <div className="glass-card p-5 text-center">
            <p className="text-3xl font-display font-bold text-secondary">{Object.keys(dailyCounts).length}</p>
            <p className="text-xs text-muted-foreground mt-1">Active Days</p>
          </div>
        </div>

        <div>
          <h3 className="font-display font-semibold text-sm text-foreground mb-3">Most Visited Pages</h3>
          <div className="space-y-2">
            {sortedPages.map(([path, count]) => (
              <div key={path} className="glass-card px-4 py-3 flex items-center justify-between">
                <span className="text-sm font-mono text-foreground">{path}</span>
                <span className="text-sm font-display font-bold text-primary">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display font-semibold text-sm text-foreground mb-3">Recent Visits</h3>
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {visits.slice(0, 50).map((v) => (
              <div key={v.id} className="flex items-center gap-4 text-xs py-2 border-b border-border/20">
                <span className="font-mono text-foreground w-32 shrink-0">{v.page_path}</span>
                <span className="text-muted-foreground truncate flex-1">{v.referrer || "direct"}</span>
                <span className="text-muted-foreground/50 shrink-0">
                  {v.screen_width && `${v.screen_width}px`}
                </span>
                <span className="text-muted-foreground/50 font-mono shrink-0">
                  {new Date(v.created_at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("adornments");
  const [activeSection, setActiveSection] = useState<"wanderer" | "recruiter" | "analytics">("wanderer");

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") !== "true") {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    sessionStorage.removeItem("admin_passcode");
    navigate("/");
  };

  const tabs = activeSection === "wanderer" ? wandererTabs : activeSection === "recruiter" ? recruiterTabs : analyticsTabs;
  const config = fieldConfigs[activeTab];

  const handleSectionChange = (section: "wanderer" | "recruiter" | "analytics") => {
    setActiveSection(section);
    if (section === "wanderer") setActiveTab(wandererTabs[0].key);
    else if (section === "recruiter") setActiveTab(recruiterTabs[0].key);
    else setActiveTab(analyticsTabs[0].key);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            className="font-display font-bold text-2xl text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Admin Dashboard
          </motion.h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 glass-card text-sm text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Section Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => handleSectionChange("wanderer")}
            className={`px-5 py-2 text-sm font-mono rounded-sm transition-all duration-200 ${
              activeSection === "wanderer"
                ? "bg-accent/15 text-accent border border-accent/30"
                : "text-muted-foreground hover:text-foreground border border-transparent"
            }`}
          >
            Wanderer
          </button>
          <button
            onClick={() => handleSectionChange("recruiter")}
            className={`px-5 py-2 text-sm font-mono rounded-sm transition-all duration-200 ${
              activeSection === "recruiter"
                ? "bg-primary/15 text-primary border border-primary/30"
                : "text-muted-foreground hover:text-foreground border border-transparent"
            }`}
          >
            Recruiter
          </button>
          <button
            onClick={() => handleSectionChange("analytics")}
            className={`px-5 py-2 text-sm font-mono rounded-sm transition-all duration-200 ${
              activeSection === "analytics"
                ? "bg-secondary/15 text-secondary border border-secondary/30"
                : "text-muted-foreground hover:text-foreground border border-transparent"
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 flex-wrap mb-8 border-b border-border/30 pb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-sm transition-all duration-200 ${
                  activeTab === tab.key
                    ? "bg-accent/15 text-accent border border-accent/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {activeSection === "analytics" ? (
          <AnalyticsView key={activeTab} table={activeTab} />
        ) : (
          config && (
            <ContentManager
              key={activeTab}
              table={activeTab}
              fields={config.fields}
              title={tabs.find((t) => t.key === activeTab)?.label || ""}
              displayField={config.displayField}
              imageField={config.imageField}
              hasGallery={config.hasGallery}
              galleryEntityType={config.galleryEntityType}
            />
          )
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
