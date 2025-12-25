import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiClock, FiDollarSign, FiCalendar } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const PricingEngagement = () => {
  const { colors } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const models = [
    {
      icon: FiClock,
      title: 'Hourly',
      description: 'Best for ongoing work & improvements',
      details: 'Flexible engagement for maintenance, feature updates, and consultations'
    },
    {
      icon: FiDollarSign,
      title: 'Fixed Price',
      description: 'Best for clearly defined projects',
      details: 'Complete project delivery with defined scope, timeline, and deliverables'
    },
    {
      icon: FiCalendar,
      title: 'Monthly Retainer',
      description: 'Long-term support & development',
      details: 'Dedicated support, priority access, and ongoing development work'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="engagement-models" className="py-20 px-4 sm:px-6 lg:px-8 relative">
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
              Engagement Models
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Flexible pricing based on your project scope and needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {models.map((model, index) => {
              const Icon = model.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative group"
                >
                  <div 
                    className="absolute inset-0 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(to bottom right, ${colors.primary}30, transparent)`,
                    }}
                  />
                  <div 
                    className="relative bg-white dark:bg-zinc-800 rounded-lg p-8 border transition-colors h-full"
                    style={{
                      borderColor: `${colors.primary}40`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${colors.primary}80`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${colors.primary}40`;
                    }}
                  >
                    <div className="flex justify-center mb-6">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: `${colors.primary}20`,
                        }}
                      >
                        <Icon 
                          className="w-8 h-8"
                          style={{ color: colors.primary }}
                        />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-2">
                      {model.title}
                    </h3>
                    <p 
                      className="text-center font-medium mb-4"
                      style={{ color: colors.primary }}
                    >
                      {model.description}
                    </p>
                    <p className="text-center text-gray-600 dark:text-gray-400">
                      {model.details}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Let's discuss which model works best for your project.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingEngagement;
