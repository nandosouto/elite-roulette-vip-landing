
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BenefitsSection from '@/components/BenefitsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import FloatingCTA from '@/components/FloatingCTA';
import { trackPurchase } from '@/lib/tracking';

// Make the trackPurchase function globally available
declare global {
  interface Window {
    trackPurchase: () => void;
  }
}

const Index = () => {
  useEffect(() => {
    // Make trackPurchase accessible globally for the inline script
    window.trackPurchase = trackPurchase;
    
    // Preload the hero background image for better performance
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = 'https://i.ibb.co/h1LvfNjT/banner-ederson.jpg';
    document.head.appendChild(preloadLink);
    
    // Clean up when component unmounts
    return () => {
      document.head.removeChild(preloadLink);
    };
  }, []);

  return (
    <div className="min-h-screen bg-roulette-background text-white flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
      <CookieConsent />
      <FloatingCTA />
    </div>
  );
};

export default Index;
