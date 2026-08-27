import { useState, useEffect, useRef } from 'react';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import config from '../config/api';
import { RevealHeading, useTextReveal } from '../hooks/useTextReveal.jsx';

const Projects = ({ onProjectClick, projects: incomingProjects }) => {
  const { colors } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  useTextReveal(sectionRef, [loading]);

  const defaultProjects = [
    {
      name: 'SaaS Application',
      category: 'Web Development',
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
      category: 'Web Development',
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
      description: 'Modern corporate website with SEO optimization.',
      client: 'Fortune 500',
      result: '300% Traffic Increase',
      testimonial: '"Professional and polished"',
      tech: ['React', 'Tailwind CSS'],
    },
    {
      name: 'E-Commerce Platform',
      category: 'Web Development',
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
      category: 'App Development',
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

  useEffect(() => {
    if (incomingProjects?.length) {
      setProjects(incomingProjects);
      setLoading(false);
      return;
    }

    const fetchProjects = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/projects`);
        const data = await response.json();
        setProjects(data && data.length > 0 ? data : defaultProjects);
      } catch {
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [incomingProjects]);

  const filters = ['All', 'Web Development', 'App Development', 'Freelancing', 'Personal Projects'];

  const getMasonryClass = (index) => {
    const pattern = [
      'md:col-span-2 md:row-span-2',
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-2',
      'md:col-span-2 md:row-span-1',
      'md:col-span-1 md:row-span-1',
    ];
    return pattern[index % pattern.length];
  };

  const projectsToDisplay = projects.length > 0 ? projects : defaultProjects;
  const filteredProjects =
    activeFilter === 'All'
      ? projectsToDisplay
      : projectsToDisplay.filter(
          (project) => (project.category || '').toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <section ref={sectionRef} id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <RevealHeading className="font-serif text-4xl sm:text-5xl text-[#1c1917] mb-4">
            Featured Projects
          </RevealHeading>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto" data-reveal-copy>
            Showcasing real-world solutions that transformed businesses
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-zinc-950'
                    : 'liquid-card !rounded-full text-zinc-600 hover:border-[#d4af37]/50'
                }`}
                style={isActive ? { backgroundColor: colors.primary } : undefined}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {loading ? (
          <p className="text-center text-zinc-500 py-20">Loading projects...</p>
        ) : filteredProjects.length === 0 ? (
          <p className="text-center text-zinc-500 py-20">No projects found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 auto-rows-max">
            {filteredProjects.map((project, index) => (
              <div
                key={`${project.name}-${index}`}
                className={`group relative overflow-hidden liquid-card cursor-pointer h-80 ${getMasonryClass(index)}`}
                onClick={() => onProjectClick(project)}
              >
                <img
                  src={project.image || project.image1}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors" />

                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <div>
                    <span
                      className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-medium border"
                      style={{
                        backgroundColor: `${colors.primary}33`,
                        color: colors.primary,
                        borderColor: `${colors.primary}66`,
                      }}
                    >
                      {project.category}
                    </span>
                    <h3 className="text-xl font-semibold text-white line-clamp-2">{project.name}</h3>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity space-y-3">
                    {project.description && (
                      <p className="text-sm text-zinc-200 line-clamp-2">{project.description}</p>
                    )}
                    <div className="flex gap-2">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-white/15 hover:bg-white/25"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiGithub size={16} className="text-white" />
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-white/15 hover:bg-white/25"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiExternalLink size={16} className="text-white" />
                        </a>
                      )}
                      <button
                        className="flex-1 px-3 py-2 rounded-lg text-zinc-950 text-sm font-semibold flex items-center justify-center gap-1"
                        style={{ backgroundColor: colors.primary }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onProjectClick(project);
                        }}
                      >
                        View <FiArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
