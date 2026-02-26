-- Migration: registration_requests table
-- Stores pending registrations WITHOUT creating auth users.
-- Auth user is only created (via invite) when admin approves.

CREATE TABLE IF NOT EXISTS public.registration_requests (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email       text NOT NULL UNIQUE,
  full_name   text,
  username    text,
  company     text,
  custom_fields jsonb DEFAULT '{}'::jsonb,
  status      text NOT NULL DEFAULT 'pending', -- 'pending' | 'approved' | 'rejected'
  created_at  timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL
);

ALTER TABLE public.registration_requests ENABLE ROW LEVEL SECURITY;

-- Anyone (anon) can submit a registration request
CREATE POLICY "Anon can insert registration requests"
  ON public.registration_requests FOR INSERT
  WITH CHECK (true);

-- Admins can do everything
CREATE POLICY "Admins manage registration requests"
  ON public.registration_requests FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- -------------------------------------------------------
-- Update handle_new_user trigger so that users created via
-- admin invite (approved_by_admin = true in metadata)
-- get approval_status = 'approved' automatically.
-- -------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  user_count     int;
  assigned_role  text;
  assigned_status text;
BEGIN
  SELECT count(*) INTO user_count FROM auth.users;

  IF user_count <= 1 THEN
    -- Very first user → auto-admin, auto-approved
    assigned_role   := 'admin';
    assigned_status := 'approved';
  ELSIF new.raw_user_meta_data->>'approved_by_admin' = 'true' THEN
    -- Created via admin invite → approved
    assigned_role   := 'user';
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
