import React from 'react';
import ProfileCard from '../members/ProfileCard';
import { associationMembers } from './data';

const Leadership = ({ sortedMembers: propSortedMembers, handleContactClick, setHoveredMember }) => {
  // Use prop or fallback to computing sorted members locally
  const getRoleOrder = (role) => {
    const roleOrder = {
      'President': 1,
      'Vice President': 2,
      'Treasurer': 3,
      'Joint Treasurer': 4,
      'Secretary': 5,
      'Joint Secretary': 6, // Added Joint Secretary
      'Club Head': 7,
      'Member': 8
    };
    return roleOrder[role] || 99;
  };

  const sortedMembers = propSortedMembers || 
    [...associationMembers].sort((a, b) => getRoleOrder(a.role) - getRoleOrder(b.role));
  
  // Safe handler for contact click
  const handleContact = member => {
    if (handleContactClick) {
      handleContactClick(member);
    } else {
      console.log('Contact clicked for', member.name);
    }
  };

  return (
    <>
      {/* President & Vice President Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-10 text-center heading-container">
          <span className="border-b-4 border-purple-500 pb-2 text-gradient relative">
            President & Vice President
            <div className="heading-rays"></div>
          </span>
        </h2>
        
        <div className="flex justify-center gap-8 mb-14 flex-wrap">
          {(sortedMembers?.filter(m => m.role === 'President') || []).map(member => (
            <div key={member.id} className="w-full max-w-xs">
              <ProfileCard
                name={member.name}
                title={member.role}
                contactText="Contact"
                avatarUrl={member.image || member.avatarUrl}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => handleContact(member)}
                className="president-card"
                classInfo={member.class}
                linkedinUrl={member.linkedin || "#"}
              />
            </div>
          ))}
          
          {(sortedMembers?.filter(m => m.role === 'Vice President') || []).map(member => (
            <div key={member.id} className="w-full max-w-xs">
              <ProfileCard
                name={member.name}
                title={member.role}
                contactText="Contact"
                avatarUrl={member.image || member.avatarUrl}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => handleContact(member)}
                classInfo={member.class}
                linkedinUrl={member.linkedin || "#"}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Secretary & Joint Secretary Section - Updated to combine both roles */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-10 text-center heading-container">
          <span className="border-b-4 border-purple-500 pb-2 text-gradient relative">
            Secretary & Joint Secretary
            <div className="heading-rays"></div>
          </span>
        </h2>
        
        <div className="flex justify-center gap-8 mb-14 flex-wrap">
          {/* Show both Secretary and Joint Secretary in the same section */}
          {(sortedMembers?.filter(m => m.role === 'Secretary' || m.role === 'Joint Secretary') || []).map(member => (
            <div key={member.id} className="w-full max-w-xs">
              <ProfileCard
                name={member.name}
                title={member.role}
                contactText="Contact"
                avatarUrl={member.image || member.avatarUrl}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => handleContact(member)}
                classInfo={member.class}
                linkedinUrl={member.linkedin || "#"}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Treasurer & Joint Treasurer Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-10 text-center heading-container">
          <span className="border-b-4 border-purple-500 pb-2 text-gradient relative">
            Treasurer & Joint Treasurer
            <div className="heading-rays"></div>
          </span>
        </h2>
        
        <div className="flex justify-center gap-8 mb-14 flex-wrap">
          {(sortedMembers?.filter(m => m.role === 'Treasurer' || m.role === 'Joint Treasurer') || []).map(member => (
            <div key={member.id} className="w-full max-w-xs">
              <ProfileCard
                name={member.name}
                title={member.role}
                contactText="Contact"
                avatarUrl={member.image || member.avatarUrl}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => handleContact(member)}
                classInfo={member.class}
                linkedinUrl={member.linkedin || "#"}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Leadership;
