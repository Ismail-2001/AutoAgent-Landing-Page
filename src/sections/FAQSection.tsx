import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FAQSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

      // FAQ items
      const items = faqRef.current?.querySelectorAll('.faq-item');
      if (items) {
        gsap.fromTo(
          items,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            scrollTrigger: {
              trigger: faqRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      question: 'How is this different from Klaviyo/Mailchimp?',
      answer:
        "Klaviyo sends what you tell it to send. AutoAgent decides WHAT to send based on real-time customer behavior, cart value, and purchase history. It's like having a strategist + copywriter + email manager in one, working 24/7.",
    },
    {
      question: 'What if the AI makes a mistake?',
      answer:
        "Week 1-2: You approve everything. Week 3-4: We set safety rules (max discount %, approval thresholds). Plus, I personally monitor all deployments. In 6 months of operation, we've had zero incidents that affected revenue.",
    },
    {
      question: 'Do I need technical knowledge?',
      answer:
        "No. If you can use Shopify's dashboard, you can use AutoAgent. Setup is done by me personally. You just need to connect your store (2 clicks) and answer a few questions about your brand voice.",
    },
    {
      question: 'What platforms do you support?',
      answer:
        'Currently: Shopify and WooCommerce. Integrations with BigCommerce and Magento coming Q2 2025.',
    },
    {
      question: 'How long until I see results?',
      answer:
        'Most clients see their first recovered cart within 48 hours of going live. Full ROI typically hits by Week 3.',
    },
    {
      question: 'Can I cancel anytime?',
      answer:
        'Pilot Program: 90-day commitment with money-back guarantee. Growth System: Monthly, cancel anytime with 30 days notice. No hard feelings.',
    },
    {
      question: 'Is my data secure?',
      answer:
        "Yes. We're SOC 2 Type II compliant, use 256-bit encryption, and offer zero data retention options. Your data never trains our models or gets shared.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-dark py-20 lg:py-32 z-[90]"
    >
      <div className="w-full px-6 lg:px-[7vw]">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,52px)] font-bold text-gray-primary mb-4">
            Common <span className="text-lime">questions</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div ref={faqRef} className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item card-glass overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-display font-medium text-gray-primary pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-lime flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-5">
                  <p className="text-gray-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
