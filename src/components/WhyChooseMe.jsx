import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Carousel, Card } from './ui/apple-cards-carousel';
import { useTheme } from '../context/ThemeContext';

const WhyChooseMe = () => {
  const { colors } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const reasons = [
    {
      category: "Experience",
      title: '4.5+ Years Experience',
      description: 'Real-world SaaS & production experience with proven track record',
    },
    {
      category: "Performance",
      title: 'Performance Focused',
      description: 'Lighthouse audits, SEO optimization, and speed-critical development',
    },
    {
      category: "Code Quality",
      title: 'Clean & Scalable Code',
      description: 'Maintainable architecture built for growth and future improvements',
    },
    {
      category: "Communication",
      title: 'Strong Communication',
      description: 'Fast response times and transparent project updates throughout',
    },
    {
      category: "Features",
      title: 'Advanced Features',
      description: 'Payment integrations, real-time systems, and scalable backends',
    }
  ];

  const cards = reasons.map((reason, index) => (
    <Card key={index} card={reason} index={index} primaryColor={colors.primary} />
  ));

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
    <section id="why-choose-me" className="py-20 px-4 sm:px-6 lg:px-8 relative" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Me
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              What sets me apart in the market
            </p>
          </motion.div>

          <Carousel items={cards} />
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseMe;