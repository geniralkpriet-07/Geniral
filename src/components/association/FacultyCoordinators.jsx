import React from 'react';
import ProfileCard from '../members/ProfileCard';
import SectionHeading from './SectionHeading';

const FacultyCoordinators = ({ facultyCoordinators, setHoveredMember, addToRefs }) => {
  return (
    <div className="mb-16">
      <SectionHeading title="Faculty Coordinators" addToRefs={addToRefs} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {facultyCoordinators.map((faculty, idx) => (
          <div 
            key={`faculty-${idx}`}
            className="bg-[#111133]/30 backdrop-blur-sm rounded-xl overflow-hidden p-6 border border-purple-500/20 shadow-[0_4px_20px_rgba(139,92,246,0.15)] group relative"
            onMouseEnter={() => setHoveredMember(`faculty-${idx}`)}
            onMouseLeave={() => setHoveredMember(null)}
          >
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-purple-500">
              <img src={faculty.image} alt={faculty.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-center mb-1 text-gradient">{faculty.name}</h3>
            <p className="text-center text-white/70 mb-3">{faculty.role}</p>
            <div className="flex justify-center">
              <div className="bg-purple-600/20 px-3 py-1 rounded-full text-sm text-white">{faculty.department}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyCoordinators;
