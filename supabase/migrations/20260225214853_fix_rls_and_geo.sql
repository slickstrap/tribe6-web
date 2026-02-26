-- Migration: Fix RLS policies to allow anon keys to view/edit admin data since we have no Auth setup yet
-- In a real production app with multiple users, we would implement Auth and use the previous policies.

-- Drop the old overly restrictive policies
DROP POLICY IF EXISTS "Enable all for authenticated users on clicks" ON public.clicks;
DROP POLICY IF EXISTS "Enable all for authenticated users on blocked_ips" ON public.blocked_ips;
DROP POLICY IF EXISTS "Enable select for anon on blocked_ips" ON public.blocked_ips;

-- Add permissive policies for the anon key so the frontend works
CREATE POLICY "Enable all for anon on clicks" ON public.clicks
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable all for anon on blocked_ips" ON public.blocked_ips
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);
