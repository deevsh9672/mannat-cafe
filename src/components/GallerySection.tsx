import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { restaurantData, type GalleryItem } from '../data/restaurantData';

export const GallerySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Food' | 'Interior' | 'Exterior' | 'Ambience'>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const tabs: ('All' | 'Food' | 'Interior' | 'Exterior' | 'Ambience')[] = [
    'All',
    'Food',
    'Interior',
    'Exterior',
    'Ambience',
  ];

  const filteredGallery = restaurantData.gallery.filter((item) => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredGallery.length]);

  const handleNext = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % filteredGallery.length);
  };

  const handlePrev = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
  };

  const activeItem: GalleryItem | undefined =
    activeLightboxIndex !== null ? filteredGallery[activeLightboxIndex] : undefined;

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#0d0f12] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#d48b38] uppercase mb-2">
            <ImageIcon className="w-4 h-4" />
            <span>Visual Showcase</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fdfbf7] tracking-tight mb-4">
            Moments, Ambience &amp; Cuisines
          </h2>
          <p className="text-sm sm:text-base text-[#b0a99c]">
            A glimpse into the dining corners, outdoor seating, and freshly prepared dishes at Mannat Cafe.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setActiveLightboxIndex(null);
              }}
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                activeTab === tab
                  ? 'bg-[#d48b38] text-[#0d0f12] font-semibold shadow-lg shadow-[#d48b38]/20'
                  : 'bg-white/5 text-[#a59f93] hover:text-[#fdfbf7] hover:bg-white/10 border border-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredGallery.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(index)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-lg bg-black/40 h-64 sm:h-72 transform hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80";
                }}
              />

              {/* Hover Dark Overlay with Details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                <span className="text-[10px] font-semibold text-[#d48b38] uppercase tracking-wider mb-1">
                  {item.category}
                </span>
                <h4 className="text-base font-bold text-[#fdfbf7] font-serif-title mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[#d3cbbe] line-clamp-2">
                  {item.caption}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#e29d4c] font-semibold">
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Fullsize</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          {/* Close button */}
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-[#d48b38] transition-colors focus:outline-none"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-[#d48b38] transition-colors focus:outline-none"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-[#d48b38] transition-colors focus:outline-none"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Lightbox Content */}
          <div className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center">
            <div className="relative rounded-2xl overflow-hidden max-h-[70vh] shadow-2xl border border-white/10">
              <img
                src={activeItem.image}
                alt={activeItem.alt}
                className="max-h-[70vh] w-auto max-w-full object-contain mx-auto"
              />
            </div>
            
            {/* Lightbox Caption */}
            <div className="mt-4 text-center max-w-xl px-4">
              <div className="inline-block text-[11px] font-semibold text-[#d48b38] uppercase tracking-wider mb-1">
                {activeItem.category} • {activeLightboxIndex! + 1} of {filteredGallery.length}
              </div>
              <h3 className="text-lg font-bold text-[#fdfbf7] font-serif-title">
                {activeItem.title}
              </h3>
              <p className="text-xs text-[#a59f93] mt-1">
                {activeItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
