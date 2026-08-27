import { FiArrowLeft, FiArrowRight, FiChevronRight, FiExternalLink, FiGithub, FiX, FiMaximize2 } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import config from '../config/api';

const ProjectDetail = ({ project, allProjects, onClose, onNext, onPrevious }) => {
  const { colors } = useTheme();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  
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
    <div className="min-h-screen bg-zinc-950">
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-8 right-8 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <FiX size={28} className="text-white" />
          </button>
          <img
            src={fullscreenImage}
            alt="Fullscreen view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="fixed left-8 top-8 z-50">
        <button
          onClick={onClose}
          className="w-12 h-12 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center hover:bg-zinc-700 transition-colors"
        >
          <FiArrowLeft size={20} className="text-white" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div>
          <p className="text-sm text-zinc-500 mb-4">
            {displayProject.category}
          </p>

          <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4">
            {displayProject.name}
          </h1>

          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-12">
            <button onClick={onClose} className="hover:text-white transition-colors">
              Home
            </button>
            <FiChevronRight size={14} />
            <button onClick={onClose} className="hover:text-white transition-colors">
              Portfolio
            </button>
            <FiChevronRight size={14} />
            <span className="text-white">{displayProject.name}</span>
          </nav>

          <div className="mb-12">
            <div
              className="mb-6 rounded-lg overflow-hidden relative group cursor-pointer"
              onClick={() => setFullscreenImage(displayProject.image)}
            >
              <img
                src={displayProject.image}
                alt={displayProject.name}
                className="w-full h-auto object-cover max-h-96"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="hidden group-hover:flex flex-col items-center gap-3">
                  <FiMaximize2 size={32} className="text-white" />
                  <span className="text-white font-medium">View Fullscreen</span>
                </div>
              </div>
            </div>

            {galleryImages.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide">
                  Project Gallery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {galleryImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setFullscreenImage(image)}
                      className="rounded-lg overflow-hidden border border-white/10 relative group"
                    >
                      <img
                        src={image}
                        alt={`${displayProject.name} - ${index + 1}`}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="hidden group-hover:flex flex-col items-center gap-2">
                          <FiMaximize2 size={24} className="text-white" />
                          <span className="text-white text-sm font-medium">Fullscreen</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
              About This Project
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed mb-8">
              {displayProject.description}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {displayProject.client && (
                <div>
                  <h3 className="text-sm font-semibold text-zinc-500 mb-2 uppercase tracking-wide">
                    Client
                  </h3>
                  <p className="text-lg text-white">{displayProject.client}</p>
                </div>
              )}

              {displayProject.tech && displayProject.tech.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-zinc-500 mb-2 uppercase tracking-wide">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {displayProject.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{ backgroundColor: `${colors.primary}22`, color: colors.primary }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {displayProject.result && (
                <div>
                  <h3 className="text-sm font-semibold text-zinc-500 mb-2 uppercase tracking-wide">
                    Result
                  </h3>
                  <p className="text-lg text-emerald-400 font-semibold">{displayProject.result}</p>
                </div>
              )}

              {displayProject.category && (
                <div>
                  <h3 className="text-sm font-semibold text-zinc-500 mb-2 uppercase tracking-wide">
                    Category
                  </h3>
                  <p className="text-lg text-white">{displayProject.category}</p>
                </div>
              )}
            </div>

            {displayProject.testimonial && (
              <div className="border border-white/10 rounded-lg p-6 mb-8 bg-zinc-900/40">
                <p className="text-lg text-zinc-300 italic">"{displayProject.testimonial}"</p>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              {displayProject.liveLink && (
                <a
                  href={displayProject.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-zinc-950 rounded-lg font-semibold hover:bg-zinc-200 transition-colors"
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 text-white rounded-lg font-semibold hover:bg-zinc-700 transition-colors"
                >
                  GitHub
                  <FiGithub size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-zinc-900 border border-white/10 rounded-lg p-4">
          <p className="text-xs font-semibold text-zinc-500 mb-3 uppercase tracking-wide">
            Next Project
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onPrevious}
              className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
            >
              <FiArrowLeft size={16} className="text-white" />
            </button>
            <button
              onClick={onNext}
              className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
            >
              <FiArrowRight size={16} className="text-white" />
            </button>
            <button
              onClick={onNext}
              className="text-sm font-medium text-white hover:underline"
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
