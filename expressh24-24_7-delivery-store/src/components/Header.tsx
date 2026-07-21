import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  User, 
  PhoneCall, 
  Menu, 
  X, 
  Clock, 
  ShieldCheck, 
  Compass, 
  Tag, 
  HelpCircle, 
  Lock, 
  MessageSquare
} from 'lucide-react';
import { EXPRESS_H24_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  openCart?: () => void;
  onOpenCart?: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory?: number | null;
  setSelectedCategory?: (catId: number | null) => void;
  isLoggedIn?: boolean;
  userRole?: 'customer' | 'admin';
  user?: { name: string; phone: string; email: string; role: 'customer' | 'admin' } | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  cartCount,
  openCart,
  onOpenCart,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  isLoggedIn,
  userRole,
  user
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleOpenCart = openCart || onOpenCart || (() => {});
  const resolvedIsLoggedIn = isLoggedIn !== undefined ? isLoggedIn : !!user;
  const resolvedRole = userRole || user?.role || 'customer';

  const handleNavClick = (tab: string, categoryId?: number | null) => {
    setCurrentTab(tab);
    if (categoryId !== undefined && setSelectedCategory) {
      setSelectedCategory(categoryId);
    }
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentTab('shop');
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-zinc-800 text-white">
      {/* Top Banner Notice */}
      <div className="bg-[#C6FF00] text-black text-xs font-bold py-1 px-4 text-center flex items-center justify-center gap-2 overflow-hidden">
        <span className="flex h-2 w-2 rounded-full bg-black animate-ping" />
        <span className="tracking-wide">LIVRAISON EXPRESS 15-20 MIN À DAKAR • 24H/24 & 7J/7</span>
        <span className="hidden md:inline">• COMMANDEZ PAR WHATSAPP AU 77 648 14 20</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo ExpressH24 */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-[#C6FF00]/40 group-hover:border-[#C6FF00] transition-all shadow-[0_0_15px_rgba(198,255,0,0.15)]">
              {/* Clock & Cart Icon Design */}
              <div className="relative">
                <Clock className="w-6 h-6 text-[#C6FF00]" />
                <span className="absolute -top-1 -right-1 text-[9px] font-black bg-[#C6FF00] text-black px-1 rounded">24H</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-2xl font-black tracking-tight text-white italic">express</span>
                <span className="text-2xl font-black text-[#C6FF00] italic">H24</span>
              </div>
              <span className="text-[10px] text-zinc-400 font-medium tracking-wider uppercase -mt-1">
                Dakar Express 24/7
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors py-1 ${currentTab === 'home' ? 'text-[#C6FF00] font-bold border-b-2 border-[#C6FF00]' : 'text-zinc-300 hover:text-white'}`}
            >
              Accueil
            </button>

            <button
              onClick={() => handleNavClick('shop', null)}
              className={`transition-colors py-1 ${currentTab === 'shop' ? 'text-[#C6FF00] font-bold border-b-2 border-[#C6FF00]' : 'text-zinc-300 hover:text-white'}`}
            >
              Boutique
            </button>

            <button
              onClick={() => handleNavClick('categories')}
              className={`transition-colors py-1 ${currentTab === 'categories' ? 'text-[#C6FF00] font-bold border-b-2 border-[#C6FF00]' : 'text-zinc-300 hover:text-white'}`}
            >
              Catégories
            </button>

            <button
              onClick={() => handleNavClick('tracking')}
              className={`transition-colors py-1 ${currentTab === 'tracking' ? 'text-[#C6FF00] font-bold border-b-2 border-[#C6FF00]' : 'text-zinc-300 hover:text-white'}`}
            >
              Suivi Commande
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`transition-colors py-1 ${currentTab === 'contact' ? 'text-[#C6FF00] font-bold border-b-2 border-[#C6FF00]' : 'text-zinc-300 hover:text-white'}`}
            >
              Contact & FAQ
            </button>

            {resolvedRole === 'admin' && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`transition-colors py-1 px-3 rounded-lg bg-zinc-800/80 border border-[#C6FF00]/30 text-[#C6FF00] hover:bg-[#C6FF00] hover:text-black font-semibold`}
              >
                Admin
              </button>
            )}
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            
            {/* Search Toggle */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher (ex: Eau, Pampers, Soda)..."
                    className="w-48 sm:w-64 bg-zinc-900 border border-[#C6FF00]/50 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#C6FF00]"
                    autoFocus
                  />
                  <button 
                    type="button" 
                    onClick={() => setSearchOpen(false)}
                    className="ml-1 p-1 text-zinc-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-[#C6FF00] hover:border-zinc-700 transition-colors"
                  title="Rechercher"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Direct WhatsApp Call Button */}
            <a
              href={`https://wa.me/${EXPRESS_H24_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-3 py-2 rounded-lg transition-all shadow-[0_0_10px_rgba(37,211,102,0.3)]"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>77 648 14 20</span>
            </a>

            {/* User Profile / Login */}
            <button
              onClick={() => handleNavClick(resolvedIsLoggedIn ? 'profile' : 'auth')}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-[#C6FF00] hover:border-zinc-700 transition-colors"
              title={resolvedIsLoggedIn ? 'Mon compte' : 'Connexion'}
            >
              <User className="w-5 h-5" />
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={handleOpenCart}
              className="relative p-2 rounded-lg bg-[#C6FF00] text-black font-bold hover:bg-[#b5eb00] transition-transform active:scale-95 shadow-[0_0_15px_rgba(198,255,0,0.3)] flex items-center gap-1.5 px-3"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-xs font-black hidden sm:inline">PANIER</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-black text-[#C6FF00] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-[#C6FF00]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-2 pb-6 space-y-3">
          <div className="pt-2 pb-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleNavClick('shop');
                }
              }}
              placeholder="Rechercher un produit..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C6FF00]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-3 rounded-lg text-left font-medium ${currentTab === 'home' ? 'bg-[#C6FF00] text-black font-bold' : 'bg-zinc-900 text-white'}`}
            >
              Accueil
            </button>

            <button
              onClick={() => handleNavClick('shop', null)}
              className={`p-3 rounded-lg text-left font-medium ${currentTab === 'shop' ? 'bg-[#C6FF00] text-black font-bold' : 'bg-zinc-900 text-white'}`}
            >
              Boutique
            </button>

            <button
              onClick={() => handleNavClick('categories')}
              className={`p-3 rounded-lg text-left font-medium ${currentTab === 'categories' ? 'bg-[#C6FF00] text-black font-bold' : 'bg-zinc-900 text-white'}`}
            >
              Catégories
            </button>

            <button
              onClick={() => handleNavClick('tracking')}
              className={`p-3 rounded-lg text-left font-medium ${currentTab === 'tracking' ? 'bg-[#C6FF00] text-black font-bold' : 'bg-zinc-900 text-white'}`}
            >
              Suivi Commande
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`p-3 rounded-lg text-left font-medium ${currentTab === 'contact' ? 'bg-[#C6FF00] text-black font-bold' : 'bg-zinc-900 text-white'}`}
            >
              Contact & FAQ
            </button>

            <button
              onClick={() => handleNavClick(resolvedIsLoggedIn ? 'profile' : 'auth')}
              className={`p-3 rounded-lg text-left font-medium ${currentTab === 'profile' || currentTab === 'auth' ? 'bg-[#C6FF00] text-black font-bold' : 'bg-zinc-900 text-white'}`}
            >
              Mon Compte
            </button>
          </div>

          <a
            href={`https://wa.me/${EXPRESS_H24_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-bold py-3 rounded-lg shadow-lg"
          >
            <MessageSquare className="w-5 h-5 fill-white" />
            <span>Commander sur WhatsApp (77 648 14 20)</span>
          </a>

          {resolvedRole === 'admin' && (
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full bg-zinc-800 border border-[#C6FF00]/50 text-[#C6FF00] font-bold py-2.5 rounded-lg text-center"
            >
              Tableau de Bord Admin
            </button>
          )}
        </div>
      )}
    </header>
  );
};
