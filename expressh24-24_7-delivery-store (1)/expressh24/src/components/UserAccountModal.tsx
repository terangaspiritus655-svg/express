import React, { useState } from 'react';
import {
  X,
  User,
  ShoppingBag,
  Gift,
  MapPin,
  Heart,
  Bell,
  Printer,
  Copy,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
  LogOut,
  ArrowRight,
  ExternalLink,
  Award
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';

export const UserAccountModal: React.FC = () => {
  const {
    isAuthOpen,
    setIsAuthOpen,
    user,
    setUser,
    orders,
    favorites,
    products,
    setTrackingOrderId,
    setCurrentView
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'loyalty' | 'addresses' | 'favorites' | 'notifications' | 'login'>('orders');

  // Auth form states
  const [authMethod, setAuthMethod] = useState<'phone' | 'email' | 'google'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Order | null>(null);
  const [copiedReferral, setCopiedReferral] = useState(false);

  if (!isAuthOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: `user-${Date.now()}`,
      name: nameInput || 'Client ExpressH24',
      email: emailInput || 'client.dakar@expressh24.sn',
      phone: phoneNumber || '+221 77 000 00 00',
      role: 'customer',
      savedAddresses: ['Almadies, Route des Almadies', 'Mermoz Pyrotechnie Villa 14'],
      favorites: favorites
    });
    setOtpSent(false);
  };

  const handleGoogleLogin = () => {
    setUser({
      id: `user-google-${Date.now()}`,
      name: 'Ousmane Fall',
      email: 'ousmane.fall@gmail.com',
      phone: '+221 77 648 14 20',
      role: 'customer',
      savedAddresses: ['Plateau, Avenue Léopold Sédar Senghor'],
      favorites: favorites
    });
  };

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  // Print Invoice Function
  const handlePrintInvoice = (order: Order) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Facture ${order.id} - ExpressH24 Dakar</title>
          <style>
            body { font-family: monospace, sans-serif; padding: 20px; color: #000; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
            .title { font-size: 20px; font-weight: bold; }
            .subtitle { font-size: 12px; color: #555; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 12px; }
            th { background-color: #f2f2f2; }
            .total-row { font-weight: bold; font-size: 14px; }
            .footer { margin-top: 30px; text-align: center; font-size: 11px; color: #777; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">EXPRESSH24 DAKAR SÉNÉGAL</div>
            <div class="subtitle">Livraison Express 24H/24 • Tel: +221 77 648 14 20</div>
            <div>FACTURE N° : ${order.id}</div>
            <div>Date : ${new Date(order.createdAt).toLocaleDateString('fr-FR')}</div>
          </div>

          <p><strong>Client :</strong> ${order.customerName} (${order.customerPhone})</p>
          <p><strong>Adresse de livraison :</strong> ${order.address}, ${order.neighborhood}</p>
          <p><strong>Mode de Paiement :</strong> ${order.paymentMethod.toUpperCase()}</p>

          <table>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items
                .map(
                  (item) => `
                <tr>
                  <td>${item.product.name}</td>
                  <td>${item.quantity}</td>
                  <td>${(item.product.price || 0).toLocaleString('fr-FR')} FCFA</td>
                  <td>${((item.product.price || 0) * item.quantity).toLocaleString('fr-FR')} FCFA</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>

          <div style="margin-top: 15px; text-align: right;">
            <p>Sous-total : ${order.subtotal.toLocaleString('fr-FR')} FCFA</p>
            <p>Frais de livraison (${order.neighborhood}) : ${order.deliveryFee.toLocaleString('fr-FR')} FCFA</p>
            ${order.discount > 0 ? `<p>Réduction : -${order.discount.toLocaleString('fr-FR')} FCFA</p>` : ''}
            <p class="total-row">TOTAL PAYÉ : ${order.total.toLocaleString('fr-FR')} FCFA</p>
          </div>

          <div class="footer">
            <p>Merci pour votre confiance sur ExpressH24 Dakar !</p>
            <p>Service client 24h/24 : +221 77 648 14 20 • www.expressh24.sn</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C6FF00] text-black font-black flex items-center justify-center font-mono">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono">
                {user ? user.name : 'Mon Espace Client ExpressH24'}
              </h3>
              <p className="text-xs text-zinc-400">
                {user ? user.phone : 'Connectez-vous pour suivre vos commandes et points'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthOpen(false)}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-black border-b border-zinc-800 px-4 flex items-center gap-2 overflow-x-auto text-xs py-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 shrink-0 ${
              activeTab === 'orders' ? 'bg-[#C6FF00] text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Commandes ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('loyalty')}
            className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 shrink-0 ${
              activeTab === 'loyalty' ? 'bg-[#C6FF00] text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Club Points & Parrainage</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 shrink-0 ${
              activeTab === 'addresses' ? 'bg-[#C6FF00] text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Adresses</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 shrink-0 ${
              activeTab === 'favorites' ? 'bg-[#C6FF00] text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Favoris ({favoriteProducts.length})</span>
          </button>

          {!user && (
            <button
              onClick={() => setActiveTab('login')}
              className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 shrink-0 ml-auto ${
                activeTab === 'login' ? 'bg-[#C6FF00] text-black' : 'bg-zinc-800 text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Se Connecter</span>
            </button>
          )}

          {user && (
            <button
              onClick={() => setUser(null)}
              className="px-3 py-2 rounded-xl font-bold text-red-400 hover:bg-red-950/40 flex items-center gap-1 ml-auto shrink-0"
              title="Déconnexion"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Déconnexion</span>
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase font-mono">Historique de vos commandes</h4>
              {orders.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-zinc-800 rounded-2xl">
                  <ShoppingBag className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
                  <p className="text-xs text-zinc-400">Vous n'avez pas encore passé de commande.</p>
                </div>
              ) : (
                orders.map((o) => (
                  <div key={o.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                      <div>
                        <span className="font-mono text-xs font-black text-[#C6FF00]">{o.id}</span>
                        <p className="text-[10px] text-zinc-400">{new Date(o.createdAt).toLocaleString('fr-FR')}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                          {o.status === 'on_the_way' ? 'En cours de livraison' : o.status === 'delivered' ? 'Livré' : 'Reçu'}
                        </span>
                        <span className="font-mono font-bold text-sm text-white">{o.total.toLocaleString('fr-FR')} FCFA</span>
                      </div>
                    </div>

                    <div className="text-xs text-zinc-300 space-y-1">
                      <p><strong>Livrer à :</strong> {o.address} ({o.neighborhood})</p>
                      <p className="text-zinc-400"><strong>Articles :</strong> {o.items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
                      <button
                        onClick={() => {
                          setTrackingOrderId(o.id);
                          setCurrentView('tracking');
                          setIsAuthOpen(false);
                        }}
                        className="text-xs text-[#C6FF00] font-bold hover:underline flex items-center gap-1"
                      >
                        <span>Suivre la livraison en direct</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handlePrintInvoice(o)}
                        className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Télécharger Facture</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: LOYALTY & REFERRAL */}
          {activeTab === 'loyalty' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-zinc-900 to-black border border-[#C6FF00]/40 p-6 rounded-2xl relative overflow-hidden">
                <Award className="w-12 h-12 text-[#C6FF00] absolute top-4 right-4 opacity-20" />
                <span className="text-[10px] uppercase font-mono font-bold text-[#C6FF00] bg-black px-2.5 py-0.5 rounded border border-zinc-800">
                  PROGRAMME FIDÉLITÉ
                </span>
                <h3 className="text-xl font-black text-white font-mono mt-2">Club ExpressH24 Sénégal</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-[#C6FF00] font-mono">250</span>
                  <span className="text-xs text-zinc-400 font-mono">Points accumulés (= 2 500 FCFA de réduction)</span>
                </div>
                <p className="text-xs text-zinc-400 mt-2">
                  Chaque tranche de 100 FCFA dépensée vous rapporte 1 point fidélité convertible en bon d'achat !
                </p>
              </div>

              {/* Referral Box */}
              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
                <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#C6FF00]" />
                  <span>Parrainez un ami à Dakar</span>
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Offrez 1 000 FCFA à vos proches. Vous recevrez automatiquement 1 000 FCFA dès leur première commande !
                </p>

                <div className="mt-4 flex items-center gap-2 bg-black border border-zinc-800 p-3 rounded-xl">
                  <span className="font-mono text-sm font-bold text-[#C6FF00] flex-1">
                    EXH-PARRAIN-2026
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('EXH-PARRAIN-2026');
                      setCopiedReferral(true);
                      setTimeout(() => setCopiedReferral(false), 3000);
                    }}
                    className="bg-[#C6FF00] text-black text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedReferral ? 'Copié !' : 'Copier'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase font-mono">Vos Adresses Enregistrées à Dakar</h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#C6FF00]" />
                    <div>
                      <p className="text-xs font-bold text-white">Almadies — Domicile Principal</p>
                      <p className="text-[11px] text-zinc-400">Route des Almadies près du Restaurant La Marea</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                    Par défaut
                  </span>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-zinc-500" />
                    <div>
                      <p className="text-xs font-bold text-white">Plateau — Bureau Work</p>
                      <p className="text-[11px] text-zinc-400">Avenue Léopold Sédar Senghor, Immeuble X</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FAVORITES */}
          {activeTab === 'favorites' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase font-mono">Vos Articles Favoris</h4>
              {favoriteProducts.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-zinc-800 rounded-2xl">
                  <Heart className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
                  <p className="text-xs text-zinc-400">Aucun produit en favori pour l'instant.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {favoriteProducts.map((p) => (
                    <div key={p.id} className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-lg bg-black shrink-0" referrerPolicy="no-referrer" />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-white truncate">{p.name}</h5>
                        <p className="text-xs font-black text-[#C6FF00] font-mono">
                          {p.price !== null ? `${p.price.toLocaleString('fr-FR')} FCFA` : 'Prix sur demande'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: LOGIN FORM */}
          {activeTab === 'login' && !user && (
            <div className="max-w-md mx-auto space-y-5">
              <div className="text-center">
                <h4 className="text-lg font-black text-white font-mono">Se Connecter à ExpressH24</h4>
                <p className="text-xs text-zinc-400 mt-1">Connexion sécurisée en 1 minute via Numéro de téléphone ou Google</p>
              </div>

              {/* Quick Google Login */}
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white text-black font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
              >
                <span className="text-base font-black">G</span>
                <span>Continuer avec Google</span>
              </button>

              <div className="flex items-center gap-3 my-4">
                <div className="h-px bg-zinc-800 flex-1" />
                <span className="text-[10px] text-zinc-500 font-mono uppercase">Ou avec numéro / email</span>
                <div className="h-px bg-zinc-800 flex-1" />
              </div>

              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-3">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Nom complet</label>
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="Ex: Babacar Ndiaye"
                      required
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Numéro WhatsApp / Téléphone Sénégal (+221)</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+221 77 000 00 00"
                        required
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C6FF00] hover:bg-[#b0e600] text-black font-extrabold py-3 rounded-xl text-xs"
                  >
                    Envoyer le code OTP par SMS / WhatsApp
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-3">
                  <p className="text-xs text-[#C6FF00] text-center">
                    Un code à 4 chiffres a été envoyé au {phoneNumber}
                  </p>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Entrez le code OTP reçu</label>
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="1 2 3 4"
                      maxLength={4}
                      required
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-center font-mono text-lg text-[#C6FF00] tracking-widest"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C6FF00] hover:bg-[#b0e600] text-black font-extrabold py-3 rounded-xl text-xs"
                  >
                    Valider et Se Connecter
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
