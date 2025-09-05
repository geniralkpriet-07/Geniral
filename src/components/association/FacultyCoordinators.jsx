import React from 'react';
import { facultyCoordinators } from './data';

const FacultyCoordinators = () => {
    return (
        <div className="faculty-coordinators-section py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {facultyCoordinators.map((faculty, index) => (
                    <div key={index} className="faculty-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                        <div className="p-6 flex items-start">
                            <img 
                                src={faculty.image} 
                                alt={faculty.name} 
                                className="w-16 h-16 rounded-full mr-4 border-2 border-purple-500"
                            />
                            <div>
                                <h3 className="text-lg font-bold mb-1">{faculty.name}</h3>
                                <p className="text-purple-600 dark:text-purple-400 mb-1">{faculty.role}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{faculty.department}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FacultyCoordinators;
