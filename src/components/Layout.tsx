import React from 'react';
import { Navbar } from './loading';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="site-layout">
      <div className="fixed inset-0 bg-radial-gradient z-[-1]"></div>
      
      <Navbar transparent={true} />
      
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
