// Data for Association Page

export const associationMembers = [
  {
    id: 'pres-1',
    name: 'Raman Kishore R R',
    role: 'President',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    class: 'IV CS-A',
    contact: 'raman.kishore@example.com'
  },
  {
    id: 'vp-1',
    name: 'Ramya G',
    role: 'Vice President',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    class: 'III CS-B',
    contact: 'ramya.g@example.com'
  },
  {
    id: 'sec-1',
    name: 'Divyashri T K S',
    role: 'Secretary',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
    class: 'III CS-A',
    contact: 'divyashri.tks@example.com'
  },
  {
    id: 'jsec-1',
    name: 'Harshad K',
    role: 'Joint Secretary',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    class: 'II CS-B',
    contact: 'harshad.k@example.com'
  },
  {
    id: 'tres-1',
    name: 'Vishali S',
    role: 'Treasurer',
    image: 'https://randomuser.me/api/portraits/women/23.jpg',
    class: 'III CS-B',
    contact: 'vishali.s@example.com'
  },
  {
    id: 'jtres-1',
    name: 'Harchana R',
    role: 'Joint Treasurer',
    image: 'https://randomuser.me/api/portraits/women/24.jpg',
    class: 'II CS-A',
    contact: 'harchana.r@example.com'
  }
];

export const clubHeads = [
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

export const clubs = [
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

export const facultyCoordinators = [
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

export const executiveMembers = [
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

export const committees = {
  technicalSupport: {
    name: "Technical Support",
    faculty: { name: "Dr. Jayanth Choudary", role: "Professor, CSE", image: "https://randomuser.me/api/portraits/men/42.jpg" },
    members: [
      { name: "Dhanush S", class: "II CS B", image: "https://randomuser.me/api/portraits/men/26.jpg" },
      { name: "Midhun P", class: "II CS A", image: "https://randomuser.me/api/portraits/men/27.jpg" },
      { name: "Bhavisha S", class: "II CS A", image: "https://randomuser.me/api/portraits/women/26.jpg" },
      { name: "Aadhithya V", class: "II CS B", image: "https://randomuser.me/api/portraits/men/28.jpg" },
      { name: "Manoranjan K", class: "IV CS A", image: "https://randomuser.me/api/portraits/men/29.jpg" }
    ]
  },
  branding: {
    name: "Branding & Promotion",
    members: [
      { name: "Logith", class: "II CS B", image: "https://randomuser.me/api/portraits/men/30.jpg" },
      { name: "Hari L", class: "III CS A", image: "https://randomuser.me/api/portraits/men/31.jpg" },
      { name: "Dheena Sanjay Anadh A", class: "II CS B", image: "https://randomuser.me/api/portraits/men/32.jpg" },
      { name: "Bharath S", class: "III CS A", image: "https://randomuser.me/api/portraits/men/33.jpg" }
    ]
  },
  sponsorship: {
    name: "Sponsorship & PRO",
    faculty: { name: "Ms. Princy", role: "Faculty Coordinator", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    members: [
      { name: "Ramji B", class: "III CS B", image: "https://randomuser.me/api/portraits/men/34.jpg" },
      { name: "Jaswin", class: "II CS A", image: "https://randomuser.me/api/portraits/men/35.jpg" },
      { name: "Mithun G", class: "II CS B", image: "https://randomuser.me/api/portraits/men/36.jpg" },
      { name: "Jaishanv K B", class: "III CS A", image: "https://randomuser.me/api/portraits/men/37.jpg" }
    ]
  },
  media: {
    name: "Media & Photography",
    faculty: { name: "Ms. Suganya M", role: "Faculty Coordinator", image: "https://randomuser.me/api/portraits/women/45.jpg" },
    members: [
      { name: "Adhikeshavan V", class: "III CS A", image: "https://randomuser.me/api/portraits/men/38.jpg" },
      { name: "Harshid S", class: "II CS B", image: "https://randomuser.me/api/portraits/men/39.jpg" },
      { name: "Mouriyan", class: "II CS B", image: "https://randomuser.me/api/portraits/men/40.jpg" },
      { name: "Lalith Kishore", class: "III CS B", image: "https://randomuser.me/api/portraits/men/41.jpg" }
    ]
  },
  womenEmpowerment: {
    name: "Women Empowerment",
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
  }
};

export const volunteers = [
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
