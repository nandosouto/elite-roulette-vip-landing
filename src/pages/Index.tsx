
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import BenefitsSection from '@/components/BenefitsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import FloatingCTA from '@/components/FloatingCTA';
import { trackPurchase, trackLead, initializeTracking } from '@/lib/tracking';

// Make the tracking functions globally available
declare global {
  interface Window {
    trackPurchase: () => void;
    trackLead: () => void;
  }
}

const Index = () => {
  useEffect(() => {
    // Make tracking functions accessible globally
    window.trackPurchase = trackPurchase;
    window.trackLead = trackLead;
    
    // Initialize tracking
    initializeTracking();
    
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
        <HowItWorksSection />
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
