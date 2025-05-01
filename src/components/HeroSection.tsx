
import React from 'react';
import { Button } from "@/components/ui/button";
import { trackPurchase, trackLead } from '@/lib/tracking';

const HeroSection: React.FC = () => {
  const handleCTA = () => {
    // Track both lead and purchase events
    trackLead();
    trackPurchase();
    window.location.href = 'https://t.me/ederson27top_bot?start=w38394452';
  };

  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex items-center pt-20 pb-16"
      style={{
        backgroundImage: `linear-gradient(rgba(26, 37, 47, 0.8), rgba(26, 37, 47, 0.9)), url('https://i.ibb.co/h1LvfNjT/banner-ederson.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block gold-gradient text-black font-semibold mb-4 py-2 px-4 rounded-full text-sm">
            MÉTODO EXCLUSIVO
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Entre Grátis e <span className="text-roulette-accent">Domine a Roleta!</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-white/90 mb-8">
            Método Ao Vivo <span className="font-bold text-white">100% Grátis</span> com 95% de assertividade
          </h2>
          
          <div className="max-w-md mx-auto">
            <Button 
              onClick={handleCTA}
              className="cta-button w-full text-lg mb-4"
            >
              Junte-se Grátis Agora
            </Button>
            
            <div className="flex items-center justify-center text-white/80 mb-6">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V5a1 1 0 0 1 2 0v4.586l3.036 3.036a1 1 0 0 1-.054 1.36z"/>
              </svg>
              <span className="text-sm">Apenas 15 vagas grátis restantes</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="bg-roulette-accent text-black font-bold rounded py-1 px-3 text-sm">
                100% Grátis
              </div>
              <div className="bg-white/10 rounded py-1 px-3 text-sm">
                Suporte 24/7
              </div>
              <div className="bg-white/10 rounded py-1 px-3 text-sm">
                +10.000 membros
              </div>
            </div>
          </div>
          
          <div className="mt-8 inline-flex items-center justify-center bg-white/5 backdrop-blur-sm py-3 px-6 rounded-lg border border-white/10">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
              <span className="text-green-400 font-medium mr-3">Online agora</span>
              <span className="text-white/80">732 pessoas assistindo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
