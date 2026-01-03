
-- Fix RLS policies: drop restrictive policies and create permissive ones
-- experiences
DROP POLICY IF EXISTS "Public read experiences" ON public.experiences;
CREATE POLICY "Public read experiences" ON public.experiences FOR SELECT USING (true);

-- projects
DROP POLICY IF EXISTS "Public read projects" ON public.projects;
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);

-- education
DROP POLICY IF EXISTS "Public read education" ON public.education;
CREATE POLICY "Public read education" ON public.education FOR SELECT USING (true);

-- skill_categories
DROP POLICY IF EXISTS "Public read skill_categories" ON public.skill_categories;
CREATE POLICY "Public read skill_categories" ON public.skill_categories FOR SELECT USING (true);

-- honors
DROP POLICY IF EXISTS "Public read honors" ON public.honors;
CREATE POLICY "Public read honors" ON public.honors FOR SELECT USING (true);

-- site_content
DROP POLICY IF EXISTS "Public read site_content" ON public.site_content;
CREATE POLICY "Public read site_content" ON public.site_content FOR SELECT USING (true);

-- site_stats
DROP POLICY IF EXISTS "Public read site_stats" ON public.site_stats;
CREATE POLICY "Public read site_stats" ON public.site_stats FOR SELECT USING (true);

-- resumes
DROP POLICY IF EXISTS "Public read resumes" ON public.resumes;
CREATE POLICY "Public read resumes" ON public.resumes FOR SELECT USING (true);

-- adornments
DROP POLICY IF EXISTS "Public read adornments" ON public.adornments;
CREATE POLICY "Public read adornments" ON public.adornments FOR SELECT USING (true);

-- bird_logs
DROP POLICY IF EXISTS "Public read bird logs" ON public.bird_logs;
CREATE POLICY "Public read bird_logs" ON public.bird_logs FOR SELECT USING (true);

-- detail_images
DROP POLICY IF EXISTS "Public read detail images" ON public.detail_images;
CREATE POLICY "Public read detail_images" ON public.detail_images FOR SELECT USING (true);

-- gallery_photos
DROP POLICY IF EXISTS "Public read gallery photos" ON public.gallery_photos;
CREATE POLICY "Public read gallery_photos" ON public.gallery_photos FOR SELECT USING (true);

-- poems
DROP POLICY IF EXISTS "Public read poems" ON public.poems;
CREATE POLICY "Public read poems" ON public.poems FOR SELECT USING (true);

-- thoughts
DROP POLICY IF EXISTS "Public read published thoughts" ON public.thoughts;
CREATE POLICY "Public read published thoughts" ON public.thoughts FOR SELECT USING (is_published = true);
