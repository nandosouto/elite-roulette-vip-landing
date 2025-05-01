
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { trackPurchase } from '@/lib/tracking';

const benefits = [
  {
    title: "Sinais Grátis",
    description: "Receba sinais de roleta precisos todos os dias, sem nenhum custo."
  },
  {
    title: "Método Ao Vivo",
    description: "Acompanhe em tempo real a execução do método com 95% de assertividade."
  },
  {
    title: "Suporte 24/7",
    description: "Nossa equipe está disponível para ajudar você 24 horas por dia, 7 dias por semana."
  },
  {
    title: "95% de Assertividade",
    description: "Método testado e comprovado com alta taxa de acerto."
  }
];

const BenefitsSection: React.FC = () => {
  return (
    <section id="beneficios" className="section-padding bg-gradient-to-b from-roulette-background to-roulette-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Benefícios <span className="text-roulette-accent">Exclusivos</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Ao entrar para o grupo VIP da Roleta Elite, você terá acesso a benefícios exclusivos que 
            vão transformar sua experiência com roletas online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <CardContent className="p-6">
                <div className="h-12 w-12 gold-gradient rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-black font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 text-center">{benefit.title}</h3>
                <p className="text-white/70 text-center">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Entre para o Grupo VIP</h3>
              <p className="text-white/70">
                Apenas 15 vagas grátis disponíveis — oferta por tempo limitado!
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                onClick={() => {
                  trackPurchase();
                  window.location.href = 'https://t.me/ederson27top_bot?start=w38394452';
                }} 
                className="cta-button"
              >
                Junte-se Grátis
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
