import { motion } from 'framer-motion';
import { FiArrowRight, FiChevronDown, FiEye } from 'react-icons/fi';
import BlurText from './BlurText';
import CountUp from './CountUp';
import SplitText from './SplitText';

const Hero = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 overflow-hidden"
    >
      {/* 3D Geometric Shapes Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Light Source */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-orange-500/30 rounded-full blur-3xl animate-pulse" />
        
        {/* Cube 1 - Large center */}
        <motion.div
          initial={{ opacity: 0, rotateX: -20, rotateY: 20 }}
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            rotateX: [-20, -25, -20],
            rotateY: [20, 25, 20],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64"
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              transform: 'rotateX(45deg) rotateY(-45deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Front face */}
            <div 
              className="absolute w-full h-full bg-zinc-700/40 dark:bg-zinc-600/40 border border-zinc-600/50 dark:border-zinc-500/50"
              style={{
                transform: 'translateZ(64px)',
                boxShadow: '0 0 30px rgba(249, 115, 22, 0.2)',
              }}
            />
            {/* Top face */}
            <div 
              className="absolute w-full h-full bg-orange-500/20 dark:bg-orange-500/30 border border-orange-500/30"
              style={{
                transform: 'rotateX(90deg) translateZ(64px)',
              }}
            />
            {/* Right face */}
            <div 
              className="absolute w-full h-full bg-zinc-800/40 dark:bg-zinc-700/40 border border-zinc-600/50"
              style={{
                transform: 'rotateY(90deg) translateZ(64px)',
              }}
            />
          </div>
        </motion.div>

        {/* Cube 2 - Top right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            y: [0, -20, 0],
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-32 right-32 w-32 h-32"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              transform: 'rotateX(30deg) rotateY(-30deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div 
              className="absolute w-full h-full bg-zinc-700/30 dark:bg-zinc-600/30 border border-zinc-600/40"
              style={{
                transform: 'translateZ(32px)',
                boxShadow: '0 0 20px rgba(249, 115, 22, 0.15)',
              }}
            />
            <div 
              className="absolute w-full h-full bg-orange-500/15 dark:bg-orange-500/25 border border-orange-500/20"
              style={{
                transform: 'rotateX(90deg) translateZ(32px)',
              }}
            />
            <div 
              className="absolute w-full h-full bg-zinc-800/30 dark:bg-zinc-700/30 border border-zinc-600/40"
              style={{
                transform: 'rotateY(90deg) translateZ(32px)',
              }}
            />
          </div>
        </motion.div>

        {/* Cube 3 - Bottom left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.2, 0.35, 0.2],
            x: [0, 15, 0],
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-32 left-32 w-40 h-40"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              transform: 'rotateX(-30deg) rotateY(30deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div 
              className="absolute w-full h-full bg-zinc-700/25 dark:bg-zinc-600/25 border border-zinc-600/30"
              style={{
                transform: 'translateZ(40px)',
                boxShadow: '0 0 25px rgba(249, 115, 22, 0.1)',
              }}
            />
            <div 
              className="absolute w-full h-full bg-orange-500/10 dark:bg-orange-500/20 border border-orange-500/15"
              style={{
                transform: 'rotateX(90deg) translateZ(40px)',
              }}
            />
            <div 
              className="absolute w-full h-full bg-zinc-800/25 dark:bg-zinc-700/25 border border-zinc-600/30"
              style={{
                transform: 'rotateY(90deg) translateZ(40px)',
              }}
            />
          </div>
        </motion.div>

        {/* Additional smaller cubes */}
        <motion.div
          animate={{ 
            opacity: [0.1, 0.25, 0.1],
            rotate: [0, 360],
          }}
          transition={{ 
            opacity: { duration: 5, repeat: Infinity },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
          className="absolute top-1/4 right-1/4 w-24 h-24"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              transform: 'rotateX(45deg) rotateY(45deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div 
              className="absolute w-full h-full bg-zinc-600/20 dark:bg-zinc-500/20 border border-zinc-500/20"
              style={{
                transform: 'translateZ(24px)',
              }}
            />
            <div 
              className="absolute w-full h-full bg-orange-500/10 dark:bg-orange-500/15"
              style={{
                transform: 'rotateX(90deg) translateZ(24px)',
              }}
            />
            <div 
              className="absolute w-full h-full bg-zinc-700/20 dark:bg-zinc-600/20"
              style={{
                transform: 'rotateY(90deg) translateZ(24px)',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <BlurText
            text="SHAIK SAJID HUSSAIN"
            delay={100}
            animateBy="words"
            direction="top"
            className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight uppercase"
            style={{ 
              textShadow: '0 0 40px rgba(0, 0, 0, 0.3)',
              letterSpacing: '0.05em'
            }}
          />
          
          <BlurText
            text="FREELANCE FULL-STACK DEVELOPER"
            delay={80}
            animateBy="words"
            direction="top"
            className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-8 uppercase tracking-wider font-medium"
          />

          <SplitText
            text="I build fast, scalable, and modern web applications for startups and businesses."
            className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-3xl mx-auto"
            delay={50}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            tag="p"
          />

          {/* View Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-12"
          >
            <FiEye size={16} />
            <span>
              <CountUp
                from={0}
                to={2700}
                separator=","
                direction="up"
                duration={2}
                className="font-semibold text-gray-600 dark:text-gray-300"
              />
              {' '}views
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2 group relative overflow-hidden backdrop-blur-md bg-gray-900/80 dark:bg-white/20 border border-gray-800/50 dark:border-white/30 text-white dark:text-white shadow-lg hover:bg-gray-800/90 dark:hover:bg-white/30 hover:shadow-xl hover:scale-105 active:scale-95"
              style={{
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            >
              <span className="relative z-10">Hire Me</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
            <button
              onClick={() => scrollToSection('#projects')}
              className="px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2 relative overflow-hidden backdrop-blur-md bg-white/20 dark:bg-black/20 border-2 border-gray-300/50 dark:border-white/40 text-gray-900 dark:text-white shadow-lg hover:bg-white/30 dark:hover:bg-white/25 hover:border-gray-400/70 dark:hover:border-white/60 hover:scale-105 active:scale-95"
              style={{
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(0, 0, 0, 0.1)'
              }}
            >
              <span className="relative z-10">View Projects</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.2 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <button
          onClick={() => scrollToSection('#services')}
          className="w-12 h-12 rounded-full border-2 border-purple-500 dark:border-purple-400 flex items-center justify-center text-purple-500 dark:text-purple-400 hover:bg-purple-500/10 dark:hover:bg-purple-400/10 transition-colors"
        >
          <FiChevronDown size={24} />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;

