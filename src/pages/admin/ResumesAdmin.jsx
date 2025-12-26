import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiX, FiSave } from 'react-icons/fi';
import { getAuthToken } from '../../utils/authUtils';
import config from '../../config/api';

const ResumesAdmin = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', url: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch resumes on mount
  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${config.baseUrl}/resumes`);
      const data = await response.json();
      setResumes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      setError('Failed to fetch resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddNew = () => {
    setFormData({ title: '', url: '' });
    setEditingId(null);
    setError('');
    setSuccess('');
    setShowForm(true);
  };

  const handleEdit = (resume) => {
    setFormData({ title: resume.title, url: resume.url });
    setEditingId(resume._id);
    setError('');
    setSuccess('');
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({ title: '', url: '' });
    setEditingId(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title.trim() || !formData.url.trim()) {
      setError('Title and URL are required');
      return;
    }

    try {
      const token = getAuthToken();
      const url = editingId
        ? `${config.baseUrl}/resumes/${editingId}`
        : `${config.baseUrl}/resumes`;

      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          url: formData.url,
        }),
      });

      if (!response.ok) {
        throw new Error(editingId ? 'Failed to update resume' : 'Failed to create resume');
      }

      setSuccess(editingId ? 'Resume updated successfully!' : 'Resume added successfully!');
      setShowForm(false);
      setFormData({ title: '', url: '' });
      setEditingId(null);
      fetchResumes();
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;

    try {
      const token = getAuthToken();
      const response = await fetch(`${config.baseUrl}/resumes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete resume');
      }

      setSuccess('Resume deleted successfully!');
      fetchResumes();
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Resume Management</h2>
        {!showForm && (
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add Resume
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            {editingId ? 'Edit Resume' : 'Add New Resume'}
          </h3>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Resume Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Senior Developer Resume"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Google Drive Link (or any URL)
              </label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder="https://drive.google.com/file/d/..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <FiSave size={16} />
                {editingId ? 'Update' : 'Add'} Resume
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                <FiX size={16} />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg">
          {success}
        </div>
      )}

      {/* Resumes List */}
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading resumes...</div>
      ) : resumes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No resumes yet. {!showForm && <button onClick={handleAddNew} className="text-blue-600 hover:underline">Add one now</button>}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">URL</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Downloads</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {resumes.map((resume) => (
                <tr key={resume._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">{resume.title}</td>
                  <td className="px-6 py-4 text-sm">
                    <a
                      href={resume.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline truncate max-w-xs inline-block"
                    >
                      {resume.url}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{resume.downloadCount || 0}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      resume.isActive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {resume.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(resume)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition"
                        title="Edit"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(resume._id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ResumesAdmin;
