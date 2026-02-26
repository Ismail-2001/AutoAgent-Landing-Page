import { Linkedin, Twitter, Mail, Cpu, Shield, Lock } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const productLinks = [
    { label: 'How it works', id: 'how-it-works' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Product', id: 'solution' },
    { label: 'Tech stack', id: 'tech-stack' },
  ];

  const companyLinks = [
    { label: 'About', href: '#', onClick: () => scrollToSection('founder-story') },
    {
      label: 'GitHub',
      href: 'https://github.com/Ismail-2001/E-commerce-Automation-Agent',
      external: true,
    },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ];

  const contactLinks = [
    { label: 'ismail@autoagent.ai', href: 'mailto:ismail@autoagent.ai', icon: Mail },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/ismail-sajid', icon: Linkedin, external: true },
    { label: 'Twitter', href: 'https://twitter.com/ismailsajid', icon: Twitter, external: true },
  ];

  return (
    <footer className="relative bg-dark border-t border-white/5 z-[120]">
      <div className="w-full px-6 lg:px-[7vw] py-12 lg:py-16">
        <div className="grid md:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a
              href="#"
              className="font-display font-bold text-xl text-gray-primary hover:text-lime transition-colors mb-4 block"
            >
              AutoAgent
            </a>
            <p className="text-sm text-gray-secondary leading-relaxed">
              Your digital workforce for e-commerce operations. Recover carts,
              manage inventory, retain VIPs—on autopilot.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-display font-semibold text-gray-primary mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-gray-secondary hover:text-gray-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-gray-primary mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    onClick={link.onClick}
                    className="text-sm text-gray-secondary hover:text-gray-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-gray-primary mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              {contactLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-gray-secondary hover:text-gray-primary transition-colors flex items-center gap-2"
                  >
                    <link.icon size={14} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-6 border-t border-white/5 mb-6">
          <div className="flex items-center gap-2 text-xs text-gray-secondary">
            <Cpu size={14} className="text-lime" />
            <span>Built with DeepSeek V3</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-secondary">
            <Shield size={14} className="text-lime" />
            <span>SOC 2 Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-secondary">
            <Lock size={14} className="text-lime" />
            <span>GDPR Compliant</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs text-gray-secondary">
            © {new Date().getFullYear()} AutoAgent by Ismail Sajid. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
