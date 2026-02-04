import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Loader2, Save, X, Image as ImageIcon } from "lucide-react";
import { adminApi } from "@/lib/adminApi";
import ImageUpload from "@/components/admin/ImageUpload";
import MultiImageUpload from "@/components/admin/MultiImageUpload";
import FileUpload from "@/components/admin/FileUpload";
import { supabase } from "@/integrations/supabase/client";

export interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "textarea" | "select" | "boolean" | "date" | "number" | "image" | "file" | "tags";
  options?: string[];
  required?: boolean;
  imageFolder?: string;
  fileAccept?: string;
}

interface ContentManagerProps {
  table: string;
  fields: FieldConfig[];
  title: string;
  displayField: string;
  imageField?: string;
  hasGallery?: boolean;
  galleryEntityType?: string;
}

const ContentManager = ({ table, fields, title, displayField, imageField, hasGallery, galleryEntityType }: ContentManagerProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<Record<string, any[]>>({});
  const editFormRef = useRef<HTMLDivElement>(null);

  // Click outside to cancel editing
  useEffect(() => {
    if (!editing) return;
    const handler = (e: MouseEvent) => {
      if (editFormRef.current && !editFormRef.current.contains(e.target as Node)) {
        setEditing(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [editing]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await adminApi({ action: "list", table });
      setItems(data);
      // Fetch gallery images for items with gallery support
      if (hasGallery && galleryEntityType && data.length > 0) {
        const { data: images } = await supabase
          .from("detail_images")
          .select("*")
          .eq("entity_type", galleryEntityType)
          .order("display_order");
        if (images) {
          const grouped: Record<string, any[]> = {};
          images.forEach((img: any) => {
            if (!grouped[img.entity_id]) grouped[img.entity_id] = [];
            grouped[img.entity_id].push(img);
          });
          setGalleryImages(grouped);
        }
      }
    } catch (err: any) {
      alert("Failed to load: " + err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [table]);

  const handleNew = () => {
    const empty: any = {};
    fields.forEach((f) => {
      if (f.type === "boolean") empty[f.key] = false;
      else if (f.type === "number") empty[f.key] = 0;
      else if (f.type === "tags") empty[f.key] = [];
      else empty[f.key] = "";
    });
    setEditing(empty);
    setIsNew(true);
  };

  const handleEdit = (item: any) => {
    setEditing({ ...item });
    setIsNew(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data: any = {};
      fields.forEach((f) => {
        if (editing[f.key] !== undefined) {
          data[f.key] = editing[f.key];
        }
      });

      if (isNew) {
        await adminApi({ action: "create", table, data });
      } else {
        await adminApi({ action: "update", table, data, id: editing.id });
      }
      setEditing(null);
      fetchItems();
    } catch (err: any) {
      alert("Save failed: " + err.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    setDeleting(id);
    try {
      await adminApi({ action: "delete", table, id });
      fetchItems();
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
    setDeleting(null);
  };

  const updateField = (key: string, value: any) => {
    setEditing((prev: any) => ({ ...prev, [key]: value }));
  };

  const renderField = (field: FieldConfig) => {
    const value = editing?.[field.key];

    switch (field.type) {
      case "image":
        return (
          <ImageUpload
            value={value || null}
            onChange={(url) => updateField(field.key, url)}
            folder={field.imageFolder || table}
          />
        );
      case "file":
        return (
          <FileUpload
            value={value || null}
            onChange={(url) => updateField(field.key, url)}
            folder={field.imageFolder || table}
            accept={field.fileAccept || ".pdf"}
          />
        );
      case "textarea":
        return (
          <textarea
            value={value || ""}
            onChange={(e) => updateField(field.key, e.target.value)}
            rows={6}
            className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50"
          />
        );
      case "select":
        return (
          <select
            value={value || ""}
            onChange={(e) => updateField(field.key, e.target.value)}
            className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent/50"
          >
            <option value="">Select...</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );
      case "boolean":
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => updateField(field.key, e.target.checked)}
              className="accent-accent"
            />
            <span className="text-sm text-muted-foreground">{field.label}</span>
          </label>
        );
      case "tags":
        return (
          <input
            type="text"
            value={Array.isArray(value) ? value.join(", ") : value || ""}
            onChange={(e) =>
              updateField(
                field.key,
                e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean)
              )
            }
            placeholder="tag1, tag2, tag3"
            className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50"
          />
        );
      case "number":
        return (
          <input
            type="number"
            value={value ?? 0}
            onChange={(e) => updateField(field.key, parseInt(e.target.value) || 0)}
            className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent/50"
          />
        );
      case "date":
        return (
          <input
            type="date"
            value={value || ""}
            onChange={(e) => updateField(field.key, e.target.value)}
            className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent/50"
          />
        );
      default:
        return (
          <input
            type="text"
            value={value || ""}
            onChange={(e) => updateField(field.key, e.target.value)}
            className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50"
          />
        );
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-lg text-foreground">{title}</h2>
        <button
          onClick={handleNew}
          className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-sm text-sm text-accent hover:bg-accent/20 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      {/* Edit Form */}
      <AnimatePresence>
        {editing && (
          <motion.div
            ref={editFormRef}
            className="mb-8 border border-accent/20 rounded-sm p-6 space-y-4"
            style={{ background: "hsla(30, 15%, 12%, 0.3)" }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-mono text-xs uppercase tracking-wider text-accent/70">
                {isNew ? "Create New" : "Edit"}
              </h3>
              <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div key={field.key} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                  {field.type !== "boolean" && (
                    <label className="block text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">
                      {field.label} {field.required && <span className="text-destructive">*</span>}
                    </label>
                  )}
                  {renderField(field)}
                </div>
              ))}
            </div>

            {/* Multi-image gallery upload (shown when editing existing item) */}
            {hasGallery && galleryEntityType && !isNew && editing?.id && (
              <div className="border-t border-border/30 pt-4 mt-4">
                <MultiImageUpload
                  entityType={galleryEntityType}
                  entityId={editing.id}
                  images={galleryImages[editing.id] || []}
                  onRefresh={fetchItems}
                />
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 bg-accent text-accent-foreground rounded-sm text-sm font-mono hover:brightness-110 transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isNew ? "Create" : "Update"}
              </button>
              <button
                onClick={() => setEditing(null)}
                className="px-5 py-2 border border-border rounded-sm text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Items List */}
      {loading ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground/50">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          Loading...
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground/50 font-mono text-sm">
          No items yet. Click "Add New" to create one.
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <motion.div
              key={item.id}
              className="flex items-center gap-4 p-4 border border-border/30 rounded-sm hover:border-border/60 transition-colors"
              style={{ background: "hsla(30, 15%, 12%, 0.15)" }}
              layout
            >
              {imageField && item[imageField] && item[imageField] !== "/placeholder.svg" ? (
                <img src={item[imageField]} alt="" className="w-10 h-10 object-cover rounded-sm flex-shrink-0" />
              ) : (
                imageField && (
                  <div className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center flex-shrink-0">
                    <ImageIcon className="w-4 h-4 text-muted-foreground/30" />
                  </div>
                )
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-display font-semibold text-foreground truncate">
                  {item[displayField]}
                </p>
                <p className="text-[10px] font-mono text-muted-foreground/50">
                  {new Date(item.created_at).toLocaleDateString()}
                  {hasGallery && galleryImages[item.id]?.length > 0 && (
                    <span className="ml-2 text-accent/50">
                      · {galleryImages[item.id].length} gallery image{galleryImages[item.id].length > 1 ? "s" : ""}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 text-muted-foreground hover:text-accent transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deleting === item.id}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                >
                  {deleting === item.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentManager;
