import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Package, Crown, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Headline words animation
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.8 },
          0.2
        );
      }

      // Subheadline
      tl.fromTo(
        subheadlineRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.6
      );

      // CTAs
      tl.fromTo(
        ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.7
      );

      // Label
      tl.fromTo(
        labelRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        0.4
      );

      // Agent cards
      const cards = cardsRef.current?.querySelectorAll('.agent-card');
      if (cards) {
        cards.forEach((card, index) => {
          tl.fromTo(
            card,
            { x: '18vw', opacity: 0 },
            { x: 0, opacity: 1, duration: 0.7 },
            0.5 + index * 0.12
          );

          // Accent strip
          const strip = card.querySelector('.accent-strip');
          if (strip) {
            tl.fromTo(
              strip,
              { scaleY: 0 },
              { scaleY: 1, duration: 0.5, transformOrigin: 'top' },
              0.7 + index * 0.12
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current], {
              x: 0,
              opacity: 1,
            });
            const cards = cardsRef.current?.querySelectorAll('.agent-card');
            if (cards && cards.length > 0) {
              gsap.set(cards, {
                x: 0,
                opacity: 1,
              });
            }
          },
        },
      });

      // ENTRANCE (0%-30%): Keep settled state (no animation to avoid mismatch with load)
      // SETTLE (30%-70%): Hold position

      // EXIT (70%-100%)
      scrollTl.fromTo(
        [headlineRef.current, subheadlineRef.current, ctaRef.current],
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      const cards = cardsRef.current?.querySelectorAll('.agent-card');
      if (cards) {
        scrollTl.fromTo(
          cards,
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
          0.7
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const agentCards = [
    {
      icon: Mail,
      title: 'Recovery Agent',
      description: 'Adaptive emails + SMS that bring carts back.',
    },
    {
      icon: Package,
      title: 'Inventory Agent',
      description: 'Dead-stock alerts, reorders, and pricing suggestions.',
    },
    {
      icon: Crown,
      title: 'VIP Agent',
      description: 'High-LTV detection, personalized thank-yous, returns care.',
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
      className="section-pinned bg-dark flex items-center relative z-10"
    >
      {/* Subtle radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(184, 255, 44, 0.03) 0%, transparent 50%)',
        }}
      />

      <div className="w-full px-6 lg:px-[7vw] py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Headline + CTAs */}
          <div className="max-w-xl">
            <h1
              ref={headlineRef}
              className="font-display text-4xl sm:text-5xl lg:text-[clamp(44px,5vw,76px)] font-bold text-gray-primary leading-[0.95] tracking-tight mb-6"
            >
              <span className="word inline-block">Your</span>{' '}
              <span className="word inline-block">store.</span>{' '}
              <span className="word inline-block">Three</span>{' '}
              <span className="word inline-block">agents.</span>{' '}
              <span className="word inline-block text-lime">Zero</span>{' '}
              <span className="word inline-block text-lime">busywork.</span>
            </h1>

            <p
              ref={subheadlineRef}
              className="text-base lg:text-lg text-gray-secondary leading-relaxed mb-8"
            >
              AutoAgent runs recovery, inventory, and VIP retention—so your team
              can focus on growth.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('pricing')}
                className="btn-primary flex items-center gap-2"
              >
                Book a demo
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="btn-secondary"
              >
                See how it works
              </button>
            </div>
          </div>

          {/* Right: Agent Cards */}
          <div className="relative">
            <span
              ref={labelRef}
              className="font-mono text-xs text-lime tracking-[0.08em] uppercase mb-4 block"
            >
              Autonomous Agents
            </span>

            <div ref={cardsRef} className="space-y-4">
              {agentCards.map((card, index) => (
                <div
                  key={index}
                  className="agent-card card-glass p-5 lg:p-6 relative overflow-hidden group hover:border-lime/30 transition-colors"
                >
                  <div className="accent-strip" />

                  <div className="flex items-start gap-4 pl-3">
                    <div className="w-10 h-10 rounded-full border border-lime/80 flex items-center justify-center flex-shrink-0">
                      <card.icon size={20} className="text-lime" />
                    </div>

                    <div>
                      <h3 className="font-display font-semibold text-lg text-gray-primary mb-1">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-secondary">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
