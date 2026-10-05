import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Send } from 'lucide-react';
import { restaurantData } from '../data/restaurantData';

export const ContactSection: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [inquiryType, setInquiryType] = useState('Table Reservation');
  const [guestCount, setGuestCount] = useState('2-4 Guests');
  const [message, setMessage] = useState('');

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(
      `Hello Mannat Cafe & Restaurant,\n\n` +
      `*Name:* ${guestName || 'Guest'}\n` +
      `*Inquiry Type:* ${inquiryType}\n` +
      `*Party Size:* ${guestCount}\n` +
      `*Note:* ${message || 'I would like to inquire about booking/menu.'}`
    );
    window.open(`https://wa.me/${restaurantData.whatsappNumber}?text=${encoded}`, '_blank');
  };

  const directWhatsappLink = `https://wa.me/${restaurantData.whatsappNumber}?text=${encodeURIComponent(
    "Hello Mannat Cafe & Restaurant, I would like to know more about your menu/order options."
  )}`;

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#121418] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#d48b38] uppercase mb-2">
            <Phone className="w-4 h-4" />
            <span>Get In Touch</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fdfbf7] tracking-tight mb-4">
            Connect With Us
          </h2>
          <p className="text-sm sm:text-base text-[#b0a99c]">
            Have a question, catering request, or looking to reserve seating? Reach our team directly via phone or WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official Contact Card */}
          <div className="lg:col-span-6 glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="space-y-6">
              <div>
                <span className="font-brand text-xs tracking-widest text-[#d48b38] uppercase font-bold">
                  Official Business Card
                </span>
                <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#fdfbf7] mt-1">
                  Mannat Cafe &amp; Restaurant
                </h3>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#d48b38] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#a59f93] font-semibold uppercase tracking-wider">
                      Location
                    </div>
                    <div className="text-sm sm:text-base text-[#ede8df] font-medium mt-0.5">
                      Vinayak Nagar, Sainthal Road, Dausa, Rajasthan 303303
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#d48b38] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#a59f93] font-semibold uppercase tracking-wider">
                      Phone Number
                    </div>
                    <div className="text-sm sm:text-base text-[#ede8df] font-medium mt-0.5">
                      +91 99296 60850
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#d48b38] shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#a59f93] font-semibold uppercase tracking-wider">
                      Hours of Operation
                    </div>
                    <div className="text-sm sm:text-base text-[#ede8df] font-medium mt-0.5">
                      9:00 AM – 11:00 PM (Monday – Sunday)
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <a
                  href={`tel:${restaurantData.phoneRaw}`}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-[#0d0f12] bg-[#d48b38] hover:bg-[#e29d4c] transition-all shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>

                <a
                  href={directWhatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Instant WhatsApp Quick Connect Form */}
          <div className="lg:col-span-6 glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
            <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#fdfbf7] mb-2">
              Send Quick Message
            </h3>
            <p className="text-xs sm:text-sm text-[#b0a99c] mb-6">
              Fill in your details and send directly to our manager via WhatsApp in seconds.
            </p>

            <form onSubmit={handleSendInquiry} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#d3cbbe] uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-[#16191e] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#fdfbf7] placeholder-[#7d776c] focus:outline-none focus:border-[#d48b38]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#d3cbbe] uppercase tracking-wider mb-1.5">
                    Inquiry Type
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-[#16191e] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#fdfbf7] focus:outline-none focus:border-[#d48b38]"
                  >
                    <option value="Table Reservation">Table Reservation</option>
                    <option value="Takeaway Order">Takeaway Order</option>
                    <option value="Birthday / Event">Birthday / Small Event</option>
                    <option value="Menu Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d3cbbe] uppercase tracking-wider mb-1.5">
                    Guests / Party
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full bg-[#16191e] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#fdfbf7] focus:outline-none focus:border-[#d48b38]"
                  >
                    <option value="1-2 Guests">1–2 Guests</option>
                    <option value="2-4 Guests">2–4 Guests</option>
                    <option value="5-8 Guests">5–8 Guests</option>
                    <option value="Family / 10+">10+ Family Group</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#d3cbbe] uppercase tracking-wider mb-1.5">
                  Message / Special Request (Optional)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Preferred timing, specific dishes, or celebration requirements..."
                  className="w-full bg-[#16191e] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#fdfbf7] placeholder-[#7d776c] focus:outline-none focus:border-[#d48b38]"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-semibold text-[#0d0f12] bg-[#d48b38] hover:bg-[#e29d4c] transition-all shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Send className="w-4 h-4" />
                <span>Send via WhatsApp</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
