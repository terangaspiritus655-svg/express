import React, { useState } from 'react';
import { X, ShoppingBag, MessageCircle, Heart, Share2, Check, Truck, Clock, Plus, Minus, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductModal: React.FC = () => {
  const {
    products,
    selectedProductDetail,
    setSelectedProductDetail,
    addToCart,
    favorites,
    toggleFavorite,
    selectedNeighborhood
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!selectedProductDetail) return null;

  const product = selectedProductDetail;
  const isFav = favorites.includes(product.id);

  // Related products in same category or brand
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Découvrez ${product.name} sur ExpressH24 Dakar!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const getDirectWhatsAppUrl = () => {
    const phoneTarget = '221776481420';
    const priceText = product.price !== null ? `${(product.price * quantity).toLocaleString('fr-FR')} FCFA` : 'Prix à préciser (Sur demande)';
    const message = `Bonjour ExpressH24 🚀,\nJe souhaite commander/me renseigner immédiatement :\n\n- Produit : ${product.name}\n- SKU : ${product.sku || 'N/A'}\n- Quantité : ${quantity}\n- Prix : ${priceText}\n- Quartier : ${selectedNeighborhood}\n\nMerci de me livrer en express !`;
    return `https://wa.me/${phoneTarget}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Close button */}
        <button
          onClick={() => setSelectedProductDetail(null)}
          className="absolute top-4 right-4 p-2 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-full z-10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Side */}
          <div className="relative aspect-square bg-zinc-950 p-6 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#C6FF00] text-black text-xs font-black px-3 py-1 rounded-full uppercase">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details Side */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-mono font-semibold text-[#C6FF00] uppercase tracking-wider">
                {product.categoryName}
              </span>

              <h2 className="text-xl font-bold text-white mt-1 leading-snug">
                {product.name}
              </h2>

              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {product.description}
              </p>

              <div className="mt-4 flex items-baseline gap-3">
                {product.price !== null ? (
                  <>
                    <span className="text-2xl font-black text-[#C6FF00] font-mono">
                      {(product.price * quantity).toLocaleString('fr-FR')} FCFA
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-zinc-500 line-through">
                        {(product.oldPrice * quantity).toLocaleString('fr-FR')} FCFA
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-sm font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/30">
                    Prix à préciser (Validation Admin)
                  </span>
                )}
              </div>

              <div className="text-xs text-zinc-400 mt-1 font-mono">
                {product.price !== null ? `Prix unitaire : ${product.price.toLocaleString('fr-FR')} FCFA (${product.unit})` : `Format: ${product.unit}`} {product.sku ? `• SKU: ${product.sku}` : ''}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2 border-t border-zinc-800 pt-4">
              <label className="text-xs text-zinc-400 font-semibold">Quantité à commander :</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-zinc-800 rounded-xl border border-zinc-700">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-zinc-300 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold font-mono text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-zinc-300 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    isFav
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'
                  }`}
                  title="Ajouter aux favoris"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
                </button>

                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-white transition-colors relative"
                  title="Partager le produit"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-[#C6FF00]" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="space-y-1.5 text-[11px] text-zinc-400 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-2 text-white font-medium">
                <Truck className="w-3.5 h-3.5 text-[#C6FF00]" />
                <span>Livraison chrono 15-20 min à Dakar ({selectedNeighborhood})</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C6FF00]" />
                <span>Disponible 24H/24 et 7J/7</span>
              </div>
            </div>

            {/* Related Products / Fréquemment achetés ensemble */}
            {relatedProducts.length > 0 && (
              <div className="pt-2 border-t border-zinc-800/80">
                <span className="text-[10px] uppercase font-mono font-bold text-zinc-400 block mb-2">
                  Fréquemment achetés ensemble :
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {relatedProducts.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => {
                        setSelectedProductDetail(rel);
                        setQuantity(1);
                      }}
                      className="bg-zinc-950 p-1.5 rounded-lg border border-zinc-800 hover:border-[#C6FF00] cursor-pointer text-center"
                    >
                      <img src={rel.image} alt={rel.name} className="w-10 h-10 object-cover mx-auto rounded" referrerPolicy="no-referrer" />
                      <p className="text-[10px] text-white font-bold truncate mt-1">{rel.name}</p>
                      <p className="text-[9px] text-[#C6FF00] font-mono font-bold">
                        {rel.price !== null ? `${rel.price} FCFA` : 'N/A'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="grid grid-cols-1 gap-2.5 pt-2">
              <button
                onClick={() => {
                  addToCart(product, quantity);
                  setSelectedProductDetail(null);
                }}
                className="w-full bg-[#C6FF00] hover:bg-[#b0e600] text-black font-extrabold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {product.price !== null
                    ? `Ajouter ${quantity} au panier (${(product.price * quantity).toLocaleString('fr-FR')} FCFA)`
                    : `Ajouter au panier (Prix à préciser)`}
                </span>
              </button>

              <a
                href={getDirectWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-black font-extrabold py-3 rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Commander directement sur WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
