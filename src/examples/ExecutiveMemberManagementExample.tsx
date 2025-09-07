// Example Admin Component using apiService
// Copy this approach to update your admin components

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../utils/api';

interface ExecutiveMember {
  _id: string;
  name: string;
  class: string;
  role: string;
  // Add other fields as needed
}

const ExecutiveMemberManagementExample: React.FC = () => {
  const { token } = useAuth();
  const [members, setMembers] = useState<ExecutiveMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchMembers();
    }
  }, [token]);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      // Use apiService.get instead of fetch
      const data = await apiService.get('/admin/executive-members');
      setMembers(data.members || []);
    } catch (error: any) {
      console.error('Error fetching executive members:', error);
      setError(error.message || 'Failed to fetch executive members');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (memberId: string) => {
    try {
      // Use apiService.delete instead of fetch
      await apiService.delete(`/admin/executive-members/${memberId}`);
      setMembers(members.filter(member => member._id !== memberId));
      // Show success message
    } catch (error: any) {
      setError(error.message || 'Failed to delete executive member');
    }
  };

  const handleSubmit = async (memberData: any) => {
    try {
      let response;
      
      if (memberData._id) {
        // Update existing member - use apiService.put instead of fetch
        response = await apiService.put(`/admin/executive-members/${memberData._id}`, memberData);
        setMembers(members.map(member => 
          member._id === memberData._id ? { ...member, ...response.member } : member
        ));
      } else {
        // Create new member - use apiService.post instead of fetch
        response = await apiService.post('/admin/executive-members', memberData);
        setMembers([...members, response.member]);
      }
      // Show success message
    } catch (error: any) {
      setError(error.message || 'Failed to save executive member');
    }
  };

  // Rest of component (UI, form handling, etc.)
  return (
    <div>
      {/* Your UI here */}
    </div>
  );
};

export default ExecutiveMemberManagementExample;
