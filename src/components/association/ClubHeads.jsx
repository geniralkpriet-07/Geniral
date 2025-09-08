import React, { useState } from 'react';
import { clubHeads } from './data';
import ProfileCard from '../members/ProfileCard';
import { FaLinkedin } from "react-icons/fa";

const ClubHeads = () => {
    const [hoveredMember, setHoveredMember] = useState(null);
    const [viewType, setViewType] = useState('grid'); // grid or list
    
    // Handle mouse enter for member profiles
    const handleMemberMouseEnter = (memberId) => {
        setHoveredMember(memberId);
    };
    
    // Handle mouse leave for member profiles
    const handleMemberMouseLeave = () => {
        setHoveredMember(null);
    };
    
    const handleContactClick = (head) => {
        if (head.linkedin) {
            window.open(head.linkedin, "_blank", "noopener,noreferrer");
        } else {
            alert(`Contacting ${head.name} (${head.role})`);
        }
    };
    
    return (
        <div className="club-heads-section py-10">
            <div className="flex justify-end mb-4">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button 
                        type="button" 
                        onClick={() => setViewType('grid')}
                        className={`px-4 py-2 text-sm font-medium rounded-l-lg ${viewType === 'grid' 
                            ? 'bg-purple-700 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'}`}
                    >
                        Grid View
                    </button>
                    <button 
                        type="button"
                        onClick={() => setViewType('list')}
                        className={`px-4 py-2 text-sm font-medium rounded-r-lg ${viewType === 'list' 
                            ? 'bg-purple-700 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'}`}
                    >
                        List View
                    </button>
                </div>
            </div>

            {viewType === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {clubHeads.map(head => (
                        <div key={head.id} 
                            className="member-card-container"
                            onMouseEnter={() => handleMemberMouseEnter(head.id)}
                            onMouseLeave={handleMemberMouseLeave}
                        >
                            <ProfileCard 
                                name={head.name}
                                title={head.role}
                                handle={head.handle}
                                status={head.status || "Online"}
                                contactText="Contact"
                                avatarUrl={head.avatarUrl} // This can now be empty
                                showUserInfo={true}
                                enableTilt={true}
                                enableMobileTilt={false}
                                onContactClick={() => handleContactClick(head)}
                                classInfo={head.class}
                                linkedinUrl={head.linkedin || "#"}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Position</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Class</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">LinkedIn</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            {clubHeads.map(head => (
                                <tr key={head.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{head.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 dark:text-gray-300">{head.role}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 dark:text-gray-300">{head.class}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {head.linkedin ? (
                                            <a 
                                                href={head.linkedin} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <FaLinkedin size={18} />
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">N/A</span>
                                        )}
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

export default ClubHeads;
