import React from 'react';
import { 
  HeroSection,
  AnnouncementTicker,
  FeaturedEvents,
  DepartmentHighlights,
  ClubsSection,
  FeaturedProjects,
  Testimonials,
  CallToAction
} from '../components/home';

function HomePage() {
  return (
    <div className="min-h-screen text-white bg-[#0a0a18] [background:radial-gradient(circle_at_center,_#111133_0%,_#0a0a18_70%,_#050510_100%)]">
      {/* Hero Section */}
      <HeroSection />

      {/* Announcement Ticker */}
      <AnnouncementTicker />

      {/* Featured Events */}
      <FeaturedEvents />

      {/* Department Highlights */}
      {/* <DepartmentHighlights /> */}

      {/* Clubs Section with Members View */}
      <ClubsSection />

      <FeaturedProjects />

      <Testimonials />

      <CallToAction />
    </div>
  )
}

export default HomePage
