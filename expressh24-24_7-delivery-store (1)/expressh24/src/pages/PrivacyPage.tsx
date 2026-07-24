import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="py-12 bg-black text-white min-h-screen border-b border-zinc-900">
      <div className="max-w-3xl mx-auto px-4 space-y-6 text-xs text-zinc-300 leading-relaxed">
        <span className="text-xs font-mono font-bold uppercase text-[#C6FF00] bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
          PROTECTION DES DONNÉES
        </span>
        <h1 className="text-3xl font-black font-mono text-white">Politique de Confidentialité</h1>
        
        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl space-y-4">
          <section>
            <h3 className="font-bold text-white text-sm mb-1 text-[#C6FF00]">1. Collecte des Données</h3>
            <p>
              Nous collectons uniquement les informations nécessaires au traitement et à la livraison de vos commandes : Nom, numéro de téléphone WhatsApp et adresse de livraison à Dakar.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-white text-sm mb-1 text-[#C6FF00]">2. Utilisation des Informations</h3>
            <p>
              Vos coordonnées sont transmises au livreur uniquement durant le temps d'exécution de la course. Nous ne revendons jamais vos données personnelles à des tiers.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-white text-sm mb-1 text-[#C6FF00]">3. Sécurité des Transactions</h3>
            <p>
              Les paiements en ligne par Wave et Orange Money sont sécurisés via les protocoles cryptés officiels des opérateurs.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
