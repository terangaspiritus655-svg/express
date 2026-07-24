import React from 'react';
import { Truck, Clock, ShieldCheck, Zap, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Hero: React.FC = () => {
  const { setCurrentView, getWhatsAppUrl } = useShop();

  return (
    <section className="relative bg-black text-white overflow-hidden py-12 lg:py-20 border-b border-zinc-900">
      {/* Background Neon Grid Subtle Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#C6FF00]/10 via-black to-black opacity-80 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#C6FF00]/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Live Badge */}
            <div className="inline-flex items-center gap-2 bg-zinc-900/90 border border-[#C6FF00]/30 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-[#C6FF00] shadow-[0_0_15px_rgba(198,255,0,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#C6FF00] animate-ping" />
              <span>SÉNÉGAL • DAKAR 24/7</span>
              <span className="text-zinc-500">•</span>
              <span className="text-white">EN DIRECT EN MOINS DE 20 MIN</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] font-mono">
              Vos essentiels livrés en <br className="hidden sm:inline" />
              <span className="text-[#C6FF00] underline decoration-[#C6FF00]/40 underline-offset-8">
                15 à 20 minutes
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-zinc-300 max-w-2xl font-light leading-relaxed">
              ExpressH24 est votre service de livraison ultra-rapide à Dakar.
              Boissons fraîches, produits d'hygiène, paquets bébés, snacks, dépannages maison et plus encore.
              Disponible <span className="font-bold text-white">24H/24 et 7J/7</span>, jour et nuit.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setCurrentView('shop')}
                className="bg-[#C6FF00] hover:bg-[#b0e600] text-black font-extrabold px-8 py-4 rounded-xl text-sm flex items-center gap-3 transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(198,255,0,0.3)]"
              >
                <span>Commander maintenant</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-bold px-6 py-4 rounded-xl text-sm flex items-center gap-3 transition-all hover:border-[#25D366]"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
                <span>Commander sur WhatsApp</span>
              </a>
            </div>

            {/* Feature Highlights Ticker */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-900 text-xs text-zinc-400">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#C6FF00]">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">15 - 20 Min</p>
                  <p className="text-[10px] text-zinc-400">Chrono à Dakar</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#C6FF00]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Service 24/7</p>
                  <p className="text-[10px] text-zinc-400">365 jours / an</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#C6FF00]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Wave & Orange</p>
                  <p className="text-[10px] text-zinc-400">Paiement facile</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#C6FF00]/40 to-emerald-500/30 rounded-3xl blur-xl opacity-50" />

              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/90 shadow-2xl">
                <img
                  src="/src/assets/images/expressh24_hero_scooter_1784734224502.jpg"
                  alt="ExpressH24 Scooter Dakar"
                  className="w-full h-80 lg:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback high quality delivery image if needed
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                {/* Overlaid Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/85 backdrop-blur-md p-4 rounded-xl border border-zinc-800 flex items-center justify-between text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C6FF00] text-black font-black flex items-center justify-center shrink-0">
                      24H
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Livraison Express Active</h4>
                      <p className="text-xs text-zinc-400">Livreurs en patrouille à Almadies, Mermoz & Plateau</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#C6FF00] font-bold bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
                    776481420
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
