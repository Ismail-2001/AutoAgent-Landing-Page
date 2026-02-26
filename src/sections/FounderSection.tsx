import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Linkedin, Twitter, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FounderSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Content
      gsap.fromTo(
        contentRef.current,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image
      gsap.fromTo(
        imageRef.current,
        { x: '8vw', opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-dark py-20 lg:py-32 z-[100]"
    >
      <div className="w-full px-6 lg:px-[7vw]">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Content */}
          <div ref={contentRef}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,52px)] font-bold text-gray-primary leading-tight mb-6">
              Built by someone who{' '}
              <span className="text-lime">gets it</span>
            </h2>

            <div className="space-y-4 text-gray-secondary leading-relaxed mb-8">
              <p>
                Hi, I&apos;m <span className="text-gray-primary font-medium">Ismail Sajid</span>{' '}
                — Developer &amp; Architect behind AutoAgent.
              </p>

              <p>
                I built this because I was frustrated watching e-commerce
                founders drown in operational chaos while AI was being used for
                parlor tricks.
              </p>

              <p>
                After working with 40+ e-commerce stores, I saw the pattern:
                everyone was losing money to the same 3 problems — cart
                abandonment, dead inventory, and treating VIP customers like
                everyone else.
              </p>

              <p>
                Traditional solutions either required massive manual work or
                were just prettier dashboards. I wanted something that actually{' '}
                <span className="text-lime">WORKED</span> — autonomous agents
                that make decisions and take actions.
              </p>

              <p>
                AutoAgent is that solution. It&apos;s not perfect (yet), but
                it&apos;s already recovering $1,000+ daily for stores like yours.
              </p>
            </div>

            <p className="font-display text-lg text-gray-primary mb-6">
              If you&apos;re serious about scaling without hiring 5 more people,
              let&apos;s talk.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('final-cta')}
                className="btn-primary flex items-center gap-2"
              >
                Book a 15-min call
                <ArrowRight size={18} />
              </button>

              <div className="flex items-center gap-3">
                <a
                  href="mailto:ismail@autoagent.ai"
                  className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-gray-secondary hover:text-lime hover:border-lime/40 transition-colors"
                >
                  <Mail size={18} />
                </a>
                <a
                  href="https://linkedin.com/in/ismail-sajid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-gray-secondary hover:text-lime hover:border-lime/40 transition-colors"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://twitter.com/ismailsajid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-gray-secondary hover:text-lime hover:border-lime/40 transition-colors"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-sm text-gray-secondary">
                — Ismail
              </p>
            </div>
          </div>

          {/* Right: Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/founder-photo.jpg"
                alt="Ismail Sajid - Founder of AutoAgent"
                className="w-full h-auto object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 card-glass p-4 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-lime/10 flex items-center justify-center">
                  <span className="font-mono text-lime font-bold">40+</span>
                </div>
                <div>
                  <p className="text-sm text-gray-primary">Stores served</p>
                  <p className="text-xs text-gray-secondary">Since 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
