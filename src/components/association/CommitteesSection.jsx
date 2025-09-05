import React from 'react';
import SectionHeading from './SectionHeading';

const CommitteesSection = ({ committees, setHoveredMember, addToRefs }) => {
  return (
    <div className="mb-16">
      <SectionHeading title="Committees" addToRefs={addToRefs} />
      
      <div className="space-y-10">
        {Object.values(committees).map((committee, idx) => (
          <div key={`committee-${idx}`} className="bg-[#111133]/30 backdrop-blur-sm rounded-xl overflow-hidden p-6 border border-purple-500/20 shadow-[0_4px_20px_rgba(139,92,246,0.15)]">
            <h3 className="text-xl font-bold mb-4 text-gradient">{committee.name}</h3>
            
            {committee.faculty && (
              <div className="mb-6">
                <h4 className="text-sm text-white/80 mb-3 uppercase tracking-wider">Faculty Coordinator</h4>
                <div className="flex flex-wrap gap-4">
                  {Array.isArray(committee.faculty) ? (
                    committee.faculty.map((faculty, idx) => (
                      <div 
                        key={`committee-faculty-${idx}`}
                        className="flex items-center bg-[#111133]/50 p-3 rounded-lg border border-purple-500/10 transition-all duration-300 hover:bg-[#111133]/70 hover:shadow-[0_4px_20px_rgba(139,92,246,0.2)]"
                        onMouseEnter={() => setHoveredMember(`committee-faculty-${committee.name}-${idx}`)}
                        onMouseLeave={() => setHoveredMember(null)}
                      >
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-3 border border-purple-400">
                          <img src={faculty.image} alt={faculty.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm">{faculty.name}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div 
                      className="flex items-center bg-[#111133]/50 p-3 rounded-lg border border-purple-500/10 transition-all duration-300 hover:bg-[#111133]/70 hover:shadow-[0_4px_20px_rgba(139,92,246,0.2)]"
                      onMouseEnter={() => setHoveredMember(`committee-faculty-${committee.name}`)}
                      onMouseLeave={() => setHoveredMember(null)}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3 border border-purple-400">
                        <img src={committee.faculty.image} alt={committee.faculty.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">{committee.faculty.name}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div>
              <h4 className="text-sm text-white/80 mb-3 uppercase tracking-wider">Committee Members</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {committee.members.map((member, index) => (
                  <div 
                    key={`member-${committee.name}-${index}`}
                    className="relative bg-[#111133]/50 rounded-lg p-4 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(139,92,246,0.1)] border border-purple-500/20 hover:bg-[#111133]/70 hover:shadow-[0_4px_20px_rgba(139,92,246,0.25)] transition-all duration-300 transform hover:scale-105"
                    onMouseEnter={() => setHoveredMember(`member-${committee.name}-${index}`)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-2 border-2 border-purple-500/50">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommitteesSection;
