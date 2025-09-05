// Association data arrays

export const associationMembers = [
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
