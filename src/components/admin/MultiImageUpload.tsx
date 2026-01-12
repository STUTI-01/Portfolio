import { useState, useRef } from "react";
import { Upload, X, Loader2, Plus } from "lucide-react";
import { adminUpload, adminApi } from "@/lib/adminApi";

interface MultiImageUploadProps {
  entityType: string;
  entityId: string;
  images: { id: string; image_url: string; caption: string | null; display_order: number }[];
  onRefresh: () => void;
}

const MultiImageUpload = ({ entityType, entityId, images, onRefresh }: MultiImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const url = await adminUpload(files[i], "detail-gallery");
        await adminApi({
          action: "create",
          table: "detail_images",
          data: {
            entity_type: entityType,
            entity_id: entityId,
            image_url: url,
            display_order: images.length + i,
          },
        });
      }
      onRefresh();
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      await adminApi({ action: "delete", table: "detail_images", id });
      onRefresh();
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
    setDeleting(null);
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider">
        Gallery Images
      </label>
      <div className="flex flex-wrap gap-2">
        {images.map((img) => (
          <div key={img.id} className="relative group">
            <img
              src={img.image_url}
              alt={img.caption || ""}
              className="w-20 h-20 object-cover rounded-sm border border-border"
            />
            <button
              type="button"
              onClick={() => handleDelete(img.id)}
              disabled={deleting === img.id}
              className="absolute -top-2 -right-2 w-5 h-5 bg-destructive rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {deleting === img.id ? (
                <Loader2 className="w-3 h-3 text-destructive-foreground animate-spin" />
              ) : (
                <X className="w-3 h-3 text-destructive-foreground" />
              )}
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-20 h-20 border-2 border-dashed border-border rounded-sm flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-accent/50 hover:text-accent transition-colors"
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span className="text-[9px] font-mono">Add</span>
            </>
          )}
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        className="hidden"
      />
    </div>
  );
};

export default MultiImageUpload;
