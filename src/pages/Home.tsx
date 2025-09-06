import React from 'react';
import { 
  HeroSection,
  AnnouncementTicker,
  // VisionMission,
  FeaturedEvents,
  DepartmentHighlights,
  ClubsSection,
  FeaturedProjects,
  Testimonials,
  CallToAction
} from '../components/home';
import VisionMission from "../components/home/VisionMission";
import ContactUs from "../components/home/ContactUs";

function HomePage() {
  return (
    <div className="min-h-screen text-white bg-[#0a0a18] [background:radial-gradient(circle_at_center,_#111133_0%,_#0a0a18_70%,_#050510_100%)]">
      <HeroSection />

      <AnnouncementTicker />

      <FeaturedEvents />


      <VisionMission/>

      <ClubsSection />

      <FeaturedProjects />

      <Testimonials />

      <CallToAction />

      <ContactUs />
    </div>
  )
}

export default HomePage
