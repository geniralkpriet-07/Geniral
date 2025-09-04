import React from "react";
import { LightRays } from "../components/loading";

const UpcomingEvents = () => {
  return (
    <div className="min-h-screen text-white bg-[#0a0a18] [background:radial-gradient(circle_at_center,_#111133_0%,_#0a0a18_70%,_#050510_100%)] pt-24 pb-16">
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

      <div className="relative overflow-hidden h-[40vh] mb-12">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-[#8080ff]/30 via-[#a78bfa]/20 to-transparent blur-3xl opacity-60"></div>

        <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
          <h1 className="text-5xl font-bold text-center mb-6">
            Upcoming{" "}
            <span className="bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">
              Events
            </span>
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-white/80 leading-7 mb-10">
            Stay updated with all our upcoming events and activities
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-[#151530]/60 backdrop-blur-md rounded-xl p-6 border border-purple-500/20 shadow-lg transform hover:scale-[1.01] transition-all">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/4 aspect-video md:aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center">
                  <span className="text-4xl font-bold">
                    {item < 10 ? `0${item}` : item}
                  </span>
                </div>
                <div className="w-full md:w-3/4">
                  <h3 className="text-2xl font-bold mb-2">Upcoming Event {item}</h3>
                  <div className="flex gap-4 text-sm text-white/70 mb-3">
                    <span>Sept {10 + item}, 2025</span>
                    <span>•</span>
                    <span>Main Auditorium</span>
                  </div>
                  <p className="text-white/80 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porttitor metus justo, vitae fringilla nibh blandit id.
                  </p>
                  <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full text-white font-medium hover:from-purple-700 hover:to-blue-600 transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;