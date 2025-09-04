import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import './ClubMembers.css';

type MemberRole = 'President' | 'Vice President' | 'Secretary' | 'Vice Secretary' | 'Treasurer' | 'Vice Treasurer' | 'Member';

interface ClubMember {
  id: string;
  name: string;
  role: MemberRole;
  avatarUrl: string;
  handle: string;
  status?: string;
  department?: string;
  year?: string;
}

interface Club {
  id: string;
  name: string;
  description: string;
  members: ClubMember[];
}

const clubsData: Club[] = [
  {
    id: 'coding-club',
    name: 'Coding Club',
    description: 'A community for coding enthusiasts to learn and grow together.',
    members: [
      {
        id: 'cc-1',
        name: 'Alex Johnson',
        role: 'President',
        avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
        handle: 'alexcode',
        status: 'Online',
        department: 'Computer Science',
        year: 'Final Year'
      },
      {
        id: 'cc-2',
        name: 'Sarah Miller',
        role: 'Vice President',
        avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
        handle: 'sarahdev',
        status: 'Away',
        department: 'Information Technology',
        year: 'Third Year'
      },
      {
        id: 'cc-3',
        name: 'Mike Chen',
        role: 'Secretary',
        avatarUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
        handle: 'mikechen',
        status: 'Online',
        department: 'Computer Science',
        year: 'Second Year'
      },
      {
        id: 'cc-4',
        name: 'Emma Wilson',
        role: 'Vice Secretary',
        avatarUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
        handle: 'emmaw',
        status: 'Offline',
        department: 'Data Science',
        year: 'Third Year'
      },
      {
        id: 'cc-5',
        name: 'David Lee',
        role: 'Treasurer',
        avatarUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
        handle: 'davidlee',
        status: 'Online',
        department: 'Software Engineering',
        year: 'Final Year'
      },
      {
        id: 'cc-6',
        name: 'Olivia Brown',
        role: 'Vice Treasurer',
        avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
        handle: 'oliviab',
        status: 'Away',
        department: 'AI & ML',
        year: 'Second Year'
      },
      {
        id: 'cc-7',
        name: 'Ryan Garcia',
        role: 'Member',
        avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
        handle: 'ryang',
        status: 'Online',
        department: 'Computer Science',
        year: 'First Year'
      },
      {
        id: 'cc-8',
        name: 'Sophie Taylor',
        role: 'Member',
        avatarUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
        handle: 'sophiet',
        status: 'Online',
        department: 'Information Technology',
        year: 'Second Year'
      },
      {
        id: 'cc-9',
        name: 'James Wilson',
        role: 'Member',
        avatarUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
        handle: 'jamesw',
        status: 'Offline',
        department: 'Cyber Security',
        year: 'Third Year'
      },
      {
        id: 'cc-10',
        name: 'Ava Martinez',
        role: 'Member',
        avatarUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
        handle: 'avam',
        status: 'Online',
        department: 'Computer Science',
        year: 'First Year'
      },
      {
        id: 'cc-11',
        name: 'Lucas Park',
        role: 'Member',
        avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
        handle: 'lucasp',
        status: 'Away',
        department: 'Data Science',
        year: 'Second Year'
      }
    ]
  },
  {
    id: 'robotics-club',
    name: 'Robotics Club',
    description: 'Designing, building and programming robots for competitions and innovation.',
    members: [
      {
        id: 'rc-1',
        name: 'Ethan Rodriguez',
        role: 'President',
        avatarUrl: 'https://randomuser.me/api/portraits/men/67.jpg',
        handle: 'ethanbot',
        status: 'Online',
        department: 'Mechanical Engineering',
        year: 'Final Year'
      },
      {
        id: 'rc-2',
        name: 'Isabella Wang',
        role: 'Vice President',
        avatarUrl: 'https://randomuser.me/api/portraits/women/79.jpg',
        handle: 'isabellar',
        status: 'Online',
        department: 'Electronics',
        year: 'Third Year'
      },
      {
        id: 'rc-3',
        name: 'Noah Kim',
        role: 'Secretary',
        avatarUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
        handle: 'noahk',
        status: 'Away',
        department: 'Computer Science',
        year: 'Third Year'
      },
      {
        id: 'rc-4',
        name: 'Charlotte Davis',
        role: 'Vice Secretary',
        avatarUrl: 'https://randomuser.me/api/portraits/women/28.jpg',
        handle: 'charlotted',
        status: 'Online',
        department: 'Electrical Engineering',
        year: 'Second Year'
      },
      {
        id: 'rc-5',
        name: 'William Thompson',
        role: 'Treasurer',
        avatarUrl: 'https://randomuser.me/api/portraits/men/23.jpg',
        handle: 'williamt',
        status: 'Offline',
        department: 'Mechanical Engineering',
        year: 'Final Year'
      },
      {
        id: 'rc-6',
        name: 'Sophia Martinez',
        role: 'Vice Treasurer',
        avatarUrl: 'https://randomuser.me/api/portraits/women/50.jpg',
        handle: 'sophiam',
        status: 'Online',
        department: 'Mechatronics',
        year: 'Third Year'
      },
      {
        id: 'rc-7',
        name: 'Benjamin Scott',
        role: 'Member',
        avatarUrl: 'https://randomuser.me/api/portraits/men/91.jpg',
        handle: 'bens',
        status: 'Online',
        department: 'Computer Engineering',
        year: 'Second Year'
      },
      {
        id: 'rc-8',
        name: 'Mia Johnson',
        role: 'Member',
        avatarUrl: 'https://randomuser.me/api/portraits/women/63.jpg',
        handle: 'miaj',
        status: 'Away',
        department: 'AI & Robotics',
        year: 'Third Year'
      },
      {
        id: 'rc-9',
        name: 'Henry Garcia',
        role: 'Member',
        avatarUrl: 'https://randomuser.me/api/portraits/men/37.jpg',
        handle: 'henryg',
        status: 'Online',
        department: 'Electronics',
        year: 'First Year'
      },
      {
        id: 'rc-10',
        name: 'Amelia Roberts',
        role: 'Member',
        avatarUrl: 'https://randomuser.me/api/portraits/women/39.jpg',
        handle: 'ameliar',
        status: 'Offline',
        department: 'Robotics',
        year: 'Second Year'
      },
      {
        id: 'rc-11',
        name: 'Daniel Lee',
        role: 'Member',
        avatarUrl: 'https://randomuser.me/api/portraits/men/47.jpg',
        handle: 'daniell',
        status: 'Online',
        department: 'Mechanical Engineering',
        year: 'First Year'
      }
    ]
  },
  {
    id: 'arts-club',
    name: 'Arts & Culture Club',
    description: 'Celebrating creativity, artistic expression and cultural diversity.',
    members: [
      {
        id: 'ac-1',
        name: 'Olivia Wilson',
        role: 'President',
        avatarUrl: 'https://randomuser.me/api/portraits/women/31.jpg',
        handle: 'oliviaw',
        status: 'Online',
        department: 'Fine Arts',
        year: 'Final Year'
      },
      {
        id: 'ac-2',
        name: 'Liam Jackson',
        role: 'Vice President',
        avatarUrl: 'https://randomuser.me/api/portraits/men/64.jpg',
        handle: 'liamj',
        status: 'Away',
        department: 'Design',
        year: 'Third Year'
      },
      {
        id: 'ac-3',
        name: 'Emma Roberts',
        role: 'Secretary',
        avatarUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
        handle: 'emmar',
        status: 'Online',
        department: 'Liberal Arts',
        year: 'Third Year'
      },
      {
        id: 'ac-4',
        name: 'Mason Thompson',
        role: 'Vice Secretary',
        avatarUrl: 'https://randomuser.me/api/portraits/men/82.jpg',
        handle: 'masont',
        status: 'Online',
        department: 'Visual Arts',
        year: 'Second Year'
      },
      {
        id: 'ac-5',
        name: 'Ava Brown',
        role: 'Treasurer',
        avatarUrl: 'https://randomuser.me/api/portraits/women/17.jpg',
        handle: 'avab',
        status: 'Online',
        department: 'Performing Arts',
        year: 'Final Year'
      },
      {
        id: 'ac-6',
        name: 'Elijah Davis',
        role: 'Vice Treasurer',
        avatarUrl: 'https://randomuser.me/api/portraits/men/27.jpg',
        handle: 'elijahd',
        status: 'Offline',
        department: 'Music',
        year: 'Third Year'
      },
      {
        id: 'ac-7',
        name: 'Sofia Patel',
        role: 'Member',
        avatarUrl: 'https://randomuser.me/api/portraits/women/57.jpg',
        handle: 'sofiap',
        status: 'Online',
        department: 'Dance',
        year: 'Second Year'
      },
      {
        id: 'ac-8',
        name: 'Logan Martin',
        role: 'Member',
        avatarUrl: 'https://randomuser.me/api/portraits/men/19.jpg',
        handle: 'loganm',
        status: 'Away',
        department: 'Fine Arts',
        year: 'First Year'
      },
      {
        id: 'ac-9',
        name: 'Zoe Garcia',
        role: 'Member',
        avatarUrl: 'https://randomuser.me/api/portraits/women/74.jpg',
        handle: 'zoeg',
        status: 'Online',
        department: 'Design',
        year: 'Second Year'
      },
      {
        id: 'ac-10',
        name: 'Carter White',
        role: 'Member',
        avatarUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
        handle: 'carterw',
        status: 'Online',
        department: 'Theater',
        year: 'Third Year'
      },
      {
        id: 'ac-11',
        name: 'Lily Anderson',
        role: 'Member',
        avatarUrl: 'https://randomuser.me/api/portraits/women/23.jpg',
        handle: 'lilya',
        status: 'Offline',
        department: 'Music',
        year: 'First Year'
      }
    ]
  }
];

interface ClubMembersProps {
  clubId?: string;
  onClose?: () => void;
}

const ClubMembers: React.FC<ClubMembersProps> = ({ clubId, onClose }) => {
  const [selectedClub, setSelectedClub] = useState<Club | null>(
    clubId ? clubsData.find(club => club.id === clubId) || clubsData[0] : clubsData[0]
  );

  const handleClubChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newClubId = e.target.value;
    setSelectedClub(clubsData.find(club => club.id === newClubId) || null);
  };

  const groupedMembers = selectedClub?.members.reduce((acc, member) => {
    if (!acc[member.role]) {
      acc[member.role] = [];
    }
    acc[member.role].push(member);
    return acc;
  }, {} as Record<MemberRole, ClubMember[]>) || {};

  const roleOrder: MemberRole[] = [
    'President', 
    'Vice President', 
    'Secretary', 
    'Vice Secretary', 
    'Treasurer', 
    'Vice Treasurer', 
    'Member'
  ];

  const handleContactClick = (member: ClubMember) => {
    console.log(`Contacting ${member.name}`);
    alert(`Contacting ${member.name} (${member.role})`);
  };

  return (
    <div className="club-members-container">
      <div className="club-members-header">
        <h2>Club Members</h2>
        {onClose && (
          <button className="close-btn" onClick={onClose}>
            <span>&times;</span>
          </button>
        )}
      </div>

      <div className="club-selector">
        <label htmlFor="club-select">Select Club:</label>
        <select 
          id="club-select" 
          value={selectedClub?.id || ''}
          onChange={handleClubChange}
        >
          {clubsData.map(club => (
            <option key={club.id} value={club.id}>
              {club.name}
            </option>
          ))}
        </select>
      </div>

      {selectedClub && (
        <div className="club-description">
          <h3>{selectedClub.name}</h3>
          <p>{selectedClub.description}</p>
        </div>
      )}

      <div className="members-wrapper">
        {roleOrder.map(role => (
          groupedMembers[role] && groupedMembers[role].length > 0 && (
            <div key={role} className="role-section">
              <h4 className="role-title">{role}s</h4>
              <div className="members-grid">
                {groupedMembers[role].map(member => (
                  <ProfileCard
                    key={member.id}
                    name={member.name}
                    title={`${role} - ${member.department}`}
                    handle={member.handle}
                    status={member.status || 'Offline'}
                    avatarUrl={member.avatarUrl}
                    contactText="Contact"
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                    onContactClick={() => handleContactClick(member)}
                  />
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default ClubMembers;