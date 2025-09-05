import React, { useState, useRef, useEffect } from 'react';
import ProfileCard from '../components/members/ProfileCard';
import { LightRays } from '../components/loading';
import { 
    associationMembers, 
    clubHeads, 
    clubs, 
    facultyCoordinators, 
    executiveMembers,
    SectionHeading,
    Leadership,
    ClubHeads,
    ClubsSection,
    FacultyCoordinators,
    ExecutiveMembers
} from '../components/association';

const Association = () => {
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
                    <SectionHeading title="Leadership Team" addToRefs={addToRefs} />
                    <Leadership />
                </div>
                
                {/* Club Heads Section */}
                <div className="mb-16">
                    <SectionHeading title="Club Heads" addToRefs={addToRefs} />
                    <ClubHeads />
                </div>
                
                {/* Faculty Coordinators Section */}
                <div className="mb-16">
                    <SectionHeading title="Faculty Coordinators" addToRefs={addToRefs} />
                    <FacultyCoordinators />
                </div>
                
                {/* Clubs Section */}
                <div className="mb-16">
                    <SectionHeading title="Clubs" addToRefs={addToRefs} />
                    <ClubsSection />
                </div>
                
                {/* Executive Members Section */}
                <div className="mb-16">
                    <SectionHeading title="Executive Members" addToRefs={addToRefs} />
                    <ExecutiveMembers />
                </div>
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