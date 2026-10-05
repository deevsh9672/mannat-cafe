import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, MessageCircle, Clock, CalendarCheck } from 'lucide-react';
import { restaurantData, getRestaurantStatus } from '../data/restaurantData';

export const LocationSection: React.FC = () => {
  const [status, setStatus] = useState(getRestaurantStatus());
  const currentDayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(getRestaurantStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Map JS getDay() to our days array (Monday = 0, Sunday = 6)
  // JS getDay(): 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  const adjustedTodayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;

  const whatsappMessage = encodeURIComponent(
    "Hello Mannat Cafe & Restaurant, I would like to know more about your menu/order options."
  );

  return (
    <section id="location" className="py-20 sm:py-28 bg-[#0d0f12] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#d48b38] uppercase mb-2">
            <MapPin className="w-4 h-4" />
            <span>Visit Us</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fdfbf7] tracking-tight mb-4">
            Find Mannat Cafe
          </h2>
          <p className="text-sm sm:text-base text-[#b0a99c]">
            Conveniently situated on Sainthal Road in Vinayak Nagar, Dausa with rooftop seating and parking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Map Embed & Action Buttons */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-80 sm:h-96 relative bg-black/40">
              <iframe
                title="Mannat Cafe and Restaurant Google Maps Location"
                src="https://maps.google.com/maps?q=Mannat+Cafe+and+Restaurant+Vinayak+Nagar+Dausa&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale contrast-125 opacity-90 hover:opacity-100 transition-opacity"
              />

              {/* Map Address Floating Overlay Pill */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#0d0f12]/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#d48b38] shrink-0" />
                  <span className="text-xs text-[#ede8df] font-medium truncate">
                    {restaurantData.address.full}
                  </span>
                </div>
                <span className="text-[10px] text-[#a59f93] uppercase font-bold shrink-0 ml-2">
                  Plus Code: {restaurantData.address.plusCode}
                </span>
              </div>
            </div>

            {/* Quick Location Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={restaurantData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-[#0d0f12] bg-[#d48b38] hover:bg-[#e29d4c] transition-all shadow-md"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <a
                href={`tel:${restaurantData.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-[#ede8df] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#d48b38]" />
                <span>Call Restaurant</span>
              </a>

              <a
                href={`https://wa.me/${restaurantData.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Dedicated Opening Hours Component */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-[#d48b38]" />
                <h3 className="font-serif-title text-xl font-bold text-[#fdfbf7]">
                  Opening Hours
                </h3>
              </div>

              {/* Dynamic Live Status Badge */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
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
                <span className={`text-xs font-semibold ${status.isOpen ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {status.statusText}
                </span>
              </div>
            </div>

            {/* Weekly Schedule with Today Highlight */}
            <div className="space-y-3">
              {restaurantData.openingHours.days.map((day, idx) => {
                const isToday = idx === adjustedTodayIndex;

                return (
                  <div
                    key={day}
                    className={`flex items-center justify-between py-2 px-3 rounded-xl text-xs sm:text-sm transition-colors ${
                      isToday
                        ? 'bg-[#d48b38]/15 border border-[#d48b38]/40 text-[#fdfbf7] font-semibold'
                        : 'text-[#ccc4b6] hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isToday && <CalendarCheck className="w-3.5 h-3.5 text-[#d48b38]" />}
                      <span>{day}</span>
                      {isToday && (
                        <span className="text-[10px] uppercase font-bold text-[#d48b38] bg-[#d48b38]/20 px-1.5 py-0.5 rounded">
                          Today
                        </span>
                      )}
                    </div>
                    <span className={isToday ? 'text-[#e29d4c]' : 'text-[#a59f93]'}>
                      9:00 AM – 11:00 PM
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Subtext info */}
            <div className="mt-6 pt-5 border-t border-white/10 text-xs text-[#8f897d] flex items-center justify-between">
              <span>{status.subText}</span>
              <span>Kitchen open till 10:45 PM</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
