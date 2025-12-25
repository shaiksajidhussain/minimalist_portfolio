import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiTarget, FiUsers, FiTrendingUp, FiAward } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const WhoIWorkWith = () => {
  const { colors } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const clients = [
    {
      icon: FiTarget,
      title: 'Startups & Founders',
      description: 'MVP development with fast execution and scalable architecture'
    },
    {
      icon: FiUsers,
      title: 'Small-Medium Businesses',
      description: 'Custom solutions to streamline operations and growth'
    },
    {
      icon: FiTrendingUp,
      title: 'SaaS Companies',
      description: 'Production-grade applications with performance optimization'
    },
    {
      icon: FiAward,
      title: 'Agencies',
      description: 'White-label support and extended team capabilities'
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
    <section id="who-i-work-with" className="py-20 px-4 sm:px-6 lg:px-8 relative">
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
              Who I Work With
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Ideal for founders who need fast execution, clean code, and scalable systems
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {clients.map((client, index) => {
              const Icon = client.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-zinc-800 rounded-lg p-8 border hover:shadow-lg dark:hover:shadow-lg/20 transition-shadow"
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
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Icon 
                        className="w-8 h-8 mt-1"
                        style={{ color: colors.primary }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {client.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {client.description}
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

export default WhoIWorkWith;
