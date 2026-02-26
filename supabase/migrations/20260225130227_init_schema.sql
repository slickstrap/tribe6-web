-- Migration: 20260225130227_init_schema
-- Create clicks table
CREATE TABLE public.clicks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  ip text NOT NULL,
  geo_country text,
  geo_city text,
  device text,
  browser text,
  path text,
  is_blocked boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create blocked_ips table
CREATE TABLE public.blocked_ips (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  ip text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_ips ENABLE ROW LEVEL SECURITY;

-- Policy: Allow inserts to clicks from authenticated/anon roles (Edge Function can insert)
CREATE POLICY "Enable insert for clicks" ON public.clicks
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow all operations to authenticated users for admin dashboard
CREATE POLICY "Enable all for authenticated users on clicks" ON public.clicks
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Allow all operations to authenticated users for admin dashboard for blocked_ips
CREATE POLICY "Enable all for authenticated users on blocked_ips" ON public.blocked_ips
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Allow select for edge functions to check blocked ips
CREATE POLICY "Enable select for anon on blocked_ips" ON public.blocked_ips
  FOR SELECT
  TO anon
  USING (true);
