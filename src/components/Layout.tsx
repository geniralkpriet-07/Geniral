import React from 'react';
import { Navbar } from './loading';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="site-layout">
      {/* Common background for all pages */}
      <div className="fixed inset-0 bg-radial-gradient z-[-1]"></div>
      
      {/* Static Navbar - will appear on all pages */}
      <Navbar transparent={true} />
      
      {/* Page Content */}
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
