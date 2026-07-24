import React, { useState, useEffect } from 'react';
import { Zap, Clock, ShoppingBag, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';

export const FlashOffersCarousel: React.FC = () => {
  const { products, addToCart, setSelectedProductDetail } = useShop();

  // Filter products with old price or flash badges
  const flashProducts = products.filter(
    (p) => p.oldPrice && p.price !== null && p.price < p.oldPrice
  ).slice(0, 8);

  // Live countdown timer state (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 3, minutes: 0, seconds: 0 }; // reset
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (flashProducts.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black border-y border-zinc-800/80 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#C6FF00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header with Timer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-black/60 border border-zinc-800/80 p-5 rounded-2xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#C6FF00] text-black rounded-xl font-black flex items-center justify-center animate-bounce">
              <Zap className="w-6 h-6 fill-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                  EN CE MOMENT
                </span>
                <span className="text-xs text-zinc-400 font-mono">Dakar Ventes Flash</span>
              </div>
              <h2 className="text-2xl font-black text-white font-mono mt-0.5">
                Offres Chrono & Ventes Flash
              </h2>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
            <Clock className="w-4 h-4 text-[#C6FF00]" />
            <span className="text-xs text-zinc-400 font-medium mr-1">Expire dans :</span>
            <div className="flex items-center gap-1 font-mono text-sm font-black text-[#C6FF00]">
              <span className="bg-black px-2 py-1 rounded border border-zinc-800">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span>:</span>
              <span className="bg-black px-2 py-1 rounded border border-zinc-800">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="bg-black px-2 py-1 rounded border border-zinc-800">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {flashProducts.map((p) => {
            const discountPercent = p.oldPrice && p.price
              ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
              : 0;

            return (
              <div
                key={p.id}
                className="bg-zinc-900/90 border border-zinc-800 hover:border-[#C6FF00]/50 rounded-2xl p-4 flex flex-col justify-between transition-all hover:-translate-y-1 group relative shadow-lg"
              >
                {/* Discount Badge */}
                <div className="absolute top-3 left-3 z-10 bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-lg shadow-md font-mono flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  -{discountPercent}%
                </div>

                {/* Image */}
                <div
                  onClick={() => setSelectedProductDetail(p)}
                  className="cursor-pointer overflow-hidden rounded-xl bg-zinc-950 mb-3 relative group"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold text-white bg-black/40 backdrop-blur-xs">
                    Voir détails
                  </div>
                </div>

                {/* Details */}
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                    {p.categoryName}
                  </span>
                  <h3
                    onClick={() => setSelectedProductDetail(p)}
                    className="text-sm font-extrabold text-white line-clamp-1 hover:text-[#C6FF00] cursor-pointer"
                  >
                    {p.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-lg font-black text-[#C6FF00] font-mono">
                      {p.price?.toLocaleString('fr-FR')} FCFA
                    </span>
                    {p.oldPrice && (
                      <span className="text-xs text-zinc-500 line-through">
                        {p.oldPrice.toLocaleString('fr-FR')} FCFA
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono block mt-0.5">
                    Format: {p.unit}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(p, 1)}
                  className="mt-4 w-full bg-[#C6FF00] hover:bg-[#b0e600] text-black font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ajouter en 1-Clic</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
