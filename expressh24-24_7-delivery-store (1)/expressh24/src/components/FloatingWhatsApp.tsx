import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const FloatingWhatsApp: React.FC = () => {
  const { getWhatsAppUrl } = useShop();

  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-black p-3.5 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-transform hover:scale-110 flex items-center gap-2 font-bold text-xs"
      title="Commander sur WhatsApp 77 648 14 20"
    >
      <MessageCircle className="w-6 h-6 fill-black" />
      <span className="hidden md:inline font-mono">WhatsApp 24/7 (77 648 14 20)</span>
    </a>
  );
};
