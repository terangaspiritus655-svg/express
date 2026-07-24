import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  MessageCircle,
  Clock,
  MapPin,
  Heart,
  ShieldCheck,
  User,
  Sliders,
  Menu,
  X,
  Truck,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { DAKAR_NEIGHBORHOODS } from '../data/neighborhoods';

export const Header: React.FC = () => {
  const {
    products,
    cartCount,
    favorites,
    searchQuery,
    setSearchQuery,
    selectedNeighborhood,
    setSelectedNeighborhood,
    setIsCartOpen,
    setIsAuthOpen,
    user,
    currentView,
    setCurrentView,
    isAdminMode,
    setIsAdminMode,
    getWhatsAppUrl,
    addToCart,
    setSelectedProductDetail
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Filter products for instant search preview
  const searchResults = searchQuery.trim().length >= 2
    ? products.filter((p) => {
        const q = searchQuery.toLowerCase();
        const nameMatch = p.name.toLowerCase().includes(q);
        const skuMatch = p.sku?.toLowerCase().includes(q);
        const brandMatch = p.brand?.toLowerCase().includes(q);
        const catMatch = p.categoryName.toLowerCase().includes(q);
        const kwMatch = Array.isArray(p.keywords)
          ? p.keywords.some((k) => k.toLowerCase().includes(q))
          : typeof p.keywords === 'string' && p.keywords.toLowerCase().includes(q);
        return nameMatch || skuMatch || brandMatch || catMatch || kwMatch;
      }).slice(0, 6)
    : [];

  const navLinks = [
    { id: 'home', label: 'Accueil' },
    { id: 'shop', label: 'Boutique' },
    { id: 'categories', label: 'Catégories' },
    { id: 'tracking', label: 'Suivi Commande' },
    { id: 'contact', label: 'Contact' },
    { id: 'faq', label: 'FAQ' }
  ];

  const handleNavClick = (viewId: string) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#000000]/95 backdrop-blur-md border-b border-zinc-800 text-white">
      {/* Top Banner Bar */}
      <div className="bg-[#C6FF00] text-black text-xs py-1.5 px-4 font-bold tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 bg-black text-[#C6FF00] px-2 py-0.5 rounded text-[10px] uppercase font-black">
              24H/24 • 7J/7
            </span>
            <span className="hidden sm:inline">⚡ LIVRAISON EXPRESS À DAKAR EN 15 À 20 MINUTES</span>
            <span className="sm:hidden">⚡ LIVRAISON DAKAR 15-20 MIN</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="tel:+221776481420"
              className="hover:underline flex items-center gap-1 font-extrabold"
            >
              📞 77 648 14 20
            </a>
            <div className="hidden md:flex items-center gap-1 text-black/80 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Service continu jour & nuit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-[#C6FF00]/40 flex items-center justify-center shadow-[0_0_15px_rgba(198,255,0,0.2)] group-hover:scale-105 transition-transform">
            <Truck className="w-6 h-6 text-[#C6FF00]" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xl font-black tracking-wider uppercase text-white font-mono">
                EXPRESS<span className="text-[#C6FF00]">H24</span>
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 tracking-widest uppercase font-medium">
              SÉNÉGAL • DAKAR 24/7
            </p>
          </div>
        </button>

        {/* Neighborhood Picker (Dakar Quartier) */}
        <div className="hidden lg:flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs">
          <MapPin className="w-4 h-4 text-[#C6FF00] shrink-0" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-zinc-400">Livrer à</span>
            <select
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer pr-1"
            >
              {DAKAR_NEIGHBORHOODS.map((n) => (
                <option key={n.name} value={n.name} className="bg-zinc-900 text-white">
                  {n.name} ({n.expressTimeMin} min)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onFocus={() => setShowSearchDropdown(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchDropdown(true);
            }}
            placeholder="Rechercher par nom, marque, SKU (ex: Flag, Huggies, Heineken)..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#C6FF00] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setShowSearchDropdown(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Instant Search Live Results Dropdown */}
          {showSearchDropdown && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-2 z-50 divide-y divide-zinc-900">
              {searchResults.map((p) => (
                <div
                  key={p.id}
                  className="p-2.5 hover:bg-zinc-900 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors"
                  onClick={() => {
                    setSelectedProductDetail(p);
                    setShowSearchDropdown(false);
                  }}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg bg-zinc-900 shrink-0" referrerPolicy="no-referrer" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{p.name}</h4>
                      <p className="text-[10px] text-zinc-400 font-mono">
                        {p.categoryName} {p.brand ? `• ${p.brand}` : ''} {p.sku ? `• SKU: ${p.sku}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-black text-[#C6FF00] font-mono">
                      {p.price !== null ? `${p.price.toLocaleString('fr-FR')} FCFA` : 'Sur demande'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p, 1);
                        setShowSearchDropdown(false);
                      }}
                      className="bg-[#C6FF00] hover:bg-[#b0e600] text-black text-[10px] font-extrabold px-2.5 py-1 rounded-lg"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  setCurrentView('shop');
                  setShowSearchDropdown(false);
                }}
                className="w-full text-center py-2 text-xs font-bold text-[#C6FF00] hover:underline"
              >
                Voir tous les résultats pour "{searchQuery}" →
              </button>
            </div>
          )}
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* User Account / Auth Modal Trigger */}
          <button
            onClick={() => setIsAuthOpen(true)}
            className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white relative transition-colors flex items-center gap-1.5"
            title="Mon Compte Client & Suivi"
          >
            <User className="w-4 h-4 text-[#C6FF00]" />
            <span className="hidden xl:inline text-xs font-bold">
              {user ? user.name.split(' ')[0] : 'Compte'}
            </span>
            {user && (
              <span className="w-2 h-2 rounded-full bg-[#C6FF00] absolute top-2 right-2 animate-pulse" />
            )}
          </button>

          {/* WhatsApp Direct Order */}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-black px-3 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105 shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            <span className="hidden xl:inline">Commander WhatsApp</span>
            <span className="xl:hidden">WhatsApp</span>
          </a>

          {/* Favorites Button */}
          <button
            onClick={() => setCurrentView('shop')}
            className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 relative transition-colors"
            title="Favoris"
          >
            <Heart className="w-4 h-4" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C6FF00] text-black text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl bg-[#C6FF00] hover:bg-[#b0e600] text-black font-extrabold text-xs flex items-center gap-2 transition-transform active:scale-95 shadow-[0_0_15px_rgba(198,255,0,0.25)]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Panier</span>
            <span className="bg-black text-[#C6FF00] text-xs px-2 py-0.5 rounded-full font-black">
              {cartCount}
            </span>
          </button>

          {/* Admin Toggle */}
          <button
            onClick={() => {
              setIsAdminMode(!isAdminMode);
              if (!isAdminMode) setCurrentView('admin');
              else setCurrentView('home');
            }}
            className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition-colors ${
              isAdminMode
                ? 'bg-[#C6FF00] text-black border-[#C6FF00]'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
            title="Mode Administrateur"
          >
            <Sliders className="w-4 h-4" />
            <span className="hidden lg:inline">{isAdminMode ? 'Admin On' : 'Admin'}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Navigation Links Bar */}
      <div className="hidden md:block bg-zinc-950 border-t border-zinc-900 py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`font-semibold tracking-wide transition-colors py-1 ${
                  currentView === link.id
                    ? 'text-[#C6FF00] border-b-2 border-[#C6FF00]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-zinc-400 text-[11px]">
            <span className="flex items-center gap-1 text-[#C6FF00]">
              <Sparkles className="w-3 h-3" />
              Paiement Wave & Orange Money acceptés
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 py-4 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentView('shop');
              }}
              placeholder="Rechercher un produit Express..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white"
            />
          </div>

          <div className="flex flex-col gap-2 border-t border-zinc-900 pt-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left py-2 px-3 rounded-lg text-sm font-semibold ${
                  currentView === link.id
                    ? 'bg-[#C6FF00] text-black'
                    : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="border-t border-zinc-900 pt-3 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Livrer à Dakar :</span>
              <select
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                className="bg-zinc-900 text-white font-semibold rounded px-2 py-1 border border-zinc-800 text-xs"
              >
                {DAKAR_NEIGHBORHOODS.map((n) => (
                  <option key={n.name} value={n.name}>
                    {n.name} ({n.expressTimeMin}m)
                  </option>
                ))}
              </select>
            </div>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-black font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              Commander directement sur WhatsApp (77 648 14 20)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
