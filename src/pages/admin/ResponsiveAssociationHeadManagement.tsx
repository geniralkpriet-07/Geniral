import React, { useState, useEffect } from 'react';
import AssociationHeadManagement from './AssociationHeadManagement';
import AssociationHeadManagementMobile from './AssociationHeadManagementMobile';

const ResponsiveAssociationHeadManagement: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the viewport is mobile sized
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640); // 640px is the sm breakpoint in Tailwind
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Conditionally render the mobile or desktop version
  return isMobile ? <AssociationHeadManagementMobile /> : <AssociationHeadManagement />;
};

export default ResponsiveAssociationHeadManagement;
