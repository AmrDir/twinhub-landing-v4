-- ============================================================
-- TwinHub — Final Cinematic & Media Sync Patch
-- Run this in Supabase SQL Editor to enable all new features
-- ============================================================

-- 1. Add missing background and content columns to site_settings
ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS about_vision_text_en TEXT DEFAULT 'To be the global benchmark for cinematic AI integration.',
ADD COLUMN IF NOT EXISTS about_vision_text_ar TEXT DEFAULT 'أن نكون المرجع العالمي للتكامل السينمائي مع الذكاء الاصطناعي.',
ADD COLUMN IF NOT EXISTS about_mission_text_en TEXT DEFAULT 'Bridging human creativity with AI intelligence through visual excellence.',
ADD COLUMN IF NOT EXISTS about_mission_text_ar TEXT DEFAULT 'جسد الإبداع البشري مع ذكاء الآلة من خلال التميز البصري.',
ADD COLUMN IF NOT EXISTS about_stats JSONB DEFAULT '[{"id":1, "value":"20+", "label_en":"Years of Art", "label_ar":"سنة خبرة", "icon":"Award"}]',
ADD COLUMN IF NOT EXISTS products_showreel_url TEXT DEFAULT 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
ADD COLUMN IF NOT EXISTS hero_bg_opacity NUMERIC DEFAULT 0.2,
ADD COLUMN IF NOT EXISTS secondary_color TEXT DEFAULT '#0070FF', 
ADD COLUMN IF NOT EXISTS accent_color TEXT DEFAULT '#14B8A6';

-- 2. Update existing defaults to match new "Cinematic Space" theme
UPDATE public.site_settings 
SET 
  secondary_color = '#0070FF',
  accent_color = '#14B8A6'
WHERE id = (SELECT id FROM public.site_settings LIMIT 1);

-- 3. Ensure magazines table exists for the Digital Library
CREATE TABLE IF NOT EXISTS public.magazines (
    id           UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    title_en     TEXT    NOT NULL,
    title_ar     TEXT    NOT NULL,
    cover_image  TEXT    NOT NULL,
    pdf_url      TEXT    NOT NULL,
    category     TEXT    NOT NULL DEFAULT 'Art & Tech',
    sort_order   INTEGER NOT NULL DEFAULT 0,
    is_active    BOOLEAN NOT NULL DEFAULT true,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for magazines
ALTER TABLE public.magazines ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_magazines" ON public.magazines;
DROP POLICY IF EXISTS "admin_all_magazines" ON public.magazines;

CREATE POLICY "public_read_magazines" ON public.magazines FOR SELECT USING (true);
CREATE POLICY "admin_all_magazines" ON public.magazines FOR ALL USING ((SELECT auth.role()) = 'authenticated');

-- Add trigger for magazines
DROP TRIGGER IF EXISTS trg_magazines_updated_at ON public.magazines;
CREATE TRIGGER trg_magazines_updated_at
    BEFORE UPDATE ON public.magazines
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4. Verify all background media columns have proper defaults
ALTER TABLE public.site_settings 
ALTER COLUMN services_bg_media SET DEFAULT '/backgrounds/services/services-bg.jpg',
ALTER COLUMN products_bg_media SET DEFAULT '/backgrounds/services/services-bg.jpg',
ALTER COLUMN gallery_bg_media SET DEFAULT '/backgrounds/clients/clients-bg.jpg',
ALTER COLUMN clients_bg_media SET DEFAULT '/backgrounds/clients/clients-bg.jpg',
ALTER COLUMN about_bg_media SET DEFAULT '/backgrounds/about/about-bg.png';
