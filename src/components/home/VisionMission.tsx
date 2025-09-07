import React from "react";
import { Eye, Rocket } from "lucide-react"; 

const VisionMission: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Our{" "}
          <span className="bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">
            Vision & Mission
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="bg-[rgba(20,20,50,0.5)] rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-[rgba(128,128,255,0.1)] hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
              <Eye className="w-6 h-6 text-blue-400" /> Vision
            </h3>
            <p className="text-white/80 leading-7">
              To be a{" "}
              <span className="font-semibold text-blue-300">
                premier centre for education
              </span>
              , dissemination of knowledge and research in the frontier areas of{" "}
              <span className="font-semibold text-blue-300">
                computer science and engineering
              </span>{" "}
              to serve the community with{" "}
              <span className="font-semibold text-blue-300">moral values</span>.
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-[rgba(20,20,50,0.5)] rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-[rgba(128,128,255,0.1)] hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
              <Rocket className="w-6 h-6 text-blue-400" /> Mission
            </h3>
            <ul className="text-white/80 leading-7 list-disc pl-5 space-y-3">
              <li>
                Provide{" "}
                <span className="font-semibold text-blue-300">
                  holistic education
                </span>{" "}
                incorporating the state-of-the-art technologies to produce
                successful professionals.
              </li>
              <li>
                Facilitate the students to pursue{" "}
                <span className="font-semibold text-blue-300">
                  higher education and research
                </span>{" "}
                in the areas related to Computer Science and Engineering.
              </li>
              <li>
                Promote{" "}
                <span className="font-semibold text-blue-300">
                  strong collaborations with industries
                </span>{" "}
                and steer students to nurture{" "}
                <span className="font-semibold text-blue-300">
                  continuous learning
                </span>{" "}
                to meet the changing needs of society.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
