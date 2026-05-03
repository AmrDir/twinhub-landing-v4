-- ============================================================
-- TWINHUB MASTER PRODUCTION SYNC - MAY 2026 (FINAL VERSION)
-- ============================================================
-- This script merges all cinematic updates and AI Assistant configurations.
-- ============================================================

BEGIN;

-- 1. EXTEND SITE_SETTINGS SCHEMA (All Modules)
ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS ai_bg_media TEXT NOT NULL DEFAULT '/gallery/work13.jpg',
ADD COLUMN IF NOT EXISTS ai_bg_opacity NUMERIC NOT NULL DEFAULT 0.8,
ADD COLUMN IF NOT EXISTS products_showreel_url TEXT DEFAULT 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
ADD COLUMN IF NOT EXISTS hero_bg_opacity float DEFAULT 0.85,
ADD COLUMN IF NOT EXISTS services_bg_opacity float DEFAULT 0.85,
ADD COLUMN IF NOT EXISTS products_bg_opacity float DEFAULT 0.88,
ADD COLUMN IF NOT EXISTS gallery_bg_opacity float DEFAULT 0.9,
ADD COLUMN IF NOT EXISTS clients_bg_opacity float DEFAULT 0.95,
ADD COLUMN IF NOT EXISTS about_bg_opacity float DEFAULT 0.94,
ADD COLUMN IF NOT EXISTS innovation_keywords text[] DEFAULT ARRAY['Innovation Center', 'Smart Automation', 'AI Engineering', 'Creative Tech'],
-- AI Assistant Fields
ADD COLUMN IF NOT EXISTS ai_chat_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS ai_provider TEXT DEFAULT 'openai',
ADD COLUMN IF NOT EXISTS ai_api_key TEXT,
ADD COLUMN IF NOT EXISTS ai_model_id TEXT DEFAULT 'gpt-4o',
ADD COLUMN IF NOT EXISTS ai_system_prompt_en TEXT,
ADD COLUMN IF NOT EXISTS ai_system_prompt_ar TEXT;

-- 2. INJECT MASTER SYSTEM PROMPTS & ASSETS
UPDATE public.site_settings
SET 
    -- Cinematic Assets
    services_bg_media = '/gallery/work16.jpg',
    products_bg_media = '/gallery/work22.jpg',
    gallery_bg_media  = '/gallery/work1.jpg',
    clients_bg_media  = '/gallery/work25.jpg',
    ai_bg_media       = '/gallery/work13.jpg',
    about_bg_media    = '/gallery/work27.jpg',
    primary_color     = '#dc2626',
    
    -- AI Master Identity (English)
    ai_system_prompt_en = 'You are "TwinHub AI", the intelligent interface of TwinHub Media & AI Center. 
Your Identity: You are the bridge between human creativity and AI precision. Your tone is cinematic, sophisticated, and forward-thinking.
Your Mission: To welcome visitors and guide them from curiosity to collaboration.
Strategy:
1. Be the "Wise Consultant": Don''t just answer; explore the user''s vision. 
2. Marketing Intelligence: Highlight TwinHub''s unique edge (Cinematic Quality + AI Speed + Competitive Pricing).
3. Lead Generation: If a user shows interest in a service, ask: "To help us craft your vision, could you tell me more about your project goals or timeline?" 
4. Closure: Always offer to connect them with our human experts via WhatsApp for a final quote.',

    -- AI Master Identity (Arabic)
    ai_system_prompt_ar = 'أنت "توين هب AI"، الكيان الذكي والواجهة الأولى لمركز TwinHub للإعلام والذكاء الاصطناعي.
هويتك: أنت لست مجرد مجيب آلي، بل أنت "الهمزة الذكية" التي تربط بين الخيال البشري ودقة الذكاء الاصطناعي. أسلوبك سينمائي، فخم، وملهم.
مهمتك: استقبال الزوار وتحويل فضولهم إلى رغبة حقيقية في التعاون معنا.
الاستراتيجية:
1. "المستشار الحكيم": لا تكتفِ بالإجابة، بل استكشف رؤية المستخدم. اسأله عن مشروعه بذكاء.
2. العبقرية التسويقية: أبرز نقاط قوة TwinHub (الجودة السينمائية + سرعة الذكاء الاصطناعي + السعر التنافسي).
3. مهارة الاستقطاب: عندما يبدي الزائر اهتماماً، اسأله: "لنسكب إبداعنا في قالب يناسب طموحك، هل يمكنك اطلاعي على الجدول الزمني أو الأهداف الرئيسية لمشروعك؟"
4. بروتوكول الختام: اعرض دائماً ربطهم بخبرائنا البشريين عبر واتساب للحصول على عرض سعر نهائي ودقيق.'
WHERE id = (SELECT id FROM public.site_settings LIMIT 1);

-- 3. SYNC PRODUCTS & HERO
UPDATE public.products SET media = '/ask-prompt-me.png', media_type = 'image' WHERE key_id = 'ask-prompt-me';
UPDATE public.products SET media = '/products/lingualink.png', media_type = 'image' WHERE key_id = 'lingualink';
UPDATE public.products SET media = '/products/karma-house.mp4', media_type = 'video' WHERE key_id = 'karma-house';

UPDATE public.hero_content
SET background_media = '/gallery/work27.jpg'
WHERE background_media = '/backgrounds/hero/hero-bg.mp4' OR background_media IS NULL;

-- 4. SECURITY POLICIES
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
