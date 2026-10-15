import React from 'react';
import { Phone, MessageCircle, Utensils, ShoppingBag, Bot } from 'lucide-react';
import { restaurantData } from '../data/restaurantData';

interface MobileStickyCTAProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAssistant: () => void;
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({
  cartCount,
  onOpenCart,
  onOpenAssistant,
}) => {
  const whatsappUrl = `https://wa.me/${restaurantData.whatsappNumber}?text=${encodeURIComponent(
    "Hello The Prince Cafe Dausa, I would like to place an order / check today's specials."
  )}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e1014]/95 backdrop-blur-2xl border-t border-amber-500/20 px-2.5 py-1.5 shadow-[0_-10px_30px_rgba(0,0,0,0.85)]">
      <div className="grid grid-cols-5 gap-1 text-center items-center max-w-md mx-auto">
        
        {/* 1. Menu Jump */}
        <a
          href="#menu"
          className="flex flex-col items-center justify-center py-1 rounded-xl text-[#d3cbbe] hover:text-[#d48b38] active:bg-white/5 transition-all"
        >
          <Utensils className="w-4 h-4 text-[#d48b38] mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">Menu</span>
        </a>

        {/* 2. AI Menu Assistant */}
        <button
          onClick={onOpenAssistant}
          className="flex flex-col items-center justify-center py-1 rounded-xl text-[#ede8df] hover:text-amber-300 active:bg-white/5 transition-all relative group"
          aria-label="Open AI Menu Assistant"
        >
          <div className="relative">
            <Bot className="w-4 h-4 text-amber-400 mb-0.5 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          </div>
          <span className="text-[10px] font-semibold tracking-tight text-amber-200">AI Chat</span>
        </button>

        {/* 3. Center Highlight: Cart */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center py-1 rounded-xl bg-gradient-to-b from-[#f2ae58] via-[#d48b38] to-[#b36919] text-[#0d0f12] shadow-[0_3px_10px_rgba(212,139,56,0.35)] active:scale-95 transition-all relative -translate-y-1"
          aria-label="View Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-4.5 h-4.5 text-[#0d0f12] mb-0.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#0d0f12] text-[#f2ae58] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-black tracking-tight leading-none">
            {cartCount > 0 ? `Cart (${cartCount})` : 'Cart'}
          </span>
        </button>

        {/* 4. WhatsApp Direct */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 rounded-xl text-emerald-400 hover:text-emerald-300 active:bg-white/5 transition-all"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">WhatsApp</span>
        </a>

        {/* 5. Direct Phone Call */}
        <a
          href={`tel:${restaurantData.phoneRaw}`}
          className="flex flex-col items-center justify-center py-1 rounded-xl text-[#d3cbbe] hover:text-[#d48b38] active:bg-white/5 transition-all"
        >
          <Phone className="w-4 h-4 text-[#d48b38] mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">Call</span>
        </a>

      </div>
    </div>
  );
};
