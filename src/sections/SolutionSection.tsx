import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, BarChart3, Heart, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SolutionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const featureCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0%-30%)
      scrollTl.fromTo(
        leftContentRef.current,
        { x: '-12vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        featureCardRef.current,
        { x: '14vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Capability lines
      const capabilityLines = featureCardRef.current?.querySelectorAll('.capability-line');
      if (capabilityLines) {
        scrollTl.fromTo(
          capabilityLines,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.035, ease: 'none' },
          0.08
        );
      }

      // Metrics
      const metricsRow = featureCardRef.current?.querySelector('.metrics-row');
      if (metricsRow) {
        scrollTl.fromTo(
          metricsRow,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.18
        );
      }

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl.fromTo(
        leftContentRef.current,
        { x: 0, opacity: 1 },
        { x: '-6vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        featureCardRef.current,
        { x: 0, opacity: 1 },
        { x: '6vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      if (capabilityLines) {
        scrollTl.fromTo(
          capabilityLines,
          { y: 0, opacity: 1 },
          { y: -10, opacity: 0, ease: 'power2.in', stagger: 0.02 },
          0.72
        );
      }

      if (metricsRow) {
        scrollTl.fromTo(
          metricsRow,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const capabilities = [
    {
      icon: Target,
      title: 'Adaptive recovery',
      description: 'Message, tone, and offer matched to cart value.',
    },
    {
      icon: BarChart3,
      title: 'Inventory signals',
      description: 'Dead-stock alerts, reorder drafts, pricing nudges.',
    },
    {
      icon: Heart,
      title: 'VIP retention',
      description: 'Detect high-LTV customers and respond instantly.',
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
      id="solution"
      className="section-pinned bg-dark flex items-center relative z-30"
    >
      <div className="w-full px-6 lg:px-[7vw]">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Content */}
          <div ref={leftContentRef}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,52px)] font-bold text-gray-primary leading-tight mb-6">
              Three agents. One system.{' '}
              <span className="text-lime">Always on.</span>
            </h2>

            <p className="text-base lg:text-lg text-gray-secondary leading-relaxed mb-8">
              They don&apos;t just report—they act. Personalized outreach,
              inventory signals, and VIP care that runs while you sleep.
            </p>

            <button
              onClick={() => scrollToSection('pricing')}
              className="btn-primary flex items-center gap-2"
            >
              Explore the agents
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Right: Feature Card */}
          <div ref={featureCardRef} className="card-glass p-6 lg:p-8 relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-lime" />

            <h3 className="font-display font-semibold text-xl text-gray-primary mb-6">
              What the agents handle
            </h3>

            <div className="space-y-5 mb-8">
              {capabilities.map((cap, index) => (
                <div
                  key={index}
                  className="capability-line flex items-start gap-4 group"
                >
                  <div className="w-9 h-9 rounded-lg border border-lime/60 flex items-center justify-center flex-shrink-0 group-hover:border-lime transition-colors">
                    <cap.icon size={18} className="text-lime" />
                  </div>

                  <div>
                    <p className="font-display font-semibold text-gray-primary mb-0.5">
                      {cap.title}
                    </p>
                    <p className="text-sm text-gray-secondary">
                      {cap.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="metrics-row grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
              <div>
                <p className="font-display text-3xl lg:text-4xl font-bold text-lime mb-1">
                  15–22%
                </p>
                <p className="text-sm text-gray-secondary">Cart recovery rate</p>
              </div>
              <div>
                <p className="font-display text-3xl lg:text-4xl font-bold text-lime mb-1">
                  34%
                </p>
                <p className="text-sm text-gray-secondary">VIP retention lift</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
