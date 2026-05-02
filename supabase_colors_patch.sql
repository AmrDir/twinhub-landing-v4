-- ============================================================
-- TwinHub — Phase 2 Patch: Colors + Gallery Upload
-- Run in Supabase SQL Editor
-- ============================================================

-- Multi-color theme control
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS secondary_color TEXT NOT NULL DEFAULT '#3B82F6';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS accent_color TEXT NOT NULL DEFAULT '#0D9488';
