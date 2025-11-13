-- Create customer_profiles table
CREATE TABLE public.customer_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name text,
  job_title text,
  phone text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for customer_profiles
CREATE POLICY "Users can view own customer profile"
  ON public.customer_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own customer profile"
  ON public.customer_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own customer profile"
  ON public.customer_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Add updated_at trigger
CREATE TRIGGER update_customer_profiles_updated_at
  BEFORE UPDATE ON public.customer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Migrate existing customer data from profiles table
INSERT INTO public.customer_profiles (user_id, company_name, job_title, phone, created_at)
SELECT 
  id as user_id,
  company_name,
  job_title,
  phone,
  created_at
FROM public.profiles
WHERE user_type = 'customer' AND company_name IS NOT NULL;

-- Remove user_type and customer-specific columns from profiles table
ALTER TABLE public.profiles DROP COLUMN IF EXISTS user_type;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS company_name;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS job_title;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS phone;