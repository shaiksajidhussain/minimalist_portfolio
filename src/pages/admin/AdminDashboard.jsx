import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { getAuthToken, removeAuthToken } from '../../utils/authUtils';
import config from '../../config/api';
import ProjectForm from './ProjectForm';
import ResumesAdmin from './ResumesAdmin';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' or 'resumes'
  const navigate = useNavigate();

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${config.baseUrl}/projects`);
      const data = await response.json();
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    removeAuthToken();
    navigate('/admin/login');
  };

  const handleCreateNew = () => {
    setFormMode('create');
    setSelectedProject(null);
    setShowForm(true);
  };

  const handleEdit = (project) => {
    setFormMode('edit');
    setSelectedProject(project);
    setShowForm(true);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const token = getAuthToken();
        const response = await fetch(`${config.baseUrl}/projects/${projectId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete project');
        }

        // Refresh projects list
        await fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project');
      }
    }
  };

  const handleFormSubmit = async () => {
    // Refresh projects after form submission
    await fetchProjects();
    setShowForm(false);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 rounded-lg text-red-200 transition-all"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 flex gap-0">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === 'projects'
                ? 'text-white border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('resumes')}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === 'resumes'
                ? 'text-white border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Resumes
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'projects' ? (
          <>
            {/* Action Button */}
            <div className="mb-8">
              <button
                onClick={handleCreateNew}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all"
              >
                <FiPlus size={20} />
                Create New Project
              </button>
            </div>

            {/* Projects Table */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-purple-600/20 border-t-purple-600 rounded-full animate-spin"></div>
              </div>
            ) : projects.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-12 text-center">
                <p className="text-gray-400 text-lg mb-4">No projects yet</p>
                <button
                  onClick={handleCreateNew}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all"
                >
                  Create Your First Project
                </button>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Category</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Client</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-white">{project.name}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-purple-600/30 text-purple-200 rounded-full text-xs">
                              {project.category || 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-300">{project.client || '-'}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs ${
                              project.liveLink
                                ? 'bg-green-600/30 text-green-200'
                                : 'bg-yellow-600/30 text-yellow-200'
                            }`}>
                              {project.liveLink ? 'Live' : 'Draft'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEdit(project)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-blue-400 hover:text-blue-300"
                                title="Edit"
                              >
                                <FiEdit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(project._id)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-red-400 hover:text-red-300"
                                title="Delete"
                              >
                                <FiTrash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        ) : (
          <ResumesAdmin />
        )}
      </div>

      {/* Project Form Modal */}
      {showForm && (
        <ProjectForm
          project={selectedProject}
          mode={formMode}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
