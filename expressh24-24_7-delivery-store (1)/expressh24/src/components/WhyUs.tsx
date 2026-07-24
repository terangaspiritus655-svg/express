import React from 'react';
import { Zap, Clock, ShieldCheck, EyeOff, Award, Home } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'Livraison Rapide',
      desc: 'Vos commandes sont prises en charge immédiatement et livrées en 15 à 20 minutes chrono.'
    },
    {
      icon: Clock,
      title: 'Disponible 24H/24 • 7J/7',
      desc: 'Jour, nuit, week-ends et jours fériés. Une faim nocturne ou un besoin urgent ? On est là.'
    },
    {
      icon: ShieldCheck,
      title: 'Paiement Sécurisé',
      desc: 'Payez par Wave, Orange Money, Carte bancaire ou directement à la livraison en espèces.'
    },
    {
      icon: EyeOff,
      title: 'Service Discret',
      desc: 'Toutes vos commandes sont emballées de manière totalement neutre et confidentielle.'
    },
    {
      icon: Award,
      title: 'Produits de Qualité',
      desc: 'Des marques vérifiées et des produits 100% authentiques aux normes internationales.'
    },
    {
      icon: Home,
      title: 'Livraison à Domicile',
      desc: 'Directement à votre porte, villa, bureau ou appartement dans tout Dakar et banlieue.'
    }
  ];

  return (
    <section className="py-16 bg-zinc-950 text-white border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C6FF00] bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
            POURQUOI CHOISIR EXPRESSH24
          </span>
          <h2 className="text-3xl font-black mt-3 font-mono">
            La meilleure expérience de livraison express à Dakar
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            Conçu pour vous simplifier la vie au quotidien avec zéro compromis sur la rapidité et le service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div
                key={index}
                className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 hover:border-[#C6FF00]/50 transition-all hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-black border border-zinc-800 flex items-center justify-center text-[#C6FF00] mb-4 group-hover:scale-110 group-hover:border-[#C6FF00] transition-transform">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <span>✓ {item.title}</span>
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
