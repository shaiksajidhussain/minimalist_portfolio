import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiMonitor, FiCode, FiSmartphone } from 'react-icons/fi';

const Expertise = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const expertise = [
    {
      icon: FiMonitor,
      title: 'Full-Stack Development',
      subtitle: 'React, Node.js, MongoDB',
      description: 'Experienced in building scalable web applications with modern frameworks. Proficient in MERN/PERN stack, RESTful APIs, and database design.',
      underlineColor: 'pink',
    },
    {
      icon: FiCode,
      title: 'Frontend Development',
      subtitle: 'React, Next.js, TypeScript',
      description: 'Passionate about UI/UX. Over 2+ years of development experience in HTML, CSS, JavaScript, React and Next.js frameworks.',
      underlineColor: 'blue',
    },
    {
      icon: FiSmartphone,
      title: 'SaaS Development',
      subtitle: 'Scalable Platforms',
      description: 'Skilled in developing scalable SaaS platforms with subscription management, payment integration, and real-time features.',
      underlineColor: 'orange',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const getUnderlineClass = (color) => {
    const colors = {
      pink: 'bg-pink-500',
      blue: 'bg-blue-500',
      orange: 'bg-orange-500',
    };
    return colors[color] || colors.pink;
  };

  return (
    <section id="expertise" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto">
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
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-zinc-800 p-8 rounded-lg border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-6">
                      <Icon 
                        size={48} 
                        className="text-gray-700 dark:text-white" 
                      />
                    </div>
                    
                    <div className="mb-4 w-full">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        <span className="relative inline-block">
                          {item.title.split(' ')[0]}
                          <span 
                            className={`absolute bottom-0 left-0 right-0 h-0.5 ${getUnderlineClass(item.underlineColor)}`}
                            style={{ height: '2px' }}
                          />
                        </span>
                        {item.title.split(' ').slice(1).join(' ') && (
                          <span> {item.title.split(' ').slice(1).join(' ')}</span>
                        )}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400 font-medium mt-1">
                        {item.subtitle}
                      </p>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
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

