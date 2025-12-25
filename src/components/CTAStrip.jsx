import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const CTAStrip = () => {
  const { colors } = useTheme();
  
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-4xl mx-auto"
      >
        <div 
          className="rounded-2xl p-12 text-center backdrop-blur-sm border"
          style={{
            backgroundColor: `${colors.primary}20`,
            borderColor: `${colors.primary}50`,
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Have a project in mind?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how I can help you build it. Whether you need a new application, 
            feature development, or architectural improvements—I'm here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 group relative overflow-hidden backdrop-blur-md text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              style={{
                backgroundColor: colors.primary,
              }}
            >
              <span className="relative z-10">Let's Talk</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
            <button
              onClick={() => scrollToSection('#experience')}
              className="px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 backdrop-blur-md border text-gray-900 dark:text-white hover:scale-105 active:scale-95"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderColor: colors.primary + '50',
              }}
            >
              View My Work
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTAStrip;
