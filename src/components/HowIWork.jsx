import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MacbookScroll } from './ui/macbook-scroll';
import { useTheme } from '../context/ThemeContext';

const HowIWork = () => {
  const { colors } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-i-work" className="hidden lg:block py-20 px-4 sm:px-6 lg:px-8 relative" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="max-w-7xl mx-auto">
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
              How I Work
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              A clear, transparent process tailored to your project needs
            </p>
          </motion.div>

          <MacbookScroll
            src="https://res.cloudinary.com/dgus6y6lm/image/upload/v1766701774/Gemini_Generated_Image_zcwlpwzcwlpwzcwl_b95x0u.png"
            title=""
            showGradient={true}
            badge={null}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HowIWork;
