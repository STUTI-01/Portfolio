
-- Add storage policies for wanderer-media bucket (public read, service role handles writes)
CREATE POLICY "Public read wanderer media"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'wanderer-media');
