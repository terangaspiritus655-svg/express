import React from 'react';
import { Order } from '../types';
import { X, Printer, Download, CheckCircle2 } from 'lucide-react';

interface InvoicePrintModalProps {
  order: Order | null;
  onClose: () => void;
}

export const InvoicePrintModal: React.FC<InvoicePrintModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-white text-zinc-900 rounded-2xl overflow-hidden shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto">
        
        {/* Modal Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-2 print:hidden">
          <button
            onClick={handlePrint}
            className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimer Facture</span>
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-100 text-zinc-600 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Receipt Content */}
        <div className="space-y-6">
          {/* Header logo & order # */}
          <div className="flex justify-between items-start border-b pb-6">
            <div>
              <h1 className="text-2xl font-black italic tracking-tight text-black">
                express<span className="text-lime-600">H24</span>
              </h1>
              <p className="text-xs text-zinc-500 font-medium">Livraison Express 24H/24 • 7J/7 à Dakar</p>
              <p className="text-xs text-zinc-500">Tél : +221 77 648 14 20</p>
            </div>

            <div className="text-right">
              <span className="inline-block bg-lime-100 text-lime-800 text-xs font-black px-3 py-1 rounded-full uppercase mb-1">
                Facture Acquittée
              </span>
              <p className="text-xs font-mono font-bold text-zinc-800">N° {order.trackingNumber}</p>
              <p className="text-[11px] text-zinc-500">{new Date(order.createdAt).toLocaleString('fr-FR')}</p>
            </div>
          </div>

          {/* Customer & Address Details */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-zinc-50 p-4 rounded-xl">
            <div>
              <h4 className="font-bold text-zinc-700 uppercase tracking-wider mb-1">Client :</h4>
              <p className="font-bold text-black">{order.customer.name}</p>
              <p className="text-zinc-600">{order.customer.phone}</p>
            </div>

            <div>
              <h4 className="font-bold text-zinc-700 uppercase tracking-wider mb-1">Livraison :</h4>
              <p className="font-bold text-black">{order.customer.district}</p>
              <p className="text-zinc-600">{order.customer.address}</p>
              {order.customer.instructions && (
                <p className="text-zinc-500 italic mt-1">Note : {order.customer.instructions}</p>
              )}
            </div>
          </div>

          {/* Order Items Table */}
          <div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b text-zinc-500 uppercase font-bold text-[10px]">
                  <th className="py-2">Article</th>
                  <th className="py-2 text-center">Qté</th>
                  <th className="py-2 text-right">Prix Unitaire</th>
                  <th className="py-2 text-right">Total FCFA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {order.items.map((item, i) => (
                  <tr key={i}>
                    <td className="py-2.5 font-medium text-zinc-800">{item.product.name}</td>
                    <td className="py-2.5 text-center font-bold">{item.quantity}</td>
                    <td className="py-2.5 text-right text-zinc-600">{item.product.price.toLocaleString('fr-FR')} FCFA</td>
                    <td className="py-2.5 text-right font-bold text-black">
                      {(item.product.price * item.quantity).toLocaleString('fr-FR')} FCFA
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Subtotals & Payment Info */}
          <div className="border-t pt-4 flex justify-between items-end">
            <div className="text-xs space-y-1">
              <p className="text-zinc-500">
                Mode de paiement : <strong className="text-black uppercase">{order.paymentMethod}</strong>
              </p>
              <p className="text-zinc-500">
                Livreur : <strong className="text-black">{order.driverName || 'ExpressH24 Dispatch'}</strong>
              </p>
            </div>

            <div className="text-right text-xs space-y-1 w-48">
              <div className="flex justify-between text-zinc-600">
                <span>Sous-total :</span>
                <span>{order.subtotal.toLocaleString('fr-FR')} FCFA</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Frais livraison :</span>
                <span>{order.deliveryFee.toLocaleString('fr-FR')} FCFA</span>
              </div>
              <div className="flex justify-between font-black text-sm text-black border-t pt-2 mt-2">
                <span>TOTAL :</span>
                <span className="text-lime-700">{order.total.toLocaleString('fr-FR')} FCFA</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center text-[10px] text-zinc-400 border-t pt-4">
            Merci d'avoir choisi ExpressH24 Dakar ! Service client 24/7 au 77 648 14 20.
          </div>

        </div>
      </div>
    </div>
  );
};
