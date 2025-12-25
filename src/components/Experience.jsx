import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const Experience = () => {
  const { colors } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpand = (index) => {
    setExpandedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const experiences = [
    {
      company: 'QubicGen',
      role: 'MERN STACK Developer → Team Lead',
      duration: 'Jan 2024 - On Going',
      points: [
        'Started as a MERN Stack Developer and progressed to Team Lead, managing a team of 7 junior developers',
        'Conducted comprehensive Knowledge Transfer (KT) sessions and mentored junior team members',
        'Delivered multiple projects including QubicGen Portfolio, QMES, LMS, and Vidynatra',
        'Spearheaded the creation of company website using React.js for frontend and Express.js with MongoDB for backend',
        'Crafted dynamic and engaging platforms with sleek and modern user experiences',
        'Utilized Figma for design and frameworks such as Tailwind CSS and Bootstrap for styling',
        'Integrated various libraries like AOS to enhance website functionality and aesthetics',
        'Worked collaboratively within the team to deliver cutting-edge solutions that embody QubicGen\'s vision and professionalism',
      ],
      technologies: ['JavaScript', 'React', 'Next.js', 'REST API', 'HTML', 'CSS', 'Express.js', 'MongoDB', 'Mongoose', 'Node.js', 'Tailwind CSS', 'Figma'],
      projects: ['QubicGen Portfolio', 'QMES', 'LMS', 'Vidynatra'],
    },
    {
      company: 'Freelance / Consulting',
      role: 'Full-Stack Developer',
      duration: '2023 - Present',
      points: [
        'Built comprehensive portfolio website for AJ Supplements, showcasing their products and brand identity',
        'Developed solutions for Feed Formulate Software, delivering custom software applications',
        'Created portfolio and dashboard for Bhavani Chits chits management system with advanced features',
        'Implemented high-security measures and access controls for financial data management',
        'Optimized websites with SEO best practices to improve search engine visibility and rankings',
        'Developed complete website for Project Genie, including responsive design and modern UI/UX',
        'Managed multiple client projects simultaneously, ensuring timely delivery and quality standards',
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Express.js', 'REST API', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'SEO', 'Security'],
      projects: ['AJ Supplements Portfolio', 'Feed Formulate Software', 'Bhavani Chits Management System', 'Project Genie Website'],
    },
    {
      company: 'Inspire Leap',
      role: 'Full-Stack Developer (Client Project)',
      duration: '2024',
      points: [
        'Created a comprehensive portfolio website with integrated dashboard functionality',
        'Developed and provided access to LMS portal for client\'s educational needs',
        'Managed end-to-end project activities including development, deployment, and maintenance',
        'Implemented robust security measures and access controls for the LMS portal',
        'Ensured seamless user experience across portfolio and dashboard interfaces',
        'Maintained ongoing support and updates for the platform',
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'REST API', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
    },
    {
      company: 'Melody Mocktails',
      role: 'MERN STACK Developer',
      duration: 'June 2024 – Dec 2024',
      points: [
        'Demonstrated exceptional multitasking abilities by concurrently managing responsibilities across multiple companies',
        'Successfully delivered three significant projects during a 4-month engagement, showcasing versatility and efficiency',
        'Leveraged MERN stack to develop robust, scalable solutions tailored to each client\'s unique requirements',
        'Utilized React.js for creating dynamic front-end interfaces and Express.js with MongoDB for powerful, data-driven back-ends',
        'Applied modern design tools like Figma and CSS frameworks such as Tailwind and Bootstrap to create visually appealing applications',
        'Enhanced project management and client communication abilities, solidifying reputation as adaptable and results-driven developer',
      ],
      technologies: ['Next.js', 'JavaScript', 'React', 'REST API', 'HTML', 'CSS', 'Express.js', 'MongoDB', 'Mongoose', 'Jira', 'BitBucket', 'VS Code'],
    },
    {
      company: 'Marolix Technology Solutions Pvt Ltd',
      role: 'Java FullStack Developer',
      duration: '2022 – 2023',
      points: [
        'Crafted Tidy Tangle—a user-friendly app for seamless home services',
        'Designed intuitive interfaces connecting electricians and plumbers to the Spring backend via REST APIs',
        'Collaborated with the agile backend team to deliver a robust, scalable platform for flawless home services',
        'Developed full-stack solutions using Java and Spring Boot for backend and Angular for frontend',
      ],
      technologies: ['Java', 'Spring Boot', 'REST API', 'HTML', 'CSS', 'JavaScript', 'Angular'],
    },
    {
      company: 'SRIC',
      role: 'Frontend Developer Intern',
      duration: '2022',
      points: [
        'Designed and developed SRIC\'s public website, implementing a user-friendly interface with HTML, CSS, and JavaScript',
        'Integrated a secure database for collecting and storing user information',
        'Optimized performance and responsiveness across various devices',
        'Utilized ReactJS and Material UI for modern UI components',
      ],
      technologies: ['ReactJS', 'Material UI', 'HTML', 'CSS', 'JavaScript', 'CodeIgniter'],
    },
    {
      company: 'Skilync',
      role: 'Web Designer Intern',
      duration: 'June 2022 – Aug 2022',
      points: [
        'Gained valuable hands-on experience in web designing',
        'Worked with Flutter Flow for rapid prototyping and development',
        'Explored cloud-based solutions for web applications',
      ],
      technologies: ['Flutter Flow', 'Cloud'],
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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="max-w-4xl mx-auto">
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
            Work Experience
          </motion.h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => {
              const isExpanded = expandedItems.includes(index);
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-zinc-800 p-6 rounded-lg border border-gray-200 dark:border-zinc-700"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {exp.role}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                      </div>
                      <button
                        onClick={() => toggleExpand(index)}
                        className="mt-1 p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors flex-shrink-0"
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                      >
                        {isExpanded ? (
                          <FiChevronUp className="text-gray-600 dark:text-gray-400" size={20} />
                        ) : (
                          <FiChevronDown className="text-gray-600 dark:text-gray-400" size={20} />
                        )}
                      </button>
                    </div>
                    <p className="text-gray-500 dark:text-gray-500 text-sm mt-2 md:mt-0 md:ml-4">
                      {exp.duration}
                    </p>
                  </div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-2 mb-4">
                          {exp.points.map((point, pointIndex) => (
                            <li
                              key={pointIndex}
                              className="text-gray-600 dark:text-gray-400 flex items-start"
                            >
                              <span className="mr-2">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                        {exp.projects && (
                          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-zinc-700">
                            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                              Key Projects
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {exp.projects.map((project, projectIndex) => (
                                <span
                                  key={projectIndex}
                                  className="px-3 py-1 rounded-full text-sm font-medium"
                                  style={{
                                    backgroundColor: colors.primary + '20',
                                    color: colors.primary
                                  }}
                                >
                                  {project}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {exp.technologies && (
                          <div className={`mt-4 pt-4 border-t border-gray-200 dark:border-zinc-700 ${exp.projects ? '' : 'mt-4'}`}>
                            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                              Technologies
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-3 py-1 bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;

