-- ==============================================================================
-- EXPRESSH24 SÉNÉGAL - SUPABASE FULL PRODUCTION SCHEMA MIGRATION
-- Generated for Supabase PostgreSQL Database with Auth, RLS, Storage & Realtime
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE app_role AS ENUM ('super_admin', 'admin', 'manager', 'customer_service', 'warehouse', 'driver', 'customer');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('received', 'preparing', 'on_the_way', 'delivered', 'cancelled');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE payment_method AS ENUM ('cash', 'wave', 'orange_money', 'card');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'paid_on_delivery', 'failed', 'refunded');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE delivery_type AS ENUM ('express', 'standard');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE stock_movement_type AS ENUM ('in', 'out', 'adjustment', 'return');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 3. TRIGGER FUNCTION FOR UPDATED_AT
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. TABLES DEFINITION

-- 4.1 USERS TABLE (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    role app_role DEFAULT 'customer' NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 4.2 ROLES & PERMISSIONS
CREATE TABLE IF NOT EXISTS public.roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name app_role UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.role_permissions (
    role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES public.permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS public.user_roles (
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- 4.3 CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    email TEXT,
    total_orders INT DEFAULT 0,
    total_spent DECIMAL(12,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 4.4 CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    icon_name TEXT,
    description TEXT,
    image TEXT,
    item_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 4.5 PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES public.categories(id) ON DELETE RESTRICT,
    category_name TEXT NOT NULL,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    old_price DECIMAL(10,2),
    image TEXT NOT NULL,
    description TEXT,
    stock INT DEFAULT 50 NOT NULL,
    unit TEXT DEFAULT 'Unité' NOT NULL,
    is_popular BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    badge TEXT,
    availability TEXT DEFAULT 'in_stock' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 4.6 PRODUCT IMAGES
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 4.7 INVENTORY
CREATE TABLE IF NOT EXISTS public.inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID UNIQUE REFERENCES public.products(id) ON DELETE CASCADE,
    quantity_available INT DEFAULT 0 NOT NULL,
    quantity_reserved INT DEFAULT 0 NOT NULL,
    reorder_level INT DEFAULT 10 NOT NULL,
    warehouse_location TEXT DEFAULT 'Dépôt Central Almadies',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 4.8 STOCK MOVEMENTS
CREATE TABLE IF NOT EXISTS public.stock_movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    type stock_movement_type NOT NULL,
    reason TEXT,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 4.9 SUPPLIERS
CREATE TABLE IF NOT EXISTS public.suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    contact_name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    category_provided TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 4.10 PURCHASES
CREATE TABLE IF NOT EXISTS public.purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    supplier_id UUID REFERENCES public.suppliers(id) ON DELETE RESTRICT,
    total_amount DECIMAL(12,2) NOT NULL,
    status TEXT DEFAULT 'received' NOT NULL,
    items_count INT DEFAULT 1,
    purchase_date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.purchase_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    purchase_id UUID REFERENCES public.purchases(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE RESTRICT,
    quantity INT NOT NULL,
    unit_cost DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 4.11 DELIVERY DRIVERS
CREATE TABLE IF NOT EXISTS public.delivery_drivers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    avatar TEXT,
    vehicle TEXT DEFAULT 'Scooter Yamasaki 125cc' NOT NULL,
    license_plate TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'available' NOT NULL,
    rating DECIMAL(3,2) DEFAULT 4.90 NOT NULL,
    total_deliveries INT DEFAULT 0 NOT NULL,
    current_order_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 4.12 DELIVERY ZONES
CREATE TABLE IF NOT EXISTS public.delivery_zones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    zone_code TEXT,
    express_time_min INT DEFAULT 20 NOT NULL,
    standard_fee DECIMAL(10,2) DEFAULT 1000 NOT NULL,
    express_fee DECIMAL(10,2) DEFAULT 1500 NOT NULL,
    active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 4.13 ADDRESSES
CREATE TABLE IF NOT EXISTS public.addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    title TEXT DEFAULT 'Domicile',
    address_line TEXT NOT NULL,
    neighborhood TEXT NOT NULL,
    instructions TEXT,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 4.14 ORDERS
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY, -- e.g. EXH-2026-8912
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    address TEXT NOT NULL,
    neighborhood TEXT NOT NULL,
    instructions TEXT,
    delivery_type delivery_type DEFAULT 'express' NOT NULL,
    delivery_fee DECIMAL(10,2) DEFAULT 1500 NOT NULL,
    payment_method payment_method DEFAULT 'cash' NOT NULL,
    payment_status payment_status DEFAULT 'pending' NOT NULL,
    status order_status DEFAULT 'received' NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0 NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    driver_id UUID REFERENCES public.delivery_drivers(id) ON DELETE SET NULL,
    estimated_minutes INT DEFAULT 20 NOT NULL,
    tracking_step INT DEFAULT 1 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 4.15 ORDER ITEMS
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE RESTRICT,
    product_name TEXT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    product_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 4.16 PAYMENTS
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE,
    payment_method payment_method NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status payment_status DEFAULT 'pending' NOT NULL,
    transaction_ref TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 4.17 COUPONS
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    discount_type TEXT DEFAULT 'fixed' NOT NULL,
    discount_value DECIMAL(10,2) NOT NULL,
    min_order_amount DECIMAL(10,2) DEFAULT 0 NOT NULL,
    active BOOLEAN DEFAULT true NOT NULL,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 4.18 PROMOTIONS
CREATE TABLE IF NOT EXISTS public.promotions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    banner_image TEXT NOT NULL,
    discount_percent INT,
    active BOOLEAN DEFAULT true NOT NULL,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 4.19 REVIEWS
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    customer_name TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 4.20 FAVORITES
CREATE TABLE IF NOT EXISTS public.favorites (
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    PRIMARY KEY (user_id, product_id)
);

-- 4.21 NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'system' NOT NULL,
    read BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 4.22 SUPPORT TICKETS
CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status ticket_status DEFAULT 'open' NOT NULL,
    priority ticket_priority DEFAULT 'medium' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 4.23 ACTIVITY LOGS
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    user_name TEXT,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4.24 COMPANY SETTINGS
CREATE TABLE IF NOT EXISTS public.company_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. ATTACH TRIGGERS FOR UPDATED_AT
CREATE TRIGGER set_updated_at_users BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at_customers BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at_categories BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at_products BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at_orders BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at_drivers BEFORE UPDATE ON public.delivery_drivers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 6. INDEXES
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_products_popular ON public.products(is_popular) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON public.orders(customer_phone) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_drivers_status ON public.delivery_drivers(status) WHERE deleted_at IS NULL;

-- 7. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public Categories Select" ON public.categories FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Public Products Select" ON public.products FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Public Drivers Select" ON public.delivery_drivers FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Public Coupons Select" ON public.coupons FOR SELECT USING (active = true AND deleted_at IS NULL);
CREATE POLICY "Public Orders Select" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public Orders Insert" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Orders Update" ON public.orders FOR UPDATE USING (true);
CREATE POLICY "Public Order Items Select" ON public.order_items FOR SELECT USING (true);
CREATE POLICY "Public Order Items Insert" ON public.order_items FOR INSERT WITH CHECK (true);

-- Admin Full Access Policies
CREATE POLICY "Admin Categories All" ON public.categories FOR ALL USING (true);
CREATE POLICY "Admin Products All" ON public.products FOR ALL USING (true);

-- 8. STORAGE BUCKETS SETUP
INSERT INTO storage.buckets (id, name, public) VALUES
    ('products', 'products', true),
    ('categories', 'categories', true),
    ('avatars', 'avatars', true),
    ('documents', 'documents', false),
    ('banners', 'banners', true),
    ('invoices', 'invoices', false),
    ('drivers', 'drivers', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS
CREATE POLICY "Public Access Bucket Storage" ON storage.objects FOR SELECT USING (bucket_id IN ('products', 'categories', 'avatars', 'banners', 'drivers'));
CREATE POLICY "Public Insert Bucket Storage" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('products', 'categories', 'avatars', 'banners', 'drivers'));

-- 9. REALTIME PUBLICATION
DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.delivery_drivers;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
EXCEPTION WHEN OTHERS THEN null; END $$;

-- 10. CATALOG SEED DATA (AUTHENTIC EXPRESSH24 DAKAR CATALOG)

-- 10.1 Categories
INSERT INTO public.categories (id, slug, name, icon_name, description, image, item_count) VALUES
    ('cat-1', 'boissons-fraiches', 'Boissons & Jus Frais', 'CupSoda', 'Eau minérale Kirène, sodas glacés, jus naturels de Bissap et Bouye 24H/24', 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80', 6),
    ('cat-2', 'hygiene-beaute', 'Hygiène & Beauté', 'Sparkles', 'Savons, shampoings, gel douche, déodorants et soins du corps', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80', 5),
    ('cat-3', 'soins-bebe', 'Soins Bébé & Couches', 'Baby', 'Couches Pampers, lingettes douces, lait infantile et produits pour tout-petits', 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80', 4),
    ('cat-4', 'snacks-aperitifs', 'Snacks & Apéritifs', 'Cookie', 'Chips, cacahuètes grillées locales, biscuits gourmands et chocolats', 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80', 5),
    ('cat-5', 'entretien-maison', 'Entretien & Maison', 'Home', 'Lessive Madar, nettoyants sol, papier toilette et sprays désinfectants', 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80', 4),
    ('cat-6', 'epicerie-fine', 'Épicerie & Petit Déjeuner', 'ShoppingBag', 'Riz brisé, huile de cuisine, café Touba, lait concentré, sucre et épices', 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80', 5),
    ('cat-7', 'preservatifs-intime', 'Santé & Bien-être Intime', 'Shield', 'Préservatifs certifiés, gels lubrifiants et protection hygiénique en livraison 100% discrète', 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80', 4),
    ('cat-8', 'cigarettes-tabac', 'E-Cigarettes & Tabac', 'Cigarette', 'Cigarettes, briquets, vapes jetables et accessoires de nuit', 'https://images.unsplash.com/photo-1527016016007-57a199063497?auto=format&fit=crop&w=800&q=80', 3),
    ('cat-9', 'pharmacie-urgence', 'Pharmacie & Urgence', 'HeartPulse', 'Pansements, paracétamol, vitamines C et trousses de premiers secours', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80', 3),
    ('cat-10', 'high-tech-chargeurs', 'Accessoires Phone & High-Tech', 'Smartphone', 'Câbles de charge rapide Type-C/iPhone, écouteurs Bluetooth et powerbanks', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80', 3),
    ('cat-11', 'boissons-energetiques', 'Energy Drinks & Glaces', 'Zap', 'Red Bull, Monster Energy, glaçons alimentaires en sac pour vos soirées', 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=800&q=80', 3),
    ('cat-12', 'animaux-compagnie', 'Nourriture Animaux', 'Cat', 'Croquettes pour chiens et chats, litière et friandises', 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80', 2),
    ('cat-13', 'papeterie-bureau', 'Fournitures & Dépannage', 'Paperclip', 'Feuilles A4, stylos, adhésif et piles alcalines', 'https://images.unsplash.com/photo-1585336261026-67576833a6f4?auto=format&fit=crop&w=800&q=80', 2)
ON CONFLICT (id) DO NOTHING;

-- 10.2 Products
INSERT INTO public.products (id, category_id, category_name, name, price, old_price, image, description, stock, unit, is_popular, is_new, badge, availability) VALUES
    ('p-1', 'cat-1', 'Boissons & Jus Frais', 'Pack Eau Kirène 1.5L (6 Bouteilles)', 2400, 2700, 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80', 'Pack de 6 bouteilles d eau minérale naturelle Kirène 1.5 Litres.', 120, 'Pack 6x1.5L', true, false, 'Incontournable', 'in_stock'),
    ('p-2', 'cat-1', 'Boissons & Jus Frais', 'Jus Naturel Bissap Artisanal 1L', 1500, 1800, 'https://images.unsplash.com/photo-1546171753-97d7676e417b?auto=format&fit=crop&w=600&q=80', 'Jus de Bissap (Fleur d hibiscus) glacé fait maison, infusé à la menthe fraiche.', 45, 'Bouteille 1L', true, true, 'Local Dakar', 'in_stock'),
    ('p-3', 'cat-1', 'Boissons & Jus Frais', 'Jus de Bouye (Pain de Singe) 1L', 1800, 2000, 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80', 'Jus traditionnel de baobab onctueux aromatisé à la fleur d oranger.', 30, 'Bouteille 1L', true, false, 'Populaire', 'in_stock'),
    ('p-4', 'cat-1', 'Boissons & Jus Frais', 'Coca-Cola Canette 33cl (Lot de 4)', 2200, 2500, 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80', 'Lot de 4 canettes fraiches de Coca-Cola Original 333ml.', 80, 'Lot 4 Canettes', false, false, NULL, 'in_stock'),
    ('p-5', 'cat-2', 'Hygiène & Beauté', 'Savon Noir au Karité Brut Dakar 200g', 1200, 1500, 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&fit=crop&w=600&q=80', 'Savon traditionnel purifiant enrichi au beurre de karité naturel.', 60, 'Pain 200g', true, true, '100% Bio', 'in_stock'),
    ('p-6', 'cat-2', 'Hygiène & Beauté', 'Gel Douche Hydratant Nivea 500ml', 3500, 4000, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80', 'Gel douche formule douce aux huiles nourrissantes.', 40, 'Flacon 500ml', false, false, NULL, 'in_stock'),
    ('p-7', 'cat-3', 'Soins Bébé & Couches', 'Couches Pampers Baby-Dry Taille 4 (Pack 44)', 9500, 11000, 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80', 'Couches bébé étanches jusqu à 12h de protection nuit.', 25, 'Paquet 44 couches', true, false, 'Urgence Bébé', 'in_stock'),
    ('p-8', 'cat-3', 'Soins Bébé & Couches', 'Lingettes Bébé Douceur WaterWipes (Lot 3x60)', 4800, 5500, 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80', 'Lingettes 99.9% eau pure pour peau sensible.', 35, 'Lot de 3 paquets', false, false, NULL, 'in_stock'),
    ('p-9', 'cat-4', 'Snacks & Apéritifs', 'Cacahuètes Grillées Salées de Thies 500g', 1500, 1800, 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=600&q=80', 'Cacahuètes locales dorées à la perfection.', 90, 'Sachet 500g', true, false, 'Saveur Locale', 'in_stock'),
    ('p-10', 'cat-4', 'Snacks & Apéritifs', 'Chips Lays Salées Format Familial 150g', 2200, 2600, 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80', 'Chips de pommes de terre croustillantes.', 50, 'Paquet 150g', false, false, NULL, 'in_stock'),
    ('p-11', 'cat-5', 'Entretien & Maison', 'Poudre Lessive Madar Parfum Citron 1kg', 1800, 2100, 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80', 'Poudre de lavage ultra dégraissante Madar.', 70, 'Sachet 1kg', true, false, 'Essentiel', 'in_stock'),
    ('p-12', 'cat-6', 'Épicerie & Petit Déjeuner', 'Café Touba Moulu Authentique 250g', 1500, 1800, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80', 'Café Touba épicé au piment de Selim (Diarr).', 100, 'Sachet 250g', true, true, 'Recette Originale', 'in_stock'),
    ('p-13', 'cat-7', 'Santé & Bien-être Intime', 'Préservatifs Durex Extra Safe (Boite de 12)', 4500, 5200, 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80', 'Préservatifs haute protection sous emballage opaque.', 50, 'Boite de 12', true, false, 'Emballage Discret', 'in_stock'),
    ('p-14', 'cat-11', 'Energy Drinks & Glaces', 'Red Bull Energy Drink 250ml (Glacé)', 1500, 1800, 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=80', 'Canette Red Bull fraichement tirée du frigo.', 150, 'Canette 250ml', true, false, 'Servi Glacé 24h', 'in_stock'),
    ('p-15', 'cat-11', 'Energy Drinks & Glaces', 'Sac de Glaçons Alimentaires Purifiés 5kg', 2000, 2500, 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80', 'Glaçons limpides purifiés pour apéro et évènements.', 60, 'Sac 5kg', true, true, 'Livraison 15 min', 'in_stock')
ON CONFLICT (id) DO NOTHING;

-- 10.3 Delivery Drivers
INSERT INTO public.delivery_drivers (id, name, phone, avatar, vehicle, license_plate, status, rating, total_deliveries) VALUES
    ('drv-1', 'Moussa Diop', '+221 77 648 14 20', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', 'Scooter Yamasaki 125cc', 'DK-2026-AB', 'available', 4.95, 1420),
    ('drv-2', 'Amadou Fall', '+221 78 112 34 56', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', 'Scooter TVS King', 'DK-8912-CD', 'delivering', 4.88, 980),
    ('drv-3', 'Cheikh Ndiaye', '+221 70 998 87 76', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', 'Scooter Honda Dio', 'DK-5544-EF', 'available', 4.92, 1150),
    ('drv-4', 'Ousmane Sarr', '+221 76 443 22 11', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80', 'Scooter Bajaj Pulsar', 'DK-7711-GH', 'available', 4.85, 730)
ON CONFLICT (id) DO NOTHING;

-- 10.4 Coupons
INSERT INTO public.coupons (code, discount_type, discount_value, min_order_amount, active) VALUES
    ('EXPRESS2026', 'fixed', 1500, 5000, true),
    ('DAKAR15', 'percent', 15, 3000, true),
    ('WAVE1000', 'fixed', 1000, 4000, true)
ON CONFLICT (code) DO NOTHING;

-- 10.5 Company Settings
INSERT INTO public.company_settings (key, value, description) VALUES
    ('company_name', 'ExpressH24 Sénégal', 'Nom commercial du service'),
    ('whatsapp_phone', '+221 77 648 14 20', 'Ligne WhatsApp officielle'),
    ('service_hours', '24H/24 • 7J/7 (365 jours par an)', 'Plage horaire d activité'),
    ('express_delivery_time', '15 - 20 minutes', 'Délai moyen de livraison'),
    ('standard_delivery_fee', '1000', 'Frais de livraison standard en FCFA'),
    ('express_delivery_fee', '1500', 'Frais de livraison express en FCFA')
ON CONFLICT (key) DO NOTHING;

-- ==============================================================================
-- END OF MIGRATION SCRIPT
-- ==============================================================================
