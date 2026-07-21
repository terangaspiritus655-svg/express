import React from 'react';
import { ShieldCheck, Lock, Scale, AlertTriangle } from 'lucide-react';

export const LegalPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white pb-20 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="border-b border-zinc-800 pb-4 text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#C6FF00] uppercase tracking-wider block">
            Cadre Légal & Réglementation Sénégal
          </span>
          <h1 className="text-3xl font-black italic text-white">
            Conditions Générales & Confidentialité
          </h1>
        </div>

        <div className="space-y-6 text-xs text-zinc-300 leading-relaxed bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8">
          
          <section className="space-y-2">
            <h2 className="text-base font-black text-white flex items-center gap-2 border-b border-zinc-800 pb-2">
              <Scale className="w-4 h-4 text-[#C6FF00]" />
              <span>1. Services de Livraison ExpressH24</span>
            </h2>
            <p>
              ExpressH24 propose un service de livraison express 24h/24 et 7j/7 d'articles de première nécessité, hygiène, ménage, snacks, boissons et dépannage électronique sur l'agglomération de Dakar. Les prix figurant sur le catalogue web sont strictement conformes aux tarifs officiels ExpressH24 en Francs CFA (FCFA).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-white flex items-center gap-2 border-b border-zinc-800 pb-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span>2. Vente de Boissons Alcoolisées et Tabac (+18 Ans)</span>
            </h2>
            <p>
              Conformément aux lois applicables en République du Sénégal, la vente de boissons alcoolisées et de produits du tabac est strictement réservée aux personnes âgées de 18 ans et plus. Le livreur ExpressH24 se réserve le droit d'exiger la présentation d'une pièce d'identité officielle à la livraison.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-white flex items-center gap-2 border-b border-zinc-800 pb-2">
              <Lock className="w-4 h-4 text-[#C6FF00]" />
              <span>3. Politique de Confidentialité & Traitement Discret</span>
            </h2>
            <p>
              Toutes les commandes sont emballées dans des sachets neutres et opaques afin de garantir un anonymat absolu à nos clients. Vos données personnelles (nom, téléphone, adresse) sont uniquement utilisées pour l'Acheminement de vos commandes et ne sont jamais cédées à des tiers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-white flex items-center gap-2 border-b border-zinc-800 pb-2">
              <ShieldCheck className="w-4 h-4 text-[#C6FF00]" />
              <span>4. Horaires & Zone de Couverture</span>
            </h2>
            <p>
              La livraison s'effectue 24h/24 dans les districts de Dakar (Almadies, Ngor, Mermoz, Sacré-Cœur, VDN, Yoff, Ouakam, Fann, Point E, Plateau, Médina, Sicap, Parcelles Assainies, Guédiawaye, Pikine, Keur Massar, Rufisque, Diamniadio).
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
