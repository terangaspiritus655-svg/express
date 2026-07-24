import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { SEO } from './components/SEO';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyUs } from './components/WhyUs';
import { CategoryGrid } from './components/CategoryGrid';
import { FlashOffersCarousel } from './components/FlashOffersCarousel';
import { CustomerTestimonials } from './components/CustomerTestimonials';
import { AppDownloadSection } from './components/AppDownloadSection';
import { NewsletterSection } from './components/NewsletterSection';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { UserAccountModal } from './components/UserAccountModal';
import { OrderTracker } from './components/OrderTracker';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/Admin/AdminDashboard';

import { BoutiquePage } from './pages/BoutiquePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ArrowRight } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { currentView, products, setCurrentView } = useShop();

  const popularProducts = products.filter((p) => p.isPopular).slice(0, 8);

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased flex flex-col selection:bg-[#C6FF00] selection:text-black">
      <SEO />
      <Header />

      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero />
            <WhyUs />
            <FlashOffersCarousel />
            <CategoryGrid />

            {/* Featured Popular Products Section */}
            <section className="py-16 bg-zinc-950 text-white border-b border-zinc-900">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C6FF00] bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
                      COMMANDES FRÉQUENTES
                    </span>
                    <h2 className="text-3xl font-black mt-3 font-mono">
                      Les Essentiels les Plus Demandés à Dakar
                    </h2>
                    <p className="text-sm text-zinc-400 mt-1">
                      Livraison garantie en 15 à 20 minutes chrono à votre porte
                    </p>
                  </div>

                  <button
                    onClick={() => setCurrentView('shop')}
                    className="self-start md:self-auto text-xs font-bold text-[#C6FF00] hover:underline flex items-center gap-1"
                  >
                    Voir toute la boutique ({products.length} produits)
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {popularProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            </section>

            <CustomerTestimonials />
            <AppDownloadSection />
            <NewsletterSection />
          </>
        )}

        {currentView === 'shop' && <BoutiquePage />}
        {currentView === 'categories' && <CategoriesPage />}
        {currentView === 'category-detail' && <CategoryDetailPage />}
        {currentView === 'tracking' && <OrderTracker />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'faq' && <FAQPage />}
        {currentView === 'terms' && <TermsPage />}
        {currentView === 'privacy' && <PrivacyPage />}
        {currentView === 'admin' && <AdminDashboard />}
      </main>

      <Footer />

      {/* Global Modals & Overlay Drawers */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <UserAccountModal />
      <FloatingWhatsApp />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainAppContent />
    </ShopProvider>
  );
}
