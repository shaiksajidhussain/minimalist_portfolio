import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiCheck } from 'react-icons/fi';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      title: 'Web App Development',
      description: 'React / Next.js applications with modern UI/UX',
    },
    {
      title: 'Full-Stack Development',
      description: 'MERN / PERN stack solutions from frontend to backend',
    },
    {
      title: 'SaaS Product Development',
      description: 'Scalable SaaS platforms with subscription management',
    },
    {
      title: 'API Development & Integration',
      description: 'RESTful APIs, third-party integrations, and microservices',
    },
    {
      title: 'UI Implementation from Figma',
      description: 'Pixel-perfect designs converted to responsive code',
    },
    {
      title: 'Performance Optimization',
      description: 'Speed optimization, code splitting, and lazy loading',
    },
    {
      title: 'Bug Fixing & Maintenance',
      description: 'Debugging, refactoring, and ongoing support',
    },
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
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center"
          >
            Services
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg"
          >
            What problems I solve for clients
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <FiCheck className="text-green-500 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

