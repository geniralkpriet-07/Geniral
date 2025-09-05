import React from 'react';
import SectionHeading from './SectionHeading';

const ExecutiveMembers = ({ executiveMembers, setHoveredMember, addToRefs }) => {
  return (
    <div className="mb-16">
      <SectionHeading title="Executive Members" addToRefs={addToRefs} />
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {executiveMembers.map((member, index) => (
          <div 
            key={`exec-${index}`}
            className="relative bg-[#111133]/30 rounded-lg p-4 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(139,92,246,0.1)] border border-purple-500/20 hover:bg-[#111133]/50 hover:shadow-[0_4px_20px_rgba(139,92,246,0.25)] transition-all duration-300 transform hover:scale-105"
            onMouseEnter={() => setHoveredMember(`exec-${index}`)}
            onMouseLeave={() => setHoveredMember(null)}
          >
            <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-purple-500/50">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-medium text-white text-sm mb-1">{member.name}</h3>
            <p className="text-xs text-white/60">{member.class}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExecutiveMembers;
