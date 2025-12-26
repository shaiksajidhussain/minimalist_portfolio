import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import config from '../config/api';

const Projects = ({ onProjectClick, projects: projectsProp }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { theme, colors } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/projects`);
        const data = await response.json();
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(defaultProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filters = ['All', 'Web Development', 'SaaS', 'Full-Stack'];
  
  // Masonry grid layout configuration
  const getMasonryClass = (index) => {
    const pattern = [
      'md:col-span-2 md:row-span-2', // Large
      'md:col-span-1 md:row-span-1', // Small
      'md:col-span-1 md:row-span-1', // Small
      'md:col-span-1 md:row-span-2', // Medium-tall
      'md:col-span-2 md:row-span-1', // Medium-wide
      'md:col-span-1 md:row-span-1', // Small
    ];
    return pattern[index % pattern.length];
  };

  const defaultProjects = [
    {
      name: 'SaaS Application',
      category: 'SaaS',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      liveLink: '#',
      githubLink: '#',
      description: 'A comprehensive SaaS platform with subscription management, user authentication, and payment integration.',
      client: 'Tech Startup',
      result: '500+ Users, 95% Uptime',
      testimonial: '"Exceeded all expectations. Delivered on time!"',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    },
    {
      name: 'LMS Platform',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop',
      liveLink: '#',
      githubLink: '#',
      description: 'Learning management system with course management and student tracking.',
      client: 'Education Institute',
      result: '2000+ Students Enrolled',
      testimonial: '"Best decision for our institution"',
      tech: ['Next.js', 'PostgreSQL', 'Prisma', 'AWS'],
    },
    {
      name: 'School Management',
      category: 'Full-Stack',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      liveLink: '#',
      githubLink: '#',
      description: 'Complete school management solution with fee collection and attendance.',
      client: 'ABC School',
      result: '5000+ Records Managed',
      testimonial: '"Streamlined our entire operation"',
      tech: ['React', 'Express.js', 'MySQL', 'Razorpay'],
    },
    {
      name: 'Corporate Website',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop',
      liveLink: '#',
      githubLink: '#',
      description: 'Modern corporate website with smooth animations and SEO optimization.',
      client: 'Fortune 500',
      result: '300% Traffic Increase',
      testimonial: '"Professional and polished"',
      tech: ['React', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      name: 'E-Commerce Platform',
      category: 'Full-Stack',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop',
      liveLink: '#',
      githubLink: '#',
      description: 'Full-featured e-commerce with payment processing and order tracking.',
      client: 'Online Retailer',
      result: '$500K Revenue Boost',
      testimonial: '"Transformed our sales"',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    },
    {
      name: 'Analytics Dashboard',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      liveLink: '#',
      githubLink: '#',
      description: 'Real-time analytics dashboard with interactive charts and reporting.',
      client: 'Data Analytics Co',
      result: '10K+ Data Points/Day',
      testimonial: '"Insights at our fingertips"',
      tech: ['React', 'Chart.js', 'Node.js', 'PostgreSQL'],
    },
  ];

  const projectsToDisplay = projects.length > 0 ? projects : defaultProjects;

  const filteredProjects = activeFilter === 'All' 
    ? projectsToDisplay 
    : projectsToDisplay.filter(project => {
        // Handle category matching with case-insensitivity
        const projectCategory = project.category || '';
        return projectCategory.toLowerCase() === activeFilter.toLowerCase();
      });

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
    <section 
      id="projects" 
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: theme === 'dark' ? '#18181b' : colors.light,
      }}
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{
            backgroundColor: `${colors.primary}15`,
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl"
          style={{
            backgroundColor: `${colors.primary}10`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 
              className="text-5xl sm:text-6xl font-bold mb-4"
              style={{
                color: theme === 'dark' ? '#ffffff' : '#000000',
              }}
            >
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Showcasing real-world solutions that transformed businesses
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
          >
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeFilter === filter
                    ? 'text-white shadow-lg'
                    : theme === 'dark' 
                      ? 'bg-white/10 border border-white/20 text-white hover:bg-white/20 dark:bg-zinc-800/50 dark:border-zinc-700 dark:hover:bg-zinc-700/50' 
                      : 'bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200'
                }`}
                style={activeFilter === filter ? {
                  backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.dark})`,
                  boxShadow: `0 0 20px ${colors.primary}80`,
                } : {}}
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>

          {/* Masonry Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-gray-600 dark:text-gray-400 text-lg">Loading projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No projects found in this category.</p>
            </div>
          ) : (
            <motion.div
              key={`${activeFilter}-${filteredProjects.length}`}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-max"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer h-80 ${getMasonryClass(index)}`}
                  onClick={() => onProjectClick(project)}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>
                  </div>

                  {/* Content - Always Visible */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                    {/* Top - Title & Category */}
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="inline-block mb-3"
                      >
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border"
                          style={{
                            backgroundColor: `${colors.primary}33`,
                            color: `${colors.primary}`,
                            borderColor: `${colors.primary}88`,
                          }}
                        >
                          {project.category}
                        </span>
                      </motion.div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 line-clamp-2">
                        {project.name}
                      </h3>
                    </div>

                    {/* Bottom - Hover Reveal Content */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {/* Description */}
                      {project.description && (
                        <p className="text-sm text-gray-100 line-clamp-2">
                          {project.description}
                        </p>
                      )}

                      {/* Testimonial */}
                      {project.testimonial && (
                        <blockquote className="border-l-2 border-purple-400 pl-3 text-xs italic text-gray-200">
                          {project.testimonial}
                        </blockquote>
                      )}

                      {/* Tech Stack */}
                      {project.tech && project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {project.tech.slice(0, 3).map((t, i) => (
                            <span key={i} className="px-2 py-1 rounded text-xs bg-white/10 text-white/80 backdrop-blur-sm">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <motion.a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all backdrop-blur-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiGithub size={18} className="text-white" />
                        </motion.a>
                        <motion.a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all backdrop-blur-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiExternalLink size={18} className="text-white" />
                        </motion.a>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-1"
                          onClick={() => onProjectClick(project)}
                        >
                          View <FiArrowRight size={14} />
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

