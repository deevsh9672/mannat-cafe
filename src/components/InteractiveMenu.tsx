import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, Utensils, Check, Sparkles } from 'lucide-react';
import { restaurantData, type MenuItem } from '../data/restaurantData';
import type { CartItem } from '../types';

interface InteractiveMenuProps {
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
}

export const InteractiveMenu: React.FC<InteractiveMenuProps> = ({
  cart,
  onAddToCart,
  onUpdateQuantity,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [vegOnly, setVegOnly] = useState<boolean>(false);

  // Cart item lookup map
  const cartMap = useMemo(() => {
    const map = new Map<string, number>();
    cart.forEach((c) => map.set(c.menuItem.id, c.quantity));
    return map;
  }, [cart]);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return restaurantData.menu.filter((item) => {
      // Category filter
      if (selectedCategory === 'Customer Favourites') {
        if (!item.isFeatured) return false;
      } else if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Veg filter
      if (vegOnly && !item.isVeg) {
        return false;
      }

      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, vegOnly]);

  return (
    <section id="menu" className="py-20 sm:py-28 bg-[#0d0f12] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#d48b38] uppercase mb-2">
            <Utensils className="w-4 h-4" />
            <span>Digital Menu</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fdfbf7] tracking-tight mb-4">
            Flavours &amp; Comfort Food
          </h2>
          <p className="text-sm sm:text-base text-[#b0a99c]">
            Explore our diverse kitchen selections — freshly prepared with traditional spices, pure ingredients, and served hot.
          </p>
        </div>

        {/* Search & Dietary Filters Bar */}
        <div className="glass-card rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/10 shadow-xl">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8f897d]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search puffs, sandwich, momos, pasta..."
              className="w-full bg-[#16191e] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#fdfbf7] placeholder-[#7d776c] focus:outline-none focus:border-[#d48b38] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8f897d] hover:text-[#fdfbf7]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Veg Toggle Filter */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                vegOnly
                  ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                  : 'bg-white/5 border-white/10 text-[#a59f93] hover:text-[#fdfbf7]'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${vegOnly ? 'bg-emerald-400' : 'bg-[#7d776c]'}`} />
              <span>Vegetarian Only</span>
              {vegOnly && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* Categories Tab Strip */}
        <div className="overflow-x-auto no-scrollbar pb-3 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-2 min-w-max">
            {restaurantData.categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#d48b38] text-[#0d0f12] font-semibold shadow-lg shadow-[#d48b38]/20 scale-105'
                      : 'bg-white/5 text-[#a59f93] hover:text-[#fdfbf7] hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {category === 'Customer Favourites' && <Sparkles className="w-3 h-3 inline mr-1" />}
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-2xl border border-white/10">
            <Utensils className="w-10 h-10 text-[#8f897d] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#fdfbf7] mb-1">No items match your search</h3>
            <p className="text-xs sm:text-sm text-[#8f897d] max-w-sm mx-auto mb-4">
              Try adjusting your search terms or category selection to view our available menu items.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setVegOnly(false);
              }}
              className="px-4 py-2 rounded-xl bg-white/5 text-xs text-[#d48b38] hover:bg-white/10 font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const qty = cartMap.get(item.id) || 0;

              return (
                <div
                  key={item.id}
                  className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between group"
                >
                  {/* Top: Image & Badge */}
                  <div className="relative h-48 overflow-hidden bg-black/40">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16191e] via-transparent to-transparent opacity-80" />

                    {/* Veg & Category Indicator */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Veg
                      </span>

                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-[#d48b38] text-[#0d0f12] text-[10px] font-bold tracking-wide uppercase">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2.5 right-3 text-[11px] font-semibold text-[#a59f93] bg-black/70 px-2 py-0.5 rounded border border-white/5">
                      {item.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif-title text-lg font-bold text-[#fdfbf7] group-hover:text-[#d48b38] transition-colors mb-1.5">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#a59f93] line-clamp-2 leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    {/* Price and Add/Qty Controls */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-xs sm:text-sm font-semibold text-[#f5f0e8]">
                          {item.price ? `₹${item.price}` : (item.priceDisplay || "₹ Price at cafe")}
                        </span>
                      </div>

                      {qty === 0 ? (
                        <button
                          onClick={() => onAddToCart(item)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0d0f12] bg-[#d48b38] hover:bg-[#e29d4c] shadow-sm transition-all transform active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-2 bg-[#1c2026] border border-[#d48b38]/40 rounded-full px-2 py-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 text-[#fdfbf7] hover:text-[#d48b38] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#d48b38] min-w-4 text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 text-[#fdfbf7] hover:text-[#d48b38] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pricing notice note adhering to prompt integrity */}
        <div className="mt-8 text-center text-xs text-[#8f897d]">
          Prices are subject to daily kitchen freshness. All items are freshly prepared to order.
        </div>

      </div>
    </section>
  );
};
