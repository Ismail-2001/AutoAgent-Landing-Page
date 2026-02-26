import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Cpu, Code2, FileType, Palette, Shapes, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TechStackSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const techCardRef = useRef<HTMLDivElement>(null);

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
        leftContentRef.current,
        { x: '-12vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        techCardRef.current,
        { x: '14vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Tags staggered
      const tags = techCardRef.current?.querySelectorAll('.tech-tag');
      if (tags) {
        scrollTl.fromTo(
          tags,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.08
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
        techCardRef.current,
        { x: 0, opacity: 1 },
        { x: '6vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      if (tags) {
        scrollTl.fromTo(
          tags,
          { y: 0, opacity: 1 },
          { y: -8, opacity: 0, ease: 'power2.in', stagger: 0.02 },
          0.72
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const techStack = [
    { name: 'DeepSeek V3', icon: Cpu },
    { name: 'React + Vite', icon: Code2 },
    { name: 'TypeScript', icon: FileType },
    { name: 'Tailwind CSS', icon: Palette },
    { name: 'Lucide Icons', icon: Shapes },
    { name: 'Recharts', icon: BarChart3 },
  ];

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="section-pinned bg-dark flex items-center relative z-[60]"
    >
      <div className="w-full px-6 lg:px-[7vw]">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Content */}
          <div ref={leftContentRef}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,52px)] font-bold text-gray-primary leading-tight mb-6">
              Built on <span className="text-lime">modern</span> infrastructure
            </h2>

            <p className="text-base lg:text-lg text-gray-secondary leading-relaxed mb-8">
              Fast, secure, and designed to stay reliable as you scale—without
              bloated dependencies.
            </p>

            <a
              href="https://github.com/Ismail-2001/E-commerce-Automation-Agent"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2"
            >
              Read the docs
              <ArrowRight size={18} />
            </a>
          </div>

          {/* Right: Tech Stack Card */}
          <div ref={techCardRef} className="card-glass p-6 lg:p-8 relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-lime" />

            <h3 className="font-display font-semibold text-xl text-gray-primary mb-6">
              Tech stack
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="tech-tag flex items-center gap-3 p-3 rounded-xl border border-lime/30 bg-lime/5 hover:border-lime/60 transition-colors"
                >
                  <tech.icon size={18} className="text-lime" />
                  <span className="text-sm font-medium text-gray-primary">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/5">
              <p className="text-sm text-gray-secondary">
                <span className="text-lime font-medium">
                  Custom agentic services
                </span>{' '}
                • Not just chatbots
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
