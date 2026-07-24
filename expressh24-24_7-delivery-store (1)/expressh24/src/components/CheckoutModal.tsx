import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, CreditCard, Phone, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import { DAKAR_NEIGHBORHOODS } from '../data/neighborhoods';
import { PaymentMethod, DeliveryType } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    selectedNeighborhood,
    createOrder,
    setCurrentView,
    setTrackingOrderId
  } = useShop();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+221 ');
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState(selectedNeighborhood || 'Almadies');
  const [instructions, setInstructions] = useState('');
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('express');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('wave');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const currentNeighborhoodObj = DAKAR_NEIGHBORHOODS.find(
    (n) => n.name === neighborhood
  ) || DAKAR_NEIGHBORHOODS[0];

  const deliveryFee = deliveryType === 'express'
    ? currentNeighborhoodObj.expressFee
    : currentNeighborhoodObj.standardFee;

  const grandTotal = cartTotal + deliveryFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || customerPhone.length < 9 || !address.trim()) {
      alert('Veuillez remplir votre nom, téléphone et adresse exacte.');
      return;
    }

    setIsSubmitting(true);

    try {
      const created = await createOrder({
        customerName,
        customerPhone,
        address,
        neighborhood,
        instructions,
        deliveryType,
        deliveryFee,
        paymentMethod,
        subtotal: cartSubtotal,
        discount: cartDiscount,
        total: grandTotal,
        items: [...cart]
      });

      // Confetti celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setIsSubmitting(false);
      setIsCheckoutOpen(false);
      setTrackingOrderId(created.id);
      setCurrentView('tracking');
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl my-8 text-white relative animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 bg-black border-b border-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#C6FF00] text-black font-extrabold flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-mono">Finaliser ma commande Express</h2>
              <p className="text-[10px] text-zinc-400">Livraison garantie 24H/24 • 7J/7 à Dakar</p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
          
          {/* Customer Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C6FF00] flex items-center gap-1.5">
              <span>1. Coordonnées de livraison</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1 font-semibold">Nom complet *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ex: Babacar Ndiaye"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C6FF00]"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1 font-semibold">Téléphone WhatsApp *</label>
                <input
                  type="text"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+221 77 123 45 67"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C6FF00] font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1 font-semibold">Quartier (Dakar) *</label>
                <select
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C6FF00]"
                >
                  {DAKAR_NEIGHBORHOODS.map((n) => (
                    <option key={n.name} value={n.name}>
                      {n.name} ({n.expressTimeMin} min)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1 font-semibold">Adresse exacte / Repère *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ex: Villa 12, Rue Mermoz près de la Boulangerie"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C6FF00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1 font-semibold">Instructions au livreur (Optionnel)</label>
              <input
                type="text"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Ex: Appeler au portail, laisser à la sécurité"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C6FF00]"
              />
            </div>
          </div>

          {/* Delivery Mode */}
          <div className="space-y-3 pt-2 border-t border-zinc-900">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C6FF00]">
              2. Vitesse de livraison
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <label
                onClick={() => setDeliveryType('express')}
                className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                  deliveryType === 'express'
                    ? 'bg-[#C6FF00]/10 border-[#C6FF00] text-white'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C6FF00] flex items-center gap-1">
                    ⚡ Express Chrono (Immédiat)
                  </span>
                  <input
                    type="radio"
                    name="deliveryType"
                    checked={deliveryType === 'express'}
                    onChange={() => setDeliveryType('express')}
                  />
                </div>
                <span className="text-xs font-mono font-bold mt-2">
                  15 à 20 min ({currentNeighborhoodObj.expressFee.toLocaleString('fr-FR')} FCFA)
                </span>
              </label>

              <label
                onClick={() => setDeliveryType('standard')}
                className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                  deliveryType === 'standard'
                    ? 'bg-[#C6FF00]/10 border-[#C6FF00] text-white'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Programmer pour plus tard</span>
                  <input
                    type="radio"
                    name="deliveryType"
                    checked={deliveryType === 'standard'}
                    onChange={() => setDeliveryType('standard')}
                  />
                </div>
                <span className="text-xs font-mono font-bold mt-2">
                  Créneau au choix ({currentNeighborhoodObj.standardFee.toLocaleString('fr-FR')} FCFA)
                </span>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3 pt-2 border-t border-zinc-900">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C6FF00]">
              3. Mode de paiement
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('wave')}
                className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'wave'
                    ? 'bg-sky-500/20 border-sky-400 text-sky-400 font-bold'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                <span className="text-xs font-bold">Wave Sénégal</span>
                <span className="text-[10px]">Instant M-Payment</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('orange_money')}
                className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'orange_money'
                    ? 'bg-orange-500/20 border-orange-400 text-orange-400 font-bold'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                <span className="text-xs font-bold">Orange Money</span>
                <span className="text-[10px]">Code USSD / App</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 font-bold'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                <span className="text-xs font-bold">Carte Bancaire</span>
                <span className="text-[10px]">Visa / Mastercard</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'cash'
                    ? 'bg-[#C6FF00]/20 border-[#C6FF00] text-[#C6FF00] font-bold'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                <span className="text-xs font-bold">À la livraison</span>
                <span className="text-[10px]">Espèces au livreur</span>
              </button>
            </div>
          </div>

          {/* Order Summary Recap */}
          <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-2 text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>Produits ({cart.length})</span>
              <span className="font-mono text-white">{cartSubtotal.toLocaleString('fr-FR')} FCFA</span>
            </div>
            {cartDiscount > 0 && (
              <div className="flex justify-between text-[#C6FF00]">
                <span>Réduction</span>
                <span className="font-mono">-{cartDiscount.toLocaleString('fr-FR')} FCFA</span>
              </div>
            )}
            <div className="flex justify-between text-zinc-400">
              <span>Livraison ({neighborhood})</span>
              <span className="font-mono text-white">{deliveryFee.toLocaleString('fr-FR')} FCFA</span>
            </div>
            <div className="flex justify-between text-base font-black text-white pt-2 border-t border-zinc-800">
              <span>TOTAL À PAYER</span>
              <span className="text-[#C6FF00] font-mono">{grandTotal.toLocaleString('fr-FR')} FCFA</span>
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#C6FF00] hover:bg-[#b0e600] text-black font-black py-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(198,255,0,0.3)] transition-transform active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Traitement de la commande...</span>
            ) : (
              <>
                <span>Confirmer la commande ({grandTotal.toLocaleString('fr-FR')} FCFA)</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
