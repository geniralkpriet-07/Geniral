import React, { useState } from 'react';
import ProfileCard from '../components/members/ProfileCard';
import { LightRays } from '../components/loading';

// The main association members list
const associationMembers = [
  // Top leadership
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

// Club heads data
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

// Different clubs with their members
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

  // Function to handle contact button click
  const handleContactClick = (member) => {
    alert(`Contacting ${member.name} (${member.role})`);
  };

  // Function to handle view members click
  const handleViewMembers = (clubId) => {
    setActiveClub(clubId === activeClub ? null : clubId);
  };

  // Get role order for proper hierarchy
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

  // Sorted members by role
  const sortedMembers = [...associationMembers].sort((a, b) => getRoleOrder(a.role) - getRoleOrder(b.role));

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-24 pb-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-700 to-indigo-800 text-white mb-12">
        <div className="absolute inset-0 z-0 opacity-30">
          <LightRays
            raysColor="#ffffff"
            raysSpeed={0.2}
            lightSpread={1.0}
            rayLength={0.7}
            followMouse={false}
            mouseInfluence={0}
            noiseAmount={0.02}
            distortion={0.01}
            pulsating={true}
            fadeDistance={0.8}
            saturation={0.4}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16 relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-6">
            KPRIET <span className="text-yellow-300">STUDENT ASSOCIATION</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90 leading-7 mb-6">
            Meet our dedicated team of student leaders committed to enhancing campus life and driving student initiatives
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Leadership Section - President */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            <span className="border-b-4 border-purple-500 pb-2">Leadership</span>
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
          
          {/* Vice Presidents & Treasurer */}
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
          
          {/* Secretary & Vice Secretary & Joint Treasurer */}
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
        
        {/* Club Heads Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            <span className="border-b-4 border-purple-500 pb-2">Club Heads</span>
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
        
        {/* Clubs Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            <span className="border-b-4 border-purple-500 pb-2">Clubs</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {clubs.map(club => {
              const clubHead = clubHeads.find(head => head.id === club.headId);
              
              return (
                <div key={club.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition transform hover:scale-105 duration-300 border border-gray-100">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{club.name}</h3>
                    <p className="text-gray-600 mb-4">{club.description}</p>
                    
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-200 mr-3">
                        <img 
                          src={clubHead?.avatarUrl || 'https://via.placeholder.com/100'} 
                          alt={clubHead?.name || 'Club Head'} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{clubHead?.name || 'Club Head'}</p>
                        <p className="text-sm text-gray-500">{clubHead?.class || 'Class'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium text-purple-600">{club.members}</span> members
                      </div>
                      <button 
                        onClick={() => handleViewMembers(club.id)}
                        className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                          activeClub === club.id 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                        }`}
                      >
                        {activeClub === club.id ? 'Hide Members' : 'View Members'}
                      </button>
                    </div>
                  </div>
                  
                  {/* Club Members Section - Expandable */}
                  {activeClub === club.id && (
                    <div className="bg-gray-50 p-6 border-t border-gray-100">
                      <h4 className="font-medium text-gray-800 mb-4">Club Members</h4>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {/* Generate 6 random members for demo */}
                        {Array.from({ length: 6 }).map((_, index) => {
                          // Random gender for avatar
                          const gender = Math.random() > 0.5 ? 'men' : 'women';
                          const randomNum = Math.floor(Math.random() * 70) + 10;
                          
                          return (
                            <div key={index} className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                <img 
                                  src={`https://randomuser.me/api/portraits/${gender}/${randomNum}.jpg`} 
                                  alt="Member" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 text-sm">Student {index + 1}</p>
                                <p className="text-xs text-gray-500">II CSE-{String.fromCharCode(65 + index % 3)}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="mt-4 text-center">
                        <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
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
        .president-card {
          transform: scale(1.1);
        }
        
        @media (max-width: 768px) {
          .president-card {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Association;