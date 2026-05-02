-- ============================================================
-- TWINHUB COMPLETE PRODUCTION SYNC - MAY 2026
-- ============================================================
-- This script combines all previous patches, fixes assets, 
-- and ensures the database is 100% aligned with the cinematic UI.
-- ============================================================

BEGIN;

-- 1. EXTEND SITE_SETTINGS SCHEMA
ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS ai_bg_media TEXT NOT NULL DEFAULT '/gallery/work13.jpg',
ADD COLUMN IF NOT EXISTS ai_bg_opacity NUMERIC NOT NULL DEFAULT 0.8,
ADD COLUMN IF NOT EXISTS products_showreel_url TEXT DEFAULT 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
ADD COLUMN IF NOT EXISTS hero_bg_opacity float DEFAULT 0.85,
ADD COLUMN IF NOT EXISTS innovation_keywords text[] DEFAULT ARRAY['Innovation Center', 'Smart Automation', 'AI Engineering', 'Creative Tech'];

-- 2. SYNC CINEMATIC ASSETS (Paths verified in public folder)
UPDATE public.site_settings
SET 
    services_bg_media = '/gallery/work16.jpg',
    products_bg_media = '/gallery/work22.jpg',
    gallery_bg_media  = '/gallery/work1.jpg',
    clients_bg_media  = '/gallery/work25.jpg',
    ai_bg_media       = '/gallery/work13.jpg',
    about_bg_media    = '/gallery/work27.jpg',
    primary_color     = '#dc2626'
WHERE id = (SELECT id FROM public.site_settings LIMIT 1);

-- 3. FIX PRODUCT DATA (Paths & Types)
UPDATE public.products 
SET media = '/ask-prompt-me.png', media_type = 'image'
WHERE key_id = 'ask-prompt-me';

UPDATE public.products 
SET media = '/products/lingualink.png', media_type = 'image'
WHERE key_id = 'lingualink';

UPDATE public.products 
SET media = '/products/karma-house.mp4', media_type = 'video'
WHERE key_id = 'karma-house';

-- 4. FIX HERO CONTENT
UPDATE public.hero_content
SET background_media = '/gallery/work27.jpg'
WHERE background_media = '/backgrounds/hero/hero-bg.mp4' OR background_media IS NULL;

-- 5. REFRESH UPDATED_AT
UPDATE public.site_settings SET updated_at = now();
UPDATE public.hero_content SET updated_at = now();
UPDATE public.products SET updated_at = now();

-- 6. ENSURE SECURITY POLICIES (All Tables)
-- RLS Activation
ALTER TABLE public.hero_content  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Clean & Recreate Policies
DO $$ 
DECLARE
  t text;
BEGIN
  FOR t IN SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('hero_content', 'products', 'services', 'gallery', 'site_settings')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Public View" ON public.%I', t);
    EXECUTE format('CREATE POLICY "Public View" ON public.%I FOR SELECT USING (true)', t);
    
    EXECUTE format('DROP POLICY IF EXISTS "Admin All" ON public.%I', t);
    EXECUTE format('CREATE POLICY "Admin All" ON public.%I FOR ALL USING (auth.role() = ''authenticated'')', t);
  END LOOP;
END $$;

COMMIT;

-- ============================================================
-- END OF SYNC
-- ============================================================
