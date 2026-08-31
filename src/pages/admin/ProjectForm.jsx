import { useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { FiX } from 'react-icons/fi';
import { getAuthToken } from '../../utils/authUtils';
import config from '../../config/api';

const ProjectForm = ({ project, mode, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    thumbnail: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    category: 'All',
    orderNumber: 0,
    client: '',
    result: '',
    testimonial: '',
    liveLink: '',
    githubLink: '',
    tech: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const lenis = useLenis();

  useEffect(() => {
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis]);

  useEffect(() => {
    if (project && mode === 'edit') {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        image: project.image || '',
        thumbnail: project.thumbnail || '',
        image1: project.image1 || '',
        image2: project.image2 || '',
        image3: project.image3 || '',
        image4: project.image4 || '',
        category: project.category || 'All',
        orderNumber: project.orderNumber || 0,
        client: project.client || '',
        result: project.result || '',
        testimonial: project.testimonial || '',
        liveLink: project.liveLink || '',
        githubLink: project.githubLink || '',
        tech: (project.tech && Array.isArray(project.tech)) ? project.tech.join(', ') : '',
        tags: (project.tags && Array.isArray(project.tags)) ? project.tags.join(', ') : '',
      });
    }
  }, [project, mode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = getAuthToken();
      
      // Parse tech and tags arrays
      const parsedData = {
        ...formData,
        tech: formData.tech
          .split(',')
          .map((t) => t.trim())
          .filter((t) => t),
        tags: formData.tags
          .split(',')
          .map((t) => t.trim())
          .filter((t) => t),
      };

      const method = mode === 'create' ? 'POST' : 'PUT';
      const url =
        mode === 'create'
          ? `${config.baseUrl}/projects`
          : `${config.baseUrl}/projects/${project._id}`;

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `Failed to ${mode} project`);
      }

      onSubmit();
    } catch (err) {
      setError(err.message || `An error occurred while ${mode}ing the project`);
      console.error('Form submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      data-lenis-prevent
      onWheel={(event) => event.stopPropagation()}
      onTouchMove={(event) => event.stopPropagation()}
    >
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-white/20 bg-gray-900 shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="text-xl font-bold text-white">
            {mode === 'create' ? 'Create New Project' : 'Edit Project'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 transition-colors hover:bg-white/10"
          >
            <FiX size={24} className="text-white" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-6"
          data-lenis-prevent
        >
          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Row 1: Name & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Project Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Project name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All">All</option>
                <option value="Web Development">Web Development</option>
                <option value="App Development">App Development</option>
                <option value="Freelancing">Freelancing</option>
                <option value="Personal Projects">Personal Projects</option>
              </select>
            </div>
          </div>

          {/* Row 2: Order Number */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Display Order (Lower numbers appear first)</label>
            <input
              type="number"
              name="orderNumber"
              value={formData.orderNumber}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="0"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="3"
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Project description"
            />
          </div>

          {/* Main Image URLs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Main Image URL *</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Thumbnail URL</label>
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Gallery Images (image1-4)</label>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((num) => (
                <input
                  key={`image${num}`}
                  type="url"
                  name={`image${num}`}
                  value={formData[`image${num}`]}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs"
                  placeholder={`Gallery image ${num} URL`}
                />
              ))}
            </div>
          </div>

          {/* Client & Result */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Client</label>
              <input
                type="text"
                name="client"
                value={formData.client}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Client name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Result</label>
              <input
                type="text"
                name="result"
                value={formData.result}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., $500K Revenue Boost"
              />
            </div>
          </div>

          {/* Testimonial */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Testimonial</label>
            <textarea
              name="testimonial"
              value={formData.testimonial}
              onChange={handleInputChange}
              rows="2"
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Client testimonial"
            />
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Live Link</label>
              <input
                type="url"
                name="liveLink"
                value={formData.liveLink}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">GitHub Link</label>
              <input
                type="url"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Tech Stack & Tags */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Technologies (comma-separated)</label>
              <input
                type="text"
                name="tech"
                value={formData.tech}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs"
                placeholder="React, Node.js, MongoDB"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs"
                placeholder="web, saas, startup"
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-end gap-3 border-t border-white/10 px-6 py-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              mode === 'create' ? 'Create Project' : 'Update Project'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
