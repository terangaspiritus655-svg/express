import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, CartItem, Order, Driver, Coupon, UserProfile, OrderStatus } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { INITIAL_DRIVERS } from '../data/drivers';
import { INITIAL_COUPONS } from '../data/coupons';
import { isSupabaseConfigured, getSupabaseConfig, supabase } from '../lib/supabase';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';
import { driverService } from '../services/driverService';
import { couponService } from '../services/couponService';
import { authService } from '../services/authService';

interface ShopContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  favorites: string[];
  orders: Order[];
  drivers: Driver[];
  coupons: Coupon[];
  activeCategory: string | null;
  searchQuery: string;
  selectedNeighborhood: string;
  currentView: string;
  selectedCategoryDetailId: string | null;
  selectedProductDetail: Product | null;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isAuthOpen: boolean;
  user: UserProfile | null;
  isAdminMode: boolean;
  trackingOrderId: string | null;
  appliedCoupon: Coupon | null;
  isSupabaseConnected: boolean;
  
  // Actions
  setSearchQuery: (q: string) => void;
  setActiveCategory: (catId: string | null) => void;
  setSelectedNeighborhood: (n: string) => void;
  setCurrentView: (view: string, categoryId?: string | null) => void;
  setSelectedProductDetail: (p: Product | null) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsAuthOpen: (open: boolean) => void;
  setIsAdminMode: (admin: boolean) => void;
  setTrackingOrderId: (id: string | null) => void;
  setUser: (u: UserProfile | null) => void;
  
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  createOrder: (orderData: Partial<Order>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus, driverId?: string) => Promise<void>;
  
  addProduct: (p: Partial<Product>) => Promise<void>;
  updateProduct: (id: string, p: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  
  getWhatsAppUrl: (items?: CartItem[], customTotal?: number) => string;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
  cartCount: number;
  refreshFromSupabase: () => Promise<void>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(isSupabaseConfigured());

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('exh24_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 100 && parsed[0]?.sku) {
          return parsed;
        }
      } catch (e) {
        console.warn('Resetting products cache');
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [drivers, setDrivers] = useState<Driver[]>(INITIAL_DRIVERS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('exh24_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('exh24_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('exh24_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'EXH-2026-8912',
        createdAt: new Date().toISOString(),
        customerName: 'Awa Seck',
        customerPhone: '+221 77 123 45 67',
        customerEmail: 'awa.seck@gmail.com',
        address: 'Villa 142, Rue Mermoz Pyrotechnie',
        neighborhood: 'Mermoz / Pyrotechnie',
        instructions: 'Appeler à l\'arrivée',
        deliveryType: 'express',
        deliveryFee: 1500,
        paymentMethod: 'wave',
        paymentStatus: 'paid',
        status: 'on_the_way',
        items: [
          { product: INITIAL_PRODUCTS[0], quantity: 1 },
          { product: INITIAL_PRODUCTS[10] || INITIAL_PRODUCTS[1], quantity: 2 }
        ],
        subtotal: 2200,
        discount: 0,
        total: 3700,
        driverId: 'drv-2',
        estimatedMinutes: 15,
        trackingStep: 3
      }
    ];
  });

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('Almadies');
  const [currentView, setCurrentViewInternal] = useState<string>('home');
  const [selectedCategoryDetailId, setSelectedCategoryDetailId] = useState<string | null>(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('exh24_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Fetch initial data from Supabase if connected
  const refreshFromSupabase = async () => {
    if (!isSupabaseConfigured()) return;
    setIsSupabaseConnected(true);

    try {
      const [remoteProducts, remoteCats, remoteOrders, remoteDrivers, remoteCoupons] = await Promise.all([
        productService.getAllProducts(),
        productService.getAllCategories(),
        orderService.getAllOrders(),
        driverService.getAllDrivers(),
        couponService.getAllCoupons()
      ]);

      if (remoteProducts.length > 0) setProducts(remoteProducts);
      if (remoteCats.length > 0) setCategories(remoteCats);
      if (remoteOrders.length > 0) setOrders(remoteOrders);
      if (remoteDrivers.length > 0) setDrivers(remoteDrivers);
      if (remoteCoupons.length > 0) setCoupons(remoteCoupons);
    } catch (err) {
      console.warn('Supabase initial fetch fallback:', err);
    }
  };

  useEffect(() => {
    refreshFromSupabase();

    // Supabase Realtime subscriptions
    const unsubscribeOrders = orderService.subscribeToOrders(() => {
      orderService.getAllOrders().then((data) => {
        if (data.length > 0) setOrders(data);
      });
    });

    const unsubscribeDrivers = driverService.subscribeToDrivers(() => {
      driverService.getAllDrivers().then((data) => {
        if (data.length > 0) setDrivers(data);
      });
    });

    return () => {
      unsubscribeOrders();
      unsubscribeDrivers();
    };
  }, []);

  // Sync state to local storage fallback
  useEffect(() => {
    localStorage.setItem('exh24_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('exh24_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('exh24_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('exh24_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('exh24_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('exh24_user');
    }
  }, [user]);

  const setCurrentView = (view: string, categoryId: string | null = null) => {
    setCurrentViewInternal(view);
    if (categoryId) {
      setSelectedCategoryDetailId(categoryId);
      setActiveCategory(categoryId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price || 0) * item.quantity, 0);

  let cartDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percent') {
      cartDiscount = Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
    } else {
      cartDiscount = appliedCoupon.discountValue;
    }
  }

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleanCode && c.active);
    if (!found) {
      return { success: false, message: 'Code promo invalide ou expiré' };
    }
    if (cartSubtotal < found.minOrderAmount) {
      return {
        success: false,
        message: `Montant minimum de commande de ${found.minOrderAmount.toLocaleString('fr-FR')} FCFA requis`
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Code promo ${cleanCode} appliqué avec succès!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const createOrder = async (orderData: Partial<Order>): Promise<Order> => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: `EXH-2026-${randomDigits}`,
      createdAt: new Date().toISOString(),
      customerName: orderData.customerName || 'Client ExpressH24',
      customerPhone: orderData.customerPhone || '+221 77 648 14 20',
      customerEmail: orderData.customerEmail || '',
      address: orderData.address || 'Dakar',
      neighborhood: orderData.neighborhood || 'Almadies',
      instructions: orderData.instructions || '',
      deliveryType: orderData.deliveryType || 'express',
      deliveryFee: orderData.deliveryFee || 1500,
      paymentMethod: orderData.paymentMethod || 'wave',
      paymentStatus: orderData.paymentMethod === 'cash' ? 'paid_on_delivery' : 'paid',
      status: 'received',
      items: orderData.items || [...cart],
      subtotal: orderData.subtotal || cartSubtotal,
      discount: orderData.discount || cartDiscount,
      total: orderData.total || cartTotal + (orderData.deliveryFee || 1500),
      driverId: 'drv-1',
      estimatedMinutes: orderData.deliveryType === 'express' ? 15 : 35,
      trackingStep: 1
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setTrackingOrderId(newOrder.id);

    // Save order in Supabase
    await orderService.createOrder(newOrder);

    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus, driverId?: string) => {
    let trackingStep = 1;
    if (status === 'received') trackingStep = 1;
    if (status === 'preparing') trackingStep = 2;
    if (status === 'on_the_way') trackingStep = 3;
    if (status === 'delivered') trackingStep = 4;

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status,
              trackingStep,
              ...(driverId ? { driverId } : {})
            }
          : o
      )
    );

    await orderService.updateOrderStatus(orderId, status, trackingStep);
  };

  const addProduct = async (productData: Partial<Product>) => {
    const prodName = productData.name || 'Nouveau Produit';
    const newProd: Omit<Product, 'id'> = {
      sku: productData.sku || `EXH-PROD-${Date.now().toString().slice(-4)}`,
      barcode: productData.barcode || '370000000000',
      slug: productData.slug || prodName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: prodName,
      categoryId: productData.categoryId || 'cat-1',
      categoryName: productData.categoryName || 'Général',
      price: productData.price !== undefined ? productData.price : 1000,
      oldPrice: productData.oldPrice,
      currency: 'XOF',
      status: productData.status || (productData.price === null ? 'ADMIN_VALIDATION_REQUIRED' : 'ACTIVE'),
      needsValidation: productData.needsValidation || productData.price === null,
      brand: productData.brand,
      image: productData.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
      description: productData.description || 'Description du produit ExpressH24',
      stock: productData.stock || 50,
      unit: productData.unit || 'Unité',
      isPopular: productData.isPopular || false,
      isNew: true,
      featured: productData.featured || false,
      badge: productData.badge,
      keywords: productData.keywords || [prodName, 'expressh24', 'dakar'].join(' '),
      availability: (productData.stock || 50) > 0 ? 'in_stock' : 'out_of_stock'
    };

    const created = await productService.createProduct(newProd);
    if (created) {
      setProducts((prev) => [created, ...prev]);
    } else {
      const localProd: Product = { id: `prod-${Date.now()}`, ...newProd };
      setProducts((prev) => [localProd, ...prev]);
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...productData } : p))
    );
    await productService.updateProduct(id, productData);
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    await productService.softDeleteProduct(id);
  };

  const getWhatsAppUrl = (customItems?: CartItem[], customTotal?: number) => {
    const targetItems = customItems || cart;
    const targetTotal = customTotal !== undefined ? customTotal : cartTotal;
    const phoneTarget = '221776481420';

    let message = `Bonjour ExpressH24 🚀,\nJe souhaite commander en livraison express 24H/24 :\n\n`;
    if (targetItems.length > 0) {
      targetItems.forEach((item, idx) => {
        message += `${idx + 1}. ${item.product.name}\n   Quantité : ${item.quantity}\n   Prix : ${(item.product.price * item.quantity).toLocaleString('fr-FR')} FCFA\n\n`;
      });
      message += `💰 Total Commande : ${targetTotal.toLocaleString('fr-FR')} FCFA\n`;
    } else {
      message += `Je souhaite effectuer une commande rapide d'urgence.\n`;
    }
    message += `📍 Quartier / Adresse : ${selectedNeighborhood}\n`;
    message += `⚡ Mode : Livraison Express 15-20 Min\n\nMerci de me répondre rapidement !`;

    return `https://wa.me/${phoneTarget}?text=${encodeURIComponent(message)}`;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        cart,
        favorites,
        orders,
        drivers,
        coupons,
        activeCategory,
        searchQuery,
        selectedNeighborhood,
        currentView,
        selectedCategoryDetailId,
        selectedProductDetail,
        isCartOpen,
        isCheckoutOpen,
        isAuthOpen,
        user,
        isAdminMode,
        trackingOrderId,
        appliedCoupon,
        isSupabaseConnected,
        setSearchQuery,
        setActiveCategory,
        setSelectedNeighborhood,
        setCurrentView,
        setSelectedProductDetail,
        setIsCartOpen,
        setIsCheckoutOpen,
        setIsAuthOpen,
        setIsAdminMode,
        setTrackingOrderId,
        setUser,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleFavorite,
        applyCoupon,
        removeCoupon,
        createOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        getWhatsAppUrl,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        cartCount,
        refreshFromSupabase
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
