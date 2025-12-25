import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { TextGenerateEffect } from './ui/text-generate-effect';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { colors } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const words = `I'm a passionate Full Stack Developer with 2.5+ years of experience building scalable web applications and mobile apps. I specialize in React, React Native, Node.js, and modern web technologies that deliver exceptional user experiences across web and mobile platforms.`;

  const experienceText = `2.5+ years as Full Stack Developer. Worked on SaaS platforms, dashboards, LMS, corporate websites & web applications. React Native mobile app development.`;

  const workStyleText = `Focus on performance & clean UI with scalable architecture. Cross-platform development for Web & Mobile. Remote & freelance collaboration expertise.`;

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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-color)' }}>
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
            <TextGenerateEffect 
              words={words}
              duration={0.5}
              filter={true}
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
            />

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Experience
                </h3>
                <TextGenerateEffect 
                  words={experienceText}
                  duration={0.4}
                  filter={true}
                  className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Work Style
                </h3>
                <TextGenerateEffect 
                  words={workStyleText}
                  duration={0.4}
                  filter={true}
                  className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

