import React from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const CategoryDetailPage: React.FC = () => {
  const { selectedCategoryDetailId, categories, products, setCurrentView } = useShop();

  const currentCat = categories.find((c) => c.id === selectedCategoryDetailId) || categories[0];
  const catProducts = products.filter((p) => p.categoryId === currentCat.id);

  return (
    <div className="py-10 bg-black text-white min-h-screen border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <button onClick={() => setCurrentView('home')} className="hover:text-white">Accueil</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => setCurrentView('categories')} className="hover:text-white">Catégories</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#C6FF00] font-bold">{currentCat.name}</span>
        </div>

        {/* Category Header Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 p-8 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10" />
          <img
            src={currentCat.image}
            alt={currentCat.name}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />

          <div className="relative z-20 max-w-xl space-y-3">
            <span className="text-xs font-mono font-bold text-[#C6FF00] uppercase bg-black px-3 py-1 rounded-full border border-zinc-800">
              RAYON EXPRESS DAKAR
            </span>
            <h1 className="text-3xl sm:text-4xl font-black font-mono text-white">
              {currentCat.name}
            </h1>
            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              {currentCat.description}. Tous ces produits sont stockés dans nos dépôts dakarois et prêts pour l'envoi immédiat.
            </p>
            <p className="text-xs text-[#C6FF00] font-mono font-bold">
              {catProducts.length} références disponibles • Livraison 15 - 20 minutes
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <h2 className="text-base font-bold font-mono text-white">Articles en rayon</h2>
            <button
              onClick={() => setCurrentView('categories')}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Changer de rayon
            </button>
          </div>

          {catProducts.length === 0 ? (
            <div className="text-center py-16 bg-zinc-950 rounded-2xl border border-zinc-800">
              <p className="text-sm text-zinc-400">Aucun produit dans ce rayon actuellement.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {catProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
