
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';

const faqs = [
  {
    question: "É realmente grátis?",
    answer: "Sim, o acesso ao grupo VIP e ao método é 100% gratuito. Não cobramos nada para você entrar e começar a usar nossa estratégia de roleta."
  },
  {
    question: "Como recebo os sinais?",
    answer: "Os sinais são enviados diretamente no grupo do Telegram. Após se juntar, você terá acesso imediato a todos os sinais e ao método ao vivo."
  },
  {
    question: "Preciso de experiência anterior com roletas?",
    answer: "Não, nosso método é simples e pode ser aplicado por qualquer pessoa, mesmo sem experiência prévia em roleta ou apostas."
  },
  {
    question: "Quanto posso ganhar com o método?",
    answer: "Os ganhos variam de pessoa para pessoa, dependendo do capital inicial e da disciplina ao seguir o método. Temos membros que conseguem ganhar de R$300 a mais de R$2.000 por semana."
  },
  {
    question: "Em quais plataformas posso usar o método?",
    answer: "Nosso método funciona em qualquer plataforma de cassino online que tenha roleta ao vivo."
  },
  {
    question: "Por quanto tempo terei acesso ao grupo VIP?",
    answer: "Uma vez que você entra no grupo, tem acesso ilimitado por tempo indeterminado, desde que siga nossas regras básicas de comunidade."
  }
];

const FAQSection: React.FC = () => {
  const handleCTA = () => {
    trackPurchase();
    window.location.href = 'https://t.me/ederson27top_bot?start=w38394452';
  };
  
  return (
    <section id="faq" className="section-padding bg-gradient-to-b from-roulette-primary to-roulette-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Perguntas <span className="text-roulette-accent">Frequentes</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Tire suas dúvidas sobre o método e o grupo VIP da Roleta Elite.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-white/10 py-2"
              >
                <AccordionTrigger className="text-white hover:text-roulette-accent text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            Pronto para <span className="text-roulette-accent">começar</span>?
          </h3>
          <Button 
            onClick={handleCTA}
            className="cta-button"
          >
            Entrar no Grupo VIP Grátis
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
