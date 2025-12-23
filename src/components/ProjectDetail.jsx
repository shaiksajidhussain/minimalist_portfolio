import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiChevronRight, FiExternalLink } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const ProjectDetail = ({ project, allProjects, onClose, onNext, onPrevious }) => {
  const { theme, toggleTheme } = useTheme();
  
  if (!project) return null;

  const currentIndex = allProjects.findIndex(p => p.name === project.name);
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 transition-colors">
      {/* Back Button & Theme Toggle */}
      <div className="fixed left-8 top-8 z-50 flex flex-col gap-6">
        <button
          onClick={onClose}
          className="w-12 h-12 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
        >
          <FiArrowLeft size={20} className="text-gray-900 dark:text-white" />
        </button>
        
        <div className="flex flex-col gap-2">
          <button
            onClick={toggleTheme}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              theme === 'dark'
                ? 'bg-white text-gray-900'
                : 'bg-zinc-800 text-white'
            }`}
          >
            Dark
          </button>
          <button
            onClick={toggleTheme}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              theme === 'light'
                ? 'bg-white text-gray-900'
                : 'bg-zinc-800 text-white'
            }`}
          >
            Light
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Category */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {project.category}.
          </p>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {project.name}
          </h1>

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-12">
            <button onClick={onClose} className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Home
            </button>
            <FiChevronRight size={14} />
            <button onClick={onClose} className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Portfolio
            </button>
            <FiChevronRight size={14} />
            <span className="text-gray-900 dark:text-white">{project.name}</span>
          </nav>

          {/* Project Image */}
          <div className="mb-12 rounded-lg overflow-hidden">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Description */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              About This Project
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              {project.description || `This is a comprehensive ${project.category.toLowerCase()} project that showcases modern web development practices. Built with cutting-edge technologies and a focus on user experience, this project demonstrates expertise in creating scalable and performant applications.`}
            </p>

            {/* Project Details */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                  Client
                </h3>
                <p className="text-lg text-gray-900 dark:text-white">
                  {project.client || 'Confidential'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                  Technologies
                </h3>
                <p className="text-lg text-gray-900 dark:text-white">
                  {project.tech ? project.tech.join(', ') : 'React, Node.js, MongoDB'}
                </p>
              </div>
            </div>

            {/* Open Project Button */}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
              >
                Open Project
                <FiExternalLink size={18} />
              </a>
            )}
          </div>
        </motion.div>
      </div>

      {/* Next Project Navigation */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-4 shadow-lg">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
            Next Project
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onPrevious}
              className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-zinc-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors"
            >
              <FiArrowLeft size={16} className="text-gray-900 dark:text-white" />
            </button>
            <button
              onClick={onNext}
              className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-zinc-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors"
            >
              <FiArrowRight size={16} className="text-gray-900 dark:text-white" />
            </button>
            <button
              onClick={onNext}
              className="text-sm font-medium text-gray-900 dark:text-white hover:underline"
            >
              {nextProject?.name || 'No more projects'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

