import React from 'react';
import { Plus, ArrowRight, UtensilsCrossed, Sparkles } from 'lucide-react';
import { restaurantData, type MenuItem } from '../data/restaurantData';
import { ThreeDCard } from './ThreeDCard';

interface FeaturedFoodProps {
  onAddToCart: (item: MenuItem) => void;
}

export const FeaturedFood: React.FC<FeaturedFoodProps> = ({ onAddToCart }) => {
  const featuredItems = restaurantData.menu.filter((item) => item.isFeatured);

  return (
    <section className="py-20 bg-[#121418] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#d48b38] uppercase mb-2">
              <UtensilsCrossed className="w-4 h-4" />
              <span>Signature Selections • 3D Depth Cards</span>
            </div>
            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fdfbf7] tracking-tight">
              Customer Favourites
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#b0a99c] max-w-md mt-3 md:mt-0">
            A curated selection of our most requested delicacies, snacks and refreshing beverages. Hover to inspect with 3D physical depth.
          </p>
        </div>

        {/* Featured Items Grid with Multi-Layer 3D Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredItems.map((item) => (
            <ThreeDCard key={item.id} maxTilt={12} scale={1.03}>
              <div
                style={{ transformStyle: 'preserve-3d' }}
                className="group glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-[#d48b38]/50 transition-all duration-300 flex flex-col justify-between h-full shadow-2xl"
              >
                {/* Image Container with 3D Popout on Hover */}
                <div
                  style={{
                    transform: 'translateZ(25px)',
                    transformStyle: 'preserve-3d',
                  }}
                  className="relative h-56 sm:h-64 overflow-hidden bg-black/40 transition-transform duration-300 group-hover:translate-z-[40px]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-108"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  
                  {/* Gradient shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121418] via-transparent to-transparent opacity-85" />

                  {/* Dietary Veg Tag & Special Badge floating forward */}
                  <div
                    style={{ transform: 'translateZ(30px)' }}
                    className="absolute top-3 left-3 flex items-center gap-2"
                  >
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-emerald-400 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Pure Veg
                    </span>

                    {item.badge && (
                      <span className="px-2.5 py-1 rounded-full bg-[#d48b38] text-[#0d0f12] text-[11px] font-bold tracking-wide uppercase shadow-lg flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div
                    style={{ transform: 'translateZ(25px)' }}
                    className="absolute bottom-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-[#d48b38] border border-white/10 shadow-md"
                  >
                    {item.category}
                  </div>
                </div>

                {/* Card Body with Multi-Depth Layering */}
                <div
                  style={{ transformStyle: 'preserve-3d' }}
                  className="p-5 sm:p-6 flex-1 flex flex-col justify-between"
                >
                  <div style={{ transform: 'translateZ(20px)' }}>
                    <h3 className="font-serif-title text-xl font-bold text-[#fdfbf7] group-hover:text-[#e29d4c] transition-colors mb-2">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#b0a99c] line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {item.ingredients && item.ingredients.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.ingredients.slice(0, 3).map((ing) => (
                          <span
                            key={ing}
                            className="text-[10px] bg-white/5 border border-white/5 px-2 py-0.5 rounded text-[#a59f93]"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer with Price and Order Now CTA floating forward */}
                  <div
                    style={{ transform: 'translateZ(25px)' }}
                    className="pt-4 border-t border-white/10 flex items-center justify-between"
                  >
                    <div className="text-xs sm:text-sm font-semibold text-[#f5f0e8]">
                      {item.price ? `₹${item.price}` : (item.priceDisplay || "₹ Price at cafe")}
                    </div>

                    <button
                      onClick={() => onAddToCart(item)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-[#0d0f12] bg-[#d48b38] hover:bg-[#e29d4c] shadow-md shadow-[#d48b38]/20 transition-all transform active:scale-95 group-hover:shadow-lg group-hover:shadow-[#d48b38]/30"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Order Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </ThreeDCard>
          ))}
        </div>

        {/* View Full Menu CTA Link */}
        <div className="mt-12 text-center">
          <a
            href="#menu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#d48b38] hover:text-[#e29d4c] transition-colors group"
          >
            <span>Explore All 30+ Real Dishes in the Digital Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};
