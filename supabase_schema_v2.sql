-- ============================================================
-- TwinHub — Complete Supabase Schema (run this file only)
-- Combines v1 + v2, fixes all missing columns and seed data
-- ============================================================


-- ============================================================
-- 1. Hero Content (single-row table)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.hero_content (
    id               UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    texts_en         JSONB   NOT NULL DEFAULT '["Cinematic Stories", "Brand Experiences", "Creative Visions", "Media & AI Center"]',
    texts_ar         JSONB   NOT NULL DEFAULT '["قصص سينمائية", "تجارب العلامة التجارية", "رؤى إبداعية", "محتوى رقمي"]',
    we_create_en     TEXT    NOT NULL DEFAULT 'We Create',
    we_create_ar     TEXT    NOT NULL DEFAULT 'نحن نبدع',
    subtitle_en      TEXT    NOT NULL DEFAULT 'We keep pace with the latest developments in advertising and AI, offering creative design and implementation with speed, high quality, and competitive prices.',
    subtitle_ar      TEXT    NOT NULL DEFAULT 'نواكب أحدث التطورات في الإعلان والذكاء الاصطناعي، ونقدم التصميم الإبداعي والتنفيذ بسرعة وجودة عالية وأسعار تنافسية.',
    background_media TEXT    NOT NULL DEFAULT '/backgrounds/hero/hero-bg.mp4',
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed default row (idempotent)
INSERT INTO public.hero_content (
    texts_en, texts_ar, we_create_en, we_create_ar, subtitle_en, subtitle_ar, background_media
)
SELECT
    '["Cinematic Stories", "Brand Experiences", "Creative Visions", "Media & AI Center"]',
    '["قصص سينمائية", "تجارب العلامة التجارية", "رؤى إبداعية", "محتوى رقمي"]',
    'We Create',
    'نحن نبدع',
    'We keep pace with the latest developments in advertising and AI, offering creative design and implementation with speed, high quality, and competitive prices.',
    'نواكب أحدث التطورات في الإعلان والذكاء الاصطناعي، ونقدم التصميم الإبداعي والتنفيذ بسرعة وجودة عالية وأسعار تنافسية.',
    '/backgrounds/hero/hero-bg.mp4'
WHERE NOT EXISTS (SELECT 1 FROM public.hero_content LIMIT 1);


-- ============================================================
-- 2. Products / AI Platforms
-- ============================================================
CREATE TABLE IF NOT EXISTS public.products (
    id           UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    key_id       TEXT    UNIQUE NOT NULL,
    sort_order   INTEGER NOT NULL DEFAULT 0,
    name_en      TEXT    NOT NULL,
    name_ar      TEXT    NOT NULL,
    desc_en      TEXT    NOT NULL,
    desc_ar      TEXT    NOT NULL,
    features_en  JSONB   NOT NULL DEFAULT '[]',
    features_ar  JSONB   NOT NULL DEFAULT '[]',
    media        TEXT    NOT NULL,
    media_type   TEXT    NOT NULL DEFAULT 'video',
    link         TEXT    NOT NULL DEFAULT '#',
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.products (key_id, sort_order, name_en, name_ar, desc_en, desc_ar, features_en, features_ar, media, media_type, link)
VALUES
(
    'ask-prompt-me', 1,
    'Ask Prompt Me', 'Ask Prompt Me',
    'An advanced AI prompting platform designed to supercharge your workflow and creative processes.',
    'منصة ذكاء اصطناعي متقدمة لتوليد وهندسة الأوامر (Prompt Engineering) لتعزيز سير العمل والإبداع.',
    '["AI Workflow Automation", "Prompt Library", "API Integration"]',
    '["أتمتة سير العمل", "مكتبة أوامر جاهزة", "ربط برمجي API"]',
    '/products/ask-prompt-me.mp4', 'video', '#'
),
(
    'lingualink', 2,
    'LinguaLink', 'LinguaLink',
    'A seamless AI-powered translation and localization hub breaking language barriers in real-time.',
    'مركز ترجمة وتوطين متقدم يعمل بالذكاء الاصطناعي لكسر حواجز اللغة في الوقت الفعلي.',
    '["Real-time Translation", "Contextual Localization", "Multi-format Support"]',
    '["ترجمة فورية", "توطين سياقي", "دعم صيغ متعددة"]',
    '/products/lingualink.mp4', 'video', '#'
),
(
    'karma-house', 3,
    'Karma House', 'كارما هاوس (Karma House)',
    'Our most ambitious invention. An intelligent ecosystem combining cinematic aesthetics with autonomous AI reasoning.',
    'اختراعنا الأهم والأكثر طموحاً. نظام بيئي ذكي يجمع بين الجماليات السينمائية والذكاء الاصطناعي المستقل لحلول متكاملة.',
    '["Autonomous AI", "Cinematic Rendering", "Emotional Intelligence"]',
    '["ذكاء اصطناعي مستقل", "عرض سينمائي", "ذكاء عاطفي"]',
    '/products/karma-house.mp4', 'video', '#'
)
ON CONFLICT (key_id) DO NOTHING;


-- ============================================================
-- 3. Services
-- ============================================================
CREATE TABLE IF NOT EXISTS public.services (
    id           UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    key_id       TEXT    UNIQUE NOT NULL,
    sort_order   INTEGER NOT NULL DEFAULT 0,
    icon         TEXT    NOT NULL,
    title_en     TEXT    NOT NULL,
    title_ar     TEXT    NOT NULL,
    desc_en      TEXT    NOT NULL,
    desc_ar      TEXT    NOT NULL,
    features_en  JSONB   NOT NULL DEFAULT '[]',
    features_ar  JSONB   NOT NULL DEFAULT '[]',
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.services (key_id, sort_order, icon, title_en, title_ar, desc_en, desc_ar, features_en, features_ar)
VALUES
(
    'ai-center', 1, 'Brain',
    'Artificial Intelligence Center', 'مركز الذكاء الاصطناعي',
    'Cutting-edge AI solutions for modern advertising and media production.',
    'حلول ذكاء اصطناعي متطورة للإعلان الحديث وإنتاج الوسائط، تقدم نتائج ذكية ومبتكرة.',
    '["AI Content Creation", "Smart Analytics", "Automated Production", "Innovation Solutions"]',
    '["إنشاء محتوى بالذكاء الاصطناعي", "تحليلات ذكية", "إنتاج آلي", "حلول الابتكار"]'
),
(
    'video', 2, 'Video',
    'Video Production', 'إنتاج الفيديو للأعمال',
    'Comprehensive video production services from corporate videos to TV commercials.',
    'خدمات إنتاج فيديو شاملة من الفيديوهات المؤسسية إلى الإعلانات التلفزيونية.',
    '["Corporate Videos", "TV Commercial Ads", "Documentary Films"]',
    '["فيديوهات مؤسسية", "إعلانات تلفزيونية", "أفلام وثائقية"]'
),
(
    'photo', 3, 'Camera',
    'Photography Production', 'إنتاج التصوير الفوتوغرافي',
    'Professional photography services capturing your brand essence.',
    'خدمات تصوير احترافية تلتقط جوهر علامتك التجارية.',
    '["Fashion Photography", "Product Photography", "Event Coverage"]',
    '["تصوير الأزياء", "تصوير المنتجات", "تغطية الأحداث"]'
),
(
    'branding', 4, 'Palette',
    'Branding & Design', 'العلامة التجارية والتصميم',
    'Complete branding solutions including fashion design and visual identity.',
    'حلول علامة تجارية كاملة تشمل الهوية البصرية والمواد التسويقية.',
    '["Brand Identity", "Fashion Design", "Logo Design"]',
    '["هوية العلامة التجارية", "تصميم الأزياء", "تصميم الشعار"]'
),
(
    'events', 5, 'Users',
    'Exhibition & Events', 'المعارض والفعاليات',
    'Full-service event production and exhibition management with creative execution and flawless delivery.',
    'إنتاج فعاليات متكامل وإدارة معارض مع تنفيذ إبداعي وتسليم لا تشوبه شائبة.',
    '["Event Planning", "Exhibition Design", "Live Production", "Event Photography"]',
    '["تخطيط الفعاليات", "تصميم المعارض", "إنتاج مباشر", "تصوير الفعاليات"]'
),
(
    'music', 6, 'Award',
    'Copyright & Music', 'حقوق الطبع والموسيقى',
    'Professional music production and copyright services to enhance your media with original soundtracks.',
    'إنتاج موسيقي احترافي وخدمات حقوق الطبع لتعزيز وسائطك بموسيقى تصويرية أصلية.',
    '["Original Music", "Sound Design", "Copyright Management", "Audio Production"]',
    '["موسيقى أصلية", "تصميم الصوت", "إدارة حقوق الطبع", "إنتاج صوتي"]'
)
ON CONFLICT (key_id) DO NOTHING;


-- ============================================================
-- 4. Gallery
-- ============================================================
CREATE TABLE IF NOT EXISTS public.gallery (
    id           UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    sort_order   INTEGER NOT NULL DEFAULT 0,
    media        TEXT    NOT NULL,
    media_type   TEXT    NOT NULL DEFAULT 'image',
    category     TEXT    NOT NULL DEFAULT 'all',
    alt_text     TEXT    NOT NULL DEFAULT 'Gallery Item',
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Sample seed — replace paths with your actual media files
INSERT INTO public.gallery (sort_order, media, media_type, category, alt_text)
VALUES
(1, '/gallery/work0.jpg',  'image', 'all',         'Creative Work'),
(2, '/gallery/work3.mp4',  'video', 'video',        'Video Production'),
(3, '/gallery/work1.jpg',  'image', 'branding',     'Brand Campaign'),
(4, '/gallery/work6.jpg',  'image', 'events',       'Event Coverage'),
(5, '/gallery/work11.jpg', 'image', 'photography',  'Photography Session')
ON CONFLICT DO NOTHING;


-- ============================================================
-- 5. Site Settings (single-row — all section backgrounds + contact)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
    id                    UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    -- Brand
    primary_color         TEXT    NOT NULL DEFAULT '#dc2626',
    -- Section backgrounds
    services_bg_media     TEXT    NOT NULL DEFAULT '/backgrounds/services/services-bg.jpg',
    services_bg_opacity   NUMERIC NOT NULL DEFAULT 0.85,
    products_bg_media     TEXT    NOT NULL DEFAULT '/backgrounds/services/services-bg.jpg',
    products_bg_opacity   NUMERIC NOT NULL DEFAULT 0.88,
    gallery_bg_media      TEXT    NOT NULL DEFAULT '/backgrounds/clients/clients-bg.jpg',
    gallery_bg_opacity    NUMERIC NOT NULL DEFAULT 0.92,
    clients_bg_media      TEXT    NOT NULL DEFAULT '/backgrounds/clients/clients-bg.jpg',
    clients_bg_opacity    NUMERIC NOT NULL DEFAULT 0.95,
    about_bg_media        TEXT    NOT NULL DEFAULT '/backgrounds/clients/about-bg.png',
    about_bg_opacity      NUMERIC NOT NULL DEFAULT 0.94,
    -- Contact
    contact_email         TEXT    NOT NULL DEFAULT 'info@twinhub.net',
    contact_phone         TEXT    NOT NULL DEFAULT '01007197170',
    contact_whatsapp      TEXT    NOT NULL DEFAULT '201007197170',
    -- Social
    social_instagram      TEXT    NOT NULL DEFAULT 'https://www.instagram.com/twinhub.media.production/',
    social_facebook       TEXT    NOT NULL DEFAULT 'https://www.facebook.com/Twinhub.net/',
    -- Timestamps
    updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed default row (idempotent)
INSERT INTO public.site_settings (primary_color)
SELECT '#dc2626'
WHERE NOT EXISTS (SELECT 1 FROM public.site_settings LIMIT 1);


-- ============================================================
-- 6. Row Level Security
-- ============================================================
ALTER TABLE public.hero_content  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public read (anonymous visitors can load site content)
CREATE POLICY IF NOT EXISTS "public_read_hero"     ON public.hero_content  FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "public_read_products"  ON public.products      FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "public_read_services"  ON public.services      FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "public_read_gallery"   ON public.gallery       FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "public_read_settings"  ON public.site_settings FOR SELECT USING (true);

-- Authenticated admin — full write access
CREATE POLICY IF NOT EXISTS "admin_all_hero"     ON public.hero_content  FOR ALL USING ((SELECT auth.role()) = 'authenticated');
CREATE POLICY IF NOT EXISTS "admin_all_products"  ON public.products      FOR ALL USING ((SELECT auth.role()) = 'authenticated');
CREATE POLICY IF NOT EXISTS "admin_all_services"  ON public.services      FOR ALL USING ((SELECT auth.role()) = 'authenticated');
CREATE POLICY IF NOT EXISTS "admin_all_gallery"   ON public.gallery       FOR ALL USING ((SELECT auth.role()) = 'authenticated');
CREATE POLICY IF NOT EXISTS "admin_all_settings"  ON public.site_settings FOR ALL USING ((SELECT auth.role()) = 'authenticated');


-- ============================================================
-- 7. Auto-update updated_at trigger (optional but useful)
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_hero_updated_at
    BEFORE UPDATE ON public.hero_content
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE TRIGGER trg_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE TRIGGER trg_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE TRIGGER trg_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
