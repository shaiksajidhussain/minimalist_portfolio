import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { theme, colors } = useTheme();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const faqs = [
    {
      question: "What's your typical project timeline?",
      answer: "Project timelines vary based on complexity and scope. Simple websites take 2-4 weeks, SaaS platforms typically take 8-12 weeks. I always provide detailed timelines after understanding your requirements during the initial consultation."
    },
    {
      question: "Do you offer post-launch support?",
      answer: "Absolutely! I provide 30 days of free post-launch support including bug fixes and minor adjustments. After that, I offer maintenance packages starting from $500/month with priority support, updates, and optimization."
    },
    {
      question: "What's your development process?",
      answer: "I follow an agile methodology: 1) Discovery & Planning, 2) Design mockups, 3) Development in sprints, 4) Regular testing, 5) Client feedback integration, 6) Deployment. You'll have bi-weekly updates and can request changes throughout."
    },
    {
      question: "Can you work with existing codebases?",
      answer: "Yes! I have extensive experience refactoring, optimizing, and extending existing projects. Whether you need bug fixes, feature additions, or performance improvements, I can jump into any tech stack quickly."
    },
    {
      question: "What payment terms do you offer?",
      answer: "I typically work with 50% upfront deposit and 50% on completion for fixed projects. For retainer-based work, it's monthly payment in advance. I accept all major payment methods including bank transfer, PayPal, and Stripe."
    },
    {
      question: "How do you ensure code quality?",
      answer: "I follow industry best practices: TypeScript for type safety, comprehensive testing, code reviews, documentation, and performance optimization. Every project gets a Lighthouse audit with 90+ scores across all metrics."
    },
    {
      question: "Can you help with deployment and DevOps?",
      answer: "Yes! I handle deployment on platforms like Vercel, AWS, DigitalOcean, and Heroku. I set up CI/CD pipelines, environment management, and monitoring to ensure smooth operations."
    },
    {
      question: "What if I'm not happy with the result?",
      answer: "Client satisfaction is my priority. I include unlimited revisions during development. After launch, the first 30 days are covered with free support for any issues. For larger projects, I also offer performance guarantees."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="faq"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-color)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            scale,
            opacity,
            y,
          }}
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl sm:text-5xl font-bold mb-4"
              style={{
                color: theme === 'dark' ? '#ffffff' : '#1f2937',
              }}
            >
              Frequently Asked Questions
            </h2>
            <p
              className="text-lg"
              style={{
                color: theme === 'dark' ? '#d1d5db' : '#6b7280',
              }}
            >
              Everything you need to know about working with me
            </p>
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            className="space-y-4"
            variants={containerVariants}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <motion.button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full text-left p-6 rounded-xl transition-all duration-300"
                  style={{
                    backgroundColor: theme === 'dark' ? '#27272a' : '#f9fafb',
                    border: `2px solid ${theme === 'dark' ? '#3f3f46' : '#e5e7eb'}`,
                  }}
                  whileHover={{
                    borderColor: colors.primary,
                    backgroundColor: theme === 'dark' ? '#3f3f46' : '#f3f4f6',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <h3
                      className="text-lg font-semibold"
                      style={{
                        color: theme === 'dark' ? '#ffffff' : '#1f2937',
                      }}
                    >
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronDown
                        size={24}
                        style={{ color: colors.primary }}
                      />
                    </motion.div>
                  </div>
                </motion.button>

                {/* Answer */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expandedIndex === index ? 'auto' : 0,
                    opacity: expandedIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className="px-6 py-4 text-base"
                    style={{
                      color: theme === 'dark' ? '#d1d5db' : '#4b5563',
                      borderLeft: `4px solid ${colors.primary}`,
                    }}
                  >
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center p-8 rounded-2xl"
            style={{
              backgroundColor: theme === 'dark' ? '#27272a' : '#f9fafb',
              border: `2px solid ${theme === 'dark' ? '#3f3f46' : '#e5e7eb'}`,
            }}
          >
            <h3
              className="text-xl font-bold mb-3"
              style={{
                color: theme === 'dark' ? '#ffffff' : '#1f2937',
              }}
            >
              Still have questions?
            </h3>
            <p
              className="text-base mb-6"
              style={{
                color: theme === 'dark' ? '#d1d5db' : '#6b7280',
              }}
            >
              Get in touch with me directly for a personalized discussion about your project.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition-all"
              style={{
                backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.dark})`,
                boxShadow: `0 0 20px ${colors.primary}80`,
              }}
            >
              Contact Me Today
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
