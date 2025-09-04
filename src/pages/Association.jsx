import React, { useState } from 'react';
import ProfileCard from '../components/members/ProfileCard';
import { LightRays } from '../components/loading';

const associationMembers = [
  {
    id: 'pres-1',
    name: 'Rajiv Kumar',
    role: 'President',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    handle: 'rajiv_k',
    status: 'Online',
    class: 'IV CSE-A',
    year: 'Final Year'
  },
  {
    id: 'vp-1',
    name: 'Ananya Sharma',
    role: 'Vice President',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    handle: 'ananya_s',
    status: 'Away',
    class: 'IV ECE-B',
    year: 'Final Year'
  },
  {
    id: 'vp-2',
    name: 'Vikram Patel',
    role: 'Vice President',
    avatarUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    handle: 'vikram_p',
    status: 'Online',
    class: 'III MECH-A',
    year: 'Third Year'
  },
  {
    id: 'sec-1',
    name: 'Meera Reddy',
    role: 'Secretary',
    avatarUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
    handle: 'meera_r',
    status: 'Online',
    class: 'III CSE-C',
    year: 'Third Year'
  },
  {
    id: 'jsec-1',
    name: 'Arjun Singh',
    role: 'Vice Secretary',
    avatarUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
    handle: 'arjun_s',
    status: 'Online',
    class: 'II IT-A',
    year: 'Second Year'
  },
  {
    id: 'tres-1',
    name: 'Pooja Iyer',
    role: 'Treasurer',
    avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
    handle: 'pooja_i',
    status: 'Away',
    class: 'III CSE-B',
    year: 'Third Year'
  },
  {
    id: 'jtres-1',
    name: 'Aditya Nair',
    role: 'Joint Treasurer',
    avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
    handle: 'aditya_n',
    status: 'Offline',
    class: 'II ECE-A',
    year: 'Second Year'
  }
];

const clubHeads = [
  {
    id: 'ch-1',
    name: 'Arjun Sharma',
    role: 'Club Head',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    handle: 'arjun_tech',
    status: 'Online',
    class: 'III CSE-A',
    year: 'Third Year'
  },
  {
    id: 'ch-2',
    name: 'Neha Patel',
    role: 'Club Head',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    handle: 'neha_coder',
    status: 'Away',
    class: 'III IT-B',
    year: 'Third Year'
  },
  {
    id: 'ch-3',
    name: 'Rahul Verma',
    role: 'Club Head',
    avatarUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    handle: 'rahul_dev',
    status: 'Online',
    class: 'II CSE-C',
    year: 'Second Year'
  },
  {
    id: 'ch-4',
    name: 'Priya Singh',
    role: 'Club Head',
    avatarUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
    handle: 'priya_s',
    status: 'Offline',
    class: 'III DS-A',
    year: 'Third Year'
  }
];

const clubs = [
  {
    id: 'tech-patrons',
    name: 'TECH PATRONS',
    description: "Leading technological innovation on campus",
    members: 28,
    faculty: "Dr. Arun Kumar",
    headId: 'ch-1'
  },
  {
    id: 'speakzy',
    name: 'SPEAKZY',
    description: "Focused on developing communication and public speaking skills",
    members: 35,
    faculty: "Prof. Meera Sharma",
    headId: 'ch-2'
  },
  {
    id: 'eco-isr',
    name: 'ECO/ISR',
    description: "Promoting environmental awareness and social responsibility",
    members: 42,
    faculty: "Dr. Rajesh Verma",
    headId: 'ch-3'
  },
  {
    id: 'admire-hands',
    name: 'ADMIRE HANDS',
    description: "Celebrating creativity and artistic expression",
    members: 31,
    faculty: "Prof. Kavita Menon",
    headId: 'ch-4'
  }
];

const Association = () => {
  const [activeClub, setActiveClub] = useState(null);
  const [hoveredMember, setHoveredMember] = useState(null);

  const handleContactClick = (member) => {
    alert(`Contacting ${member.name} (${member.role})`);
  };

  const handleViewMembers = (clubId) => {
    setActiveClub(clubId === activeClub ? null : clubId);
  };

  const getRoleOrder = (role) => {
    const roleOrder = {
      'President': 1,
      'Vice President': 2,
      'Treasurer': 3,
      'Joint Treasurer': 4,
      'Secretary': 5,
      'Vice Secretary': 6,
      'Club Head': 7,
      'Member': 8
    };
    return roleOrder[role] || 99;
  };

  const sortedMembers = [...associationMembers].sort((a, b) => getRoleOrder(a.role) - getRoleOrder(b.role));

  return (
    <div className="min-h-screen text-white bg-[#0a0a18] [background:radial-gradient(circle_at_center,_#111133_0%,_#0a0a18_70%,_#050510_100%)] pt-24 pb-16 overflow-hidden">
      <div className="light-rays-container absolute inset-0 z-0">
        <LightRays
          raysColor="#8080ff"
          raysSpeed={0.8}
          lightSpread={1.5}
          rayLength={2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.06}
          distortion={0.04}
          pulsating={true}
          fadeDistance={1.5}
          saturation={0.6}
        />
      </div>

      <div className="relative overflow-hidden mb-12">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-[#8080ff]/30 via-[#a78bfa]/20 to-transparent blur-3xl opacity-60"></div>
        
        <div className="max-w-6xl mx-auto px-6 py-16 relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-6 drop-shadow-[0_0_30px_rgba(128,128,255,0.3)]">
            KPRIET <span className="text-gradient">STUDENT ASSOCIATION</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90 leading-7 mb-6">
            Meet our dedicated team of student leaders committed to enhancing campus life and driving student initiatives
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">
            <span className="border-b-4 border-purple-500 pb-2 text-gradient">Leadership</span>
          </h2>
          
          <div className="flex justify-center mb-14">
            {sortedMembers.filter(m => m.role === 'President').map(member => (
              <div key={member.id} className="w-full max-w-xs">
                <ProfileCard
                  name={member.name}
                  title={`${member.role} | ${member.class}`}
                  handle={member.handle}
                  status={member.status || "Online"}
                  contactText="Contact"
                  avatarUrl={member.avatarUrl}
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  onContactClick={() => handleContactClick(member)}
                  className="president-card"
                />
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            {sortedMembers
              .filter(m => m.role === 'Vice President' || m.role === 'Treasurer')
              .map(member => (
                <div key={member.id}>
                  <ProfileCard
                    name={member.name}
                    title={`${member.role} | ${member.class}`}
                    handle={member.handle}
                    status={member.status || "Online"}
                    contactText="Contact"
                    avatarUrl={member.avatarUrl}
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                    onContactClick={() => handleContactClick(member)}
                  />
                </div>
              ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sortedMembers
              .filter(m => m.role === 'Secretary' || m.role === 'Vice Secretary' || m.role === 'Joint Treasurer')
              .map(member => (
                <div key={member.id}>
                  <ProfileCard
                    name={member.name}
                    title={`${member.role} | ${member.class}`}
                    handle={member.handle}
                    status={member.status || "Online"}
                    contactText="Contact"
                    avatarUrl={member.avatarUrl}
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                    onContactClick={() => handleContactClick(member)}
                  />
                </div>
              ))}
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">
            <span className="border-b-4 border-purple-500 pb-2 text-gradient">Club Heads</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {clubHeads.map(member => (
              <div key={member.id}>
                <ProfileCard
                  name={member.name}
                  title={`${member.role} | ${member.class}`}
                  handle={member.handle}
                  status={member.status || "Online"}
                  contactText="Contact"
                  avatarUrl={member.avatarUrl}
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  onContactClick={() => handleContactClick(member)}
                />
              </div>
            ))}
          </div>
        </div>
       
        <div>
          <h2 className="text-3xl font-bold mb-10 text-center">
            <span className="border-b-4 border-purple-500 pb-2 text-gradient">Clubs</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {clubs.map(club => {
              const clubHead = clubHeads.find(head => head.id === club.headId);
              
              return (
                <div key={club.id} className="bg-[#111133]/30 backdrop-blur-sm rounded-xl overflow-hidden transition transform hover:scale-105 duration-300 border border-purple-500/20 shadow-[0_4px_20px_rgba(139,92,246,0.15)]">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gradient">{club.name}</h3>
                    <p className="text-white/70 mb-4">{club.description}</p>
                    
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500/30 mr-3">
                        <img 
                          src={clubHead?.avatarUrl || 'https://via.placeholder.com/100'} 
                          alt={clubHead?.name || 'Club Head'} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-white">{clubHead?.name || 'Club Head'}</p>
                        <p className="text-sm text-white/60">{clubHead?.class || 'Class'}</p>
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
                        {Array.from({ length: 6 }).map((_, index) => {
                          const gender = Math.random() > 0.5 ? 'men' : 'women';
                          const randomNum = Math.floor(Math.random() * 70) + 10;
                          const memberId = `member-${club.id}-${index}`;
                          const memberData = {
                            id: memberId,
                            name: `Student ${index + 1}`,
                            role: 'Member',
                            avatarUrl: `https://randomuser.me/api/portraits/${gender}/${randomNum}.jpg`,
                            class: `II CSE-${String.fromCharCode(65 + index % 3)}`,
                            handle: `student_${index}`,
                            status: index % 3 === 0 ? 'Online' : (index % 3 === 1 ? 'Away' : 'Offline')
                          };
                          
                          return (
                            <div 
                              key={memberId} 
                              className="relative group"
                              onMouseEnter={() => setHoveredMember(memberId)}
                              onMouseLeave={() => setHoveredMember(null)}
                            >
                              <div className="flex items-center bg-[#111133]/30 p-3 rounded-lg border border-purple-500/10 shadow-[0_2px_10px_rgba(139,92,246,0.1)] transition-all duration-300 group-hover:opacity-0">
                                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                  <img 
                                    src={memberData.avatarUrl} 
                                    alt="Member" 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium text-white text-sm">{memberData.name}</p>
                                  <p className="text-xs text-white/60">{memberData.class}</p>
                                </div>
                              </div>
                              
                              <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-[360px] transition-all duration-300 z-50 ${
                                hoveredMember === memberId ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                              }`}>
                                <ProfileCard
                                  name={memberData.name}
                                  title={memberData.role}
                                  avatarUrl={memberData.avatarUrl}
                                  linkedinUrl={`https://linkedin.com/in/${memberData.handle}`}
                                  showUserInfo={true}
                                  classInfo={memberData.class}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="mt-4 text-center">
                        <button className="text-sm text-purple-400 hover:text-purple-300 font-medium">
                          View All Members
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .text-gradient {
          background: linear-gradient(90deg, #a78bfa, #8b5cf6);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
          color: #8b5cf6;
        }
        
        .president-card {
          transform: scale(1.1);
        }
        
        @media (max-width: 768px) {
          .president-card {
            transform: scale(1);
          }
          
          /* Make hover work as click on mobile */
          .group:active .group-hover\\:scale-\\[0\\.97\\] {
            transform: scale(0.97);
            opacity: 0;
          }
          
          .group:active .opacity-0.scale-90.-z-10 {
            opacity: 1;
            transform: scale(1);
            z-index: 30;
          }
        }
      `}</style>
    </div>
  );
};

export default Association;