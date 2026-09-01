import { useEffect, useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import config from '../config/api';

const FILTERS = ['All', 'Web Development', 'App Development', 'Freelancing', 'Personal Projects'];

const defaultProjects = [
  {
    name: 'SaaS Application',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    liveLink: '#',
    githubLink: '#',
    description: 'A comprehensive SaaS platform with subscription management, user authentication, and payment integration.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
  },
  {
    name: 'LMS Platform',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop',
    liveLink: '#',
    githubLink: '#',
    description: 'Learning management system with course management and student tracking.',
    tech: ['Next.js', 'PostgreSQL', 'Prisma', 'AWS'],
  },
  {
    name: 'School Management',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    liveLink: '#',
    githubLink: '#',
    description: 'Complete school management solution with fee collection and attendance.',
    tech: ['React', 'Express.js', 'MySQL', 'Razorpay'],
  },
  {
    name: 'Corporate Website',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop',
    liveLink: '#',
    githubLink: '#',
    description: 'Modern corporate website with SEO optimization.',
    tech: ['React', 'Tailwind CSS'],
  },
  {
    name: 'E-Commerce Platform',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop',
    liveLink: '#',
    githubLink: '#',
    description: 'Full-featured e-commerce with payment processing and order tracking.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
  },
  {
    name: 'Analytics Dashboard',
    category: 'App Development',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    liveLink: '#',
    githubLink: '#',
    description: 'Real-time analytics dashboard with interactive charts and reporting.',
    tech: ['React', 'Chart.js', 'Node.js', 'PostgreSQL'],
  },
];

const Projects = ({ onProjectClick, projects: incomingProjects }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const projectsToDisplay = projects.length > 0 ? projects : defaultProjects;
  const filteredProjects =
    activeFilter === 'All'
      ? projectsToDisplay
      : projectsToDisplay.filter(
          (project) => (project.category || '').toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <section id="projects" className="relative z-10 bg-[var(--cream)] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-zinc-500 mb-3">
            Gallery
          </p>
          <h2 className="font-serif text-5xl sm:text-7xl text-[var(--ink)] tracking-tight mb-4">
            On the wall
          </h2>
          <p className="text-zinc-500">
            A staggered set of shipped work — posters you can actually read.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-14">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[var(--ink)] text-[var(--cream)]'
                    : 'liquid-card !rounded-full text-zinc-600 hover:border-[var(--gold)]'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {loading ? (
          <p className="text-zinc-500 py-16">Loading projects...</p>
        ) : filteredProjects.length === 0 ? (
          <p className="text-zinc-500 py-16">No projects found in this category.</p>
        ) : (
          <div className="columns-1 md:columns-2 gap-6">
            {filteredProjects.map((project, index) => {
              const image = project.image || project.image1;
              const tall = index % 3 === 1;

              return (
                <button
                  key={`${project.name}-${index}`}
                  type="button"
                  onClick={() => onProjectClick(project)}
                  className="group mb-6 w-full break-inside-avoid text-left liquid-card overflow-hidden"
                >
                  <div className={`relative overflow-hidden ${tall ? 'h-80 sm:h-96' : 'h-64 sm:h-72'}`}>
                    {image ? (
                      <img
                        src={image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[var(--blob-b)]/50" />
                    )}
                    <span
                      className="absolute top-4 left-4 font-mono text-[11px] tracking-[0.2em] px-2.5 py-1 rounded-full bg-[var(--cream)]/92 text-[var(--ink)]"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">
                      {project.category}
                    </p>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-2xl sm:text-3xl text-[var(--ink)] tracking-tight">
                        {project.name}
                      </h3>
                      <FiArrowUpRight
                        size={18}
                        className="shrink-0 mt-1 text-zinc-300 transition-colors group-hover:text-[var(--gold)]"
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
