-- Migration: Update handle_new_user trigger for default pending status
-- Ensures all new signups (except the first one) start as 'pending'

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  user_count     int;
  assigned_role  text;
  assigned_status text;
BEGIN
  -- Count existing users to identify the first admin
  SELECT count(*) INTO user_count FROM auth.users;

  IF user_count <= 1 THEN
    -- Very first user → auto-admin, auto-approved
    assigned_role   := 'admin';
    assigned_status := 'approved';
  ELSE
    -- All other signups → restricted user, pending approval
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
