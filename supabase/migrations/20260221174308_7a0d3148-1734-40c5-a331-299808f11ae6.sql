ALTER TABLE public.resumes ADD COLUMN summary text;
ALTER TABLE public.resumes ADD COLUMN tags text[] DEFAULT '{}'::text[];