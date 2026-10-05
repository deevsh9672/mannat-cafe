import React from 'react';
import { MapPin, Phone, Clock, ArrowUp, Utensils, MessageCircle, ExternalLink } from 'lucide-react';
import { restaurantData } from '../data/restaurantData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090a0c] text-[#a59f93] border-t border-white/5 pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="font-brand text-2xl font-bold tracking-widest text-[#f5f0e8]">
                MANNAT
              </span>
              <span className="text-xs tracking-[0.25em] text-[#d48b38] uppercase font-semibold">
                Cafe &amp; Restaurant
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-[#8f897d] max-w-sm leading-relaxed">
              Fresh flavours, comforting food and a welcoming atmosphere in the heart of Vinayak Nagar, Dausa. Dedicated to quality taste and memorable moments.
            </p>

            <div className="pt-2">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#0d0f12] bg-[#d48b38] hover:bg-[#e29d4c] transition-all"
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>View Menu</span>
              </a>
            </div>
          </div>

          {/* Explore Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ede8df] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#home" className="hover:text-[#d48b38] transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#d48b38] transition-colors">About Us</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#d48b38] transition-colors">Digital Menu</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#d48b38] transition-colors">Food &amp; Ambience Gallery</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#d48b38] transition-colors">Guest Reviews</a>
              </li>
            </ul>
          </div>

          {/* Visit Us Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ede8df] mb-4">
              Visit Us
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d48b38] shrink-0 mt-0.5" />
                <span>
                  Vinayak Nagar, Sainthal Road, Dausa, Rajasthan 303303
                </span>
              </div>
              <div className="text-[11px] text-[#7d776c]">
                Plus Code: {restaurantData.address.plusCode}
              </div>
              <a
                href={restaurantData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#d48b38] hover:underline pt-1"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Contact & Hours Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ede8df] mb-4">
              Contact &amp; Hours
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#d48b38] shrink-0" />
                <a href={`tel:${restaurantData.phoneRaw}`} className="hover:text-[#fdfbf7]">
                  {restaurantData.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${restaurantData.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400"
                >
                  WhatsApp Ordering
                </a>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-[#d48b38] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#fdfbf7] font-medium">9:00 AM – 11:00 PM</div>
                  <div className="text-[11px] text-[#7d776c]">Open All 7 Days</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7d776c] gap-4">
          <div>
            © 2026 Mannat Cafe &amp; Restaurant. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-[#a59f93]">Authentic Dausa Dining</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-[#d48b38] hover:text-[#e29d4c] transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
