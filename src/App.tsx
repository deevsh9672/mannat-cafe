import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HeroStatsCards } from './components/HeroStatsCards';
import { AboutSection } from './components/AboutSection';
import { FeaturedFood } from './components/FeaturedFood';
import { ThreeDFoodShowcase } from './components/ThreeDFoodShowcase';
import { InteractiveMenu } from './components/InteractiveMenu';
import { ExperienceSection } from './components/ExperienceSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { InstagramGrid } from './components/InstagramGrid';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MenuChatAssistant } from './components/MenuChatAssistant';
import { CursorGlow3D } from './components/CursorGlow3D';
import { SeoJsonLd } from './components/SeoJsonLd';
import type { CartItem } from './types';
import type { MenuItem } from './data/restaurantData';

export function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.menuItem.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.menuItem.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
    // Open drawer gently so user sees the addition
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.menuItem.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.menuItem.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0d0f12] text-[#ede8df] flex flex-col font-sans selection:bg-[#d48b38] selection:text-[#0d0f12] relative overflow-x-hidden">
      {/* 3D Ambient Lighting Cursor Follower */}
      <CursorGlow3D />

      {/* Local SEO Schema Structured Data */}
      <SeoJsonLd />

      {/* Sticky Header Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Split 3D Hero with 3D Interactive Dish Platter & Steam */}
        <Hero onAddToCart={handleAddToCart} />

        {/* Hero Info Metric Cards with 3D Tilt */}
        <HeroStatsCards />

        {/* About Mannat Cafe */}
        <AboutSection />

        {/* Customer Favourites with Multi-Layer 3D Depth Cards */}
        <FeaturedFood onAddToCart={handleAddToCart} />

        {/* Interactive 3D Spatial Carousel Stage */}
        <ThreeDFoodShowcase onAddToCart={handleAddToCart} />

        {/* Interactive Digital Menu with Search & Category Tabs */}
        <InteractiveMenu
          cart={cart}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
        />

        {/* Restaurant Experience (Split-Screen) */}
        <ExperienceSection />

        {/* Masonry Food & Ambience Gallery with Lightbox */}
        <GallerySection />

        {/* Guest Reviews Carousel (3.8 rating, 88 reviews) */}
        <ReviewsSection />

        {/* Location & Map + Live Dynamic Opening Hours */}
        <LocationSection />

        {/* Contact Information & WhatsApp Inquiry */}
        <ContactSection />

        {/* Visual Social Showcase */}
        <InstagramGrid />
      </main>

      {/* Dark Premium Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Mobile Sticky CTA Bar */}
      <MobileStickyCTA onOpenMenu={() => setIsCartOpen(true)} />

      {/* Floating WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* Interactive AI Menu Chat Assistant */}
      <MenuChatAssistant
        onAddToCart={handleAddToCart}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
      />
    </div>
  );
}

export default App;
