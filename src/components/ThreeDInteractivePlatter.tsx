import React, { useState, useRef } from 'react';
import { Plus, Check, RotateCw, Flame } from 'lucide-react';
import { restaurantData, type MenuItem } from '../data/restaurantData';
import { ThreeDSteamCanvas } from './ThreeDSteamCanvas';

interface PlatterDishOption {
  id: string;
  label: string;
  dishName: string;
  category: string;
  image: string;
  hasSteam: boolean;
  ingredientTags: string[];
  priceDisplay: string;
  priceNum: number;
  spiceTag: string;
}

interface ThreeDInteractivePlatterProps {
  onAddToCart: (item: MenuItem) => void;
}

export const ThreeDInteractivePlatter: React.FC<ThreeDInteractivePlatterProps> = ({ onAddToCart }) => {
  const platterOptions: PlatterDishOption[] = [
    {
      id: "snack-samosa",
      label: "Desi Samosa",
      dishName: "Hot Crispy Desi Samosa (2 Pcs)",
      category: "Dausa Bestseller",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=85",
      hasSteam: true,
      ingredientTags: ["🥔 Spiced Aloo", "🌿 Mint & Saunth", "🥟 Golden Crust"],
      priceDisplay: "₹30",
      priceNum: 30,
      spiceTag: "Piping Hot Desi",
    },
    {
      id: "snack-1",
      label: "Crispy Puff",
      dishName: "Crispy Vegetable Puffs",
      category: "Signature Snack",
      image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=85",
      hasSteam: true,
      ingredientTags: ["🥔 Spiced Aloo", "🌿 Green Peas", "🥐 Flaky Layers"],
      priceDisplay: "₹35",
      priceNum: 35,
      spiceTag: "Freshly Baked",
    },
    {
      id: "bev-1",
      label: "Cold Coffee",
      dishName: "Modern Frosted Cold Coffee with Ice Cream",
      category: "Modern Cafe Beverage",
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1000&q=85",
      hasSteam: false,
      ingredientTags: ["🍨 Vanilla Scoop", "🍫 Dark Cocoa Drizzle", "🥛 Cold Brew Espresso"],
      priceDisplay: "₹90",
      priceNum: 90,
      spiceTag: "Frosted Sweet",
    },
    {
      id: "raj-1",
      label: "Dal Baati",
      dishName: "Traditional Dal Baati Churma",
      category: "Rajasthani Special",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=85",
      hasSteam: true,
      ingredientTags: ["🧈 Pure Desi Ghee", "🥣 Panchmel Dal", "🍯 Sweet Churma"],
      priceDisplay: "₹220",
      priceNum: 220,
      spiceTag: "Authentic Taste",
    },
    {
      id: "sw-1",
      label: "Club Sandwich",
      dishName: "Grilled Veg & Cheese Club",
      category: "Gourmet Fast Food",
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=85",
      hasSteam: false,
      ingredientTags: ["🧀 Mozzarella Pull", "🫑 Crisp Peppers", "🍞 Butter Toasted"],
      priceDisplay: "₹120",
      priceNum: 120,
      spiceTag: "Mild Italian",
    },
    {
      id: "bev-2",
      label: "Kulhad Chai",
      dishName: "Steaming Kulhad Masala Chai",
      category: "Clay Kulhad Brew",
      image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=85",
      hasSteam: true,
      ingredientTags: ["🫖 Clay Kulhad", "🌿 Ginger & Cardamom", "☕ Rich Desi Chai"],
      priceDisplay: "₹25",
      priceNum: 25,
      spiceTag: "Slow Simmered",
    }
  ];

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [rotation, setRotation] = useState({ rotX: 12, rotY: -15 });
  const [isAdded, setIsAdded] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const currentDish = platterOptions[selectedIdx];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotation({
      rotX: -y * 24 + 10,
      rotY: x * 32,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ rotX: 12, rotY: -12 });
  };

  const handleOrder = () => {
    const menuItem = restaurantData.menu.find((m) => m.id === currentDish.id);
    if (menuItem) {
      onAddToCart(menuItem);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1800);
    }
  };

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-lg mx-auto py-6 sm:py-8 flex flex-col items-center select-none"
      style={{ perspective: '1100px' }}
    >
      {/* Dynamic 3D Platter Container */}
      <div
        style={{
          transform: `rotateX(${rotation.rotX}deg) rotateY(${rotation.rotY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative w-72 sm:w-92 h-72 sm:h-92 flex items-center justify-center will-change-transform"
      >
        {/* Outer Golden 3D Ambient Ring */}
        <div
          style={{ transform: 'translateZ(-40px)' }}
          className="absolute inset-0 rounded-full border border-[#d48b38]/40 shadow-[0_0_60px_rgba(212,139,56,0.3)] pointer-events-none"
        />

        {/* 3D Circular Pedestal Platter */}
        <div
          style={{ transform: 'translateZ(-20px)' }}
          className="absolute inset-3 sm:inset-4 rounded-full bg-gradient-to-b from-[#1a1d22] via-[#121418] to-[#0c0d0f] border-2 border-[#d48b38]/50 shadow-2xl overflow-hidden"
        >
          {/* Subtle concentric plate rim grooves */}
          <div className="absolute inset-4 rounded-full border border-white/10" />
          <div className="absolute inset-8 rounded-full border border-[#d48b38]/20" />
        </div>

        {/* Main Dish Imagery with 3D Z-elevation */}
        <div
          style={{
            transform: 'translateZ(35px) scale(0.92)',
            transformStyle: 'preserve-3d',
          }}
          className="relative w-56 sm:w-72 h-56 sm:h-72 rounded-full overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.85)] border-2 border-white/20 group"
        >
          <img
            src={currentDish.image}
            alt={currentDish.dishName}
            className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Vignette ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Real Rising 3D Steam Simulation for hot dishes */}
          {currentDish.hasSteam && (
            <ThreeDSteamCanvas className="opacity-80" intensity={1.8} />
          )}

          {/* Center Floating Hot Badge or Price Pill */}
          <div
            style={{ transform: 'translateZ(25px)' }}
            className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/50 text-xs font-black text-amber-300 flex items-center gap-1.5 shadow-xl"
          >
            {currentDish.hasSteam && <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />}
            <span>{currentDish.priceDisplay}</span>
          </div>
        </div>

        {/* Floating 3D Ingredient Tag 1 (Top Left) */}
        <div
          style={{
            transform: 'translate3d(-60px, -70px, 60px)',
            transition: 'transform 0.3s ease-out',
          }}
          className="absolute top-2 left-0 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16191e]/90 backdrop-blur-md border border-[#d48b38]/40 shadow-xl text-xs font-semibold text-[#fdfbf7]"
        >
          <span>{currentDish.ingredientTags[0]}</span>
        </div>

        {/* Floating 3D Ingredient Tag 2 (Bottom Right) */}
        <div
          style={{
            transform: 'translate3d(60px, 70px, 65px)',
            transition: 'transform 0.3s ease-out',
          }}
          className="absolute bottom-2 right-0 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16191e]/90 backdrop-blur-md border border-emerald-500/40 shadow-xl text-xs font-semibold text-emerald-300"
        >
          <span>{currentDish.ingredientTags[1]}</span>
        </div>

        {/* Floating 3D Ingredient Tag 3 (Top Right) */}
        <div
          style={{
            transform: 'translate3d(70px, -60px, 50px)',
            transition: 'transform 0.3s ease-out',
          }}
          className="absolute top-4 right-0 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16191e]/90 backdrop-blur-md border border-white/20 shadow-xl text-xs font-semibold text-[#ede8df]"
        >
          <span>{currentDish.ingredientTags[2]}</span>
        </div>
      </div>

      {/* Dish Name & Quick Order Bar */}
      <div className="mt-5 text-center z-10 w-full px-4">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-[11px] font-bold text-[#d48b38] uppercase tracking-wider">
            {currentDish.category}
          </span>
          <span className="text-white/20">•</span>
          <span className="text-[11px] text-emerald-400 font-semibold">
            {currentDish.spiceTag}
          </span>
        </div>

        <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#fdfbf7]">
          {currentDish.dishName}
        </h3>

        {/* Price Tag Display */}
        <div className="mt-1 flex items-center justify-center gap-2">
          <span className="text-base sm:text-lg font-black text-[#f2ae58] bg-[#16191e] px-3.5 py-0.5 rounded-full border border-[#d48b38]/40 shadow-inner">
            {currentDish.priceDisplay}
          </span>
        </div>

        {/* Instant Add to Order button */}
        <div className="mt-3 flex items-center justify-center gap-3">
          <button
            onClick={handleOrder}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all shadow-lg transform active:scale-95 ${
              isAdded
                ? 'bg-emerald-500 text-white'
                : 'bg-gradient-to-r from-[#d48b38] to-[#e29d4c] hover:from-[#e29d4c] hover:to-[#f2ae58] text-[#0d0f12] shadow-[#d48b38]/30 hover:shadow-[#d48b38]/50'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Order!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Order {currentDish.label} • {currentDish.priceDisplay}</span>
              </>
            )}
          </button>
        </div>

        {/* Dish Switcher Interactive Navigation Strip */}
        <div className="mt-4 flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {platterOptions.map((opt, i) => (
            <button
              key={opt.id}
              onClick={() => setSelectedIdx(i)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                i === selectedIdx
                  ? 'bg-white/20 text-[#fdfbf7] border border-[#d48b38] shadow-md scale-105'
                  : 'bg-white/5 text-[#8f897d] hover:text-[#ede8df] border border-transparent'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="mt-2 text-[10px] text-[#8f897d] flex items-center justify-center gap-1">
          <RotateCw className="w-3 h-3 text-[#d48b38]" />
          <span>Move cursor or touch to inspect 3D platter in real-time</span>
        </div>
      </div>
    </div>
  );
};
