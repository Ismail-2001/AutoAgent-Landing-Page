import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, Zap, Star, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PricingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);

  const [revenue, setRevenue] = useState(50000);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Pricing cards
      const cards = cardsRef.current?.querySelectorAll('.pricing-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: '6vh', opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Calculator
      gsap.fromTo(
        calculatorRef.current,
        { y: '4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: calculatorRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const plans = [
    {
      name: 'Pilot Program',
      icon: Zap,
      price: '$4,995',
      period: '/ 90 days',
      description: 'Perfect for testing',
      features: [
        '1 Agent (your choice)',
        'Full setup & training',
        'White-glove onboarding',
        'Recover $15K+ or refund',
      ],
      cta: 'Start pilot',
      highlighted: false,
    },
    {
      name: 'Growth System',
      icon: Star,
      price: '$8,500',
      period: ' setup + $2,500/mo',
      description: 'Most popular',
      features: [
        'All 3 Agents',
        'Custom deployment',
        'Priority support',
        'Monthly optimization',
        'ROI guarantee',
      ],
      cta: 'Book demo',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      icon: Building2,
      price: '$3,000',
      period: ' + 10% recovered',
      description: 'Custom terms',
      features: [
        'All agents + custom builds',
        'Dedicated support',
        'White-label option',
        'Multi-store deployment',
        'Risk-free model',
      ],
      cta: 'Schedule a call',
      highlighted: false,
    },
  ];

  const abandonmentRate = 0.67;
  const recoveryRate = 0.2;
  const lostSales = revenue * abandonmentRate;
  const recoveredRevenue = lostSales * recoveryRate;
  const investment = 2500;
  const netGain = recoveredRevenue - investment;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative bg-dark py-20 lg:py-32 z-[80]"
    >
      <div className="w-full px-6 lg:px-[7vw]">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,52px)] font-bold text-gray-primary mb-4">
            Pricing that <span className="text-lime">pays for itself</span>
          </h2>
          <p className="text-base lg:text-lg text-gray-secondary max-w-xl mx-auto">
            Start with a pilot. Scale when you see the numbers.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-5 lg:gap-6 mb-10 lg:mb-12"
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card card-glass p-6 relative ${
                plan.highlighted
                  ? 'border-lime/40 shadow-glow scale-[1.02]'
                  : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lime text-dark text-xs font-mono font-medium px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg border border-lime/60 flex items-center justify-center">
                  <plan.icon size={20} className="text-lime" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-gray-primary">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-gray-secondary">
                    {plan.description}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <span className="font-display text-3xl font-bold text-lime">
                  {plan.price}
                </span>
                <span className="text-sm text-gray-secondary">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="text-lime flex-shrink-0 mt-0.5" />
                    <span className="text-gray-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollToSection('final-cta')}
                className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                  plan.highlighted
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                {plan.cta}
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* ROI Calculator */}
        <div ref={calculatorRef} className="card-glass p-6 lg:p-8 relative">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-lime" />

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display font-semibold text-xl text-gray-primary mb-4">
                Calculate your potential ROI
              </h3>

              <div className="mb-6">
                <label className="text-sm text-gray-secondary mb-2 block">
                  Your monthly revenue
                </label>
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  step="5000"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-lime"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-secondary">$10K</span>
                  <span className="font-mono text-lime font-medium">
                    ${revenue.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-secondary">$500K</span>
                </div>
              </div>
            </div>

            <div className="lg:border-l lg:border-white/5 lg:pl-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-secondary">
                    Typical abandonment (67%)
                  </span>
                  <span className="font-mono text-gray-primary">
                    ${lostSales.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-secondary">
                    Lost sales monthly
                  </span>
                  <span className="font-mono text-gray-primary">
                    ${lostSales.toLocaleString()}
                  </span>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-lime">
                      With AutoAgent (20% recovery)
                    </span>
                    <span className="font-mono text-lime font-bold">
                      +${recoveredRevenue.toLocaleString()}/mo
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-secondary">
                      Investment
                    </span>
                    <span className="font-mono text-gray-secondary">
                      -${investment.toLocaleString()}/mo
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-white/5">
                    <span className="font-display font-semibold text-gray-primary">
                      Net gain
                    </span>
                    <span className="font-display text-2xl font-bold text-lime">
                      +${netGain.toLocaleString()}/mo
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => scrollToSection('final-cta')}
                className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
              >
                See your potential ROI
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
