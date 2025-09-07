import React from 'react';

interface ResponsiveWrapperProps {
  children: React.ReactNode;
}

const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({ children }) => {
  return (
    <div className="admin-scrollbar">
      {/* Common controls for all admin pages (search, filters, etc) can go here */}
      <div className="p-4 bg-[#1a1a2e]/50 rounded-lg mb-4 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <h3 className="text-white text-lg font-medium">Admin Panel</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full sm:w-64 pl-10 pr-4 py-2 bg-[#2a2a3e]/70 border border-[#8080ff]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#8080ff]/50 focus:ring-1 focus:ring-[#8080ff]/30"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="admin-content-container">
        {children}
      </div>
      
      {/* Mobile footer with action buttons if needed */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#1a1a2e]/90 backdrop-blur-md py-3 px-4 border-t border-[#8080ff]/20 safe-padding-bottom">
        <div className="flex justify-around">
          <button className="touch-feedback tap-target flex flex-col items-center justify-center text-gray-400 hover:text-[#8080ff] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-xs mt-1">Add New</span>
          </button>
          <button className="touch-feedback tap-target flex flex-col items-center justify-center text-gray-400 hover:text-[#8080ff] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="text-xs mt-1">Filter</span>
          </button>
          <button className="touch-feedback tap-target flex flex-col items-center justify-center text-gray-400 hover:text-[#8080ff] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
            <span className="text-xs mt-1">More</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveWrapper;
