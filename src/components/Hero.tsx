import React, { useEffect, useState } from 'react';
import { ChevronDown, MapPin, Phone, Clock, ArrowRight, Utensils, Sparkles, Coffee } from 'lucide-react';
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
          alt="Mannat Cafe and Restaurant Ambience in Dausa"
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
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Dynamic Status & Hours Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md shadow-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    status.isOpen ? 'bg-emerald-400' : 'bg-rose-400'
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    status.isOpen ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                />
              </span>
              <span className={`text-xs font-semibold tracking-wide ${status.isOpen ? 'text-emerald-300' : 'text-rose-300'}`}>
                {status.statusText}
              </span>
              <span className="text-white/30 text-xs">•</span>
              <span className="text-xs text-[#d3cbbe] font-medium flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#d48b38]" />
                <span>Open Daily • 9:00 AM – 11:00 PM</span>
              </span>
            </div>

            {/* Brand Title */}
            <div>
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm tracking-[0.35em] text-[#d48b38] uppercase font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Vinayak Nagar, Dausa</span>
              </div>
              <h1 className="font-brand text-3xl sm:text-5xl md:text-6xl font-bold tracking-wider text-[#fdfbf7] mt-2 mb-3 drop-shadow-md">
                MANNAT CAFE &amp; RESTAURANT
              </h1>
            </div>

            {/* Tagline */}
            <p className="font-serif-title text-2xl sm:text-3xl text-[#e29d4c] italic font-normal tracking-wide">
              &ldquo;{restaurantData.tagline}&rdquo;
            </p>

            {/* Supporting Text */}
            <p className="max-w-xl text-sm sm:text-base text-[#ccc4b6] leading-relaxed">
              {restaurantData.shortDescription} Taste our renowned freshly baked <strong>Vegetable Puffs</strong>, hot <strong>Kulhad Chai</strong>, and regional specialties under the open sky on Sainthal Road.
            </p>

            {/* Quick Feature Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-[11px] font-semibold text-[#ede8df]">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5">
                <Coffee className="w-3 h-3 text-[#d48b38]" />
                Fresh Vegetable Puffs
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                🌿 Outdoor Rooftop
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                👨‍👩‍👧 Family Friendly
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                🚗 Drive-thru / Curbside
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide text-[#0d0f12] bg-[#d48b38] hover:bg-[#e29d4c] shadow-lg shadow-[#d48b38]/25 hover:shadow-[#d48b38]/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Utensils className="w-4 h-4" />
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <a
                href={restaurantData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide text-[#ede8df] bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MapPin className="w-4 h-4 text-[#d48b38]" />
                <span>Get Directions</span>
              </a>

              <a
                href={`tel:${restaurantData.phoneRaw}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-xs sm:text-sm font-medium text-[#ccc4b6] hover:text-[#fdfbf7] hover:bg-white/5 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#d48b38]" />
                <span>Call: {restaurantData.phone}</span>
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
              Discover Mannat Dining
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>

      </div>
    </section>
  );
};
