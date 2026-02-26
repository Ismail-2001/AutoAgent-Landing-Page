import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket, Check, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FinalCTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Content
      gsap.fromTo(
        contentRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // CTAs
      gsap.fromTo(
        ctasRef.current,
        { y: 16, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      className="relative bg-dark py-20 lg:py-32 z-[110]"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(184, 255, 44, 0.06) 0%, transparent 60%)',
        }}
      />

      <div className="w-full px-6 lg:px-[7vw] relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Content */}
          <div ref={contentRef}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[clamp(40px,4.5vw,64px)] font-bold text-gray-primary leading-tight mb-4">
              Ready to deploy your{' '}
              <span className="text-lime">digital workforce?</span>
            </h2>

            <p className="text-lg lg:text-xl text-gray-secondary mb-8">
              Join 47 stores recovering revenue on autopilot.
            </p>
          </div>

          {/* CTAs */}
          <div ref={ctasRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="https://calendly.com/ismail-autoagent/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
            >
              <Calendar size={20} />
              Book a demo
            </a>
            <a
              href="https://calendly.com/ismail-autoagent/pilot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2 text-lg px-8 py-4"
            >
              <Rocket size={20} />
              Start pilot program
            </a>
          </div>

          {/* Risk reversal */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-secondary">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-lime" />
              <span>90-day guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-lime" />
              <span>Setup in 14 days</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-lime" />
              <span>Cancel anytime</span>
            </div>
          </div>

          {/* Urgency */}
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime/10 border border-lime/20">
            <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="text-sm text-lime font-mono">
              Next cohort starts March 1st • 1 spot remaining
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
