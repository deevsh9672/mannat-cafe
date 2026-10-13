import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Sparkles } from 'lucide-react';
import { restaurantData, type MenuItem } from '../data/restaurantData';

interface ThreeDFoodShowcaseProps {
  onAddToCart: (item: MenuItem) => void;
}

export const ThreeDFoodShowcase: React.FC<ThreeDFoodShowcaseProps> = ({ onAddToCart }) => {
  const showcaseItems = restaurantData.menu.filter((item) => item.isFeatured);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % showcaseItems.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const currentItem = showcaseItems[activeIndex];

  return (
    <section className="py-16 sm:py-28 bg-[#0b0c0f] relative overflow-hidden">
      {/* 3D Dynamic Ambient Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d48b38]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d48b38]/10 border border-[#d48b38]/30 text-xs font-semibold tracking-widest text-[#d48b38] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Stage</span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-5xl font-bold text-[#fdfbf7] tracking-tight mb-3 sm:mb-4">
            Signature Dish Showcase
          </h2>
          <p className="text-xs sm:text-base text-[#b0a99c]">
            Explore our culinary masterpieces in interactive 3D perspective. Swipe or click to inspect favourites.
          </p>
        </div>

        {/* 3D Carousel Stage */}
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="relative py-4 sm:py-8 flex flex-col items-center"
        >
          
          {/* Spatial 3D Ring */}
          <div
            className="w-full max-w-4xl h-76 sm:h-96 relative flex items-center justify-center overflow-visible"
            style={{ perspective: '1200px' }}
          >
            {showcaseItems.map((item, index) => {
              // Calculate offset from activeIndex
              let offset = index - activeIndex;
              const half = Math.floor(showcaseItems.length / 2);
              if (offset > half) offset -= showcaseItems.length;
              if (offset < -half) offset += showcaseItems.length;

              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              const rotateY = offset * 28; // degrees
              const translateX = offset * (typeof window !== 'undefined' && window.innerWidth < 640 ? 110 : 210); // px
              const translateZ = -Math.abs(offset) * (typeof window !== 'undefined' && window.innerWidth < 640 ? 110 : 160); // px depth
              const scale = isCenter ? 1.05 : 0.82;
              const opacity = isCenter ? 1 : 0.45;
              const zIndex = 20 - Math.abs(offset) * 5;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className={`absolute w-60 sm:w-80 h-72 sm:h-88 rounded-3xl overflow-hidden cursor-pointer shadow-2xl border ${
                    isCenter
                      ? 'border-[#d48b38] shadow-[#d48b38]/30 shadow-2xl ring-2 ring-[#d48b38]/20'
                      : 'border-white/10 hover:border-white/30'
                  } bg-[#16191e] flex flex-col`}
                >
                  {/* Dish Image */}
                  <div className="relative h-44 sm:h-52 overflow-hidden bg-black/50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16191e] via-transparent to-transparent" />

                    {item.badge && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#d48b38] text-[#0d0f12] text-[10px] font-bold uppercase tracking-wider shadow-lg">
                        {item.badge}
                      </div>
                    )}

                    <div className="absolute bottom-2.5 right-3 text-[11px] font-semibold text-[#fdfbf7] bg-black/60 px-2 py-0.5 rounded border border-white/10">
                      {item.category}
                    </div>
                  </div>

                  {/* Dish Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif-title text-base sm:text-lg font-bold text-[#fdfbf7] truncate">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-[#a59f93] line-clamp-2 mt-1">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-xs font-bold text-[#e29d4c]">
                        {item.price ? `₹${item.price}` : item.priceDisplay || '₹ Price at cafe'}
                      </span>
                      <span className="text-[10px] uppercase font-semibold text-emerald-400">
                        ● Pure Veg
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Controls & Quick Action for Active Item */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/15 hover:text-[#d48b38] transition-all transform hover:scale-105"
              aria-label="Previous 3D Dish"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Active Item Action Button */}
            {currentItem && (
              <button
                onClick={() => onAddToCart(currentItem)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-[#0d0f12] bg-[#d48b38] hover:bg-[#e29d4c] shadow-lg shadow-[#d48b38]/30 transition-all transform hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add {currentItem.name} to Cart</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/15 hover:text-[#d48b38] transition-all transform hover:scale-105"
              aria-label="Next 3D Dish"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex items-center gap-2 mt-5">
            {showcaseItems.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeIndex ? 'w-8 bg-[#d48b38]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
