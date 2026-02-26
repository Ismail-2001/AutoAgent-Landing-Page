import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import ProblemSection from './sections/ProblemSection';
import SolutionSection from './sections/SolutionSection';
import DashboardSection from './sections/DashboardSection';
import HowItWorksSection from './sections/HowItWorksSection';
import TechStackSection from './sections/TechStackSection';
import TestimonialsSection from './sections/TestimonialsSection';
import PricingSection from './sections/PricingSection';
import FAQSection from './sections/FAQSection';
import FounderSection from './sections/FounderSection';
import FinalCTASection from './sections/FinalCTASection';
import Footer from './sections/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Global snap configuration for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-dark text-gray-primary min-h-screen">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative">
        {/* Section 1: Hero - pin: true */}
        <HeroSection />
        
        {/* Section 2: Problem - pin: true */}
        <ProblemSection />
        
        {/* Section 3: Solution - pin: true */}
        <SolutionSection />
        
        {/* Section 4: Dashboard - pin: true */}
        <DashboardSection />
        
        {/* Section 5: How It Works - pin: false */}
        <HowItWorksSection />
        
        {/* Section 6: Tech Stack - pin: true */}
        <TechStackSection />
        
        {/* Section 7: Testimonials - pin: false */}
        <TestimonialsSection />
        
        {/* Section 8: Pricing - pin: false */}
        <PricingSection />
        
        {/* Section 9: FAQ - pin: false */}
        <FAQSection />
        
        {/* Section 10: Founder Story - pin: false */}
        <FounderSection />
        
        {/* Section 11: Final CTA - pin: false */}
        <FinalCTASection />
        
        {/* Section 12: Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default App;
