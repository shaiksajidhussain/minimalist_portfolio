import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiClock, FiGlobe, FiMail } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const Availability = () => {
  const { colors } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const details = [
    {
      icon: FiGlobe,
      title: 'Location',
      description: 'Available for Freelance & Remote Projects'
    },
    {
      icon: FiClock,
      title: 'Time Zone',
      description: 'IST (UTC +5:30) - Flexible overlap'
    },
    {
      icon: FiMail,
      title: 'Response Time',
      description: 'Within 24 hours'
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
    <section id="availability" className="py-20 px-4 sm:px-6 lg:px-8 relative">
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
              Availability
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Ready to start your next project
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {details.map((detail, index) => {
              const Icon = detail.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center border"
                      style={{
                        backgroundColor: `${colors.primary}20`,
                        borderColor: `${colors.primary}40`,
                      }}
                    >
                      <Icon 
                        className="w-8 h-8"
                        style={{ color: colors.primary }}
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {detail.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {detail.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-12 rounded-lg p-8 border text-center"
            style={{
              backgroundColor: `${colors.primary}15`,
              borderColor: `${colors.primary}40`,
            }}
          >
            <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
              No project is too big or too small. Let's discuss your vision.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Availability;
