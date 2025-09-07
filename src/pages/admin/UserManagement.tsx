import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface User {
  _id: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

const UserManagement: React.FC = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    if (!token) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      setError('Failed to load users. Please try again.');
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/admin/users/${userId}/toggle-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update user status');
      }

      // Update the user in the state
      setUsers(users.map(user => 
        user._id === userId ? { ...user, isActive: !currentStatus } : user
      ));

      setSuccessMessage(`User status updated successfully`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setError('Failed to update user status. Please try again.');
      console.error('Error updating user status:', error);
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!token || !window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`${API_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Remove the user from the state
      setUsers(users.filter(user => user._id !== userId));

      setSuccessMessage('User deleted successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setError('Failed to delete user. Please try again.');
      console.error('Error deleting user:', error);
      setTimeout(() => setError(null), 3000);
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/30 text-red-200 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.3)]';
      case 'moderator':
        return 'bg-yellow-500/30 text-yellow-200 border border-yellow-500/20 shadow-[0_0_15px_rgba(245,158,11,0.3)]';
      default:
        return 'bg-green-500/30 text-green-200 border border-green-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8080ff]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a2e]/50 shadow-lg shadow-purple-500/10 overflow-hidden sm:rounded-lg backdrop-blur-md border border-purple-500/20">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-white">User Management</h3>
        <span className="text-sm text-gray-400">{users.length} users</span>
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

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-[#1a1a2e]/70">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Created At
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#1a1a2e]/20 divide-y divide-gray-700">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeClass(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActive ? 'bg-green-500/30 text-green-200 border border-green-500/20' : 'bg-gray-500/30 text-gray-200 border border-gray-500/20'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleToggleStatus(user._id, user.isActive)}
                    className="text-[#8080ff] hover:text-[#a0a0ff] mr-4 hover:underline"
                  >
                    {user.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  {user.role !== 'admin' && (
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="text-red-400 hover:text-red-300 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {users.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-400">No users found</p>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
