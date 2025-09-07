import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import '../admin/admin.css';

interface AssociationHead {
  _id: string;
  id: string;
  name: string;
  role: string;
  avatarBase64: string;
  handle: string;
  status: 'Online' | 'Away' | 'Offline';
  class: string;
  year: string;
  linkedin: string;
  createdAt: string;
}

const AssociationHeadManagementMobile: React.FC = () => {
  const { token } = useAuth();
  const [associationHeads, setAssociationHeads] = useState<AssociationHead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingHead, setEditingHead] = useState<AssociationHead | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    role: 'Member',
    avatarFile: null as File | null,
    avatarPreview: '',
    handle: '',
    status: 'Offline' as 'Online' | 'Away' | 'Offline',
    class: '',
    year: '',
    linkedin: ''
  });

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchAssociationHeads();
  }, [token]);

  const fetchAssociationHeads = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/association-heads`);

      if (!response.ok) {
        throw new Error('Failed to fetch association heads');
      }

      const data = await response.json();
      setAssociationHeads(data);
    } catch (error) {
      setError('Failed to load association heads. Please try again.');
      console.error('Error fetching association heads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Form handling functions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setFormData({
          ...formData,
          avatarFile: file,
          avatarPreview: reader.result as string
        });
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', formData.id);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('role', formData.role);
      formDataToSend.append('handle', formData.handle);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('class', formData.class);
      formDataToSend.append('year', formData.year);
      formDataToSend.append('linkedin', formData.linkedin);
      
      if (formData.avatarFile) {
        formDataToSend.append('avatar', formData.avatarFile);
      }
      
      const url = editingHead 
        ? `${API_URL}/admin/association-heads/${editingHead.id}`
        : `${API_URL}/admin/association-heads`;
        
      const method = editingHead ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formDataToSend
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save association head');
      }
      
      setSuccessMessage(`Association head ${editingHead ? 'updated' : 'created'} successfully!`);
      setShowForm(false);
      resetForm();
      fetchAssociationHeads();
    } catch (error) {
      console.error('Error saving association head:', error);
      setError(`Failed to ${editingHead ? 'update' : 'create'} association head. ${error instanceof Error ? error.message : ''}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteHead = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this association head?')) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const response = await fetch(`${API_URL}/admin/association-heads/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete association head');
      }
      
      setSuccessMessage('Association head deleted successfully!');
      fetchAssociationHeads();
    } catch (error) {
      console.error('Error deleting association head:', error);
      setError(`Failed to delete association head. ${error instanceof Error ? error.message : ''}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (head: AssociationHead) => {
    setEditingHead(head);
    setFormData({
      id: head.id,
      name: head.name,
      role: head.role,
      avatarFile: null,
      avatarPreview: head.avatarBase64 || '',
      handle: head.handle,
      status: head.status,
      class: head.class,
      year: head.year,
      linkedin: head.linkedin || ''
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      role: 'Member',
      avatarFile: null,
      avatarPreview: '',
      handle: '',
      status: 'Offline',
      class: '',
      year: '',
      linkedin: ''
    });
    setEditingHead(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    resetForm();
  };
  
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'President':
        return 'bg-purple-900/50 text-purple-200 border border-purple-500/30';
      case 'Vice President':
        return 'bg-indigo-900/50 text-indigo-200 border border-indigo-500/30';
      case 'Secretary':
        return 'bg-blue-900/50 text-blue-200 border border-blue-500/30';
      case 'Treasurer':
        return 'bg-green-900/50 text-green-200 border border-green-500/30';
      case 'Head':
        return 'bg-yellow-900/50 text-yellow-200 border border-yellow-500/30';
      default:
        return 'bg-gray-900/50 text-gray-200 border border-gray-500/30';
    }
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Online':
        return 'bg-green-900/50 text-green-200 border border-green-500/30';
      case 'Away':
        return 'bg-yellow-900/50 text-yellow-200 border border-yellow-500/30';
      case 'Offline':
      default:
        return 'bg-gray-900/50 text-gray-200 border border-gray-500/30';
    }
  };

  return (
    <div className="admin-card">
      {/* Header section with add button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Association Heads</h2>
        {!showForm ? (
          <button
            onClick={() => { setShowForm(true); setEditingHead(null); resetForm(); }}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[#8080ff]/30 hover:bg-[#8080ff]/40 focus:outline-none focus:border-[#8080ff]/50 focus:shadow-outline-indigo transition ease-in-out duration-150 border-[#8080ff]/20 shadow-[0_0_10px_rgba(128,128,255,0.3)]"
          >
            <svg className="-ml-0.5 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Head
          </button>
        ) : (
          <button
            onClick={handleCancel}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-500/30 hover:bg-red-500/40 focus:outline-none focus:border-red-500/50 focus:shadow-outline-red transition ease-in-out duration-150 border-red-500/20 shadow-[0_0_10px_rgba(255,128,128,0.3)]"
          >
            <svg className="-ml-0.5 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
        )}
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8080ff]"></div>
        </div>
      )}

      {/* Error and success messages */}
      {error && (
        <div className="mx-4 mb-4 p-4 bg-red-500/30 border border-red-500/30 text-white rounded backdrop-blur-sm">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mx-4 mb-4 p-4 bg-green-500/30 border border-green-500/30 text-white rounded backdrop-blur-sm">
          {successMessage}
        </div>
      )}

      {/* Form for adding/editing */}
      {showForm && (
        <div className="p-6 border-t border-gray-700 admin-form-grid">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-300">
                ID *
              </label>
              <input
                type="text"
                name="id"
                id="id"
                value={formData.id}
                onChange={handleInputChange}
                required
                disabled={!!editingHead}
                className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm disabled:bg-gray-700/50 disabled:text-gray-400"
              />
              {editingHead && (
                <p className="mt-1 text-xs text-gray-400">ID cannot be changed after creation.</p>
              )}
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-300">
                Role *
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-800/50 text-white rounded-md shadow-sm focus:outline-none focus:ring-[#8080ff] focus:border-[#8080ff] sm:text-sm backdrop-blur-sm"
              >
                <option value="President">President</option>
                <option value="Vice President">Vice President</option>
                <option value="Secretary">Secretary</option>
                <option value="Treasurer">Treasurer</option>
                <option value="Head">Head</option>
                <option value="Member">Member</option>
              </select>
            </div>

            <div>
              <label htmlFor="handle" className="block text-sm font-medium text-gray-300">
                Handle *
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-700 bg-gray-900/50 text-gray-400 sm:text-sm backdrop-blur-sm">
                  @
                </span>
                <input
                  type="text"
                  name="handle"
                  id="handle"
                  value={formData.handle}
                  onChange={handleInputChange}
                  required
                  className="focus:ring-[#8080ff] focus:border-[#8080ff] flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-700 bg-gray-800/50 text-white backdrop-blur-sm"
                  placeholder="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Avatar
              </label>
              <div className="mt-1 flex items-center space-x-5">
                <div className="flex-shrink-0 h-16 w-16 relative border-2 border-gray-700 rounded-full overflow-hidden">
                  {formData.avatarPreview ? (
                    <img src={formData.avatarPreview} alt="Avatar preview" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-[#2a2a4e] flex items-center justify-center">
                      <span className="text-gray-300 text-xl">
                        {formData.name ? formData.name.charAt(0).toUpperCase() : '?'}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="avatar-upload" className="relative cursor-pointer bg-[#8080ff]/20 rounded-md font-medium text-[#8080ff] hover:text-[#a0a0ff] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#8080ff] border border-[#8080ff]/20 shadow-[0_0_10px_rgba(128,128,255,0.2)]">
                    <span className="inline-flex items-center px-3 py-2 text-sm">Upload</span>
                    <input 
                      id="avatar-upload" 
                      name="avatar-upload" 
                      type="file" 
                      className="sr-only" 
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-300">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-800/50 text-white rounded-md shadow-sm focus:outline-none focus:ring-[#8080ff] focus:border-[#8080ff] sm:text-sm backdrop-blur-sm"
              >
                <option value="Online">Online</option>
                <option value="Away">Away</option>
                <option value="Offline">Offline</option>
              </select>
            </div>

            <div>
              <label htmlFor="class" className="block text-sm font-medium text-gray-300">
                Class *
              </label>
              <input
                type="text"
                name="class"
                id="class"
                value={formData.class}
                onChange={handleInputChange}
                required
                className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                placeholder="e.g., B.Tech CSE"
              />
            </div>

            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-300">
                Year *
              </label>
              <input
                type="text"
                name="year"
                id="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                placeholder="e.g., 2023-2027"
              />
            </div>

            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-300">
                LinkedIn
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-700 bg-gray-900/50 text-gray-400 sm:text-sm backdrop-blur-sm">
                  linkedin.com/in/
                </span>
                <input
                  type="text"
                  name="linkedin"
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className="focus:ring-[#8080ff] focus:border-[#8080ff] flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-700 bg-gray-800/50 text-white backdrop-blur-sm"
                  placeholder="username"
                />
              </div>
            </div>

            <div className="pt-5 admin-button-group">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex justify-center py-2 px-4 border border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-gray-800/50 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 backdrop-blur-sm w-full sm:w-auto mb-2 sm:mb-0"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#8080ff]/30 hover:bg-[#8080ff]/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8080ff] border-[#8080ff]/20 shadow-[0_0_10px_rgba(128,128,255,0.3)] w-full sm:w-auto"
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {editingHead ? 'Update' : 'Create'} Association Head
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile View Cards */}
      {!showForm && !isLoading && (
        <div className="space-y-4">
          {associationHeads.length > 0 ? (
            associationHeads.map((head) => (
              <div key={head._id} className="admin-mobile-card">
                <div className="admin-mobile-card-header">
                  {head.avatarBase64 ? (
                    <img 
                      className="admin-mobile-card-avatar"
                      src={head.avatarBase64} 
                      alt={head.name}
                    />
                  ) : (
                    <div className="admin-mobile-card-avatar bg-[#2a2a4e] flex items-center justify-center text-gray-300">
                      {head.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="admin-mobile-card-name">{head.name}</div>
                    <div className="admin-mobile-card-handle">@{head.handle}</div>
                  </div>
                </div>
                
                <div className="admin-mobile-card-grid">
                  <div className="admin-mobile-card-field">
                    <div className="admin-mobile-card-label">ID</div>
                    <div className="admin-mobile-card-value">{head.id}</div>
                  </div>
                  <div className="admin-mobile-card-field">
                    <div className="admin-mobile-card-label">Role</div>
                    <div className="admin-mobile-card-value">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeClass(head.role)}`}>
                        {head.role}
                      </span>
                    </div>
                  </div>
                  <div className="admin-mobile-card-field">
                    <div className="admin-mobile-card-label">Class</div>
                    <div className="admin-mobile-card-value">{head.class}</div>
                  </div>
                  <div className="admin-mobile-card-field">
                    <div className="admin-mobile-card-label">Year</div>
                    <div className="admin-mobile-card-value">{head.year}</div>
                  </div>
                  <div className="admin-mobile-card-field">
                    <div className="admin-mobile-card-label">Status</div>
                    <div className="admin-mobile-card-value">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(head.status)}`}>
                        {head.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="admin-mobile-card-actions">
                  <button
                    onClick={() => handleEdit(head)}
                    className="admin-mobile-card-button bg-[#1a1a3e] text-[#8080ff] hover:bg-[#2a2a4e]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteHead(head.id)}
                    className="admin-mobile-card-button bg-[#3a1a1a] text-red-400 hover:bg-[#4a2a2a]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 bg-[#1a1a2e]/70 backdrop-blur-sm rounded-lg">
              <p className="text-gray-400">No association heads found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssociationHeadManagementMobile;
