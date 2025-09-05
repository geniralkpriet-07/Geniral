import React from 'react';
import ProfileCard from '../members/ProfileCard';

const HoverProfileCard = ({ member, id, isHovered }) => {
  if (!member || !isHovered) return null;
  
  return (
    <div 
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
      style={{ pointerEvents: 'none' }}
    >
      <ProfileCard 
        key={id}
        name={member.name}
        title={member.role}
        avatarUrl={member.avatarUrl || member.image}
        className="max-w-xs animate-fadeIn shadow-2xl"
        classInfo={member.class || ""}
        linkedinUrl={member.linkedin || ""}
      />
    </div>
  );
};

export default HoverProfileCard;
