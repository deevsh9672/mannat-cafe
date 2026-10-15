import React, { useEffect, useState } from 'react';
import { ChevronDown, MapPin, Phone, ArrowRight, Utensils } from 'lucide-react';
import { restaurantData, getRestaurantStatus, type MenuItem } from '../data/restaurantData';
import { ThreeDHeroCanvas } from './ThreeDHeroCanvas';
import { ThreeDInteractivePlatter } from './ThreeDInteractivePlatter';

interface HeroProps {
  onAddToCart?: (item: MenuItem) => void;
}

export const Hero: React.FC<HeroProps> = ({ onAddToCart = () => {} }) => {
  const [status, setStatus] = useState(getRestaurantStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getRestaurantStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0f12]">
      {/* Cinematic Background Image with Zoom & Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
          alt="The Prince Cafe Ambience in Dausa"
          className="w-full h-full object-cover object-center scale-105 animate-[pulse_12s_ease-in-out_infinite_alternate]"
          loading="eager"
        />
        {/* Multilayered rich dark vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12] via-[#0d0f12]/80 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/50 to-[#0d0f12]/95" />
      </div>

      {/* 3D Canvas Ember & Particle Engine */}
      <ThreeDHeroCanvas />

      {/* Main Split 3D Hero Grid */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-12 sm:pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Left Column: Clean & Premium Brand Intro */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-6">
            
            {/* Clean Status & Location Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[11px] font-medium text-[#d3cbbe]">
              <span className="relative flex h-2 w-2 shrink-0">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    status.isOpen ? 'bg-emerald-400' : 'bg-rose-400'
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    status.isOpen ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                />
              </span>
              <span className={status.isOpen ? 'text-emerald-300 font-semibold' : 'text-rose-300 font-semibold'}>
                {status.isOpen ? 'Open Now' : 'Closed'}
              </span>
              <span className="text-white/20">•</span>
              <span>Open 24 Hours</span>
              <span className="text-white/20 hidden xs:inline">•</span>
              <span className="hidden xs:inline">Kherli Mod, Dausa</span>
            </div>

            {/* Main Luxury Title */}
            <div>
              <h1 className="font-brand text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider text-[#fdfbf7] leading-tight drop-shadow-md">
                THE PRINCE <span className="bg-gradient-to-r from-[#f2ae58] via-[#e29d4c] to-[#d48b38] bg-clip-text text-transparent">CAFE</span>
              </h1>
              <p className="font-serif-title text-base sm:text-2xl text-[#d48b38] italic font-normal tracking-wide mt-1 sm:mt-1.5">
                &ldquo;Serving Happiness in Every Cup ✨&rdquo;
              </p>
            </div>

            {/* Minimalist Subtext - Short, elegant & clean */}
            <p className="max-w-lg text-xs sm:text-base text-[#ccc4b6] leading-relaxed font-light mx-auto lg:mx-0">
              Handcrafted frosted cold coffees, crispy savoury snacks, and warm conversations on NH-21 Agra Road, Dausa.
            </p>

            {/* 3 Clean Signature Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-0.5 text-xs font-semibold text-[#ede8df]">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-amber-500/35 text-amber-300 flex items-center gap-1.5 shadow-sm">
                🧋 Cold Coffee (₹90)
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#d3cbbe] flex items-center gap-1.5">
                🥟 Hot Samosa (₹30)
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#d3cbbe] flex items-center gap-1.5">
                🌿 Rooftop Seating
              </span>
            </div>

            {/* Focused Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide text-[#0d0f12] bg-gradient-to-r from-[#f2ae58] via-[#d48b38] to-[#b36919] hover:from-[#f7be73] hover:to-[#c87820] shadow-lg shadow-[#d48b38]/25 hover:shadow-[#d48b38]/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Utensils className="w-4 h-4" />
                <span>Explore Menu</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </a>

              <a
                href={restaurantData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-[#ede8df] bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MapPin className="w-4 h-4 text-[#d48b38]" />
                <span>Directions</span>
              </a>

              <a
                href={`tel:${restaurantData.phoneRaw}`}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-3 rounded-full text-xs font-medium text-[#ccc4b6] hover:text-[#fdfbf7] hover:bg-white/5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#d48b38]" />
                <span>Call Us</span>
              </a>
            </div>

          </div>

          {/* Right Column: 3D Interactive Platter Stage */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <ThreeDInteractivePlatter onAddToCart={onAddToCart} />
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="pt-8 flex flex-col items-center justify-center">
          <a
            href="#stats"
            className="text-white/40 hover:text-[#d48b38] transition-colors flex flex-col items-center gap-1 group"
            aria-label="Scroll down"
          >
            <span className="text-[10px] tracking-widest uppercase font-medium group-hover:tracking-wider transition-all">
              Discover The Prince Cafe
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>

      </div>
    </section>
  );
};
