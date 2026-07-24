import React, { useState, useEffect } from 'react';
import { Search, CheckCircle2, Clock, Truck, MapPin, Phone, MessageCircle, ShieldCheck, UserCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderTracker: React.FC = () => {
  const { orders, trackingOrderId, setTrackingOrderId, drivers } = useShop();
  const [inputSearchId, setInputSearchId] = useState(trackingOrderId || '');
  const [selectedOrder, setSelectedOrder] = useState(() => {
    if (trackingOrderId) {
      return orders.find((o) => o.id === trackingOrderId) || orders[0];
    }
    return orders[0];
  });

  useEffect(() => {
    if (trackingOrderId) {
      const found = orders.find((o) => o.id === trackingOrderId);
      if (found) setSelectedOrder(found);
      setInputSearchId(trackingOrderId);
    }
  }, [trackingOrderId, orders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = inputSearchId.trim().toUpperCase();
    const found = orders.find((o) => o.id === cleanId || o.id.includes(cleanId));
    if (found) {
      setSelectedOrder(found);
      setTrackingOrderId(found.id);
    } else {
      alert(`Commande "${cleanId}" introuvable. Essayez avec le numéro reçu.`);
    }
  };

  const currentDriver = drivers.find((d) => d.id === selectedOrder?.driverId) || drivers[0];

  const steps = [
    { step: 1, id: 'received', title: 'Commande reçue', desc: 'Saisie dans le système ExpressH24' },
    { step: 2, id: 'preparing', title: 'Préparation', desc: 'Mise en sac de vos articles au dépôt' },
    { step: 3, id: 'on_the_way', title: 'Livreur en route', desc: 'En cours de transport sur le scooter' },
    { step: 4, id: 'delivered', title: 'Livrée', desc: 'Remise en mains propres' }
  ];

  return (
    <div className="py-12 bg-black text-white min-h-screen border-b border-zinc-900">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header Title */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C6FF00] bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
            SUIVI DE COMMANDE EN DIRECT
          </span>
          <h1 className="text-3xl font-black font-mono">Suivez votre livreur à Dakar</h1>
          <p className="text-xs text-zinc-400">
            Entrez votre numéro de commande reçu par SMS ou WhatsApp pour voir la position et le statut en temps réel.
          </p>
        </div>

        {/* Order Search Box */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-10 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inputSearchId}
              onChange={(e) => setInputSearchId(e.target.value)}
              placeholder="Exemple: EXH-2026-8912"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-3 text-xs text-white font-mono uppercase focus:outline-none focus:border-[#C6FF00]"
            />
          </div>
          <button
            type="submit"
            className="bg-[#C6FF00] hover:bg-[#b0e600] text-black font-extrabold px-6 rounded-xl text-xs flex items-center gap-1.5"
          >
            <span>Suivre</span>
          </button>
        </form>

        {selectedOrder ? (
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-8">
            
            {/* Top Order Summary Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-900 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black font-mono text-[#C6FF00]">
                    {selectedOrder.id}
                  </span>
                  <span className="bg-zinc-900 text-zinc-300 text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-800 uppercase">
                    {selectedOrder.deliveryType === 'express' ? '⚡ Express 15-20 Min' : 'Standard'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Passée le {new Date(selectedOrder.createdAt).toLocaleDateString('fr-FR')} à{' '}
                  {new Date(selectedOrder.createdAt).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-zinc-400">Total Commande</span>
                <p className="text-lg font-black text-white font-mono">
                  {selectedOrder.total.toLocaleString('fr-FR')} FCFA
                </p>
                <p className="text-[10px] text-emerald-400 font-semibold mb-2">
                  Paiement : {selectedOrder.paymentMethod.toUpperCase()} ({selectedOrder.paymentStatus})
                </p>
                <button
                  onClick={() => {
                    const printWindow = window.open('', '_blank');
                    if (!printWindow) return;
                    printWindow.document.write(`
                      <html>
                        <head><title>Facture ${selectedOrder.id}</title></head>
                        <body style="font-family:sans-serif;padding:20px;">
                          <h2>EXPRESSH24 DAKAR - FACTURE ${selectedOrder.id}</h2>
                          <p>Client: ${selectedOrder.customerName} (${selectedOrder.customerPhone})</p>
                          <p>Adresse: ${selectedOrder.address}, ${selectedOrder.neighborhood}</p>
                          <hr/>
                          <p><strong>Total: ${selectedOrder.total.toLocaleString('fr-FR')} FCFA</strong></p>
                        </body>
                      </html>
                    `);
                    printWindow.document.close();
                    printWindow.print();
                  }}
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] font-bold px-2.5 py-1 rounded-lg inline-flex items-center gap-1"
                >
                  📄 Imprimer Facture PDF
                </button>
              </div>
            </div>

            {/* Stepper Status Timeline */}
            <div className="py-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                {steps.map((st) => {
                  const isPassed = selectedOrder.trackingStep >= st.step;
                  const isCurrent = selectedOrder.trackingStep === st.step;

                  return (
                    <div
                      key={st.step}
                      className={`p-4 rounded-xl border transition-all ${
                        isCurrent
                          ? 'bg-[#C6FF00]/10 border-[#C6FF00] shadow-[0_0_15px_rgba(198,255,0,0.15)]'
                          : isPassed
                          ? 'bg-zinc-900/80 border-zinc-800 text-zinc-300'
                          : 'bg-zinc-900/30 border-zinc-900 text-zinc-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`w-7 h-7 rounded-full text-xs font-bold font-mono flex items-center justify-center ${
                            isCurrent
                              ? 'bg-[#C6FF00] text-black font-extrabold'
                              : isPassed
                              ? 'bg-zinc-800 text-[#C6FF00]'
                              : 'bg-zinc-900 text-zinc-600'
                          }`}
                        >
                          {st.step}
                        </span>
                        {isPassed && <CheckCircle2 className="w-4 h-4 text-[#C6FF00]" />}
                      </div>

                      <h4 className="text-xs font-bold text-white mb-0.5">{st.title}</h4>
                      <p className="text-[10px] text-zinc-400 leading-tight">{st.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Driver Info & Live Location Map Simulation */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-zinc-900">
              
              {/* Driver Card */}
              <div className="md:col-span-5 bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-4">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#C6FF00]">
                  <UserCheck className="w-4 h-4" />
                  <span>VOTRE LIVREUR ATTRIBUÉ</span>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={currentDriver.avatar}
                    alt={currentDriver.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#C6FF00]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white">{currentDriver.name}</h3>
                    <p className="text-xs text-zinc-400">{currentDriver.vehicle}</p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-zinc-400">
                      <span className="bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800 text-[#C6FF00]">
                        {currentDriver.licensePlate}
                      </span>
                      <span>★ {currentDriver.rating} ({currentDriver.totalDeliveries} courses)</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href={`tel:${currentDriver.phone.replace(/\s+/g, '')}`}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-zinc-700"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Appeler</span>
                  </a>

                  <a
                    href={`https://wa.me/${currentDriver.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(currentDriver.name)},%20je%20suis%20le%20client%20de%20la%20commande%20${selectedOrder.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-black" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Map GPS Simulation */}
              <div className="md:col-span-7 bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between text-xs mb-2 z-10">
                  <span className="font-mono font-bold text-white flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#C6FF00]" />
                    Position GPS du scooter
                  </span>
                  <span className="text-[10px] bg-[#C6FF00] text-black px-2 py-0.5 rounded font-black uppercase">
                    Mise à jour direct
                  </span>
                </div>

                {/* Simulated Map Graphic */}
                <div className="h-44 bg-zinc-950 rounded-lg relative overflow-hidden border border-zinc-800 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(#C6FF00_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                  
                  {/* Road lines graphic */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-1 bg-zinc-800 transform -rotate-12" />
                    <div className="w-1 h-full bg-zinc-800 transform rotate-45" />
                  </div>

                  {/* Scooter Marker */}
                  <div className="relative z-10 flex flex-col items-center animate-bounce">
                    <div className="w-10 h-10 rounded-full bg-[#C6FF00] text-black flex items-center justify-center shadow-[0_0_20px_rgba(198,255,0,0.6)]">
                      <Truck className="w-5 h-5" />
                    </div>
                    <span className="mt-1 bg-black text-[#C6FF00] font-mono text-[9px] px-2 py-0.5 rounded border border-[#C6FF00]/40">
                      Livreur en route : {selectedOrder.neighborhood}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-2 z-10">
                  <span>Destination : {selectedOrder.address}</span>
                  <span className="font-mono text-[#C6FF00] font-bold">~15 minutes estimées</span>
                </div>
              </div>
            </div>

            {/* Items Breakdown */}
            <div className="pt-4 border-t border-zinc-900">
              <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-3">
                Contenu du colis Express ({selectedOrder.items.length} articles)
              </h4>

              <div className="space-y-2">
                {selectedOrder.items.map((it: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800/80 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={it.product.image}
                        alt={it.product.name}
                        className="w-10 h-10 object-cover rounded bg-zinc-950"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-bold text-white">{it.product.name}</p>
                        <p className="text-[10px] text-zinc-400 font-mono">
                          {it.product.price.toLocaleString('fr-FR')} FCFA x {it.quantity}
                        </p>
                      </div>
                    </div>

                    <span className="font-mono font-bold text-[#C6FF00]">
                      {(it.product.price * it.quantity).toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-12 bg-zinc-950 rounded-xl border border-zinc-800">
            <p className="text-sm text-zinc-400">Aucune commande sélectionnée pour le suivi.</p>
          </div>
        )}
      </div>
    </div>
  );
};
