import React from 'react';
import { Clock, ShieldCheck, Zap, Phone, MapPin, MessageSquare, Heart, Lock } from 'lucide-react';
import { EXPRESS_H24_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  setSelectedCategory: (catId: number | null) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, setSelectedCategory }) => {
  return (
    <footer className="bg-black text-zinc-400 border-t border-zinc-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-zinc-800">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="p-2.5 rounded-lg bg-[#C6FF00]/10 text-[#C6FF00]">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-xs sm:text-sm font-bold">Livraison Ultra-Rapide</h4>
              <p className="text-[11px] text-zinc-500">15 à 20 minutes chrono à Dakar</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="p-2.5 rounded-lg bg-[#C6FF00]/10 text-[#C6FF00]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-xs sm:text-sm font-bold">Disponible 24H/24</h4>
              <p className="text-[11px] text-zinc-500">7 jours sur 7, jour et nuit</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="p-2.5 rounded-lg bg-[#C6FF00]/10 text-[#C6FF00]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-xs sm:text-sm font-bold">Service Discret</h4>
              <p className="text-[11px] text-zinc-500">Emballage neutre et sécurisé</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="p-2.5 rounded-lg bg-[#C6FF00]/10 text-[#C6FF00]">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-xs sm:text-sm font-bold">Paiements Sécurisés</h4>
              <p className="text-[11px] text-zinc-500">Wave, Orange Money, Carte, Cash</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#C6FF00] text-black font-black flex items-center justify-center italic text-xl">
                24
              </div>
              <span className="text-2xl font-black text-white italic tracking-tight">
                express<span className="text-[#C6FF00]">H24</span>
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              ExpressH24 est le service N°1 de livraison express 24h/24 & 7j/7 à Dakar. 
              Vos essentiels du quotidien (boissons fraîches, nourriture, hygiène, dépannage) chez vous en 15 à 20 minutes.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-[#C6FF00]" />
                <span>Couverture : Dakar Plateau, Almadies, Mermoz, Yoff, VDN, Banlieue...</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Phone className="w-4 h-4 text-[#C6FF00]" />
                <span>Téléphone : +221 77 648 14 20</span>
              </div>
            </div>

            <a
              href={`https://wa.me/${EXPRESS_H24_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all mt-2"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Commander directement sur WhatsApp</span>
            </a>
          </div>

          {/* Essential Categories */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-[#C6FF00] pl-2">
              Nos Rayons
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setCurrentTab('shop'); setSelectedCategory(7); }} className="hover:text-[#C6FF00]">Boissons & Fraîcheur</button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('shop'); setSelectedCategory(8); }} className="hover:text-[#C6FF00]">Snacks & Biscuits</button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('shop'); setSelectedCategory(1); }} className="hover:text-[#C6FF00]">Nettoyage Maison</button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('shop'); setSelectedCategory(4); }} className="hover:text-[#C6FF00]">Hygiène & Soins</button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('shop'); setSelectedCategory(9); }} className="hover:text-[#C6FF00]">Produits Bébé</button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('shop'); setSelectedCategory(11); }} className="hover:text-[#C6FF00]">Dépannage High-Tech</button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('categories'); }} className="text-[#C6FF00] font-bold hover:underline pt-1">Voir toutes les 13 catégories →</button>
              </li>
            </ul>
          </div>

          {/* Navigation Quick Links */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-[#C6FF00] pl-2">
              Informations
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentTab('home')} className="hover:text-[#C6FF00]">Accueil</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('shop')} className="hover:text-[#C6FF00]">Catalogue Complet</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('tracking')} className="hover:text-[#C6FF00]">Suivre ma commande GPS</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('contact')} className="hover:text-[#C6FF00]">Foire Aux Questions (FAQ)</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('contact')} className="hover:text-[#C6FF00]">Service Client Express</button>
              </li>
            </ul>
          </div>

          {/* Legal & Payment Methods */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-[#C6FF00] pl-2">
              Paiements & Légal
            </h5>
            <div className="space-y-3 text-xs">
              <p className="text-zinc-500">Modes de paiement acceptés à Dakar :</p>
              
              <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                <span className="bg-blue-600 text-white px-2 py-1 rounded">WAVE</span>
                <span className="bg-orange-500 text-white px-2 py-1 rounded">ORANGE MONEY</span>
                <span className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded border border-zinc-700">CARTE BANK</span>
                <span className="bg-[#C6FF00] text-black px-2 py-1 rounded">ESPÈCES</span>
              </div>

              <ul className="space-y-1 pt-2 text-[11px]">
                <li>
                  <button onClick={() => setCurrentTab('legal')} className="hover:text-zinc-300">Conditions Générales de Vente</button>
                </li>
                <li>
                  <button onClick={() => setCurrentTab('legal')} className="hover:text-zinc-300">Politique de Confidentialité</button>
                </li>
                <li>
                  <button onClick={() => setCurrentTab('legal')} className="hover:text-zinc-300">Règlementation Alcool (+18 ans)</button>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} ExpressH24 Dakar. Tous droits réservés.</p>
          <div className="flex items-center gap-2">
            <span>Livraison Express 24H/24 • 7J/7</span>
            <span className="text-[#C6FF00]">•</span>
            <button onClick={() => setCurrentTab('admin')} className="text-zinc-600 hover:text-zinc-400">Portail Admin</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
