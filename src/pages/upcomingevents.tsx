import React, { useState, useEffect } from "react";
import { LightRays } from "../components/loading";
import { motion } from "framer-motion";

interface Event {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  imageUrl: string;
  description: string;
  featured: boolean;
  registrationLink: string;
  isRegistrationOpen: boolean;
}

const UpcomingEvents = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchEvents();
  }, [activeFilter]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const url = activeFilter === "all" 
        ? `${API_URL}/api/events`
        : `${API_URL}/api/events?category=${activeFilter}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setEvents(data.events);
      } else {
        setError(data.error || "Failed to fetch events");
      }
    } catch (error) {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = activeFilter === "all" 
    ? events 
    : events.filter(event => event.category === activeFilter);

  const featuredEvents = events.filter(event => event.featured);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-xl">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-xl text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-[#0a0a18] [background:radial-gradient(circle_at_center,_#111133_0%,_#0a0a18_70%,_#050510_100%)] pt-24 pb-16">
      <div className="light-rays-container absolute inset-0 z-0 pointer-events-none">
        <LightRays
          raysColor="#8080ff"
          raysSpeed={0.8}
          lightSpread={2.5}
          rayLength={2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.06}
          distortion={0.04}
          pulsating={true}
          fadeDistance={1.5}
          saturation={0.6}
        />
      </div>

      {/* Hero Section with Featured Events */}
      <div className="relative overflow-hidden mb-16">
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-[#8080ff]/30 via-[#5050aa]/20 to-transparent blur-3xl opacity-60"></div>

        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Upcoming{" "}
            <span className="bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">
              Events
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-center max-w-3xl mx-auto text-white/80 leading-7 mb-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Stay updated with all our upcoming events and activities at KPRIET
          </motion.p>

          {/* Featured Events Carousel */}
          {featuredEvents.length > 0 && (
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-center">
                <span className="inline-block px-4 py-1 rounded-full bg-[#8080ff]/20 border border-[#8080ff]/30">
                  Featured Events
                </span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredEvents.map((event, index) => (
                  <motion.div 
                    key={event._id}
                    className="relative group rounded-2xl overflow-hidden h-80 flex items-end"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-70 group-hover:opacity-80 transition-opacity"></div>
                    <img 
                      src={event.imageUrl} 
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="relative z-10 p-6 w-full">
                      <div className="flex justify-between items-start mb-3">
                        <span className="px-3 py-1 bg-[#8080ff]/50 rounded-full text-xs font-medium backdrop-blur-sm">
                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </span>
                        <span className="px-3 py-1 bg-black/50 rounded-full text-xs font-medium backdrop-blur-sm">
                          {event.startDate}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-[#b1caf8] transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-white/70 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/80">
                          <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </span>
                        <button className="px-4 py-1 bg-[#8080ff]/30 hover:bg-[#8080ff]/40 rounded-full text-white text-sm font-medium border border-[#8080ff]/20 shadow-[0_0_15px_rgba(128,128,255,0.3)] transition-all transform group-hover:scale-105 relative overflow-hidden">
                          <span className="relative z-10">Details</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-6 mb-10 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button 
            onClick={() => setActiveFilter("all")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === "all" 
                ? "bg-[#8080ff]/30 border border-[#8080ff]/20 shadow-[0_0_15px_rgba(128,128,255,0.3)] text-white" 
                : "bg-[#151530]/60 text-white/70 hover:bg-[#151530]/90 hover:text-white"
            }`}
          >
            All Events
          </button>
          <button 
            onClick={() => setActiveFilter("technical")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === "technical" 
                ? "bg-[#8080ff]/30 border border-[#8080ff]/20 shadow-[0_0_15px_rgba(128,128,255,0.3)] text-white" 
                : "bg-[#151530]/60 text-white/70 hover:bg-[#151530]/90 hover:text-white"
            }`}
          >
            Technical
          </button>
          <button 
            onClick={() => setActiveFilter("cultural")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === "cultural" 
                ? "bg-[#8080ff]/30 border border-[#8080ff]/20 shadow-[0_0_15px_rgba(128,128,255,0.3)] text-white" 
                : "bg-[#151530]/60 text-white/70 hover:bg-[#151530]/90 hover:text-white"
            }`}
          >
            Cultural
          </button>
          <button 
            onClick={() => setActiveFilter("sports")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === "sports" 
                ? "bg-[#8080ff]/30 border border-[#8080ff]/20 shadow-[0_0_15px_rgba(128,128,255,0.3)] text-white" 
                : "bg-[#151530]/60 text-white/70 hover:bg-[#151530]/90 hover:text-white"
            }`}
          >
            Sports
          </button>
          <button 
            onClick={() => setActiveFilter("symposium")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === "symposium" 
                ? "bg-[#8080ff]/30 border border-[#8080ff]/20 shadow-[0_0_15px_rgba(128,128,255,0.3)] text-white" 
                : "bg-[#151530]/60 text-white/70 hover:bg-[#151530]/90 hover:text-white"
            }`}
          >
            Symposium
          </button>
          <button 
            onClick={() => setActiveFilter("hackathon")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === "hackathon" 
                ? "bg-[#8080ff]/30 border border-[#8080ff]/20 shadow-[0_0_15px_rgba(128,128,255,0.3)] text-white" 
                : "bg-[#151530]/60 text-white/70 hover:bg-[#151530]/90 hover:text-white"
            }`}
          >
            Hackathon
          </button>
        </div>
      </div>

      {/* Events List */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div 
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-[#151530]/60 backdrop-blur-md rounded-xl overflow-hidden border border-[#8080ff]/20 shadow-lg hover:shadow-[#8080ff]/20 transition-all hover:transform hover:scale-[1.02] group"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#151530] to-transparent opacity-0 group-hover:opacity-60 transition-opacity z-10"></div>
                <img 
                  src={event.imageUrl} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 z-20">
                  <span className="px-3 py-1 bg-[#8080ff]/50 backdrop-blur-sm rounded-full text-xs font-medium">
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#b1caf8] transition-colors">
                  {event.title}
                </h3>
                
                <div className="flex flex-wrap gap-y-2 text-sm text-white/70 mb-3">
                  <div className="w-full flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#8080ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{event.startDate} - {event.endDate}</span>
                  </div>
                  <div className="w-full flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#8080ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{event.startTime} - {event.endTime}</span>
                  </div>
                  <div className="w-full flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#8080ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <p className="text-white/80 text-sm mb-5 line-clamp-3">
                  {event.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/60">
                    {event.registrationLink 
                      ? (event.isRegistrationOpen ? 'Registration open' : 'Registration closed') 
                      : 'No registration required'}
                  </span>
                  {event.registrationLink ? (
                    <a 
                      href={event.isRegistrationOpen ? event.registrationLink : "#"}
                      target={event.isRegistrationOpen ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className={`px-5 py-2 ${
                        event.isRegistrationOpen 
                          ? "bg-[#8080ff]/30 hover:bg-[#8080ff]/40 border border-[#8080ff]/20 shadow-[0_0_15px_rgba(128,128,255,0.3)]" 
                          : "bg-gray-500/30 hover:bg-gray-500/40 border border-gray-500/20 cursor-not-allowed"
                      } rounded-md text-white text-sm font-medium transition-all relative overflow-hidden group`}
                      onClick={(e) => {
                        if (!event.isRegistrationOpen) {
                          e.preventDefault();
                          alert("Registration is currently closed for this event.");
                        }
                      }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8080ff]/20 to-transparent group-hover:via-[#8080ff]/30 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></span>
                      <span className="relative z-10">
                        {event.isRegistrationOpen ? "Register Now" : "Registration Closed"}
                      </span>
                    </a>
                  ) : (
                    <span className="px-5 py-2 bg-gray-500/30 border border-gray-500/20 rounded-md text-gray-300 text-sm font-medium">
                      No Registration Required
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredEvents.length === 0 && (
          <div className="bg-[#151530]/60 backdrop-blur-md rounded-xl p-8 border border-[#8080ff]/20 text-center">
            <svg className="w-16 h-16 mx-auto text-[#8080ff]/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold mb-2">No events found</h3>
            <p className="text-white/70">There are no events in this category at the moment. Please check back later.</p>
          </div>
        )}
      </div>

      {/* Call to Action / Subscribe Section */}
      <div className="max-w-5xl mx-auto px-6 mt-20 relative z-10">
        <div className="bg-[#151530]/60 backdrop-blur-md rounded-2xl p-8 border border-[#8080ff]/30 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#8080ff]/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8080ff]/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
              Never Miss an Event
            </h2>
            <p className="text-center text-white/80 max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter and get notified about upcoming events, workshops, and activities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#8080ff]/50"
              />
              <button className="px-6 py-3 bg-[#8080ff]/30 hover:bg-[#8080ff]/40 rounded-lg text-white font-medium transition-all transform hover:scale-105 whitespace-nowrap border border-[#8080ff]/20 shadow-[0_0_15px_rgba(128,128,255,0.3)] relative overflow-hidden group">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8080ff]/20 to-transparent group-hover:via-[#8080ff]/30 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></span>
                <span className="relative z-10">Subscribe Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;