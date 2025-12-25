import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { HoverEffect } from './ui/card-hover-effect';
import { useTheme } from '../context/ThemeContext';

const WhoIWorkWith = () => {
  const { colors } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const clients = [
    {
      title: 'Startups & Founders',
      description: 'MVP development with fast execution and scalable architecture for your next big idea.',
      link: '#',
    },
    {
      title: 'Small-Medium Businesses',
      description: 'Custom solutions to streamline operations, improve efficiency, and drive sustainable growth.',
      link: '#',
    },
    {
      title: 'SaaS Companies',
      description: 'Production-grade applications with performance optimization and enterprise-level reliability.',
      link: '#',
    },
    {
      title: 'Agencies',
      description: 'White-label support and extended team capabilities to scale your project delivery.',
      link: '#',
    },
    {
      title: 'E-Commerce Businesses',
      description: 'Full-stack e-commerce solutions with payment integration and inventory management.',
      link: '#',
    },
    {
      title: 'Digital Agencies',
      description: 'Web development and design implementation for your agency\'s client projects.',
      link: '#',
    }
  ];

  return (
    <section id="who-i-work-with" className="py-20 px-4 sm:px-6 lg:px-8 relative" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Who I Work With
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Ideal for founders who need fast execution, clean code, and scalable systems
            </p>
          </motion.div>

          <HoverEffect items={clients} />
        </motion.div>
      </div>
    </section>
  );
};

export default WhoIWorkWith;
