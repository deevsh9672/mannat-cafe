import React, { useRef, useState, useEffect } from 'react';
import { Star, MessageSquare, ChevronLeft, ChevronRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { restaurantData } from '../data/restaurantData';

export const ReviewsSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll effect that pauses on hover
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#121418] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Overall Rating Card */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#d48b38] uppercase mb-2">
              <MessageSquare className="w-4 h-4" />
              <span>Authentic Guest Feedback</span>
            </div>
            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fdfbf7] tracking-tight">
              What Our Guests Say
            </h2>
            <p className="text-sm sm:text-base text-[#b0a99c] mt-2 max-w-xl">
              Transparent, genuine impressions from diners in Vinayak Nagar and visitors across Dausa.
            </p>
          </div>

          {/* Rating Badge Card */}
          <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <div className="text-center border-r border-white/10 pr-5">
              <div className="text-3xl sm:text-4xl font-bold text-[#fdfbf7] font-serif-title">
                {restaurantData.rating.score}
                <span className="text-base text-[#a59f93] font-normal"> / 5</span>
              </div>
              <div className="flex items-center justify-center gap-1 mt-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= Math.floor(restaurantData.rating.score)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-amber-400/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase font-bold text-[#fdfbf7] tracking-wider">
                Google Reviews
              </div>
              <div className="text-xs text-[#a59f93]">
                Based on {restaurantData.rating.reviewCount} customer reviews
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 mt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Listing Data</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs text-[#8f897d]">
            Swipe on mobile or use arrows to view testimonials
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleScrollLeft}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/15 hover:text-[#d48b38] transition-colors"
              aria-label="Scroll reviews left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleScrollRight}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/15 hover:text-[#d48b38] transition-colors"
              aria-label="Scroll reviews right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Reviews Carousel Track */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {restaurantData.reviews.map((rev) => (
            <div
              key={rev.id}
              className="min-w-[280px] sm:min-w-[340px] max-w-[360px] glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between hover:border-[#d48b38]/40 transition-all duration-300"
            >
              <div>
                {/* Rating Stars and Source */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-white/20'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-[#a59f93] bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    {rev.source}
                  </span>
                </div>

                {/* Highlight Tag */}
                {rev.highlight && (
                  <div className="text-xs font-semibold text-[#d48b38] mb-2">
                    &ldquo;{rev.highlight}&rdquo;
                  </div>
                )}

                {/* Review Content */}
                <p className="text-xs sm:text-sm text-[#ccc4b6] leading-relaxed italic mb-6">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              {/* Author & Attribution Footer */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#fdfbf7]">{rev.author}</span>
                <span className="text-[#8f897d]">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View More on Google Button */}
        <div className="mt-10 text-center">
          <a
            href={restaurantData.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-[#ede8df] bg-white/5 hover:bg-white/10 border border-white/10 transition-all transform hover:-translate-y-0.5"
          >
            <span>View All Reviews on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#d48b38]" />
          </a>
        </div>

      </div>
    </section>
  );
};
