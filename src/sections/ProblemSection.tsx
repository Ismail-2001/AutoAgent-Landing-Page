import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, Megaphone, Users, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProblemSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const problemCardRef = useRef<HTMLDivElement>(null);
  const solutionChipRef = useRef<HTMLDivElement>(null);

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
        },
      });

      // ENTRANCE (0%-30%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: '-12vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        problemCardRef.current,
        { x: '14vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Pain rows staggered
      const painRows = problemCardRef.current?.querySelectorAll('.pain-row');
      if (painRows) {
        scrollTl.fromTo(
          painRows,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.04, ease: 'none' },
          0.05
        );
      }

      scrollTl.fromTo(
        solutionChipRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // SETTLE (30%-70%): Hold position - no animation needed

      // EXIT (70%-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-6vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        problemCardRef.current,
        { x: 0, opacity: 1 },
        { x: '6vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      if (painRows) {
        scrollTl.fromTo(
          painRows,
          { y: 0, opacity: 1 },
          { y: -12, opacity: 0, ease: 'power2.in', stagger: 0.02 },
          0.72
        );
      }

      scrollTl.fromTo(
        solutionChipRef.current,
        { y: 0, opacity: 1 },
        { y: '6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const painPoints = [
    {
      icon: ShoppingCart,
      stat: '67% of carts are abandoned',
      description: 'You paid for the traffic. Most leave without a nudge.',
    },
    {
      icon: Megaphone,
      stat: 'Generic blasts kill trust',
      description: 'One-size-fits-all discounts train customers to wait.',
    },
    {
      icon: Users,
      stat: 'Teams are stretched thin',
      description: 'Segmentation, copy, timing—too much to do manually.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-dark flex items-center relative z-20"
    >
      <div className="w-full px-6 lg:px-[7vw]">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Headline */}
          <div ref={headlineRef}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,52px)] font-bold text-gray-primary leading-tight mb-6">
              Cart abandonment isn&apos;t a funnel problem. It&apos;s a{' '}
              <span className="text-lime">timing problem.</span>
            </h2>

            <p className="text-base lg:text-lg text-gray-secondary leading-relaxed">
              Most stores recover &lt;10% of lost carts. Not because the product
              is wrong—because the follow-up is too slow and too generic.
            </p>
          </div>

          {/* Right: Problem Card */}
          <div
            ref={problemCardRef}
            className="card-glass p-6 lg:p-8 relative"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-lime" />

            <h3 className="font-display font-semibold text-xl text-gray-primary mb-6">
              What&apos;s actually bleeding revenue
            </h3>

            <div className="space-y-5">
              {painPoints.map((point, index) => (
                <div
                  key={index}
                  className="pain-row flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-full border border-lime/60 flex items-center justify-center flex-shrink-0 group-hover:border-lime transition-colors">
                    <point.icon size={20} className="text-lime" />
                  </div>

                  <div>
                    <p className="font-display font-semibold text-gray-primary mb-1">
                      {point.stat}
                    </p>
                    <p className="text-sm text-gray-secondary">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Solution Chip */}
        <div
          ref={solutionChipRef}
          className="mt-8 lg:mt-12 card-glass p-5 lg:p-6 relative max-w-2xl"
        >
          <div className="accent-strip" />

          <div className="flex items-center gap-4 pl-4">
            <div className="w-8 h-8 rounded-full bg-lime/10 flex items-center justify-center flex-shrink-0">
              <Zap size={16} className="text-lime" />
            </div>
            <p className="font-display font-medium text-gray-primary">
              AutoAgent responds in minutes—with{' '}
              <span className="text-lime">context, not templates.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
