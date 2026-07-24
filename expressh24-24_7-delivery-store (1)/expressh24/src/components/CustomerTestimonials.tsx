import React from 'react';
import { Star, Quote, CheckCircle2, MapPin } from 'lucide-react';

export const CustomerTestimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Moussa Diop',
      quartier: 'Almadies, Dakar',
      rating: 5,
      comment: 'Livraison en 18 minutes chrono à 2h du matin ! Les boissons étaient glacées et le livreur super poli. ExpressH24 est devenu indispensable pour mes soirées.',
      date: 'Hier',
      verified: true
    },
    {
      id: 2,
      name: 'Fatou Kiné Sow',
      quartier: 'Plateau / Centre Ville',
      rating: 5,
      comment: 'J’ai fait livrer des couches Huggies et du lait de bébé en urgence un dimanche après-midi. Reçu en 15 min via Wave. Service impeccable !',
      date: 'Il y a 2 jours',
      verified: true
    },
    {
      id: 3,
      name: 'Antoine Morel',
      quartier: 'Mermoz Pyrotechnie',
      rating: 5,
      comment: 'Très pratique quand on manque d’eau minerale ou d’apéritifs au milieu du dîner. Prix super raisonnables et suivi de commande ultra précis.',
      date: 'Il y a 3 jours',
      verified: true
    }
  ];

  return (
    <section className="py-16 bg-zinc-950 border-b border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C6FF00] bg-zinc-900 border border-zinc-800 px-3.5 py-1 rounded-full">
            AVIS CLIENTS SÉNÉGAL
          </span>
          <h2 className="text-3xl font-black text-white mt-3 font-mono">
            Ils Nous Font Confiance à Dakar
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            Plus de 20 000 Dakarois commandent leurs essentiels jour et nuit sur ExpressH24.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-black border border-zinc-800 p-6 rounded-2xl relative flex flex-col justify-between hover:border-[#C6FF00]/40 transition-colors shadow-xl"
            >
              <Quote className="w-8 h-8 text-zinc-800 absolute top-4 right-4" />

              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C6FF00] text-[#C6FF00]" />
                  ))}
                </div>

                <p className="text-sm text-zinc-300 italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                    <span>{t.name}</span>
                    {t.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C6FF00]" title="Acheteur vérifié" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-zinc-500 font-mono mt-0.5">
                    <MapPin className="w-3 h-3 text-[#C6FF00]" />
                    <span>{t.quartier}</span>
                  </div>
                </div>

                <span className="text-[10px] text-zinc-500 font-mono">{t.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
