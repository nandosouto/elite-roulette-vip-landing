
import React, { useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { trackPurchase } from '@/lib/tracking';

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
  },
  { 
    id: 9, 
    name: "Luciana Ferreira", 
    text: "Comecei ontem e já ganhei R$350! Esse método da Roleta Elite é fantástico!", 
    profile: "https://randomuser.me/api/portraits/women/22.jpg" 
  },
  { 
    id: 10, 
    name: "Roberto Gomes", 
    text: "Depois de 3 dias usando o método, consegui R$1.200 de lucro. Recomendo muito!", 
    profile: "https://randomuser.me/api/portraits/men/25.jpg" 
  },
  { 
    id: 11, 
    name: "Camila Rocha", 
    text: "Esse método é incrível! Fiz R$280 no meu primeiro dia de testes.", 
    profile: "https://randomuser.me/api/portraits/women/29.jpg" 
  },
  { 
    id: 12, 
    name: "João Paulo", 
    text: "Os sinais são precisos demais. Consegui uma taxa de 90% de acerto.", 
    profile: "https://randomuser.me/api/portraits/men/32.jpg" 
  },
  { 
    id: 13, 
    name: "Amanda Nunes", 
    text: "Consegui pagar todas as minhas contas do mês com apenas 2 dias de método!", 
    profile: "https://randomuser.me/api/portraits/women/38.jpg" 
  },
  { 
    id: 14, 
    name: "Thiago Martins", 
    text: "R$700 na primeira semana, isso é inacreditável! O método realmente funciona.", 
    profile: "https://randomuser.me/api/portraits/men/45.jpg" 
  },
  { 
    id: 15, 
    name: "Patrícia Lopes", 
    text: "Estava desconfiada no começo, mas os resultados falam por si. R$400 em lucro!", 
    profile: "https://randomuser.me/api/portraits/women/42.jpg" 
  },
  { 
    id: 16, 
    name: "Ricardo Souza", 
    text: "Comecei com apenas R$50 e já estou com R$800. Método fantástico!", 
    profile: "https://randomuser.me/api/portraits/men/51.jpg" 
  },
  { 
    id: 17, 
    name: "Bianca Torres", 
    text: "Os sinais são extremamente precisos. Já lucrei mais de R$1.500 em duas semanas!", 
    profile: "https://randomuser.me/api/portraits/women/54.jpg" 
  },
  { 
    id: 18, 
    name: "Marcos Vieira", 
    text: "Método incrível! Consegui quitar meu carro em apenas 1 mês de operações.", 
    profile: "https://randomuser.me/api/portraits/men/62.jpg" 
  },
  { 
    id: 19, 
    name: "Vanessa Alves", 
    text: "Nunca vi nada igual. R$550 em apenas um final de semana usando o método!", 
    profile: "https://randomuser.me/api/portraits/women/66.jpg" 
  },
  { 
    id: 20, 
    name: "Leonardo Castro", 
    text: "O suporte é incrível e os sinais são perfeitos. Já lucrei mais de R$2.500!", 
    profile: "https://randomuser.me/api/portraits/men/72.jpg" 
  },
  { 
    id: 21, 
    name: "Daniela Ribeiro", 
    text: "Método sensacional! Consegui uma renda extra de R$2.000 por semana!", 
    profile: "https://randomuser.me/api/portraits/women/75.jpg" 
  },
  { 
    id: 22, 
    name: "Felipe Azevedo", 
    text: "Já tentei vários métodos, mas este é o único que realmente funciona. R$900 em lucro!", 
    profile: "https://randomuser.me/api/portraits/men/77.jpg" 
  },
  { 
    id: 23, 
    name: "Carla Nascimento", 
    text: "Muito obrigada pelos sinais! Consegui R$600 em apenas 3 dias!", 
    profile: "https://randomuser.me/api/portraits/women/82.jpg" 
  },
  { 
    id: 24, 
    name: "Bruno Cardoso", 
    text: "Achei que era impossível, mas consegui R$430 logo no primeiro dia com o método!", 
    profile: "https://randomuser.me/api/portraits/men/88.jpg" 
  },
  { 
    id: 25, 
    name: "Renata Duarte", 
    text: "Com os sinais da Roleta Elite, já ganhei mais de R$1.800 em duas semanas!", 
    profile: "https://randomuser.me/api/portraits/women/90.jpg" 
  },
  { 
    id: 26, 
    name: "Paulo Henrique", 
    text: "Método revolucionário! Ganhei R$350 no meu primeiro dia de uso!", 
    profile: "https://randomuser.me/api/portraits/men/92.jpg" 
  },
  { 
    id: 27, 
    name: "Luiza Campos", 
    text: "Os sinais são impressionantes! Consegui R$1.200 em apenas uma semana!", 
    profile: "https://randomuser.me/api/portraits/women/56.jpg" 
  },
  { 
    id: 28, 
    name: "Antônio Soares", 
    text: "Depois de usar o método por 5 dias, já fiz mais de R$1.600 em lucro!", 
    profile: "https://randomuser.me/api/portraits/men/99.jpg" 
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
                        loading="lazy"
                        decoding="async"
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
                  loading="lazy"
                  decoding="async"
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
