import React from 'react';
import { ShieldAlert, Check, X } from 'lucide-react';

interface AgeModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const AgeModal: React.FC<AgeModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="max-w-md w-full bg-zinc-900 border border-red-600/50 rounded-2xl p-6 text-center shadow-2xl text-white">
        <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-600/60 text-red-500 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-black mb-2 text-white">Vérification de la majorité (+18 ans)</h3>

        <p className="text-xs text-zinc-300 leading-relaxed mb-6">
          Ce produit appartient à la catégorie <strong className="text-red-400">Alcool ou Fumeurs</strong>. 
          Conformément à la réglementation au Sénégal, la vente est strictement interdite aux mineurs de moins de 18 ans. 
          Confirmez-vous avoir au moins 18 ans ?
        </p>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onCancel}
            className="py-3 px-4 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
          >
            Non, j'ai moins de 18 ans
          </button>

          <button
            onClick={onConfirm}
            className="py-3 px-4 rounded-xl text-xs font-black bg-red-600 hover:bg-red-500 text-white transition-all shadow-lg flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Oui, j'ai 18 ans ou plus</span>
          </button>
        </div>
      </div>
    </div>
  );
};
