-- Patch: Add ALL potentially missing columns to site_settings
-- Safe to run multiple times (IF NOT EXISTS)

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS primary_color TEXT NOT NULL DEFAULT '#dc2626';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS services_bg_media TEXT NOT NULL DEFAULT '/backgrounds/services/services-bg.jpg';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS services_bg_opacity NUMERIC NOT NULL DEFAULT 0.85;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS products_bg_media TEXT NOT NULL DEFAULT '/backgrounds/services/services-bg.jpg';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS products_bg_opacity NUMERIC NOT NULL DEFAULT 0.88;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS gallery_bg_media TEXT NOT NULL DEFAULT '/backgrounds/clients/clients-bg.jpg';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS gallery_bg_opacity NUMERIC NOT NULL DEFAULT 0.92;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS clients_bg_media TEXT NOT NULL DEFAULT '/backgrounds/clients/clients-bg.jpg';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS clients_bg_opacity NUMERIC NOT NULL DEFAULT 0.95;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_bg_media TEXT NOT NULL DEFAULT '/backgrounds/clients/about-bg.png';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_bg_opacity NUMERIC NOT NULL DEFAULT 0.94;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS contact_email TEXT NOT NULL DEFAULT 'info@twinhub.net';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS contact_phone TEXT NOT NULL DEFAULT '01007197170';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS contact_whatsapp TEXT NOT NULL DEFAULT '201007197170';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS social_instagram TEXT NOT NULL DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS social_facebook TEXT NOT NULL DEFAULT '';

-- Also ensure products has all needed columns
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS media_type TEXT NOT NULL DEFAULT 'video';
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS link TEXT NOT NULL DEFAULT '#';
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS features_en JSONB NOT NULL DEFAULT '[]';
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS features_ar JSONB NOT NULL DEFAULT '[]';

-- Ensure services has all needed columns  
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS features_en JSONB NOT NULL DEFAULT '[]';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS features_ar JSONB NOT NULL DEFAULT '[]';
