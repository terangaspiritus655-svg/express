import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CategoriesPage: React.FC = () => {
  const { categories, setCurrentView, products } = useShop();

  return (
    <div className="py-12 bg-black text-white min-h-screen border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Header */}
        <div>
          <span className="text-xs font-mono font-bold uppercase text-[#C6FF00] bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
            EXPLORER LES CATEGORIES (13)
          </span>
          <h1 className="text-3xl font-black font-mono mt-3">Toutes nos catégories de produits</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Chaque catégorie contient les articles authentiques des affiches ExpressH24
          </p>
        </div>

        {/* Categories List Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const count = products.filter((p) => p.categoryId === cat.id).length;

            return (
              <div
                key={cat.id}
                onClick={() => setCurrentView('category-detail', cat.id)}
                className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-[#C6FF00] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-video bg-zinc-950 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-black/80 text-[#C6FF00] font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-zinc-800">
                    Rayon #{idx + 1}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#C6FF00] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-mono">{count} articles disponibles</span>
                    <span className="text-[#C6FF00] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Voir rayon <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
