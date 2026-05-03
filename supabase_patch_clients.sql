-- Patch to add missing clients table and featured column in gallery
CREATE TABLE IF NOT EXISTS public.clients (
    id           UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    name         TEXT    NOT NULL,
    logo_url     TEXT    NOT NULL,
    sort_order   INTEGER NOT NULL DEFAULT 0,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add featured column to gallery if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pf_columns WHERE table_name='gallery' AND column_name='is_featured') THEN
        ALTER TABLE public.gallery ADD COLUMN is_featured BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Enable RLS for clients
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_clients" ON public.clients;
DROP POLICY IF EXISTS "admin_all_clients" ON public.clients;

CREATE POLICY "public_read_clients" ON public.clients FOR SELECT USING (true);
CREATE POLICY "admin_all_clients" ON public.clients FOR ALL USING ((SELECT auth.role()) = 'authenticated');
