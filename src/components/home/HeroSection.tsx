import React from 'react';
import { LightRays } from "../loading";
import backgroundImage from '../../assets/1.jpeg';

interface HeroSectionProps {
}

const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background Image - Increased opacity and added error handling */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage}
          alt="Association Background"
          className="w-full h-full object-cover opacity-70"
          onError={(e) => {
            console.error('Image failed to load:', e);
            e.currentTarget.style.display = 'none';
          }}
          onLoad={() => console.log('Image loaded successfully')}
        />
        {/* Reduced gradient overlay opacity */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a18]/60 via-[#0a0a18]/40 to-[#0a0a18]/60"></div>
      </div>

      {/* Light Rays */}
      <div className="absolute inset-0 z-10">
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

      <div className="relative z-20 max-w-3xl w-full text-center pt-16 md:pt-24">
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
