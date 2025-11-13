-- Extend profiles table with additional customer fields
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS company_name TEXT,
ADD COLUMN IF NOT EXISTS job_title TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}'::jsonb;

-- Create storage bucket for job descriptions
INSERT INTO storage.buckets (id, name, public)
VALUES ('job-descriptions', 'job-descriptions', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for job descriptions bucket
CREATE POLICY "Users can upload their own job descriptions"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'job-descriptions' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own job descriptions"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'job-descriptions' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own job descriptions"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'job-descriptions' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own job descriptions"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'job-descriptions' AND
  auth.uid()::text = (storage.foldername(name))[1]
);