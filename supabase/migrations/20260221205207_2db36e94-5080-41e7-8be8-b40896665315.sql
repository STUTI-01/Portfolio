
-- Contact/Guestbook submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  message TEXT NOT NULL,
  page_source TEXT DEFAULT 'recruiter',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit (insert)
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- Only readable via admin edge function (no public select)
CREATE POLICY "No public read on contact_submissions"
  ON public.contact_submissions
  FOR SELECT
  USING (false);

-- Page visit logs
CREATE TABLE public.page_visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  screen_width INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.page_visits ENABLE ROW LEVEL SECURITY;

-- Anyone can insert visits
CREATE POLICY "Anyone can log visits"
  ON public.page_visits
  FOR INSERT
  WITH CHECK (true);

-- No public read
CREATE POLICY "No public read on page_visits"
  ON public.page_visits
  FOR SELECT
  USING (false);
