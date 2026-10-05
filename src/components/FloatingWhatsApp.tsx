import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { restaurantData } from '../data/restaurantData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const defaultMsg = encodeURIComponent(
    "Hello Mannat Cafe & Restaurant, I would like to know more about your menu/order options."
  );

  return (
    <div className="fixed bottom-16 md:bottom-6 right-5 z-40 flex items-center gap-2 group">
      {/* Tooltip */}
      <div
        className={`hidden md:block transition-all duration-300 py-1.5 px-3 rounded-xl bg-[#16191e] border border-white/10 text-xs font-semibold text-[#ede8df] shadow-xl ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        Chat with us
      </div>

      {/* Floating Button */}
      <a
        href={`https://wa.me/${restaurantData.whatsappNumber}?text=${defaultMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all pulse-glow"
        aria-label="Chat with Mannat Cafe on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>
    </div>
  );
};
