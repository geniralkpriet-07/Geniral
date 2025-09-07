import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import UserManagement from './UserManagement';
import EventManagement from './EventManagement';
import AssociationHeadManagement from './AssociationHeadManagement';
import ClubManagement from './ClubManagement';
import { Navigate } from 'react-router-dom';
import LightRays from '../../components/loading/LightRays';

// Enhanced animated light ray component
const AnimatedLightRays = () => {
  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden">

         <LightRays
              raysColor="#8080ff"
              raysSpeed={0.6}
              lightSpread={1.0}
              rayLength={1}
              followMouse={false}
              mouseInfluence={0}
              noiseAmount={0.04}
              distortion={0.02}
              pulsating={true}
              fadeDistance={0.8}
              saturation={0.4}
              className="nav-rays"
            />
        <div className="absolute inset-0 opacity-15 bg-gradient-to-r from-purple-500/20 via-indigo-500/10 to-blue-500/20 animate-pulse-slow"></div>
        
        {/* Diagonal rays */}
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[140%] bg-gradient-to-br from-purple-600/10 via-indigo-500/5 to-transparent rotate-[20deg] transform-gpu animate-ray-move-slow"></div>
        <div className="absolute -top-[20%] -right-[20%] w-[80%] h-[140%] bg-gradient-to-bl from-blue-600/10 via-violet-500/5 to-transparent -rotate-[20deg] transform-gpu animate-ray-move-slow-reverse"></div>
        
        {/* Spotlight effects */}
        <div className="absolute top-[5%] left-[10%] w-[40%] h-[30%] rounded-full bg-gradient-radial from-purple-500/10 to-transparent blur-2xl transform-gpu animate-spotlight"></div>
        <div className="absolute bottom-[5%] right-[10%] w-[40%] h-[30%] rounded-full bg-gradient-radial from-blue-500/10 to-transparent blur-2xl transform-gpu animate-spotlight-reverse"></div>
      </div>
      
      {/* Overlay grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
    </>
  );
};

const AdminDashboard: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('users');

  // Add custom CSS for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ray-move-slow {
        0% { transform: translateX(-5%) rotate(20deg); opacity: 0.05; }
        50% { transform: translateX(0%) rotate(20deg); opacity: 0.15; }
        100% { transform: translateX(-5%) rotate(20deg); opacity: 0.05; }
      }
      
      @keyframes ray-move-slow-reverse {
        0% { transform: translateX(5%) rotate(-20deg); opacity: 0.05; }
        50% { transform: translateX(0%) rotate(-20deg); opacity: 0.15; }
        100% { transform: translateX(5%) rotate(-20deg); opacity: 0.05; }
      }
      
      @keyframes spotlight {
        0% { opacity: 0.05; transform: scale(1); }
        50% { opacity: 0.15; transform: scale(1.1); }
        100% { opacity: 0.05; transform: scale(1); }
      }
      
      @keyframes spotlight-reverse {
        0% { opacity: 0.05; transform: scale(1.1); }
        50% { opacity: 0.15; transform: scale(1); }
        100% { opacity: 0.05; transform: scale(1.1); }
      }
      
      @keyframes pulse-slow {
        0% { opacity: 0.1; }
        50% { opacity: 0.2; }
        100% { opacity: 0.1; }
      }
      
      .animate-ray-move-slow {
        animation: ray-move-slow 8s ease-in-out infinite;
      }
      
      .animate-ray-move-slow-reverse {
        animation: ray-move-slow-reverse 8s ease-in-out infinite;
      }
      
      .animate-spotlight {
        animation: spotlight 10s ease-in-out infinite;
      }
      
      .animate-spotlight-reverse {
        animation: spotlight-reverse 10s ease-in-out infinite;
      }
      
      .animate-pulse-slow {
        animation: pulse-slow 6s ease-in-out infinite;
      }
      
      .bg-grid-pattern {
        background-image: 
          linear-gradient(to right, rgba(128, 128, 255, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(128, 128, 255, 0.05) 1px, transparent 1px);
        background-size: 24px 24px;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0d0c20]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#8080ff]"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0d0c20] pt-24 relative overflow-hidden">
      {/* Background effects for the entire page */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AnimatedLightRays />
      </div>
      
      <div className="absolute inset-0 z-0">
        <LightRays className="header-rays" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 bg-white/10 backdrop-blur-md rounded-xl">
        <div className="flex justify-between h-20">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-white drop-shadow-[0_0_30px_rgba(161,196,253,0.5)]">
                Admin Dashboard
              </h1>
            </div>
          </div>
          <div className="flex items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#8080ff]/30 text-white border border-[#8080ff]/20 shadow-[0_0_15px_rgba(128,128,255,0.3)]">
              {user?.email}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="border-b border-gray-700/50 relative overflow-hidden rounded-t-lg backdrop-blur-sm">
          <div className="absolute inset-0 bg-[#1a1a2e]/30 pointer-events-none"></div>
          <nav className="-mb-px flex space-x-8 relative z-10 px-4">
            <button
              onClick={() => setActiveTab('users')}
              className={`${
                activeTab === 'users'
                  ? 'border-[#8080ff] text-[#8080ff] shadow-[0_0_15px_rgba(128,128,255,0.3)]'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`${
                activeTab === 'events'
                  ? 'border-[#8080ff] text-[#8080ff] shadow-[0_0_15px_rgba(128,128,255,0.3)]'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300`}
            >
              Event Management
            </button>
            <button
              onClick={() => setActiveTab('association')}
              className={`${
                activeTab === 'association'
                  ? 'border-[#8080ff] text-[#8080ff] shadow-[0_0_15px_rgba(128,128,255,0.3)]'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300`}
            >
              Association Management
            </button>
            <button
              onClick={() => setActiveTab('clubs')}
              className={`${
                activeTab === 'clubs'
                  ? 'border-[#8080ff] text-[#8080ff] shadow-[0_0_15px_rgba(128,128,255,0.3)]'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300`}
            >
              Club Management
            </button>
          </nav>
        </div>

        <div className="py-6 relative">
          {/* Content panel with subtle light effects */}
          <div className="absolute inset-0 -z-10 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-[#1a1a2e]/20 backdrop-blur-sm"></div>
            <div className="absolute -top-[50%] -left-[10%] w-[80%] h-[100%] bg-gradient-to-br from-purple-600/5 via-indigo-500/2 to-transparent rotate-[30deg] transform-gpu"></div>
            <div className="absolute -bottom-[30%] -right-[20%] w-[70%] h-[80%] bg-gradient-to-tl from-blue-600/5 via-violet-500/2 to-transparent rotate-[30deg] transform-gpu"></div>
          </div>
          
          {/* Actual content */}
          <div className="relative z-10">
            {activeTab === 'users' && <UserManagement />}
            {activeTab === 'events' && <EventManagement />}
            {activeTab === 'association' && <AssociationHeadManagement />}
            {activeTab === 'clubs' && <ClubManagement />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
