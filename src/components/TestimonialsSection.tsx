
import React, { useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

// Sample testimonials data - in a real app, you'd have actual data and images
const testimonials = [
  { 
    id: 1, 
    name: "Ana Silva", 
    text: "R$500 em apenas 1 dia! Método realmente funciona!", 
    profile: "https://randomuser.me/api/portraits/women/44.jpg" 
  },
  { 
    id: 2, 
    name: "Pedro Santos", 
    text: "Comecei com R$100 e já estou com R$1.500 na minha conta. Método incrível!", 
    profile: "https://randomuser.me/api/portraits/men/35.jpg" 
  },
  { 
    id: 3, 
    name: "Mariana Oliveira", 
    text: "Finalmente um método que realmente funciona. Ganhei R$750 na primeira semana!", 
    profile: "https://randomuser.me/api/portraits/women/68.jpg" 
  },
  { 
    id: 4, 
    name: "Carlos Mendes", 
    text: "Consegui pagar minhas dívidas graças aos sinais da Roleta Elite. Muito obrigado!", 
    profile: "https://randomuser.me/api/portraits/men/41.jpg" 
  },
  { 
    id: 5, 
    name: "Juliana Costa", 
    text: "Nunca imaginei que poderia ganhar tanto dinheiro com roleta. R$300 em 2 horas!", 
    profile: "https://randomuser.me/api/portraits/women/33.jpg" 
  },
  { 
    id: 6, 
    name: "Rafael Almeida", 
    text: "Os sinais são muito precisos. Já fiz mais de R$2.000 em um mês!", 
    profile: "https://randomuser.me/api/portraits/men/22.jpg" 
  },
  { 
    id: 7, 
    name: "Fernanda Lima", 
    text: "Método simples e eficaz. Consegui R$450 logo na primeira tentativa!", 
    profile: "https://randomuser.me/api/portraits/women/14.jpg" 
  },
  { 
    id: 8, 
    name: "Gustavo Pereira", 
    text: "Achei que era golpe, mas resolvi testar. Resultado: R$600 no bolso em 3 dias!", 
    profile: "https://randomuser.me/api/portraits/men/19.jpg" 
  }
];

const TestimonialsSection: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  
  const handleCTA = () => {
    trackPurchase();
    window.location.href = 'https://t.me/ederson27top_bot?start=w38394452';
  };

  return (
    <section id="depoimentos" className="section-padding bg-roulette-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-roulette-accent">Depoimentos</span> de Sucesso
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Mais de 10.000 pessoas já transformaram suas vidas com o nosso método exclusivo.
            Veja o que alguns dos nossos membros VIP estão falando.
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.slice(0, visibleCount).map(item => (
                <CarouselItem key={item.id}>
                  <Card className="bg-white/5 border border-white/10 backdrop-blur-sm">
                    <CardContent className="p-6 flex flex-col items-center">
                      <img 
                        src={item.profile} 
                        alt={item.name} 
                        className="w-16 h-16 rounded-full mb-4 border-2 border-roulette-accent"
                      />
                      <p className="text-white/80 mb-4 text-center">"{item.text}"</p>
                      <p className="text-roulette-accent font-bold">{item.name}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="relative static mr-2 bg-white/10" />
              <CarouselNext className="relative static ml-2 bg-white/10" />
            </div>
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, visibleCount).map(item => (
            <Card key={item.id} className="bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <CardContent className="p-6 flex flex-col items-center">
                <img 
                  src={item.profile} 
                  alt={item.name} 
                  className="w-16 h-16 rounded-full mb-4 border-2 border-roulette-accent"
                />
                <p className="text-white/80 mb-4 text-center">"{item.text}"</p>
                <p className="text-roulette-accent font-bold">{item.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {visibleCount < testimonials.length && (
          <div className="text-center mt-8">
            <Button 
              onClick={() => setVisibleCount(testimonials.length)}
              className="bg-white/10 hover:bg-white/20 text-white"
            >
              Ver Mais Depoimentos
            </Button>
          </div>
        )}

        <div className="mt-16 max-w-3xl mx-auto bg-roulette-accent/10 border border-roulette-accent/30 rounded-lg p-6 backdrop-blur-sm">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Junte-se aos mais de 10.000 membros satisfeitos
            </h3>
            <p className="text-white/80 mb-6">
              Entre agora para o grupo VIP gratuito e comece a transformar sua vida financeira hoje mesmo.
            </p>
            <Button 
              onClick={handleCTA}
              className="cta-button"
            >
              Quero Entrar Grátis
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
