import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { getWhatsAppUrl } = useShop();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-black text-white min-h-screen border-b border-zinc-900">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        
        {/* Title Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C6FF00] bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
            CONTACT & ASSISTANCE
          </span>
          <h1 className="text-3xl font-black font-mono">Contactez ExpressH24 Dakar</h1>
          <p className="text-xs text-zinc-400">
            Une question, une suggestion ou besoin d'une commande spéciale ? Notre équipe vous répond 24H/24.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Direct Contact Info */}
          <div className="md:col-span-5 bg-zinc-950 border border-zinc-800 p-6 rounded-2xl space-y-6">
            <h3 className="text-sm font-mono font-bold uppercase text-[#C6FF00]">Coordonnées Directes</h3>

            <div className="space-y-4 text-xs">
              <a
                href="tel:+221776481420"
                className="flex items-start gap-3 p-3 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-[#C6FF00] transition-colors"
              >
                <div className="p-2 bg-[#C6FF00] text-black rounded-lg shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Téléphone & WhatsApp</h4>
                  <p className="text-zinc-400 font-mono mt-0.5">+221 77 648 14 20</p>
                  <p className="text-[10px] text-[#C6FF00] font-mono">Appel direct 24H/24</p>
                </div>
              </a>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-[#25D366] transition-colors"
              >
                <div className="p-2 bg-[#25D366] text-black rounded-lg shrink-0">
                  <MessageCircle className="w-4 h-4 fill-black" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Commande WhatsApp</h4>
                  <p className="text-zinc-400 mt-0.5">Contact direct sur le 77 648 14 20</p>
                  <p className="text-[10px] text-emerald-400 font-mono">Réponse en moins de 2 min</p>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                <div className="p-2 bg-zinc-800 text-[#C6FF00] rounded-lg shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Adresse Siège & Dépôt</h4>
                  <p className="text-zinc-400 mt-0.5">Route des Almadies, Dakar, Sénégal</p>
                  <p className="text-[10px] text-zinc-500">Zone de couverture : Tout Dakar</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                <div className="p-2 bg-zinc-800 text-[#C6FF00] rounded-lg shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Horaires de Livraison</h4>
                  <p className="text-zinc-400 mt-0.5">24 Heures sur 24 • 7 Jours sur 7</p>
                  <p className="text-[10px] text-[#C6FF00] font-mono">Service continu jour & nuit</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7 bg-zinc-950 border border-zinc-800 p-6 rounded-2xl">
            <h3 className="text-sm font-mono font-bold uppercase text-[#C6FF00] mb-4">Envoyer un message</h3>

            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 bg-[#C6FF00] text-black rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Message transmis !</h4>
                <p className="text-xs text-zinc-400">
                  Merci {name}, notre équipe ExpressH24 vous recontactera très rapidement au {phone}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Nom complet *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Fatou Sow"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Téléphone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+221 77 123 45 67"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-[#C6FF00] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Votre message *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Posez votre question ou détaillez votre besoin..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C6FF00] hover:bg-[#b0e600] text-black font-extrabold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer le message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
