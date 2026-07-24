import { Product } from '../types';

const makeProd = (
  id: string,
  sku: string,
  barcode: string,
  name: string,
  categoryId: string,
  categoryName: string,
  price: number | null,
  unit: string,
  brand?: string,
  image?: string,
  desc?: string
): Product => {
  const slug = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const needsValidation = price === null;
  const status = needsValidation ? 'ADMIN_VALIDATION_REQUIRED' : 'ACTIVE';
  const defaultImage = image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80';
  const defaultDesc = desc || `${name} — Produit officiel ExpressH24 disponible en livraison express 24H/24 à Dakar.`;
  const kw = [name, categoryName, brand || '', sku, unit, 'expressh24', 'dakar'].filter(Boolean).join(' ').toLowerCase();

  return {
    id,
    sku,
    barcode,
    slug,
    name,
    categoryId,
    categoryName,
    price,
    currency: 'XOF',
    status,
    needsValidation,
    brand,
    image: defaultImage,
    description: defaultDesc,
    stock: 100,
    unit,
    featured: false,
    keywords: kw,
    availability: needsValidation ? 'out_of_stock' : 'in_stock',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Confiseries & Chocolats
  makeProd('p-conf-01', 'EXH-CONF-001', '370000000101', 'Snickers', 'cat-confiseries', 'Confiseries & Chocolats', 1000, 'Barre 50g', 'Snickers', 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-conf-02', 'EXH-CONF-002', '370000000102', 'Twix', 'cat-confiseries', 'Confiseries & Chocolats', 1000, 'Barre 50g', 'Twix', 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-conf-03', 'EXH-CONF-003', '370000000103', 'Mars', 'cat-confiseries', 'Confiseries & Chocolats', 1000, 'Barre 51g', 'Mars', 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-conf-04', 'EXH-CONF-004', '370000000104', 'Kinder Maxi', 'cat-confiseries', 'Confiseries & Chocolats', 1500, 'Bâton 21g', 'Kinder', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-conf-05', 'EXH-CONF-005', '370000000105', 'Kinder Chocolat', 'cat-confiseries', 'Confiseries & Chocolats', 1500, 'Boîte 4 bâtonnets', 'Kinder', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-conf-06', 'EXH-CONF-006', '370000000106', 'Skittles', 'cat-confiseries', 'Confiseries & Chocolats', 1000, 'Sachet 45g', 'Skittles', 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-conf-07', 'EXH-CONF-007', '370000000107', 'Skittles Acidulés', 'cat-confiseries', 'Confiseries & Chocolats', 1000, 'Sachet Vert 45g', 'Skittles', 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-conf-08', 'EXH-CONF-008', '370000000108', 'M&M’s Cacahuètes', 'cat-confiseries', 'Confiseries & Chocolats', 1000, 'Sachet Jaune 45g', 'M&M’s', 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-conf-09', 'EXH-CONF-009', '370000000109', 'M&M’s Chocolat', 'cat-confiseries', 'Confiseries & Chocolats', 1000, 'Sachet Marron 45g', 'M&M’s', 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-conf-10', 'EXH-CONF-010', '370000000110', 'Maltesers', 'cat-confiseries', 'Confiseries & Chocolats', 1000, 'Sachet Rouge 37g', 'Maltesers', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-conf-11', 'EXH-CONF-011', '370000000111', 'Milka', 'cat-confiseries', 'Confiseries & Chocolats', 2500, 'Tablette 100g', 'Milka', 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-conf-12', 'EXH-CONF-012', '370000000112', 'Nutella Biscuits', 'cat-confiseries', 'Confiseries & Chocolats', 5000, 'Paquet 304g', 'Nutella', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-conf-13', 'EXH-CONF-013', '370000000113', 'Langues de Chat', 'cat-confiseries', 'Confiseries & Chocolats', 2000, 'Paquet 200g', 'LU', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80'),

  // 2. Biscuits & Goûters
  makeProd('p-bisc-01', 'EXH-BISC-001', '370000000201', 'Palmito LU', 'cat-biscuits', 'Biscuits & Goûters', 1500, 'Paquet 100g', 'LU', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-bisc-02', 'EXH-BISC-002', '370000000202', 'Galettes Bretonnes Pur Beurre', 'cat-biscuits', 'Biscuits & Goûters', 1500, 'Paquet 125g', 'Saint-Michel', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-bisc-03', 'EXH-BISC-003', '370000000203', 'Palets Bretons Pur Beurre', 'cat-biscuits', 'Biscuits & Goûters', 2000, 'Paquet 150g', 'Saint-Michel', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-bisc-04', 'EXH-BISC-004', '370000000204', 'Oreo Original', 'cat-biscuits', 'Biscuits & Goûters', 1500, 'Paquet 154g', 'Oreo', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-bisc-05', 'EXH-BISC-005', '370000000205', 'Petit Écolier', 'cat-biscuits', 'Biscuits & Goûters', 3000, 'Paquet 150g', 'LU', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-bisc-06', 'EXH-BISC-006', '370000000206', 'Petit Écolier Chocolat au Lait', 'cat-biscuits', 'Biscuits & Goûters', 3000, 'Paquet 150g', 'LU', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80'),

  // 3. Chips & Snacks Salés
  makeProd('p-chip-01', 'EXH-CHIP-001', '370000000301', 'Cheetos Fromage (100 g)', 'cat-chips-snacks', 'Chips & Snacks Salés', 2000, 'Sachet 100g', 'Cheetos', 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-chip-02', 'EXH-CHIP-002', '370000000302', 'Cheetos Sticks (96 g)', 'cat-chips-snacks', 'Chips & Snacks Salés', 2000, 'Sachet 96g', 'Cheetos', 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-chip-03', 'EXH-CHIP-003', '370000000303', 'Lay’s Nature (25 g)', 'cat-chips-snacks', 'Chips & Snacks Salés', 500, 'Sachet 25g', 'Lay’s', 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-chip-04', 'EXH-CHIP-004', '370000000304', 'Lay’s Salt & Vinegar (28,3 g)', 'cat-chips-snacks', 'Chips & Snacks Salés', 500, 'Sachet 28.3g', 'Lay’s', 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-chip-05', 'EXH-CHIP-005', '370000000305', 'Lay’s Poulet Rôti (45 g)', 'cat-chips-snacks', 'Chips & Snacks Salés', 1000, 'Sachet 45g', 'Lay’s', 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-chip-06', 'EXH-CHIP-006', '370000000306', 'Pringles Original Mini (37 g)', 'cat-chips-snacks', 'Chips & Snacks Salés', 1000, 'Tube 37g', 'Pringles', 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-chip-07', 'EXH-CHIP-007', '370000000307', 'Pringles Original (165 g)', 'cat-chips-snacks', 'Chips & Snacks Salés', 2000, 'Tube 165g', 'Pringles', 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-chip-08', 'EXH-CHIP-008', '370000000308', 'Doritos (160 g)', 'cat-chips-snacks', 'Chips & Snacks Salés', 2500, 'Sachet 160g', 'Doritos', 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-chip-09', 'EXH-CHIP-009', '370000000309', 'Haribo L’Ours d’Or (120 g)', 'cat-chips-snacks', 'Chips & Snacks Salés', 2000, 'Sachet 120g', 'Haribo', 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=600&q=80'),

  // 4. Épicerie
  makeProd('p-epic-01', 'EXH-EPIC-001', '370000000401', 'Noodle Soup', 'cat-epicerie', 'Épicerie', 1000, 'Paquet 70g', 'Indomie', 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-epic-02', 'EXH-EPIC-002', '370000000402', 'Pasta', 'cat-epicerie', 'Épicerie', 3000, 'Paquet 500g', 'Panzani', 'https://images.unsplash.com/photo-1621996346565-e3def6164286?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-epic-03', 'EXH-EPIC-003', '370000000403', 'Farine Fluide', 'cat-epicerie', 'Épicerie', 1500, 'Sachet 1kg', 'Francine', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-epic-04', 'EXH-EPIC-004', '370000000404', 'Sucre Vanillé', 'cat-epicerie', 'Épicerie', 1000, 'Sachet 10x7.5g', 'Alsa', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-epic-05', 'EXH-EPIC-005', '370000000405', 'Sucre en Morceaux', 'cat-epicerie', 'Épicerie', 1000, 'Boîte 1kg', 'Saint Louis', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-epic-06', 'EXH-EPIC-006', '370000000406', 'Thé Vert', 'cat-epicerie', 'Épicerie', 2000, 'Boîte 250g', 'Ahmad Tea', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-epic-07', 'EXH-EPIC-007', '370000000407', 'Cinnamon Toast Crunch', 'cat-epicerie', 'Épicerie', 1500, 'Boîte 340g', 'General Mills', 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-epic-08', 'EXH-EPIC-008', '370000000408', 'Céréales', 'cat-epicerie', 'Épicerie', 3500, 'Boîte 375g', 'Kellogg’s', 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-epic-09', 'EXH-EPIC-009', '370000000409', 'El Mordjene (700 g)', 'cat-epicerie', 'Épicerie', 8000, 'Pôt 700g', 'El Mordjene', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80'),

  // 5. Produits Laitiers
  makeProd('p-lait-01', 'EXH-LAIT-001', '370000000501', 'Emmental (150 g)', 'cat-produits-laitiers', 'Produits Laitiers', 2500, 'Portion 150g', 'President', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-lait-02', 'EXH-LAIT-002', '370000000502', 'Emmental Râpé (150 g)', 'cat-produits-laitiers', 'Produits Laitiers', 3000, 'Sachet 150g', 'President', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-lait-03', 'EXH-LAIT-003', '370000000503', 'Gouda (150 g)', 'cat-produits-laitiers', 'Produits Laitiers', 2500, 'Portion 150g', 'Frico', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-lait-04', 'EXH-LAIT-004', '370000000504', 'Cheddar (150 g)', 'cat-produits-laitiers', 'Produits Laitiers', 2500, 'Portion 150g', 'Cathedral City', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-lait-05', 'EXH-LAIT-005', '370000000505', 'Mozzarella (150 g)', 'cat-produits-laitiers', 'Produits Laitiers', 2500, 'Boule 150g', 'Galbani', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-lait-06', 'EXH-LAIT-006', '370000000506', 'La Vache Qui Rit', 'cat-produits-laitiers', 'Produits Laitiers', 1000, 'Boîte 8 portions', 'Bel', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-lait-07', 'EXH-LAIT-007', '370000000507', 'Bocage by Bridel', 'cat-produits-laitiers', 'Produits Laitiers', 1000, 'Pain 200g', 'Bridel', 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-lait-08', 'EXH-LAIT-008', '370000000508', 'Beurre Doux Président', 'cat-produits-laitiers', 'Produits Laitiers', 3000, 'Plaquette 200g', 'Président', 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-lait-09', 'EXH-LAIT-009', '370000000509', 'Crème Entière Président', 'cat-produits-laitiers', 'Produits Laitiers', 3000, 'Brique 20cl', 'Président', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-lait-10', 'EXH-LAIT-010', '370000000510', 'Yaourt Dolima Nature', 'cat-produits-laitiers', 'Produits Laitiers', 2000, 'Pot 400g', 'Dolima', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-lait-11', 'EXH-LAIT-011', '370000000511', 'Yaourt Dolima Vanille', 'cat-produits-laitiers', 'Produits Laitiers', 2000, 'Pot 400g', 'Dolima', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-lait-12', 'EXH-LAIT-012', '370000000512', 'Thiakry Dolima', 'cat-produits-laitiers', 'Produits Laitiers', 1000, 'Gobelet 200g', 'Dolima', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80'),

  // 6. Pain & Boulangerie
  makeProd('p-boul-01', 'EXH-BOUL-001', '370000000601', 'Baguette', 'cat-boulangerie', 'Pain & Boulangerie', 1000, 'Pièce', 'ExpressH24 Bakery', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-boul-02', 'EXH-BOUL-002', '370000000602', 'Duo de Baguettes', 'cat-boulangerie', 'Pain & Boulangerie', 1500, '2 Baguettes', 'ExpressH24 Bakery', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-boul-03', 'EXH-BOUL-003', '370000000603', 'Pain de Mie', 'cat-boulangerie', 'Pain & Boulangerie', 3500, 'Paquet 500g', 'Harrys', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-boul-04', 'EXH-BOUL-004', '370000000604', 'Mini Pains Burger', 'cat-boulangerie', 'Pain & Boulangerie', 2500, 'Sachet de 6', 'Harrys', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'),

  // 7. Charcuterie
  makeProd('p-char-01', 'EXH-CHAR-001', '370000000701', 'Jambon de Bœuf', 'cat-charcuterie', 'Charcuterie', 1000, 'Barquette 100g', 'Fleury Michon', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-char-02', 'EXH-CHAR-002', '370000000702', 'Jambon de Bœuf Fumé', 'cat-charcuterie', 'Charcuterie', 1000, 'Barquette 100g', 'Fleury Michon', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-char-03', 'EXH-CHAR-003', '370000000703', 'Saucisson Ail Bœuf (200 g)', 'cat-charcuterie', 'Charcuterie', 1000, 'Pièce 200g', 'Bordas', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-char-04', 'EXH-CHAR-004', '370000000704', 'Cervelas (200 g)', 'cat-charcuterie', 'Charcuterie', 1500, 'Pièce 200g', 'Bordas', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'),

  // 8. Laits & Petit-déjeuner
  makeProd('p-lpd-01', 'EXH-LPD-001', '370000000801', 'Lait Concentré', 'cat-laits-petit-dejeuner', 'Laits & Petit-déjeuner', 2500, 'Boîte 397g', 'Nestlé', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-lpd-02', 'EXH-LPD-002', '370000000802', 'Lait Concentré Gloria', 'cat-laits-petit-dejeuner', 'Laits & Petit-déjeuner', 1000, 'Boîte 160g', 'Gloria', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-lpd-03', 'EXH-LPD-003', '370000000803', 'Lait Laicran (200 g)', 'cat-laits-petit-dejeuner', 'Laits & Petit-déjeuner', 1500, 'Sachet 200g', 'Laicran', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-lpd-04', 'EXH-LPD-004', '370000000804', 'Lait Entier Laicran (400 g)', 'cat-laits-petit-dejeuner', 'Laits & Petit-déjeuner', 2500, 'Boîte 400g', 'Laicran', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-lpd-05', 'EXH-LPD-005', '370000000805', 'Lait Entier Candia', 'cat-laits-petit-dejeuner', 'Laits & Petit-déjeuner', 1500, 'Brique 1L', 'Candia', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-lpd-06', 'EXH-LPD-006', '370000000806', 'Lait Bridel', 'cat-laits-petit-dejeuner', 'Laits & Petit-déjeuner', 1500, 'Brique 1L', 'Bridel', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-lpd-07', 'EXH-LPD-007', '370000000807', 'Lait Entier Président', 'cat-laits-petit-dejeuner', 'Laits & Petit-déjeuner', 2500, 'Brique 1L', 'Président', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-lpd-08', 'EXH-LPD-008', '370000000808', 'Nutella (750 g)', 'cat-laits-petit-dejeuner', 'Laits & Petit-déjeuner', 6000, 'Pot 750g', 'Nutella', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-lpd-09', 'EXH-LPD-009', '370000000809', 'Nutella Mini (180 g)', 'cat-laits-petit-dejeuner', 'Laits & Petit-déjeuner', 2500, 'Pot 180g', 'Nutella', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-lpd-10', 'EXH-LPD-010', '370000000810', 'Lait Vanille Jet', 'cat-laits-petit-dejeuner', 'Laits & Petit-déjeuner', 500, 'Sachet 200ml', 'Jet', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'),

  // 9. Boissons
  makeProd('p-bois-01', 'EXH-BOIS-001', '370000000901', 'Coca-Cola 1,25 L', 'cat-boissons', 'Boissons', 2000, 'Bouteille 1.25L', 'Coca-Cola', 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-bois-02', 'EXH-BOIS-002', '370000000902', 'Sprite 1,25 L', 'cat-boissons', 'Boissons', 2000, 'Bouteille 1.25L', 'Sprite', 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-bois-03', 'EXH-BOIS-003', '370000000903', 'Kirène 1,5 L', 'cat-boissons', 'Boissons', 1000, 'Bouteille 1.5L', 'Kirène', 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-bois-04', 'EXH-BOIS-004', '370000000904', 'Jus', 'cat-boissons', 'Boissons', 2000, 'Brique 1L', 'Presséa', 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-bois-05', 'EXH-BOIS-005', '370000000905', 'Eau de Coco', 'cat-boissons', 'Boissons', 1500, 'Brique 33cl', 'Vita Coco', 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-bois-06', 'EXH-BOIS-006', '370000000906', 'Ensure', 'cat-boissons', 'Boissons', 2000, 'Canette 250ml', 'Ensure', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-bois-07', 'EXH-BOIS-007', '370000000907', 'Ensure Plus', 'cat-boissons', 'Boissons', 2500, 'Canette 250ml', 'Ensure', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-bois-08', 'EXH-BOIS-008', '370000000908', 'Red Bull', 'cat-boissons', 'Boissons', 2000, 'Canette 250ml', 'Red Bull', 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-bois-09', 'EXH-BOIS-009', '370000000909', 'Red Bull Pack', 'cat-boissons', 'Boissons', 12000, 'Pack de 6 Canettes', 'Red Bull', 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-bois-10', 'EXH-BOIS-010', '370000000910', 'Pack Coca-Cola (6)', 'cat-boissons', 'Boissons', 9000, 'Pack de 6 Bouteilles', 'Coca-Cola', 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-bois-11', 'EXH-BOIS-011', '370000000911', 'Pack Sprite (6)', 'cat-boissons', 'Boissons', 9000, 'Pack de 6 Bouteilles', 'Sprite', 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=80'),

  // 10. Fruits & Légumes
  makeProd('p-fl-01', 'EXH-FL-001', '370000001001', 'Bananes (3)', 'cat-fruits-legumes', 'Fruits & Légumes', 1000, 'Lot de 3', 'Marché Dakar', 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-fl-02', 'EXH-FL-002', '370000001002', 'Pommes (3)', 'cat-fruits-legumes', 'Fruits & Légumes', 1000, 'Lot de 3', 'Marché Dakar', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-fl-03', 'EXH-FL-003', '370000001003', 'Pommes Rouges (3)', 'cat-fruits-legumes', 'Fruits & Légumes', 1500, 'Lot de 3', 'Marché Dakar', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-fl-04', 'EXH-FL-004', '370000001004', 'Poires (3)', 'cat-fruits-legumes', 'Fruits & Légumes', 1500, 'Lot de 3', 'Marché Dakar', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-fl-05', 'EXH-FL-005', '370000001005', 'Oranges (3)', 'cat-fruits-legumes', 'Fruits & Légumes', 1500, 'Lot de 3', 'Marché Dakar', 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-fl-06', 'EXH-FL-006', '370000001006', 'Kiwis (3)', 'cat-fruits-legumes', 'Fruits & Légumes', 1500, 'Lot de 3', 'Marché Dakar', 'https://images.unsplash.com/photo-1585059819970-3136863954b1?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-fl-07', 'EXH-FL-007', '370000001007', 'Tomates (3)', 'cat-fruits-legumes', 'Fruits & Légumes', 1000, 'Lot de 3', 'Marché Dakar', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-fl-08', 'EXH-FL-008', '370000001008', 'Carottes (3)', 'cat-fruits-legumes', 'Fruits & Légumes', 1500, 'Lot de 3', 'Marché Dakar', 'https://images.unsplash.com/photo-1598170845058-12ef4a457939?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-fl-09', 'EXH-FL-009', '370000001009', 'Pommes de Terre (5)', 'cat-fruits-legumes', 'Fruits & Légumes', 1000, 'Lot de 5', 'Marché Dakar', 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-fl-10', 'EXH-FL-010', '370000001010', 'Oignons Rouges (3)', 'cat-fruits-legumes', 'Fruits & Légumes', 500, 'Lot de 3', 'Marché Dakar', 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-fl-11', 'EXH-FL-011', '370000001011', 'Oignons Verts (5)', 'cat-fruits-legumes', 'Fruits & Légumes', 500, 'Botte de 5', 'Marché Dakar', 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?auto=format&fit=crop&w=600&q=80'),

  // 11. Bébé
  makeProd('p-bebe-01', 'EXH-BEBE-001', '370000001101', 'Couches Tima', 'cat-bebe', 'Bébé', 1500, 'Paquet 12 couches', 'Tima', 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-bebe-02', 'EXH-BEBE-002', '370000001102', 'Couches Molfix', 'cat-bebe', 'Bébé', 2000, 'Paquet 14 couches', 'Molfix', 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80'),
  // Couches Huggies has "Prix à préciser" -> price: null, status: ADMIN_VALIDATION_REQUIRED
  makeProd('p-bebe-03', 'EXH-BEBE-003', '370000001103', 'Couches Huggies', 'cat-bebe', 'Bébé', null, 'Paquet variables', 'Huggies', 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80', 'Prix à préciser. Produit en attente de validation tarifaire par l’administrateur.'),
  makeProd('p-bebe-04', 'EXH-BEBE-004', '370000001104', 'Cérélac (400 g)', 'cat-bebe', 'Bébé', 3500, 'Boîte 400g', 'Nestlé', 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-bebe-05', 'EXH-BEBE-005', '370000001105', 'Lait de Croissance Nido', 'cat-bebe', 'Bébé', 3000, 'Boîte 400g', 'Nido', 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-bebe-06', 'EXH-BEBE-006', '370000001106', 'Lait Infantile NAN Optipro (1–3 ans)', 'cat-bebe', 'Bébé', 4000, 'Boîte 400g', 'NAN Optipro', 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-bebe-07', 'EXH-BEBE-007', '370000001107', 'Blédi Junior (3–7 ans)', 'cat-bebe', 'Bébé', 4000, 'Boîte 400g', 'Blédina', 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-bebe-08', 'EXH-BEBE-008', '370000001108', 'Compotes (4)', 'cat-bebe', 'Bébé', 2000, 'Pack de 4 gourdes', 'Pom’Potes', 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80'),

  // 12. Hygiène & Entretien
  makeProd('p-he-01', 'EXH-HE-001', '370000001201', 'Papier Toilette (2 rouleaux)', 'cat-hygiene-entretien', 'Hygiène & Entretien', 1000, 'Pack de 2', 'Lotus', 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-he-02', 'EXH-HE-002', '370000001202', 'Papier Toilette (4 rouleaux)', 'cat-hygiene-entretien', 'Hygiène & Entretien', 2000, 'Pack de 4', 'Lotus', 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-he-03', 'EXH-HE-003', '370000001203', 'Boîte de Mouchoirs', 'cat-hygiene-entretien', 'Hygiène & Entretien', 1000, 'Boîte 100 mouchoirs', 'Kleenex', 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-he-04', 'EXH-HE-004', '370000001204', 'Madar Renzo', 'cat-hygiene-entretien', 'Hygiène & Entretien', 500, 'Flacon 250ml', 'Madar', 'https://images.unsplash.com/photo-1585832770485-e68a5fcfad52?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-he-05', 'EXH-HE-005', '370000001205', 'Madar Liquide Vaisselle', 'cat-hygiene-entretien', 'Hygiène & Entretien', 1000, 'Flacon 750ml', 'Madar', 'https://images.unsplash.com/photo-1585832770485-e68a5fcfad52?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-he-06', 'EXH-HE-006', '370000001206', 'Madar Platinum', 'cat-hygiene-entretien', 'Hygiène & Entretien', 1500, 'Flacon 1L', 'Madar', 'https://images.unsplash.com/photo-1585832770485-e68a5fcfad52?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-he-07', 'EXH-HE-007', '370000001207', 'Eau de Javel La Croix (1,5 L)', 'cat-hygiene-entretien', 'Hygiène & Entretien', 2000, 'Bouteille 1.5L', 'La Croix', 'https://images.unsplash.com/photo-1585832770485-e68a5fcfad52?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-he-08', 'EXH-HE-008', '370000001208', 'Eau de Javel La Croix (5 L)', 'cat-hygiene-entretien', 'Hygiène & Entretien', 4500, 'Bidon 5L', 'La Croix', 'https://images.unsplash.com/photo-1585832770485-e68a5fcfad52?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-he-09', 'EXH-HE-009', '370000001209', 'Poudre Jax', 'cat-hygiene-entretien', 'Hygiène & Entretien', 2000, 'Sachet 1kg', 'Jax', 'https://images.unsplash.com/photo-1585832770485-e68a5fcfad52?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-he-10', 'EXH-HE-010', '370000001210', 'Nettoyant Vitres', 'cat-hygiene-entretien', 'Hygiène & Entretien', 1500, 'Spray 500ml', 'Ajax', 'https://images.unsplash.com/photo-1585832770485-e68a5fcfad52?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-he-11', 'EXH-HE-011', '370000001211', 'Sacs Poubelles (30 L / 50 L)', 'cat-hygiene-entretien', 'Hygiène & Entretien', 1500, 'Rouleau de 10', 'Handy Bag', 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-he-12', 'EXH-HE-012', '370000001212', 'Sacs Poubelles (100 L)', 'cat-hygiene-entretien', 'Hygiène & Entretien', 2000, 'Rouleau de 10', 'Handy Bag', 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-he-13', 'EXH-HE-013', '370000001213', 'Raid Fourmis / Mouches / Moustiques', 'cat-hygiene-entretien', 'Hygiène & Entretien', 3000, 'Aérosol 400ml', 'Raid', 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&w=600&q=80'),

  // 13. Maison & Divers
  makeProd('p-md-01', 'EXH-MD-001', '370000001301', 'Bloc Multiprise', 'cat-maison-divers', 'Maison & Divers', 2500, 'Bloc 4 prises', 'Legrand', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-md-02', 'EXH-MD-002', '370000001302', 'Assiettes Jetables (10)', 'cat-maison-divers', 'Maison & Divers', 2000, 'Pack de 10', 'PartyPack', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-md-03', 'EXH-MD-003', '370000001303', 'Papier Aluminium', 'cat-maison-divers', 'Maison & Divers', 2000, 'Rouleau 30m', 'Albal', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-md-04', 'EXH-MD-004', '370000001304', 'Film Fraîcheur', 'cat-maison-divers', 'Maison & Divers', 1500, 'Rouleau 20m', 'Albal', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-md-05', 'EXH-MD-005', '370000001305', 'Ruban Adhésif Transparent', 'cat-maison-divers', 'Maison & Divers', 2500, 'Rouleau grand format', 'Scotch', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-md-06', 'EXH-MD-006', '370000001306', 'Piles', 'cat-maison-divers', 'Maison & Divers', 2000, 'Pack de 4 AA/AAA', 'Duracell', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80'),

  // 14. Hygiène Personnelle
  makeProd('p-hp-01', 'EXH-HP-001', '370000001401', 'Serviettes Hygiéniques Maxi Normal / Super', 'cat-hygiene-personnelle', 'Hygiène Personnelle', 1500, 'Paquet de 10', 'Always', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-hp-02', 'EXH-HP-002', '370000001402', 'Serviettes Vania Maxi', 'cat-hygiene-personnelle', 'Hygiène Personnelle', 2500, 'Paquet de 16', 'Vania', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-hp-03', 'EXH-HP-003', '370000001403', 'Brosse à Dents', 'cat-hygiene-personnelle', 'Hygiène Personnelle', 1000, 'Unité', 'Colgate', 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-hp-04', 'EXH-HP-004', '370000001404', 'Dentifrice Colgate', 'cat-hygiene-personnelle', 'Hygiène Personnelle', 1500, 'Tube 75ml', 'Colgate', 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-hp-05', 'EXH-HP-005', '370000001405', 'Dentifrice Sensodyne', 'cat-hygiene-personnelle', 'Hygiène Personnelle', 2500, 'Tube 75ml', 'Sensodyne', 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-hp-06', 'EXH-HP-006', '370000001406', 'Listerine Fraîcheur', 'cat-hygiene-personnelle', 'Hygiène Personnelle', 4500, 'Flacon 500ml', 'Listerine', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-hp-07', 'EXH-HP-007', '370000001407', 'Listerine Total Care', 'cat-hygiene-personnelle', 'Hygiène Personnelle', 2500, 'Flacon 250ml', 'Listerine', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-hp-08', 'EXH-HP-008', '370000001408', 'Rasoirs Bic', 'cat-hygiene-personnelle', 'Hygiène Personnelle', 3500, 'Paquet de 5', 'Bic', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-hp-09', 'EXH-HP-009', '370000001409', 'Bâtonnets 100 % Coton', 'cat-hygiene-personnelle', 'Hygiène Personnelle', 1500, 'Boîte 200 bâtonnets', 'DemakUp', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80'),

  // 15. Alcohol
  makeProd('p-alc-01', 'EXH-ALC-001', '370000001501', 'Gin Bombay Sapphire', 'cat-alcool', 'Alcohol', 20000, 'Bouteille 70cl', 'Bombay Sapphire', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-alc-02', 'EXH-ALC-002', '370000001502', 'Whiskey Chivas Regal', 'cat-alcool', 'Alcohol', 30000, 'Bouteille 70cl 12 ans', 'Chivas Regal', 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-alc-03', 'EXH-ALC-003', '370000001503', 'Johnnie Walker Black Label', 'cat-alcool', 'Alcohol', 28000, 'Bouteille 70cl', 'Johnnie Walker', 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-alc-04', 'EXH-ALC-004', '370000001504', 'Jack Daniel’s Old no.7', 'cat-alcool', 'Alcohol', 25000, 'Bouteille 70cl', 'Jack Daniel’s', 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-alc-05', 'EXH-ALC-005', '370000001505', 'Whiskey j&b', 'cat-alcool', 'Alcohol', 14000, 'Bouteille 70cl', 'J&B', 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-alc-06', 'EXH-ALC-006', '370000001506', 'Malibu', 'cat-alcool', 'Alcohol', 18000, 'Bouteille 70cl', 'Malibu', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-alc-07', 'EXH-ALC-007', '370000001507', 'Champagne Pierre Grandet', 'cat-alcool', 'Alcohol', 26000, 'Bouteille 75cl', 'Pierre Grandet', 'https://images.unsplash.com/photo-1569919659476-f0852f6834b7?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-alc-08', 'EXH-ALC-008', '370000001508', 'JP Chenet Ice', 'cat-alcool', 'Alcohol', 6000, 'Bouteille 75cl', 'JP Chenet', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-alc-09', 'EXH-ALC-009', '370000001509', 'Vin Mousseux Blanc de Blancs', 'cat-alcool', 'Alcohol', 6000, 'Bouteille 75cl', 'Mousseux', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-alc-10', 'EXH-ALC-010', '370000001510', 'Pack de Heineken', 'cat-alcool', 'Alcohol', 25000, 'Pack de 24 Canettes 33cl', 'Heineken', 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=80'),

  // 16. Fumeurs
  makeProd('p-fum-01', 'EXH-FUM-001', '370000001601', 'Marlboro light', 'cat-fumeurs', 'Fumeurs', 2500, 'Paquet 20 cigarettes', 'Marlboro', 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-fum-02', 'EXH-FUM-002', '370000001602', 'OCB Slim Virgin', 'cat-fumeurs', 'Fumeurs', 1500, 'Carnet 32 feuilles', 'OCB', 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-fum-03', 'EXH-FUM-003', '370000001603', 'OCB Premium', 'cat-fumeurs', 'Fumeurs', 1500, 'Carnet 32 feuilles', 'OCB', 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-fum-04', 'EXH-FUM-004', '370000001604', 'OCB X-Pert Slim Fit', 'cat-fumeurs', 'Fumeurs', 2000, 'Carnet 32 feuilles ultra fines', 'OCB', 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-fum-05', 'EXH-FUM-005', '370000001605', 'Briquet Bic EZ Reach', 'cat-fumeurs', 'Fumeurs', 1000, 'Unité', 'Bic', 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-fum-06', 'EXH-FUM-006', '370000001606', 'RAW Ultra Fin King Size', 'cat-fumeurs', 'Fumeurs', 2000, 'Carnet 32 feuilles', 'RAW', 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-fum-07', 'EXH-FUM-007', '370000001607', 'Slim Virgin Xtra Long (+ filtres)', 'cat-fumeurs', 'Fumeurs', 2500, 'Pack Feuilles + Filtres', 'OCB', 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80'),

  // 17. Santé & Pharmacie
  makeProd('p-sante-01', 'EXH-SANT-001', '370000001701', 'Doliprane', 'cat-sante-pharmacie', 'Santé & Pharmacie', 1000, 'Boîte 10 comprimés 1000mg', 'Sanofi', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-sante-02', 'EXH-SANT-002', '370000001702', 'Aspirine (au choix)', 'cat-sante-pharmacie', 'Santé & Pharmacie', 2000, 'Boîte 20 comprimés', 'Bayer', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-sante-03', 'EXH-SANT-003', '370000001703', 'Tylenol', 'cat-sante-pharmacie', 'Santé & Pharmacie', 23000, 'Flacon 100 gélules', 'McNeil', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-sante-04', 'EXH-SANT-004', '370000001704', 'Thermomètre électronique', 'cat-sante-pharmacie', 'Santé & Pharmacie', 2000, 'Unité digitale', 'Omron', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-sante-05', 'EXH-SANT-005', '370000001705', 'Sparadrap', 'cat-sante-pharmacie', 'Santé & Pharmacie', 11000, 'Rouleau médical 5m', 'Urgo', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-sante-06', 'EXH-SANT-006', '370000001706', 'Pompe pour asthme', 'cat-sante-pharmacie', 'Santé & Pharmacie', 15000, 'Inhalateur 200 doles', 'Ventoline', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-sante-07', 'EXH-SANT-007', '370000001707', 'Protect', 'cat-sante-pharmacie', 'Santé & Pharmacie', 2000, 'Boîte 3 préservatifs', 'Protect', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-sante-08', 'EXH-SANT-008', '370000001708', 'Durex', 'cat-sante-pharmacie', 'Santé & Pharmacie', 6000, 'Boîte 12 préservatifs', 'Durex', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-sante-09', 'EXH-SANT-009', '370000001709', 'Manix Gel (80 ml)', 'cat-sante-pharmacie', 'Santé & Pharmacie', 6500, 'Flacon 80ml', 'Manix', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-sante-10', 'EXH-SANT-010', '370000001710', 'Manix Skyn', 'cat-sante-pharmacie', 'Santé & Pharmacie', 2000, 'Boîte 3 préservatifs', 'Manix', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
  makeProd('p-sante-11', 'EXH-SANT-011', '370000001711', 'Vaseline', 'cat-sante-pharmacie', 'Santé & Pharmacie', 14500, 'Pôt 250g', 'Vaseline', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80')
];
