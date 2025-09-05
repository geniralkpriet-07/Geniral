import React from 'react';
import SectionHeading from './SectionHeading';

const VolunteersSection = ({ volunteers, setHoveredMember, addToRefs }) => {
  return (
    <div className="mb-16">
      <SectionHeading title="Volunteers" addToRefs={addToRefs} />
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {volunteers.map((volunteer, index) => (
          <div 
            key={`volunteer-${index}`}
            className="relative bg-[#111133]/30 rounded-lg p-4 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(139,92,246,0.1)] border border-purple-500/20 hover:bg-[#111133]/50 hover:shadow-[0_4px_20px_rgba(139,92,246,0.25)] transition-all duration-300 transform hover:scale-105"
            onMouseEnter={() => setHoveredMember(`volunteer-${index}`)}
            onMouseLeave={() => setHoveredMember(null)}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden mb-2 border-2 border-purple-500/50">
              <img 
                src={volunteer.image} 
                alt={volunteer.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-medium text-white text-sm mb-1">{volunteer.name}</h3>
            <p className="text-xs text-white/60">{volunteer.class}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteersSection;
