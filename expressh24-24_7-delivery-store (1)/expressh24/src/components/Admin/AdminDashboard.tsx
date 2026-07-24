import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Truck,
  Tag,
  BarChart3,
  Settings,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  Printer,
  X,
  Search,
  Check,
  Database
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Product, Order, Driver, OrderStatus } from '../../types';
import { SupabaseBackendManager } from './SupabaseBackendManager';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    drivers,
    coupons,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    isSupabaseConnected
  } = useShop();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'drivers' | 'coupons' | 'backend' | 'settings'>('overview');
  
  // Product Modal Form state
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState(categories[0].id);
  const [prodPrice, setProdPrice] = useState(1500);
  const [prodStock, setProdStock] = useState(50);
  const [prodUnit, setProdUnit] = useState('Unité');
  const [prodDesc, setProdDesc] = useState('');
  const [prodImage, setProdImage] = useState('');

  // Invoice Print Modal State
  const [printingOrder, setPrintingOrder] = useState<Order | null>(null);

  const [searchProdQuery, setSearchProdQuery] = useState('');

  // Stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeOrders = orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length;
  const totalProducts = products.length;

  const handleOpenNewProdModal = () => {
    setEditingProductId(null);
    setProdName('');
    setProdCategory(categories[0].id);
    setProdPrice(2000);
    setProdStock(40);
    setProdUnit('Flacon / Paquet');
    setProdDesc('');
    setProdImage('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80');
    setShowProductModal(true);
  };

  const handleOpenEditProdModal = (p: Product) => {
    setEditingProductId(p.id);
    setProdName(p.name);
    setProdCategory(p.categoryId);
    setProdPrice(p.price !== null ? p.price : 0);
    setProdStock(p.stock);
    setProdUnit(p.unit);
    setProdDesc(p.description);
    setProdImage(p.image);
    setShowProductModal(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const catObj = categories.find((c) => c.id === prodCategory) || categories[0];

    if (editingProductId) {
      await updateProduct(editingProductId, {
        name: prodName,
        categoryId: catObj.id,
        categoryName: catObj.name,
        price: Number(prodPrice),
        stock: Number(prodStock),
        unit: prodUnit,
        description: prodDesc,
        image: prodImage
      });
    } else {
      await addProduct({
        name: prodName,
        categoryId: catObj.id,
        categoryName: catObj.name,
        price: Number(prodPrice),
        stock: Number(prodStock),
        unit: prodUnit,
        description: prodDesc,
        image: prodImage
      });
    }
    setShowProductModal(false);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchProdQuery.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchProdQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white py-8 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-[#C6FF00] bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
                ADMINISTRATION EXPRESSH24
              </span>
              <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${isSupabaseConnected ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-amber-950 text-amber-400 border-amber-800'}`}>
                {isSupabaseConnected ? '● Supabase Connecté' : '○ Supabase Standby'}
              </span>
            </div>
            <h1 className="text-2xl font-black font-mono mt-2">Tableau de bord Administrateur</h1>
            <p className="text-xs text-zinc-400">Gérez le catalogue, les commandes, les livreurs et l'infrastructure Supabase en temps réel</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('backend')}
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold px-3 py-2.5 rounded-xl text-xs flex items-center gap-2"
            >
              <Database className="w-4 h-4 text-[#C6FF00]" />
              <span>Gestion Backend</span>
            </button>
            <button
              onClick={handleOpenNewProdModal}
              className="bg-[#C6FF00] hover:bg-[#b0e600] text-black font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Produit</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 border-b border-zinc-800 pb-2">
          {[
            { id: 'overview', label: 'Vue d\'ensemble', icon: LayoutDashboard },
            { id: 'products', label: `Produits (${products.length})`, icon: Package },
            { id: 'orders', label: `Commandes (${orders.length})`, icon: ShoppingBag },
            { id: 'drivers', label: `Livreurs (${drivers.length})`, icon: Truck },
            { id: 'coupons', label: `Promotions (${coupons.length})`, icon: Tag },
            { id: 'backend', label: 'Backend Supabase', icon: Database },
            { id: 'settings', label: 'Paramètres', icon: Settings }
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#C6FF00] text-black'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
                <span className="text-xs text-zinc-400 font-mono">Chiffre d'Affaires</span>
                <p className="text-2xl font-black text-[#C6FF00] font-mono mt-1">
                  {totalRevenue.toLocaleString('fr-FR')} FCFA
                </p>
                <p className="text-[10px] text-emerald-400 mt-2">↑ 100% commandes enregistrées</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
                <span className="text-xs text-zinc-400 font-mono">Commandes Totales</span>
                <p className="text-2xl font-black text-white font-mono mt-1">{orders.length}</p>
                <p className="text-[10px] text-zinc-400 mt-2">{activeOrders} en cours de livraison</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
                <span className="text-xs text-zinc-400 font-mono">Produits en Catalogue</span>
                <p className="text-2xl font-black text-white font-mono mt-1">{totalProducts}</p>
                <p className="text-[10px] text-amber-400 mt-2">
                  {products.filter((p) => p.stock < 10).length} alertes stock bas (&lt;10)
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
                <span className="text-xs text-zinc-400 font-mono">Livreurs sur le terrain</span>
                <p className="text-2xl font-black text-white font-mono mt-1">{drivers.length}</p>
                <p className="text-[10px] text-[#C6FF00] mt-2">Dakar 24H/24 Opérationnel</p>
              </div>
            </div>

            {/* Low Stock Alert Section if any */}
            {products.some((p) => p.stock < 10) && (
              <div className="bg-red-950/40 border border-red-800/60 p-4 rounded-xl text-red-200">
                <h4 className="font-bold text-xs text-red-400 uppercase font-mono mb-2 flex items-center gap-1.5">
                  ⚠️ Alerte Réapprovisionnement Urgent (&lt;10 unités)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {products.filter((p) => p.stock < 10).slice(0, 5).map((p) => (
                    <span key={p.id} className="bg-black text-red-300 px-2.5 py-1 rounded text-[11px] font-mono border border-red-800">
                      {p.name} ({p.stock} restant)
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Orders Overview */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-sm font-mono font-bold uppercase text-[#C6FF00] mb-4">Dernières commandes passées</h3>
              <div className="space-y-3">
                {orders.slice(0, 5).map((o) => (
                  <div key={o.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#C6FF00]">{o.id}</span>
                        <span className="text-zinc-300 font-semibold">{o.customerName}</span>
                        <span className="text-zinc-500">({o.neighborhood})</span>
                      </div>
                      <p className="text-[10px] text-zinc-400 mt-1">{o.items.length} articles • {o.paymentMethod.toUpperCase()}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-mono font-bold text-white text-sm">{o.total.toLocaleString('fr-FR')} FCFA</span>
                      <select
                        value={o.status}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                        className="bg-black text-[#C6FF00] font-mono text-xs border border-zinc-800 rounded px-2 py-1 font-bold"
                      >
                        <option value="received">Reçue</option>
                        <option value="preparing">Préparation</option>
                        <option value="on_the_way">En route</option>
                        <option value="delivered">Livrée</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGER */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchProdQuery}
                  onChange={(e) => setSearchProdQuery(e.target.value)}
                  placeholder="Rechercher produit par nom ou rayon..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white"
                />
              </div>

              <button
                onClick={handleOpenNewProdModal}
                className="bg-[#C6FF00] text-black font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 self-start"
              >
                <Plus className="w-4 h-4" /> Ajouter Un Produit
              </button>
            </div>

            {/* Admin Validation Queue Banner if any product needs price confirmation */}
            {products.some((p) => p.needsValidation || p.price === null) && (
              <div className="bg-amber-950/60 border border-amber-600/60 p-4 rounded-xl text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400 font-bold">⚠️</div>
                  <div>
                    <h4 className="font-bold text-sm text-amber-300">File de Validation Tarifaire (Admin Queue)</h4>
                    <p className="text-xs text-amber-300/80">
                      Certains produits reçus nécessitent une validation de prix avant d'être activés pour les clients (Ex: Couches Huggies, Prix à préciser).
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-300 min-w-[850px]">
                <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-3">SKU / Code</th>
                    <th className="p-3">Produit</th>
                    <th className="p-3">Catégorie</th>
                    <th className="p-3">Prix FCFA</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Statut</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className={`hover:bg-zinc-900/50 ${p.price === null ? 'bg-amber-950/20' : ''}`}>
                      <td className="p-3 font-mono text-[11px] text-zinc-400 font-bold">
                        {p.sku || `EXH-${p.id}`}
                      </td>
                      <td className="p-3 flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded bg-zinc-900 shrink-0" referrerPolicy="no-referrer" />
                        <div>
                          <p className="font-bold text-white">{p.name}</p>
                          <p className="text-[10px] text-zinc-500">{p.unit} {p.brand ? `• ${p.brand}` : ''}</p>
                        </div>
                      </td>
                      <td className="p-3 font-mono text-zinc-400">{p.categoryName}</td>
                      <td className="p-3 font-mono font-bold">
                        {p.price !== null ? (
                          <span className="text-[#C6FF00]">{p.price.toLocaleString('fr-FR')} FCFA</span>
                        ) : (
                          <span className="text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded text-[10px] border border-amber-500/40">
                            Prix à préciser
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-mono">{p.stock}</td>
                      <td className="p-3">
                        {p.price !== null ? (
                          <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded text-[10px] border border-emerald-800 font-bold">
                            ACTIF
                          </span>
                        ) : (
                          <span className="bg-amber-950 text-amber-300 px-2 py-0.5 rounded text-[10px] border border-amber-800 font-bold animate-pulse">
                            VALIDATION ADMIN
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditProdModal(p)}
                          className="p-1.5 bg-zinc-800 text-zinc-300 hover:text-white rounded"
                          title="Modifier le tarif / produit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 bg-red-950 text-red-400 hover:text-red-200 rounded border border-red-900"
                          title="Supprimer"
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
        )}

        {/* TAB 3: ORDERS MANAGER */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h3 className="text-sm font-mono font-bold uppercase text-[#C6FF00]">Gestion des commandes ({orders.length})</h3>

            <div className="space-y-3">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-zinc-900 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black font-mono text-[#C6FF00]">{ord.id}</span>
                        <span className="bg-zinc-900 text-white font-bold text-xs px-2.5 py-0.5 rounded border border-zinc-800">
                          {ord.customerName} ({ord.customerPhone})
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">
                        📍 Adresse : {ord.address} ({ord.neighborhood}) • Instruction: {ord.instructions || 'Aucune'}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setPrintingOrder(ord)}
                        className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5" /> Facture
                      </button>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-400">Statut:</span>
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="bg-black text-[#C6FF00] border border-zinc-800 rounded px-2 py-1 text-xs font-bold font-mono"
                        >
                          <option value="received">1. Commande Reçue</option>
                          <option value="preparing">2. En Préparation</option>
                          <option value="on_the_way">3. Livreur en Route</option>
                          <option value="delivered">4. Livrée</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-zinc-300">
                    {ord.items.map((it: any, idx: number) => (
                      <div key={idx} className="bg-zinc-900 p-2 rounded-lg border border-zinc-800 flex items-center gap-2">
                        <img src={it.product.image} alt={it.product.name} className="w-8 h-8 object-cover rounded" referrerPolicy="no-referrer" />
                        <div className="truncate">
                          <p className="font-bold truncate text-white">{it.product.name}</p>
                          <p className="text-[10px] text-zinc-400">{it.quantity}x • {(it.product.price * it.quantity).toLocaleString('fr-FR')} FCFA</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 text-xs font-mono">
                    <span className="text-zinc-400">Mode : {ord.paymentMethod.toUpperCase()}</span>
                    <span className="text-base font-black text-white">TOTAL : <span className="text-[#C6FF00]">{ord.total.toLocaleString('fr-FR')} FCFA</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DRIVERS MANAGER */}
        {activeTab === 'drivers' && (
          <div className="space-y-4">
            <h3 className="text-sm font-mono font-bold uppercase text-[#C6FF00]">Flotte de livreurs ExpressH24 Dakar</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {drivers.map((drv) => (
                <div key={drv.id} className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={drv.avatar} alt={drv.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#C6FF00]" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{drv.name}</h4>
                      <p className="text-xs text-zinc-400">{drv.phone}</p>
                      <span className="bg-zinc-900 text-[#C6FF00] text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-800">
                        {drv.vehicle}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-zinc-400 pt-2 border-t border-zinc-900 space-y-1">
                    <p>Immatriculation : <span className="text-white font-mono">{drv.licensePlate}</span></p>
                    <p>Courses effectuées : <span className="text-white font-mono">{drv.totalDeliveries}</span></p>
                    <p>Note clients : <span className="text-[#C6FF00] font-mono">★ {drv.rating}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: COUPONS */}
        {activeTab === 'coupons' && (
          <div className="space-y-4">
            <h3 className="text-sm font-mono font-bold uppercase text-[#C6FF00]">Codes Promo & Offres Spéciales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div key={c.code} className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-black text-lg text-[#C6FF00]">{c.code}</span>
                    <span className="bg-emerald-950 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-bold border border-emerald-800">Actif</span>
                  </div>
                  <p className="text-xs text-zinc-300">
                    Réduction : {c.discountType === 'percent' ? `${c.discountValue}%` : `${c.discountValue} FCFA`}
                  </p>
                  <p className="text-[10px] text-zinc-500">Minimum de commande : {c.minOrderAmount.toLocaleString('fr-FR')} FCFA</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: BACKEND SUPABASE MANAGER */}
        {activeTab === 'backend' && (
          <SupabaseBackendManager />
        )}

        {/* TAB 7: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl max-w-xl space-y-4 text-xs">
            <h3 className="text-sm font-mono font-bold uppercase text-[#C6FF00]">Paramètres du service ExpressH24</h3>
            <div>
              <label className="block text-zinc-400 mb-1 font-semibold">Numéro WhatsApp Réception Commandes</label>
              <input type="text" defaultValue="+221 77 648 14 20" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono" />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1 font-semibold">Horaire de Service</label>
              <input type="text" defaultValue="24H/24 • 7J/7 (365 jours par an)" disabled className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-[#C6FF00] font-mono" />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1 font-semibold">Zone Couverte Principale</label>
              <p className="text-zinc-300">Dakar Ville, Almadies, Ngor, Ouakam, Mermoz, Plateau, Fann, Parcelles, Guédiawaye, Pikine, Rufisque.</p>
            </div>
          </div>
        )}

      </div>

      {/* CREATE / EDIT PRODUCT MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 text-white space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <h3 className="font-mono font-bold text-[#C6FF00]">
                {editingProductId ? 'Modifier Produit' : 'Créer un Nouveau Produit'}
              </h3>
              <button onClick={() => setShowProductModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1">Nom du produit *</label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Catégorie *</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Prix (FCFA) *</label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Quantité Stock *</label>
                  <input
                    type="number"
                    required
                    value={prodStock}
                    onChange={(e) => setProdStock(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Format / Unité *</label>
                  <input
                    type="text"
                    required
                    value={prodUnit}
                    onChange={(e) => setProdUnit(e.target.value)}
                    placeholder="Ex: Bouteille 1.5L"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">URL Image Produit *</label>
                <input
                  type="text"
                  required
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Description</label>
                <textarea
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  rows={2}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#C6FF00] text-black font-extrabold py-3 rounded-xl text-xs mt-2"
              >
                Enregistrer le produit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* INVOICE PRINT MODAL */}
      {printingOrder && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-black rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setPrintingOrder(null)}
              className="absolute top-4 right-4 p-1 bg-gray-200 hover:bg-gray-300 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center border-b pb-4">
              <h2 className="text-xl font-black font-mono">EXPRESSH24 SÉNÉGAL</h2>
              <p className="text-xs text-gray-600">Livraison Express 24H/24 • 7J/7</p>
              <p className="text-xs text-gray-500 font-mono">WhatsApp: +221 77 648 14 20</p>
            </div>

            <div className="text-xs space-y-1">
              <p><strong>N° Facture :</strong> {printingOrder.id}</p>
              <p><strong>Client :</strong> {printingOrder.customerName} ({printingOrder.customerPhone})</p>
              <p><strong>Adresse :</strong> {printingOrder.address} ({printingOrder.neighborhood})</p>
              <p><strong>Paiement :</strong> {printingOrder.paymentMethod.toUpperCase()}</p>
            </div>

            <div className="border-t border-b py-2 space-y-1.5 text-xs">
              {printingOrder.items.map((it: any, idx: number) => (
                <div key={idx} className="flex justify-between">
                  <span>{it.quantity}x {it.product.name}</span>
                  <span className="font-mono">{(it.product.price * it.quantity).toLocaleString('fr-FR')} FCFA</span>
                </div>
              ))}
            </div>

            <div className="text-xs space-y-1 font-mono">
              <div className="flex justify-between">
                <span>Sous-total:</span>
                <span>{printingOrder.subtotal.toLocaleString('fr-FR')} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison Express:</span>
                <span>{printingOrder.deliveryFee.toLocaleString('fr-FR')} FCFA</span>
              </div>
              <div className="flex justify-between font-bold text-sm pt-1 border-t">
                <span>TOTAL PAYÉ:</span>
                <span>{printingOrder.total.toLocaleString('fr-FR')} FCFA</span>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full bg-black text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" /> Imprimer / Imprimer PDF
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
