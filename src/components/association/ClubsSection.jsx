import React, { useState } from 'react';
import { clubs } from './data';

const ClubsSection = () => {
    const [activeClub, setActiveClub] = useState(null);
    const [memberProfilesVisible, setMemberProfilesVisible] = useState({});
    
    const handleViewMembers = (clubId) => {
        setActiveClub(clubId === activeClub ? null : clubId);
        
        // Reset member profiles visibility state
        setMemberProfilesVisible({});
    };
    
    return (
        <div className="clubs-section py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {clubs.map(club => (
                    <div key={club.id} className="club-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-gradient">{club.name}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{club.description}</p>
                            
                            <div className="flex items-center mb-4">
                                <img src={club.headImage} alt={club.head} className="w-10 h-10 rounded-full mr-3" />
                                <div>
                                    <p className="font-semibold">{club.head}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{club.headClass}</p>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500 dark:text-gray-400">{club.members} Members</span>
                                <button 
                                    onClick={() => handleViewMembers(club.id)}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                                >
                                    {activeClub === club.id ? 'Hide Members' : 'View Members'}
                                </button>
                            </div>
                            
                            {activeClub === club.id && (
                                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                                    <h4 className="font-semibold mb-2">Members:</h4>
                                    <ul className="space-y-1">
                                        {club.memberList.map((member, idx) => (
                                            <li key={idx} className="text-sm">{member}</li>
                                        ))}
                                    </ul>
                                    
                                    <h4 className="font-semibold mt-4 mb-2">Faculty Advisors:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {club.faculty.map((faculty, idx) => (
                                            <div key={idx} className="flex items-center">
                                                <img src={faculty.image} alt={faculty.name} className="w-8 h-8 rounded-full mr-2" />
                                                <div>
                                                    <p className="text-sm font-medium">{faculty.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{faculty.dept}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClubsSection;
