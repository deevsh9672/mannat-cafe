import React from 'react';
import { Camera, Heart, MessageCircle } from 'lucide-react';
import { restaurantData } from '../data/restaurantData';

export const InstagramGrid: React.FC = () => {
  const visualMoments = [
    {
      id: 'ig-1',
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
      tag: "#RooftopVibes",
      likes: "124"
    },
    {
      id: 'ig-2',
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
      tag: "#VegetablePuffs",
      likes: "189"
    },
    {
      id: 'ig-3',
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
      tag: "#CheesyBites",
      likes: "95"
    },
    {
      id: 'ig-4',
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
      tag: "#ColdCoffeeLove",
      likes: "210"
    },
    {
      id: 'ig-5',
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
      tag: "#MomoTime",
      likes: "142"
    },
    {
      id: 'ig-6',
      image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=600&q=80",
      tag: "#EveningHangout",
      likes: "167"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#0d0f12] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#d48b38] uppercase mb-2">
            <Camera className="w-4 h-4" />
            <span>Social &amp; Visuals</span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl lg:text-4xl font-bold text-[#fdfbf7] tracking-tight">
            Follow the Mannat Experience
          </h2>
          <p className="text-xs sm:text-sm text-[#b0a99c] mt-2">
            Share your dining moments, tag us during your visits in Vinayak Nagar, and discover our daily culinary specials.
          </p>
        </div>

        {/* Visual Mosaic Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {visualMoments.map((item) => (
            <div
              key={item.id}
              className="relative group rounded-xl overflow-hidden aspect-square border border-white/10 bg-black/40 shadow-lg"
            >
              <img
                src={item.image}
                alt={item.tag}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80";
                }}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2 text-center">
                <span className="text-xs font-bold text-[#fdfbf7] mb-1.5">{item.tag}</span>
                <div className="flex items-center gap-3 text-[11px] text-[#e29d4c]">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-current" /> {item.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Connect Button */}
        <div className="mt-8 text-center">
          <a
            href={`https://wa.me/${restaurantData.whatsappNumber}?text=${encodeURIComponent(
              "Hello Mannat Cafe & Restaurant, I saw your website and would like to connect!"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-[#ede8df] bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:border-[#d48b38]/40"
          >
            <span>Connect on WhatsApp for Updates</span>
          </a>
        </div>

      </div>
    </section>
  );
};
