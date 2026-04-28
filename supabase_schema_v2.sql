-- ==========================================
-- TwinHub Supabase Database Schema (Phase 2)
-- ==========================================

-- 1. Site Settings & Theming Table (Single Row)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    primary_color TEXT NOT NULL DEFAULT '#dc2626',
    services_bg_media TEXT NOT NULL DEFAULT '/backgrounds/services/services-bg.jpg',
    services_bg_opacity NUMERIC NOT NULL DEFAULT 0.93,
    products_bg_media TEXT NOT NULL DEFAULT '/backgrounds/services/services-bg.jpg',
    products_bg_opacity NUMERIC NOT NULL DEFAULT 0.93,
    contact_email TEXT NOT NULL DEFAULT 'info@twinhub.net',
    contact_phone TEXT NOT NULL DEFAULT '01007197170',
    contact_whatsapp TEXT NOT NULL DEFAULT '201007197170',
    social_instagram TEXT NOT NULL DEFAULT 'https://www.instagram.com/twinhub.media.production/',
    social_facebook TEXT NOT NULL DEFAULT 'https://www.facebook.com/Twinhub.net/'
);

-- Insert default settings row if empty
INSERT INTO public.site_settings (primary_color)
SELECT '#dc2626'
WHERE NOT EXISTS (SELECT 1 FROM public.site_settings LIMIT 1);


-- 2. Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key_id TEXT UNIQUE NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    icon TEXT NOT NULL,
    title_en TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    desc_en TEXT NOT NULL,
    desc_ar TEXT NOT NULL,
    features_en JSONB NOT NULL DEFAULT '[]',
    features_ar JSONB NOT NULL DEFAULT '[]'
);

-- Insert default services
INSERT INTO public.services (key_id, sort_order, icon, title_en, title_ar, desc_en, desc_ar, features_en, features_ar)
VALUES 
('ai-center', 1, 'Brain', 'Artificial Intelligence Center', 'مركز الذكاء الاصطناعي', 'Cutting-edge AI solutions for modern advertising and media production.', 'حلول ذكاء اصطناعي متطورة للإعلان الحديث وإنتاج الوسائط.', '["AI Content Creation", "Smart Analytics", "Automated Production"]', '["إنشاء محتوى بالذكاء الاصطناعي", "تحليلات ذكية", "إنتاج آلي"]'),
('video', 2, 'Video', 'Video Production', 'إنتاج الفيديو للأعمال', 'Comprehensive video production services from corporate videos to TV commercials.', 'خدمات إنتاج فيديو شاملة من الفيديوهات المؤسسية إلى الإعلانات التلفزيونية.', '["Corporate Videos", "TV Commercial Ads", "Documentary Films"]', '["فيديوهات مؤسسية", "إعلانات تلفزيونية", "أفلام وثائقية"]'),
('photo', 3, 'Camera', 'Photography Production', 'إنتاج التصوير الفوتوغرافي', 'Professional photography services capturing your brand essence.', 'خدمات تصوير احترافية تلتقط جوهر علامتك التجارية.', '["Fashion Photography", "Product Photography", "Event Coverage"]', '["تصوير الأزياء", "تصوير المنتجات", "تغطية الأحداث"]'),
('branding', 4, 'Palette', 'Branding & Design', 'العلامة التجارية والتصميم', 'Complete branding solutions including fashion design and visual identity.', 'حلول علامة تجارية كاملة تشمل الهوية البصرية والمواد التسويقية.', '["Brand Identity", "Fashion Design", "Logo Design"]', '["هوية العلامة التجارية", "تصميم الأزياء", "تصميم الشعار"]')
ON CONFLICT (key_id) DO NOTHING;


-- 3. Gallery Table
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sort_order INTEGER NOT NULL DEFAULT 0,
    media TEXT NOT NULL,
    media_type TEXT NOT NULL DEFAULT 'image',
    category TEXT NOT NULL DEFAULT 'all',
    alt_text TEXT NOT NULL DEFAULT 'Gallery Item'
);

-- Insert some default gallery items
INSERT INTO public.gallery (sort_order, media, media_type, category, alt_text)
VALUES 
(1, '/gallery/work0.jpg', 'image', 'all', 'Creative Work'),
(2, '/gallery/work3.mp4', 'video', 'video', 'Video Production'),
(3, '/gallery/work1.jpg', 'image', 'branding', 'Brand Campaign')
ON CONFLICT DO NOTHING;


-- Set up RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read access on services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow public read access on gallery" ON public.gallery FOR SELECT USING (true);

-- Allow admin full access
CREATE POLICY "Allow admin full access on site_settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access on services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access on gallery" ON public.gallery FOR ALL USING (auth.role() = 'authenticated');
