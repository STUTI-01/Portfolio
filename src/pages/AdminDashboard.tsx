import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ContentManager, { FieldConfig } from "@/components/admin/ContentManager";
import { LogOut, Gem, PenTool, Camera, BookOpen, Bird, Image } from "lucide-react";

const tabs = [
  { key: "adornments", label: "Jewellery", icon: Gem },
  { key: "poems", label: "Poems", icon: PenTool },
  { key: "gallery_photos", label: "Photos", icon: Camera },
  { key: "thoughts", label: "Thoughts", icon: BookOpen },
  { key: "bird_logs", label: "Birds", icon: Bird },
  { key: "detail_images", label: "Gallery Images", icon: Image },
];

const fieldConfigs: Record<string, { fields: FieldConfig[]; displayField: string; imageField?: string }> = {
  adornments: {
    displayField: "title",
    imageField: "image_url",
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
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("adornments");

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") !== "true") {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    navigate("/");
  };

  const config = fieldConfigs[activeTab];

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
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
