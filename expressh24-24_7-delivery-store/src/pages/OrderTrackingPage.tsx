import React, { useState } from 'react';
import { Order } from '../types';
import { GpsTrackerMap } from '../components/GpsTrackerMap';
import { InvoicePrintModal } from '../components/InvoicePrintModal';
import { Search, CheckCircle2, Clock, Truck, PackageCheck, Printer, Phone, MessageSquare } from 'lucide-react';
import { EXPRESS_H24_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface OrderTrackingPageProps {
  orders: Order[];
  recentOrder: Order | null;
}

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({ orders, recentOrder }) => {
  const [searchCode, setSearchCode] = useState(recentOrder?.trackingNumber || '');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(recentOrder || (orders.length > 0 ? orders[0] : null));
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    const found = orders.find(
      (o) => o.trackingNumber.toLowerCase() === searchCode.trim().toLowerCase() || o.id.toLowerCase() === searchCode.trim().toLowerCase()
    );

    if (found) {
      setSelectedOrder(found);
    } else {
      alert('Aucune commande trouvée avec ce numéro. Essayez un numéro au format EXH-XXXXX ou passez commande.');
    }
  };

  const getStepStatus = (step: 'received' | 'preparing' | 'delivering' | 'delivered') => {
    if (!selectedOrder) return 'pending';
    const stages = ['received', 'preparing', 'delivering', 'delivered'];
    const currentIndex = stages.indexOf(selectedOrder.status);
    const stepIndex = stages.indexOf(step);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 pt-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title */}
        <div className="border-b border-zinc-800 pb-4 text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#C6FF00] uppercase tracking-wider block">
            Suivi Temps Réel Dakar
          </span>
          <h1 className="text-3xl font-black text-white italic">
            Où est ma commande ExpressH24 ?
          </h1>
          <p className="text-xs text-zinc-400">
            Saisissez votre code de suivi (ex: EXH-98421) ou visualisez votre dernière commande en cours.
          </p>
        </div>

        {/* Search Bar Form */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Code de suivi (ex: EXH-84920)..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white uppercase focus:outline-none focus:border-[#C6FF00]"
            />
          </div>

          <button
            type="submit"
            className="py-2.5 px-5 bg-[#C6FF00] hover:bg-[#b0e600] text-black font-extrabold text-xs rounded-xl"
          >
            Rechercher
          </button>
        </form>

        {selectedOrder ? (
          <div className="space-y-8">
            
            {/* Step Progress Bar */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block">COMMANDE N°</span>
                  <span className="text-lg font-black text-[#C6FF00]">{selectedOrder.trackingNumber}</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block">LIVRAISON ESTIMÉE</span>
                  <span className="text-xs font-bold text-white">{selectedOrder.estimatedDeliveryTime}</span>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                
                {/* Step 1 */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${
                    getStepStatus('received') === 'completed' || getStepStatus('received') === 'active'
                      ? 'bg-[#C6FF00] text-black shadow-[0_0_15px_rgba(198,255,0,0.4)]'
                      : 'bg-zinc-800 text-zinc-500'
                  }`}>
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-white text-[11px]">Reçue</span>
                  <span className="text-[9px] text-zinc-500 hidden sm:inline">Confirmée</span>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${
                    getStepStatus('preparing') === 'completed' || getStepStatus('preparing') === 'active'
                      ? 'bg-[#C6FF00] text-black shadow-[0_0_15px_rgba(198,255,0,0.4)]'
                      : 'bg-zinc-800 text-zinc-500'
                  }`}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-white text-[11px]">Préparation</span>
                  <span className="text-[9px] text-zinc-500 hidden sm:inline">Emballage neutre</span>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${
                    getStepStatus('delivering') === 'completed' || getStepStatus('delivering') === 'active'
                      ? 'bg-[#C6FF00] text-black shadow-[0_0_15px_rgba(198,255,0,0.4)] animate-bounce'
                      : 'bg-zinc-800 text-zinc-500'
                  }`}>
                    <Truck className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-[#C6FF00] text-[11px]">Livreur en route</span>
                  <span className="text-[9px] text-zinc-500 hidden sm:inline">GPS Actif</span>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${
                    getStepStatus('delivered') === 'completed' || getStepStatus('delivered') === 'active'
                      ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                      : 'bg-zinc-800 text-zinc-500'
                  }`}>
                    <PackageCheck className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-white text-[11px]">Livrée</span>
                  <span className="text-[9px] text-zinc-500 hidden sm:inline">Terminée</span>
                </div>

              </div>
            </div>

            {/* GPS Map Component */}
            <GpsTrackerMap
              trackingNumber={selectedOrder.trackingNumber}
              status={selectedOrder.status as any}
              customerDistrict={selectedOrder.customer.district}
              driverName={selectedOrder.driverName}
              driverPhone={selectedOrder.driverPhone}
            />

            {/* Order Items & Actions */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h3 className="text-sm font-bold text-white mb-2">Détails de la livraison :</h3>
                <p className="text-xs text-zinc-300">Client : {selectedOrder.customer.name} ({selectedOrder.customer.phone})</p>
                <p className="text-xs text-zinc-300">Adresse : {selectedOrder.customer.address}, {selectedOrder.customer.district}</p>
                <p className="text-xs text-[#C6FF00] font-bold mt-1">Montant total : {selectedOrder.total.toLocaleString('fr-FR')} FCFA ({selectedOrder.paymentMethod.toUpperCase()})</p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => setShowInvoiceModal(true)}
                  className="flex-1 md:flex-initial py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4 text-[#C6FF00]" />
                  <span>Voir Facture</span>
                </button>

                <a
                  href={`https://wa.me/${EXPRESS_H24_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-initial py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Support WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center my-8">
            <Truck className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">Aucune commande sélectionnée</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Saisissez votre code de suivi dans la barre de recherche ci-dessus pour afficher le trajet GPS du livreur.
            </p>
          </div>
        )}

      </div>

      <InvoicePrintModal
        order={showInvoiceModal ? selectedOrder : null}
        onClose={() => setShowInvoiceModal(false)}
      />
    </div>
  );
};
