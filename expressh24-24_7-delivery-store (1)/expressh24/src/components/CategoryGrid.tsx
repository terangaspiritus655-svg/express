import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CategoryGrid: React.FC = () => {
  const { categories, setCurrentView } = useShop();

  return (
    <section className="py-16 bg-black text-white border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C6FF00] bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
              NOS CATEGORIES (13)
            </span>
            <h2 className="text-3xl font-black mt-3 font-mono">
              Parcourez nos rayons essentiels
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Sélectionnez une catégorie pour voir tous les produits disponibles en livraison immédiate
            </p>
          </div>

          <button
            onClick={() => setCurrentView('categories')}
            className="self-start md:self-auto text-xs font-bold text-[#C6FF00] hover:underline flex items-center gap-1"
          >
            Voir toutes les catégories ({categories.length})
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => setCurrentView('category-detail', cat.id)}
              className="group text-left bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-4 hover:border-[#C6FF00] transition-all hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between h-44"
            >
              {/* Image Background overlay */}
              <div className="absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold bg-[#C6FF00] text-black px-2 py-0.5 rounded-full">
                  #{idx + 1}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  {cat.itemCount} prods
                </span>
              </div>

              <div className="relative z-10 mt-auto">
                <h3 className="text-sm font-bold text-white group-hover:text-[#C6FF00] transition-colors leading-snug">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5 font-light">
                  {cat.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
