import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiCss3,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiPrisma,
  SiGit,
  SiGithub,
  SiDocker,
  SiAmazon,
  SiStripe,
  SiFramer,
  SiAngular,

  SiCodeigniter,
  SiFlutter,
} from 'react-icons/si';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skills = [
    // Frontend
    { name: 'React', icon: SiReact, category: 'Frontend' },
    { name: 'Next.js', icon: SiNextdotjs, category: 'Frontend' },
    { name: 'TypeScript', icon: SiTypescript, category: 'Frontend' },
    { name: 'JavaScript', icon: SiJavascript, category: 'Frontend' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'Frontend' },
    { name: 'CSS', icon: SiCss3, category: 'Frontend' },
    { name: 'HTML', icon: SiHtml5, category: 'Frontend' },
    { name: 'Framer Motion', icon: SiFramer, category: 'Frontend' },
    { name: 'Angular', icon: SiAngular, category: 'Frontend' },
   
    // Backend
    { name: 'Node.js', icon: SiNodedotjs, category: 'Backend' },
    { name: 'Express.js', icon: SiExpress, category: 'Backend' },
    // Database
    { name: 'MongoDB', icon: SiMongodb, category: 'Database' },
    { name: 'PostgreSQL', icon: SiPostgresql, category: 'Database' },
    { name: 'MySQL', icon: SiMysql, category: 'Database' },
    { name: 'Prisma', icon: SiPrisma, category: 'Database' },
    // Tools & Others
    { name: 'Git', icon: SiGit, category: 'Tools' },
    { name: 'GitHub', icon: SiGithub, category: 'Tools' },
    { name: 'Docker', icon: SiDocker, category: 'Tools' },
    { name: 'AWS', icon: SiAmazon, category: 'Tools' },
    { name: 'Stripe', icon: SiStripe, category: 'Tools' },
    { name: 'CodeIgniter', icon: SiCodeigniter, category: 'Tools' },
    { name: 'Flutter', icon: SiFlutter, category: 'Tools' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center"
          >
            Tech Stack
          </motion.h2>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative flex flex-col items-center justify-center group cursor-pointer"
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="relative">
                    <Icon
                      size={48}
                      className="text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:scale-110 group-hover:text-gray-900 dark:group-hover:text-white"
                    />
                    {hoveredSkill === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-10"
                      >
                        <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg">
                          {skill.name}
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-white rotate-45"></div>
                        </div>
                      </motion.div>
                    )}
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

export default Skills;

