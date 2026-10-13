import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X, ShoppingBag, Phone, MapPin, Coffee } from 'lucide-react';
import { restaurantData, getRestaurantStatus } from '../data/restaurantData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState(getRestaurantStatus());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getRestaurantStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none pt-2 sm:pt-3 px-2 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* 3D Floating Glass Island */}
          <div
            className={`pointer-events-auto rounded-2xl sm:rounded-3xl transition-all duration-500 border ${
              isScrolled
                ? 'bg-[#0f1115]/90 border-amber-500/35 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9),0_0_30px_rgba(212,139,56,0.2)] backdrop-blur-2xl py-2.5 px-3 sm:px-6'
                : 'bg-black/60 border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.7)] backdrop-blur-xl py-3 px-3 sm:px-7'
            }`}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="flex items-center justify-between gap-2">
              
              {/* 3D Embossed Brand Logo */}
              <a href="#home" className="group flex items-center gap-2 sm:gap-3 shrink-0">
                {/* 3D Golden Crest Badge */}
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#d48b38] via-[#b87326] to-[#80460c] p-[1.5px] shadow-[0_4px_15px_rgba(212,139,56,0.35)] group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-[10px] sm:rounded-[14px] bg-[#121418] flex items-center justify-center">
                    <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-[#e29d4c] group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span
                      className="font-brand text-base sm:text-2xl font-black tracking-widest text-[#fdfbf7] group-hover:text-[#e29d4c] transition-colors"
                      style={{
                        textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(212,139,56,0.25)',
                      }}
                    >
                      MANNAT
                    </span>
                    <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#d48b38] shadow-[0_0_8px_#d48b38]" />
                  </div>
                  <span className="text-[9px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] text-[#a59f93] uppercase font-bold truncate">
                    Cafe &amp; Restaurant
                  </span>
                </div>
              </a>

              {/* Desktop 3D Navigation Links */}
              <nav className="hidden lg:flex items-center space-x-1 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-full shadow-inner">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="relative px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#d3cbbe] hover:text-[#fdfbf7] hover:bg-white/10 transition-all duration-200 tracking-wide hover:shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              {/* Right Side 3D Actions */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                
                {/* Live Status Badge on Desktop */}
                <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
                  <span className="relative flex h-2 w-2">
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
                  <span className={`text-[11px] font-bold ${status.isOpen ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {status.isOpen ? 'Open Now' : 'Closed'}
                  </span>
                </div>

                {/* Direct Phone Dial Button */}
                <a
                  href={`tel:${restaurantData.phoneRaw}`}
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#ede8df] hover:text-[#e29d4c] hover:bg-white/5 transition-colors border border-white/5"
                  title="Call Restaurant"
                >
                  <Phone className="w-3.5 h-3.5 text-[#d48b38]" />
                  <span className="text-[11px] font-bold">+91 99296 60850</span>
                </a>

                {/* 3D Tactile "Order Online" Button */}
                <button
                  onClick={onOpenCart}
                  className="relative inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold tracking-wide text-[#0d0f12] bg-gradient-to-b from-[#f2ae58] via-[#d48b38] to-[#b36919] shadow-[0_4px_0_#753f09,0_8px_15px_rgba(212,139,56,0.35)] active:translate-y-1 active:shadow-[0_1px_0_#753f09] transition-all transform hover:-translate-y-0.5"
                  style={{
                    textShadow: '0 1px 0 rgba(255,255,255,0.4)',
                  }}
                  aria-label="View Cart and Order Online"
                >
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0d0f12]" />
                  <span className="hidden sm:inline">Order Online</span>
                  <span className="sm:hidden text-[11px]">Cart</span>
                  {cartCount > 0 && (
                    <span className="bg-[#0d0f12] text-[#f2ae58] font-black text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full shadow-inner animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Mobile Menu Button */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-xl text-[#ede8df] hover:text-[#d48b38] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors focus:outline-none"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
                </button>

              </div>

            </div>
          </div>

        </div>
      </header>

      {/* Mobile 3D Drawer Menu */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 lg:hidden bg-black/90 backdrop-blur-2xl pt-24 px-5 pb-8 flex flex-col justify-between overflow-y-auto animate-fadeIn"
        >
          <div onClick={(e) => e.stopPropagation()} className="space-y-6">
            <nav className="flex flex-col space-y-2.5 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-bold text-[#ede8df] hover:text-[#d48b38] py-3 rounded-2xl bg-white/[0.04] border border-white/5 hover:border-amber-500/30 transition-all flex items-center justify-between px-5"
                >
                  <span>{link.name}</span>
                  <span className="text-[#d48b38] text-xs">→</span>
                </a>
              ))}
            </nav>

            {/* Quick Menu Food Jump Chips on Mobile */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="text-[11px] font-bold text-[#d48b38] uppercase tracking-wider mb-2.5">
                Popular Quick Picks
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: '🧋 Cold Coffee (₹90)', href: '#menu' },
                  { name: '🥟 Desi Samosa (₹30)', href: '#menu' },
                  { name: '🥐 Veg Puffs (₹35)', href: '#menu' },
                  { name: '🥣 Dal Baati (₹220)', href: '#menu' },
                  { name: '🥪 Club Sandwich (₹120)', href: '#menu' },
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#ede8df] hover:text-[#d48b38] active:scale-95 transition-all"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div onClick={(e) => e.stopPropagation()} className="space-y-3 pt-6">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#ede8df]">
                <MapPin className="w-3.5 h-3.5 text-[#d48b38]" />
                <span>Vinayak Nagar, Sainthal Rd, Dausa</span>
              </div>
              <div className="text-[10px] text-[#a59f93]">
                Daily 9:00 AM – 11:00 PM • Outdoor Rooftop &amp; Drive-thru
              </div>
            </div>

            <a
              href={`tel:${restaurantData.phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-[#d48b38] text-[#0d0f12] text-xs sm:text-sm font-bold shadow-lg shadow-[#d48b38]/30 active:scale-95 transition-transform"
            >
              <Phone className="w-4 h-4" />
              <span>Direct Call: +91 99296 60850</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
