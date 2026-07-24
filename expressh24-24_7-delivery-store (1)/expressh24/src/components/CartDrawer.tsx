import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, MessageCircle, Tag, Check, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { DAKAR_NEIGHBORHOODS } from '../data/neighborhoods';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    selectedNeighborhood,
    setSelectedNeighborhood,
    setIsCheckoutOpen,
    getWhatsAppUrl
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [deliverySpeed, setDeliverySpeed] = useState<'express' | 'standard'>('express');

  if (!isCartOpen) return null;

  const currentNeighborhoodObj = DAKAR_NEIGHBORHOODS.find(
    (n) => n.name === selectedNeighborhood
  ) || DAKAR_NEIGHBORHOODS[0];

  const deliveryFee = deliverySpeed === 'express'
    ? currentNeighborhoodObj.expressFee
    : currentNeighborhoodObj.standardFee;

  const finalOrderTotal = cartTotal + (cart.length > 0 ? deliveryFee : 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const res = applyCoupon(couponCode);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponCode('');
    } else {
      setCouponError(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 text-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Cart Header */}
          <div className="p-4 bg-black border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#C6FF00] text-black font-extrabold flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white font-mono">Mon Panier Express</h2>
                <p className="text-[10px] text-zinc-400">
                  {cart.length} article{cart.length > 1 ? 's' : ''} au panier
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm text-zinc-400 font-medium">Votre panier est vide pour le moment</p>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Découvrez nos 13 rayons d'essentiels et profitez de la livraison en 15 à 20 minutes à Dakar.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-zinc-900">
                  <span>Articles sélectionnés</span>
                  <button
                    onClick={clearCart}
                    className="text-red-400 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <Trash2 className="w-3 h-3" /> Vidage panier
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-xl flex items-center gap-3"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 object-cover rounded-lg bg-zinc-950 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                        {item.product.price !== null ? `${item.product.price.toLocaleString('fr-FR')} FCFA / unit` : 'Prix sur demande'}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-zinc-800 rounded-lg border border-zinc-700">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-zinc-300 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold font-mono text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-zinc-300 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-extrabold text-[#C6FF00] font-mono">
                          {item.product.price !== null ? `${(item.product.price * item.quantity).toLocaleString('fr-FR')} FCFA` : 'Prix à préciser'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-zinc-500 hover:text-red-400 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Delivery Options Box */}
                <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl space-y-2 mt-4">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>Quartier de livraison à Dakar</span>
                  </div>
                  <select
                    value={selectedNeighborhood}
                    onChange={(e) => setSelectedNeighborhood(e.target.value)}
                    className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-2 font-semibold"
                  >
                    {DAKAR_NEIGHBORHOODS.map((n) => (
                      <option key={n.name} value={n.name}>
                        {n.name} - Express ({n.expressTimeMin} min)
                      </option>
                    ))}
                  </select>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setDeliverySpeed('express')}
                      className={`p-2 rounded-lg border text-left flex flex-col justify-between ${
                        deliverySpeed === 'express'
                          ? 'bg-[#C6FF00]/10 border-[#C6FF00] text-[#C6FF00]'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <span className="font-bold flex items-center gap-1">⚡ Express 15-20m</span>
                      <span className="text-[10px]">{currentNeighborhoodObj.expressFee.toLocaleString('fr-FR')} FCFA</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliverySpeed('standard')}
                      className={`p-2 rounded-lg border text-left flex flex-col justify-between ${
                        deliverySpeed === 'standard'
                          ? 'bg-[#C6FF00]/10 border-[#C6FF00] text-[#C6FF00]'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <span className="font-bold">Standard 35-45m</span>
                      <span className="text-[10px]">{currentNeighborhoodObj.standardFee.toLocaleString('fr-FR')} FCFA</span>
                    </button>
                  </div>
                </div>

                {/* Promo Code Box */}
                <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-[#C6FF00]" />
                      Code promo (Ex: EXPRESS10, WAVE500)
                    </span>
                  </div>

                  {appliedCoupon ? (
                    <div className="bg-[#C6FF00]/10 border border-[#C6FF00]/40 p-2 rounded-lg flex items-center justify-between text-xs text-[#C6FF00]">
                      <span>Code {appliedCoupon.code} appliqué (-{cartDiscount.toLocaleString('fr-FR')} FCFA)</span>
                      <button onClick={removeCoupon} className="text-zinc-400 hover:text-white font-bold">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Entrer code"
                        className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none uppercase"
                      />
                      <button
                        type="submit"
                        className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-3 text-xs rounded-lg border border-zinc-700"
                      >
                        Appliquer
                      </button>
                    </form>
                  )}

                  {couponError && <p className="text-[10px] text-red-400">{couponError}</p>}
                  {couponSuccess && <p className="text-[10px] text-emerald-400">{couponSuccess}</p>}
                </div>
              </>
            )}
          </div>

          {/* Cart Footer Total Calculation */}
          {cart.length > 0 && (
            <div className="p-4 bg-black border-t border-zinc-900 space-y-3">
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Sous-total articles</span>
                  <span className="font-mono text-white">{cartSubtotal.toLocaleString('fr-FR')} FCFA</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#C6FF00]">
                    <span>Réduction promo</span>
                    <span className="font-mono">-{cartDiscount.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Frais de livraison ({selectedNeighborhood})</span>
                  <span className="font-mono text-white">{deliveryFee.toLocaleString('fr-FR')} FCFA</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-zinc-900">
                  <span>TOTAL ESTIMÉ</span>
                  <span className="text-[#C6FF00] font-mono">{finalOrderTotal.toLocaleString('fr-FR')} FCFA</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-[#C6FF00] hover:bg-[#b0e600] text-black font-extrabold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(198,255,0,0.2)]"
                >
                  <span>Valider la commande en ligne</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={getWhatsAppUrl(cart, finalOrderTotal)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-black font-extrabold py-3 rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>Commander sur WhatsApp (77 648 14 20)</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
