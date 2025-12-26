import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiChevronRight, FiExternalLink, FiGithub } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import config from '../config/api';

const ProjectDetail = ({ project, allProjects, onClose, onNext, onPrevious }) => {
  const { theme, toggleTheme } = useTheme();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!project || !project._id) {
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`${config.baseUrl}/projects/${project._id}`);
        const data = await response.json();
        setProjectData(data);
        setCurrentImageIndex(0);
      } catch (error) {
        console.error('Error fetching project details:', error);
        // Fallback to passed project data
        setProjectData(project);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjectDetails();
  }, [project]);
  
  if (!project || loading) return null;
  
  const displayProject = projectData || project;
  const galleryImages = [
    displayProject.image1,
    displayProject.image2,
    displayProject.image3,
    displayProject.image4,
  ].filter(Boolean);

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
            {displayProject.category}
          </p>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {displayProject.name}
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
            <span className="text-gray-900 dark:text-white">{displayProject.name}</span>
          </nav>

          {/* Project Images Gallery */}
          <div className="mb-12">
            {/* Main Image */}
            <div className="mb-6 rounded-lg overflow-hidden">
              <img
                src={displayProject.image}
                alt={displayProject.name}
                className="w-full h-auto object-cover max-h-96"
              />
            </div>
            
            {/* Gallery Preview */}
            {galleryImages.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Project Gallery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {galleryImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? 'border-purple-500'
                          : 'border-gray-200 dark:border-zinc-700 hover:border-purple-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${displayProject.name} - ${index + 1}`}
                        className="w-full h-40 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              About This Project
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              {displayProject.description}
            </p>

            {/* Project Details Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {displayProject.client && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                    Client
                  </h3>
                  <p className="text-lg text-gray-900 dark:text-white">
                    {displayProject.client}
                  </p>
                </div>
              )}
              
              {displayProject.tech && displayProject.tech.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {displayProject.tech.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {displayProject.result && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                    Result
                  </h3>
                  <p className="text-lg text-green-600 dark:text-green-400 font-semibold">
                    {displayProject.result}
                  </p>
                </div>
              )}
              
              {displayProject.category && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                    Category
                  </h3>
                  <p className="text-lg text-gray-900 dark:text-white">
                    {displayProject.category}
                  </p>
                </div>
              )}
            </div>

            {/* Testimonial */}
            {displayProject.testimonial && (
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-8">
                <p className="text-lg text-gray-800 dark:text-gray-200 italic">
                  "{displayProject.testimonial}"
                </p>
              </div>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-4">
              {displayProject.liveLink && (
                <a
                  href={displayProject.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
                >
                  View Live
                  <FiExternalLink size={18} />
                </a>
              )}
              {displayProject.githubLink && (
                <a
                  href={displayProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-zinc-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-zinc-600 transition-all"
                >
                  GitHub
                  <FiGithub size={18} />
                </a>
              )}
            </div>
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

