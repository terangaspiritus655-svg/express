import React, { useState } from 'react';
import { User, Phone, Lock, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface AuthPageProps {
  onLoginSuccess: (user: { name: string; phone: string; email: string; role: 'customer' | 'admin' }) => void;
  setCurrentTab: (tab: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess, setCurrentTab }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    const role = phone.includes('776481420') || phone.includes('admin') ? 'admin' : 'customer';

    onLoginSuccess({
      name: name || (role === 'admin' ? 'Administrateur ExpressH24' : 'Client ExpressH24'),
      phone,
      email: `${phone.replace(/\s+/g, '')}@expressh24.sn`,
      role
    });

    setCurrentTab(role === 'admin' ? 'admin' : 'profile');
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6 shadow-2xl">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#C6FF00] text-black font-black italic text-2xl flex items-center justify-center mx-auto mb-2">
            24
          </div>
          <h1 className="text-2xl font-black italic text-white">
            {isRegister ? 'Créer un Compte ExpressH24' : 'Connexion Espace Client'}
          </h1>
          <p className="text-xs text-zinc-400">
            Suivez vos commandes en direct et sauvegardez vos adresses à Dakar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="block text-zinc-400 font-bold mb-1">Nom Complet</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Aminata Sow"
                className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C6FF00]"
              />
            </div>
          )}

          <div>
            <label className="block text-zinc-400 font-bold mb-1">Téléphone Sénégal *</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex: 77 648 14 20"
                className="w-full bg-black border border-zinc-800 rounded-xl pl-10 pr-3.5 py-2.5 text-white focus:outline-none focus:border-[#C6FF00]"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 font-bold mb-1">Mot de passe *</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black border border-zinc-800 rounded-xl pl-10 pr-3.5 py-2.5 text-white focus:outline-none focus:border-[#C6FF00]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#C6FF00] hover:bg-[#b0e600] text-black font-black text-xs uppercase flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(198,255,0,0.3)]"
          >
            <span>{isRegister ? 'Créer mon compte' : 'Se Connecter'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-zinc-400 hover:text-[#C6FF00] underline"
          >
            {isRegister ? 'Déjà un compte ? Connectez-vous' : "Pas encore de compte ? S'inscrire"}
          </button>
        </div>

        <div className="p-3 bg-black/50 rounded-xl border border-zinc-800 text-[10px] text-zinc-500 text-center">
          Astuce : Connectez-vous avec le numéro <strong className="text-[#C6FF00]">776481420</strong> pour accéder à l'Espace Administrateur ExpressH24.
        </div>

      </div>
    </div>
  );
};
