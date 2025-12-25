import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiZap, FiTrendingUp, FiCode, FiMessageSquare, FiCpu } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const WhyChooseMe = () => {
  const { colors } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const reasons = [
    {
      icon: FiTrendingUp,
      title: '2.5+ Years Experience',
      description: 'Real-world SaaS & production experience with proven track record'
    },
    {
      icon: FiZap,
      title: 'Performance Focused',
      description: 'Lighthouse audits, SEO optimization, and speed-critical development'
    },
    {
      icon: FiCode,
      title: 'Clean & Scalable Code',
      description: 'Maintainable architecture built for growth and future improvements'
    },
    {
      icon: FiMessageSquare,
      title: 'Strong Communication',
      description: 'Fast response times and transparent project updates throughout'
    },
    {
      icon: FiCpu,
      title: 'Advanced Features',
      description: 'Payment integrations, real-time systems, and scalable backends'
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
    <section id="why-choose-me" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Me
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              What sets me apart in the market
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-gray-200 dark:border-zinc-700 hover:shadow-lg dark:hover:shadow-lg/20 transition-all"
                  style={{
                    borderColor: `${colors.primary}80`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${colors.primary}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${colors.primary}80`;
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 pt-1">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: `${colors.primary}20`,
                        }}
                      >
                        <Icon 
                          className="w-6 h-6"
                          style={{ color: colors.primary }}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {reason.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseMe;
