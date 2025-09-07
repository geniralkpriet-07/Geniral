"use client"

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import LightRays from '../components/loading/LightRays';
import ProfileCard from '../components/members/ProfileCard';
import SectionHeading from '../components/association/SectionHeading';
import SimpleProfileCard from '../components/members/SimpleProfileCard';

const getAvatarUrl = (name, index) => {
  if (!name || typeof name !== 'string') {
    return `https://randomuser.me/api/portraits/men/1.jpg`;
  }
  const nameSum = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const deterministic = (nameSum + index) % 70;
  const gender = nameSum % 2 === 0 ? "men" : "women";
  return `https://randomuser.me/api/portraits/${gender}/${deterministic}.jpg`;
};

const Association = () => {
  const [associationMembers, setAssociationMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Add these state variables for executive members
  const [executiveMembers, setExecutiveMembers] = useState([]);
  const [executiveMembersLoading, setExecutiveMembersLoading] = useState(true);
  const [executiveMembersError, setExecutiveMembersError] = useState(null);
  
  const [clubs, setClubs] = useState([]);
  const [clubsLoading, setClubsLoading] = useState(true);
  const [clubsError, setClubsError] = useState(null);
  
  const [activeClub, setActiveClub] = useState(null)
  const [hoveredMember, setHoveredMember] = useState(null)
  const [memberProfilesVisible, setMemberProfilesVisible] = useState({})
  const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 })
  const hoverTimeoutsRef = useRef({})

  const headingRefs = useRef([])

  // Add this near the top of your component where other state variables are defined
  const [facultyCoordinators, setFacultyCoordinators] = useState([])

  useEffect(() => {
    const fetchAssociationMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:7000/api/association-members')
        
        if (!response.ok) {
          throw new Error('Failed to fetch association members')
        }
        
        const data = await response.json()
        
        const transformedMembers = data.members.map(member => ({
          id: member._id,
          name: member.name,
          role: member.role,
          avatarUrl: member.avatarBase64 ? member.avatarBase64 : getAvatarUrl(member.name, 0),
          handle: member.handle,
          status: member.status || "Offline",
          class: member.class,
          year: member.year,
          linkedin: member.linkedin || "",
        }))
        
        setAssociationMembers(transformedMembers)
        setError(null)
      } catch (error) {
        console.error('Error fetching association members:', error)
        setError('Failed to load association members. Using demo data instead.')
        setAssociationMembers([
          {
            id: "pres-1",
            name: "Raman Kishore R R",
            role: "President",
            avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
            handle: "raman_k",
            status: "Online",
            class: "IV CS-A",
            year: "Final Year",
            linkedin: "https://v0.app/chat/j3kwm0Xmq0S",
          },
          {
            id: "vp-1",
            name: "Ramya G",
            role: "Vice President",
            avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
            handle: "ramya_g",
            status: "Away",
            class: "III CS-B",
            year: "Third Year",
            linkedin: "",
          },
          {
            id: "sec-1",
            name: "Divyashri T K S",
            role: "Secretary",
            avatarUrl: "https://randomuser.me/api/portraits/women/22.jpg",
            handle: "divyashri_t",
            status: "Online",
            class: "IV CS-B",
            year: "Final Year",
            linkedin: "",
          },
          {
            id: "jsec-1",
            name: "Dhanya Sai Shree M",
            role: "Vice Secretary",
            avatarUrl: "https://randomuser.me/api/portraits/women/41.jpg",
            handle: "dhanya_m",
            status: "Online",
            class: "III CS-A",
            year: "Third Year",
            linkedin: "",
          },
          {
            id: "tres-1",
            name: "Karthikeyan M",
            role: "Treasurer",
            avatarUrl: "https://randomuser.me/api/portraits/men/65.jpg",
            handle: "karthikeyan_m",
            status: "Away",
            class: "III CS-B",
            year: "Third Year",
            linkedin: "",
          },
          {
            id: "jtres-1",
            name: "Lakshmi Narasimar R",
            role: "Joint Treasurer",
            avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg",
            handle: "lakshmi_n",
            status: "Offline",
            class: "II CS-B",
            year: "Second Year",
            linkedin: "",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    const fetchExecutiveMembers = async () => {
      try {
        setExecutiveMembersLoading(true);
        const response = await axios.get("http://localhost:7000/api/executive-members");
        
        if (response.data && response.data.members) {
          const fetchedMembers = response.data.members.map(member => ({
            id: member._id,
            name: member.name,
            class: member.class,
            role: member.role || 'Member',
            year: member.year || '',
            avatarUrl: member.avatarBase64 || getAvatarUrl(member.name, 0),
            handle: member.name.toLowerCase().replace(/\s+/g, '_'),
            status: member.status || 'Offline',
            linkedin: member.linkedin || ''
          }));
          
          setExecutiveMembers(fetchedMembers);
          setExecutiveMembersError(null);
        }
      } catch (error) {
        console.error("Error fetching executive members:", error);
        setExecutiveMembersError("Failed to load executive members. Please try again later.");
        // Set fallback data in case of error
        setExecutiveMembers([
          {
            id: "exec-1",
            name: "Arun Kumar K",
            role: "Technical Lead",
            avatarUrl: getAvatarUrl("Arun Kumar K", 1),
            handle: "arun_k",
            status: "Online",
            class: "IV CS-A",
            year: "Final Year"
          },
          // Add more fallback members if needed
        ]);
      } finally {
        setExecutiveMembersLoading(false);
      }
    };

    const fetchClubs = async () => {
      try {
        setClubsLoading(true);
        const response = await axios.get("http://localhost:7000/api/clubs");
        
        const transformedClubs = response.data && response.data.clubs ? 
          response.data.clubs.map(club => {
            if (!club || typeof club !== 'object') {
              return null;
            }

            return {
              id: club._id || club.id || `club-${Math.random().toString(36).substring(2, 9)}`,
              name: club.name || "Unnamed Club",
              description: club.description || "No description available",
              members: Array.isArray(club.memberList) ? club.memberList.length : 0,
              faculty: Array.isArray(club.faculty) ? club.faculty.map(f => {
                if (!f || typeof f !== 'object') return null;
                return {
                  name: f.name || 'Faculty Member',
                  dept: f.department || f.dept || 'Department',
                  image: f.imageBase64 || f.image || getAvatarUrl(f.name || 'Faculty', 0)
                };
              }).filter(Boolean) : [], 
              head: typeof club.head === 'string' ? club.head : 
                    (typeof club.head === 'object' && club.head && club.head.name) ? club.head.name : 'Club Head',
              headImage: club.headImageBase64 || club.logoBase64 || 
                         getAvatarUrl(typeof club.head === 'string' ? club.head : 
                                     (typeof club.head === 'object' && club.head && club.head.name) ? 
                                     club.head.name : 'Club Head', 0),
              headClass: club.headClass || '',
              memberList: Array.isArray(club.memberList) ? 
                club.memberList
                  .filter(member => member && (typeof member === 'string' || (typeof member === 'object' && member.name)))
                  .map(member => typeof member === 'string' ? member : member.name || 'Member')
                : []
            };
          }).filter(Boolean) : []; 
        
        setClubs(transformedClubs);
        setClubsError(null);
      } catch (error) {
        console.error('Error fetching clubs:', error);
        setClubsError("Failed to load clubs. Please try again later.");
        setClubs([]);
      } finally {
        setClubsLoading(false);
      }
    };
    fetchAssociationMembers();
    fetchExecutiveMembers();
    fetchClubs();
    
    // Set a default value for facultyCoordinators
    setFacultyCoordinators([
      {
        name: "Dr. Sathyamoorthy",
        dept: "Computer Science",
        image: getAvatarUrl("Dr. Sathyamoorthy", 1)
      },
      {
        name: "Dr. Vasuki",
        dept: "Electronics",
        image: getAvatarUrl("Dr. Vasuki", 2)
      }
    ]);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("heading-visible")
          }
        })
      },
      { threshold: 0.3 },
    )

    const headingElements = headingRefs.current
    headingElements.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => {
      headingElements.forEach((el) => {
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  const addToRefs = (el) => {
    if (el && !headingRefs.current.includes(el)) {
      headingRefs.current.push(el)
    }
  }

  const handleContactClick = (member) => {
    alert(`Contacting ${member.name} (${member.role})`)
  }

  const handleViewMembers = (clubId) => {
    setActiveClub(clubId === activeClub ? null : clubId)
  }

  const handleMemberMouseEnter = (memberId, event) => {
    if (hoverTimeoutsRef.current[memberId]) {
      clearTimeout(hoverTimeoutsRef.current[memberId])
      delete hoverTimeoutsRef.current[memberId]
    }

    if (event && event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const bottomY = rect.bottom

      const maxHeight = window.innerHeight - 20 
      const yPos = Math.min(bottomY + 20, maxHeight - 280) 

      setHoverPosition({
        top: yPos,
        left: centerX,
      })
    }

    setHoveredMember(memberId)
    setMemberProfilesVisible((prev) => ({ ...prev, [memberId]: true }))
  }

  const handleMemberMouseLeave = (memberId) => {
    hoverTimeoutsRef.current[memberId] = setTimeout(() => {
      setMemberProfilesVisible((prev) => ({ ...prev, [memberId]: false }))
      delete hoverTimeoutsRef.current[memberId]
    }, 800) 
  }

  const getRoleOrder = (role) => {
    const roleOrder = {
      President: 1,
      "Vice President": 2,
      Secretary: 3,
      "Vice Secretary": 4,
      Treasurer: 5,
      "Joint Treasurer": 6,
      "Club Head": 7,
      Member: 8,
    }
    return roleOrder[role] || 99
  }

  const sortedMembers = [...associationMembers].sort((a, b) => getRoleOrder(a.role) - getRoleOrder(b.role))

  return (
    <div className="min-h-screen text-white bg-[#0a0a18] [background:radial-gradient(circle_at_center,_#111133_0%,_#0a0a18_70%,_#050510_100%)] pt-16 sm:pt-24 pb-16">
      <div className="light-rays-container absolute inset-0 z-0 hidden sm:block">
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

      <div className="relative overflow-hidden mb-8 sm:mb-12">
        <div className="absolute top-1/2 left-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-[#8080ff]/30 via-[#5050aa]/20 to-transparent blur-3xl opacity-60"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 drop-shadow-[0_0_30px_rgba(128,128,255,0.3)]">
            KPRIET <span className="text-gradient">STUDENT ASSOCIATION</span>
          </h1>
          <p className="text-base sm:text-xl max-w-3xl mx-auto text-white/90 leading-6 sm:leading-7 mb-4 sm:mb-6 px-2">
            Meet our dedicated team of student leaders committed to enhancing campus life and driving student
            initiatives
          </p>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-md p-3 mt-4 max-w-lg mx-auto">
              <p className="text-sm text-white">{error}</p>
            </div>
          )}
          
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8080ff]"></div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-12 sm:mb-16">
          <SectionHeading title="President & Vice President" />

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 mb-10 sm:mb-14">
            {sortedMembers
              .filter((m) => m.role === "President")
              .map((member) => (
                <div key={member.id} className="w-full max-w-[280px] sm:max-w-sm ml-[100px] sm:mx-auto sm:ml-[100px]">
                  <ProfileCard
                    name={member.name}
                    title={member.role}
                    handle={member.handle}
                    status={member.status || "Online"}
                    contactText="Contact"
                    avatarUrl={member.avatarUrl}
                    showUserInfo={true}
                    enableTilt={false}
                    enableMobileTilt={false}
                    onContactClick={() => handleContactClick(member)}
                    classInfo={member.class}
                    linkedinUrl={member.linkedin || "#"}
                  />
                </div>
              ))}

            {sortedMembers
              .filter((m) => m.role === "Vice President")
              .map((member) => (
                <div key={member.id} className="w-full max-w-[280px] sm:max-w-sm ml-[100px] sm:mx-auto sm:ml-[100px]">
                  <ProfileCard
                    name={member.name}
                    title={member.role}
                    handle={member.handle}
                    status={member.status || "Online"}
                    contactText="Contact"
                    avatarUrl={member.avatarUrl}
                    showUserInfo={true}
                    enableTilt={false}
                    enableMobileTilt={false}
                    onContactClick={() => handleContactClick(member)}
                    classInfo={member.class}
                    linkedinUrl={member.linkedin || "#"}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="mb-12 sm:mb-16">
          <SectionHeading title="Secretary & Vice Secretary" />

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 mb-10 sm:mb-14">
            {sortedMembers
              .filter((m) => m.role === "Secretary")
              .map((member) => (
                <div key={member.id} className="w-full max-w-[280px] sm:max-w-sm ml-[100px] sm:mx-auto sm:ml-[100px]">
                  <ProfileCard
                    name={member.name}
                    title={member.role}
                    handle={member.handle}
                    status={member.status || "Online"}
                    contactText="Contact"
                    avatarUrl={member.avatarUrl}
                    showUserInfo={true}
                    enableTilt={false}
                    enableMobileTilt={false}
                    onContactClick={() => handleContactClick(member)}
                    classInfo={member.class}
                    linkedinUrl={member.linkedin || "#"}
                  />
                </div>
              ))}

            {sortedMembers
              .filter((m) => m.role === "Vice Secretary")
              .map((member) => (
                <div key={member.id} className="w-full max-w-[280px] sm:max-w-sm ml-[100px] sm:mx-auto sm:ml-[100px]">
                  <ProfileCard
                    name={member.name}
                    title={member.role}
                    handle={member.handle}
                    status={member.status || "Online"}
                    contactText="Contact"
                    avatarUrl={member.avatarUrl}
                    showUserInfo={true}
                    enableTilt={false}
                    enableMobileTilt={false}
                    onContactClick={() => handleContactClick(member)}
                    classInfo={member.class}
                    linkedinUrl={member.linkedin || "#"}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="mb-12 sm:mb-16">
          <SectionHeading title="Treasurer & Joint Treasurer" />

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 mb-10 sm:mb-14">
            {sortedMembers
              .filter((m) => m.role === "Treasurer")
              .map((member) => (
                <div key={member.id} className="w-full max-w-[280px] sm:max-w-sm ml-[100px] sm:mx-auto sm:ml-[100px]">
                  <ProfileCard
                    name={member.name}
                    title={member.role}
                    handle={member.handle}
                    status={member.status || "Online"}
                    contactText="Contact"
                    avatarUrl={member.avatarUrl}
                    showUserInfo={true}
                    enableTilt={false}
                    enableMobileTilt={false}
                    onContactClick={() => handleContactClick(member)}
                    classInfo={member.class}
                    linkedinUrl={member.linkedin || "#"}
                  />
                </div>
              ))}

            {sortedMembers
              .filter((m) => m.role === "Joint Treasurer")
              .map((member) => (
                <div key={member.id} className="w-full max-w-[280px] sm:max-w-sm ml-[100px] sm:mx-auto sm:ml-[100px]">
                  <ProfileCard
                    name={member.name}
                    title={member.role}
                    handle={member.handle}
                    status={member.status || "Online"}
                    contactText="Contact"
                    avatarUrl={member.avatarUrl}
                    showUserInfo={true}
                    enableTilt={false}
                    enableMobileTilt={false}
                    onContactClick={() => handleContactClick(member)}
                    classInfo={member.class}
                    linkedinUrl={member.linkedin || "#"}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="mb-12 sm:mb-16">
          <SectionHeading title="Clubs" />

          
          {clubsError && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-md p-3 mt-4 max-w-lg mx-auto">
              <p className="text-sm text-white">{clubsError}</p>
            </div>
          )}
          {clubsLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8080ff]"></div>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {Array.isArray(clubs) && clubs.map((club) => {
              if (!club || typeof club !== 'object' || !club.id) return null;
              return (
                <div
                  key={club.id}
                  className="bg-[#111133]/30 backdrop-blur-sm rounded-xl overflow-hidden transition transform hover:scale-105 duration-300 border border-[#8080ff]/20 shadow-[0_4px_20px_rgba(128,128,255,0.15)]"
                >
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-gradient">{club.name}</h3>
                    <p className="text-white/70 mb-4 text-sm sm:text-base">{club.description}</p>

                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-xs sm:text-sm text-white/80 mb-2 uppercase tracking-wider">
                        Faculty Coordinators
                      </h4>
                      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4">
                        {Array.isArray(club.faculty) && club.faculty.length > 0 ? (
                          club.faculty.map((faculty, idx) => {
                            if (!faculty || typeof faculty !== 'object') return null;
                            return (
                              <div
                                key={`club-faculty-${club.id}-${idx}`}
                                data-member-id={`club-faculty-${club.id}-${idx}`}
                                className="flex items-center bg-[#111133]/50 p-2 sm:p-3 rounded-lg border border-[#8080ff]/10 group relative"
                                onMouseEnter={(e) => handleMemberMouseEnter(`club-faculty-${club.id}-${idx}`, e)}
                                onMouseLeave={() => handleMemberMouseLeave(`club-faculty-${club.id}-${idx}`)}
                              >
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden mr-2 sm:mr-3 border border-[#8080ff]">
                                  <img
                                    src={faculty.image || "/placeholder.svg"}
                                    alt={faculty.name || "Faculty"}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    onError={(e) => {
                                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(faculty.name || "Faculty")}&background=111133&color=fff`
                                    }}
                                  />
                                </div>
                                <div>
                                  <p className="font-medium text-white text-xs sm:text-sm">{faculty.name || "Faculty"}</p>
                                  <p className="text-xs text-white/60">{faculty.dept || ""}</p>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-sm text-white/60 p-2">No faculty coordinators available</div>
                        )}
                      </div>
                    </div>

                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-xs sm:text-sm text-white/80 mb-2 uppercase tracking-wider">Student Head</h4>
                      {club.head && club.head.length > 0 ? (
                        <div
                          data-member-id={`club-head-${club.id}`}
                          className="flex items-center bg-[#111133]/50 p-2 sm:p-3 rounded-lg border border-[#8080ff]/10 group relative"
                          onMouseEnter={(e) => handleMemberMouseEnter(`club-head-${club.id}`, e)}
                          onMouseLeave={() => handleMemberMouseLeave(`club-head-${club.id}`)}
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden mr-2 sm:mr-3 border border-[#8080ff]">
                            <img
                              src={club.headImage || "/placeholder.svg"}
                              alt={club.head || "Club Head"}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(club.head || "Club Head")}&background=111133&color=fff`
                              }}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-white text-xs sm:text-sm">{club.head}</p>
                            <p className="text-xs text-white/60">{club.headClass || ""}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-white/60 p-2">No club head assigned</div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="text-sm text-white/60">
                        <span className="font-medium text-[#8080ff]">{club.members}</span> members
                      </div>
                      <button
                        onClick={() => handleViewMembers(club.id)}
                        className={`w-full sm:w-auto px-3 sm:px-4 py-2 rounded-md font-medium text-xs sm:text-sm transition-all ${
                          activeClub === club.id
                            ? "bg-[#8080ff]/40 text-white shadow-[0_0_15px_rgba(128,128,255,0.5)] border border-[#8080ff]/20"
                            : "bg-[#8080ff]/20 text-[#b1caf8] hover:bg-[#8080ff]/30 hover:shadow-[0_0_10px_rgba(128,128,255,0.3)] border border-[#8080ff]/10"
                        }`}
                      >
                        {activeClub === club.id ? "Hide Members" : "View Members"}
                      </button>
                    </div>
                  </div>

                  {activeClub === club.id && (
                    <div className="bg-[#111133]/50 p-4 sm:p-6 border-t border-[#8080ff]/20">
                      <h4 className="font-medium text-white mb-3 sm:mb-4 text-sm sm:text-base">Club Members</h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {Array.isArray(club.memberList) && club.memberList.length > 0 ? (
                          club.memberList.map((memberName, index) => {
                            if (!memberName) return null;
                            const memberId = `member-${club.id}-${index}`;
                            const memberDisplayName = typeof memberName === 'string' ? memberName : 'Member';
                            const avatarUrl = getAvatarUrl(memberDisplayName, index);

                            const memberData = {
                              id: memberId,
                              name: memberDisplayName,
                              role: "Member",
                              avatarUrl: avatarUrl,
                              class: `III CS-${String.fromCharCode(65 + (index % 3))}`,
                              handle: memberDisplayName.toLowerCase().replace(/\s+/g, "_"),
                              status: index % 3 === 0 ? "Online" : index % 3 === 1 ? "Away" : "Offline",
                            }

                            return (
                              <div
                                key={memberId}
                                data-member-id={memberId}
                                className="relative group"
                                onMouseEnter={(e) => handleMemberMouseEnter(memberId, e)}
                                onMouseLeave={() => handleMemberMouseLeave(memberId)}
                              >
                                <div className="flex items-center bg-[#111133]/30 p-2 sm:p-3 rounded-lg border border-[#8080ff]/10 shadow-[0_2px_10px_rgba(128,128,255,0.1)] transition-all duration-300 hover:bg-[#111133]/50">
                                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden mr-2 sm:mr-3 border border-[#8080ff]/50">
                                    <img
                                      src={avatarUrl || "/placeholder.svg"}
                                      alt={memberData.name}
                                      className="w-full h-full object-cover"
                                      loading="lazy"
                                      onError={(e) => {
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(memberData.name)}&background=111133&color=fff`
                                      }}
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="font-medium text-white text-xs sm:text-sm truncate">
                                      {memberData.name}
                                    </p>
                                    <p className="text-xs text-white/60">{memberData.class}</p>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        ) : (
                          <div className="col-span-full text-center py-6">
                            <p className="text-white/60 text-sm">No members in this club yet</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="mb-12 sm:mb-16">
          <SectionHeading title="Executive Members" />

          {executiveMembersError && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-md p-3 mt-4 max-w-lg mx-auto">
              <p className="text-sm text-white">{executiveMembersError}</p>
            </div>
          )}
          
          {executiveMembersLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8080ff]"></div>
            </div>
          ) : (
            <div className="bg-[#111133]/30 backdrop-blur-sm rounded-xl p-4 sm:p-8 border border-[#8080ff]/20 shadow-[0_4px_20px_rgba(128,128,255,0.15)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {executiveMembers.map((member, index) => (
                  <div
                    key={member.id || index}
                    className="group relative p-3 rounded-lg hover:bg-[#1a1a4a]/30 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#8080ff]/30">
                          <img
                            src={member.avatarUrl}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {member.role}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`inline-block w-2 h-2 rounded-full ${
                          member.status === 'Online'
                            ? 'bg-green-400'
                            : member.status === 'Away'
                            ? 'bg-yellow-400'
                            : 'bg-gray-400'
                        }`}></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {typeof window !== "undefined" && window.innerWidth >= 768 && !("ontouchstart" in window) && (
        <div className="fixed inset-0 pointer-events-none z-[1000]">
          {Object.entries(memberProfilesVisible).map(([memberId, isVisible]) => {
            if (!isVisible) return null;

            let memberData = {
              name: "",
              avatarUrl: "",
              linkedinUrl: "#",
            };

            const assocMember = associationMembers.find((m) => m.id === memberId)
            if (assocMember) {
              memberData = {
                name: assocMember.name,
                avatarUrl: assocMember.avatarUrl,
                linkedinUrl: assocMember.linkedin || "#",
              }
            }

            if (memberId.startsWith("faculty-")) {
              const idx = Number.parseInt(memberId.split("-")[1])
              if (facultyCoordinators[idx]) {
                memberData = {
                  name: facultyCoordinators[idx].name,
                  avatarUrl: facultyCoordinators[idx].image,
                  linkedinUrl: "#",
                }
              }
            }

              if (memberId.startsWith("club-faculty-")) {
                const parts = memberId.split("-");
                if (parts.length >= 4) {
                  const clubId = parts[2];
                  const facultyIdx = parseInt(parts[3]);
                  const club = clubs.find((c) => c.id === clubId);
                  if (club && Array.isArray(club.faculty) && club.faculty[facultyIdx]) {
                    const faculty = club.faculty[facultyIdx];
                    memberData = {
                      name: faculty.name || "Faculty",
                      avatarUrl: faculty.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(faculty.name || "Faculty")}&background=111133&color=fff`,
                      linkedinUrl: "#",
                    };
                  }
                }
              }
              
              if (memberId.startsWith("club-head-")) {
              const clubId = memberId.split("-")[2];
              const club = clubs.find((c) => c.id === clubId);
              if (club) {
                memberData = {
                  name: club.head || "Club Head",
                  avatarUrl: club.headImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(club.head || "Club Head")}&background=111133&color=fff`,
                  linkedinUrl: "#",
                };
              }
            }

            if (memberId.startsWith("exec-")) {
              const idx = Number.parseInt(memberId.split("-")[1])
              if (executiveMembers[idx]) {
                memberData = {
                  name: executiveMembers[idx].name,
                  avatarUrl: executiveMembers[idx].image,
                  linkedinUrl: "#",
                }
              }
            }

            if (memberId.startsWith("member-")) {
              const parts = memberId.split("-");
              if (parts.length >= 3) {
                const clubId = parts[1];
                const memberIdx = Number.parseInt(parts[2]);
                const club = clubs.find((c) => c.id === clubId);
                if (club && Array.isArray(club.memberList) && club.memberList[memberIdx]) {
                  const memberName = club.memberList[memberIdx];
                  const memberDisplayName = typeof memberName === 'string' ? memberName : 'Member';
                  const avatarUrl = getAvatarUrl(memberDisplayName, memberIdx);

                  memberData = {
                    name: memberDisplayName,
                    avatarUrl: avatarUrl,
                    linkedinUrl: "#",
                  };
                }
              }
            }

            return (
              <div
                key={`hover-${memberId}`}
                className="absolute pointer-events-auto w-64 sm:w-80"
                style={{
                  top: `${hoverPosition.top}px`,
                  left: `${hoverPosition.left}px`,
                  transform: "translate(-50%, 0)",
                  zIndex: 1100,
                }}
              >
                <SimpleProfileCard
                  name={memberData.name}
                  avatarUrl={memberData.avatarUrl}
                  linkedinUrl={memberData.linkedinUrl}
                />
              </div>
            );
          })}
        </div>
      )}

      <style jsx global>{`
        .text-gradient {
          background: linear-gradient(90deg, #a8b5fb, #b1caf8);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 30px rgba(168, 181, 251, 0.5);
          color: #a8b5fb;
        }
        
        /* Enhanced mobile scrolling fixes */
        html {
          overflow-x: hidden;
          scroll-behavior: smooth;
        }
        
        body {
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-y pinch-zoom;
          overscroll-behavior: contain;
        }
        
        /* Mobile-specific profile card positioning */
        @media (max-width: 639px) {
          /* Remove underline from section headings on mobile */
          .heading-container span {
            border-bottom: none !important;
            padding-bottom: 0 !important;
          }
          
          /* Ensure the page can accommodate the left margin */
          .max-w-6xl {
            max-width: calc(100vw - 20px);
            margin-left: 0;
            margin-right: 0;
            padding-left: 10px;
            padding-right: 10px;
          }
          
          /* Profile card specific mobile styling */
          .profile-card-mobile {
            margin-left: 100px !important;
            max-width: calc(100vw - 120px);
          }
          
          /* Disable all hover effects and transforms on mobile */
          .group:hover,
          .hover\\:scale-105:hover,
          *:hover {
            transform: none !important;
            background-color: inherit !important;
            box-shadow: inherit !important;
          }
          
          /* Fix button touch targets */
          button, a, [role="button"] {
            min-height: 44px;
            min-width: 44px;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
          }
          
          /* Ensure horizontal scrolling is prevented */
          * {
            touch-action: pan-y pinch-zoom !important;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
          }
          
          /* Allow text selection for actual text content */
          p, h1, h2, h3, h4, span {
            -webkit-user-select: text;
            -moz-user-select: text;
            -ms-user-select: text;
            user-select: text;
          }
        }
        
        /* Desktop-only hover effects */
        @media (min-width: 640px) and (hover: hover) {
          .hover\\:scale-105:hover {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default Association;
