import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Combien de temps prend la livraison à Dakar ?',
      a: 'Nos livreurs en scooter patrouillent dans tous les quartiers de Dakar (Almadies, Mermoz, Plateau, Fann, Yoff, Ouakam, Parcelles...). En mode Express, vous êtes livré en 15 à 20 minutes chrono.'
    },
    {
      q: 'Quels sont vos horaires de service ?',
      a: 'ExpressH24 est disponible 24H/24 et 7J/7, y compris les week-ends, les nuits et les jours fériés. Vous pouvez commander à tout moment.'
    },
    {
      q: 'Comment effectuer le paiement ?',
      a: 'Vous avez le choix : paiement en ligne par Wave Sénégal, Orange Money, carte bancaire (Visa/Mastercard), ou directement en espèces au livreur lors de la remise du colis.'
    },
    {
      q: 'Puis-je commander directement sur WhatsApp ?',
      a: 'Oui ! Cliquez sur le bouton "Commander sur WhatsApp" pour envoyer un message pré-rempli avec votre panier au +221 77 648 14 20.'
    },
    {
      q: 'Comment suivre ma commande en direct ?',
      a: 'Après avoir validé votre commande, vous recevez un numéro unique (ex: EXH-2026-8912). Rendez-vous sur la page "Suivi Commande" pour visualiser l\'état et les coordonnées du livreur.'
    },
    {
      q: 'Les emballages sont-ils discrets ?',
      a: 'Absolument. Nous garantissons un service 100% discret avec des emballages neutres et scellés pour préserver votre vie privée.'
    }
  ];

  return (
    <div className="py-12 bg-black text-white min-h-screen border-b border-zinc-900">
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C6FF00] bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
            QUESTIONS FRÉQUENTES
          </span>
          <h1 className="text-3xl font-black font-mono">Foire Aux Questions (FAQ)</h1>
          <p className="text-xs text-zinc-400">
            Retrouvez toutes les réponses concernant nos délais, paiements et zones de livraison à Dakar.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((f, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 font-bold text-sm text-white flex items-center justify-between gap-4 hover:bg-zinc-900 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#C6FF00] shrink-0" />
                    {f.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#C6FF00]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-zinc-300 leading-relaxed border-t border-zinc-900">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
