import React from 'react';
import { Phone, MessageCircle, Navigation, Utensils } from 'lucide-react';
import { restaurantData } from '../data/restaurantData';

interface MobileStickyCTAProps {
  onOpenMenu?: () => void;
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = () => {
  const whatsappUrl = `https://wa.me/${restaurantData.whatsappNumber}?text=${encodeURIComponent(
    "Hello Mannat Cafe & Restaurant, I would like to place an order / check the menu."
  )}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d0f12]/95 backdrop-blur-lg border-t border-white/10 px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-4 gap-1.5 text-center">
        
        {/* Call */}
        <a
          href={`tel:${restaurantData.phoneRaw}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-white/5 active:bg-[#d48b38]/20 text-[#ede8df] hover:text-[#d48b38] transition-colors"
        >
          <Phone className="w-4 h-4 text-[#d48b38] mb-0.5" />
          <span className="text-[10px] font-semibold tracking-wide">Call</span>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-emerald-500/10 active:bg-emerald-500/25 text-emerald-300 hover:text-emerald-200 transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-wide">WhatsApp</span>
        </a>

        {/* Directions */}
        <a
          href={restaurantData.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-white/5 active:bg-white/15 text-[#ede8df] hover:text-[#d48b38] transition-colors"
        >
          <Navigation className="w-4 h-4 text-sky-400 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-wide">Directions</span>
        </a>

        {/* Menu */}
        <a
          href="#menu"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#d48b38] active:bg-[#e29d4c] text-[#0d0f12] font-bold shadow-md transition-all"
        >
          <Utensils className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-wide">Menu</span>
        </a>

      </div>
    </div>
  );
};
