
-- Resumes table for role-specific resume PDFs
CREATE TABLE public.resumes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  role_label text NOT NULL,
  file_url text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read resumes" ON public.resumes FOR SELECT USING (true);

-- Site content key-value store for about text, taglines, etc.
CREATE TABLE public.site_content (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  value text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_content" ON public.site_content FOR SELECT USING (true);

-- Site stats for Engineering at Scale numbers
CREATE TABLE public.site_stats (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  icon text NOT NULL DEFAULT 'Terminal',
  value text NOT NULL,
  label text NOT NULL,
  color text NOT NULL DEFAULT 'text-secondary',
  display_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_stats" ON public.site_stats FOR SELECT USING (true);
