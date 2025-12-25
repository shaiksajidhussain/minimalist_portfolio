import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiSearch, FiLayout, FiCode, FiCheckCircle, FiSend } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const HowIWork = () => {
  const { colors } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      number: '01',
      icon: FiSearch,
      title: 'Discovery & Requirements',
      description: 'Understand your goals, users, scope, and vision'
    },
    {
      number: '02',
      icon: FiLayout,
      title: 'Planning & Architecture',
      description: 'Define tech stack, timelines, and development milestones'
    },
    {
      number: '03',
      icon: FiCode,
      title: 'Design & Development',
      description: 'Build clean UI and scalable backend architecture'
    },
    {
      number: '04',
      icon: FiCheckCircle,
      title: 'Testing & Optimization',
      description: 'Performance audits, security checks, and refinements'
    },
    {
      number: '05',
      icon: FiSend,
      title: 'Delivery & Support',
      description: 'Deployment, documentation, and post-launch support'
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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section id="how-i-work" className="py-20 px-4 sm:px-6 lg:px-8 relative">
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
              How I Work
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              A clear process built on communication and transparency
            </p>
          </motion.div>

          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex gap-6 relative"
                >
                  {/* Timeline line */}
                  {index < steps.length - 1 && (
                    <div 
                      className="absolute left-12 top-24 w-0.5 h-16"
                      style={{
                        background: `linear-gradient(to bottom, ${colors.primary}, ${colors.primary}30)`,
                      }}
                    />
                  )}

                  {/* Step number and icon */}
                  <div className="flex-shrink-0 relative z-10">
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-24 h-24 rounded-full flex items-center justify-center border"
                        style={{
                          backgroundColor: `${colors.primary}20`,
                          borderColor: `${colors.primary}40`,
                        }}
                      >
                        <Icon 
                          className="w-10 h-10"
                          style={{ color: colors.primary }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-6">
                    <div 
                      className="bg-white dark:bg-zinc-800 rounded-lg p-6 border"
                      style={{
                        borderColor: `${colors.primary}40`,
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span 
                          className="text-3xl font-bold"
                          style={{ color: colors.primary }}
                        >
                          {step.number}
                        </span>
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {step.description}
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

export default HowIWork;
