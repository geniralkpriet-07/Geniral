import React, { useState } from 'react';
import { executiveMembers } from './data';
import { FaLinkedin } from "react-icons/fa";

const ExecutiveMembers = () => {
    const [viewType, setViewType] = useState('grid'); // grid or list

    return (
        <div className="executive-members-section py-10">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {executiveMembers.map((member, index) => (
                        <div key={index} className="executive-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
                            <div className="p-4 text-center">
                                {member.image ? (
                                    <img 
                                        src={member.image} 
                                        alt={member.name} 
                                        className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-purple-500"
                                    />
                                ) : (
                                    <div className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-purple-500 flex items-center justify-center bg-purple-100 text-purple-700">
                                        <span className="text-2xl font-bold">{member.name.charAt(0)}</span>
                                    </div>
                                )}
                                <h3 className="text-md font-bold mb-1">{member.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{member.class}</p>
                                {member.linkedin && (
                                    <a 
                                        href={member.linkedin} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-block mt-2 text-blue-600 hover:text-blue-800"
                                    >
                                        <FaLinkedin size={18} />
                                    </a>
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
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Class</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">LinkedIn</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            {executiveMembers.map((member, index) => (
                                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 dark:text-gray-300">{member.class}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {member.linkedin ? (
                                            <a 
                                                href={member.linkedin} 
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

export default ExecutiveMembers;
