import React, { useState, useEffect } from 'react';
import { OFFICIAL_CATEGORIES as CATEGORIES } from './data/categories';
import { OFFICIAL_PRODUCTS as PRODUCTS } from './data/products';
import { Product, Category, CartItem, Order } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AgeModal } from './components/AgeModal';
import { CartDrawer } from './components/CartDrawer';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { CategoriesPage } from './pages/CategoriesPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { ContactFaqPage } from './pages/ContactFaqPage';
import { AuthPage } from './pages/AuthPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { LegalPage } from './pages/LegalPage';
import { AdminDashboard } from './pages/AdminDashboard';

export function App() {
  // Navigation tab state
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Catalog State
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories] = useState<Category[]>(CATEGORIES);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('expressh24_cart');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // User State
  const [user, setUser] = useState<{ name: string; phone: string; email: string; role: 'customer' | 'admin' } | null>(() => {
    try {
      const saved = localStorage.getItem('expressh24_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('expressh24_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}

    // Default sample order
    return [
      {
        id: 'EXH-84920',
        trackingNumber: 'EXH-84920',
        customer: {
          name: 'Moussa Diop',
          phone: '+221 77 123 45 67',
          address: 'Villa 142, Rue de la Plage',
          district: 'Les Almadies'
        },
        items: [
          { product: PRODUCTS[0], quantity: 2 },
          { product: PRODUCTS[4], quantity: 1 }
        ],
        subtotal: 5000,
        deliveryFee: 1500,
        total: 6500,
        paymentMethod: 'wave',
        paymentStatus: 'paid',
        deliveryType: 'express',
        status: 'delivering',
        createdAt: new Date().toISOString(),
        estimatedDeliveryTime: '15-20 minutes',
        driverName: 'Mamadou Diallo',
        driverPhone: '+221 77 648 14 20'
      }
    ];
  });

  const [recentCreatedOrder, setRecentCreatedOrder] = useState<Order | null>(null);

  // Modals state
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [ageCheckProduct, setAgeCheckProduct] = useState<Product | null>(null);
  const [isAgeVerified, setIsAgeVerified] = useState<boolean>(() => {
    return localStorage.getItem('expressh24_age_verified') === 'true';
  });

  // Save Cart to localStorage
  useEffect(() => {
    localStorage.setItem('expressh24_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save User to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('expressh24_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('expressh24_user');
    }
  }, [user]);

  // Save Orders to localStorage
  useEffect(() => {
    localStorage.setItem('expressh24_orders', JSON.stringify(orders));
  }, [orders]);

  // Add to Cart Logic
  const handleAddToCart = (product: Product, quantity = 1) => {
    // Age verification check for restricted items (+18)
    if ((product.requiresAgeVerification || product.ageRestriction) && !isAgeVerified) {
      setAgeCheckProduct(product);
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleAgeConfirm = () => {
    setIsAgeVerified(true);
    localStorage.setItem('expressh24_age_verified', 'true');
    if (ageCheckProduct) {
      handleAddToCart(ageCheckProduct, 1);
      setAgeCheckProduct(null);
    }
  };

  const handleAgeDeny = () => {
    setAgeCheckProduct(null);
    alert('Conformément à la réglementation sénégalaise, les produits réglementés sont strictement réservés aux personnes âgées de 18 ans et plus.');
  };

  // Product CRUD for Admin
  const handleAddProduct = (newP: Product) => {
    setProducts((prev) => [newP, ...prev]);
  };

  const handleUpdateProduct = (updatedP: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedP.id ? updatedP : p)));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleOrderCreated = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setRecentCreatedOrder(order);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#C6FF00] selection:text-black flex flex-col justify-between">
      
      {/* App Navigation Header */}
      <Header
        cartCount={(cartItems || []).reduce((acc, item) => acc + (item?.quantity || 0), 0)}
        openCart={() => setIsCartOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        user={user}
      />

      {/* Main Active Page Content View */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <Home
            categories={categories}
            featuredProducts={products.filter((p) => p.isFeatured)}
            onAddToCart={handleAddToCart}
            onOpenDetail={setDetailProduct}
            onRequireAgeCheck={setAgeCheckProduct}
            setCurrentTab={setCurrentTab}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {currentTab === 'shop' && (
          <Shop
            categories={categories}
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onAddToCart={handleAddToCart}
            onOpenDetail={setDetailProduct}
            onRequireAgeCheck={setAgeCheckProduct}
          />
        )}

        {currentTab === 'categories' && (
          <CategoriesPage
            categories={categories}
            setSelectedCategory={setSelectedCategory}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems}
            onClearCart={handleClearCart}
            onOrderCreated={handleOrderCreated}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'tracking' && (
          <OrderTrackingPage
            orders={orders}
            recentOrder={recentCreatedOrder}
          />
        )}

        {currentTab === 'faq' && <ContactFaqPage />}

        {currentTab === 'auth' && (
          <AuthPage
            onLoginSuccess={(userData) => setUser(userData)}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'profile' && (
          <UserProfilePage
            user={user}
            orders={orders}
            onLogout={() => setUser(null)}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'legal' && <LegalPage />}

        {currentTab === 'admin' && (
          <AdminDashboard
            products={products}
            categories={categories}
            orders={orders}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer setCurrentTab={setCurrentTab} />

      {/* Modals & Slide-over Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setCurrentTab('checkout');
        }}
      />

      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <AgeModal
        isOpen={ageCheckProduct !== null}
        productName={ageCheckProduct?.name || ''}
        onConfirm={handleAgeConfirm}
        onDeny={handleAgeDeny}
      />

    </div>
  );
}

export default App;
