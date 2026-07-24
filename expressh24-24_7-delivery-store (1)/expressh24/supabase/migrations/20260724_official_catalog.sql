-- ExpressH24 Official Catalog Migration Script
-- Date: 2026-07-24
-- Currency: XOF (FCFA)

-- 1. Ensure categories table schema
CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon_name TEXT DEFAULT 'ShoppingBag',
    description TEXT,
    image TEXT,
    item_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- 2. Ensure products table schema with all fields
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    sku TEXT UNIQUE,
    barcode TEXT,
    slug TEXT,
    name TEXT NOT NULL,
    category_id TEXT REFERENCES categories(id) ON DELETE CASCADE,
    category_name TEXT,
    price INTEGER, -- FCFA integer, NULL for "Prix à préciser"
    old_price INTEGER,
    currency TEXT DEFAULT 'XOF',
    status TEXT DEFAULT 'ACTIVE',
    needs_validation BOOLEAN DEFAULT FALSE,
    brand TEXT,
    image TEXT,
    description TEXT,
    stock INTEGER DEFAULT 100,
    unit TEXT DEFAULT 'Unité',
    is_popular BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    badge TEXT,
    keywords TEXT,
    availability TEXT DEFAULT 'in_stock',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Add missing columns if table pre-existed
ALTER TABLE products ADD COLUMN IF NOT EXISTS sku TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS barcode TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'XOF';
ALTER TABLE products ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'ACTIVE';
ALTER TABLE products ADD COLUMN IF NOT EXISTS needs_validation BOOLEAN DEFAULT FALSE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS brand TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS keywords TEXT;

-- 3. Delete all demo products & old categories
DELETE FROM products;
DELETE FROM categories;

-- 4. Insert Official ExpressH24 Categories (17 Categories)
INSERT INTO categories (id, name, icon_name, description, image, item_count) VALUES
('cat-confiseries', 'Confiseries & Chocolats', 'Candy', 'Chocolats, barres de chocolat, bonbons et friandises express', 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=600&q=80', 13),
('cat-biscuits', 'Biscuits & Goûters', 'Cookie', 'Palmitos, galettes, palets bretons, Oreos et Petits Écoliers', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80', 6),
('cat-chips-snacks', 'Chips & Snacks Salés', 'Popcorn', 'Cheetos, Lay''s, Pringles, Doritos et bonbons Haribo', 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=600&q=80', 9),
('cat-epicerie', 'Épicerie', 'ShoppingBag', 'Nouilles, pâtes, farine, sucres, thés et céréales', 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80', 9),
('cat-produits-laitiers', 'Produits Laitiers', 'Milk', 'Fromages, beurres, crèmes et yaourts Dolima', 'https://images.unsplash.com/photo-1528751014936-863e6e7a319c?auto=format&fit=crop&w=600&q=80', 12),
('cat-boulangerie', 'Pain & Boulangerie', 'Croissant', 'Baguettes fraîches, pain de mie et mini pains burger', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80', 4),
('cat-charcuterie', 'Charcuterie', 'Beef', 'Jambons de bœuf, saucissons à l''ail et cervelas', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', 4),
('cat-laits-petit-dejeuner', 'Laits & Petit-déjeuner', 'Coffee', 'Laits Gloria, Laicran, Candia, Bridel, Président et Nutella', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80', 10),
('cat-boissons', 'Boissons', 'CupSoda', 'Coca-Cola, Sprite, Eau Kirène, Red Bull et Jus frais', 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80', 11),
('cat-fruits-legumes', 'Fruits & Légumes', 'Apple', 'Fruits frais et légumes du marché livrés en 20 minutes', 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80', 11),
('cat-bebe', 'Bébé', 'Baby', 'Couches Tima, Molfix, Huggies, Cérélac, Nido et NAN', 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80', 8),
('cat-hygiene-entretien', 'Hygiène & Entretien', 'Sparkles', 'Produits Madar, Eau de Javel La Croix, papier toilette et Raid', 'https://images.unsplash.com/photo-1585832770485-e68a5fcfad52?auto=format&fit=crop&w=600&q=80', 13),
('cat-maison-divers', 'Maison & Divers', 'Home', 'Multiprises, assiettes jetables, alu, film étirable et piles', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80', 6),
('cat-hygiene-personnelle', 'Hygiène Personnelle', 'HeartPulse', 'Serviettes hygiéniques, Colgate, Sensodyne, Listerine et Bic', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80', 9),
('cat-alcool', 'Alcohol', 'Wine', 'Whiskies, Gin Bombay, Champagne, Vins et Packs Heineken (21+)', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80', 10),
('cat-fumeurs', 'Fumeurs', 'Flame', 'Marlboro Light, feuilles OCB Virgin & Premium, RAW et Briquets Bic', 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80', 7),
('cat-sante-pharmacie', 'Santé & Pharmacie', 'Cross', 'Doliprane, Aspirine, Tylenol, Thermomètres, Durex, Manix et Vaseline', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80', 11);

-- 5. Create Search Index on Products
CREATE INDEX IF NOT EXISTS idx_products_search ON products(name, sku, category_name, keywords);
