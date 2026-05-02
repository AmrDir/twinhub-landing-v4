-- ============================================================
-- TWINHUB FINAL PRODUCTION SYNC - MAY 2026
-- ============================================================

-- 1. Ensure all columns exist in site_settings
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS hero_bg_opacity float DEFAULT 0.85,
ADD COLUMN IF NOT EXISTS about_vision_title_en text,
ADD COLUMN IF NOT EXISTS about_vision_title_ar text,
ADD COLUMN IF NOT EXISTS about_vision_text_en text,
ADD COLUMN IF NOT EXISTS about_vision_text_ar text,
ADD COLUMN IF NOT EXISTS about_mission_title_en text,
ADD COLUMN IF NOT EXISTS about_mission_title_ar text,
ADD COLUMN IF NOT EXISTS about_mission_text_en text,
ADD COLUMN IF NOT EXISTS about_mission_text_ar text,
ADD COLUMN IF NOT EXISTS ai_title_en text,
ADD COLUMN IF NOT EXISTS ai_title_ar text,
ADD COLUMN IF NOT EXISTS ai_subtitle_en text,
ADD COLUMN IF NOT EXISTS ai_subtitle_ar text,
ADD COLUMN IF NOT EXISTS ai_desc_en text,
ADD COLUMN IF NOT EXISTS ai_desc_ar text,
ADD COLUMN IF NOT EXISTS innovation_keywords text[],
ADD COLUMN IF NOT EXISTS contact_email text,
ADD COLUMN IF NOT EXISTS contact_whatsapp text,
ADD COLUMN IF NOT EXISTS contact_phone text,
ADD COLUMN IF NOT EXISTS contact_phone2 text,
ADD COLUMN IF NOT EXISTS address_en text,
ADD COLUMN IF NOT EXISTS address_ar text,
ADD COLUMN IF NOT EXISTS map_url text,
ADD COLUMN IF NOT EXISTS schedule jsonb;

-- 2. Update Default Settings (Syncing with latest site.config.ts)
INSERT INTO site_settings (id, hero_bg_opacity, about_vision_title_en, about_vision_title_ar, about_vision_text_en, about_vision_text_ar, about_mission_title_en, about_mission_title_ar, about_mission_text_en, about_mission_text_ar, ai_title_en, ai_title_ar, ai_subtitle_en, ai_subtitle_ar, ai_desc_en, ai_desc_ar, innovation_keywords)
VALUES (1, 0.85, 
  'Our Vision', 'رؤيتنا', 
  'We offer integrated media production and smart, results-oriented solutions, aiming to be a global influence in intelligent content delivery.', 
  'نقدم إنتاج وسائط متكامل، حلول ذكية موجهة نحو النتائج، ولنكون واحدة من أكثر الشركات تأثيرًا في تقديم محتوى عالي الجودة وذكي.',
  'Our Mission', 'مهمتنا',
  'We strive to deliver high-quality content. As pioneers, we set measurable, achievable, and realistic goals for our partners.',
  'نسعى لتقديم محتوى عالي الجودة. كرواد، ساهمنا في نجاح أكبر الشركات من خلال وضع أهداف تسويقية قابلة للقياس والتحقيق.',
  'Product Development & AI Solutions', 'قطاع تطوير المنتجات والحلول الذكية',
  'Innovation Beyond Production', 'ابتكار يتجاوز الإنتاج التقليدي',
  'We develop smart applications and innovative automation systems for businesses, driven by cutting-edge artificial intelligence.',
  'نحن فخورون بإطلاق قسم تطوير المنتجات والحلول الذكية، حيث نقوم بتطوير تطبيقات ذكية وأنظمة أتمتة مبتكرة للشركات، مدفوعة بأحدث تقنيات الذكاء الاصطناعي.',
  ARRAY['Innovation Center', 'Smart Automation', 'AI Engineering', 'Creative Tech']
)
ON CONFLICT (id) DO UPDATE SET
  hero_bg_opacity = EXCLUDED.hero_bg_opacity,
  about_vision_title_en = EXCLUDED.about_vision_title_en,
  about_vision_title_ar = EXCLUDED.about_vision_title_ar,
  about_vision_text_en = EXCLUDED.about_vision_text_en,
  about_vision_text_ar = EXCLUDED.about_vision_text_ar,
  about_mission_title_en = EXCLUDED.about_mission_title_en,
  about_mission_title_ar = EXCLUDED.about_mission_title_ar,
  about_mission_text_en = EXCLUDED.about_mission_text_en,
  about_mission_text_ar = EXCLUDED.about_mission_text_ar,
  ai_title_en = EXCLUDED.ai_title_en,
  ai_title_ar = EXCLUDED.ai_title_ar,
  ai_subtitle_en = EXCLUDED.ai_subtitle_en,
  ai_subtitle_ar = EXCLUDED.ai_subtitle_ar,
  ai_desc_en = EXCLUDED.ai_desc_en,
  ai_desc_ar = EXCLUDED.ai_desc_ar,
  innovation_keywords = EXCLUDED.innovation_keywords;

-- 3. Clear existing gallery and seed with new work items (if empty)
-- NOTE: Uncomment these if you want to force sync the gallery from config
-- DELETE FROM gallery;
-- INSERT INTO gallery (media, media_type, category, alt_text) VALUES
-- ('/gallery/work1.jpg', 'image', 'branding', 'Creative Production'),
-- ('/gallery/work2.jpg', 'image', 'photography', 'Photography Art'),
-- ... (rest of items)

-- 4. Enable RLS and Policies (Final Security Pass)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public View" ON site_settings;
CREATE POLICY "Public View" ON site_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin All" ON site_settings;
CREATE POLICY "Admin All" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
