
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consentAccepted = localStorage.getItem('cookie_consent');
    if (!consentAccepted) {
      // Wait 2 seconds before showing the banner
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-roulette-primary/90 backdrop-blur-md shadow-lg z-50 p-4 border-t border-white/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-white text-sm">
              Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa 
              <a href="#" className="text-roulette-accent hover:underline ml-1">Política de Privacidade</a>.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={acceptCookies}
              className="gold-gradient text-black font-semibold"
            >
              Aceitar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
