import React from 'react';
import { Utensils, TreePine, Users, Baby, Car, Moon, Calendar, ArrowRight } from 'lucide-react';
import { restaurantData } from '../data/restaurantData';
import { ThreeDCard } from './ThreeDCard';

export const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      icon: <Utensils className="w-5 h-5 text-[#d48b38]" />,
      title: "Dine-in Comfort",
      desc: "Cozy indoor seating with soft ambient lighting, suited for meals with colleagues, friends, or solitary coffee breaks."
    },
    {
      icon: <TreePine className="w-5 h-5 text-emerald-400" />,
      title: "Outdoor & Rooftop Seating",
      desc: "Open-air sitting area capturing fresh evening breezes on Sainthal Road with scenic views."
    },
    {
      icon: <Users className="w-5 h-5 text-amber-400" />,
      title: "Family Friendly",
      desc: "Comfortable tables configured for family gatherings, weekend get-togethers, and birthday celebrations."
    },
    {
      icon: <Baby className="w-5 h-5 text-sky-400" />,
      title: "Kids Menu Choices",
      desc: "Delightful snacks including crisp vegetable puffs, mild cheese sandwiches, fries, and creamy pasta."
    },
    {
      icon: <Car className="w-5 h-5 text-orange-400" />,
      title: "Drive-thru & Quick Pickup",
      desc: "Convenient roadside parking on Sainthal Road for hassle-free parcel pickups and quick takeaway."
    },
    {
      icon: <Moon className="w-5 h-5 text-indigo-400" />,
      title: "Evening & Late-night Dining",
      desc: "Kitchen open until 11:00 PM every day to satisfy your late-night snack and hot kulhad chai cravings."
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#121418] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Large 3D Cafe Ambience Image */}
          <div className="lg:col-span-6 relative">
            <ThreeDCard maxTilt={8} scale={1.02}>
              <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.9)] group">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85"
                  alt="Mannat Cafe relaxing evening ambience in Dausa"
                  className="w-full h-[450px] sm:h-[540px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                
                {/* 3D Overlay card floating in perspective */}
                <div
                  style={{ transform: 'translateZ(30px)' }}
                  className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/15 shadow-2xl"
                >
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#d48b38]">
                    Atmosphere &amp; Hospitality
                  </span>
                  <h3 className="font-serif-title text-xl text-[#fdfbf7] font-bold mt-1">
                    Relaxed, Open &amp; Welcoming
                  </h3>
                  <p className="text-xs text-[#ccc4b6] mt-1.5 leading-relaxed">
                    Experience true Dausa hospitality with fresh comfort food made right when you order under the stars.
                  </p>
                </div>
              </div>
            </ThreeDCard>
          </div>

          {/* Right Column: Highlights & Features */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#d48b38] uppercase mb-2">
                <span className="w-6 h-0.5 bg-[#d48b38]" />
                <span>The Experience</span>
              </div>
              <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fdfbf7] tracking-tight leading-tight">
                More Than Just a Meal
              </h2>
              <p className="text-sm sm:text-base text-[#b0a99c] mt-3">
                At Mannat Cafe &amp; Restaurant, we believe good dining is about sharing conversations, savoring freshly brewed tea, and enjoying comforting bites in a cozy setting.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {experiences.map((exp) => (
                <div
                  key={exp.title}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#d48b38]/40 hover:bg-white/[0.04] transition-all group shadow-md"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                      {exp.icon}
                    </div>
                    <h4 className="text-sm font-bold text-[#fdfbf7]">
                      {exp.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#9b9487] leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Plan Your Visit CTA */}
            <div className="pt-2">
              <a
                href={restaurantData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold tracking-wide text-[#0d0f12] bg-gradient-to-r from-[#e29d4c] to-[#d48b38] hover:from-[#f2ae58] hover:to-[#e29d4c] shadow-lg shadow-[#d48b38]/25 transition-all transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan Your Visit</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
