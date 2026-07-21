import React, { useState } from 'react';
import { MessageSquare, Phone, MapPin, ChevronDown, Send, ShieldCheck, Clock, Zap } from 'lucide-react';
import { EXPRESS_H24_WHATSAPP_NUMBER } from '../utils/whatsapp';

export const ContactFaqPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const faqs = [
    {
      q: "Quel est le délai de livraison réel à Dakar ?",
      a: "Notre engagement ExpressH24 est de livrer vos commandes en 15 à 20 minutes chrono dans les quartiers centraux de Dakar (Almadies, Ngor, Mermoz, Sacré-Cœur, VDN, Yoff, Point E, Fann) et 20 à 30 minutes en Banlieue."
    },
    {
      q: "ExpressH24 est-il réellement ouvert 24h/24 et 7j/7 ?",
      a: "Oui ! Nos livreurs et notre service de dispatch sont actifs 24h/24, 7 jours sur 7, y compris les dimanches, jours fériés et au milieu de la nuit."
    },
    {
      q: "Comment passer commande directement par WhatsApp ?",
      a: "Cliquez simplement sur le bouton WhatsApp sur le site ou envoyez un message au 77 648 14 20 avec la liste de vos produits, votre quartier et votre nom. Notre équipe valide immédiatement votre commande !"
    },
    {
      q: "Quels sont les modes de paiement acceptés ?",
      a: "Nous acceptons Wave Sénégal, Orange Money, les cartes bancaires (Visa/Mastercard) ainsi que le paiement en espèces (Cash) à la livraison."
    },
    {
      q: "Le service d'emballage est-il vraiment discret ?",
      a: "Absolument. Tous vos articles (hygiène, préservatifs, cigarettes, boisson, etc.) sont emballés dans des sacs neutres totalement opaques et sécurisés."
    },
    {
      q: "Où se trouve votre dépôt central ?",
      a: "Notre hub logistique central est idéalement positionné à Mermoz/VDN pour garantir un accès ultra-rapide à tous les axes routiers de Dakar."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', phone: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="border-b border-zinc-800 pb-6 text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#C6FF00] uppercase tracking-wider block">
            Assistance 24/7 & Foire Aux Questions
          </span>
          <h1 className="text-3xl sm:text-4xl font-black italic text-white">
            Contact & FAQ ExpressH24
          </h1>
          <p className="text-xs text-zinc-400">
            Une question ? Notre équipe de support répond en direct sur WhatsApp ou par téléphone.
          </p>
        </div>

        {/* Top Contact Direct Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center mx-auto">
              <MessageSquare className="w-6 h-6 fill-current" />
            </div>
            <h3 className="text-sm font-bold text-white">Commande WhatsApp</h3>
            <p className="text-xs text-zinc-400">Réponse instantanée en moins de 2 minutes</p>
            <a
              href={`https://wa.me/${EXPRESS_H24_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-2 px-4 rounded-xl bg-[#25D366] text-white font-bold text-xs"
            >
              77 648 14 20
            </a>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#C6FF00]/20 text-[#C6FF00] flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">Ligne Directe 24/7</h3>
            <p className="text-xs text-zinc-400">Appel vocal rapide avec le dispatch</p>
            <a
              href="tel:+221776481420"
              className="inline-block py-2 px-4 rounded-xl bg-[#C6FF00] text-black font-extrabold text-xs"
            >
              +221 77 648 14 20
            </a>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-800 text-white flex items-center justify-center mx-auto border border-zinc-700">
              <MapPin className="w-6 h-6 text-[#C6FF00]" />
            </div>
            <h3 className="text-sm font-bold text-white">Zone de Couverture</h3>
            <p className="text-xs text-zinc-400">Tout Dakar, Almadies, VDN & Banlieue</p>
            <span className="inline-block py-1.5 px-3 rounded-xl bg-zinc-800 text-zinc-300 font-bold text-[11px]">
              24H/24 & 7J/7
            </span>
          </div>
        </div>

        {/* Grid FAQ & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* FAQ Accordion */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-black text-white border-b border-zinc-800 pb-2">
              Questions Fréquentes (FAQ)
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-white flex items-center justify-between gap-2 hover:text-[#C6FF00]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180 text-[#C6FF00]' : 'text-zinc-500'}`} />
                  </button>

                  {openFaq === idx && (
                    <div className="p-4 pt-0 text-xs text-zinc-400 border-t border-zinc-800/60 leading-relaxed bg-black/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-black text-white border-b border-zinc-800 pb-2">
              Envoyer un Message
            </h2>

            {formSent ? (
              <div className="p-6 text-center bg-emerald-950/80 border border-emerald-500 rounded-xl text-emerald-400 space-y-2">
                <ShieldCheck className="w-8 h-8 mx-auto" />
                <h4 className="font-bold text-sm text-white">Message Envoyé !</h4>
                <p className="text-xs">Notre équipe vous recontacte dans les 5 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-zinc-400 font-bold mb-1">Votre Nom *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nom complet"
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-bold mb-1">Téléphone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ex: 77 000 00 00"
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-bold mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Votre question ou demande particulière..."
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#C6FF00] hover:bg-[#b0e600] text-black font-extrabold text-xs uppercase flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer au support</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
