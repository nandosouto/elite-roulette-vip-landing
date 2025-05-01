
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navigateTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCTA = () => {
    trackPurchase();
    window.location.href = 'https://t.me/ederson27top_bot?start=w38394452';
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-roulette-background/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl md:text-2xl">
          Roleta <span className="text-roulette-accent">Elite</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button onClick={() => navigateTo('inicio')} className="text-white hover:text-roulette-accent transition-colors">
            Início
          </button>
          <button onClick={() => navigateTo('beneficios')} className="text-white hover:text-roulette-accent transition-colors">
            Benefícios
          </button>
          <button onClick={() => navigateTo('depoimentos')} className="text-white hover:text-roulette-accent transition-colors">
            Depoimentos
          </button>
          <button onClick={() => navigateTo('faq')} className="text-white hover:text-roulette-accent transition-colors">
            FAQ
          </button>
          <Button 
            onClick={handleCTA} 
            className="gold-gradient text-black font-bold px-4 py-2 rounded-full hover:shadow-lg transition-all"
          >
            Junte-se Grátis
          </Button>
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden flex items-center">
          <Button 
            onClick={handleCTA} 
            className="mr-4 gold-gradient text-black font-semibold px-3 py-1 text-sm rounded-full hover:shadow-lg transition-all"
            size="sm"
          >
            Junte-se Grátis
          </Button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-roulette-primary/95 backdrop-blur-md absolute top-full left-0 w-full py-4 shadow-lg">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <button 
              onClick={() => navigateTo('inicio')} 
              className="text-white hover:text-roulette-accent transition-colors py-2"
            >
              Início
            </button>
            <button 
              onClick={() => navigateTo('beneficios')} 
              className="text-white hover:text-roulette-accent transition-colors py-2"
            >
              Benefícios
            </button>
            <button 
              onClick={() => navigateTo('depoimentos')} 
              className="text-white hover:text-roulette-accent transition-colors py-2"
            >
              Depoimentos
            </button>
            <button 
              onClick={() => navigateTo('faq')} 
              className="text-white hover:text-roulette-accent transition-colors py-2"
            >
              FAQ
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
