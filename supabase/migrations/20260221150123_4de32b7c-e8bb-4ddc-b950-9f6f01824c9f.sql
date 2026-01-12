
-- Create experiences table
CREATE TABLE public.experiences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'Full-time',
  type_color TEXT NOT NULL DEFAULT 'text-secondary',
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  timeline TEXT NOT NULL,
  description TEXT,
  stats JSONB DEFAULT '[]'::jsonb,
  tech_stack TEXT[] DEFAULT '{}'::text[],
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read experiences"
  ON public.experiences FOR SELECT
  USING (true);

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  tech_stack TEXT[] DEFAULT '{}'::text[],
  metrics TEXT,
  demo_url TEXT DEFAULT '#',
  github_url TEXT DEFAULT '#',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read projects"
  ON public.projects FOR SELECT
  USING (true);

-- Create education table
CREATE TABLE public.education (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  year TEXT NOT NULL,
  score TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read education"
  ON public.education FOR SELECT
  USING (true);

-- Create honors table
CREATE TABLE public.honors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.honors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read honors"
  ON public.honors FOR SELECT
  USING (true);

-- Create skill_categories table
CREATE TABLE public.skill_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}'::text[],
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read skill_categories"
  ON public.skill_categories FOR SELECT
  USING (true);
