import React from 'react';
import { clubHeads } from './data';
import ProfileCard from '../members/ProfileCard';

const ClubHeads = () => {
    const [hoveredMember, setHoveredMember] = React.useState(null);
    
    // Handle mouse enter for member profiles
    const handleMemberMouseEnter = (memberId) => {
        setHoveredMember(memberId);
    };
    
    // Handle mouse leave for member profiles
    const handleMemberMouseLeave = () => {
        setHoveredMember(null);
    };
    
    const handleContactClick = (head) => {
        alert(`Contacting ${head.name} (${head.role})`);
    };
    
    return (
        <div className="club-heads-section py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {clubHeads.map(head => (
                    <div key={head.id} 
                        className="member-card-container"
                        onMouseEnter={() => handleMemberMouseEnter(head.id)}
                        onMouseLeave={handleMemberMouseLeave}
                    >
                        <ProfileCard 
                            name={head.name}
                            title={head.role}
                            handle={head.handle}
                            status={head.status || "Online"}
                            contactText="Contact"
                            avatarUrl={head.avatarUrl}
                            showUserInfo={true}
                            enableTilt={true}
                            enableMobileTilt={false}
                            onContactClick={() => handleContactClick(head)}
                            classInfo={head.class}
                            linkedinUrl="#"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClubHeads;
