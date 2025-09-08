import React, { useState } from 'react';
import { clubs } from './data';
import { FaListAlt, FaThLarge } from "react-icons/fa";

const ClubsSection = () => {
    const [activeClub, setActiveClub] = useState(null);
    const [memberProfilesVisible, setMemberProfilesVisible] = useState({});
    const [viewType, setViewType] = useState('grid'); // grid or list
    
    const handleViewMembers = (clubId) => {
        setActiveClub(clubId === activeClub ? null : clubId);
        
        // Reset member profiles visibility state
        setMemberProfilesVisible({});
    };
    
    return (
        <div className="clubs-section py-10">
            <div className="flex justify-end mb-4">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button 
                        type="button" 
                        onClick={() => setViewType('grid')}
                        className={`px-4 py-2 text-sm font-medium rounded-l-lg flex items-center ${viewType === 'grid' 
                            ? 'bg-purple-700 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'}`}
                    >
                        <FaThLarge className="mr-2" /> Grid
                    </button>
                    <button 
                        type="button"
                        onClick={() => setViewType('list')}
                        className={`px-4 py-2 text-sm font-medium rounded-r-lg flex items-center ${viewType === 'list' 
                            ? 'bg-purple-700 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'}`}
                    >
                        <FaListAlt className="mr-2" /> List
                    </button>
                </div>
            </div>

            {viewType === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {clubs.map(club => (
                        <div key={club.id} className="club-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-gradient">{club.name}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">{club.description}</p>
                                
                                <div className="flex items-center mb-4">
                                    {club.headImage ? (
                                        <img src={club.headImage} alt={club.head} className="w-10 h-10 rounded-full mr-3" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full mr-3 bg-purple-600 flex items-center justify-center text-white font-bold">
                                            {club.head.charAt(0)}
                                        </div>
                                    )}
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
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Club</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Club Head</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Members</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            {clubs.map(club => (
                                <tr key={club.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{club.name}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-300">{club.description.substring(0, 60)}...</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {club.headImage ? (
                                                <img src={club.headImage} alt={club.head} className="w-8 h-8 rounded-full mr-2" />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full mr-2 bg-purple-600 flex items-center justify-center text-white font-bold">
                                                    {club.head.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{club.head}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-300">{club.headClass}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 dark:text-gray-300">{club.members}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button 
                                            onClick={() => handleViewMembers(club.id)}
                                            className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition"
                                        >
                                            {activeClub === club.id ? 'Hide' : 'View'} Members
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ClubsSection;
