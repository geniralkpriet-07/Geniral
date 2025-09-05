import React from 'react';
import { executiveMembers } from './data';

const ExecutiveMembers = () => {
    return (
        <div className="executive-members-section py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {executiveMembers.map((member, index) => (
                    <div key={index} className="executive-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
                        <div className="p-4 text-center">
                            <img 
                                src={member.image} 
                                alt={member.name} 
                                className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-purple-500"
                            />
                            <h3 className="text-md font-bold mb-1">{member.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{member.class}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExecutiveMembers;
