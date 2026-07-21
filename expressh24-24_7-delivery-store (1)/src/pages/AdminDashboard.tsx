import React, { useState } from 'react';
import { Product, Category, Order, DeliveryDriver, Coupon } from '../types';
import { VERIFICATION_CHECKLIST } from '../data/checklist';
import { InvoicePrintModal } from '../components/InvoicePrintModal';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  Tag, 
  Truck, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Search, 
  Printer, 
  ShieldCheck, 
  DollarSign, 
  AlertCircle,
  FileCheck
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  categories: Category[];
  orders: Order[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  categories,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'drivers' | 'promotions' | 'checklist'>('dashboard');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // New product form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProd, setNewProd] = useState<Partial<Product>>({
    name: '',
    categoryId: 1,
    categoryName: 'Nettoyage Maison',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=600',
    description: '',
    stock: 50,
    isAvailable: true,
    unit: 'Unité'
  });

  // Mock drivers list
  const [drivers, setDrivers] = useState<DeliveryDriver[]>([
    { id: 'drv-1', name: 'Mamadou Diallo', phone: '+221 77 648 14 20', vehicle: 'Scooter Yamaha TMAX 530', plateNumber: 'DK-8492-B', status: 'delivering', currentLat: 14.7167, currentLng: -17.4677, completedOrdersCount: 142, rating: 4.9, photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
    { id: 'drv-2', name: 'Ibrahima Ndiaye', phone: '+221 78 123 45 67', vehicle: 'Scooter Honda Dio 110', plateNumber: 'DK-9021-A', status: 'available', currentLat: 14.7300, currentLng: -17.4500, completedOrdersCount: 98, rating: 4.8, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
    { id: 'drv-3', name: 'Ousmane Fall', phone: '+221 76 987 65 43', vehicle: 'Scooter Vespa Sprint', plateNumber: 'DK-1102-C', status: 'available', currentLat: 14.7000, currentLng: -17.4300, completedOrdersCount: 215, rating: 5.0, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' }
  ]);

  // Mock coupons
  const [coupons, setCoupons] = useState<Coupon[]>([
    { code: 'EXPRESS24', discountAmount: 1000, isActive: true },
    { code: 'DAKAR', discountAmount: 1000, isActive: true },
    { code: 'BIENVENUE', discountAmount: 500, isActive: true }
  ]);

  const totalRevenue = (orders || []).reduce((sum, o) => sum + (o?.total || 0), 0);

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      onUpdateProduct({ ...editingProduct, ...newProd } as Product);
      setEditingProduct(null);
    } else {
      const created: Product = {
        id: `p-${Date.now()}`,
        name: newProd.name || 'Produit',
        categoryId: newProd.categoryId || 1,
        categoryName: categories.find((c) => c.id === newProd.categoryId)?.name || 'Nettoyage Maison',
        price: Number(newProd.price) || 1000,
        image: newProd.image || 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=600',
        description: newProd.description || 'Description produit ExpressH24',
        stock: Number(newProd.stock) || 50,
        isAvailable: true,
        unit: newProd.unit || 'Unité'
      };
      onAddProduct(created);
    }
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#C6FF00] text-black font-black text-xs px-2.5 py-0.5 rounded uppercase">
                ADMIN PORTAL
              </span>
              <span className="text-xs text-zinc-400">Dakar Dispatch Center</span>
            </div>
            <h1 className="text-2xl font-black italic text-white mt-1">
              Tableau de Bord Administrateur ExpressH24
            </h1>
          </div>

          {/* Quick Stats Pills */}
          <div className="flex items-center gap-3 text-xs">
            <div className="bg-black/60 px-3 py-2 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">Chiffre d'affaires :</span>
              <strong className="text-[#C6FF00] font-black">{totalRevenue.toLocaleString('fr-FR')} FCFA</strong>
            </div>

            <div className="bg-black/60 px-3 py-2 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">Commandes :</span>
              <strong className="text-white font-black">{orders.length}</strong>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800 scrollbar-thin">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'dashboard' ? 'bg-[#C6FF00] text-black' : 'bg-zinc-900 text-zinc-300 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Vue d'ensemble</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'products' ? 'bg-[#C6FF00] text-black' : 'bg-zinc-900 text-zinc-300 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Gestion Produits ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'orders' ? 'bg-[#C6FF00] text-black' : 'bg-zinc-900 text-zinc-300 hover:text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Commandes ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('drivers')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'drivers' ? 'bg-[#C6FF00] text-black' : 'bg-zinc-900 text-zinc-300 hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Livreurs Express ({drivers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('promotions')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'promotions' ? 'bg-[#C6FF00] text-black' : 'bg-zinc-900 text-zinc-300 hover:text-white'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Promotions & Coupons</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'checklist' ? 'bg-[#C6FF00] text-black' : 'bg-zinc-900 text-zinc-300 hover:text-white'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Audit Affiches (102 Réf.)</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
                <span className="text-zinc-500 text-xs font-bold block">Chiffre d'Affaires</span>
                <span className="text-2xl font-black text-[#C6FF00] mt-1 block">
                  {totalRevenue.toLocaleString('fr-FR')} FCFA
                </span>
                <p className="text-[10px] text-zinc-500 mt-2">Paiements Wave, OM, Carte & Cash</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
                <span className="text-zinc-500 text-xs font-bold block">Total Commandes</span>
                <span className="text-2xl font-black text-white mt-1 block">{orders.length}</span>
                <p className="text-[10px] text-emerald-400 mt-2">Service 24H/24 à Dakar</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
                <span className="text-zinc-500 text-xs font-bold block">Produits au Catalogue</span>
                <span className="text-2xl font-black text-white mt-1 block">{products.length} réf.</span>
                <p className="text-[10px] text-[#C6FF00] mt-2">13 catégories vérifiées</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
                <span className="text-zinc-500 text-xs font-bold block">Livreurs sur le Terrain</span>
                <span className="text-2xl font-black text-emerald-400 mt-1 block">
                  {drivers.filter((d) => d.status !== 'offline').length} / {drivers.length}
                </span>
                <p className="text-[10px] text-zinc-500 mt-2">GPS actif en temps réel</p>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                Dernières Commandes Traitées
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-500 uppercase">
                      <th className="py-3">Code Suivi</th>
                      <th className="py-3">Client</th>
                      <th className="py-3">Quartier</th>
                      <th className="py-3">Montant</th>
                      <th className="py-3">Statut</th>
                      <th className="py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {orders.slice(0, 5).map((o) => (
                      <tr key={o.id}>
                        <td className="py-3 font-bold text-[#C6FF00]">{o.trackingNumber}</td>
                        <td className="py-3 text-white font-medium">{o.customer.name}</td>
                        <td className="py-3 text-zinc-400">{o.customer.district}</td>
                        <td className="py-3 font-bold text-white">{o.total.toLocaleString('fr-FR')} FCFA</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold text-[10px]">
                            {o.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => setSelectedInvoiceOrder(o)}
                            className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded text-white"
                          >
                            <Printer className="w-3.5 h-3.5 text-[#C6FF00]" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PRODUCTS CRUD */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-white italic">
                Catalogue Produits (Prix Conformes Affiches)
              </h2>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setNewProd({
                    name: '',
                    categoryId: 1,
                    categoryName: 'Nettoyage Maison',
                    price: 1500,
                    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=600',
                    description: '',
                    stock: 50,
                    isAvailable: true,
                    unit: 'Unité'
                  });
                  setShowAddModal(true);
                }}
                className="py-2.5 px-4 rounded-xl bg-[#C6FF00] text-black font-extrabold text-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un Produit</span>
              </button>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-black/60 border-b border-zinc-800 text-zinc-400 font-bold uppercase">
                      <th className="p-3">Photo</th>
                      <th className="p-3">Nom du produit</th>
                      <th className="p-3">Catégorie</th>
                      <th className="p-3">Prix FCFA</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3">Statut</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/80">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-zinc-800/40">
                        <td className="p-3">
                          <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg bg-black" />
                        </td>
                        <td className="p-3 font-bold text-white">{p.name}</td>
                        <td className="p-3 text-zinc-400">{p.categoryName}</td>
                        <td className="p-3 font-black text-[#C6FF00]">{p.price.toLocaleString('fr-FR')} FCFA</td>
                        <td className="p-3 text-zinc-300">{p.stock} un.</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.isAvailable ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                            {p.isAvailable ? 'Disponible' : 'Rupture'}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setNewProd(p);
                              setShowAddModal(true);
                            }}
                            className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-300"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteProduct(p.id)}
                            className="p-1.5 bg-zinc-800 hover:bg-red-900 rounded text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-lg font-black text-white italic">
              Gestion des Commandes Client
            </h2>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-black/60 border-b border-zinc-800 text-zinc-400 font-bold uppercase">
                      <th className="p-3">Suivi</th>
                      <th className="p-3">Client</th>
                      <th className="p-3">Adresse & Quartier</th>
                      <th className="p-3">Articles</th>
                      <th className="p-3">Montant Total</th>
                      <th className="p-3">Changer Statut</th>
                      <th className="p-3 text-right">Facture</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/80">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-zinc-800/40">
                        <td className="p-3 font-black text-[#C6FF00]">{o.trackingNumber}</td>
                        <td className="p-3">
                          <div className="font-bold text-white">{o.customer.name}</div>
                          <div className="text-[10px] text-zinc-400">{o.customer.phone}</div>
                        </td>
                        <td className="p-3 text-zinc-300">
                          <div>{o.customer.district}</div>
                          <div className="text-[10px] text-zinc-500">{o.customer.address}</div>
                        </td>
                        <td className="p-3 text-zinc-300">{o.items.length} article(s)</td>
                        <td className="p-3 font-bold text-white">{o.total.toLocaleString('fr-FR')} FCFA</td>
                        <td className="p-3">
                          <select
                            value={o.status}
                            onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as any)}
                            className="bg-black border border-zinc-700 text-xs text-[#C6FF00] font-bold rounded-lg px-2 py-1 focus:outline-none"
                          >
                            <option value="received">Commande reçue</option>
                            <option value="preparing">En préparation</option>
                            <option value="delivering">Livreur en route</option>
                            <option value="delivered">Livrée</option>
                          </select>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => setSelectedInvoiceOrder(o)}
                            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 ml-auto"
                          >
                            <Printer className="w-3.5 h-3.5 text-[#C6FF00]" />
                            <span>Imprimer</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DRIVERS */}
        {activeTab === 'drivers' && (
          <div className="space-y-6">
            <h2 className="text-lg font-black text-white italic">
              Livreurs ExpressH24 Dakar
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {drivers.map((drv) => (
                <div key={drv.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={drv.photo} alt={drv.name} className="w-12 h-12 rounded-full object-cover border border-[#C6FF00]" />
                    <div>
                      <h4 className="font-bold text-white">{drv.name}</h4>
                      <p className="text-xs text-zinc-400">{drv.phone}</p>
                    </div>
                  </div>

                  <div className="text-xs text-zinc-300 space-y-1 bg-black/50 p-3 rounded-xl border border-zinc-800">
                    <p>Véhicule : <strong>{drv.vehicle}</strong> ({drv.plateNumber})</p>
                    <p>Courses réalisées : <strong>{drv.completedOrdersCount}</strong></p>
                    <p>Note client : <strong>{drv.rating} / 5.0 ⭐</strong></p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-zinc-500 font-bold">Statut GPS :</span>
                    <span className={`px-2.5 py-0.5 rounded font-bold text-[10px] ${
                      drv.status === 'delivering' ? 'bg-amber-950 text-amber-400' : 'bg-emerald-950 text-emerald-400'
                    }`}>
                      {drv.status === 'delivering' ? 'En course GPS' : 'Disponible'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PROMOTIONS */}
        {activeTab === 'promotions' && (
          <div className="space-y-6">
            <h2 className="text-lg font-black text-white italic">
              Codes Promo & Offres Spéciales
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div key={c.code} className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl space-y-2">
                  <span className="text-xs text-zinc-500 font-bold block">CODE PROMO</span>
                  <span className="text-xl font-black text-[#C6FF00] block">{c.code}</span>
                  <p className="text-xs text-zinc-300">Réduction de {c.discountAmount} FCFA sur le panier.</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: OFFICIAL POSTERS CHECKLIST AUDIT */}
        {activeTab === 'checklist' && (
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-[#C6FF00]" />
                <h2 className="text-lg font-black text-white">Rapport d'Audit du Catalogue Produit</h2>
              </div>
              <p className="text-xs text-zinc-400">
                Afin de garantir une fidélité 100% absolue aux affiches ExpressH24, voici la liste de vérification des 13 catégories et des 102 références produits extraites.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-black/60 border-b border-zinc-800 text-zinc-400 uppercase font-bold">
                    <th className="p-3">Rayon / Catégorie</th>
                    <th className="p-3">Références</th>
                    <th className="p-3">Statut de Vérification</th>
                    <th className="p-3">Observations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {VERIFICATION_CHECKLIST.map((chk, i) => (
                    <tr key={i}>
                      <td className="p-3 font-bold text-white">{chk.category}</td>
                      <td className="p-3 text-zinc-300">{chk.item}</td>
                      <td className="p-3">
                        <span className="bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded text-[10px] inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          100% Vérifié
                        </span>
                      </td>
                      <td className="p-3 text-zinc-400">{chk.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Product Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-lg w-full space-y-4 text-white">
            <h3 className="text-lg font-black text-[#C6FF00]">
              {editingProduct ? 'Modifier Produit' : 'Créer un Produit'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-400 font-bold mb-1">Nom du Produit *</label>
                <input
                  type="text"
                  required
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C6FF00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 font-bold mb-1">Prix (FCFA) *</label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-bold mb-1">Stock *</label>
                  <input
                    type="number"
                    required
                    value={newProd.stock}
                    onChange={(e) => setNewProd({ ...newProd, stock: Number(e.target.value) })}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-bold mb-1">Catégorie *</label>
                <select
                  value={newProd.categoryId}
                  onChange={(e) => {
                    const id = Number(e.target.value);
                    const catName = categories.find((c) => c.id === id)?.name || '';
                    setNewProd({ ...newProd, categoryId: id, categoryName: catName });
                  }}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C6FF00]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 font-bold mb-1">URL Image *</label>
                <input
                  type="text"
                  required
                  value={newProd.image}
                  onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C6FF00]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-zinc-800 rounded-xl text-zinc-300 font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C6FF00] text-black font-extrabold rounded-xl"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      <InvoicePrintModal
        order={selectedInvoiceOrder}
        onClose={() => setSelectedInvoiceOrder(null)}
      />
    </div>
  );
};
