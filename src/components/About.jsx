import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center"
          >
            About Me
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            <p>
              I'm a passionate Full Stack Developer with 2.5+ years of experience building
              scalable web applications and mobile apps. I specialize in React, React Native, Node.js, 
              and modern web technologies that deliver exceptional user experiences across web and mobile platforms.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Experience
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• 2.5+ years as Full Stack Developer</li>
                  <li>• Worked on SaaS platforms, dashboards, LMS</li>
                  <li>• Corporate websites & web applications</li>
                  <li>• React Native mobile app development</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Work Style
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Focus on performance & clean UI</li>
                  <li>• Scalable architecture</li>
                  <li>• Cross-platform development (Web & Mobile)</li>
                  <li>• Remote & freelance collaboration</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

