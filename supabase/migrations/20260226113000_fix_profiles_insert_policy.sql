-- Migration: Allow users to insert their own profile
-- This is a safety measure in case the auth trigger fails.

CREATE POLICY "Users can insert own profile" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = id);
