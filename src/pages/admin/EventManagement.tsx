import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Event {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  category: 'technical' | 'cultural' | 'sports' | 'symposium' | 'hackathon';
  imageUrl: string;
  description: string;
  featured: boolean;
  registrationLink: string;
  isRegistrationOpen: boolean;
  createdBy: {
    _id: string;
    email: string;
  };
  createdAt: string;
}

const EventManagement: React.FC = () => {
  const { token } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    location: '',
    category: 'technical',
    imageFile: null as File | null,
    imagePreview: '',
    description: '',
    featured: false,
    registrationLink: '',
    isRegistrationOpen: true
  });

  const API_URL = 'http://localhost:7000';

  useEffect(() => {
    fetchEvents();
  }, [token]);

  const fetchEvents = async () => {
    if (!token) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/events`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      setError('Failed to load events. Please try again.');
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imageFile: file,
          imagePreview: reader.result as string
        });
      };
      
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      location: '',
      category: 'technical',
      imageFile: null,
      imagePreview: '',
      description: '',
      featured: false,
      registrationLink: '',
      isRegistrationOpen: true
    });
    setEditingEvent(null);
  };

  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (event: Event) => {
    // Convert date strings to YYYY-MM-DD format for the input fields
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toISOString().split('T')[0];
    };

    setFormData({
      title: event.title,
      startDate: formatDate(event.startDate),
      endDate: formatDate(event.endDate),
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      category: event.category,
      imageFile: null,
      imagePreview: event.imageUrl,
      description: event.description,
      featured: event.featured,
      registrationLink: event.registrationLink || '',
      isRegistrationOpen: event.isRegistrationOpen
    });
    
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    resetForm();
  };

  const validateForm = () => {
    // Check if required fields are filled
    if (!formData.title || !formData.startDate || !formData.endDate || 
        !formData.startTime || !formData.endTime || !formData.location || 
        !formData.description) {
      setError('Please fill in all required fields');
      return false;
    }
    
    // If creating a new event, an image is required
    if (!editingEvent && !formData.imageFile && !formData.imagePreview) {
      setError('Please select an image for the event');
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
      // Prepare form data including the base64 image
      const eventData = {
        title: formData.title,
        startDate: formData.startDate,
        endDate: formData.endDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        location: formData.location,
        category: formData.category,
        imageUrl: formData.imageFile ? formData.imagePreview : formData.imagePreview,
        description: formData.description,
        featured: formData.featured,
        registrationLink: formData.registrationLink,
        isRegistrationOpen: formData.isRegistrationOpen
      };
      
      let response;
      
      if (editingEvent) {
        // Update existing event
        response = await fetch(`${API_URL}/admin/events/${editingEvent._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(eventData)
        });
      } else {
        // Create new event
        response = await fetch(`${API_URL}/admin/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(eventData)
        });
      }

      if (!response.ok) {
        throw new Error(editingEvent ? 'Failed to update event' : 'Failed to create event');
      }

      const data = await response.json();
      
      if (editingEvent) {
        // Update the event in the state
        setEvents(events.map(event => 
          event._id === editingEvent._id ? data.event : event
        ));
        setSuccessMessage('Event updated successfully');
      } else {
        // Add the new event to the state
        setEvents([data.event, ...events]);
        setSuccessMessage('Event created successfully');
      }
      
      setShowForm(false);
      resetForm();
    } catch (error) {
      setError(`Failed to ${editingEvent ? 'update' : 'create'} event. Please try again.`);
      console.error(`Error ${editingEvent ? 'updating' : 'creating'} event:`, error);
    } finally {
      setIsLoading(false);
      // Clear success message after a delay
      if (successMessage) {
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!token || !window.confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await fetch(`${API_URL}/admin/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      // Remove the event from the state
      setEvents(events.filter(event => event._id !== eventId));
      setSuccessMessage('Event deleted successfully');
      
      // Clear success message after a delay
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setError('Failed to delete event. Please try again.');
      console.error('Error deleting event:', error);
      
      // Clear error message after a delay
      setTimeout(() => setError(null), 3000);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'technical':
        return 'bg-blue-500/30 text-blue-200 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]';
      case 'cultural':
        return 'bg-purple-500/30 text-purple-200 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.3)]';
      case 'sports':
        return 'bg-green-500/30 text-green-200 border border-green-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
      case 'symposium':
        return 'bg-yellow-500/30 text-yellow-200 border border-yellow-500/20 shadow-[0_0_15px_rgba(245,158,11,0.3)]';
      case 'hackathon':
        return 'bg-red-500/30 text-red-200 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.3)]';
      default:
        return 'bg-gray-500/30 text-gray-200 border border-gray-500/20 shadow-[0_0_15px_rgba(156,163,175,0.3)]';
    }
  };

  if (isLoading && !showForm) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8080ff]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a2e]/50 shadow-lg shadow-purple-500/10 overflow-hidden sm:rounded-lg backdrop-blur-md border border-purple-500/20">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-white">Event Management</h3>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center px-4 py-2 border border-[#8080ff]/20 text-sm font-medium rounded-md shadow-sm text-white bg-[#8080ff]/30 hover:bg-[#8080ff]/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8080ff]/50 shadow-[0_0_15px_rgba(128,128,255,0.3)]"
        >
          Add New Event
        </button>
      </div>

      {error && (
        <div className="mx-4 my-4 p-4 bg-red-500/30 border border-red-500/30 text-white rounded backdrop-blur-sm">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mx-4 my-4 p-4 bg-green-500/30 border border-green-500/30 text-white rounded backdrop-blur-sm">
          {successMessage}
        </div>
      )}

      {showForm ? (
        <div className="p-6 border-t border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-300">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-300">
                  End Date *
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                  className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-300">
                  Start Time *
                </label>
                <input
                  type="time"
                  name="startTime"
                  id="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                  className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-300">
                  End Time *
                </label>
                <input
                  type="time"
                  name="endTime"
                  id="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                  className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                />
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="location" className="block text-sm font-medium text-gray-300">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="category" className="block text-sm font-medium text-gray-300">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-800/50 text-white rounded-md shadow-sm focus:outline-none focus:ring-[#8080ff] focus:border-[#8080ff] sm:text-sm backdrop-blur-sm"
                >
                  <option value="technical">Technical</option>
                  <option value="cultural">Cultural</option>
                  <option value="sports">Sports</option>
                  <option value="symposium">Symposium</option>
                  <option value="hackathon">Hackathon</option>
                </select>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-300">
                  Event Image {!editingEvent && '*'}
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md bg-gray-800/30 backdrop-blur-sm">
                  <div className="space-y-1 text-center">
                    {formData.imagePreview ? (
                      <div>
                        <img 
                          src={formData.imagePreview} 
                          alt="Event preview" 
                          className="mx-auto h-64 w-auto object-cover border border-gray-700 shadow-[0_0_15px_rgba(128,128,255,0.3)] rounded" 
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, imageFile: null, imagePreview: ''})}
                          className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-red-500/20 text-xs font-medium rounded text-red-400 bg-red-500/10 hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
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
                        <div className="flex text-sm text-gray-400">
                          <label
                            htmlFor="imageFile"
                            className="relative cursor-pointer bg-transparent rounded-md font-medium text-[#8080ff] hover:text-[#a0a0ff] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#8080ff]"
                          >
                            <span>Upload a file</span>
                            <input
                              id="imageFile"
                              name="imageFile"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={handleImageChange}
                              required={!editingEvent}
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

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                />
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="registrationLink" className="block text-sm font-medium text-gray-300">
                  Registration Link
                </label>
                <input
                  type="url"
                  name="registrationLink"
                  id="registrationLink"
                  value={formData.registrationLink}
                  onChange={handleInputChange}
                  placeholder="https://forms.example.com/register"
                  className="mt-1 focus:ring-[#8080ff] focus:border-[#8080ff] block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-gray-800/50 text-white backdrop-blur-sm"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Leave empty if no registration is required
                </p>
              </div>

              <div className="sm:col-span-3">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="featured"
                      name="featured"
                      type="checkbox"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="focus:ring-[#8080ff] h-4 w-4 text-[#8080ff] border-gray-700 rounded bg-gray-800/50"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="featured" className="font-medium text-gray-300">
                      Featured Event
                    </label>
                    <p className="text-gray-500">Display this event prominently on the homepage.</p>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="isRegistrationOpen"
                      name="isRegistrationOpen"
                      type="checkbox"
                      checked={formData.isRegistrationOpen}
                      onChange={handleInputChange}
                      className="focus:ring-[#8080ff] h-4 w-4 text-[#8080ff] border-gray-700 rounded bg-gray-800/50"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="isRegistrationOpen" className="font-medium text-gray-300">
                      Registration Open
                    </label>
                    <p className="text-gray-500">Show the registration link to users.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center px-4 py-2 border border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-gray-800/50 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8080ff] backdrop-blur-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-[#8080ff]/20 text-sm font-medium rounded-md shadow-sm text-white bg-[#8080ff]/30 hover:bg-[#8080ff]/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8080ff]/50 shadow-[0_0_15px_rgba(128,128,255,0.3)]"
              >
                {isLoading ? 'Saving...' : editingEvent ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {events.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-[#1a1a2e]/70">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Event
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#1a1a2e]/20 divide-y divide-gray-700">
                {events.map((event) => (
                  <tr key={event._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-full object-cover border border-gray-700 shadow-[0_0_15px_rgba(128,128,255,0.3)]"
                            src={event.imageUrl} 
                            alt={event.title}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{event.title}</div>
                          <div className="text-sm text-gray-400">
                            {event.location} • {event.startTime} - {event.endTime}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {formatDate(event.startDate)}
                      {event.startDate !== event.endDate && ` - ${formatDate(event.endDate)}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryBadgeClass(event.category)}`}>
                        {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        {event.featured && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-500/30 text-yellow-200 border border-yellow-500/20 shadow-[0_0_15px_rgba(245,158,11,0.3)] mb-1">
                            Featured
                          </span>
                        )}
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          event.isRegistrationOpen 
                            ? 'bg-green-500/30 text-green-200 border border-green-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                            : 'bg-red-500/30 text-red-200 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                        }`}>
                          {event.registrationLink 
                            ? (event.isRegistrationOpen ? 'Registration Open' : 'Registration Closed') 
                            : 'No Registration'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(event)}
                        className="text-[#8080ff] hover:text-[#a0a0ff] mr-4 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event._id)}
                        className="text-red-400 hover:text-red-300 hover:underline"
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
              <p className="text-gray-400">No events found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventManagement;
