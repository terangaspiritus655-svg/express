import React from 'react';
import { Truck, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setCurrentView, categories } = useShop();

  return (
    <footer className="bg-black text-white border-t border-zinc-900 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-[#C6FF00]/40 flex items-center justify-center">
                <Truck className="w-5 h-5 text-[#C6FF00]" />
              </div>
              <span className="text-xl font-black font-mono tracking-wider">
                EXPRESS<span className="text-[#C6FF00]">H24</span>
              </span>
            </div>

            <p className="text-zinc-400 leading-relaxed pr-4">
              Service de livraison express N°1 à Dakar.
              Vos produits d'hygiène, boissons, bébés, snacks et entretien livrés chez vous en 15 à 20 minutes, 24H/24 et 7J/7.
            </p>

            <div className="space-y-2 text-zinc-300 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C6FF00]" />
                <a href="tel:+221776481420" className="hover:underline font-bold">+221 77 648 14 20</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C6FF00]" />
                <span>Siège ExpressH24, Route des Almadies, Dakar</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C6FF00]" />
                <span>Service Continu 24 Heures / 24 • 7 Jours / 7</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-mono font-bold uppercase text-[#C6FF00]">Navigation</h4>
            <ul className="space-y-2 text-zinc-400">
              <li><button onClick={() => setCurrentView('home')} className="hover:text-white transition-colors">Accueil</button></li>
              <li><button onClick={() => setCurrentView('shop')} className="hover:text-white transition-colors">Toute la boutique</button></li>
              <li><button onClick={() => setCurrentView('categories')} className="hover:text-white transition-colors">Nos 13 catégories</button></li>
              <li><button onClick={() => setCurrentView('tracking')} className="hover:text-white transition-colors">Suivi de commande</button></li>
              <li><button onClick={() => setCurrentView('contact')} className="hover:text-white transition-colors">Nous contacter</button></li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div className="space-y-3">
            <h4 className="font-mono font-bold uppercase text-[#C6FF00]">Rayons Populaires</h4>
            <ul className="space-y-2 text-zinc-400">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button onClick={() => setCurrentView('category-detail', cat.id)} className="hover:text-white transition-colors">
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Legal & Security */}
          <div className="space-y-3">
            <h4 className="font-mono font-bold uppercase text-[#C6FF00]">Informations</h4>
            <ul className="space-y-2 text-zinc-400">
              <li><button onClick={() => setCurrentView('faq')} className="hover:text-white transition-colors">Foire aux questions (FAQ)</button></li>
              <li><button onClick={() => setCurrentView('terms')} className="hover:text-white transition-colors">Conditions Générales (CGV)</button></li>
              <li><button onClick={() => setCurrentView('privacy')} className="hover:text-white transition-colors">Politique de confidentialité</button></li>
            </ul>

            <div className="pt-2">
              <span className="text-[10px] text-zinc-500 font-mono block mb-1.5">Moyens de paiement :</span>
              <div className="flex items-center gap-2 flex-wrap text-[10px] text-zinc-300 font-bold font-mono">
                <span className="bg-sky-950 text-sky-400 px-2 py-0.5 rounded border border-sky-800">WAVE</span>
                <span className="bg-orange-950 text-orange-400 px-2 py-0.5 rounded border border-orange-800">ORANGE MONEY</span>
                <span className="bg-zinc-900 text-white px-2 py-0.5 rounded border border-zinc-800">VISA</span>
                <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">CASH 24H</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-4">
          <p>© 2026 ExpressH24 Sénégal. Tous droits réservés. Service de livraison express à Dakar.</p>
          <div className="flex items-center gap-4">
            <span>Développé pour ExpressH24 Dakar</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
