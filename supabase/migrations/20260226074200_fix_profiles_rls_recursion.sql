-- Migration: Fix profiles RLS recursion
-- This migration replaces the recursive admin policy with a security definer function.

-- 1. Create a function to check if the current user is an admin
-- SECURITY DEFINER allows the function to run with the privileges of the creator (usually postgres/service_role),
-- bypassing RLS checks on the tables it queries.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Drop the problematic recursive policy
DROP POLICY IF EXISTS "Admins can do everything on profiles" ON public.profiles;

-- 3. Re-create the admin policy using the security definer function
CREATE POLICY "Admins can do everything on profiles" ON public.profiles
FOR ALL USING (public.is_admin());

-- 4. Update other policies that might be using the same recursive pattern for consistency
DROP POLICY IF EXISTS "Admins manage page_access" ON public.page_access;
CREATE POLICY "Admins manage page_access" ON public.page_access
FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins manage access_profiles" ON public.access_profiles;
CREATE POLICY "Admins manage access_profiles" ON public.access_profiles
FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins manage changelog" ON public.changelog;
CREATE POLICY "Admins manage changelog" ON public.changelog
FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins manage articles" ON public.knowledge_articles;
CREATE POLICY "Admins manage articles" ON public.knowledge_articles
FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins manage geo_config" ON public.geo_config;
CREATE POLICY "Admins manage geo_config" ON public.geo_config
FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins manage seo config" ON public.seo_config;
CREATE POLICY "Admins manage seo config" ON public.seo_config
FOR ALL USING (public.is_admin());
