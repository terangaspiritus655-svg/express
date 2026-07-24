import React, { useState } from 'react';
import { Smartphone, Download, QrCode, CheckCircle, Sparkles, ShieldCheck } from 'lucide-react';

export const AppDownloadSection: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleInstallClick = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border-b border-zinc-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          {/* Left Content */}
          <div className="max-w-xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C6FF00] bg-black border border-zinc-800 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              EXPRESSH24 MOBILE SÉNÉGAL
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 font-mono leading-tight">
              Téléchargez l'Application ExpressH24 Dakar
            </h2>

            <p className="text-sm text-zinc-300 mt-3 leading-relaxed">
              Commandez vos boissons, courses et urgences en 2 clics depuis votre smartphone. Suivi GPS en direct de votre livreur en scooter, notifications Wave & réductions exclusives !
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <CheckCircle className="w-4 h-4 text-[#C6FF00] shrink-0" />
                <span>Commandes en 1-Clic 24h/24</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <CheckCircle className="w-4 h-4 text-[#C6FF00] shrink-0" />
                <span>Suivi du livreur en temps réel</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <CheckCircle className="w-4 h-4 text-[#C6FF00] shrink-0" />
                <span>Paiement 100% sécurisé Wave/OM</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <CheckCircle className="w-4 h-4 text-[#C6FF00] shrink-0" />
                <span>1000 FCFA offerts sur l'App</span>
              </div>
            </div>

            {/* App Stores & Installation Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={handleInstallClick}
                className="bg-[#C6FF00] hover:bg-[#b0e600] text-black font-extrabold px-6 py-3.5 rounded-2xl text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Installer Web App / PWA (Android & iOS)</span>
              </button>

              <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                <QrCode className="w-5 h-5 text-[#C6FF00]" />
                <span>Scannez pour installer</span>
              </div>
            </div>

            {downloadSuccess && (
              <p className="mt-3 text-xs text-[#C6FF00] font-bold flex items-center gap-1.5 animate-pulse">
                <CheckCircle className="w-4 h-4" />
                ExpressH24 est prêt à être installé sur votre écran d'accueil !
              </p>
            )}
          </div>

          {/* Right Visual / Phone Mockup */}
          <div className="relative shrink-0 w-full md:w-72 flex justify-center">
            <div className="w-64 h-[360px] bg-black rounded-[40px] border-4 border-zinc-700 p-4 shadow-2xl relative flex flex-col justify-between">
              {/* Notch */}
              <div className="w-24 h-4 bg-zinc-800 rounded-b-xl mx-auto absolute top-0 left-1/2 -translate-x-1/2 z-20" />

              <div className="mt-4 text-center">
                <div className="w-12 h-12 bg-[#C6FF00] rounded-xl mx-auto flex items-center justify-center text-black font-black text-xl mb-2 font-mono">
                  H24
                </div>
                <h4 className="text-white font-bold text-xs">ExpressH24 Dakar</h4>
                <p className="text-[10px] text-zinc-400">Livraison 15-20 min</p>
              </div>

              {/* Fake QR Code */}
              <div className="bg-white p-3 rounded-2xl mx-auto shadow-inner border border-zinc-300 my-2">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=https://expressh24.sn"
                  alt="ExpressH24 QR Code"
                  className="w-28 h-28 mx-auto"
                />
              </div>

              <p className="text-[10px] text-center text-zinc-400 font-mono">
                Scannez avec l'appareil photo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
