import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageSquare, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { createCartWhatsAppUrl } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items?: CartItem[];
  cartItems?: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart?: () => void;
  onProceedToCheckout?: () => void;
  onCheckout?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onCheckout
}) => {
  if (!isOpen) return null;

  const currentItems = cartItems || items || [];
  const handleCheckout = onCheckout || onProceedToCheckout || (() => {});

  const subtotal = currentItems.reduce(
    (sum, item) => sum + (item?.product?.price || 0) * (item?.quantity || 0),
    0
  );
  const estimatedDelivery = subtotal > 0 ? 1500 : 0;
  const total = subtotal + estimatedDelivery;

  const handleWhatsAppCheckout = () => {
    if (currentItems.length === 0) return;
    const dummyCustomer = {
      name: 'Client ExpressH24',
      phone: '77 000 00 00',
      address: 'À préciser sur WhatsApp',
      district: 'Dakar'
    };
    const url = createCartWhatsAppUrl(
      currentItems,
      subtotal,
      estimatedDelivery,
      total,
      dummyCustomer,
      'À convenir'
    );
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 text-white flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#C6FF00]/10 text-[#C6FF00]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black tracking-tight text-white">Mon Panier Express</h2>
                <p className="text-xs text-zinc-400">{currentItems.length} article(s) sélectionné(s)</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {currentItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Votre panier est vide</h3>
                <p className="text-xs text-zinc-500 max-w-xs mb-6">
                  Ajoutez vos boissons, snacks, produits de ménage ou dépannage pour une livraison en 15-20 min.
                </p>
                <button
                  onClick={onClose}
                  className="py-2.5 px-5 rounded-xl bg-[#C6FF00] text-black font-extrabold text-xs"
                >
                  Découvrir le catalogue
                </button>
              </div>
            ) : (
              currentItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80 items-center justify-between"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 object-cover rounded-lg bg-black"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                    <p className="text-[11px] text-zinc-400">{item.product.price.toLocaleString('fr-FR')} FCFA / un.</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-zinc-800 rounded-lg border border-zinc-700">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-zinc-300 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-black">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-zinc-300 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-black text-[#C6FF00] ml-auto">
                        {(item.product.price * item.quantity).toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {currentItems.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-zinc-900/50 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Sous-total articles :</span>
                  <span className="font-bold text-white">{subtotal.toLocaleString('fr-FR')} FCFA</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Livraison Estimée Dakar :</span>
                  <span className="font-bold text-white">{estimatedDelivery.toLocaleString('fr-FR')} FCFA</span>
                </div>
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-zinc-800">
                  <span>TOTAL :</span>
                  <span className="text-[#C6FF00] text-base">{total.toLocaleString('fr-FR')} FCFA</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    handleCheckout();
                  }}
                  className="w-full py-3.5 rounded-xl bg-[#C6FF00] hover:bg-[#b0e600] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(198,255,0,0.25)]"
                >
                  <span>PASSER AU PAIEMENT EN LIGNE / CASH</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>COMMANDER VIA WHATSAPP (77 648 14 20)</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
                <button
                  onClick={() => onClearCart && onClearCart()}
                  className="hover:text-red-400 underline"
                >
                  Vider le panier
                </button>
                <div className="flex items-center gap-1 text-[#C6FF00]">
                  <Zap className="w-3 h-3" />
                  <span>Chrono 15-20 min</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
