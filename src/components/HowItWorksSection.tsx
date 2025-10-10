import React from 'react';
import { Button } from '@/components/ui/button';
import { trackLead, trackPurchase } from '@/lib/tracking';
import { Rocket, Timer, MessagesSquare, ShieldCheck, PieChart, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: Rocket,
    title: 'Entre no grupo VIP',
    description: 'Cadastre-se gratuitamente e receba acesso imediato ao nosso canal exclusivo no Telegram.',
  },
  {
    icon: Timer,
    title: 'Receba sinais em tempo real',
    description: 'Alertas com hora, mesa, cor e proteção chegam com antecedência para você se preparar.',
  },
  {
    icon: MessagesSquare,
    title: 'Execute com suporte 24/7',
    description: 'Equipe especializada acompanha cada operação e tira dúvidas na hora, sem deixar você sozinho.',
  },
];

const credibilityHighlights = [
  {
    icon: ShieldCheck,
    title: 'Gestão de banca garantida',
    description: 'Planilha exclusiva, metas diárias e travas automáticas para proteger seu capital.',
  },
  {
    icon: PieChart,
    title: 'Estratégia validada',
    description: 'Curadoria semanal com histórico de 95% de acertos e replays das sessões vencedoras.',
  },
  {
    icon: Sparkles,
    title: 'Bônus de onboarding',
    description: 'Checklist de iniciante, glossário e desafios guiados para lucrar ainda no primeiro dia.',
  },
];

const HowItWorksSection: React.FC = () => {
  const handleCTA = () => {
    trackLead();
    trackPurchase();
    window.location.href = 'https://t.me/ederson27top_bot?start=w38394452';
  };

  return (
    <section id="como-funciona" className="section-padding bg-roulette-background/90">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Como o método <span className="text-roulette-accent">funciona na prática</span>
          </h2>
          <p className="text-white/80">
            Estruturamos cada etapa para que você entre, execute e escale com confiança, mesmo sem experiência anterior em roleta.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map(step => (
            <div
              key={step.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex flex-col items-start"
            >
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-roulette-accent/20 p-3">
                <step.icon className="h-8 w-8 text-roulette-accent" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {credibilityHighlights.map(highlight => (
            <div
              key={highlight.title}
              className="bg-roulette-primary/40 border border-roulette-accent/20 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-black/20 p-3">
                <highlight.icon className="h-7 w-7 text-roulette-accent" aria-hidden="true" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{highlight.title}</h4>
              <p className="text-white/70 text-sm leading-relaxed">{highlight.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 text-center backdrop-blur-sm">
          <p className="text-white/80 mb-6">
            Comece com nossa sequência guiada de 3 passos, valide seus primeiros resultados com stakes reduzidas e só então escale com segurança.
          </p>
          <Button onClick={handleCTA} className="cta-button w-full md:w-auto">
            Quero iniciar agora
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
