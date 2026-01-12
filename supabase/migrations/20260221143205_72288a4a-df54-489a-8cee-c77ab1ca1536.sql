
-- Add footnote column to the 4 content tables (not poems)
ALTER TABLE public.adornments ADD COLUMN footnote text;
ALTER TABLE public.thoughts ADD COLUMN footnote text;
ALTER TABLE public.bird_logs ADD COLUMN footnote text;
ALTER TABLE public.gallery_photos ADD COLUMN footnote text;

-- Create a shared detail_images table for per-item photo galleries
CREATE TABLE public.detail_images (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_type text NOT NULL,  -- 'adornments', 'thoughts', 'bird_logs', 'gallery_photos'
  entity_id uuid NOT NULL,
  image_url text NOT NULL,
  caption text,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Index for fast lookups
CREATE INDEX idx_detail_images_entity ON public.detail_images (entity_type, entity_id);

-- Enable RLS
ALTER TABLE public.detail_images ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read detail images"
  ON public.detail_images
  FOR SELECT
  USING (true);
