import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Store, DollarSign, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);

  const [stats, setStats] = useState({ stores: 0, recovered: 0, rate: 0 });

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

      // Testimonial cards
      const cards = cardsRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: '6vh', opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.12,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Impact bar
      gsap.fromTo(
        impactRef.current,
        { y: '4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: impactRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats counter animation
      ScrollTrigger.create({
        trigger: impactRef.current,
        start: 'top 85%',
        onEnter: () => {
          // Animate stats
          gsap.to({}, {
            duration: 2,
            onUpdate: function() {
              const progress = this.progress();
              setStats({
                stores: Math.round(47 * progress),
                recovered: Math.round(127000 * progress),
                rate: Math.round(24 * progress),
              });
            },
          });
        },
        once: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      quote:
        'Recovered $1,847 in the first week. The adaptive strategy is surgical—high-value carts get personalized treatment automatically.',
      author: 'Sarah Chen',
      company: 'LuxeHome',
      metric: '$847K',
      metricLabel: 'annual revenue',
    },
    {
      quote:
        'Inventory alerts saved us from a $4K overstock. We reordered exactly what we needed, exactly when we needed it.',
      author: 'Diego Ramos',
      company: 'Forma Athletics',
      metric: '$1.2M',
      metricLabel: 'annual revenue',
    },
    {
      quote:
        'VIP detection is unfair—in the best way. Our best customers feel seen, and retention is up double digits.',
      author: 'Priya N.',
      company: 'Bloom & Co',
      metric: '$620K',
      metricLabel: 'annual revenue',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-dark py-20 lg:py-32 z-[70]"
    >
      <div className="w-full px-6 lg:px-[7vw]">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,52px)] font-bold text-gray-primary mb-4">
            Trusted by operators who{' '}
            <span className="text-lime">measure everything</span>
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-5 lg:gap-6 mb-10 lg:mb-12"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card card-glass p-6 relative group hover:border-lime/20 transition-colors"
            >
              <Quote
                size={24}
                className="text-lime/40 mb-4 group-hover:text-lime/60 transition-colors"
              />

              <p className="text-gray-primary leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div>
                  <p className="font-display font-semibold text-gray-primary">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-secondary">
                    {testimonial.company}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm text-lime">
                    {testimonial.metric}
                  </p>
                  <p className="text-xs text-gray-secondary">
                    {testimonial.metricLabel}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Bar */}
        <div
          ref={impactRef}
          className="card-glass p-6 lg:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-lime" />

          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Store size={18} className="text-lime" />
                <p className="font-display text-3xl lg:text-4xl font-bold text-lime">
                  {stats.stores}
                </p>
              </div>
              <p className="text-sm text-gray-secondary">stores deployed</p>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign size={18} className="text-lime" />
                <p className="font-display text-3xl lg:text-4xl font-bold text-lime">
                  ${stats.recovered.toLocaleString()}+
                </p>
              </div>
              <p className="text-sm text-gray-secondary">recovered this month</p>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp size={18} className="text-lime" />
                <p className="font-display text-3xl lg:text-4xl font-bold text-lime">
                  {stats.rate}%
                </p>
              </div>
              <p className="text-sm text-gray-secondary">avg recovery rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
