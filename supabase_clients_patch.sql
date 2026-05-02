-- ============================================================
-- Add Clients Table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.clients (
    id           UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    sort_order   INTEGER NOT NULL DEFAULT 0,
    logo_url     TEXT    NOT NULL,
    name         TEXT    NOT NULL DEFAULT 'Client Name',
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "public_read_clients" ON public.clients;
DROP POLICY IF EXISTS "admin_all_clients" ON public.clients;

CREATE POLICY "public_read_clients" ON public.clients FOR SELECT USING (true);
CREATE POLICY "admin_all_clients" ON public.clients FOR ALL USING ((SELECT auth.role()) = 'authenticated');

-- Trigger for updated_at
CREATE OR REPLACE TRIGGER trg_clients_updated_at
    BEFORE UPDATE ON public.clients
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed initial logos from site.config.js (as much as possible)
INSERT INTO public.clients (sort_order, logo_url, name)
VALUES 
(1, 'client1.png', 'Client 1'),
(2, 'client2.png', 'Client 2'),
(3, 'client3.png', 'Client 3'),
(4, 'client4.png', 'Client 4'),
(5, 'client5.png', 'Client 5'),
(6, 'client6.png', 'Client 6')
ON CONFLICT DO NOTHING;
