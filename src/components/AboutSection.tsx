import React from 'react';
import { CheckCircle2, Clock, MapPin, Coffee, Users, ShieldCheck } from 'lucide-react';
import { restaurantData } from '../data/restaurantData';

export const AboutSection: React.FC = () => {
  const featureBadges = [
    { title: "Family Friendly", desc: "Spacious seating suitable for all ages" },
    { title: "Outdoor Seating", desc: "Open-air & rooftop dining experience" },
    { title: "Kids Menu", desc: "Puffs, fries, pasta & gentle flavours" },
    { title: "Drive-thru", desc: "Quick curbside pickup on Sainthal Rd" },
    { title: "Dine-in", desc: "Warm & relaxed atmosphere to unwind" },
    { title: "Takeaway", desc: "Freshly packed hot meals on the go" },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 relative overflow-hidden bg-[#0d0f12]">
      {/* Decorative ambient background blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#d48b38]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Primary Image: Ambience & Seating */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80"
                  alt="Mannat Cafe interior and seating ambience"
                  className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#d3cbbe]">
                  <span className="font-semibold text-[#fdfbf7]">Mannat Cafe &amp; Restaurant</span>
                  <span>Vinayak Nagar, Dausa</span>
                </div>
              </div>

              {/* Floating Secondary Image: Fresh Food Presentation */}
              <div className="hidden sm:block absolute -bottom-10 -right-6 w-3/5 rounded-2xl overflow-hidden border-2 border-[#16191e] shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80"
                  alt="Freshly baked Vegetable Puffs and snacks"
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-[11px] font-semibold text-[#fdfbf7] flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-[#d48b38]" />
                  <span>Crisp Puffs &amp; Chaat Specialties</span>
                </div>
              </div>

              {/* Experience badge */}
              <div className="absolute -top-5 -left-4 sm:-left-6 bg-[#16191e]/95 backdrop-blur-md border border-[#d48b38]/30 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#d48b38]/15 flex items-center justify-center text-[#d48b38]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#a59f93] font-medium">Welcoming Diners</div>
                  <div className="text-sm font-bold text-[#fdfbf7]">Daily 9 AM – 11 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Features */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#d48b38] uppercase">
              <span className="w-6 h-0.5 bg-[#d48b38]" />
              <span>About Mannat Cafe</span>
            </div>

            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fdfbf7] tracking-tight leading-tight">
              A Place for Good Food &amp; Good Company
            </h2>

            <p className="text-base sm:text-lg text-[#ccc4b6] leading-relaxed">
              {restaurantData.fullAbout}
            </p>

            {/* Quick Metadata summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2 border-y border-white/10 text-xs sm:text-sm text-[#b0a99c]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#d48b38] shrink-0" />
                <span>Vinayak Nagar, Sainthal Rd, Dausa (303303)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#d48b38] shrink-0" />
                <span>Open All 7 Days: 9:00 AM – 11:00 PM</span>
              </div>
            </div>

            {/* Feature Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {featureBadges.map((badge) => (
                <div
                  key={badge.title}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#d48b38]/30 transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#fdfbf7] mb-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{badge.title}</span>
                  </div>
                  <p className="text-[11px] text-[#9b9487] leading-tight">
                    {badge.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Trust note */}
            <div className="flex items-center gap-2 text-xs text-[#8f897d] pt-2">
              <ShieldCheck className="w-4 h-4 text-[#d48b38]" />
              <span>Freshly prepared on order • Authentic spices • Dedicated seating</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
