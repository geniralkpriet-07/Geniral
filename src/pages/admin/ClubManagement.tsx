import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface ClubMember {
  name: string;
  class: string;
  role?: string;
  imageBase64: string;
}

interface Faculty {
  name: string;
  dept: string;
  role?: string;
  imageBase64: string;
}

interface Achievement {
  title: string;
  description: string;
  date: string;
}

interface ClubEvent {
  title: string;
  date: string;
  description: string;
}

interface Club {
  _id: string;
  id: string;
  name: string;
  description: string;
  content: string;
  logoBase64: string;
  members: number;
  faculty: Faculty[];
  head: {
    name: string;
    class: string;
    position?: string;
    email?: string;
    imageBase64: string;
  };
  memberList: ClubMember[];
  achievements?: Achievement[];
  events?: ClubEvent[];
  createdAt: string;
}

const ClubManagement: React.FC = () => {
  const { token } = useAuth();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState('basic'); // 'basic', 'members', 'faculty', 'content'
  
  const [showForm, setShowForm] = useState(false);
  const [editingClub, setEditingClub] = useState<Club | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    content: '',
    logoFile: null as File | null,
    logoPreview: '',
    headName: '',
    headClass: '',
    headPosition: '',
    headEmail: '',
    headImageFile: null as File | null,
    headImagePreview: '',
    faculty: [] as Faculty[],
    memberList: [] as ClubMember[]
  });

  const [showMemberForm, setShowMemberForm] = useState(false);
  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [memberFormData, setMemberFormData] = useState({
    name: '',
    class: '',
    role: '',
    imageFile: null as File | null,
    imagePreview: ''
  });
  
  const [showFacultyForm, setShowFacultyForm] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<string | null>(null);
  const [facultyFormData, setFacultyFormData] = useState({
    name: '',
    dept: '',
    role: '',
    imageFile: null as File | null,
    imagePreview: ''
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const [showContentPreview, setShowContentPreview] = useState(false);

  useEffect(() => {
    if (token) {
      fetchClubs();
    }
  }, [token]);

  const fetchClubs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/clubs`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch clubs');
      }

      const data = await response.json();
      setClubs(data.clubs);
    } catch (error) {
      setError('Failed to load clubs. Please try again.');
      console.error('Error fetching clubs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ 
      ...formData, 
      content: e.target.value 
    });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setFormData({
          ...formData,
          logoFile: file,
          logoPreview: reader.result as string
        });
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleHeadImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setFormData({
          ...formData,
          headImageFile: file,
          headImagePreview: reader.result as string
        });
      };
      
      reader.readAsDataURL(file);
    }
  };

  // Member form handling
  const handleMemberInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMemberFormData({ ...memberFormData, [name]: value });
  };

  const handleMemberImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setMemberFormData({
          ...memberFormData,
          imageFile: file,
          imagePreview: reader.result as string
        });
      };
      
      reader.readAsDataURL(file);
    }
  };

  // Faculty form handling
  const handleFacultyInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFacultyFormData({ ...facultyFormData, [name]: value });
  };

  const handleFacultyImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setFacultyFormData({
          ...facultyFormData,
          imageFile: file,
          imagePreview: reader.result as string
        });
      };
      
      reader.readAsDataURL(file);
    }
  };

  // Reset forms
  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      content: '',
      logoFile: null,
      logoPreview: '',
      headName: '',
      headClass: '',
      headPosition: '',
      headEmail: '',
      headImageFile: null,
      headImagePreview: '',
      faculty: [],
      memberList: []
    });
    setEditingClub(null);
    setShowForm(false);
    setActiveTab('basic');
  };

  const resetMemberForm = () => {
    setMemberFormData({
      name: '',
      class: '',
      role: '',
      imageFile: null,
      imagePreview: ''
    });
    setShowMemberForm(false);
    setEditingMember(null);
  };

  const resetFacultyForm = () => {
    setFacultyFormData({
      name: '',
      dept: '',
      role: '',
      imageFile: null,
      imagePreview: ''
    });
    setShowFacultyForm(false);
    setEditingFaculty(null);
  };

  // UI interaction functions
  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (club: Club) => {
    // Make sure we have both id and _id for proper editing
    setFormData({
      id: club.id,
      name: club.name,
      description: club.description,
      content: club.content || '',
      logoFile: null,
      logoPreview: club.logoBase64 || '',
      headName: club.head?.name || '',
      headClass: club.head?.class || '',
      headPosition: club.head?.position || '',
      headEmail: club.head?.email || '',
      headImageFile: null,
      headImagePreview: club.head?.imageBase64 || '',
      faculty: club.faculty || [],
      memberList: club.memberList || []
    });
    
    // Make sure to store the club with both its _id and id
    setEditingClub(club);
    setShowForm(true);
    // Set the active tab to 'basic' to start editing
    setActiveTab('basic');
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleAddMember = () => {
    resetMemberForm();
    setShowMemberForm(true);
  };

  const handleEditMember = (member: ClubMember) => {
    setMemberFormData({
      name: member.name,
      class: member.class,
      role: member.role || '',
      imageFile: null,
      imagePreview: member.imageBase64 || ''
    });
    setEditingMember(member.name);
    setShowMemberForm(true);
  };

  const handleAddFaculty = () => {
    resetFacultyForm();
    setShowFacultyForm(true);
  };

  const handleEditFaculty = (faculty: Faculty) => {
    setFacultyFormData({
      name: faculty.name,
      dept: faculty.dept,
      role: faculty.role || '',
      imageFile: null,
      imagePreview: faculty.imageBase64 || ''
    });
    setEditingFaculty(faculty.name);
    setShowFacultyForm(true);
  };

  // Delete functions
  const handleDeleteClub = async (club: Club) => {
    if (!confirm('Are you sure you want to delete this club? This action cannot be undone.')) {
      return;
    }

    try {
      // Use _id for the API endpoint which is the MongoDB document ID
      const clubId = club._id || club.id;
      const response = await fetch(`${API_URL}/admin/clubs/${clubId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete club');
      }

      setSuccessMessage('Club deleted successfully');
      setClubs(clubs.filter(c => c._id !== club._id));
      
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      setError('Failed to delete club. Please try again.');
      console.error('Error deleting club:', error);
      
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const handleRemoveMember = async (memberName: string) => {
    if (editingClub) {
      try {
        // Use _id for the API endpoint which is the MongoDB document ID
        const clubId = editingClub._id || editingClub.id;
        const encodedMemberName = encodeURIComponent(memberName);
        const response = await fetch(`${API_URL}/admin/clubs/${clubId}/members/${encodedMemberName}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to remove member');
        }

        // Update local state
        setFormData({
          ...formData,
          memberList: formData.memberList.filter(member => member.name !== memberName)
        });

        setSuccessMessage('Member removed successfully');
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (error) {
        setError('Failed to remove member. Please try again.');
        console.error('Error removing member:', error);
        setTimeout(() => setError(null), 3000);
      }
    } else {
      // For new clubs not yet saved, just update the local state
      setFormData({
        ...formData,
        memberList: formData.memberList.filter(member => member.name !== memberName)
      });
    }
  };

  const handleRemoveFaculty = async (facultyName: string) => {
    if (editingClub) {
      try {
        // Use _id for the API endpoint which is the MongoDB document ID
        const clubId = editingClub._id || editingClub.id;
        const encodedFacultyName = encodeURIComponent(facultyName);
        const response = await fetch(`${API_URL}/admin/clubs/${clubId}/faculty/${encodedFacultyName}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Error response:', errorData);
          throw new Error(errorData.message || 'Failed to remove faculty');
        }

        // Update local state
        setFormData({
          ...formData,
          faculty: formData.faculty.filter(faculty => faculty.name !== facultyName)
        });

        setSuccessMessage('Faculty removed successfully');
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (error: any) {
        setError('Failed to remove faculty. Please try again.');
        console.error('Error removing faculty:', error);
        console.log('Request was for club ID:', editingClub._id, 'with faculty name:', facultyName);
        setTimeout(() => setError(null), 3000);
      }
    } else {
      // For new clubs not yet saved, just update the local state
      setFormData({
        ...formData,
        faculty: formData.faculty.filter(faculty => faculty.name !== facultyName)
      });
    }
  };

  // Check if club name already exists (except for the current club being edited)
  const isDuplicateName = (name: string): boolean => {
    if (!editingClub) {
      // For new clubs, check if name exists in any club
      return clubs.some(club => club.name.toLowerCase() === name.toLowerCase());
    } else {
      // For editing, check if name exists in any OTHER club
      return clubs.some(club => 
        club.name.toLowerCase() === name.toLowerCase() && 
        club._id !== editingClub._id
      );
    }
  };

  const validateForm = () => {
    // When editing, we don't need to validate all tabs, only the active one
    if (editingClub) {
      if (activeTab === 'basic') {
        if (!formData.name || !formData.description) {
          setError('Please fill in all required fields');
          return false;
        }
        
        // Check for duplicate name when editing club name
        if (formData.name !== editingClub.name && isDuplicateName(formData.name)) {
          setError('A club with this name already exists. Please choose a different name.');
          return false;
        }
      }
      
      // For editing existing clubs, don't enforce content requirement
      if (activeTab === 'content') {
        return true;
      }
      
      if (activeTab === 'members') {
        if (!formData.headName || !formData.headClass) {
          setError('Please fill in club head information');
          return false;
        }
      }
      
      // For editing existing clubs, don't enforce faculty requirement
      if (activeTab === 'faculty') {
        return true;
      }
      
      setError(null);
      return true;
    }
    
    // For new clubs, use stricter validation across all tabs
    if (!formData.id || !formData.name || !formData.description) {
      setError('Please fill in all required club information');
      return false;
    }
    
    // Check for duplicate ID or name when creating a new club
    if (clubs.some(club => club.id === formData.id)) {
      setError('A club with this ID already exists. Please choose a different ID.');
      return false;
    }
    
    if (isDuplicateName(formData.name)) {
      setError('A club with this name already exists. Please choose a different name.');
      return false;
    }
    
    if (!formData.logoPreview) {
      setError('Please upload a club logo');
      return false;
    }
    
    if (!formData.headName || !formData.headClass) {
      setError('Please fill in club head information');
      return false;
    }
    
    if (formData.faculty.length === 0) {
      setError('Please add at least one faculty coordinator');
      return false;
    }
    
    setError(null);
    return true;
  };

  // Helper function to sanitize HTML content
  const sanitizeHtmlContent = (html: string) => {
    // Basic sanitization to prevent XSS
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/g, '');
  };

  // Function to insert HTML tags at cursor position
  const insertHtmlTag = (tag: string, textarea: HTMLTextAreaElement) => {
    const tagPairs: Record<string, string> = {
      'p': '<p></p>',
      'h1': '<h1></h1>',
      'h2': '<h2></h2>',
      'h3': '<h3></h3>',
      'strong': '<strong></strong>',
      'em': '<em></em>',
      'ul': '<ul>\n  <li></li>\n</ul>',
      'ol': '<ol>\n  <li></li>\n</ol>',
      'li': '<li></li>',
      'a': '<a href=""></a>',
      'hr': '<hr>',
      'br': '<br>'
    };

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = formData.content.substring(startPos, endPos);
    
    let newContent;
    if (tag === 'a' && selectedText) {
      // Special case for links - if text is selected, make it the link text
      newContent = formData.content.substring(0, startPos) + 
                  `<a href="">${selectedText}</a>` + 
                  formData.content.substring(endPos);
    } else if (tagPairs[tag].includes('</')) {
      // For paired tags
      const openTag = tagPairs[tag].substring(0, tagPairs[tag].indexOf('</'));
      const closeTag = tagPairs[tag].substring(tagPairs[tag].indexOf('</'));
      
      newContent = formData.content.substring(0, startPos) + 
                   openTag + selectedText + closeTag + 
                   formData.content.substring(endPos);
    } else {
      // For self-closing tags
      newContent = formData.content.substring(0, startPos) + 
                   tagPairs[tag] + 
                   formData.content.substring(endPos);
    }
    
    setFormData({
      ...formData,
      content: newContent
    });

    // Set focus back and position cursor appropriately
    setTimeout(() => {
      textarea.focus();
      
      // Calculate new cursor position
      let newPosition;
      if (selectedText) {
        // If text was selected, position cursor after the insertion
        newPosition = startPos + tagPairs[tag].length;
      } else if (tag === 'a') {
        // Position cursor in the href attribute for links
        newPosition = startPos + "<a href=\"".length;
      } else if (tagPairs[tag].includes('</')) {
        // For paired tags, position cursor between tags
        newPosition = startPos + tagPairs[tag].indexOf('</');
      } else {
        // For self-closing tags, position cursor after the tag
        newPosition = startPos + tagPairs[tag].length;
      }
      
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token || !validateForm()) return;

    setIsLoading(true);
    setError(null);
    
    try {
      // Prepare form data with sanitized content
      const sanitizedContent = sanitizeHtmlContent(formData.content || '');
      
      const clubData = {
        id: formData.id,
        name: formData.name,
        description: formData.description,
        content: sanitizedContent,
        logoBase64: formData.logoPreview || null,
        members: formData.memberList.length,
        faculty: formData.faculty,
        head: {
          name: formData.headName || '',
          class: formData.headClass || '',
          position: formData.headPosition || '',
          email: formData.headEmail || '',
          imageBase64: formData.headImagePreview || null
        },
        memberList: formData.memberList
      };
      
      let response;
      
      if (editingClub) {
        // When editing, send the relevant data based on which tab is active
        // Make sure we include both _id and id for proper identification
        const changedData: Record<string, any> = { 
          id: editingClub.id,
          _id: editingClub._id 
        };
        
        // Include the fields based on active tab
        if (activeTab === 'basic') {
          changedData.name = clubData.name;
          changedData.description = clubData.description;
          if (formData.logoPreview) {
            changedData.logoBase64 = clubData.logoBase64;
          }
        }
        
        if (activeTab === 'content') {
          changedData.content = sanitizeHtmlContent(clubData.content);
        }
        
        if (activeTab === 'members') {
          changedData.memberList = clubData.memberList;
          changedData.head = clubData.head;
        }
        
        if (activeTab === 'faculty') {
          changedData.faculty = clubData.faculty;
        }

        // Use _id for the API endpoint as that's the MongoDB document ID
        const clubId = editingClub._id || editingClub.id;
        response = await fetch(`${API_URL}/admin/clubs/${clubId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(changedData)
        });
        
        console.log('Updating club with data:', changedData);
      } else {
        response = await fetch(`${API_URL}/admin/clubs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(clubData)
        });
      }
      
      if (!response.ok) {
        const errorData = await response.json();
        // Check for specific error cases
        if (errorData.message && errorData.message.includes('already exists')) {
          throw new Error('A club with this name already exists. Please choose a different name.');
        }
        throw new Error(errorData.message || 'Failed to save club');
      }
      
      const result = await response.json();
      
      if (editingClub) {
        // Update club in state, matching by _id which is the MongoDB identifier
        setClubs(clubs.map(club => 
          club._id === editingClub._id ? result.club : club
        ));
        setSuccessMessage('Club updated successfully');
      } else {
        setClubs([...clubs, result.club]);
        setSuccessMessage('New club created successfully');
      }
      
      resetForm();
      
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error: any) {
      setError(error.message || 'Failed to save club. Please try again.');
      console.error('Error saving club:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitMember = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!memberFormData.name || !memberFormData.class) {
      setError('Please fill in all required member fields');
      return;
    }
    
    const newMember: ClubMember = {
      name: memberFormData.name,
      class: memberFormData.class,
      role: memberFormData.role || 'Member',
      imageBase64: memberFormData.imagePreview || ''
    };
    
    if (editingClub && editingMember) {
      try {
        const clubId = editingClub._id || editingClub.id;
        const encodedMemberName = encodeURIComponent(editingMember);
        const response = await fetch(`${API_URL}/admin/clubs/${clubId}/members/${encodedMemberName}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newMember)
        });
        
        if (!response.ok) {
          throw new Error('Failed to update member');
        }
        
        setFormData({
          ...formData,
          memberList: formData.memberList.map(member => 
            member.name === editingMember ? newMember : member
          )
        });
        
        setSuccessMessage('Member updated successfully');
      } catch (error) {
        setError('Failed to update member. Please try again.');
        console.error('Error updating member:', error);
      }
    } else if (editingClub) {
      try {
        const clubId = editingClub._id || editingClub.id;
        const response = await fetch(`${API_URL}/admin/clubs/${clubId}/members`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newMember)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          throw new Error(errorData.message || 'Failed to add member');
        }
        
        setFormData({
          ...formData,
          memberList: [...formData.memberList, newMember]
        });
        
        setSuccessMessage('Member added successfully');
      } catch (error: any) {
        const errorMsg = error.message || 'Failed to add member. Please try again.';
        setError(errorMsg);
        console.error('Error adding member:', error);
        console.log('Request was for club ID:', editingClub._id, 'with member:', newMember);
      }
    } else {
      setFormData({
        ...formData,
        memberList: [...formData.memberList, newMember]
      });
    }
    
    resetMemberForm();
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleSubmitFaculty = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!facultyFormData.name || !facultyFormData.dept) {
      setError('Please fill in all required faculty fields');
      return;
    }
    
    const newFaculty: Faculty = {
      name: facultyFormData.name,
      dept: facultyFormData.dept,
      role: facultyFormData.role || 'Coordinator',
      imageBase64: facultyFormData.imagePreview || ''
    };
    
    if (editingClub && editingFaculty) {
      // Updating existing faculty
      try {
        // Use _id for the API endpoint which is the MongoDB document ID
        const clubId = editingClub._id || editingClub.id;
        const encodedFacultyName = encodeURIComponent(editingFaculty);
        const response = await fetch(`${API_URL}/admin/clubs/${clubId}/faculty/${encodedFacultyName}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newFaculty)
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Error response:', errorData);
          throw new Error(errorData.message || 'Failed to update faculty');
        }
        
        // Update local state
        setFormData({
          ...formData,
          faculty: formData.faculty.map(faculty => 
            faculty.name === editingFaculty ? newFaculty : faculty
          )
        });
        
        setSuccessMessage('Faculty updated successfully');
      } catch (error: any) {
        setError('Failed to update faculty. Please try again.');
        console.error('Error updating faculty:', error);
        console.log('Request was for club ID:', editingClub._id, 'with faculty name:', editingFaculty);
      }
    } else if (editingClub) {
      // Adding faculty to existing club
      try {
        // Use _id for the API endpoint which is the MongoDB document ID
        const clubId = editingClub._id || editingClub.id;
        const response = await fetch(`${API_URL}/admin/clubs/${clubId}/faculty`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newFaculty)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          throw new Error(errorData.message || 'Failed to add faculty');
        }
        
        // Update local state
        setFormData({
          ...formData,
          faculty: [...formData.faculty, newFaculty]
        });
        
        setSuccessMessage('Faculty added successfully');
      } catch (error: any) {
        const errorMsg = error.message || 'Failed to add faculty. Please try again.';
        setError(errorMsg);
        console.error('Error adding faculty:', error);
        // Add more debugging info
        console.log('Request was for club ID:', editingClub._id, 'with faculty:', newFaculty);
      }
    } else {
      // New club, just update local state
      setFormData({
        ...formData,
        faculty: [...formData.faculty, newFaculty]
      });
    }
    
    resetFacultyForm();
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Helper function to render club content help
  const renderContentHelp = () => {
    return (
      <div className="text-xs text-gray-400 mt-2 bg-gray-800/20 p-3 rounded-md border border-gray-700/50">
        <p className="font-medium mb-1">HTML Formatting Guide:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <p className="font-medium mt-1">Text Formatting:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li><code>&lt;h1&gt;Main Heading&lt;/h1&gt;</code></li>
              <li><code>&lt;h2&gt;Subheading&lt;/h2&gt;</code></li>
              <li><code>&lt;p&gt;Paragraph text&lt;/p&gt;</code></li>
              <li><code>&lt;strong&gt;Bold text&lt;/strong&gt;</code></li>
              <li><code>&lt;em&gt;Italic text&lt;/em&gt;</code></li>
            </ul>
          </div>
          <div>
            <p className="font-medium mt-1">Lists and Links:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li><code>&lt;ul&gt;&lt;li&gt;List item&lt;/li&gt;&lt;/ul&gt;</code></li>
              <li><code>&lt;ol&gt;&lt;li&gt;Numbered item&lt;/li&gt;&lt;/ol&gt;</code></li>
              <li><code>&lt;a href="https://example.com"&gt;Link text&lt;/a&gt;</code></li>
              <li><code>&lt;br&gt;</code> for line breaks</li>
              <li><code>&lt;hr&gt;</code> for horizontal rules</li>
            </ul>
          </div>
        </div>
        <p className="mt-2 text-gray-500">Note: For security reasons, scripts and some advanced HTML features are not supported.</p>
      </div>
    );
  };

  return (
    <div className="container px-4 mx-auto max-w-6xl text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gradient">Club Management</h2>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-[#8080ff]/30 hover:bg-[#8080ff]/40 rounded-md text-white text-sm font-medium transition-all"
        >
          Add New Club
        </button>
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="bg-green-500/20 border border-green-500/30 rounded-md p-3 mb-4">
          <p className="text-sm text-white">{successMessage}</p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-md p-3 mb-4">
          <p className="text-sm text-white">{error}</p>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#8080ff]"></div>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-[#1a1a2e]/40 backdrop-blur-sm rounded-lg p-6 mb-8 border border-[#8080ff]/20 shadow-[0_4px_20px_rgba(128,128,255,0.15)]">
          <h3 className="text-xl font-semibold mb-4 text-white/90">
            {editingClub ? 'Edit Club' : 'Add New Club'}
          </h3>
          
          {/* Tab navigation */}
          <div className="border-b border-gray-700 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                className={`${
                  activeTab === 'basic'
                    ? 'border-[#8080ff] text-[#8080ff]'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('basic')}
              >
                Basic Info
              </button>
              <button
                className={`${
                  activeTab === 'content'
                    ? 'border-[#8080ff] text-[#8080ff]'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('content')}
              >
                Content
              </button>
              <button
                className={`${
                  activeTab === 'members'
                    ? 'border-[#8080ff] text-[#8080ff]'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('members')}
              >
                Members
              </button>
              <button
                className={`${
                  activeTab === 'faculty'
                    ? 'border-[#8080ff] text-[#8080ff]'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('faculty')}
              >
                Faculty
              </button>
            </nav>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="id" className="block text-sm font-medium text-gray-300">
                    Club ID*
                  </label>
                  <input
                    type="text"
                    name="id"
                    id="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    disabled={!!editingClub}
                    className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm disabled:opacity-60"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Unique identifier for the club (e.g., "tech-club")
                  </p>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Club Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                    Short Description*
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={2}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    A brief description (1-2 sentences) that appears in club listings
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="logoFile" className="block text-sm font-medium text-gray-300">
                    Club Logo
                  </label>
                  <input
                    type="file"
                    name="logoFile"
                    id="logoFile"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="mt-1 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#8080ff]/30 file:text-white hover:file:bg-[#8080ff]/40"
                  />
                  {formData.logoPreview && (
                    <div className="mt-2">
                      <img
                        src={formData.logoPreview}
                        alt="Logo preview"
                        className="h-24 w-24 object-cover rounded-md border border-gray-700"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Content Tab */}
            {activeTab === 'content' && (
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                  Club Content
                </label>
                <div className="prose-sm prose-invert max-w-none">
                  <div className="flex justify-end mb-2">
                    <button 
                      type="button"
                      onClick={() => setShowContentPreview(!showContentPreview)}
                      className="text-xs text-[#8080ff] hover:text-[#a0a0ff] underline"
                    >
                      {showContentPreview ? 'Hide Preview' : 'Show Preview'}
                    </button>
                  </div>
                  
                  {/* HTML Toolbar */}
                  <div className="flex flex-wrap gap-1 mb-2 p-2 bg-gray-800/30 rounded-md border border-gray-700/50">
                    <button 
                      type="button" 
                      onClick={(e) => {
                        const textarea = document.getElementById('content') as HTMLTextAreaElement;
                        insertHtmlTag('p', textarea);
                      }}
                      className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded border border-gray-700"
                      title="Paragraph"
                    >
                      P
                    </button>
                    <button 
                      type="button" 
                      onClick={(e) => {
                        const textarea = document.getElementById('content') as HTMLTextAreaElement;
                        insertHtmlTag('h1', textarea);
                      }}
                      className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded border border-gray-700"
                      title="Heading 1"
                    >
                      H1
                    </button>
                    <button 
                      type="button" 
                      onClick={(e) => {
                        const textarea = document.getElementById('content') as HTMLTextAreaElement;
                        insertHtmlTag('h2', textarea);
                      }}
                      className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded border border-gray-700"
                      title="Heading 2"
                    >
                      H2
                    </button>
                    <button 
                      type="button" 
                      onClick={(e) => {
                        const textarea = document.getElementById('content') as HTMLTextAreaElement;
                        insertHtmlTag('strong', textarea);
                      }}
                      className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded border border-gray-700 font-bold"
                      title="Bold"
                    >
                      B
                    </button>
                    <button 
                      type="button" 
                      onClick={(e) => {
                        const textarea = document.getElementById('content') as HTMLTextAreaElement;
                        insertHtmlTag('em', textarea);
                      }}
                      className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded border border-gray-700 italic"
                      title="Italic"
                    >
                      I
                    </button>
                    <button 
                      type="button" 
                      onClick={(e) => {
                        const textarea = document.getElementById('content') as HTMLTextAreaElement;
                        insertHtmlTag('ul', textarea);
                      }}
                      className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded border border-gray-700"
                      title="Unordered List"
                    >
                      UL
                    </button>
                    <button 
                      type="button" 
                      onClick={(e) => {
                        const textarea = document.getElementById('content') as HTMLTextAreaElement;
                        insertHtmlTag('ol', textarea);
                      }}
                      className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded border border-gray-700"
                      title="Ordered List"
                    >
                      OL
                    </button>
                    <button 
                      type="button" 
                      onClick={(e) => {
                        const textarea = document.getElementById('content') as HTMLTextAreaElement;
                        insertHtmlTag('li', textarea);
                      }}
                      className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded border border-gray-700"
                      title="List Item"
                    >
                      LI
                    </button>
                    <button 
                      type="button" 
                      onClick={(e) => {
                        const textarea = document.getElementById('content') as HTMLTextAreaElement;
                        insertHtmlTag('a', textarea);
                      }}
                      className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded border border-gray-700 underline"
                      title="Link"
                    >
                      Link
                    </button>
                    <button 
                      type="button" 
                      onClick={(e) => {
                        const textarea = document.getElementById('content') as HTMLTextAreaElement;
                        insertHtmlTag('br', textarea);
                      }}
                      className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded border border-gray-700"
                      title="Line Break"
                    >
                      BR
                    </button>
                    <button 
                      type="button" 
                      onClick={(e) => {
                        const textarea = document.getElementById('content') as HTMLTextAreaElement;
                        insertHtmlTag('hr', textarea);
                      }}
                      className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded border border-gray-700"
                      title="Horizontal Rule"
                    >
                      HR
                    </button>
                  </div>
                  
                  <textarea
                    id="content"
                    value={formData.content}
                    onChange={handleContentChange}
                    className="w-full h-64 p-3 bg-gray-800/50 rounded-md border border-gray-700 text-white resize-y"
                    placeholder="Enter club content here..."
                  />
                  
                  {showContentPreview && (
                    <div className="mt-4 p-4 bg-gray-800/30 border border-gray-700 rounded-md">
                      <h4 className="text-sm font-medium mb-2 text-gray-300">Preview:</h4>
                      <div 
                        className="prose prose-sm prose-invert max-w-none overflow-auto"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(formData.content || '') }}
                      />
                    </div>
                  )}
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  This content will be displayed on the club's detail page. Basic HTML formatting is supported.
                </p>
                {renderContentHelp()}
              </div>
            )}

            {/* Members Tab */}
            {activeTab === 'members' && (
              <div>
                <div className="mb-6">
                  <h4 className="text-md font-medium text-white/90 mb-2">Club Head Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-800/30 rounded-md p-4 border border-gray-700/50">
                    <div>
                      <label htmlFor="headName" className="block text-sm font-medium text-gray-300">
                        Name*
                      </label>
                      <input
                        type="text"
                        name="headName"
                        id="headName"
                        value={formData.headName}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="headClass" className="block text-sm font-medium text-gray-300">
                        Class*
                      </label>
                      <input
                        type="text"
                        name="headClass"
                        id="headClass"
                        placeholder="e.g., 'III CS-A'"
                        value={formData.headClass}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="headPosition" className="block text-sm font-medium text-gray-300">
                        Position
                      </label>
                      <input
                        type="text"
                        name="headPosition"
                        id="headPosition"
                        placeholder="e.g., 'Club Head'"
                        value={formData.headPosition}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="headEmail" className="block text-sm font-medium text-gray-300">
                        Email
                      </label>
                      <input
                        type="email"
                        name="headEmail"
                        id="headEmail"
                        value={formData.headEmail}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="headImageFile" className="block text-sm font-medium text-gray-300">
                        Photo
                      </label>
                      <div className="mt-1 flex items-center">
                        {formData.headImagePreview && (
                          <img
                            src={formData.headImagePreview}
                            alt="Club head"
                            className="h-16 w-16 rounded-full object-cover mr-4 border border-gray-700"
                          />
                        )}
                        <input
                          type="file"
                          name="headImageFile"
                          id="headImageFile"
                          accept="image/*"
                          onChange={handleHeadImageChange}
                          className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#8080ff]/30 file:text-white hover:file:bg-[#8080ff]/40"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-md font-medium text-white/90">Club Members</h4>
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="px-3 py-1 bg-[#8080ff]/30 hover:bg-[#8080ff]/40 rounded-md text-white text-xs font-medium transition-all"
                    >
                      Add Member
                    </button>
                  </div>
                  
                  {formData.memberList.length > 0 ? (
                    <div className="bg-gray-800/30 rounded-md p-3 border border-gray-700/50">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {formData.memberList.map((member, index) => (
                          <li key={index} className="py-2 px-2 flex justify-between items-center rounded-md hover:bg-gray-700/20">
                            <div className="flex items-center">
                              {member.imageBase64 ? (
                                <img
                                  src={member.imageBase64}
                                  alt={member.name}
                                  className="h-10 w-10 rounded-full mr-3 object-cover border border-gray-700"
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-700 mr-3 flex items-center justify-center">
                                  <span className="text-xs">{member.name.charAt(0)}</span>
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-medium">{member.name}</p>
                                <div className="flex items-center text-xs text-gray-400">
                                  <span>{member.class}</span>
                                  {member.role && (
                                    <>
                                      <span className="mx-1">•</span>
                                      <span>{member.role}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                type="button"
                                onClick={() => handleEditMember(member)}
                                className="text-[#8080ff] hover:text-[#a0a0ff] text-xs"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveMember(member.name)}
                                className="text-red-400 hover:text-red-300 text-xs"
                              >
                                Remove
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic">No members added yet</p>
                  )}
                </div>
              </div>
            )}

            {/* Faculty Tab */}
            {activeTab === 'faculty' && (
              <div>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-md font-medium text-white/90">Faculty Coordinators</h4>
                    <button
                      type="button"
                      onClick={handleAddFaculty}
                      className="px-3 py-1 bg-[#8080ff]/30 hover:bg-[#8080ff]/40 rounded-md text-white text-xs font-medium transition-all"
                    >
                      Add Faculty
                    </button>
                  </div>
                  
                  {formData.faculty.length > 0 ? (
                    <div className="bg-gray-800/30 rounded-md p-3 border border-gray-700/50">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {formData.faculty.map((faculty, index) => (
                          <li key={index} className="py-2 px-2 flex justify-between items-center rounded-md hover:bg-gray-700/20">
                            <div className="flex items-center">
                              {faculty.imageBase64 ? (
                                <img
                                  src={faculty.imageBase64}
                                  alt={faculty.name}
                                  className="h-10 w-10 rounded-full mr-3 object-cover border border-gray-700"
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-700 mr-3 flex items-center justify-center">
                                  <span className="text-xs">{faculty.name.charAt(0)}</span>
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-medium">{faculty.name}</p>
                                <div className="flex items-center text-xs text-gray-400">
                                  <span>Dept: {faculty.dept}</span>
                                  {faculty.role && (
                                    <>
                                      <span className="mx-1">•</span>
                                      <span>{faculty.role}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                type="button"
                                onClick={() => handleEditFaculty(faculty)}
                                className="text-[#8080ff] hover:text-[#a0a0ff] text-xs"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveFaculty(faculty.name)}
                                className="text-red-400 hover:text-red-300 text-xs"
                              >
                                Remove
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic">No faculty coordinators added yet</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 text-sm font-medium hover:bg-gray-800/50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#8080ff]/30 hover:bg-[#8080ff]/40 rounded-md text-white text-sm font-medium transition-all"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : (editingClub ? 'Update Club' : 'Create Club')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Member Form Modal */}
      {showMemberForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#1a1a2e] rounded-lg p-6 max-w-md w-full border border-[#8080ff]/20 shadow-[0_4px_20px_rgba(128,128,255,0.15)]">
            <h3 className="text-lg font-semibold mb-4 text-white/90">
              {editingMember ? 'Edit Club Member' : 'Add Club Member'}
            </h3>
            
            <form onSubmit={handleSubmitMember}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="memberName" className="block text-sm font-medium text-gray-300">
                    Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="memberName"
                    value={memberFormData.name}
                    onChange={handleMemberInputChange}
                    className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="memberClass" className="block text-sm font-medium text-gray-300">
                    Class*
                  </label>
                  <input
                    type="text"
                    name="class"
                    id="memberClass"
                    value={memberFormData.class}
                    onChange={handleMemberInputChange}
                    placeholder="e.g., III CS-A"
                    className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="memberRole" className="block text-sm font-medium text-gray-300">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    id="memberRole"
                    value={memberFormData.role}
                    onChange={handleMemberInputChange}
                    placeholder="e.g., 'Member'"
                    className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                  />
                </div>

                <div>
                  <label htmlFor="memberImageFile" className="block text-sm font-medium text-gray-300">
                    Image (Optional)
                  </label>
                  <input
                    type="file"
                    name="imageFile"
                    id="memberImageFile"
                    accept="image/*"
                    onChange={handleMemberImageChange}
                    className="mt-1 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#8080ff]/30 file:text-white hover:file:bg-[#8080ff]/40"
                  />
                  {memberFormData.imagePreview && (
                    <div className="mt-2">
                      <img
                        src={memberFormData.imagePreview}
                        alt="Member preview"
                        className="h-12 w-12 object-cover rounded-full border border-gray-700"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetMemberForm}
                  className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 text-sm font-medium hover:bg-gray-800/50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#8080ff]/30 hover:bg-[#8080ff]/40 rounded-md text-white text-sm font-medium transition-all"
                >
                  {editingMember ? 'Update Member' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Faculty Form Modal */}
      {showFacultyForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#1a1a2e] rounded-lg p-6 max-w-md w-full border border-[#8080ff]/20 shadow-[0_4px_20px_rgba(128,128,255,0.15)]">
            <h3 className="text-lg font-semibold mb-4 text-white/90">
              {editingFaculty ? 'Edit Faculty Coordinator' : 'Add Faculty Coordinator'}
            </h3>
            
            <form onSubmit={handleSubmitFaculty}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="facultyName" className="block text-sm font-medium text-gray-300">
                    Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="facultyName"
                    value={facultyFormData.name}
                    onChange={handleFacultyInputChange}
                    className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="facultyDept" className="block text-sm font-medium text-gray-300">
                    Department*
                  </label>
                  <input
                    type="text"
                    name="dept"
                    id="facultyDept"
                    value={facultyFormData.dept}
                    onChange={handleFacultyInputChange}
                    placeholder="e.g., CSE"
                    className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="facultyRole" className="block text-sm font-medium text-gray-300">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    id="facultyRole"
                    value={facultyFormData.role}
                    onChange={handleFacultyInputChange}
                    placeholder="e.g., 'Coordinator'"
                    className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                  />
                </div>

                <div>
                  <label htmlFor="facultyImageFile" className="block text-sm font-medium text-gray-300">
                    Image (Optional)
                  </label>
                  <input
                    type="file"
                    name="imageFile"
                    id="facultyImageFile"
                    accept="image/*"
                    onChange={handleFacultyImageChange}
                    className="mt-1 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#8080ff]/30 file:text-white hover:file:bg-[#8080ff]/40"
                  />
                  {facultyFormData.imagePreview && (
                    <div className="mt-2">
                      <img
                        src={facultyFormData.imagePreview}
                        alt="Faculty preview"
                        className="h-12 w-12 object-cover rounded-full border border-gray-700"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetFacultyForm}
                  className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 text-sm font-medium hover:bg-gray-800/50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#8080ff]/30 hover:bg-[#8080ff]/40 rounded-md text-white text-sm font-medium transition-all"
                >
                  {editingFaculty ? 'Update Faculty' : 'Add Faculty'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Club List */}
      {!isLoading && clubs.length > 0 && (
        <div className="bg-[#1a1a2e]/40 backdrop-blur-sm rounded-lg border border-[#8080ff]/20 shadow-[0_4px_20px_rgba(128,128,255,0.15)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700/50">
              <thead className="bg-[#1a1a2e]/60">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Club
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Head
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Members
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Faculty
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#1a1a2e]/20 backdrop-blur-sm divide-y divide-gray-700/50">
                {clubs.map((club) => (
                  <tr key={club._id} className="hover:bg-[#1a1a2e]/40 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {club.logoBase64 ? (
                          <img
                            src={club.logoBase64}
                            alt={club.name}
                            className="h-10 w-10 rounded-full mr-3 object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-700 mr-3 flex items-center justify-center">
                            <span>{club.name.charAt(0)}</span>
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-white">{club.name}</div>
                          <div className="text-xs text-gray-400">{club.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{club.head.name}</div>
                      <div className="text-xs text-gray-400">{club.head.class}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-500/30 text-blue-200 border border-blue-500/20">
                        {club.members} members
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white">
                        {club.faculty.map(f => f.name).join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(club)}
                        className="text-[#8080ff] hover:text-[#a0a0ff] mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClub(club)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && clubs.length === 0 && (
        <div className="bg-[#1a1a2e]/40 backdrop-blur-sm rounded-lg p-8 text-center border border-[#8080ff]/20 shadow-[0_4px_20px_rgba(128,128,255,0.15)]">
          <div className="mx-auto h-12 w-12 rounded-full bg-[#8080ff]/20 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#8080ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-white">No clubs found</h3>
          <p className="mt-1 text-sm text-gray-400">Get started by creating a new club.</p>
          <div className="mt-6">
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-[#8080ff]/30 hover:bg-[#8080ff]/40 rounded-md text-white text-sm font-medium transition-all inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add New Club
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubManagement;