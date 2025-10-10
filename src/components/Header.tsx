
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { trackPurchase, trackLead } from '@/lib/tracking';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'inicio', label: 'Início' },
    { id: 'como-funciona', label: 'Como Funciona' },
    { id: 'beneficios', label: 'Benefícios' },
    { id: 'depoimentos', label: 'Depoimentos' },
    { id: 'faq', label: 'FAQ' }
  ];

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
    trackLead();
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
        <nav className="hidden md:flex items-center space-x-6" aria-label="Navegação principal">
          {menuItems.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => navigateTo(item.id)}
              className="text-white hover:text-roulette-accent transition-colors"
            >
              {item.label}
            </button>
          ))}
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
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="menu-mobile"
            aria-label="Abrir menu de navegação"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="menu-mobile"
          className="md:hidden bg-roulette-primary/95 backdrop-blur-md absolute top-full left-0 w-full py-4 shadow-lg"
        >
          <div className="container mx-auto px-4 flex flex-col space-y-3" role="menu">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className="text-white hover:text-roulette-accent transition-colors py-2 text-left"
                type="button"
                role="menuitem"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
