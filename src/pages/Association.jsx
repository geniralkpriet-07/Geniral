"use client"

import { useState, useRef, useEffect } from "react"
import ProfileCard from "../components/members/ProfileCard"
import SimpleProfileCard from "../components/members/SimpleProfileCard"
import { LightRays } from "../components/loading"
const getAvatarUrl = (name, index) => {
  const nameSum = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const deterministic = (nameSum + index) % 70

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

  const headingRefs = useRef([])

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

  const SectionHeading = ({ title }) => (
    <h2 ref={addToRefs} className="text-3xl font-bold mb-10 text-center heading-container">
      <span className="border-b-4 border-[#8080ff] pb-2 text-gradient relative">
        {title}
        <div className="heading-rays"></div>
      </span>
    </h2>
  )

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
          <SectionHeading title="Faculty Coordinators" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {facultyCoordinators.map((faculty, idx) => (
              <div
                key={`faculty-${idx}`}
                data-member-id={`faculty-${idx}`}
                className="bg-[#111133]/30 backdrop-blur-sm rounded-xl overflow-hidden p-4 sm:p-6 border border-[#8080ff]/20 shadow-[0_4px_20px_rgba(128,128,255,0.15)] group relative"
                onMouseEnter={(e) => handleMemberMouseEnter(`faculty-${idx}`, e)}
                onMouseLeave={() => handleMemberMouseLeave(`faculty-${idx}`)}
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mx-auto mb-3 sm:mb-4 border-2 border-[#8080ff]">
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
                <h3 className="text-lg sm:text-xl font-bold text-center mb-1 text-gradient">{faculty.name}</h3>
                <p className="text-center text-white/70 mb-3 text-sm">{faculty.role}</p>
                <div className="flex justify-center">
                  <div className="bg-[#8080ff]/20 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-white">
                    {faculty.department}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12 sm:mb-16">
          <SectionHeading title="Clubs" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {clubs.map((club) => {
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
                        {club.faculty.map((faculty, idx) => (
                          <div
                            key={`club-faculty-${club.id}-${idx}`}
                            data-member-id={`club-faculty-${club.id}-${idx}`}
                            className="flex items-center bg-[#111133]/50 p-2 sm:p-3 rounded-lg border border-[#8080ff]/10 group relative"
                            onMouseEnter={(e) => handleMemberMouseEnter(`club-faculty-${club.id}-${idx}`, e)}
                            onMouseLeave={() => handleMemberMouseLeave(`club-faculty-${club.id}-${idx}`)}
                          >
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden mr-2 sm:mr-3 border border-[#8080ff]">
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
                              <p className="font-medium text-white text-xs sm:text-sm">{faculty.name}</p>
                              <p className="text-xs text-white/60">{faculty.dept}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-xs sm:text-sm text-white/80 mb-2 uppercase tracking-wider">Student Head</h4>
                      <div
                        data-member-id={`club-head-${club.id}`}
                        className="flex items-center bg-[#111133]/50 p-2 sm:p-3 rounded-lg border border-[#8080ff]/10 group relative"
                        onMouseEnter={(e) => handleMemberMouseEnter(`club-head-${club.id}`, e)}
                        onMouseLeave={() => handleMemberMouseLeave(`club-head-${club.id}`)}
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden mr-2 sm:mr-3 border border-[#8080ff]">
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
                          <p className="font-medium text-white text-xs sm:text-sm">{club.head}</p>
                          <p className="text-xs text-white/60">{club.headClass}</p>
                        </div>
                      </div>
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
                        {club.memberList &&
                          club.memberList.map((memberName, index) => {
                            const memberId = `member-${club.id}-${index}`
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
                          })}
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

          <div className="bg-[#111133]/30 backdrop-blur-sm rounded-xl p-4 sm:p-8 border border-[#8080ff]/20 shadow-[0_4px_20px_rgba(128,128,255,0.15)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {executiveMembers.map((member, index) => {
                const execMemberId = `exec-${index}`
                return (
                  <div
                    key={execMemberId}
                    data-member-id={execMemberId}
                    className="flex items-center bg-[#111133]/50 p-3 sm:p-4 rounded-lg border border-[#8080ff]/10 group relative"
                    onMouseEnter={(e) => handleMemberMouseEnter(execMemberId, e)}
                    onMouseLeave={() => handleMemberMouseLeave(execMemberId)}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-2 sm:mr-3 border border-[#8080ff]">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-white text-sm sm:text-base truncate">{member.name}</p>
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

      {typeof window !== "undefined" && window.innerWidth >= 768 && !("ontouchstart" in window) && (
        <div className="fixed inset-0 pointer-events-none z-[1000]">
          {Object.entries(memberProfilesVisible).map(([memberId, isVisible]) => {
            if (!isVisible) return null

            let memberData = {
              name: "",
              avatarUrl: "",
              linkedinUrl: "#",
            }

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
              const parts = memberId.split("-")
              if (parts.length >= 3) {
                const clubId = parts[1]
                const memberIdx = Number.parseInt(parts[2])
                const club = clubs.find((c) => c.id === clubId)
                if (club && club.memberList && club.memberList[memberIdx]) {
                  const memberName = club.memberList[memberIdx]
                  const avatarUrl = getAvatarUrl(memberName, memberIdx)

                  memberData = {
                    name: memberName,
                    avatarUrl: avatarUrl,
                    linkedinUrl: "#",
                  }
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
            )
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
  )
}

export default Association
