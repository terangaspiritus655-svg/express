import React from 'react';
import { ShoppingBag, MessageCircle, Heart, Eye, CheckCircle2, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    favorites,
    toggleFavorite,
    setSelectedProductDetail,
    selectedNeighborhood
  } = useShop();

  const isFav = favorites.includes(product.id);

  const getSingleWhatsAppUrl = () => {
    const phoneTarget = '221776481420';
    const priceText = product.price !== null ? `${product.price.toLocaleString('fr-FR')} FCFA` : 'Prix sur demande (à préciser)';
    const message = `Bonjour ExpressH24 🚀,\nJe souhaite me renseigner/commander immédiatement :\n\n- Produit : ${product.name}\n- SKU : ${product.sku || 'Non spécifié'}\n- Prix : ${priceText}\n- Quartier : ${selectedNeighborhood}\n\nMerci de me répondre rapidement !`;
    return `https://wa.me/${phoneTarget}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-[#C6FF00]/60 transition-all hover:shadow-[0_0_20px_rgba(198,255,0,0.1)] flex flex-col justify-between">
      {/* Top Image Box */}
      <div className="relative aspect-square bg-zinc-950 overflow-hidden cursor-pointer" onClick={() => setSelectedProductDetail(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="bg-[#C6FF00] text-black text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              {product.badge}
            </span>
          )}
          {product.oldPrice && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              -
              {Math.round(
                ((product.oldPrice - product.price) / product.oldPrice) * 100
              )}
              %
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-colors z-10 ${
            isFav
              ? 'bg-red-500 text-white'
              : 'bg-black/60 text-zinc-300 hover:text-white hover:bg-black/80'
          }`}
          title="Ajouter aux favoris"
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProductDetail(product);
            }}
            className="bg-black/80 hover:bg-black text-white text-xs px-3 py-1.5 rounded-xl flex items-center gap-1 font-semibold border border-zinc-700"
          >
            <Eye className="w-3.5 h-3.5" />
            Aperçu rapide
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
            <span className="uppercase font-mono tracking-wider font-semibold">
              {product.categoryName}
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              En Stock ({product.stock})
            </span>
          </div>

          <h3
            onClick={() => setSelectedProductDetail(product)}
            className="text-sm font-bold text-white group-hover:text-[#C6FF00] transition-colors cursor-pointer line-clamp-2"
          >
            {product.name}
          </h3>

          <p className="text-xs text-zinc-400 line-clamp-2 mt-1 font-light">
            {product.description}
          </p>
        </div>

        {/* Price & Unit */}
        <div className="pt-2 border-t border-zinc-800/80">
          <div className="flex items-baseline gap-2">
            {product.price !== null ? (
              <>
                <span className="text-lg font-black text-[#C6FF00] font-mono">
                  {product.price.toLocaleString('fr-FR')} FCFA
                </span>
                {product.oldPrice && (
                  <span className="text-xs text-zinc-500 line-through">
                    {product.oldPrice.toLocaleString('fr-FR')} FCFA
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/30">
                Prix à préciser (Sur demande)
              </span>
            )}
          </div>
          <span className="text-[10px] text-zinc-400 font-mono block mt-1">
            Format: {product.unit} {product.sku ? `• SKU: ${product.sku}` : ''}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full bg-[#C6FF00] hover:bg-[#b0e600] text-black text-xs font-bold py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Au panier</span>
          </button>

          <a
            href={getSingleWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-black text-xs font-bold py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-black" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
