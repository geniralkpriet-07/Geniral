"use client"

import { useState, useRef, useEffect } from "react"
import ProfileCard from "../components/members/ProfileCard"
import SimpleProfileCard from "../components/members/SimpleProfileCard"
import { LightRays } from "../components/loading"

// Deterministic image URLs based on name
const getAvatarUrl = (name, index) => {
  // Create a deterministic number from the name and index
  const nameSum = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const deterministic = (nameSum + index) % 70 // Keep within 0-69 range

  // Use even/odd to determine gender based on name to keep it consistent
  const gender = nameSum % 2 === 0 ? "men" : "women"

  return `https://randomuser.me/api/portraits/${gender}/${deterministic}.jpg`
}

const associationMembers = [
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
]

const clubHeads = [
  {
    id: "ch-1",
    name: "Harshan R",
    role: "Club Head - Tech Patrons",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    handle: "harshan_r",
    status: "Online",
    class: "III CS-A",
    year: "Third Year",
  },
  {
    id: "ch-2",
    name: "Adhithiee Suresh",
    role: "Club Head - Speakzy",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    handle: "adhithiee_s",
    status: "Away",
    class: "III CS-B",
    year: "Third Year",
  },
  {
    id: "ch-3",
    name: "Jei Keshav S",
    role: "Club Head - ECO/ISR",
    avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    handle: "jeikeshav_s",
    status: "Online",
    class: "II CS-A",
    year: "Second Year",
  },
  {
    id: "ch-4",
    name: "Kabila U S",
    role: "Club Head - Admire Hands",
    avatarUrl: "https://randomuser.me/api/portraits/women/22.jpg",
    handle: "kabila_us",
    status: "Offline",
    class: "III CS-A",
    year: "Third Year",
  },
  {
    id: "ch-5",
    name: "Arul M",
    role: "Club Head - Crazy Brains",
    avatarUrl: "https://randomuser.me/api/portraits/men/42.jpg",
    handle: "arul_m",
    status: "Online",
    class: "III CS-B",
    year: "Third Year",
  },
  {
    id: "ch-6",
    name: "Poojaa S",
    role: "Club Head - Happy Bridge",
    avatarUrl: "https://randomuser.me/api/portraits/women/33.jpg",
    handle: "poojaa_s",
    status: "Away",
    class: "II CS-A",
    year: "Second Year",
  },
]

const clubs = [
  {
    id: "tech-patrons",
    name: "TECH PATRONS",
    description: "Leading technological innovation on campus",
    members: 9,
    faculty: [
      { name: "Mr. Rajeshkumar S", dept: "CSE", image: "https://randomuser.me/api/portraits/men/42.jpg" },
      { name: "Ms. Vishnupriya", dept: "IT", image: "https://randomuser.me/api/portraits/women/41.jpg" },
    ],
    head: "Harshan R",
    headImage: "https://randomuser.me/api/portraits/men/32.jpg",
    headClass: "III CS-A",
    memberList: [
      "Mohanappriya K",
      "Pavithra",
      "Aborrvaa Ammaiyappan",
      "Abdul Majeed R",
      "Mithuna Kamalanathan",
      "Karnika N",
      "Makavishnu S",
      "Arjun T",
      "Antony Rojes M",
    ],
  },
  {
    id: "speakzy",
    name: "SPEAKZY",
    description: "Focused on developing communication and public speaking skills",
    members: 8,
    faculty: [
      { name: "Dr. Nisha Soms", dept: "CSE", image: "https://randomuser.me/api/portraits/women/42.jpg" },
      { name: "Ms. Mouthami", dept: "ECE", image: "https://randomuser.me/api/portraits/women/43.jpg" },
    ],
    head: "Adhithiee Suresh",
    headImage: "https://randomuser.me/api/portraits/women/44.jpg",
    headClass: "III CS-B",
    memberList: [
      "Harini L",
      "Afsa Parveen A",
      "Aakhasii J P",
      "Charulatha M",
      "Gowtham J",
      "Indira Devi V",
      "Kavirathna T",
      "Kalin Cammrina P",
    ],
  },
  {
    id: "eco-isr",
    name: "ECO/ISR",
    description: "Promoting environmental awareness and social responsibility",
    members: 7,
    faculty: [
      { name: "Mr. Premkumar", dept: "CSE", image: "https://randomuser.me/api/portraits/men/45.jpg" },
      { name: "Dr. Primya", dept: "IT", image: "https://randomuser.me/api/portraits/women/45.jpg" },
    ],
    head: "Jei Keshav S",
    headImage: "https://randomuser.me/api/portraits/men/75.jpg",
    headClass: "II CS-A",
    memberList: [
      "Kanimuthu AR M",
      "Devamithra A",
      "Dipika Jasmine J",
      "Harshini N S",
      "Kanishka S",
      "Adhithya R",
      "Gokuladharshin",
    ],
  },
  {
    id: "admire-hands",
    name: "ADMIRE HANDS",
    description: "Celebrating creativity and artistic expression",
    members: 8,
    faculty: [
      { name: "Mr. Mohan", dept: "CSE", image: "https://randomuser.me/api/portraits/men/36.jpg" },
      { name: "Mr. Kandasamy", dept: "IT", image: "https://randomuser.me/api/portraits/men/37.jpg" },
    ],
    head: "Kabila U S",
    headImage: "https://randomuser.me/api/portraits/women/22.jpg",
    headClass: "III CS-A",
    memberList: [
      "Divya Dharshini R",
      "Bhavasri K",
      "Bharath S",
      "Madhumitha Perananthan",
      "Akarshana G",
      "Merlin Vanetta V",
      "Harshid S",
      "Mouriyan",
    ],
  },
  {
    id: "crazy-brains",
    name: "CRAZY BRAINS",
    description: "Exploring innovative problem-solving",
    members: 8,
    faculty: [
      { name: "Ms. Sasikala", dept: "IT", image: "https://randomuser.me/api/portraits/women/36.jpg" },
      { name: "Ms. Jeevitha", dept: "CSE", image: "https://randomuser.me/api/portraits/women/37.jpg" },
    ],
    head: "Arul M",
    headImage: "https://randomuser.me/api/portraits/men/42.jpg",
    headClass: "III CS-B",
    memberList: [
      "Lhathika V",
      "Bhoomika P",
      "Deepika R",
      "Divya K M",
      "Manunanditha T",
      "Muralitharan",
      "Mukilan",
      "Manoranjan",
    ],
  },
  {
    id: "happy-bridge",
    name: "HAPPY BRIDGE",
    description: "Building connections through cultural and social activities",
    members: 7,
    faculty: [
      { name: "Ms. Sri Sathya", dept: "CSE", image: "https://randomuser.me/api/portraits/women/38.jpg" },
      { name: "Ms. Avani Chandran", dept: "ECE", image: "https://randomuser.me/api/portraits/women/39.jpg" },
    ],
    head: "Poojaa S",
    headImage: "https://randomuser.me/api/portraits/women/33.jpg",
    headClass: "II CS-A",
    memberList: ["Dharchana M A", "Dharanisri K", "Divya R", "Laksitha S", "Monika M", "Midhun P", "Bavan K N"],
  },
]

const facultyCoordinators = [
  {
    name: "Dr. Jayanth Choudary",
    role: "Technical Support",
    department: "Professor, CSE",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
  },
  {
    name: "Dr. Nisha Soms",
    role: "Speakzy",
    department: "Asst. Professor, CSE",
    image: "https://randomuser.me/api/portraits/women/42.jpg",
  },
  {
    name: "Mr. Rajeshkumar S",
    role: "Tech Patrons",
    department: "Asst. Professor, CSE",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Mr. Premkumar",
    role: "ECO/ISR",
    department: "Asst. Professor, ECE",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Mr. Mohan",
    role: "Admire Hands",
    department: "Asst. Professor, CSE",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    name: "Ms. Sasikala",
    role: "Crazy Brains",
    department: "Asst. Professor, IT",
    image: "https://randomuser.me/api/portraits/women/36.jpg",
  },
]

const executiveMembers = [
  { name: "Sharmili", class: "II ME CS", image: "https://randomuser.me/api/portraits/women/20.jpg" },
  { name: "Anjali Chaudhary", class: "II CS A", image: "https://randomuser.me/api/portraits/women/21.jpg" },
  { name: "Ariharan A", class: "II CS A", image: "https://randomuser.me/api/portraits/men/21.jpg" },
  { name: "Makavishnu S", class: "II CS B", image: "https://randomuser.me/api/portraits/men/22.jpg" },
  { name: "Gayathri N", class: "II CS B", image: "https://randomuser.me/api/portraits/women/22.jpg" },
  { name: "Arunkumar K R", class: "III CS A", image: "https://randomuser.me/api/portraits/men/23.jpg" },
  { name: "Bala Sivakannan J", class: "III CS A", image: "https://randomuser.me/api/portraits/men/24.jpg" },
  { name: "Pranav V M", class: "III CS B", image: "https://randomuser.me/api/portraits/men/25.jpg" },
  { name: "Kavya S", class: "III CS B", image: "https://randomuser.me/api/portraits/women/25.jpg" },
]

const Association = () => {
  const [activeClub, setActiveClub] = useState(null)
  const [hoveredMember, setHoveredMember] = useState(null)
  const [memberProfilesVisible, setMemberProfilesVisible] = useState({})
  const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 })
  const hoverTimeoutsRef = useRef({})

  // Create refs for all section headings
  const headingRefs = useRef([])

  // Effect for heading animations
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

  // Add a heading to refs
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

  // Updated handler functions for hover behavior with position tracking
  const handleMemberMouseEnter = (memberId, event) => {
    // Clear any existing timeout for this member
    if (hoverTimeoutsRef.current[memberId]) {
      clearTimeout(hoverTimeoutsRef.current[memberId])
      delete hoverTimeoutsRef.current[memberId]
    }

    // Get the position of the hovered element
    if (event && event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const bottomY = rect.bottom

      // Ensure card doesn't go off-screen
      const maxHeight = window.innerHeight - 20 // 20px margin
      const yPos = Math.min(bottomY + 20, maxHeight - 280) // 280px for card height

      setHoverPosition({
        top: yPos,
        left: centerX,
      })
    }

    setHoveredMember(memberId)
    setMemberProfilesVisible((prev) => ({ ...prev, [memberId]: true }))
  }

  const handleMemberMouseLeave = (memberId) => {
    // Set a timeout to hide the profile after 2 seconds
    hoverTimeoutsRef.current[memberId] = setTimeout(() => {
      setMemberProfilesVisible((prev) => ({ ...prev, [memberId]: false }))
      delete hoverTimeoutsRef.current[memberId]
    }, 800) // 2 second delay
  }

  const getRoleOrder = (role) => {
    const roleOrder = {
      President: 1,
      "Vice President": 2,
      Treasurer: 3,
      "Joint Treasurer": 4,
      Secretary: 5,
      "Vice Secretary": 6,
      "Club Head": 7,
      Member: 8,
    }
    return roleOrder[role] || 99
  }

  const sortedMembers = [...associationMembers].sort((a, b) => getRoleOrder(a.role) - getRoleOrder(b.role))

  // Create a reusable section heading component with light rays
  const SectionHeading = ({ title }) => (
    <h2 ref={addToRefs} className="text-3xl font-bold mb-10 text-center heading-container">
      <span className="border-b-4 border-[#8080ff] pb-2 text-gradient relative">
        {title}
        <div className="heading-rays"></div>
      </span>
    </h2>
  )

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
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-[#8080ff]/30 via-[#5050aa]/20 to-transparent blur-3xl opacity-60"></div>

        <div className="max-w-6xl mx-auto px-6 py-16 relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-6 drop-shadow-[0_0_30px_rgba(128,128,255,0.3)]">
            KPRIET <span className="text-gradient">STUDENT ASSOCIATION</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90 leading-7 mb-6">
            Meet our dedicated team of student leaders committed to enhancing campus life and driving student
            initiatives
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* President & Vice President Section */}
        <div className="mb-16">
          <SectionHeading title="President & Vice President" />

          <div className="flex justify-center gap-8 mb-14 flex-wrap">
            {sortedMembers
              .filter((m) => m.role === "President")
              .map((member) => (
                <div key={member.id} className="w-full max-w-xs">
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
                  />
                </div>
              ))}

            {sortedMembers
              .filter((m) => m.role === "Vice President")
              .map((member) => (
                <div key={member.id} className="w-full max-w-xs">
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
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="mb-16">
          <SectionHeading title="Secretary & Vice Secretary" />

          <div className="flex justify-center gap-8 mb-14 flex-wrap">
            {sortedMembers
              .filter((m) => m.role === "Secretary")
              .map((member) => (
                <div key={member.id} className="w-full max-w-xs">
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
                  />
                </div>
              ))}

            {sortedMembers
              .filter((m) => m.role === "Vice Secretary")
              .map((member) => (
                <div key={member.id} className="w-full max-w-xs">
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
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="mb-16">
          <SectionHeading title="Treasurer & Joint Treasurer" />

          <div className="flex justify-center gap-8 mb-14 flex-wrap">
            {sortedMembers
              .filter((m) => m.role === "Treasurer")
              .map((member) => (
                <div key={member.id} className="w-full max-w-xs">
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
                  />
                </div>
              ))}

            {sortedMembers
              .filter((m) => m.role === "Joint Treasurer")
              .map((member) => (
                <div key={member.id} className="w-full max-w-xs">
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
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="mb-16">
          <SectionHeading title="Faculty Coordinators" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {facultyCoordinators.map((faculty, idx) => (
              <div
                key={`faculty-${idx}`}
                data-member-id={`faculty-${idx}`}
                className="bg-[#111133]/30 backdrop-blur-sm rounded-xl overflow-hidden p-6 border border-[#8080ff]/20 shadow-[0_4px_20px_rgba(128,128,255,0.15)] group relative"
                onMouseEnter={(e) => handleMemberMouseEnter(`faculty-${idx}`, e)}
                onMouseLeave={() => handleMemberMouseLeave(`faculty-${idx}`)}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-[#8080ff]">
                  <img
                    src={faculty.image || "/placeholder.svg"}
                    alt={faculty.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(faculty.name)}&background=111133&color=fff`
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-center mb-1 text-gradient">{faculty.name}</h3>
                <p className="text-center text-white/70 mb-3">{faculty.role}</p>
                <div className="flex justify-center">
                  <div className="bg-[#8080ff]/20 px-3 py-1 rounded-full text-sm text-white">{faculty.department}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <SectionHeading title="Clubs" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {clubs.map((club) => {
              return (
                <div
                  key={club.id}
                  className="bg-[#111133]/30 backdrop-blur-sm rounded-xl overflow-hidden transition transform hover:scale-105 duration-300 border border-[#8080ff]/20 shadow-[0_4px_20px_rgba(128,128,255,0.15)]"
                >
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
                            data-member-id={`club-faculty-${club.id}-${idx}`}
                            className="flex items-center bg-[#111133]/50 p-3 rounded-lg border border-[#8080ff]/10 group relative"
                            onMouseEnter={(e) => handleMemberMouseEnter(`club-faculty-${club.id}-${idx}`, e)}
                            onMouseLeave={() => handleMemberMouseLeave(`club-faculty-${club.id}-${idx}`)}
                          >
                            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-[#8080ff]">
                              <img
                                src={faculty.image || "/placeholder.svg"}
                                alt={faculty.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(faculty.name)}&background=111133&color=fff`
                                }}
                              />
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
                        data-member-id={`club-head-${club.id}`}
                        className="flex items-center bg-[#111133]/50 p-3 rounded-lg border border-[#8080ff]/10 group relative"
                        onMouseEnter={(e) => handleMemberMouseEnter(`club-head-${club.id}`, e)}
                        onMouseLeave={() => handleMemberMouseLeave(`club-head-${club.id}`)}
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-[#8080ff]">
                          <img
                            src={club.headImage || "/placeholder.svg"}
                            alt={club.head}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(club.head)}&background=111133&color=fff`
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm">{club.head}</p>
                          <p className="text-xs text-white/60">{club.headClass}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-white/60">
                        <span className="font-medium text-[#8080ff]">{club.members}</span> members
                      </div>
                      <button
                        onClick={() => handleViewMembers(club.id)}
                        className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
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
                    <div className="bg-[#111133]/50 p-6 border-t border-[#8080ff]/20">
                      <h4 className="font-medium text-white mb-4">Club Members</h4>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {club.memberList &&
                          club.memberList.map((memberName, index) => {
                            const memberId = `member-${club.id}-${index}`
                            // Get consistent avatar URL based on name
                            const avatarUrl = getAvatarUrl(memberName, index)

                            const memberData = {
                              id: memberId,
                              name: memberName,
                              role: "Member",
                              avatarUrl: avatarUrl,
                              class: `III CS-${String.fromCharCode(65 + (index % 3))}`,
                              handle: memberName.toLowerCase().replace(/\s+/g, "_"),
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
                                <div className="flex items-center bg-[#111133]/30 p-3 rounded-lg border border-[#8080ff]/10 shadow-[0_2px_10px_rgba(128,128,255,0.1)] transition-all duration-300 hover:bg-[#111133]/50">
                                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-[#8080ff]/50">
                                    <img
                                      src={avatarUrl || "/placeholder.svg"}
                                      alt={memberData.name}
                                      className="w-full h-full object-cover"
                                      loading="lazy"
                                      onError={(e) => {
                                        // Fallback if image fails to load
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(memberData.name)}&background=111133&color=fff`
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <p className="font-medium text-white text-sm">{memberData.name}</p>
                                    <p className="text-xs text-white/60">{memberData.class}</p>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="mb-16">
          <SectionHeading title="Executive Members" />

          <div className="bg-[#111133]/30 backdrop-blur-sm rounded-xl p-8 border border-[#8080ff]/20 shadow-[0_4px_20px_rgba(128,128,255,0.15)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {executiveMembers.map((member, index) => {
                const execMemberId = `exec-${index}`
                return (
                  <div
                    key={execMemberId}
                    data-member-id={execMemberId}
                    className="flex items-center bg-[#111133]/50 p-4 rounded-lg border border-[#8080ff]/10 group relative"
                    onMouseEnter={(e) => handleMemberMouseEnter(execMemberId, e)}
                    onMouseLeave={() => handleMemberMouseLeave(execMemberId)}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3 border border-[#8080ff]">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-white">{member.name}</p>
                      <div className="flex items-center mt-1">
                        <div className="px-2 py-0.5 bg-[#8080ff]/20 rounded-md text-xs text-white">{member.class}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Hover overlay with direct positioning based on hovered element */}
      <div className="fixed inset-0 pointer-events-none z-[1000]">
        {Object.entries(memberProfilesVisible).map(([memberId, isVisible]) => {
          if (!isVisible) return null

          // Find the member data based on the memberId
          let memberData = {
            name: "",
            avatarUrl: "",
            linkedinUrl: "#",
          }

          // Association members
          const assocMember = associationMembers.find((m) => m.id === memberId)
          if (assocMember) {
            memberData = {
              name: assocMember.name,
              avatarUrl: assocMember.avatarUrl,
              linkedinUrl: assocMember.linkedin || "#",
            }
          }

          // Faculty coordinators
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

          // Club faculty
          if (memberId.startsWith("club-faculty-")) {
            const [_, __, clubId, facultyIdx] = memberId.split("-")
            const club = clubs.find((c) => c.id === clubId)
            if (club && club.faculty && club.faculty[facultyIdx]) {
              memberData = {
                name: club.faculty[facultyIdx].name,
                avatarUrl: club.faculty[facultyIdx].image,
                linkedinUrl: "#",
              }
            }
          }

          // Club head
          if (memberId.startsWith("club-head-")) {
            const clubId = memberId.split("-")[2]
            const club = clubs.find((c) => c.id === clubId)
            if (club) {
              memberData = {
                name: club.head,
                avatarUrl: club.headImage,
                linkedinUrl: "#",
              }
            }
          }

          // Executive members
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

          // Club members
          if (memberId.startsWith("member-")) {
            const parts = memberId.split("-")
            if (parts.length >= 3) {
              const clubId = parts[1]
              const memberIdx = Number.parseInt(parts[2])
              const club = clubs.find((c) => c.id === clubId)
              if (club && club.memberList && club.memberList[memberIdx]) {
                const memberName = club.memberList[memberIdx]
                // Use the same deterministic avatar function
                const avatarUrl = getAvatarUrl(memberName, memberIdx)

                memberData = {
                  name: memberName,
                  avatarUrl: avatarUrl,
                  linkedinUrl: "#",
                }
              }
            }
          }

          // If hoverPosition exists for the current member
          return (
            <div
              key={`hover-${memberId}`}
              className="absolute pointer-events-auto w-80"
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
          )
        })}
      </div>

      <style>{`
                .text-gradient {
                    background: linear-gradient(90deg, #a8b5fb, #b1caf8);
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-shadow: 0 0 30px rgba(168, 181, 251, 0.5);
                    color: #a8b5fb;
                }
                
                .president-card {
                    transform: scale(1.1);
                }
                
                @media (max-width: 768px) {
                    .president-card {
                        transform: scale(1);
                    }
                }
                
                .heading-container {
                    position: relative;
                    overflow: visible;
                    margin-bottom: 4rem;
                }
                
                .heading-rays {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 200%;
                    height: 200%;
                    transform: translate(-50%, -50%);
                    opacity: 0;
                    pointer-events: none;
                    background: radial-gradient(
                        ellipse at center,
                        rgba(128, 128, 255, 0.4) 0%,
                        rgba(128, 128, 255, 0) 70%
                    );
                    transition: opacity 0.5s ease-in-out;
                }
                
                .heading-container.heading-visible .heading-rays {
                    opacity: 0.6;
                    animation: pulse 3s infinite alternate;
                }
                
                @keyframes pulse {
                    0% {
                        transform: translate(-50%, -50%) scale(0.8);
                        opacity: 0.3;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(1.2);
                        opacity: 0.6;
                    }
                }
            `}</style>
    </div>
  )
}

export default Association
