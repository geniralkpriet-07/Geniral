import React from 'react';
import { LightRays } from "../loading";

interface HeroSectionProps {
}

const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 z-0">
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

      <div className="relative z-10 max-w-3xl w-full text-center pt-16 md:pt-24">
        <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 text-sm font-medium text-center border border-white/15 shadow-[0_0_15px_rgba(128,128,255,0.1)]">
          <span role="img" aria-label="star">
            ⭐
          </span>{" "}
          KPR Institute of Engineering and Technology
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 tracking-tight text-center text-balance">
          <div>
            Department of{" "}
            <span className="bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">
              Computer Science
            </span>
          </div>
          <div>
            Student{" "}
            <span className="bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">
              Association
            </span>
          </div>
        </h1>

        <p className="text-xl max-w-xl mx-auto mb-12 text-white/80">
          Fostering innovation, collaboration, and technical excellence among the future leaders of technology
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="#explore"
            className="inline-block px-6 py-3 rounded-full font-medium transition-all bg-[rgba(128,128,255,0.3)] text-white border border-[rgba(128,128,255,0.6)] shadow-[0_0_15px_rgba(128,128,255,0.3)] backdrop-blur-sm hover:bg-[rgba(128,128,255,0.4)] hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(128,128,255,0.4)]"
          >
            Explore Events
          </a>
          <a
            href="#join"
            className="inline-block px-6 py-3 rounded-full font-medium transition-all bg-white/5 text-white/90 border border-white/20 backdrop-blur-sm hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            Join Association
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
