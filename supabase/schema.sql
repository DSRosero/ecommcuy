-- ==============================================================================
-- EcommCuy: Esquema de Base de Datos PostgreSQL para Supabase
-- ==============================================================================

-- 1. Tabla de Categorías
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabla de Productos
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    short_description TEXT NOT NULL,
    price_cop BIGINT NOT NULL,
    original_price_cop BIGINT,
    stock INTEGER NOT NULL DEFAULT 0,
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    images TEXT[] NOT NULL DEFAULT '{}',
    features TEXT[] NOT NULL DEFAULT '{}',
    specs JSONB NOT NULL DEFAULT '{}'::jsonb,
    rating NUMERIC(3,2) DEFAULT 5.0,
    review_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    badge TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabla de Pedidos / Órdenes
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY DEFAULT ('EC-' || floor(random() * (999999 - 100000 + 1) + 100000)::text),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    shipping_city TEXT NOT NULL,
    shipping_department TEXT NOT NULL,
    notes TEXT,
    total_cop BIGINT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
    payment_method TEXT NOT NULL,
    payment_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tabla de Artículos de la Orden
CREATE TABLE IF NOT EXISTS public.order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id TEXT REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price_cop BIGINT NOT NULL,
    subtotal_cop BIGINT NOT NULL,
    image_url TEXT
);

-- 5. Seguridad a Nivel de Fila (Row Level Security - RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública para catálogo
CREATE POLICY "Permitir lectura publica de categorias" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Permitir lectura publica de productos" ON public.products FOR SELECT USING (true);

-- Políticas de creación de órdenes públicas (Checkout sin registro obligatorio)
CREATE POLICY "Permitir crear ordenes a cualquiera" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir crear articulos de orden a cualquiera" ON public.order_items FOR INSERT WITH CHECK (true);

-- ==============================================================================
-- Datos Iniciales (Seed Data)
-- ==============================================================================

INSERT INTO public.categories (id, name, slug, description, icon) VALUES
('laptops-pro', 'Laptops & Estaciones', 'laptops-estaciones', 'Equipos de máxima potencia para desarrollo, IA y diseño 3D.', 'Laptop'),
('perifericos', 'Periféricos Táctiles', 'perifericos-tactiles', 'Teclados mecánicos magnéticos, ratones ultraligeros y desk-pads.', 'Keyboard'),
('audio-hi-fi', 'Audio & Acústica', 'audio-acustica', 'Cancelación activa de ruido, drivers planares y fidelidad de estudio.', 'Headphones'),
('monitores', 'Pantallas & Monitores', 'pantallas-monitores', 'Paneles OLED ultrarrápidos y pantallas ultra-panorámicas calibradas.', 'Monitor'),
('smart-devices', 'Gadgets & Hardware Pro', 'gadgets-hardware-pro', 'Docks Thunderbolt 4, controladores ergonómicos y microcomputación.', 'Cpu')
ON CONFLICT (id) DO NOTHING;
