import React, { useState } from 'react';
import { CartItem, CustomerInfo, Order, PaymentMethod, DeliveryType } from '../types';
import { DAKAR_DISTRICTS } from '../data/dakarDistricts';
import { 
  ShoppingBag, 
  MapPin, 
  Phone, 
  User, 
  CreditCard, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Tag, 
  MessageSquare,
  ArrowRight,
  Truck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { createCartWhatsAppUrl } from '../utils/whatsapp';

interface CheckoutPageProps {
  cartItems: CartItem[];
  onClearCart: () => void;
  onOrderCreated: (order: Order) => void;
  setCurrentTab: (tab: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartItems,
  onClearCart,
  onOrderCreated,
  setCurrentTab
}) => {
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    district: 'almadies',
    instructions: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('wave');
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('express');
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get selected Dakar district info
  const districtInfo = DAKAR_DISTRICTS.find((d) => d.id === customer.district) || DAKAR_DISTRICTS[0];

  const subtotal = (cartItems || []).reduce(
    (sum, item) => sum + (item?.product?.price || 0) * (item?.quantity || 0),
    0
  );
  const deliveryFee = deliveryType === 'express' ? districtInfo.deliveryFeeExpress : districtInfo.deliveryFeeStandard;
  const total = Math.max(0, subtotal + deliveryFee - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'EXPRESS24' || couponCode.trim().toUpperCase() === 'DAKAR') {
      setDiscountAmount(1000);
      setCouponApplied(true);
    } else {
      alert('Code promo invalide. Essayez EXPRESS24 pour 1 000 FCFA de réduction !');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customer.name.trim() || !customer.phone.trim() || !customer.address.trim()) {
      alert('Veuillez remplir votre Nom, Téléphone et Adresse exacte à Dakar.');
      return;
    }

    setIsSubmitting(true);

    const trackingNum = `EXH-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      id: trackingNum,
      trackingNumber: trackingNum,
      customer: {
        ...customer,
        district: districtInfo.name
      },
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      deliveryType,
      status: 'received',
      createdAt: new Date().toISOString(),
      estimatedDeliveryTime: districtInfo.estimatedExpressTime,
      driverName: 'Mamadou Diallo (Livreur ExpressH24)',
      driverPhone: '+221 77 648 14 20'
    };

    setTimeout(() => {
      // Trigger festive confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      onOrderCreated(newOrder);
      onClearCart();
      setIsSubmitting(false);
      setCurrentTab('tracking');
    }, 1200);
  };

  const handleWhatsAppOrder = () => {
    if (!customer.name || !customer.phone || !customer.address) {
      alert('Veuillez renseigner votre Nom, Téléphone et Adresse avant de poursuivre sur WhatsApp.');
      return;
    }
    const paymentLabel = 
      paymentMethod === 'wave' ? 'Wave Senegal' :
      paymentMethod === 'orange_money' ? 'Orange Money' :
      paymentMethod === 'card' ? 'Carte Bancaire' : 'Paiement à la livraison (Cash)';

    const url = createCartWhatsAppUrl(
      cartItems,
      subtotal,
      deliveryFee,
      total,
      { ...customer, district: districtInfo.name },
      paymentLabel
    );
    window.open(url, '_blank');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center space-y-4">
          <ShoppingBag className="w-12 h-12 text-[#C6FF00] mx-auto" />
          <h2 className="text-xl font-black text-white">Votre panier est vide</h2>
          <p className="text-xs text-zinc-400">
            Ajoutez des articles au panier avant d'accéder au paiement.
          </p>
          <button
            onClick={() => setCurrentTab('shop')}
            className="w-full py-3 rounded-xl bg-[#C6FF00] text-black font-extrabold text-xs"
          >
            Retourner à la boutique
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="border-b border-zinc-800 pb-4">
          <span className="text-xs font-bold text-[#C6FF00] uppercase tracking-wider block">
            Finalisation de Commande
          </span>
          <h1 className="text-3xl font-black text-white italic">
            Caisse & Paiement Dakar
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Form Column */}
          <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-6">
            
            {/* 1. Customer Coordinates */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#C6FF00] flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>1. Vos Coordonnées de Livraison</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-zinc-400 font-bold mb-1">Nom Complet *</label>
                  <input
                    type="text"
                    required
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    placeholder="Ex: Babacar Ndiaye"
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-bold mb-1">Téléphone Sénégal (Wave/OM) *</label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="Ex: 77 000 00 00"
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-zinc-400 font-bold mb-1">Quartier à Dakar *</label>
                  <select
                    value={customer.district}
                    onChange={(e) => setCustomer({ ...customer, district: e.target.value })}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C6FF00]"
                  >
                    {DAKAR_DISTRICTS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.deliveryFeeExpress} FCFA)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 font-bold mb-1">Adresse Précise *</label>
                  <input
                    type="text"
                    required
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    placeholder="Rue, N° Villa, Repère visuel..."
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-bold text-xs mb-1">Instructions pour le livreur (Optionnel)</label>
                <textarea
                  rows={2}
                  value={customer.instructions}
                  onChange={(e) => setCustomer({ ...customer, instructions: e.target.value })}
                  placeholder="Ex: Appeler avant d'arriver, déposer devant la porte..."
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#C6FF00]"
                />
              </div>
            </div>

            {/* 2. Delivery Type Selection */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#C6FF00] flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>2. Mode de Livraison</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div
                  onClick={() => setDeliveryType('express')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    deliveryType === 'express'
                      ? 'bg-black border-[#C6FF00] text-white shadow-[0_0_15px_rgba(198,255,0,0.15)]'
                      : 'bg-black/50 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-white flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-[#C6FF00]" />
                      Livraison Express Chrono
                    </span>
                    <span className="font-black text-[#C6FF00]">
                      {districtInfo.deliveryFeeExpress.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Délai garanti : <strong>{districtInfo.estimatedExpressTime}</strong> à {districtInfo.name}
                  </p>
                </div>

                <div
                  onClick={() => setDeliveryType('standard')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    deliveryType === 'standard'
                      ? 'bg-black border-[#C6FF00] text-white shadow-[0_0_15px_rgba(198,255,0,0.15)]'
                      : 'bg-black/50 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-white">Livraison Standard</span>
                    <span className="font-black text-white">
                      {districtInfo.deliveryFeeStandard.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Délai standard : 30 à 45 minutes
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Payment Method Choice */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#C6FF00] flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span>3. Mode de Paiement</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                
                {/* Wave */}
                <div
                  onClick={() => setPaymentMethod('wave')}
                  className={`p-3 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'wave'
                      ? 'bg-blue-950/80 border-blue-500 text-white shadow-lg'
                      : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <span className="font-black text-blue-400 text-sm">WAVE</span>
                  <span className="text-[10px] text-zinc-400">Paiement Mobile</span>
                </div>

                {/* Orange Money */}
                <div
                  onClick={() => setPaymentMethod('orange_money')}
                  className={`p-3 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'orange_money'
                      ? 'bg-orange-950/80 border-orange-500 text-white shadow-lg'
                      : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <span className="font-black text-orange-400 text-sm">ORANGE MONEY</span>
                  <span className="text-[10px] text-zinc-400">Paiement OM</span>
                </div>

                {/* Card */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'card'
                      ? 'bg-zinc-800 border-[#C6FF00] text-white shadow-lg'
                      : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <span className="font-black text-white text-sm">CARTE BANK</span>
                  <span className="text-[10px] text-zinc-400">Visa / Mastercard</span>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'cod'
                      ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-lg'
                      : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <span className="font-black text-emerald-400 text-sm">CASH / ESPÈCES</span>
                  <span className="text-[10px] text-zinc-400">À la livraison</span>
                </div>

              </div>
            </div>

            {/* Submit Order Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-[#C6FF00] hover:bg-[#b0e600] text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(198,255,0,0.3)]"
              >
                {isSubmitting ? (
                  <span>CONFIRMATION EN COURS...</span>
                ) : (
                  <>
                    <span>CONFIRMER MA COMMANDE ({total.toLocaleString('fr-FR')} FCFA)</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>COMMANDER DIRECTEMENT SUR WHATSAPP (77 648 14 20)</span>
              </button>
            </div>

          </form>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 sticky top-24">
              <h2 className="text-sm font-black uppercase tracking-wider text-white border-b border-zinc-800 pb-3 flex items-center justify-between">
                <span>Récapitulatif</span>
                <span className="text-xs text-[#C6FF00] font-bold">{cartItems.length} article(s)</span>
              </h2>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-bold text-[#C6FF00]">{item.quantity}x</span>
                      <span className="text-zinc-300 truncate">{item.product.name}</span>
                    </div>
                    <span className="font-bold text-white ml-2 whitespace-nowrap">
                      {(item.product.price * item.quantity).toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="pt-2 border-t border-zinc-800 flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Code promo (ex: EXPRESS24)"
                  className="flex-1 bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-[#C6FF00]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl"
                >
                  Appliquer
                </button>
              </form>

              {couponApplied && (
                <div className="text-[11px] text-emerald-400 bg-emerald-950/60 p-2 rounded-lg flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Code promo appliqué : -1 000 FCFA</span>
                </div>
              )}

              {/* Calculations */}
              <div className="space-y-2 text-xs pt-3 border-t border-zinc-800">
                <div className="flex justify-between text-zinc-400">
                  <span>Sous-total articles :</span>
                  <span className="font-bold text-white">{subtotal.toLocaleString('fr-FR')} FCFA</span>
                </div>

                <div className="flex justify-between text-zinc-400">
                  <span>Livraison ({districtInfo.name}) :</span>
                  <span className="font-bold text-white">{deliveryFee.toLocaleString('fr-FR')} FCFA</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Réduction promo :</span>
                    <span className="font-bold">- {discountAmount.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-zinc-800">
                  <span>TOTAL :</span>
                  <span className="text-[#C6FF00] text-lg">{total.toLocaleString('fr-FR')} FCFA</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 text-[11px] text-zinc-400 space-y-1">
                <div className="flex items-center gap-1.5 text-[#C6FF00] font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Emballage 100% Neutre & Discret</span>
                </div>
                <p>Vos articles sont emballés sans aucun signe extérieur distinctif.</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
