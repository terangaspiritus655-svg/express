import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, MessageSquare, ShieldAlert, Eye, Plus, Check } from 'lucide-react';
import { createProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenDetail: (product: Product) => void;
  onRequireAgeCheck?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onOpenDetail,
  onRequireAgeCheck
}) => {
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.requiresAgeVerification && onRequireAgeCheck) {
      onRequireAgeCheck(product);
      return;
    }
    onAddToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.requiresAgeVerification && onRequireAgeCheck) {
      onRequireAgeCheck(product);
      return;
    }
    const url = createProductWhatsAppUrl(product.name, 1, product.price);
    window.open(url, '_blank');
  };

  return (
    <div 
      onClick={() => onOpenDetail(product)}
      className="group relative bg-zinc-900/80 border border-zinc-800 hover:border-[#C6FF00]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(198,255,0,0.15)] flex flex-col justify-between cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-black/50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Overlay Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="bg-[#C6FF00] text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              {product.badge}
            </span>
          )}
          {product.requiresAgeVerification && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <ShieldAlert className="w-3 h-3" />
              18+
            </span>
          )}
        </div>

        {/* Category Pill */}
        <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-md text-zinc-300 text-[10px] font-medium px-2 py-1 rounded-md border border-zinc-800">
          {product.categoryName}
        </div>

        {/* Quick View Eye Icon */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white p-2 rounded-full border border-zinc-700 hover:text-[#C6FF00]">
          <Eye className="w-4 h-4" />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-white group-hover:text-[#C6FF00] transition-colors line-clamp-1">
            {product.name}
          </h3>
          {product.unit && (
            <p className="text-[11px] text-zinc-400 mt-0.5">{product.unit}</p>
          )}
        </div>

        {/* Price & Action Row */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xs text-zinc-500 block -mb-1">Prix Express</span>
              <span className="text-base font-black text-[#C6FF00] tracking-tight">
                {product.price.toLocaleString('fr-FR')} <span className="text-xs font-bold text-white">FCFA</span>
              </span>
            </div>

            <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${product.isAvailable ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/40' : 'text-rose-400 bg-rose-950/60'}`}>
              {product.isAvailable ? 'En stock' : 'Rupture'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAdd}
              disabled={!product.isAvailable}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                added 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-zinc-800 hover:bg-[#C6FF00] text-white hover:text-black border border-zinc-700 hover:border-[#C6FF00]'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Ajouté !</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Panier</span>
                </>
              )}
            </button>

            <button
              onClick={handleWhatsApp}
              disabled={!product.isAvailable}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/40 transition-all"
              title="Commander direct via WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
