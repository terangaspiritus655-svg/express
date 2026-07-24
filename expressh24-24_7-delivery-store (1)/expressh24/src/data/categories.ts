import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-confiseries',
    name: 'Confiseries & Chocolats',
    iconName: 'Candy',
    description: 'Chocolats, barres de chocolat, bonbons et friandises express',
    image: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=600&q=80',
    itemCount: 13
  },
  {
    id: 'cat-biscuits',
    name: 'Biscuits & Goûters',
    iconName: 'Cookie',
    description: 'Palmitos, galettes, palets bretons, Oreos et Petits Écoliers',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80',
    itemCount: 6
  },
  {
    id: 'cat-chips-snacks',
    name: 'Chips & Snacks Salés',
    iconName: 'Popcorn',
    description: 'Cheetos, Lay\'s, Pringles, Doritos et bonbons Haribo',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=600&q=80',
    itemCount: 9
  },
  {
    id: 'cat-epicerie',
    name: 'Épicerie',
    iconName: 'ShoppingBag',
    description: 'Nouilles, pâtes, farine, sucres, thés et céréales',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80',
    itemCount: 9
  },
  {
    id: 'cat-produits-laitiers',
    name: 'Produits Laitiers',
    iconName: 'Milk',
    description: 'Fromages, beurres, crèmes et yaourts Dolima',
    image: 'https://images.unsplash.com/photo-1528751014936-863e6e7a319c?auto=format&fit=crop&w=600&q=80',
    itemCount: 12
  },
  {
    id: 'cat-boulangerie',
    name: 'Pain & Boulangerie',
    iconName: 'Croissant',
    description: 'Baguettes fraîches, pain de mie et mini pains burger',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    itemCount: 4
  },
  {
    id: 'cat-charcuterie',
    name: 'Charcuterie',
    iconName: 'Beef',
    description: 'Jambons de bœuf, saucissons à l\'ail et cervelas',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    itemCount: 4
  },
  {
    id: 'cat-laits-petit-dejeuner',
    name: 'Laits & Petit-déjeuner',
    iconName: 'Coffee',
    description: 'Laits Gloria, Laicran, Candia, Bridel, Président et Nutella',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    itemCount: 10
  },
  {
    id: 'cat-boissons',
    name: 'Boissons',
    iconName: 'CupSoda',
    description: 'Coca-Cola, Sprite, Eau Kirène, Red Bull et Jus frais',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    itemCount: 11
  },
  {
    id: 'cat-fruits-legumes',
    name: 'Fruits & Légumes',
    iconName: 'Apple',
    description: 'Fruits frais et légumes du marché livrés en 20 minutes',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
    itemCount: 11
  },
  {
    id: 'cat-bebe',
    name: 'Bébé',
    iconName: 'Baby',
    description: 'Couches Tima, Molfix, Huggies, Cérélac, Nido et NAN',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
    itemCount: 8
  },
  {
    id: 'cat-hygiene-entretien',
    name: 'Hygiène & Entretien',
    iconName: 'Sparkles',
    description: 'Produits Madar, Eau de Javel La Croix, papier toilette et Raid',
    image: 'https://images.unsplash.com/photo-1585832770485-e68a5fcfad52?auto=format&fit=crop&w=600&q=80',
    itemCount: 13
  },
  {
    id: 'cat-maison-divers',
    name: 'Maison & Divers',
    iconName: 'Home',
    description: 'Multiprises, assiettes jetables, alu, film étirable et piles',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80',
    itemCount: 6
  },
  {
    id: 'cat-hygiene-personnelle',
    name: 'Hygiène Personnelle',
    iconName: 'HeartPulse',
    description: 'Serviettes hygiéniques, Colgate, Sensodyne, Listerine et Bic',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    itemCount: 9
  },
  {
    id: 'cat-alcool',
    name: 'Alcohol',
    iconName: 'Wine',
    description: 'Whiskies, Gin Bombay, Champagne, Vins et Packs Heineken (21+)',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
    itemCount: 10
  },
  {
    id: 'cat-fumeurs',
    name: 'Fumeurs',
    iconName: 'Flame',
    description: 'Marlboro Light, feuilles OCB Virgin & Premium, RAW et Briquets Bic',
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80',
    itemCount: 7
  },
  {
    id: 'cat-sante-pharmacie',
    name: 'Santé & Pharmacie',
    iconName: 'Cross',
    description: 'Doliprane, Aspirine, Tylenol, Thermomètres, Durex, Manix et Vaseline',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    itemCount: 11
  }
];
