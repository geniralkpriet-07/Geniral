import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
// import { API_URL } from '../../config/constants';

interface ExecutiveMember {
  _id: string;
  name: string;
  class: string;
  role: string;
  year?: string;
  avatarBase64?: string;
  status: 'Online' | 'Away' | 'Offline';
  linkedin?: string;
  createdAt: string;
  updatedAt: string;
}

const ExecutiveMemberManagement: React.FC = () => {
    const API_URL=import.meta.env.VITE_API_URL;
  const { token } = useAuth();
  const [members, setMembers] = useState<ExecutiveMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    role: 'Member',
    year: '',
    avatarPreview: '',
    status: 'Offline',
    linkedin: ''
  });
  
  const [editingMember, setEditingMember] = useState<ExecutiveMember | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (token) {
      fetchMembers();
    }
  }, [token]);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/executive-members`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch executive members');
      }

      const data = await response.json();
      setMembers(data.members);
      setError(null);
    } catch (error: any) {
      console.error('Error fetching executive members:', error);
      setError(error.message || 'Failed to load executive members');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({
            ...prev,
            avatarPreview: event.target?.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      class: '',
      role: 'Member',
      year: '',
      avatarPreview: '',
      status: 'Offline',
      linkedin: ''
    });
    setEditingMember(null);
  };

  const handleEditMember = (member: ExecutiveMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      class: member.class,
      role: member.role,
      year: member.year || '',
      avatarPreview: member.avatarBase64 || '',
      status: member.status,
      linkedin: member.linkedin || ''
    });
  };

  const handleDeleteConfirm = (memberId: string) => {
    setShowDeleteConfirm(memberId);
  };

  const handleDeleteMember = async (memberId: string) => {
    try {
      const response = await fetch(`${API_URL}/admin/executive-members/${memberId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete executive member');
      }

      setMembers(members.filter(member => member._id !== memberId));
      setSuccessMessage('Executive member deleted successfully');
      setShowDeleteConfirm(null);
      
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error: any) {
      console.error('Error deleting executive member:', error);
      setError(error.message || 'Failed to delete executive member');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.class.trim()) {
      setError('Class is required');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !token) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const memberData = {
        name: formData.name,
        class: formData.class,
        role: formData.role,
        year: formData.year,
        avatarBase64: formData.avatarPreview,
        status: formData.status,
        linkedin: formData.linkedin
      };

      let response;
      
      if (editingMember) {
        response = await fetch(`${API_URL}/admin/executive-members/${editingMember._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(memberData)
        });
      } else {
        response = await fetch(`${API_URL}/admin/executive-members`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(memberData)
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save executive member');
      }

      const result = await response.json();
      
      if (editingMember) {
        setMembers(members.map(member => 
          member._id === editingMember._id ? result.member : member
        ));
        setSuccessMessage('Executive member updated successfully');
      } else {
        setMembers([...members, result.member]);
        setSuccessMessage('New executive member created successfully');
      }
      
      resetForm();
      
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error: any) {
      setError(error.message || 'Failed to save executive member. Please try again.');
      console.error('Error saving executive member:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">
          {editingMember ? 'Edit Executive Member' : 'Add New Executive Member'}
        </h2>
        {editingMember && (
          <button
            onClick={resetForm}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-md p-4">
          <p className="text-sm text-white">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-500/20 border border-green-500/50 rounded-md p-4">
          <p className="text-sm text-white">{successMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#8080ff]"
              required
            />
          </div>

          <div>
            <label htmlFor="class" className="block text-sm font-medium text-gray-300 mb-1">
              Class *
            </label>
            <input
              type="text"
              id="class"
              name="class"
              value={formData.class}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#8080ff]"
              required
              placeholder="e.g., III CS-A"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#8080ff]"
            >
              <option value="Member">Member</option>
              <option value="President">President</option>
              <option value="Vice President">Vice President</option>
              <option value="Secretary">Secretary</option>
              <option value="Vice Secretary">Vice Secretary</option>
              <option value="Treasurer">Treasurer</option>
              <option value="Joint Treasurer">Joint Treasurer</option>
            </select>
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-1">
              Year
            </label>
            <input
              type="text"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#8080ff]"
              placeholder="e.g., First Year, Second Year"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#8080ff]"
            >
              <option value="Online">Online</option>
              <option value="Away">Away</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-300 mb-1">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#8080ff]"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Profile Picture
          </label>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              {formData.avatarPreview ? (
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#8080ff]">
                  <img
                    src={formData.avatarPreview}
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
            <div className="flex-grow">
              <input
                type="file"
                id="avatar"
                name="avatar"
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />
              <label
                htmlFor="avatar"
                className="inline-block px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 cursor-pointer transition"
              >
                Choose Image
              </label>
              {formData.avatarPreview && (
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, avatarPreview: '' }))}
                  className="ml-2 px-4 py-2 bg-red-500/20 text-white rounded-md hover:bg-red-500/30 transition"
                >
                  Remove
                </button>
              )}
              <p className="mt-2 text-xs text-gray-400">
                Upload a profile picture. Recommended size: 400x400px (square).
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 bg-[#8080ff]/80 text-white rounded-md hover:bg-[#8080ff] transition ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : editingMember ? 'Update Member' : 'Add Member'}
          </button>
        </div>
      </form>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-white mb-4">Executive Members</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#8080ff]"></div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-700">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Member
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Class
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-800">
                {members.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-400">
                      No executive members found
                    </td>
                  </tr>
                ) : (
                  members.map(member => (
                    <tr key={member._id} className="hover:bg-gray-800/70">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden border border-gray-700">
                            {member.avatarBase64 ? (
                              <img src={member.avatarBase64} alt={member.name} className="h-10 w-10 object-cover" />
                            ) : (
                              <div className="h-10 w-10 bg-gray-700 flex items-center justify-center">
                                <span className="text-xs text-gray-400">{member.name.charAt(0)}</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{member.name}</div>
                            <div className="text-xs text-gray-400">{member.year || 'No year specified'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {member.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {member.class}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          member.status === 'Online' 
                            ? 'bg-green-900/50 text-green-300' 
                            : member.status === 'Away'
                            ? 'bg-yellow-900/50 text-yellow-300'
                            : 'bg-gray-700 text-gray-300'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditMember(member)}
                          className="text-[#8080ff] hover:text-[#9f9fff] mr-3"
                        >
                          Edit
                        </button>
                        {showDeleteConfirm === member._id ? (
                          <div className="inline-flex items-center space-x-2">
                            <span className="text-xs text-red-400">Confirm?</span>
                            <button
                              onClick={() => handleDeleteMember(member._id)}
                              className="text-red-500 hover:text-red-400"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(null)}
                              className="text-gray-400 hover:text-gray-300"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleDeleteConfirm(member._id)}
                            className="text-red-500 hover:text-red-400"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutiveMemberManagement;