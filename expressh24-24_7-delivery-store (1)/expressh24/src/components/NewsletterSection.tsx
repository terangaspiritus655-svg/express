import React, { useState } from 'react';
import { Mail, Send, Sparkles, CheckCircle2, Copy } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const { applyCoupon } = useShop();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  const copyVoucher = () => {
    navigator.clipboard.writeText('EXPRESS1000');
    setCopied(true);
    applyCoupon('EXPRESS1000');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-14 bg-black border-b border-zinc-900 relative">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C6FF00] bg-black border border-zinc-800 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            OFFRE DE BIENVENUE DAKAR
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-white font-mono">
            Recevez 1 000 FCFA Offerts sur Votre Première Commande
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl mx-auto">
            Abonnez-vous à la newsletter ExpressH24 pour recevoir vos bons de réduction exclusifs, les ventes flash du week-end et les nouveaux arrivages à Dakar.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email ou numéro WhatsApp..."
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#C6FF00]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#C6FF00] hover:bg-[#b0e600] text-black font-extrabold px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-2 shrink-0 transition-transform active:scale-95"
              >
                <span>Obtenir mon coupon</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div className="mt-6 p-4 bg-[#C6FF00]/10 border border-[#C6FF00]/40 rounded-2xl max-w-md mx-auto text-center">
              <div className="flex items-center justify-center gap-2 text-[#C6FF00] font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Inscription réussie ! Voici votre code promo :</span>
              </div>

              <div className="mt-3 flex items-center justify-between bg-black border border-[#C6FF00] p-3 rounded-xl">
                <span className="font-mono text-lg font-black text-[#C6FF00] tracking-widest">
                  EXPRESS1000
                </span>
                <button
                  onClick={copyVoucher}
                  className="bg-[#C6FF00] text-black text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-[#b0e600]"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Appliqué !' : 'Copier & Appliquer'}</span>
                </button>
              </div>
              <p className="text-[11px] text-zinc-400 mt-2">
                1 000 FCFA de réduction applicables immédiatement dans votre panier !
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
