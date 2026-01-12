import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ContentManager, { FieldConfig } from "@/components/admin/ContentManager";
import { LogOut, Gem, PenTool, Camera, BookOpen, Bird, Image, Briefcase, FolderOpen, GraduationCap, Award, Wrench } from "lucide-react";

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
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("adornments");
  const [activeSection, setActiveSection] = useState<"wanderer" | "recruiter">("wanderer");

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") !== "true") {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    navigate("/");
  };

  const tabs = activeSection === "wanderer" ? wandererTabs : recruiterTabs;
  const config = fieldConfigs[activeTab];

  const handleSectionChange = (section: "wanderer" | "recruiter") => {
    setActiveSection(section);
    const firstTab = section === "wanderer" ? wandererTabs[0].key : recruiterTabs[0].key;
    setActiveTab(firstTab);
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

        {/* Content Manager */}
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
      </div>
    </div>
  );
};

export default AdminDashboard;
