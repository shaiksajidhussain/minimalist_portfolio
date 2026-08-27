import { useState } from 'react';
import { useRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { RevealHeading, useTextReveal } from '../hooks/useTextReveal.jsx';

const FAQ = () => {
  const { colors } = useTheme();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const scrollToSection = useSmoothScroll();
  const sectionRef = useRef(null);
  useTextReveal(sectionRef);

  const faqs = [
    {
      question: "What's your typical project timeline?",
      answer:
        'Project timelines vary based on complexity and scope. Simple websites take 2-4 weeks, SaaS platforms typically take 8-12 weeks. I always provide detailed timelines after understanding your requirements during the initial consultation.',
    },
    {
      question: 'Do you offer post-launch support?',
      answer:
        'Absolutely! I provide 30 days of free post-launch support including bug fixes and minor adjustments. After that, I offer maintenance packages starting from $500/month with priority support, updates, and optimization.',
    },
    {
      question: "What's your development process?",
      answer:
        "I follow an agile methodology: 1) Discovery & Planning, 2) Design mockups, 3) Development in sprints, 4) Regular testing, 5) Client feedback integration, 6) Deployment. You'll have bi-weekly updates and can request changes throughout.",
    },
    {
      question: 'Can you work with existing codebases?',
      answer:
        'Yes! I have extensive experience refactoring, optimizing, and extending existing projects. Whether you need bug fixes, feature additions, or performance improvements, I can jump into any tech stack quickly.',
    },
    {
      question: 'What payment terms do you offer?',
      answer:
        "I typically work with 50% upfront deposit and 50% on completion for fixed projects. For retainer-based work, it's monthly payment in advance. I accept all major payment methods including bank transfer, PayPal, and Stripe.",
    },
    {
      question: 'How do you ensure code quality?',
      answer:
        'I follow industry best practices: TypeScript for type safety, comprehensive testing, code reviews, documentation, and performance optimization. Every project gets a Lighthouse audit with 90+ scores across all metrics.',
    },
    {
      question: 'Can you help with deployment and DevOps?',
      answer:
        'Yes! I handle deployment on platforms like Vercel, AWS, DigitalOcean, and Heroku. I set up CI/CD pipelines, environment management, and monitoring to ensure smooth operations.',
    },
    {
      question: "What if I'm not happy with the result?",
      answer:
        'Client satisfaction is my priority. I include unlimited revisions during development. After launch, the first 30 days are covered with free support for any issues. For larger projects, I also offer performance guarantees.',
    },
  ];

  return (
    <section ref={sectionRef} id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <RevealHeading className="text-4xl sm:text-5xl font-semibold text-zinc-900 mb-4">
            Frequently Asked Questions
          </RevealHeading>
          <p className="text-lg text-zinc-400" data-reveal-copy>
            Everything you need to know about working with me
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = expandedIndex === index;
            return (
              <div key={faq.question} className="liquid-card overflow-hidden" data-reveal-block>
                <button
                  onClick={() => setExpandedIndex(isOpen ? null : index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4"
                >
                  <h3 className="text-base font-medium text-zinc-900">{faq.question}</h3>
                  <FiChevronDown
                    size={20}
                    className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    style={{ color: colors.primary }}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">{faq.answer}</div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center p-8 liquid-card" data-reveal-block>
          <h3 className="text-xl font-semibold text-zinc-900 mb-3">Still have questions?</h3>
          <p className="text-zinc-400 mb-6">Get in touch for a personalized discussion about your project.</p>
          <button
            onClick={() => scrollToSection('#contact')}
            className="inline-block px-7 py-3 rounded-full font-medium text-zinc-950"
            style={{ backgroundColor: colors.primary }}
          >
            Contact Me Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
