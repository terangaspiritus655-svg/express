import React, { useState, useEffect } from 'react';
import { Navigation, Phone, ShieldCheck, Clock, MapPin, CheckCircle2, User } from 'lucide-react';

interface GpsTrackerMapProps {
  trackingNumber: string;
  status: 'received' | 'preparing' | 'delivering' | 'delivered';
  customerDistrict?: string;
  driverName?: string;
  driverPhone?: string;
}

export const GpsTrackerMap: React.FC<GpsTrackerMapProps> = ({
  trackingNumber,
  status,
  customerDistrict = 'Almadies',
  driverName = 'Mamadou Diallo',
  driverPhone = '+221 77 648 14 20'
}) => {
  // Simulated progress 0% to 100%
  const [scooterProgress, setScooterProgress] = useState(
    status === 'received' ? 10 : status === 'preparing' ? 35 : status === 'delivering' ? 70 : 100
  );

  useEffect(() => {
    if (status === 'delivering') {
      const interval = setInterval(() => {
        setScooterProgress((prev) => (prev < 95 ? prev + 1 : prev));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Map Header Info */}
      <div className="p-4 bg-black/60 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#C6FF00] animate-ping" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            GPS Suivi En Direct • Dakar
          </span>
        </div>

        <div className="text-xs text-zinc-400">
          N° Suivi : <strong className="text-[#C6FF00]">{trackingNumber}</strong>
        </div>
      </div>

      {/* Dakar Map Visual Canvas */}
      <div className="relative h-72 bg-zinc-950 overflow-hidden flex items-center justify-center">
        {/* Background Stylized Map Grid Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

        {/* Dakar Map Landmarks Graphics */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-20 text-[10px] text-zinc-500 font-mono">
          <div className="flex justify-between">
            <span>[LES ALMADIES]</span>
            <span>[YOFF AIRPORT]</span>
            <span>[PARCELLES]</span>
          </div>
          <div className="flex justify-between">
            <span>[MERMOZ / VDN]</span>
            <span>[POINT E]</span>
            <span>[HLM]</span>
          </div>
          <div className="flex justify-between">
            <span>[FANN RÉSIDENCE]</span>
            <span>[MÉDINA]</span>
            <span>[DAKAR PLATEAU]</span>
          </div>
        </div>

        {/* Route Path Line */}
        <svg className="absolute inset-0 w-full h-full stroke-zinc-800" strokeWidth="4" fill="none">
          <path
            d="M 60 200 Q 180 80, 320 140 T 580 100"
            strokeDasharray="6,6"
            className="stroke-zinc-700"
          />
          <path
            d="M 60 200 Q 180 80, 320 140 T 580 100"
            stroke="#C6FF00"
            strokeWidth="3"
            strokeDasharray="500"
            strokeDashoffset={500 - (scooterProgress / 100) * 500}
            className="transition-all duration-1000"
          />
        </svg>

        {/* Depot / Warehouse Marker */}
        <div className="absolute left-[8%] bottom-[25%] flex flex-col items-center">
          <div className="p-2 rounded-xl bg-zinc-900 border border-[#C6FF00] text-[#C6FF00] shadow-[0_0_15px_rgba(198,255,0,0.3)]">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-white mt-1 bg-black/80 px-2 py-0.5 rounded border border-zinc-800">
            Hub ExpressH24
          </span>
        </div>

        {/* Destination Customer Marker */}
        <div className="absolute right-[10%] top-[25%] flex flex-col items-center">
          <div className="p-2 rounded-xl bg-[#C6FF00] text-black font-black shadow-[0_0_20px_rgba(198,255,0,0.5)] animate-bounce">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-extrabold text-[#C6FF00] mt-1 bg-black px-2 py-0.5 rounded border border-[#C6FF00]">
            Destination : {customerDistrict}
          </span>
        </div>

        {/* Moving Scooter Marker */}
        <div
          className="absolute transition-all duration-1000 flex flex-col items-center z-20"
          style={{
            left: `${12 + (scooterProgress / 100) * 72}%`,
            top: `${50 - Math.sin((scooterProgress / 100) * Math.PI) * 25}%`
          }}
        >
          <div className="p-2.5 rounded-full bg-emerald-500 text-black shadow-[0_0_25px_rgba(16,185,129,0.8)] border-2 border-white animate-pulse">
            <Navigation className="w-5 h-5 fill-black" />
          </div>
          <span className="text-[9px] font-black bg-emerald-950 text-emerald-400 border border-emerald-500 px-2 py-0.5 rounded mt-1 whitespace-nowrap">
            Livreur Express
          </span>
        </div>
      </div>

      {/* Driver Card & Real-time ETA */}
      <div className="p-4 bg-zinc-900 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-800 border border-[#C6FF00]/40 flex items-center justify-center text-[#C6FF00] font-black">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-white font-bold">{driverName}</h5>
            <p className="text-zinc-400 text-[11px]">Livreur Officiel ExpressH24</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800">
          <Clock className="w-5 h-5 text-[#C6FF00]" />
          <div>
            <span className="text-zinc-400 block text-[10px]">Temps d'arrivée estimé :</span>
            <span className="text-white font-black text-sm">
              {status === 'delivered' ? 'Commande Livrée' : '12 à 15 minutes'}
            </span>
          </div>
        </div>

        <a
          href={`tel:${driverPhone.replace(/\s+/g, '')}`}
          className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-2.5 px-4 rounded-xl transition-colors text-xs shadow"
        >
          <Phone className="w-4 h-4" />
          <span>Appeler le livreur ({driverPhone})</span>
        </a>
      </div>
    </div>
  );
};
