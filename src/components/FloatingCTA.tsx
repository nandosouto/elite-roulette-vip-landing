
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { trackPurchase, trackLead } from '@/lib/tracking';

const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show the floating CTA when user scrolls down past 70% of viewport height
      if (scrollY > window.innerHeight * 0.7) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTA = () => {
    trackLead();
    trackPurchase();
    window.location.href = 'https://t.me/ederson27top_bot?start=w38394452';
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-bounce">
      <Button 
        onClick={handleCTA}
        className="gold-gradient text-black font-bold px-4 py-2 rounded-full shadow-lg hover:shadow-xl"
      >
        Junte-se Grátis
      </Button>
    </div>
  );
};

export default FloatingCTA;
