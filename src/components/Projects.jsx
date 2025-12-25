import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { FocusCards } from './ui/focus-cards';

const Projects = ({ onProjectClick, projects: projectsProp }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Web Development', 'SaaS', 'Full-Stack'];

  const defaultProjects = [
    {
      name: 'SaaS Application',
      category: 'SaaS',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      liveLink: '#',
      githubLink: '#',
      size: 'large', // large card
      description: 'A comprehensive SaaS platform with subscription management, user authentication, and payment integration. Built for scalability and performance.',
      client: 'Confidential',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    },
    {
      name: 'LMS Platform',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop',
      liveLink: '#',
      githubLink: '#',
      size: 'small', // small card
      description: 'A learning management system for educational institutions with course management, student progress tracking, and assessment features.',
      client: 'Educational Institution',
      tech: ['Next.js', 'PostgreSQL', 'Prisma', 'AWS'],
    },
    {
      name: 'School Management System',
      category: 'Full-Stack',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      liveLink: '#',
      githubLink: '#',
      size: 'medium', // medium card
      description: 'A comprehensive school management solution with student management, fee collection, attendance tracking, and report generation capabilities.',
      client: 'School District',
      tech: ['React', 'Express.js', 'MySQL', 'Razorpay'],
    },
    {
      name: 'Corporate Website',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop',
      liveLink: '#',
      githubLink: '#',
      size: 'small', // small card
      description: 'A modern, responsive corporate website with smooth animations, SEO optimization, and fast loading times.',
      client: 'Corporate Client',
      tech: ['React', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      name: 'E-Commerce Platform',
      category: 'Full-Stack',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop',
      liveLink: '#',
      githubLink: '#',
      size: 'large', // large card
      description: 'A full-featured e-commerce platform with product management, shopping cart, payment processing, and order tracking.',
      client: 'E-Commerce Client',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    },
    {
      name: 'Dashboard Analytics',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      liveLink: '#',
      githubLink: '#',
      size: 'medium', // medium card
      description: 'An analytics dashboard with real-time data visualization, charts, and comprehensive reporting features.',
      client: 'Analytics Company',
      tech: ['React', 'Chart.js', 'Node.js', 'PostgreSQL'],
    },
  ];

  const projects = projectsProp || defaultProjects;

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
            Featured Projects
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg"
          >
            Real projects that showcase my capabilities
          </motion.p>

          {/* Filter Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <span className="text-gray-700 dark:text-gray-300 font-medium">Filter by:</span>
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeFilter === filter
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                      : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Focus Cards Grid */}
          <FocusCards
            cards={filteredProjects.map((project) => ({
              title: project.name,
              src: project.image,
              description: project.category,
              project: project, // Keep original project data for click handling
            }))}
            className="mb-8"
            onCardClick={onProjectClick}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

