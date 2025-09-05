import React, { useState } from 'react';
import ProfileCard from '../members/ProfileCard';
import { associationMembers } from './data';

// Helper function to sort members by role
const getRoleOrder = (role) => {
    const roleOrder = {
        'President': 1,
        'Vice President': 2,
        'Secretary': 3,
        'Vice Secretary': 4,
        'Treasurer': 5,
        'Joint Treasurer': 6
    };
    return roleOrder[role] || 10; // Default value for roles not in the list
};

const Leadership = () => {
    const [hoveredMember, setHoveredMember] = useState(null);
    
    // Sort the members by role
    const sortedMembers = [...associationMembers].sort((a, b) => getRoleOrder(a.role) - getRoleOrder(b.role));
    
    // Handle mouse enter for member profiles
    const handleMemberMouseEnter = (memberId) => {
        setHoveredMember(memberId);
    };
    
    // Handle mouse leave for member profiles
    const handleMemberMouseLeave = () => {
        setHoveredMember(null);
    };
    
    const handleContactClick = (member) => {
        alert(`Contacting ${member.name} (${member.role})`);
    };
    
    return (
        <div className="leadership-section py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedMembers.map(member => (
                    <div key={member.id} 
                        className="member-card-container"
                        onMouseEnter={() => handleMemberMouseEnter(member.id)}
                        onMouseLeave={handleMemberMouseLeave}
                    >
                        <ProfileCard
                            name={member.name}
                            title={member.role}
                            handle={member.handle}
                            status={member.status || "Online"}
                            contactText="Contact"
                            avatarUrl={member.avatarUrl}
                            showUserInfo={true}
                            enableTilt={true}
                            enableMobileTilt={false}
                            onContactClick={() => handleContactClick(member)}
                            classInfo={member.class}
                            linkedinUrl={member.linkedin || "#"}
                            className={member.role === 'President' ? "president-card" : ""}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leadership;
