-- ============================================================
-- TwinHub — Patch Fix for "record new has no field updated_at"
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Add missing updated_at column to ALL tables (safe: IF NOT EXISTS)
ALTER TABLE public.hero_content
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

ALTER TABLE public.services
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- THIS IS THE ONE MISSING FROM YOUR SCHEMA:
ALTER TABLE public.gallery
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();


-- 2. Drop ALL existing update triggers to avoid conflicts
DROP TRIGGER IF EXISTS trg_hero_updated_at ON public.hero_content;
DROP TRIGGER IF EXISTS trg_products_updated_at ON public.products;
DROP TRIGGER IF EXISTS trg_services_updated_at ON public.services;
DROP TRIGGER IF EXISTS trg_settings_updated_at ON public.site_settings;
DROP TRIGGER IF EXISTS trg_gallery_updated_at ON public.gallery;
-- Also drop any moddatetime triggers
DROP TRIGGER IF EXISTS handle_updated_at ON public.hero_content;
DROP TRIGGER IF EXISTS handle_updated_at ON public.products;
DROP TRIGGER IF EXISTS handle_updated_at ON public.services;
DROP TRIGGER IF EXISTS handle_updated_at ON public.gallery;
DROP TRIGGER IF EXISTS handle_updated_at ON public.site_settings;


-- 3. Create the trigger function (safe to re-create)
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- 4. Re-create triggers for ALL tables (including gallery!)
CREATE TRIGGER trg_hero_updated_at
    BEFORE UPDATE ON public.hero_content
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_gallery_updated_at
    BEFORE UPDATE ON public.gallery
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
