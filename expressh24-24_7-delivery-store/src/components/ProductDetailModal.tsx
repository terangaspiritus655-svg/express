import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { X, Plus, Minus, ShoppingBag, MessageSquare, ShieldCheck, Zap, Clock, ShieldAlert } from 'lucide-react';
import { createProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setAdded(false);
    }
  }, [product?.id]);

  if (!product) return null;

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  const handleWhatsApp = () => {
    const url = createProductWhatsAppUrl(product.name, quantity, product.price * quantity);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl text-white flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 text-zinc-400 hover:text-white hover:bg-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 relative bg-black/60 min-h-[260px] flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover max-h-[350px]"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-[#C6FF00] text-black text-xs font-black px-3 py-1 rounded-full uppercase">
              {product.badge}
            </span>
          )}
          {product.requiresAgeVerification && (
            <span className="absolute bottom-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <ShieldAlert className="w-4 h-4" />
              Réservé +18 ans
            </span>
          )}
        </div>

        {/* Details & Controls */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-[#C6FF00] uppercase tracking-wider mb-1">
              {product.categoryName}
            </div>

            <h2 className="text-xl font-black text-white mb-2 leading-tight">
              {product.name}
            </h2>

            {product.unit && (
              <span className="inline-block text-xs text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded-md mb-3">
                Conditionnement : {product.unit}
              </span>
            )}

            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
              {product.description}
            </p>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-2xl font-black text-[#C6FF00]">
                {(product.price * quantity).toLocaleString('fr-FR')} FCFA
              </span>
              {quantity > 1 && (
                <span className="text-xs text-zinc-400">
                  ({product.price.toLocaleString('fr-FR')} FCFA / unité)
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-bold text-zinc-400">Quantité :</span>
              <div className="flex items-center bg-zinc-800 rounded-xl border border-zinc-700">
                <button
                  onClick={handleDecrement}
                  className="p-2 text-zinc-300 hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-black text-white">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="p-2 text-zinc-300 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-zinc-800">
            <button
              onClick={handleAddToCart}
              className={`w-full py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all ${
                added 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-[#C6FF00] hover:bg-[#b0e600] text-black shadow-[0_0_15px_rgba(198,255,0,0.3)]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{added ? 'AJOUTÉ AU PANIER !' : 'AJOUTER AU PANIER'}</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full py-3 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>COMMANDER VIA WHATSAPP (77 648 14 20)</span>
            </button>

            <div className="pt-3 grid grid-cols-2 gap-2 text-[10px] text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#C6FF00]" />
                <span>Livraison 15-20 min</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C6FF00]" />
                <span>Emballage neutre et discret</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
