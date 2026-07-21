import React, { useState, useMemo } from 'react';
import { Category, Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Search, Filter, SlidersHorizontal, ShieldAlert, Sparkles, X } from 'lucide-react';

interface ShopProps {
  categories: Category[];
  products: Product[];
  selectedCategory: number | null;
  setSelectedCategory: (catId: number | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenDetail: (product: Product) => void;
  onRequireAgeCheck: (product: Product) => void;
}

export const Shop: React.FC<ShopProps> = ({
  categories,
  products,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onAddToCart,
  onOpenDetail,
  onRequireAgeCheck
}) => {
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== null && p.categoryId !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchCat = p.categoryName.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        if (!matchName && !matchCat && !matchDesc) return false;
      }
      // Price filter
      if (p.price > maxPrice) return false;
      // Stock filter
      if (inStockOnly && !p.isAvailable) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, maxPrice, inStockOnly, sortBy]);

  return (
    <div className="min-h-screen bg-black text-white pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Title Header */}
        <div className="border-b border-zinc-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#C6FF00] uppercase tracking-wider block">
              Catalogue Officiel ExpressH24
            </span>
            <h1 className="text-3xl font-black text-white italic">
              Boutique & Rayons
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Tous les produits conformes aux prix officiels des affiches ExpressH24.
            </p>
          </div>

          {/* Quick Active Filter Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {selectedCategory !== null && (
              <span className="bg-[#C6FF00] text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <span>Rayon : {categories.find((c) => c.id === selectedCategory)?.name}</span>
                <button onClick={() => setSelectedCategory(null)}><X className="w-3.5 h-3.5" /></button>
              </span>
            )}

            {searchQuery && (
              <span className="bg-zinc-800 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-zinc-700">
                <span>Recherche : "{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')}><X className="w-3.5 h-3.5" /></button>
              </span>
            )}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-4">
          
          {/* Top Row: Search Input & Category Pills */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un produit (Eau, Javel, Pampers...)"
                className="w-full bg-black border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#C6FF00]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-zinc-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <span className="text-xs font-bold text-zinc-400 whitespace-nowrap">Trier par :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-black border border-zinc-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-[#C6FF00]"
              >
                <option value="featured">En vedette</option>
                <option value="price-asc">Prix : Croissant</option>
                <option value="price-desc">Prix : Décroissant</option>
                <option value="name">Nom (A-Z)</option>
              </select>
            </div>

          </div>

          {/* Horizontal Category Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === null
                  ? 'bg-[#C6FF00] text-black shadow-[0_0_10px_rgba(198,255,0,0.3)]'
                  : 'bg-black text-zinc-300 hover:text-white border border-zinc-800'
              }`}
            >
              Tous les produits ({products.length})
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#C6FF00] text-black shadow-[0_0_10px_rgba(198,255,0,0.3)]'
                    : 'bg-black text-zinc-300 hover:text-white border border-zinc-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Bottom Row: Secondary Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-zinc-800/80 text-xs">
            
            {/* Price Filter Slider */}
            <div className="flex items-center gap-3">
              <span className="text-zinc-400 font-bold">Prix Max :</span>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="accent-[#C6FF00] w-32 cursor-pointer"
              />
              <span className="text-[#C6FF00] font-black">{maxPrice.toLocaleString('fr-FR')} FCFA</span>
            </div>

            {/* In-Stock Filter */}
            <label className="flex items-center gap-2 cursor-pointer text-zinc-300 hover:text-white">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-[#C6FF00] rounded"
              />
              <span>En stock uniquement</span>
            </label>

            {/* Result Counter */}
            <span className="text-zinc-500 font-medium ml-auto">
              {filteredProducts.length} produit(s) trouvé(s)
            </span>
          </div>

        </div>

        {/* Product Grid Results */}
        {filteredProducts.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center my-8">
            <Search className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">Aucun produit trouvé</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-6">
              Essayez de modifier votre mot-clé de recherche ou réinitialisez les filtres de catégorie.
            </p>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery('');
                setMaxPrice(10000);
                setInStockOnly(false);
              }}
              className="py-2.5 px-6 rounded-xl bg-[#C6FF00] text-black font-extrabold text-xs"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onAddToCart={onAddToCart}
                onOpenDetail={onOpenDetail}
                onRequireAgeCheck={onRequireAgeCheck}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
