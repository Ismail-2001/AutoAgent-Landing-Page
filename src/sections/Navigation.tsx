import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Product', id: 'solution' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Docs', id: 'tech-stack' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-dark/90 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              className="font-display font-bold text-lg lg:text-xl text-gray-primary hover:text-lime transition-colors"
            >
              AutoAgent
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm text-gray-secondary hover:text-gray-primary transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <button
                onClick={() => scrollToSection('pricing')}
                className="btn-primary text-sm py-2.5 px-5"
              >
                Book a demo
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-dark/98 backdrop-blur-lg md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-2xl font-display text-gray-primary hover:text-lime transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('pricing')}
              className="btn-primary text-lg mt-4"
            >
              Get started
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
