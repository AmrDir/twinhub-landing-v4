-- ==========================================
-- TwinHub Supabase Database Schema
-- ==========================================

-- 1. Hero Content Table (Single Row)
CREATE TABLE IF NOT EXISTS public.hero_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    texts_en JSONB NOT NULL DEFAULT '["Cinematic Stories", "Brand Experiences", "Creative Visions", "Media & AI Center"]',
    texts_ar JSONB NOT NULL DEFAULT '["قصص سينمائية", "تجارب العلامة التجارية", "رؤى إبداعية", "محتوى رقمي"]',
    we_create_en TEXT NOT NULL DEFAULT 'We Create',
    we_create_ar TEXT NOT NULL DEFAULT 'نحن نبدع',
    subtitle_en TEXT NOT NULL DEFAULT 'We keep pace with the latest developments in advertising and AI, offering creative design and implementation with speed, high quality, and competitive prices.',
    subtitle_ar TEXT NOT NULL DEFAULT 'نواكب أحدث التطورات في الإعلان والذكاء الاصطناعي، ونقدم التصميم الإبداعي والتنفيذ بسرعة وجودة عالية وأسعار تنافسية.',
    background_media TEXT NOT NULL DEFAULT '/hero-video.mp4'
);

-- Insert default hero row if empty
INSERT INTO public.hero_content (texts_en)
SELECT '["Cinematic Stories", "Brand Experiences", "Creative Visions", "Media & AI Center"]'
WHERE NOT EXISTS (SELECT 1 FROM public.hero_content LIMIT 1);


-- 2. Products Table (Multiple Rows)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key_id TEXT UNIQUE NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    name_en TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    desc_en TEXT NOT NULL,
    desc_ar TEXT NOT NULL,
    features_en JSONB NOT NULL DEFAULT '[]',
    features_ar JSONB NOT NULL DEFAULT '[]',
    media TEXT NOT NULL,
    media_type TEXT NOT NULL DEFAULT 'video',
    link TEXT NOT NULL DEFAULT '#'
);

-- Insert default products
INSERT INTO public.products (key_id, sort_order, name_en, name_ar, desc_en, desc_ar, features_en, features_ar, media, media_type)
VALUES 
('ask-prompt-me', 1, 'Ask Prompt Me', 'Ask Prompt Me', 'An advanced AI prompting platform designed to supercharge your workflow and creative processes.', 'منصة ذكاء اصطناعي متقدمة لتوليد وهندسة الأوامر (Prompt Engineering) لتعزيز سير العمل والإبداع.', '["AI Workflow Automation", "Prompt Library", "API Integration"]', '["أتمتة سير العمل", "مكتبة أوامر جاهزة", "ربط برمجي API"]', '/products/ask-prompt-me.mp4', 'video'),
('lingualink', 2, 'LinguaLink', 'LinguaLink', 'A seamless AI-powered translation and localization hub breaking language barriers in real-time.', 'مركز ترجمة وتوطين متقدم يعمل بالذكاء الاصطناعي لكسر حواجز اللغة في الوقت الفعلي.', '["Real-time Translation", "Contextual Localization", "Multi-format Support"]', '["ترجمة فورية", "توطين سياقي", "دعم صيغ متعددة"]', '/products/lingualink.mp4', 'video'),
('karma-house', 3, 'Karma House', 'كارما هاوس (Karma House)', 'Our most ambitious invention. An intelligent ecosystem combining cinematic aesthetics with autonomous AI reasoning.', 'اختراعنا الأهم والأكثر طموحاً على كافة المستويات. نظام بيئي ذكي يجمع بين الجماليات السينمائية والذكاء الاصطناعي المستقل لحلول متكاملة.', '["Autonomous AI", "Cinematic Rendering", "Emotional Intelligence"]', '["ذكاء اصطناعي مستقل", "عرض سينمائي", "ذكاء عاطفي"]', '/products/karma-house.mp4', 'video')
ON CONFLICT (key_id) DO NOTHING;


-- 3. Set up Row Level Security (RLS)
-- Allow anyone to read data
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on hero_content" ON public.hero_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access on products" ON public.products FOR SELECT USING (true);

-- Allow authenticated users (Admin) to update/insert/delete
CREATE POLICY "Allow admin full access on hero_content" ON public.hero_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access on products" ON public.products FOR ALL USING (auth.role() = 'authenticated');
