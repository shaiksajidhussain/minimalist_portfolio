import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiMonitor, FiCode, FiSmartphone } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import CodePreview from './CodePreview';
import { useTheme } from '../context/ThemeContext';

const Expertise = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { theme, colors } = useTheme();

  const expertise = [
    {
      icon: FiMonitor,
      title: 'Full-Stack Development',
      subtitle: 'React, Node.js, MongoDB',
      description: 'Experienced in building scalable web applications with modern frameworks. Proficient in MERN/PERN stack, RESTful APIs, and database design.',
      underlineColor: 'pink',
      bgImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
      hoverBg: 'https://i.pinimg.com/originals/85/04/77/850477fed08bfe98598082bcd309ce70.gif',
    },
    {
      icon: FiCode,
      title: 'Frontend Development',
      subtitle: 'React, Next.js, TypeScript',
      description: 'Passionate about UI/UX. Over 2+ years of development experience in HTML, CSS, JavaScript, React and Next.js frameworks.',
      underlineColor: 'blue',
      bgImage: 'https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      hoverBg: 'https://i.pinimg.com/originals/81/17/8b/81178b47a8598f0c81c4799f2cdd4057.gif',
    },
    {
      icon: FiSmartphone,
      title: 'SaaS Development',
      subtitle: 'Scalable Platforms',
      description: 'Skilled in developing scalable SaaS platforms with subscription management, payment integration, and real-time features.',
      underlineColor: 'orange',
      bgImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop',
      hoverBg: 'https://i.pinimg.com/originals/30/5f/f8/305ff88e24f9460bb79644e197af92a9.gif',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8,
      rotateX: -15,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,  
      }
    },
  };

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -180,
      opacity: 0,
    },
    visible: { 
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3,
      }
    },
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "reverse",
      }
    }
  };

  const underlineVariants = {
    hidden: { 
      scaleX: 0,
      originX: 0,
    },
    visible: { 
      scaleX: 1,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: "easeOut",
      }
    },
  };

  const getUnderlineClass = (color) => {
    // Return the primary theme color instead of hardcoded colors
    return colors.primary;
  };

  return (
    <section id="expertise" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-color)' }}>
      {/* Code Preview Background - Only visible in dark mode */}
      {theme === 'dark' && (
        <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 max-w-full">
          <CodePreview
            language="javascript"
            filename="Expertise.jsx"
            highlightLines={[3, 5, 7]}
            code={`import React from 'react';
import { motion } from 'framer-motion';

const Expertise = () => {
  const skills = [
    'Full-Stack Development',
    'Frontend Development',
    'SaaS Development'
  ];
  
  return (
    <div className="expertise-container">
      {skills.map((skill, index) => (
        <SkillCard key={index} skill={skill} />
      ))}
    </div>
  );
};

export default Expertise;`}
          />
        </div>
        <div className="absolute bottom-20 left-10 w-96 max-w-full hidden lg:block">
          <CodePreview
            language="typescript"
            filename="Skills.ts"
            tabs={[
              {
                name: 'Frontend',
                code: `const frontendSkills = {
  frameworks: ['React', 'Next.js'],
  languages: ['TypeScript', 'JavaScript'],
  styling: ['Tailwind CSS', 'CSS3']
};`,
                language: 'typescript'
              },
              {
                name: 'Backend',
                code: `const backendSkills = {
  runtime: 'Node.js',
  databases: ['MongoDB', 'PostgreSQL'],
  apis: 'RESTful & GraphQL'
};`,
                language: 'typescript'
              }
            ]}
          />
        </div>
      </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-16 text-center"
          >
            My Expertise
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {expertise.map((item, index) => {
              const Icon = item.icon;
              const [isHovered, setIsHovered] = useState(false);
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group w-full cursor-pointer overflow-hidden relative card rounded-lg shadow-lg mx-auto flex flex-col justify-end p-8 border border-gray-200 dark:border-zinc-700 min-h-[400px] transition-all duration-500 hover:shadow-2xl"
                  style={{
                    backgroundImage: `url(${isHovered ? item.hoverBg : item.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: isHovered ? 1 : 0.7,
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-500" />
                  
                  <div className="text relative z-20">
                    <div className="mb-6 flex justify-center">
                      <Icon 
                        size={48} 
                        className={`transition-colors duration-500 ${isHovered ? 'text-white' : 'text-gray-700 dark:text-white'}`}
                      />
                    </div>
                    
                    <div className="mb-4 w-full text-center">
                      <h3 className={`text-2xl font-bold mb-2 transition-colors duration-500 ${isHovered ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                        <span className="relative inline-block">
                          {item.title.split(' ')[0]}
                          <span 
                            className="absolute bottom-0 left-0 right-0 h-0.5"
                            style={{ 
                              height: '2px',
                              backgroundColor: colors.primary,
                            }}
                          />
                        </span>
                        {item.title.split(' ').slice(1).join(' ') && (
                          <span> {item.title.split(' ').slice(1).join(' ')}</span>
                        )}
                      </h3>
                      <p className={`text-lg font-medium mt-1 transition-colors duration-500 ${isHovered ? 'text-gray-100' : 'text-gray-600 dark:text-gray-400'}`}>
                        {item.subtitle}
                      </p>
                    </div>

                    <p className={`text-sm leading-relaxed transition-colors duration-500 ${isHovered ? 'text-gray-100' : 'text-gray-600 dark:text-gray-400'}`}>
                      {item.description}
                    </p>
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

export default Expertise;

