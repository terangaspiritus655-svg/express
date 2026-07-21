import React from 'react';
import { Category, Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import expressScooterImg from '../assets/images/express_h24_scooter_1784675513399.jpg';
import { 
  Zap, 
  Clock, 
  ShieldCheck, 
  Check, 
  MessageSquare, 
  ArrowRight, 
  Sparkles, 
  ShoppingBag,
  Flame,
  PhoneCall,
  HeartHandshake,
  PackageCheck
} from 'lucide-react';
import { EXPRESS_H24_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface HomeProps {
  categories: Category[];
  featuredProducts: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenDetail: (product: Product) => void;
  onRequireAgeCheck: (product: Product) => void;
  setCurrentTab: (tab: string) => void;
  setSelectedCategory: (catId: number | null) => void;
}

export const Home: React.FC<HomeProps> = ({
  categories,
  featuredProducts,
  onAddToCart,
  onOpenDetail,
  onRequireAgeCheck,
  setCurrentTab,
  setSelectedCategory
}) => {

  const handleCategoryClick = (catId: number) => {
    setSelectedCategory(catId);
    setCurrentTab('shop');
  };

  return (
    <div className="min-h-screen bg-black text-white space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-16 overflow-hidden border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-[#C6FF00]/40 text-xs font-bold text-[#C6FF00]">
                <Sparkles className="w-4 h-4 text-[#C6FF00]" />
                <span>N°1 DE LA LIVRAISON EXPRESS À DAKAR</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black italic tracking-tight text-white leading-none">
                Vos essentiels livrés en <span className="text-[#C6FF00] underline decoration-[#C6FF00]/40">15 à 20 minutes</span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-xl font-normal leading-relaxed">
                Boissons bien glacées, snacks, hygiène, produits de nettoyage, dépannage high-tech et épicerie. 
                <strong className="text-white font-bold"> Disponible 24H/24 et 7J/7</strong> partout à Dakar.
              </p>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setCurrentTab('shop');
                  }}
                  className="py-4 px-8 rounded-2xl bg-[#C6FF00] hover:bg-[#b5eb00] text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(198,255,0,0.35)] transform hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Commander maintenant</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <a
                  href={`https://wa.me/${EXPRESS_H24_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <MessageSquare className="w-5 h-5 fill-white" />
                  <span>WhatsApp : 77 648 14 20</span>
                </a>
              </div>

              {/* Key Trust Signals */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-zinc-800 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C6FF00]" />
                  <span>Service 24H/24 • 7J/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#C6FF00]" />
                  <span>Chrono 15-20 Min</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C6FF00]" />
                  <span>Emballage Neutre</span>
                </div>
              </div>

            </div>

            {/* Right Hero Image / Scooter Display */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden border-2 border-[#C6FF00]/40 shadow-[0_0_40px_rgba(198,255,0,0.2)] bg-gradient-to-b from-zinc-900 to-black">
                
                <img
                  src={expressScooterImg}
                  alt="ExpressH24 Scooter Dakar"
                  className="w-full h-[380px] object-cover object-center"
                />

                {/* Floating WhatsApp Badge on Banner */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/90 backdrop-blur-md p-4 rounded-2xl border border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#C6FF00] font-black uppercase tracking-wider block">
                      COMMANDE RAPIDE SANS COMPTE
                    </span>
                    <span className="text-sm font-black text-white">77 648 14 20</span>
                  </div>
                  
                  <a
                    href={`https://wa.me/${EXPRESS_H24_WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors"
                  >
                    <MessageSquare className="w-5 h-5 fill-white" />
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE EXPRESSH24 BADGES BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-center text-xs font-black uppercase text-zinc-400 tracking-widest mb-6">
            Pourquoi choisir ExpressH24 ?
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            
            <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/80 flex flex-col items-center">
              <Zap className="w-6 h-6 text-[#C6FF00] mb-1" />
              <span className="text-xs font-bold text-white">✓ Livraison rapide</span>
              <span className="text-[10px] text-zinc-500">15-20 minutes</span>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/80 flex flex-col items-center">
              <Clock className="w-6 h-6 text-[#C6FF00] mb-1" />
              <span className="text-xs font-bold text-white">✓ Disponible 24H</span>
              <span className="text-[10px] text-zinc-500">7j/7 jour et nuit</span>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/80 flex flex-col items-center">
              <ShieldCheck className="w-6 h-6 text-[#C6FF00] mb-1" />
              <span className="text-xs font-bold text-white">✓ Paiement sécurisé</span>
              <span className="text-[10px] text-zinc-500">Wave, OM, Carte, Cash</span>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/80 flex flex-col items-center">
              <HeartHandshake className="w-6 h-6 text-[#C6FF00] mb-1" />
              <span className="text-xs font-bold text-white">✓ Service discret</span>
              <span className="text-[10px] text-zinc-500">Emballage anonyme</span>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/80 flex flex-col items-center">
              <PackageCheck className="w-6 h-6 text-[#C6FF00] mb-1" />
              <span className="text-xs font-bold text-white">✓ Produits de qualité</span>
              <span className="text-[10px] text-zinc-500">Marques certifiées</span>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/80 flex flex-col items-center">
              <PhoneCall className="w-6 h-6 text-[#C6FF00] mb-1" />
              <span className="text-xs font-bold text-white">✓ Suivi WhatsApp</span>
              <span className="text-[10px] text-zinc-500">Assistance 24/7</span>
            </div>

          </div>
        </div>
      </section>

      {/* OFFICIAL CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-bold text-[#C6FF00] uppercase tracking-wider block">
              Nos 13 Rayons Officiels
            </span>
            <h2 className="text-2xl font-black text-white">Explorer par Catégorie</h2>
          </div>

          <button
            onClick={() => setCurrentTab('categories')}
            className="text-xs font-bold text-[#C6FF00] hover:underline flex items-center gap-1"
          >
            <span>Toutes les catégories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group relative bg-zinc-900 border border-zinc-800 hover:border-[#C6FF00]/80 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(198,255,0,0.15)]"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden mb-3 bg-black border border-zinc-800">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <h3 className="text-xs font-bold text-white group-hover:text-[#C6FF00] transition-colors leading-tight line-clamp-2">
                {cat.name}
              </h3>

              {cat.badge && (
                <span className="text-[9px] text-zinc-400 mt-1 block">
                  {cat.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-bold text-[#C6FF00] uppercase tracking-wider block">
              Sélection Populaire Dakar
            </span>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <Flame className="w-6 h-6 text-[#C6FF00]" />
              <span>Produits Incontournables</span>
            </h2>
          </div>

          <button
            onClick={() => {
              setSelectedCategory(null);
              setCurrentTab('shop');
            }}
            className="text-xs font-bold text-[#C6FF00] hover:underline flex items-center gap-1"
          >
            <span>Voir tout le catalogue (102+ articles)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.slice(0, 12).map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onAddToCart={onAddToCart}
              onOpenDetail={onOpenDetail}
              onRequireAgeCheck={onRequireAgeCheck}
            />
          ))}
        </div>
      </section>

      {/* WHATSAPP DIRECT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-zinc-900 via-black to-zinc-900 border border-[#25D366]/40 p-8 sm:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-[#25D366]/20 text-[#25D366] text-xs font-black uppercase">
              RÉPONSE IMMÉDIATE SUR WHATSAPP
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white">
              Une commande sur mesure ? Des questions sur un produit ?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300">
              Envoyez un message court à notre équipe de dispatch ExpressH24. Nous traitons votre demande en direct !
            </p>
          </div>

          <a
            href={`https://wa.me/${EXPRESS_H24_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-4 px-8 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm uppercase tracking-wider flex items-center gap-3 transition-all shadow-[0_0_25px_rgba(37,211,102,0.4)] whitespace-nowrap"
          >
            <MessageSquare className="w-5 h-5 fill-white" />
            <span>COMMANDER AU 77 648 14 20</span>
          </a>

        </div>
      </section>

    </div>
  );
};
