import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="py-12 bg-black text-white min-h-screen border-b border-zinc-900">
      <div className="max-w-3xl mx-auto px-4 space-y-6 text-xs text-zinc-300 leading-relaxed">
        <span className="text-xs font-mono font-bold uppercase text-[#C6FF00] bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
          MENTIONS LÉGALES
        </span>
        <h1 className="text-3xl font-black font-mono text-white">Conditions Générales de Vente (CGV)</h1>
        
        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl space-y-4">
          <section>
            <h3 className="font-bold text-white text-sm mb-1 text-[#C6FF00]">1. Service ExpressH24</h3>
            <p>
              ExpressH24 est un service professionnel de livraison rapide opérant dans la région de Dakar (Sénégal) 24 heures sur 24 et 7 jours sur 7.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-white text-sm mb-1 text-[#C6FF00]">2. Commandes et Délais</h3>
            <p>
              Les commandes sont exécutées dans un délai indicatif de 15 à 20 minutes pour les livraisons Express. L'utilisateur s'engage à fournir des coordonnées téléphoniques et une adresse exacte.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-white text-sm mb-1 text-[#C6FF00]">3. Modalités de Paiement</h3>
            <p>
              Le paiement s'effectue via Wave, Orange Money, carte bancaire ou en espèces directement auprès du livreur. Tous nos prix sont affichés en Francs CFA (FCFA) toutes taxes comprises.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-white text-sm mb-1 text-[#C6FF00]">4. Discrétion et Confidentialité</h3>
            <p>
              ExpressH24 garantit la confidentialité totale de vos achats. Tous les colis sont préparés sous emballage neutre.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
