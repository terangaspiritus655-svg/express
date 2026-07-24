-- ExpressH24 Seed File
-- Loads official categories and products into Supabase Firestore / Cloud database

INSERT INTO categories (id, name, icon_name, description, image, item_count) VALUES
('cat-confiseries', 'Confiseries & Chocolats', 'Candy', 'Chocolats, barres de chocolat, bonbons', 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=600&q=80', 13),
('cat-biscuits', 'Biscuits & Goûters', 'Cookie', 'Palmitos, galettes, palets bretons, Oreos', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80', 6),
('cat-chips-snacks', 'Chips & Snacks Salés', 'Popcorn', 'Cheetos, Lay''s, Pringles, Doritos', 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=600&q=80', 9),
('cat-epicerie', 'Épicerie', 'ShoppingBag', 'Nouilles, pâtes, farine, sucres, thés', 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80', 9),
('cat-produits-laitiers', 'Produits Laitiers', 'Milk', 'Fromages, beurres, crèmes, yaourts', 'https://images.unsplash.com/photo-1528751014936-863e6e7a319c?auto=format&fit=crop&w=600&q=80', 12),
('cat-boulangerie', 'Pain & Boulangerie', 'Croissant', 'Baguettes, pain de mie, pains burger', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80', 4),
('cat-charcuterie', 'Charcuterie', 'Beef', 'Jambons de bœuf, saucissons, cervelas', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', 4),
('cat-laits-petit-dejeuner', 'Laits & Petit-déjeuner', 'Coffee', 'Laits Gloria, Laicran, Candia, Nutella', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80', 10),
('cat-boissons', 'Boissons', 'CupSoda', 'Coca-Cola, Sprite, Kirène, Red Bull', 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80', 11),
('cat-fruits-legumes', 'Fruits & Légumes', 'Apple', 'Fruits frais et légumes du marché', 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80', 11),
('cat-bebe', 'Bébé', 'Baby', 'Couches Tima, Molfix, Huggies, Cérélac', 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80', 8),
('cat-hygiene-entretien', 'Hygiène & Entretien', 'Sparkles', 'Madar, Javel La Croix, Raid', 'https://images.unsplash.com/photo-1585832770485-e68a5fcfad52?auto=format&fit=crop&w=600&q=80', 13),
('cat-maison-divers', 'Maison & Divers', 'Home', 'Multiprises, alu, film fraîcheur, piles', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80', 6),
('cat-hygiene-personnelle', 'Hygiène Personnelle', 'HeartPulse', 'Serviettes, Colgate, Sensodyne, Listerine', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80', 9),
('cat-alcool', 'Alcohol', 'Wine', 'Whiskies, Gin Bombay, Champagne, Heineken', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80', 10),
('cat-fumeurs', 'Fumeurs', 'Flame', 'Marlboro, OCB, RAW, Briquets Bic', 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80', 7),
('cat-sante-pharmacie', 'Santé & Pharmacie', 'Cross', 'Doliprane, Aspirine, Tylenol, Durex, Manix', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80', 11)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- Insert Products
INSERT INTO products (id, sku, barcode, slug, name, category_id, category_name, price, currency, status, needs_validation, brand, unit, stock, description) VALUES
('p-conf-01', 'EXH-CONF-001', '370000000101', 'snickers', 'Snickers', 'cat-confiseries', 'Confiseries & Chocolats', 1000, 'XOF', 'ACTIVE', false, 'Snickers', 'Barre 50g', 100, 'Snickers barre de chocolat'),
('p-conf-02', 'EXH-CONF-002', '370000000102', 'twix', 'Twix', 'cat-confiseries', 'Confiseries & Chocolats', 1000, 'XOF', 'ACTIVE', false, 'Twix', 'Barre 50g', 100, 'Twix biscuit chocolat'),
('p-bebe-03', 'EXH-BEBE-003', '370000001103', 'couches-huggies', 'Couches Huggies', 'cat-bebe', 'Bébé', NULL, 'XOF', 'ADMIN_VALIDATION_REQUIRED', true, 'Huggies', 'Paquet variables', 100, 'Prix à préciser. En attente de validation par l administrateur.')
ON CONFLICT (id) DO UPDATE SET price = EXCLUDED.price, status = EXCLUDED.status, needs_validation = EXCLUDED.needs_validation;
