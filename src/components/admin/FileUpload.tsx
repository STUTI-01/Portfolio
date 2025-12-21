import { useState, useRef } from "react";
import { Upload, X, Loader2, FileText } from "lucide-react";
import { adminUpload } from "@/lib/adminApi";

interface FileUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  folder: string;
  accept?: string;
}

const FileUpload = ({ value, onChange, folder, accept = ".pdf" }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await adminUpload(file, folder);
      onChange(url);
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const fileName = value ? decodeURIComponent(value.split("/").pop() || "file") : null;

  return (
    <div className="space-y-2">
      {value ? (
        <div className="flex items-center gap-3 p-3 bg-muted rounded-sm border border-border">
          <FileText className="w-5 h-5 text-primary shrink-0" />
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm text-primary truncate hover:underline">
            {fileName}
          </a>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="ml-auto w-5 h-5 bg-destructive rounded-full flex items-center justify-center shrink-0"
          >
            <X className="w-3 h-3 text-destructive-foreground" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full p-4 border-2 border-dashed border-border rounded-sm flex items-center justify-center gap-2 text-muted-foreground hover:border-accent/50 hover:text-accent transition-colors"
        >
          {uploading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Upload className="w-5 h-5" />
              <span className="text-sm font-mono">Upload PDF</span>
            </>
          )}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
