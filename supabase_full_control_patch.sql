-- ============================================================
-- TwinHub Dashboard Full Control — FINAL CONSOLIDATED PATCH
-- Run this in Supabase SQL Editor to enable all features
-- ============================================================

-- 1. Create Clients Table (Missing in previous patches)
CREATE TABLE IF NOT EXISTS public.clients (
    id           UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    name         TEXT    NOT NULL,
    logo_url     TEXT    NOT NULL,
    sort_order   INTEGER DEFAULT 0,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for clients
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Policies for clients
CREATE POLICY "Public Read Clients" ON public.clients FOR SELECT USING (true);
CREATE POLICY "Admin All Clients"   ON public.clients FOR ALL USING ((SELECT auth.role()) = 'authenticated');

-- 2. Add Missing Columns to Site Settings (Phase 1 + 2)
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_bg_opacity NUMERIC NOT NULL DEFAULT 0.2;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS secondary_color TEXT NOT NULL DEFAULT '#3B82F6';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS accent_color TEXT NOT NULL DEFAULT '#0D9488';

-- Social Links
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS social_youtube TEXT NOT NULL DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS social_vimeo TEXT NOT NULL DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS social_twitter TEXT NOT NULL DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS social_linkedin TEXT NOT NULL DEFAULT '';

-- AI Section Content
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS ai_title_en TEXT NOT NULL DEFAULT 'Product Development & AI Solutions';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS ai_title_ar TEXT NOT NULL DEFAULT 'قطاع تطوير المنتجات والحلول الذكية';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS ai_subtitle_en TEXT NOT NULL DEFAULT 'Innovation Beyond Production';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS ai_subtitle_ar TEXT NOT NULL DEFAULT 'ابتكار يتجاوز الإنتاج التقليدي';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS ai_desc_en TEXT NOT NULL DEFAULT 'We develop smart applications and innovative automation systems for businesses, driven by cutting-edge artificial intelligence.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS ai_desc_ar TEXT NOT NULL DEFAULT 'نحن فخورون بإطلاق قسم تطوير المنتجات والحلول الذكية، حيث نقوم بتطوير تطبيقات ذكية وأنظمة أتمتة مبتكرة للشركات، مدفوعة بأحدث تقنيات الذكاء الاصطناعي.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS ai_bg_media TEXT NOT NULL DEFAULT '/backgrounds/clients/ai-bg.png';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS ai_bg_opacity NUMERIC NOT NULL DEFAULT 0.8;

-- Background Control for other sections
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS products_bg_media TEXT NOT NULL DEFAULT '/backgrounds/services/services-bg.jpg';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS products_bg_opacity NUMERIC NOT NULL DEFAULT 0.88;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS clients_bg_media TEXT NOT NULL DEFAULT '/backgrounds/clients/clients-bg.jpg';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS clients_bg_opacity NUMERIC NOT NULL DEFAULT 0.95;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_bg_media TEXT NOT NULL DEFAULT '/backgrounds/about/about-bg.jpg';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_bg_opacity NUMERIC NOT NULL DEFAULT 0.88;

-- About Section Content
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_vision_title_en TEXT NOT NULL DEFAULT 'Our Vision';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_vision_title_ar TEXT NOT NULL DEFAULT 'رؤيتنا';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_vision_text_en TEXT NOT NULL DEFAULT 'To be the leading creative hub in the MENA region, pioneering the intersection of cinematic storytelling and artificial intelligence.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_vision_text_ar TEXT NOT NULL DEFAULT 'أن نكون المركز الإبداعي الرائد في منطقة الشرق الأوسط وشمال أفريقيا، رواداً في نقطة التقاء السرد السينمائي والذكاء الاصطناعي.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_mission_title_en TEXT NOT NULL DEFAULT 'Our Mission';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_mission_title_ar TEXT NOT NULL DEFAULT 'مهمتنا';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_mission_text_en TEXT NOT NULL DEFAULT 'Empowering brands with world-class media production, innovative AI tools, and unforgettable visual experiences.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_mission_text_ar TEXT NOT NULL DEFAULT 'تمكين العلامات التجارية بإنتاج إعلامي عالمي المستوى، وأدوات ذكاء اصطناعي مبتكرة، وتجارب بصرية لا تُنسى.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_stats JSONB NOT NULL DEFAULT '[{"value":"150+","label_en":"Projects Completed","label_ar":"مشروع مكتمل"},{"value":"100+","label_en":"Happy Clients","label_ar":"عميل سعيد"},{"value":"20+","label_en":"Team Experts","label_ar":"خبير متخصص"},{"value":"99%","label_en":"Client Satisfaction","label_ar":"رضا العملاء"}]';

-- Contact Section Extras
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS address_en TEXT NOT NULL DEFAULT '47 Nagib Al Rihani, Town Down, Cairo Governorate 4320210, Egypt';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS address_ar TEXT NOT NULL DEFAULT '47 نجيب الريحاني، وسط البلد، محافظة القاهرة 4320210، مصر';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS map_url TEXT NOT NULL DEFAULT 'https://maps.google.com/?q=47+Nagib+Al+Rihani+Cairo+Egypt';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS contact_phone2 TEXT NOT NULL DEFAULT '+20123456789';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS schedule JSONB NOT NULL DEFAULT '{"weekdays":"Monday - Friday","weekdays_time":"9:00 AM - 6:00 PM","saturday":"Saturday","saturday_time":"10:00 AM - 4:00 PM","sunday":"Sunday","sunday_time":"By Appointment"}';

-- Add updated_at trigger for clients
CREATE OR REPLACE TRIGGER trg_clients_updated_at
    BEFORE UPDATE ON public.clients
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
