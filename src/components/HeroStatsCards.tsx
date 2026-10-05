import React from 'react';
import { Star, IndianRupee, Clock, MapPin } from 'lucide-react';
import { restaurantData } from '../data/restaurantData';
import { ThreeDCard } from './ThreeDCard';

export const HeroStatsCards: React.FC = () => {
  const cards = [
    {
      id: 'rating',
      icon: <Star className="w-5 h-5 text-amber-400 fill-amber-400" />,
      main: `${restaurantData.rating.score} / 5`,
      sub: `${restaurantData.rating.reviewCount} Google Reviews`,
      badge: "Verified"
    },
    {
      id: 'price',
      icon: <IndianRupee className="w-5 h-5 text-[#d48b38]" />,
      main: "₹200 – ₹400",
      sub: "Average Cost Per Person",
      badge: "Affordable"
    },
    {
      id: 'hours',
      icon: <Clock className="w-5 h-5 text-[#d48b38]" />,
      main: "9 AM – 11 PM",
      sub: "Open Daily • 7 Days",
      badge: "All-Day Dining"
    },
    {
      id: 'location',
      icon: <MapPin className="w-5 h-5 text-[#d48b38]" />,
      main: "Dausa",
      sub: "Vinayak Nagar, Sainthal Rd",
      badge: "Easy Access"
    }
  ];

  return (
    <section id="stats" className="relative z-20 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {cards.map((card) => (
          <ThreeDCard key={card.id} maxTilt={8} scale={1.03}>
            <div className="glass-card rounded-2xl p-4 sm:p-6 flex flex-col justify-between border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group h-full">
              {/* Subtle corner light accent */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#d48b38]/10 rounded-full blur-xl group-hover:bg-[#d48b38]/20 transition-all duration-300" />
              
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#a59f93] bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                  {card.badge}
                </span>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold text-[#fdfbf7] tracking-tight mb-1 font-serif-title">
                  {card.main}
                </div>
                <div className="text-xs sm:text-sm text-[#b0a99c]">
                  {card.sub}
                </div>
              </div>
            </div>
          </ThreeDCard>
        ))}
      </div>
    </section>
  );
};
