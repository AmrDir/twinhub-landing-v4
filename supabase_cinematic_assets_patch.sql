-- ============================================================
-- TwinHub Cinematic UI & Assets Patch
-- Run this in Supabase SQL Editor to fix missing assets and add new fields
-- ============================================================

-- 1. Add missing columns to site_settings
ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS ai_bg_media TEXT NOT NULL DEFAULT '/gallery/work13.jpg',
ADD COLUMN IF NOT EXISTS ai_bg_opacity NUMERIC NOT NULL DEFAULT 0.8,
ADD COLUMN IF NOT EXISTS products_showreel_url TEXT DEFAULT 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; -- Replace with your actual showreel

-- 2. Update section backgrounds with verified high-quality assets
UPDATE public.site_settings
SET 
    services_bg_media = '/gallery/work16.jpg',
    products_bg_media = '/gallery/work22.jpg',
    gallery_bg_media  = '/gallery/work1.jpg',
    clients_bg_media  = '/gallery/work25.jpg',
    ai_bg_media       = '/gallery/work13.jpg'
WHERE id = (SELECT id FROM public.site_settings LIMIT 1);

-- 3. Correct product media paths to match actual files
UPDATE public.products 
SET media = '/ask-prompt-me.png', media_type = 'image'
WHERE key_id = 'ask-prompt-me';

UPDATE public.products 
SET media = '/products/lingualink.png', media_type = 'image'
WHERE key_id = 'lingualink';

-- 4. Ensure Hero Background is valid (using a gallery fallback if hero-bg is missing)
UPDATE public.hero_content
SET background_media = '/gallery/work27.jpg'
WHERE background_media = '/backgrounds/hero/hero-bg.mp4'; -- Only update if it's the old placeholder

-- 5. Refresh updated_at
UPDATE public.site_settings SET updated_at = now();
UPDATE public.hero_content SET updated_at = now();
UPDATE public.products SET updated_at = now();

COMMIT;
