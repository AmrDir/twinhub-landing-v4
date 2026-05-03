-- ============================================================
-- TWINHUB MASTER PRODUCTION SYNC - MAY 2026 (FINAL VERSION)
-- ============================================================
-- RUN THIS SCRIPT IN SUPABASE SQL EDITOR TO LOCALIZE & STABILIZE
-- ============================================================

BEGIN;

-- 1. MASTER SCHEMA (Tables & Columns)
CREATE TABLE IF NOT EXISTS public.clients (
    id           UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    name         TEXT    NOT NULL,
    logo_url     TEXT    NOT NULL,
    sort_order   INTEGER NOT NULL DEFAULT 0,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.library (
    id           UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    title_en     TEXT    NOT NULL,
    title_ar     TEXT    NOT NULL,
    file_url     TEXT    NOT NULL,
    thumbnail_url TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Fix Products table for Media Support
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS media TEXT,
ADD COLUMN IF NOT EXISTS media_type TEXT DEFAULT 'image',
ADD COLUMN IF NOT EXISTS link TEXT;

-- Enhance Site Settings
ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS logo_url TEXT DEFAULT '/logo.png',
ADD COLUMN IF NOT EXISTS ai_bg_media TEXT DEFAULT '/gallery/work13.jpg',
ADD COLUMN IF NOT EXISTS ai_bg_opacity NUMERIC DEFAULT 0.8,
ADD COLUMN IF NOT EXISTS products_showreel_url TEXT DEFAULT 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
ADD COLUMN IF NOT EXISTS hero_bg_opacity float DEFAULT 0.85,
ADD COLUMN IF NOT EXISTS services_bg_opacity float DEFAULT 0.85,
ADD COLUMN IF NOT EXISTS products_bg_opacity float DEFAULT 0.88,
ADD COLUMN IF NOT EXISTS gallery_bg_opacity float DEFAULT 0.9,
ADD COLUMN IF NOT EXISTS clients_bg_opacity float DEFAULT 0.95,
ADD COLUMN IF NOT EXISTS about_bg_opacity float DEFAULT 0.94,
-- AI Assistant Fields
ADD COLUMN IF NOT EXISTS ai_chat_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS ai_provider TEXT DEFAULT 'groq',
ADD COLUMN IF NOT EXISTS ai_api_key TEXT,
ADD COLUMN IF NOT EXISTS ai_model_id TEXT DEFAULT 'llama-3.3-70b-versatile',
ADD COLUMN IF NOT EXISTS ai_system_prompt_ar TEXT,
ADD COLUMN IF NOT EXISTS ai_system_prompt_en TEXT;

-- 2. INJECT MASTER IDENTITY (Using COALESCE to preserve manual edits)
UPDATE public.site_settings
SET 
    -- Logo & Assets
    logo_url          = COALESCE(logo_url, '/logo.png'),
    primary_color     = COALESCE(primary_color, '#dc2626'),
    
    -- AI Master Identity (Arabic)
    ai_system_prompt_ar = 'أنت "كيان توين هاب" (TwinHub Entity) الذكي. مركزنا هو الرائد في دمج الإنتاج السينمائي الفاخر بالذكاء الاصطناعي.
                           خدماتنا الرسمية: الإنتاج السينمائي، الإعلانات، أفلام الشركات، المعارض الدولية، وإنتاج الموسيقى بالذكاء الاصطناعي.
                           ممنوع منعاً باتاً ذكر تطبيقات الجوال أو الألعاب. 
                           القاعدة الذهبية: تحدث بالعربية فقط بأسلوب فخم ومبهر.',
    
    ai_system_prompt_en = 'You are the TwinHub AI Entity. Focus on cinematic production and AI media solutions.'
WHERE id = (SELECT id FROM public.site_settings LIMIT 1);

-- 3. SECURITY & STORAGE POLICIES
DO $$ 
DECLARE
  t text;
BEGIN
  -- Table Policies
  FOR t IN SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('hero_content', 'products', 'services', 'gallery', 'site_settings', 'clients', 'library')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Public View" ON public.%I', t);
    EXECUTE format('CREATE POLICY "Public View" ON public.%I FOR SELECT USING (true)', t);
    EXECUTE format('DROP POLICY IF EXISTS "Admin All" ON public.%I', t);
    EXECUTE format('CREATE POLICY "Admin All" ON public.%I FOR ALL USING (auth.role() = ''authenticated'')', t);
  END LOOP;

  -- Storage Bucket & Policies
  INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true) ON CONFLICT (id) DO NOTHING;
  
  DROP POLICY IF EXISTS "Public Access" ON storage.objects;
  CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'media' );

  DROP POLICY IF EXISTS "Admin Full Access" ON storage.objects;
  CREATE POLICY "Admin Full Access" ON storage.objects FOR ALL TO authenticated USING ( bucket_id = 'media' );
END $$;

COMMIT;
