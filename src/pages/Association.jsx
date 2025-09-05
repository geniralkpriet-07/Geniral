import React, { useState, useRef, useEffect } from 'react';
import ProfileCard from '../components/members/ProfileCard';
import { LightRays } from '../components/loading';

const associationMembers = [
  {
    id: 'pres-1',
    name: 'Raman Kishore R R',
    role: 'President',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    handle: 'raman_k',
    status: 'Online',
    class: 'IV CS-A',
    year: 'Final Year',
    linkedin: ''
  },
  {
    id: 'vp-1',
    name: 'Ramya G',
    role: 'Vice President',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    handle: 'ramya_g',
    status: 'Away',
    class: 'III CS-B',
    year: 'Third Year',
    linkedin: ''
  },

  {
    id: 'sec-1',
    name: 'Divyashri T K S',
    role: 'Secretary',
    avatarUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
    handle: 'divyashri_t',
    status: 'Online',
    class: 'IV CS-B',
    year: 'Final Year',
    linkedin: ''
  },
  {
    id: 'jsec-1',
    name: 'Dhanya Sai Shree M',
    role: 'Vice Secretary',
    avatarUrl: 'https://randomuser.me/api/portraits/women/41.jpg',
    handle: 'dhanya_m',
    status: 'Online',
    class: 'III CS-A',
    year: 'Third Year',
    linkedin: ''
  },
  {
    id: 'tres-1',
    name: 'Karthikeyan M',
    role: 'Treasurer',
    avatarUrl: 'https://randomuser.me/api/portraits/men/65.jpg',
    handle: 'karthikeyan_m',
    status: 'Away',
    class: 'III CS-B',
    year: 'Third Year',
    linkedin: ''
  },
  {
    id: 'jtres-1',
    name: 'Lakshmi Narasimar R',
    role: 'Joint Treasurer',
    avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
    handle: 'lakshmi_n',
    status: 'Offline',
    class: 'II CS-B',
    year: 'Second Year',
    linkedin: ''
  }
];

const clubHeads = [
  {
    id: 'ch-1',
    name: 'Harshan R',
    role: 'Club Head - Tech Patrons',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    handle: 'harshan_r',
    status: 'Online',
    class: 'III CS-A',
    year: 'Third Year'
  },
  {
    id: 'ch-2',
    name: 'Adhithiee Suresh',
    role: 'Club Head - Speakzy',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    handle: 'adhithiee_s',
    status: 'Away',
    class: 'III CS-B',
    year: 'Third Year'
  },
  {
    id: 'ch-3',
    name: 'Jei Keshav S',
    role: 'Club Head - ECO/ISR',
    avatarUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    handle: 'jeikeshav_s',
    status: 'Online',
    class: 'II CS-A',
    year: 'Second Year'
  },
  {
    id: 'ch-4',
    name: 'Kabila U S',
    role: 'Club Head - Admire Hands',
    avatarUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
    handle: 'kabila_us',
    status: 'Offline',
    class: 'III CS-A',
    year: 'Third Year'
  },
  {
    id: 'ch-5',
    name: 'Arul M',
    role: 'Club Head - Crazy Brains',
    avatarUrl: 'https://randomuser.me/api/portraits/men/42.jpg',
    handle: 'arul_m',
    status: 'Online',
    class: 'III CS-B',
    year: 'Third Year'
  },
  {
    id: 'ch-6',
    name: 'Poojaa S',
    role: 'Club Head - Happy Bridge',
    avatarUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
    handle: 'poojaa_s',
    status: 'Away',
    class: 'II CS-A',
    year: 'Second Year'
  }
];

const clubs = [
  {
    id: 'tech-patrons',
    name: 'TECH PATRONS',
    description: "Leading technological innovation on campus",
    members: 9,
    faculty: [
      { name: "Mr. Rajeshkumar S", dept: "CSE", image: "https://randomuser.me/api/portraits/men/42.jpg" },
      { name: "Ms. Vishnupriya", dept: "IT", image: "https://randomuser.me/api/portraits/women/41.jpg" }
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
      "Antony Rojes M"
    ]
  },
  {
    id: 'speakzy',
    name: 'SPEAKZY',
    description: "Focused on developing communication and public speaking skills",
    members: 8,
    faculty: [
      { name: "Dr. Nisha Soms", dept: "CSE", image: "https://randomuser.me/api/portraits/women/42.jpg" },
      { name: "Ms. Mouthami", dept: "ECE", image: "https://randomuser.me/api/portraits/women/43.jpg" }
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
      "Kalin Cammrina P"
    ]
  },
  {
    id: 'eco-isr',
    name: 'ECO/ISR',
    description: "Promoting environmental awareness and social responsibility",
    members: 7,
    faculty: [
      { name: "Mr. Premkumar", dept: "CSE", image: "https://randomuser.me/api/portraits/men/45.jpg" },
      { name: "Dr. Primya", dept: "IT", image: "https://randomuser.me/api/portraits/women/45.jpg" }
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
      "Gokuladharshin"
    ]
  },
  {
    id: 'admire-hands',
    name: 'ADMIRE HANDS',
    description: "Celebrating creativity and artistic expression",
    members: 8,
    faculty: [
      { name: "Mr. Mohan", dept: "CSE", image: "https://randomuser.me/api/portraits/men/36.jpg" },
      { name: "Mr. Kandasamy", dept: "IT", image: "https://randomuser.me/api/portraits/men/37.jpg" }
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
      "Mouriyan"
    ]
  },
  {
    id: 'crazy-brains',
    name: 'CRAZY BRAINS',
    description: "Exploring innovative problem-solving",
    members: 8,
    faculty: [
      { name: "Ms. Sasikala", dept: "IT", image: "https://randomuser.me/api/portraits/women/36.jpg" },
      { name: "Ms. Jeevitha", dept: "CSE", image: "https://randomuser.me/api/portraits/women/37.jpg" }
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
      "Manoranjan"
    ]
  },
  {
    id: 'happy-bridge',
    name: 'HAPPY BRIDGE',
    description: "Building connections through cultural and social activities",
    members: 7,
    faculty: [
      { name: "Ms. Sri Sathya", dept: "CSE", image: "https://randomuser.me/api/portraits/women/38.jpg" },
      { name: "Ms. Avani Chandran", dept: "ECE", image: "https://randomuser.me/api/portraits/women/39.jpg" }
    ],
    head: "Poojaa S",
    headImage: "https://randomuser.me/api/portraits/women/33.jpg",
    headClass: "II CS-A",
    memberList: [
      "Dharchana M A",
      "Dharanisri K",
      "Divya R",
      "Laksitha S",
      "Monika M",
      "Midhun P",
      "Bavan K N"
    ]
  }
];

const facultyCoordinators = [
  {
    name: "Dr. Jayanth Choudary",
    role: "Technical Support",
    department: "Professor, CSE",
    image: "https://randomuser.me/api/portraits/men/42.jpg"
  },
  {
    name: "Dr. Nisha Soms",
    role: "Speakzy",
    department: "Asst. Professor, CSE",
    image: "https://randomuser.me/api/portraits/women/42.jpg"
  },
  {
    name: "Mr. Rajeshkumar S",
    role: "Tech Patrons",
    department: "Asst. Professor, CSE",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Mr. Premkumar",
    role: "ECO/ISR",
    department: "Asst. Professor, ECE",
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    name: "Mr. Mohan",
    role: "Admire Hands",
    department: "Asst. Professor, CSE",
    image: "https://randomuser.me/api/portraits/men/36.jpg"
  },
  {
    name: "Ms. Sasikala",
    role: "Crazy Brains",
    department: "Asst. Professor, IT",
    image: "https://randomuser.me/api/portraits/women/36.jpg"
  }
];

const executiveMembers = [
  { name: "Sharmili", class: "II ME CS", image: "https://randomuser.me/api/portraits/women/20.jpg" },
  { name: "Anjali Chaudhary", class: "II CS A", image: "https://randomuser.me/api/portraits/women/21.jpg" },
  { name: "Ariharan A", class: "II CS A", image: "https://randomuser.me/api/portraits/men/21.jpg" },
  { name: "Makavishnu S", class: "II CS B", image: "https://randomuser.me/api/portraits/men/22.jpg" },
  { name: "Gayathri N", class: "II CS B", image: "https://randomuser.me/api/portraits/women/22.jpg" },
  { name: "Arunkumar K R", class: "III CS A", image: "https://randomuser.me/api/portraits/men/23.jpg" },
  { name: "Bala Sivakannan J", class: "III CS A", image: "https://randomuser.me/api/portraits/men/24.jpg" },
  { name: "Pranav V M", class: "III CS B", image: "https://randomuser.me/api/portraits/men/25.jpg" },
  { name: "Kavya S", class: "III CS B", image: "https://randomuser.me/api/portraits/women/25.jpg" }
];

const committees = {
  technicalSupport: {
    name: "Technical Support",
    faculty: { name: "Mr. Jayanth Choudary", image: "https://randomuser.me/api/portraits/men/42.jpg" },
    members: [
      { name: "Dhanush S", class: "II CS B", image: "https://randomuser.me/api/portraits/men/26.jpg" },
      { name: "Midhun P", class: "II CS A", image: "https://randomuser.me/api/portraits/men/27.jpg" },
      { name: "Bhavisha S", class: "II CS A", image: "https://randomuser.me/api/portraits/women/26.jpg" },
      { name: "Aadhithya V", class: "II CS B", image: "https://randomuser.me/api/portraits/men/28.jpg" },
      { name: "Manoranjan K", class: "IV CS A", image: "https://randomuser.me/api/portraits/men/29.jpg" }
    ]
  },
  culturalCoordinators: {
    name: "Cultural Coordinators",
    faculty: [
      { name: "Ms. Nandhini", image: "https://randomuser.me/api/portraits/women/27.jpg" },
      { name: "Ms. Kiruthika J K", image: "https://randomuser.me/api/portraits/women/28.jpg" }
    ],
    members: [
      { name: "Deepthi N", class: "II CS A", image: "https://randomuser.me/api/portraits/women/29.jpg" },
      { name: "Aboorva Ammaiyappan", class: "III CS A", image: "https://randomuser.me/api/portraits/women/30.jpg" },
      { name: "Parthasarathi J", class: "II CS B", image: "https://randomuser.me/api/portraits/men/30.jpg" },
      { name: "Madhumitha Perananthan", class: "III CS A", image: "https://randomuser.me/api/portraits/women/31.jpg" },
      { name: "Harshitha P K", class: "II CS A", image: "https://randomuser.me/api/portraits/women/32.jpg" }
    ]
  },
  registrationCertificates: {
    name: "Registration & Certificates",
    members: [
      { name: "Poojaa S", class: "II CS A", image: "https://randomuser.me/api/portraits/women/33.jpg" },
      { name: "Lhathika V", class: "III CS B", image: "https://randomuser.me/api/portraits/women/34.jpg" },
      { name: "Jayaswaroopa", class: "II CS B", image: "https://randomuser.me/api/portraits/women/35.jpg" },
      { name: "Aisvarya", class: "II CS A", image: "https://randomuser.me/api/portraits/women/36.jpg" },
      { name: "Logith", class: "II CS B", image: "https://randomuser.me/api/portraits/men/31.jpg" }
    ]
  },
  brandingPromotion: {
    name: "Branding & Promotion",
    members: [
      { name: "Hari L", class: "III CS A", image: "https://randomuser.me/api/portraits/men/32.jpg" },
      { name: "Dheena Sanjay Anadh A", class: "II CS B", image: "https://randomuser.me/api/portraits/men/33.jpg" },
      { name: "Bharath S", class: "III CS A", image: "https://randomuser.me/api/portraits/men/34.jpg" }
    ]
  },
  sponsorshipPRO: {
    name: "Sponsorship & PRO",
    faculty: { name: "Ms. Princy", image: "https://randomuser.me/api/portraits/women/46.jpg" },
    members: [
      { name: "Ramji B", class: "III CS B", image: "https://randomuser.me/api/portraits/men/35.jpg" },
      { name: "Jaswin", class: "II CS A", image: "https://randomuser.me/api/portraits/men/36.jpg" },
      { name: "Mithun G", class: "II CS B", image: "https://randomuser.me/api/portraits/men/37.jpg" },
      { name: "Jaishanv K B", class: "III CS A", image: "https://randomuser.me/api/portraits/men/38.jpg" }
    ]
  },
  mediaPhotography: {
    name: "Media & Photography",
    faculty: { name: "Ms. Suganya M", image: "https://randomuser.me/api/portraits/women/47.jpg" },
    members: [
      { name: "Adhikeshavan V", class: "III CS A", image: "https://randomuser.me/api/portraits/men/39.jpg" },
      { name: "Harshid S", class: "II CS B", image: "https://randomuser.me/api/portraits/men/40.jpg" },
      { name: "Mouriyan", class: "II CS B", image: "https://randomuser.me/api/portraits/men/41.jpg" },
      { name: "Lalith Kishore", class: "III CS B", image: "https://randomuser.me/api/portraits/men/42.jpg" }
    ]
  }
};

const volunteers = [
  { name: "Bramma Deva", class: "II CS A", image: "https://randomuser.me/api/portraits/men/43.jpg" },
  { name: "Dharun M", class: "II CS A", image: "https://randomuser.me/api/portraits/men/44.jpg" },
  { name: "Aadhira B R", class: "II CS A", image: "https://randomuser.me/api/portraits/women/48.jpg" },
  { name: "Aishwarya", class: "II CS A", image: "https://randomuser.me/api/portraits/women/49.jpg" },
  { name: "Gayathiri N", class: "II CS A", image: "https://randomuser.me/api/portraits/women/50.jpg" },
  { name: "Kowshika M", class: "II CS A", image: "https://randomuser.me/api/portraits/women/51.jpg" },
  { name: "Govarthini S", class: "II CS A", image: "https://randomuser.me/api/portraits/women/52.jpg" },
  { name: "Harini N", class: "II CS A", image: "https://randomuser.me/api/portraits/women/53.jpg" },
  { name: "Janahvee M", class: "II CS B", image: "https://randomuser.me/api/portraits/women/54.jpg" },
  { name: "Keerthana Sri B", class: "II CS B", image: "https://randomuser.me/api/portraits/women/55.jpg" },
  { name: "Gokuladharshin", class: "II CS B", image: "https://randomuser.me/api/portraits/men/45.jpg" },
  { name: "Mithuna R", class: "II CS B", image: "https://randomuser.me/api/portraits/women/56.jpg" }
];

const Association = () => {
  const [activeClub, setActiveClub] = useState(null);
  const [hoveredMember, setHoveredMember] = useState(null);
  
  // Create refs for all section headings
  const headingRefs = useRef([]);

  // Effect for heading animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('heading-visible');
          }
        });
      },
      { threshold: 0.3 }
    );
    
    const headingElements = headingRefs.current;
    headingElements.forEach(el => {
      if (el) observer.observe(el);
    });
    
    return () => {
      headingElements.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Add a heading to refs
  const addToRefs = (el) => {
    if (el && !headingRefs.current.includes(el)) {
      headingRefs.current.push(el);
    }
  };

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

  // Create a reusable section heading component with light rays
  const SectionHeading = ({ title }) => (
    <h2 
      ref={addToRefs} 
      className="text-3xl font-bold mb-10 text-center heading-container"
    >
      <span className="border-b-4 border-purple-500 pb-2 text-gradient relative">
        {title}
        <div className="heading-rays"></div>
      </span>
    </h2>
  );

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
        {/* President & Vice President Section */}
        <div className="mb-16">
          
          <SectionHeading title="President & Vice President" />
          
          <div className="flex justify-center gap-8 mb-14 flex-wrap">
            {sortedMembers.filter(m => m.role === 'President').map(member => (
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
                  className="president-card"
                  classInfo={member.class}
                  linkedinUrl={member.linkedin || "#"}
                />
              </div>
            ))}
            
            {sortedMembers.filter(m => m.role === 'Vice President').map(member => (
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
        
        {/* Secretary & Vice Secretary Section */}
        <div className="mb-16">
          <SectionHeading title="Secretary & Vice Secretary" />
          
          <div className="flex justify-center gap-8 mb-14 flex-wrap">
            {sortedMembers.filter(m => m.role === 'Secretary').map(member => (
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
            
            {sortedMembers.filter(m => m.role === 'Vice Secretary').map(member => (
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
        
        {/* Treasurer & Joint Treasurer Section */}
        <div className="mb-16">
          <SectionHeading title="Treasurer & Joint Treasurer" />
          
          <div className="flex justify-center gap-8 mb-14 flex-wrap">
            {sortedMembers.filter(m => m.role === 'Treasurer').map(member => (
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
            
            {sortedMembers.filter(m => m.role === 'Joint Treasurer').map(member => (
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
        
        {/* Faculty Coordinators Section */}
        <div className="mb-16">
          <SectionHeading title="Faculty Coordinators" />
          
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
        
        {/* Clubs Section */}
        <div className="mb-16">
          <SectionHeading title="Clubs" />
          
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
                          const memberData = {
                            id: memberId,
                            name: memberName,
                            role: 'Member',
                            avatarUrl: `https://randomuser.me/api/portraits/${gender}/${randomNum}.jpg`,
                            class: `III CS-${String.fromCharCode(65 + index % 3)}`,
                            handle: memberName.toLowerCase().replace(/\s+/g, '_'),
                            status: index % 3 === 0 ? 'Online' : (index % 3 === 1 ? 'Away' : 'Offline')
                          };
                          
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
        
        {/* Committees Section with New Design */}
        <div className="mb-16">
          <SectionHeading title="Committees" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.values(committees).map((committee, idx) => (
              <div key={`committee-${idx}`} className="bg-[#111133]/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-[0_4px_20px_rgba(139,92,246,0.15)]">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-600/30 border border-purple-500/40 mr-4">
                    <span className="text-xl font-bold text-white">{committee.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gradient">{committee.name}</h3>
                </div>
                
                {/* Faculty information if present */}
                {committee.faculty && (
                  <div className="mb-6">
                    <h4 className="text-sm text-white/80 mb-2 uppercase tracking-wider">Faculty Coordinator</h4>
                    {Array.isArray(committee.faculty) ? (
                      <div className="flex flex-wrap gap-3">
                        {committee.faculty.map((faculty, fidx) => (
                          <div 
                            key={`committee-faculty-${idx}-${fidx}`}
                            className="flex items-center bg-[#111133]/50 p-3 rounded-lg border border-purple-500/10 group relative"
                            onMouseEnter={() => setHoveredMember(`committee-faculty-${idx}-${fidx}`)}
                            onMouseLeave={() => setHoveredMember(null)}
                          >
                            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-purple-400">
                              <img src={faculty.image} alt={faculty.name} className="w-full h-full object-cover" />
                            </div>
                            <p className="font-medium text-white text-sm">{faculty.name}</p>
                            
                            {/* Full Profile on Hover */}
                            <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 transition-all duration-300 z-[1000] ${
                              hoveredMember === `committee-faculty-${idx}-${fidx}` ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                            } profile-hover-container`} style={{ height: 'auto', maxHeight: '80vh' }}>
                              <ProfileCard
                                name={faculty.name}
                                title="Faculty Coordinator"
                                avatarUrl={faculty.image}
                                linkedinUrl="#"
                                showUserInfo={true}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div 
                        className="flex items-center bg-[#111133]/50 p-3 rounded-lg border border-purple-500/10 group relative"
                        onMouseEnter={() => setHoveredMember(`committee-faculty-single-${idx}`)}
                        onMouseLeave={() => setHoveredMember(null)}
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-purple-400">
                          <img src={committee.faculty.image} alt={committee.faculty.name} className="w-full h-full object-cover" />
                        </div>
                        <p className="font-medium text-white text-sm">{committee.faculty.name}</p>
                        
                        {/* Full Profile on Hover */}
                        <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 transition-all duration-300 z-[1000] ${
                          hoveredMember === `committee-faculty-single-${idx}` ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                        } profile-hover-container`} style={{ height: 'auto', maxHeight: '80vh' }}>
                          <ProfileCard
                            name={committee.faculty.name}
                            title="Faculty Coordinator"
                            avatarUrl={committee.faculty.image}
                            linkedinUrl="#"
                            showUserInfo={true}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Committee members */}
                <div>
                  <h4 className="text-sm text-white/80 mb-3 uppercase tracking-wider">Committee Members</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {committee.members.map((member, midx) => (
                      <div 
                        key={`committee-member-${idx}-${midx}`}
                        className="flex items-center bg-[#111133]/50 p-3 rounded-lg border border-purple-500/10 group relative"
                        onMouseEnter={() => setHoveredMember(`committee-member-${idx}-${midx}`)}
                        onMouseLeave={() => setHoveredMember(null)}
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-purple-400">
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm">{member.name}</p>
                          {member.class && <p className="text-xs text-white/60">{member.class}</p>}
                        </div>
                        
                        {/* Full Profile on Hover */}
                        <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 transition-all duration-300 z-[1000] ${
                          hoveredMember === `committee-member-${idx}-${midx}` ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                        } profile-hover-container`} style={{ height: 'auto', maxHeight: '80vh' }}>
                          <ProfileCard
                            name={member.name}
                            title="Committee Member"
                            avatarUrl={member.image}
                            linkedinUrl="#"
                            showUserInfo={true}
                            classInfo={member.class}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Executive Members Section - Moved Below */}
        <div className="mb-16">
          <SectionHeading title="Executive Members" />
          
          <div className="bg-[#111133]/30 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 shadow-[0_4px_20px_rgba(139,92,246,0.15)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {executiveMembers.map((member, index) => {
                return (
                  <div 
                    key={`exec-${index}`} 
                    className="flex items-center bg-[#111133]/50 p-4 rounded-lg border border-purple-500/10 group relative"
                    onMouseEnter={() => setHoveredMember(`exec-${index}`)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3 border border-purple-400">
                      <img 
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-white">{member.name}</p>
                      <div className="flex items-center mt-1">
                        <div className="px-2 py-0.5 bg-purple-600/20 rounded-md text-xs text-white">
                          {member.class}
                        </div>
                      </div>
                    </div>
                    
                    {/* Full Profile on Hover */}
                    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 transition-all duration-300 z-[1000] ${
                      hoveredMember === `exec-${index}` ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                    } profile-hover-container`} style={{ height: 'auto', maxHeight: '80vh' }}>
                      <ProfileCard
                        name={member.name}
                        title="Executive Member"
                        avatarUrl={member.image}
                        linkedinUrl="#"
                        showUserInfo={true}
                        classInfo={member.class}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Volunteers Section with Profile Cards */}
        <div>
          <SectionHeading title="Volunteers" />
          
          <div className="bg-[#111133]/30 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 shadow-[0_4px_20px_rgba(139,92,246,0.15)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {volunteers.map((volunteer, idx) => (
                <div 
                  key={`volunteer-${idx}`} 
                  className="flex items-center bg-[#111133]/50 p-3 rounded-lg border border-purple-500/10 group relative"
                  onMouseEnter={() => setHoveredMember(`volunteer-${idx}`)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-purple-400">
                    <img 
                      src={volunteer.image} 
                      alt={volunteer.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">{volunteer.name}</p>
                    <p className="text-xs text-white/60">{volunteer.class}</p>
                  </div>
                  
                  {/* Full Profile on Hover */}
                  <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 transition-all duration-300 z-[1000] ${
                    hoveredMember === `volunteer-${idx}` ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                  } profile-hover-container`} style={{ height: 'auto', maxHeight: '80vh' }}>
                    <ProfileCard
                      name={volunteer.name}
                      title="Volunteer"
                      avatarUrl={volunteer.image}
                      linkedinUrl=""
                      showUserInfo={true}
                      classInfo={volunteer.class}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed position hovering profiles container */}
      <div className="fixed inset-0 pointer-events-none z-[1000]">
        {facultyCoordinators.map((faculty, idx) => (
          <div 
            key={`faculty-hover-${idx}`} 
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 transition-all duration-300 ${
              hoveredMember === `faculty-${idx}` ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'
            }`}
          >
            <div className="bg-[#111133]/90 backdrop-blur-md p-4 rounded-xl border border-purple-500/50 shadow-[0_10px_50px_-5px_rgba(139,92,246,0.8)]">
              <ProfileCard
                name={faculty.name}
                title={faculty.role}
                avatarUrl={faculty.image}
                linkedinUrl="#"
                showUserInfo={true}
                classInfo={faculty.department}
              />
            </div>
          </div>
        ))}
        
        {/* Apply the same fix for club faculty */}
        {clubs.map(club => 
          club.faculty.map((faculty, idx) => (
            <div 
              key={`club-faculty-hover-${club.id}-${idx}`} 
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 transition-all duration-300 ${
                hoveredMember === `club-faculty-${club.id}-${idx}` ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'
              }`}
            >
              <div className="bg-[#111133]/90 backdrop-blur-md p-4 rounded-xl border border-purple-500/50 shadow-[0_10px_50px_-5px_rgba(139,92,246,0.8)]">
                <ProfileCard
                  name={faculty.name}
                  title="Faculty Coordinator"
                  avatarUrl={faculty.image}
                  linkedinUrl="#"
                  showUserInfo={true}
                  classInfo={faculty.dept}
                />
              </div>
            </div>
          ))
        )}
        
        {/* Apply the same fix for club heads */}
        {clubs.map(club => (
          <div 
            key={`club-head-hover-${club.id}`} 
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 transition-all duration-300 ${
              hoveredMember === `club-head-${club.id}` ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'
            }`}
          >
            <div className="bg-[#111133]/90 backdrop-blur-md p-4 rounded-xl border border-purple-500/50 shadow-[0_10px_50px_-5px_rgba(139,92,246,0.8)]">
              <ProfileCard
                name={club.head}
                title={`Club Head - ${club.name}`}
                avatarUrl={club.headImage}
                linkedinUrl="#"
                showUserInfo={true}
                classInfo={club.headClass}
              />
            </div>
          </div>
        ))}

        {/* Similar containers for other hover profiles... */}
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
            rgba(139, 92, 246, 0.4) 0%,
            rgba(139, 92, 246, 0) 70%
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
  );
};

export default Association;