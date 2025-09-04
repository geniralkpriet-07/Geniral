import React from 'react';

interface EventCardProps {
  imageUrl: string;
  altText: string;
}

const EventCard: React.FC<EventCardProps> = ({ imageUrl, altText }) => {
  return (
    <div className="relative bg-[rgba(20,20,50,0.5)] rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-transform transition-shadow duration-300 border border-[rgba(128,128,255,0.1)] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
      <div className="absolute top-4 left-4 bg-[rgba(128,128,255,0.3)] backdrop-blur-sm p-2 rounded flex flex-col items-center justify-center z-10 border border-[rgba(128,128,255,0.2)]">
      </div>
      <div className="h-44 relative">
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-[rgba(10,10,30,0.9)]" />
      </div>
      <div className="p-6">
      </div>
    </div>
  );
};

interface FeaturedEventsProps {
}

const FeaturedEvents: React.FC<FeaturedEventsProps> = () => {
  return (
    <section className="py-20" id="explore">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Upcoming{" "}
          <span className="bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">Events</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <EventCard 
            imageUrl="https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
            altText="AI/ML Workshop"
          />
          <EventCard 
            imageUrl="https://images.unsplash.com/photo-1573164713988-8665fc963095" 
            altText="Campus Recruitment"
          />
          <EventCard 
            imageUrl="https://images.unsplash.com/photo-1504384308090-c894fdcc538d" 
            altText="Hackathon 2025"
          />
        </div>

        <div className="text-center">
          <a
            href="/events"
            className="inline-block bg-white/5 text-white/90 px-6 py-3 rounded-full font-medium border border-white/10 transition-all hover:bg-white/10 hover:-translate-y-0.5"
          >
            View All Events
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
