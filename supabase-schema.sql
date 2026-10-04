-- ============================================================================
-- FASHOW MARKETPLACE — SUPABASE DATABASE SCHEMA & POLICIES
-- Run this in your Supabase Project: SQL Editor -> New Query -> Run
-- ============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create User Profiles Table (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'company')),
  
  -- Student specific fields
  full_name TEXT,
  school TEXT,
  major TEXT,
  grad_year TEXT,
  bio TEXT,
  portfolio_url TEXT,
  instagram TEXT,
  linkedin TEXT,
  skills TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  
  -- Company specific fields
  company_name TEXT,
  industry TEXT,
  location TEXT,
  website TEXT,
  company_bio TEXT,
  logo_url TEXT,
  banner_url TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Create Opportunities Table (Jobs, Castings, Apprenticeships)
CREATE TABLE IF NOT EXISTS public.opportunities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL, -- 'Internship', 'Part-Time', 'Full-Time', 'Modeling', 'Brand Ambassador'
  term TEXT NOT NULL, -- 'Part-Time', 'Full-Time', 'Freelance'
  category TEXT NOT NULL, -- 'Marketing', 'Design', 'Styling', 'Photography', 'Modeling', 'PR'
  location TEXT NOT NULL,
  compensation TEXT NOT NULL,
  deadline TEXT NOT NULL,
  description TEXT NOT NULL,
  responsibilities TEXT[] DEFAULT '{}',
  requirements TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Create Applications Table (Student submissions to opportunities)
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Submitted' CHECK (status IN ('Submitted', 'Under Review', 'Interview', 'Accepted', 'Rejected')),
  portfolio_link TEXT,
  resume_url TEXT,
  pitch TEXT,
  note TEXT DEFAULT 'Application received by brand creative team.',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Prevent multiple applications from same student to same opportunity
  CONSTRAINT unique_student_opportunity UNIQUE (opportunity_id, student_id)
);

-- 5. Automatically create or update public.profiles on new Auth sign-up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    role,
    full_name,
    school,
    major,
    grad_year,
    company_name,
    industry,
    location,
    website,
    company_bio,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'school',
    NEW.raw_user_meta_data->>'major',
    NEW.raw_user_meta_data->>'grad_year',
    NEW.raw_user_meta_data->>'company_name',
    NEW.raw_user_meta_data->>'industry',
    NEW.raw_user_meta_data->>'location',
    NEW.raw_user_meta_data->>'website',
    NEW.raw_user_meta_data->>'company_bio',
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to execute on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone can view profiles, users can update their own
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Opportunities: Public can view active opportunities; companies can manage their own
CREATE POLICY "Active opportunities are viewable by everyone" 
  ON public.opportunities FOR SELECT USING (is_active = true);

CREATE POLICY "Companies can insert opportunities" 
  ON public.opportunities FOR INSERT WITH CHECK (auth.uid() = company_id);

CREATE POLICY "Companies can update own opportunities" 
  ON public.opportunities FOR UPDATE USING (auth.uid() = company_id);

CREATE POLICY "Companies can delete own opportunities" 
  ON public.opportunities FOR DELETE USING (auth.uid() = company_id);

-- Applications: Students can see their own; companies can see applications for their roles
CREATE POLICY "Students can view own applications" 
  ON public.applications FOR SELECT USING (
    auth.uid() = student_id OR 
    auth.uid() IN (SELECT company_id FROM public.opportunities WHERE id = opportunity_id)
  );

CREATE POLICY "Students can create applications" 
  ON public.applications FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Companies can update status of applications for their roles" 
  ON public.applications FOR UPDATE USING (
    auth.uid() IN (SELECT company_id FROM public.opportunities WHERE id = opportunity_id)
  );

-- ============================================================================
-- 7. SEED INITIAL SAMPLE DATA (Optional but recommended)
-- ============================================================================

-- Add default indexes for performance
CREATE INDEX IF NOT EXISTS idx_opportunities_category ON public.opportunities(category);
CREATE INDEX IF NOT EXISTS idx_opportunities_type ON public.opportunities(type);
CREATE INDEX IF NOT EXISTS idx_applications_student ON public.applications(student_id);
CREATE INDEX IF NOT EXISTS idx_applications_opportunity ON public.applications(opportunity_id);
