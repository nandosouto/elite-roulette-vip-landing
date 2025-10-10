
import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-roulette-background py-10 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-white font-bold text-xl mb-4 md:mb-0">
            Roleta <span className="text-roulette-accent">Elite</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-center">
            <a href="#inicio" className="text-white/70 hover:text-white transition-colors text-sm">
              Início
            </a>
            <a href="#como-funciona" className="text-white/70 hover:text-white transition-colors text-sm">
              Como Funciona
            </a>
            <a href="#beneficios" className="text-white/70 hover:text-white transition-colors text-sm">
              Benefícios
            </a>
            <a href="#depoimentos" className="text-white/70 hover:text-white transition-colors text-sm">
              Depoimentos
            </a>
            <a href="#faq" className="text-white/70 hover:text-white transition-colors text-sm">
              FAQ
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm mb-4 md:mb-0">
              &copy; {year} Roleta Elite. Todos os direitos reservados.
            </p>
            
            <div className="flex flex-col items-center md:items-end">
              <p className="text-white/50 text-xs mb-2">
                Proibido para menores de 18 anos.
              </p>
              <p className="text-white/50 text-xs text-center md:text-right max-w-md">
                Jogo envolve riscos. Jogue com responsabilidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
