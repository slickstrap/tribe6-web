-- Migration: Fix Clicks & Blocked IPs RLS
-- Allows admins to view analytics and manage blocked IPs using the is_admin() function.

-- 1. Ensure clicks policies are correct
DROP POLICY IF EXISTS "Enable all for anon on clicks" ON public.clicks;
DROP POLICY IF EXISTS "Enable all for authenticated users on clicks" ON public.clicks;
DROP POLICY IF EXISTS "Enable insert for clicks" ON public.clicks;

-- Allow EVERYONE to log their traffic (INSERT)
CREATE POLICY "Enable insert for everyone" ON public.clicks
FOR INSERT WITH CHECK (true);

-- Allow ADMINS to see and manage all clicks (SELECT/DELETE/UPDATE)
CREATE POLICY "Admins manage clicks" ON public.clicks
FOR ALL USING (public.is_admin());


-- 2. Ensure blocked_ips policies are correct
DROP POLICY IF EXISTS "Enable all for anon on blocked_ips" ON public.blocked_ips;
DROP POLICY IF EXISTS "Enable all for authenticated users on blocked_ips" ON public.blocked_ips;
DROP POLICY IF EXISTS "Enable select for anon on blocked_ips" ON public.blocked_ips;

-- Allow EVERYONE to read blocked IPs (so the Edge Function can check if using anon key, 
-- though we just switched it to service_role, it's good to have a backup).
CREATE POLICY "Everyone can view blocked IPs" ON public.blocked_ips
FOR SELECT USING (true);

-- Allow ADMINS to manage blocked IPs
CREATE POLICY "Admins manage blocked_ips" ON public.blocked_ips
FOR ALL USING (public.is_admin());
