-- Migration: Add approval_status to profiles for admin-approval registration flow
-- The first user (admin) is auto-approved. All others start as 'pending'.

-- 1. Add the approval_status column (default 'pending' for new rows)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS approval_status text NOT NULL DEFAULT 'pending';

-- 2. Approve any existing users (they were registered before this feature)
UPDATE public.profiles SET approval_status = 'approved' WHERE approval_status = 'pending';

-- 3. Replace the handle_new_user trigger to set approval_status correctly.
--    First user => admin + approved. Everyone else => user + pending.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  user_count int;
  assigned_role text;
  assigned_status text;
BEGIN
  SELECT count(*) INTO user_count FROM auth.users;

  IF user_count <= 1 THEN
    assigned_role   := 'admin';
    assigned_status := 'approved';
  ELSE
    assigned_role   := 'user';
    assigned_status := 'pending';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, company, username, custom_fields, role, approval_status)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'company',
    new.raw_user_meta_data->>'username',
    COALESCE(new.raw_user_meta_data->'custom_fields', '{}'::jsonb),
    assigned_role,
    assigned_status
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. RLS: Admins can update approval_status on any profile
--    (The existing "Admins can do everything on profiles" policy already covers this,
--     but we add an explicit named policy for clarity / future auditing.)
DROP POLICY IF EXISTS "Admins can update approval_status" ON public.profiles;
CREATE POLICY "Admins can update approval_status" ON public.profiles
  FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
