import React from 'react';
import { Category } from '../types';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';

interface CategoriesPageProps {
  categories: Category[];
  setSelectedCategory: (catId: number | null) => void;
  setCurrentTab: (tab: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  categories,
  setSelectedCategory,
  setCurrentTab
}) => {
  const handleSelect = (catId: number) => {
    setSelectedCategory(catId);
    setCurrentTab('shop');
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="border-b border-zinc-800 pb-6 text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-[#C6FF00]/40 text-xs font-bold text-[#C6FF00]">
            <Layers className="w-4 h-4" />
            <span>CATALOGUE OFFICIEL EXPRESSH24</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black italic tracking-tight text-white">
            Nos 13 Rayons de Livraison
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400">
            Sélectionnez un rayon ci-dessous pour découvrir la liste intégrale des produits et leurs prix fixes en FCFA.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className="group relative bg-zinc-900/80 border border-zinc-800 hover:border-[#C6FF00] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-[0_0_25px_rgba(198,255,0,0.2)] flex flex-col justify-between"
            >
              {/* Category Header Image */}
              <div className="relative h-44 overflow-hidden bg-black">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

                {/* Badge Number */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-[#C6FF00] border border-[#C6FF00]/40 font-black text-xs px-2.5 py-1 rounded-lg">
                  Rayon #{cat.id}
                </div>

                {cat.badge && (
                  <div className="absolute top-3 right-3 bg-[#C6FF00] text-black font-black text-[10px] px-2.5 py-1 rounded-full uppercase">
                    {cat.badge}
                  </div>
                )}
              </div>

              {/* Category Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-lg font-black text-white group-hover:text-[#C6FF00] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C6FF00]">
                    Livraison 15-20 min
                  </span>

                  <span className="text-xs font-bold text-white group-hover:text-[#C6FF00] flex items-center gap-1 transition-colors">
                    <span>Parcourir</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
