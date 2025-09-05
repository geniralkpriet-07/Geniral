import React from 'react';
// Import icons from react-icons
import { FaCode, FaMicrophoneAlt, FaLeaf, FaHandsHelping, FaBrain, FaSmile } from 'react-icons/fa';

interface ClubCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ClubCard: React.FC<ClubCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-[rgba(20,20,50,0.5)] rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-[rgba(128,128,255,0.1)] text-center transition-all duration-300 h-full flex flex-col hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:border-[rgba(128,128,255,0.3)]">
      <div className="w-20 h-20 bg-[rgba(128,128,255,0.15)] rounded-full flex items-center justify-center mx-auto mb-6 text-white/90 transition-all duration-300 border border-[rgba(128,128,255,0.3)] text-4xl">
        {icon}
      </div>
      <h3 className="text-[1.3rem] font-bold mb-4 bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="text-[0.95rem] text-white/80 leading-7 mb-6 flex-grow">
        {description}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
      </div>
    </div>
  );
};

const ClubsSection: React.FC = () => {
  const clubs = [
    {
      title: "TECH PATRONS",
      description: "Leading technological innovation on campus, Tech Patrons organize coding competitions, hackathons, and technical workshops to enhance students' programming and development skills.",
      icon: <FaCode />
    },
    {
      title: "SPEAKZY",
      description: "Focused on developing communication and public speaking skills, Speakzy hosts debates, group discussions, and language improvement sessions to prepare students for professional environments.",
      icon: <FaMicrophoneAlt />
    },
    {
      title: "ECO/ISR",
      description: "Promoting environmental awareness and social responsibility, ECO/ISR organizes campus clean-ups, awareness campaigns, and sustainable technology projects for a better tomorrow.",
      icon: <FaLeaf />
    },
    {
      title: "ADMIRE HANDS",
      description: "Celebrating creativity and artistic expression, Admire Hands focuses on digital art, UI/UX design, and creative technology applications that blend technical skills with artistic vision.",
      icon: <FaHandsHelping />
    },
    {
      title: "CRAZY BRAINS",
      description: "Fostering innovation and problem-solving, Crazy Brains hosts brainstorming sessions, ideathons, and innovation challenges to develop creative solutions to real-world problems.",
      icon: <FaBrain />
    },
    {
      title: "HAPPY BRIDGE",
      description: "Dedicated to student welfare and mental health, Happy Bridge organizes recreational activities, stress management workshops, and peer support programs to enhance campus well-being.",
      icon: <FaSmile />
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-6">
          CLUBS OF{" "}
          <span className="bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">GENNIRAL</span>
        </h2>
        <p className="text-center max-w-3xl mx-auto mb-12 text-[1.1rem] text-white/80 leading-7">
          Our vibrant student association hosts several specialized clubs that nurture talent, skills, and interests
          across different domains. Each club is run by passionate students and guided by faculty mentors.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {clubs.map((club, index) => (
            <ClubCard 
              key={index}
              title={club.title}
              description={club.description}
              icon={club.icon}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="/association"
            className="inline-block bg-[rgba(128,128,255,0.2)] text-white px-6 py-3 rounded-full font-medium transition-all border border-[rgba(128,128,255,0.3)] hover:bg-[rgba(128,128,255,0.3)] hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(128,128,255,0.3)]"
          >
            Learn More About Our Clubs
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClubsSection;
