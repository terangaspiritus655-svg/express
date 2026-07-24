import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const BoutiquePage: React.FC = () => {
  const { products, categories, activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useShop();

  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'name'>('popular');
  const [maxPrice, setMaxPrice] = useState<number>(15000);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (activeCategory && p.categoryId !== activeCategory) {
        return false;
      }
      // Search filter
      if (
        searchQuery &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Price filter
      if (p.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });
  }, [products, activeCategory, searchQuery, maxPrice, sortBy]);

  return (
    <div className="py-10 bg-black text-white min-h-screen border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Page Header */}
        <div>
          <span className="text-xs font-mono font-bold uppercase text-[#C6FF00] bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
            BOUTIQUE EXPRESS
          </span>
          <h1 className="text-3xl font-black font-mono mt-3">Catalogue des produits à Dakar</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Parcourez {products.length} articles disponibles en livraison immédiate 24H/24
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrer par nom..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-8 py-2 text-xs text-white"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Price Slider Filter */}
            <div className="flex items-center gap-3 w-full md:w-auto text-xs">
              <span className="text-zinc-400 font-semibold whitespace-nowrap">Prix max :</span>
              <input
                type="range"
                min={500}
                max={20000}
                step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-32 accent-[#C6FF00]"
              />
              <span className="font-mono font-bold text-[#C6FF00] whitespace-nowrap">
                {maxPrice.toLocaleString('fr-FR')} FCFA
              </span>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-zinc-900 border border-zinc-800 text-white rounded-xl px-3 py-2 text-xs focus:outline-none"
              >
                <option value="popular">Trier : Plus Populaires</option>
                <option value="price-asc">Trier : Prix croissant</option>
                <option value="price-desc">Trier : Prix décroissant</option>
                <option value="name">Trier : Ordre alphabétique</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills (13 exact categories) */}
          <div className="flex overflow-x-auto gap-2 pt-2 border-t border-zinc-900 scrollbar-none">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                activeCategory === null
                  ? 'bg-[#C6FF00] text-black font-extrabold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Tous les rayons ({products.length})
            </button>

            {categories.map((cat) => {
              const count = products.filter((p) => p.categoryId === cat.id).length;
              const isCatActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(isCatActive ? null : cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                    isCatActive
                      ? 'bg-[#C6FF00] text-black font-extrabold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filters Clear Bar */}
        {(activeCategory || searchQuery || maxPrice < 20000) && (
          <div className="flex items-center justify-between bg-zinc-900 px-4 py-2 rounded-xl text-xs text-zinc-400 border border-zinc-800">
            <span>
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </span>
            <button
              onClick={() => {
                setActiveCategory(null);
                setSearchQuery('');
                setMaxPrice(20000);
              }}
              className="text-[#C6FF00] hover:underline font-bold"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-3">
            <p className="text-sm text-zinc-400">Aucun produit ne correspond à votre recherche.</p>
            <button
              onClick={() => {
                setActiveCategory(null);
                setSearchQuery('');
                setMaxPrice(20000);
              }}
              className="bg-[#C6FF00] text-black text-xs font-bold px-4 py-2 rounded-xl"
            >
              Voir tout le catalogue
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
