import React from 'react';
import { Order } from '../types';
import { User, MapPin, Package, Heart, LogOut, Phone, ShieldCheck } from 'lucide-react';

interface UserProfilePageProps {
  user: { name: string; phone: string; email: string; role: 'customer' | 'admin' } | null;
  orders: Order[];
  onLogout: () => void;
  setCurrentTab: (tab: string) => void;
}

export const UserProfilePage: React.FC<UserProfilePageProps> = ({
  user,
  orders,
  onLogout,
  setCurrentTab
}) => {
  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-zinc-400">Veuillez vous connecter pour accéder à votre profil.</p>
          <button
            onClick={() => setCurrentTab('auth')}
            className="py-2.5 px-6 rounded-xl bg-[#C6FF00] text-black font-extrabold text-xs"
          >
            Se Connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* User Banner */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#C6FF00] text-black font-black text-2xl flex items-center justify-center italic">
              {user.name.charAt(0)}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white">{user.name}</h1>
                {user.role === 'admin' && (
                  <span className="bg-[#C6FF00] text-black text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#C6FF00]" />
                <span>{user.phone}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="py-2.5 px-5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-red-400 text-xs font-bold flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>

        {/* Order History */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-black uppercase text-white tracking-wider flex items-center gap-2">
            <Package className="w-4 h-4 text-[#C6FF00]" />
            <span>Historique des Commandes Dakar ({orders.length})</span>
          </h2>

          {orders.length === 0 ? (
            <p className="text-xs text-zinc-500 py-4">Vous n'avez pas encore passé de commande.</p>
          ) : (
            <div className="space-y-3">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="p-4 rounded-xl bg-black/60 border border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-bold text-[#C6FF00]">N° {o.trackingNumber}</span>
                    <p className="text-zinc-400 text-[11px]">{new Date(o.createdAt).toLocaleDateString('fr-FR')} • {o.items.length} article(s)</p>
                    <p className="text-zinc-500 text-[10px]">Quartier : {o.customer.district}</p>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="font-black text-white">{o.total.toLocaleString('fr-FR')} FCFA</span>
                    <button
                      onClick={() => setCurrentTab('tracking')}
                      className="py-1.5 px-3 rounded-lg bg-[#C6FF00] text-black font-extrabold text-[11px]"
                    >
                      Suivre GPS
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
