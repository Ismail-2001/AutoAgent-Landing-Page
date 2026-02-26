import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plug, Brain, CheckSquare, Rocket, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
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

      // Timeline line draw
      const timelineLine = timelineRef.current?.querySelector('.timeline-line');
      if (timelineLine) {
        gsap.fromTo(
          timelineLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              end: 'bottom 40%',
              scrub: true,
            },
          }
        );
      }

      // Step cards
      const stepCards = timelineRef.current?.querySelectorAll('.step-card');
      if (stepCards) {
        stepCards.forEach((card, index) => {
          const isLeft = index % 2 === 0;
          gsap.fromTo(
            card,
            { x: isLeft ? '-8vw' : '8vw', opacity: 0, scale: 0.98 },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // Step numbers
      const stepNumbers = timelineRef.current?.querySelectorAll('.step-number');
      if (stepNumbers) {
        stepNumbers.forEach((num) => {
          gsap.fromTo(
            num,
            { y: 10, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              scrollTrigger: {
                trigger: num,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      icon: Plug,
      title: 'Connect',
      description:
        'Link your store. We sync orders, products, and customers securely.',
      day: 'Day 1',
    },
    {
      icon: Brain,
      title: 'Train',
      description:
        'Our AI learns your patterns: LTV, seasonality, stock velocity.',
      day: 'Days 2-7',
    },
    {
      icon: CheckSquare,
      title: 'Test',
      description:
        'You approve actions for the first week. We prove ROI before full autonomy.',
      day: 'Days 8-10',
    },
    {
      icon: Rocket,
      title: 'Autopilot',
      description:
        'Agents run 24/7. You monitor metrics and set guardrails.',
      day: 'Day 11+',
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative bg-dark py-20 lg:py-32 z-50"
    >
      <div className="w-full px-6 lg:px-[7vw]">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-20">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,52px)] font-bold text-gray-primary mb-4">
            From signup to <span className="text-lime">autopilot</span> in 14
            days
          </h2>
          <p className="text-base lg:text-lg text-gray-secondary max-w-2xl mx-auto">
            We handle the heavy lifting: integration, training, and safety
            rules—so you don&apos;t need a technical team.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden lg:block">
            <div className="timeline-line absolute inset-0 bg-lime/30 origin-top" />
          </div>

          {/* Steps */}
          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-8 ${
                    index > 0 ? 'lg:mt-8' : ''
                  }`}
                >
                  {/* Card */}
                  <div
                    className={`step-card card-glass p-6 relative ${
                      isLeft
                        ? 'lg:col-start-1 lg:mr-auto'
                        : 'lg:col-start-2 lg:ml-auto'
                    } lg:w-[90%]`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl border border-lime/60 flex items-center justify-center flex-shrink-0">
                        <step.icon size={22} className="text-lime" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display font-semibold text-lg text-gray-primary">
                            {step.title}
                          </h3>
                          <span className="step-number font-mono text-xs text-lime bg-lime/10 px-2 py-0.5 rounded">
                            {step.day}
                          </span>
                        </div>
                        <p className="text-sm text-gray-secondary">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Center dot (desktop only) */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-lime items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-dark" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <button
            onClick={() => scrollToSection('pricing')}
            className="btn-primary inline-flex items-center gap-2"
          >
            See the implementation plan
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
