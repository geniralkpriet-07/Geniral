import React from 'react';
import ProfileCard from '../members/ProfileCard';
import SectionHeading from './SectionHeading';

const ClubsSection = ({ clubs, activeClub, handleViewMembers, setHoveredMember, addToRefs }) => {
  return (
    <div className="mb-16">
      <SectionHeading title="Clubs" addToRefs={addToRefs} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {clubs.map(club => {
          return (
            <div key={club.id} className="bg-[#111133]/30 backdrop-blur-sm rounded-xl overflow-hidden transition transform hover:scale-105 duration-300 border border-purple-500/20 shadow-[0_4px_20px_rgba(139,92,246,0.15)]">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gradient">{club.name}</h3>
                <p className="text-white/70 mb-4">{club.description}</p>
                
                {/* Faculty Info */}
                <div className="mb-6">
                  <h4 className="text-sm text-white/80 mb-2 uppercase tracking-wider">Faculty Coordinators</h4>
                  <div className="flex flex-wrap gap-4">
                    {club.faculty.map((faculty, idx) => (
                      <div 
                        key={`club-faculty-${club.id}-${idx}`}
                        className="flex items-center bg-[#111133]/50 p-3 rounded-lg border border-purple-500/10 group relative"
                        onMouseEnter={() => setHoveredMember(`club-faculty-${club.id}-${idx}`)}
                        onMouseLeave={() => setHoveredMember(null)}
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-purple-400">
                          <img src={faculty.image} alt={faculty.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm">{faculty.name}</p>
                          <p className="text-xs text-white/60">{faculty.dept}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Student Head */}
                <div className="mb-6">
                  <h4 className="text-sm text-white/80 mb-2 uppercase tracking-wider">Student Head</h4>
                  <div 
                    className="flex items-center bg-[#111133]/50 p-3 rounded-lg border border-purple-500/10 group relative"
                    onMouseEnter={() => setHoveredMember(`club-head-${club.id}`)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-purple-400">
                      <img src={club.headImage} alt={club.head} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">{club.head}</p>
                      <p className="text-xs text-white/60">{club.headClass}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white/60">
                    <span className="font-medium text-purple-400">{club.members}</span> members
                  </div>
                  <button 
                    onClick={() => handleViewMembers(club.id)}
                    className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                      activeClub === club.id 
                        ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' 
                        : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 hover:shadow-[0_0_10px_rgba(139,92,246,0.3)]'
                    }`}
                  >
                    {activeClub === club.id ? 'Hide Members' : 'View Members'}
                  </button>
                </div>
              </div>
              
              {activeClub === club.id && (
                <div className="bg-[#111133]/50 p-6 border-t border-purple-500/20">
                  <h4 className="font-medium text-white mb-4">Club Members</h4>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {club.memberList && club.memberList.map((memberName, index) => {
                      const gender = index % 2 === 0 ? 'men' : 'women';
                      const randomNum = Math.floor(Math.random() * 70) + 10;
                      const memberId = `member-${club.id}-${index}`;
                      
                      return (
                        <div 
                          key={memberId} 
                          className="relative group"
                          onMouseEnter={() => setHoveredMember(memberId)}
                          onMouseLeave={() => setHoveredMember(null)}
                        >
                          <div className="flex items-center bg-[#111133]/30 p-3 rounded-lg border border-purple-500/10 shadow-[0_2px_10px_rgba(139,92,246,0.1)] transition-all duration-300 hover:bg-[#111133]/50">
                            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                              <img 
                                src={`https://randomuser.me/api/portraits/${gender}/${randomNum}.jpg`} 
                                alt="Member" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-white text-sm">{memberName}</p>
                              <p className="text-xs text-white/60">{`III CS-${String.fromCharCode(65 + index % 3)}`}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClubsSection;
