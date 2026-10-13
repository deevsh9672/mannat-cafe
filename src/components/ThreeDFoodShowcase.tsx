import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Plus, Sparkles } from 'lucide-react';
import { restaurantData, type MenuItem } from '../data/restaurantData';

interface ThreeDFoodShowcaseProps {
  onAddToCart: (item: MenuItem) => void;
}

export const ThreeDFoodShowcase: React.FC<ThreeDFoodShowcaseProps> = ({ onAddToCart }) => {
  const showcaseItems = restaurantData.menu.filter((item) => item.isFeatured);
  const [activeIndex, setActiveIndex] = useState(0);

  // Desktop touch states
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Mobile 2-dishes-per-slide grouping
  const mobilePairs = useMemo(() => {
    const pairs: MenuItem[][] = [];
    for (let i = 0; i < showcaseItems.length; i += 2) {
      if (i + 1 < showcaseItems.length) {
        pairs.push([showcaseItems[i], showcaseItems[i + 1]]);
      } else {
        pairs.push([showcaseItems[i]]);
      }
    }
    return pairs;
  }, [showcaseItems]);

  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);
  const [mobileTouchStart, setMobileTouchStart] = useState<number | null>(null);
  const [mobileTouchEnd, setMobileTouchEnd] = useState<number | null>(null);

  // Desktop carousel handlers
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
    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
  };

  // Mobile 2-dish slide handlers
  const handleMobileNext = () => {
    setMobileSlideIndex((prev) => (prev + 1) % mobilePairs.length);
  };

  const handleMobilePrev = () => {
    setMobileSlideIndex((prev) => (prev - 1 + mobilePairs.length) % mobilePairs.length);
  };

  const onMobileTouchStart = (e: React.TouchEvent) => {
    setMobileTouchEnd(null);
    setMobileTouchStart(e.targetTouches[0].clientX);
  };

  const onMobileTouchMove = (e: React.TouchEvent) => {
    setMobileTouchEnd(e.targetTouches[0].clientX);
  };

  const onMobileTouchEnd = () => {
    if (!mobileTouchStart || !mobileTouchEnd) return;
    const distance = mobileTouchStart - mobileTouchEnd;
    if (distance > 40) {
      handleMobileNext();
    } else if (distance < -40) {
      handleMobilePrev();
    }
  };

  const currentItem = showcaseItems[activeIndex];

  return (
    <section className="py-14 sm:py-28 bg-[#0b0c0f] relative overflow-hidden">
      {/* 3D Dynamic Ambient Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d48b38]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d48b38]/10 border border-[#d48b38]/30 text-xs font-semibold tracking-widest text-[#d48b38] uppercase mb-2.5 sm:mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Signature Showcase</span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-5xl font-bold text-[#fdfbf7] tracking-tight mb-2 sm:mb-4">
            Chef Favourites Spotlight
          </h2>
          <p className="text-xs sm:text-base text-[#b0a99c]">
            Explore our culinary masterpieces — swipe or click to inspect and add delicious dishes to your order.
          </p>
        </div>

        {/* ======================================================== */}
        {/* MOBILE VIEW: Exactly 2 Dishes Per Slide (Side-by-Side)   */}
        {/* ======================================================== */}
        <div
          onTouchStart={onMobileTouchStart}
          onTouchMove={onMobileTouchMove}
          onTouchEnd={onMobileTouchEnd}
          className="sm:hidden w-full select-none"
        >
          {/* Active 2-Dish Slide Pair */}
          <div className="grid grid-cols-2 gap-2.5">
            {mobilePairs[mobileSlideIndex]?.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/40 flex flex-col justify-between bg-[#16191e] shadow-xl relative group transition-all"
              >
                {/* Image Container with Badges */}
                <div className="relative h-32 xs:h-40 overflow-hidden bg-black/50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16191e] via-transparent to-transparent opacity-85" />

                  {item.badge && (
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full bg-[#d48b38] text-[#0d0f12] text-[9px] font-black uppercase tracking-wider shadow">
                      {item.badge}
                    </div>
                  )}

                  <div className="absolute bottom-1.5 right-2 text-[10px] font-black text-amber-300 bg-black/80 px-1.5 py-0.5 rounded-md border border-white/10 shadow">
                    {item.priceDisplay || `₹${item.price}`}
                  </div>
                </div>

                {/* Body Information */}
                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif-title text-xs xs:text-sm font-bold text-[#fdfbf7] truncate">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-[#a59f93] line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={() => onAddToCart(item)}
                    className="mt-2.5 w-full inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-[11px] font-bold text-[#0d0f12] bg-[#d48b38] hover:bg-[#e29d4c] active:scale-95 transition-all shadow-sm"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add • {item.priceDisplay || `₹${item.price}`}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Slide Controls & Progress Dots */}
          <div className="flex items-center justify-between mt-4 px-2">
            <button
              onClick={handleMobilePrev}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-white active:scale-90 transition-all"
              aria-label="Previous 2 Dishes"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-semibold text-[#a59f93]">
                Slide {mobileSlideIndex + 1} of {mobilePairs.length} • 2 Dishes
              </span>
              <div className="flex items-center gap-1.5">
                {mobilePairs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setMobileSlideIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === mobileSlideIndex ? 'w-6 bg-[#d48b38]' : 'w-2 bg-white/20'
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleMobileNext}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-white active:scale-90 transition-all"
              aria-label="Next 2 Dishes"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP VIEW: Spatial 3D Rotating Carousel Ring          */}
        {/* ======================================================== */}
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="hidden sm:flex relative py-8 flex-col items-center"
        >
          {/* Spatial 3D Ring */}
          <div
            className="w-full max-w-4xl h-80 sm:h-96 relative flex items-center justify-center overflow-visible"
            style={{ perspective: '1200px' }}
          >
            {showcaseItems.map((item, index) => {
              let offset = index - activeIndex;
              const half = Math.floor(showcaseItems.length / 2);
              if (offset > half) offset -= showcaseItems.length;
              if (offset < -half) offset += showcaseItems.length;

              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              const rotateY = offset * 28; // degrees
              const translateX = offset * 210; // px
              const translateZ = -Math.abs(offset) * 160; // px depth
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
                  className={`absolute w-80 h-88 rounded-3xl overflow-hidden cursor-pointer shadow-2xl border ${
                    isCenter
                      ? 'border-[#d48b38] shadow-[#d48b38]/30 shadow-2xl ring-2 ring-[#d48b38]/20'
                      : 'border-white/10 hover:border-white/30'
                  } bg-[#16191e] flex flex-col`}
                >
                  {/* Dish Image */}
                  <div className="relative h-52 overflow-hidden bg-black/50">
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
                        {item.priceDisplay || `₹${item.price}`}
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

          {/* Desktop Indicators */}
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
