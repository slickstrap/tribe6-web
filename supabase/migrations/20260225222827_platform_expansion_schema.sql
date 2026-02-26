-- Migration: Tribe6 Platform Expansion
-- Includes Profiles, Auth Triggers, Dynamic Fields, Page Access, Geo Config, Knowledge Hub, and Changelog.

-- ==========================================
-- 1. PROFILES & DYNAMIC FIELDS
-- ==========================================

CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  role text DEFAULT 'user' NOT NULL, -- 'admin' or 'user'
  username text,
  full_name text,
  company text,
  email text,
  custom_fields jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Secure Profiles (Only owners can view/edit themselves. Admins can view/edit all)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can do everything on profiles" ON public.profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Trigger: Automatically create profile on signup
-- Note: The very first user to sign up will be granted the 'admin' role.
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
DECLARE
  user_count int;
  assigned_role text;
BEGIN
  -- Check if this is the first user
  SELECT count(*) INTO user_count FROM auth.users;
  IF user_count <= 1 THEN
    assigned_role := 'admin';
  ELSE
    assigned_role := 'user';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, company, username, custom_fields, role)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'company',
    new.raw_user_meta_data->>'username',
    COALESCE(new.raw_user_meta_data->'custom_fields', '{}'::jsonb),
    assigned_role
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


CREATE TABLE public.dynamic_fields (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  field_name text NOT NULL UNIQUE,
  label text NOT NULL,
  type text NOT NULL, -- e.g., 'text', 'select', 'date'
  is_mandatory boolean DEFAULT false NOT NULL,
  options jsonb DEFAULT '[]'::jsonb, -- if type is 'select'
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.dynamic_fields ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view dynamic fields" ON public.dynamic_fields FOR SELECT USING (true);
CREATE POLICY "Admins can edit dynamic fields" ON public.dynamic_fields FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);


-- ==========================================
-- 2. ACCESS CONTROL
-- ==========================================

CREATE TABLE public.page_access (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  page_identifier text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, page_identifier)
);

CREATE TABLE public.access_profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_name text NOT NULL UNIQUE,
  allowed_pages text[] DEFAULT '{}'::text[],
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.page_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own access" ON public.page_access FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins manage page_access" ON public.page_access FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins manage access_profiles" ON public.access_profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);


-- ==========================================
-- 3. CHANGELOG & KNOWLEDGE HUB
-- ==========================================

CREATE TABLE public.changelog (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  version text NOT NULL,
  title text NOT NULL,
  description text,
  functions_affected text[] DEFAULT '{}'::text[],
  status text DEFAULT 'deployed' NOT NULL, -- 'deployed', 'reverted'
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.knowledge_articles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  content_markdown text NOT NULL,
  category text NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.changelog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_articles ENABLE ROW LEVEL SECURITY;

-- Anyone can read changelog and active articles
CREATE POLICY "Anyone can view changelog" ON public.changelog FOR SELECT USING (true);
CREATE POLICY "Anyone can view active articles" ON public.knowledge_articles FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage changelog" ON public.changelog FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins manage articles" ON public.knowledge_articles FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);


-- ==========================================
-- 4. ADVANCED GEO CONFIG (DEFAULT ALLOW)
-- ==========================================
-- We will migrate away from the old `blocked_ips` list to checking this config + existing IPs.

CREATE TABLE public.geo_config (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  country_code text, -- e.g. 'US', 'AU'
  city text,
  is_blocked boolean DEFAULT true NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure we don't duplicate exact country+city blocks
CREATE UNIQUE INDEX idx_geo_config_unique ON public.geo_config(COALESCE(country_code, ''), COALESCE(city, ''));

ALTER TABLE public.geo_config ENABLE ROW LEVEL SECURITY;

-- Analytics dashboard needs this. Edge functions use service_role so they bypass RLS.
CREATE POLICY "Admins manage geo_config" ON public.geo_config FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);


-- ==========================================
-- 5. SEO MANAGER
-- ==========================================

CREATE TABLE public.seo_config (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  path text NOT NULL UNIQUE,
  is_crawled boolean DEFAULT true NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.seo_config ENABLE ROW LEVEL SECURITY;
-- Anon needs to read this to generate robots.txt dynamically
CREATE POLICY "Anon can view seo config" ON public.seo_config FOR SELECT USING (true);
CREATE POLICY "Admins manage seo config" ON public.seo_config FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
