
-- Storage bucket for wanderer media (photos, gallery images, etc.)
INSERT INTO storage.buckets (id, name, public) VALUES ('wanderer-media', 'wanderer-media', true);

CREATE POLICY "Public read access for wanderer media"
ON storage.objects FOR SELECT
USING (bucket_id = 'wanderer-media');

CREATE POLICY "Service role can manage wanderer media"
ON storage.objects FOR ALL
USING (bucket_id = 'wanderer-media' AND auth.role() = 'service_role')
WITH CHECK (bucket_id = 'wanderer-media' AND auth.role() = 'service_role');

-- ═══ ADORNMENTS ═══
CREATE TABLE public.adornments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT DEFAULT 'general',
  materials TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.adornments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read adornments" ON public.adornments FOR SELECT USING (true);

-- ═══ THOUGHTS (essays/articles) ═══
CREATE TABLE public.thoughts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'essay',
  tags TEXT[] DEFAULT '{}',
  cover_image_url TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.thoughts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published thoughts" ON public.thoughts FOR SELECT USING (is_published = true);

-- ═══ BIRD LOG ═══
CREATE TABLE public.bird_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  species_name TEXT NOT NULL,
  common_name TEXT,
  location TEXT,
  habitat TEXT,
  description TEXT,
  image_url TEXT,
  sighting_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.bird_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read bird logs" ON public.bird_logs FOR SELECT USING (true);

-- ═══ GALLERY (photography) ═══
CREATE TABLE public.gallery_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  location TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gallery photos" ON public.gallery_photos FOR SELECT USING (true);

-- ═══ POEMS ═══
CREATE TABLE public.poems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'English',
  theme TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.poems ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read poems" ON public.poems FOR SELECT USING (true);

-- Updated_at trigger for thoughts
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_thoughts_updated_at
BEFORE UPDATE ON public.thoughts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
