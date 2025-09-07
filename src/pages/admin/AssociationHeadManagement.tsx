import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

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

const AssociationHeadManagement: React.FC = () => {
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

  const API_URL = 'http://localhost:7000';

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

  // Form handling functions - kept the same logic
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

  // UI interaction functions
  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (head: AssociationHead) => {
    setFormData({
      id: head.id,
      name: head.name,
      role: head.role,
      avatarFile: null,
      avatarPreview: head.avatarBase64,
      handle: head.handle,
      status: head.status,
      class: head.class,
      year: head.year,
      linkedin: head.linkedin || ''
    });
    
    setEditingHead(head);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    resetForm();
  };

  // Form validation and submission
  const validateForm = () => {
    if (!formData.id || !formData.name || !formData.handle || !formData.class || !formData.year) {
      setError('Please fill in all required fields');
      return false;
    }
    
    if (!editingHead && !formData.avatarFile && !formData.avatarPreview) {
      setError('Please select an avatar image');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token || !validateForm()) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const headData = {
        id: formData.id,
        name: formData.name,
        role: formData.role,
        avatarBase64: formData.avatarFile ? formData.avatarPreview : formData.avatarPreview,
        handle: formData.handle,
        status: formData.status,
        class: formData.class,
        year: formData.year,
        linkedin: formData.linkedin
      };
      
      let response;
      
      if (editingHead) {
        response = await fetch(`${API_URL}/admin/association-heads/${editingHead.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(headData)
        });
      } else {
        response = await fetch(`${API_URL}/admin/association-heads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(headData)
        });
      }

      if (!response.ok) {
        throw new Error(editingHead ? 'Failed to update association head' : 'Failed to create association head');
      }

      const data = await response.json();
      
      if (editingHead) {
        setAssociationHeads(associationHeads.map(head => 
          head.id === editingHead.id ? data : head
        ));
        setSuccessMessage('Association head updated successfully');
      } else {
        setAssociationHeads([data, ...associationHeads]);
        setSuccessMessage('Association head created successfully');
      }
      
      setShowForm(false);
      resetForm();
    } catch (error) {
      setError(`Failed to ${editingHead ? 'update' : 'create'} association head. Please try again.`);
      console.error(`Error ${editingHead ? 'updating' : 'creating'} association head:`, error);
    } finally {
      setIsLoading(false);
      if (successMessage) {
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    }
  };

  const handleDeleteHead = async (headId: string) => {
    if (!token || !window.confirm('Are you sure you want to delete this association head?')) return;

    try {
      const response = await fetch(`${API_URL}/admin/association-heads/${headId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete association head');
      }

      setAssociationHeads(associationHeads.filter(head => head.id !== headId));
      setSuccessMessage('Association head deleted successfully');
      
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setError('Failed to delete association head. Please try again.');
      console.error('Error deleting association head:', error);
      
      setTimeout(() => setError(null), 3000);
    }
  };

  // Style helpers
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'President':
        return 'bg-red-500/30 text-red-200 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.3)]';
      case 'Vice President':
        return 'bg-orange-500/30 text-orange-200 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.3)]';
      case 'Secretary':
      case 'Vice Secretary':
        return 'bg-yellow-500/30 text-yellow-200 border border-yellow-500/20 shadow-[0_0_15px_rgba(245,158,11,0.3)]';
      case 'Treasurer':
      case 'Joint Treasurer':
        return 'bg-green-500/30 text-green-200 border border-green-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
      case 'Club Head':
        return 'bg-blue-500/30 text-blue-200 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]';
      default:
        return 'bg-purple-500/30 text-purple-200 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.3)]';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Online':
        return 'bg-green-500/30 text-green-200 border border-green-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
      case 'Away':
        return 'bg-yellow-500/30 text-yellow-200 border border-yellow-500/20 shadow-[0_0_15px_rgba(245,158,11,0.3)]';
      default:
        return 'bg-gray-500/30 text-gray-200 border border-gray-500/20 shadow-[0_0_15px_rgba(156,163,175,0.3)]';
    }
  };

  // Loading state
  if (isLoading && !showForm) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8080ff]"></div>
      </div>
    );
  }

  // UI Rendering
  return (
    <div className="bg-[#1a1a2e]/50 shadow-lg shadow-purple-500/10 overflow-hidden sm:rounded-lg backdrop-blur-md border border-purple-500/20">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-white">Association Head Management</h3>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center px-4 py-2 border border-[#8080ff]/20 text-sm font-medium rounded-md shadow-sm text-white bg-[#8080ff]/30 hover:bg-[#8080ff]/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8080ff]/50 shadow-[0_0_15px_rgba(128,128,255,0.3)]"
        >
          Add New Member
        </button>
      </div>

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

      {showForm ? (
        <div className="p-6 border-t border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
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
                  <p className="mt-1 text-xs text-gray-500">ID cannot be changed after creation.</p>
                )}
              </div>

              <div className="sm:col-span-3">
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

              <div className="sm:col-span-3">
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
                  <option value="Vice Secretary">Vice Secretary</option>
                  <option value="Treasurer">Treasurer</option>
                  <option value="Joint Treasurer">Joint Treasurer</option>
                  <option value="Club Head">Club Head</option>
                  <option value="Member">Member</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="handle" className="block text-sm font-medium text-gray-300">
                  Handle *
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-700 bg-gray-800/70 text-gray-400 sm:text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    name="handle"
                    id="handle"
                    value={formData.handle}
                    onChange={handleInputChange}
                    required
                    className="flex-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-700 bg-gray-800/50 text-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-300">
                  Avatar Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md bg-gray-800/30 backdrop-blur-sm">
                  <div className="space-y-1 text-center">
                    {formData.avatarPreview ? (
                      <div>
                        <img 
                          src={formData.avatarPreview} 
                          alt="Avatar preview" 
                          className="mx-auto h-32 w-32 rounded-full object-cover border border-gray-700 shadow-[0_0_15px_rgba(128,128,255,0.3)]" 
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, avatarFile: null, avatarPreview: ''})}
                          className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="avatarFile"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="avatarFile"
                              name="avatarFile"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={handleAvatarChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
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

              <div className="sm:col-span-3">
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

              <div className="sm:col-span-3">
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

              <div className="sm:col-span-3">
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-300">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  name="linkedin"
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center px-4 py-2 border border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-gray-800/50 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8080ff]/50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#8080ff]/30 hover:bg-[#8080ff]/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8080ff]/50"
              >
                {isLoading ? 'Saving...' : editingHead ? 'Update Member' : 'Create Member'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {associationHeads.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {associationHeads.map((head) => (
                  <tr key={head._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {head.avatarBase64 ? (
                            <img 
                              className="h-10 w-10 rounded-full object-cover"
                              src={head.avatarBase64} 
                              alt={head.name}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                              {head.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{head.name}</div>
                          <div className="text-sm text-gray-500">@{head.handle}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {head.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeClass(head.role)}`}>
                        {head.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {head.class} • {head.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(head.status)}`}>
                        {head.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(head)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteHead(head.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No association heads found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssociationHeadManagement;
