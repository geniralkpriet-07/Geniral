import React from 'react';

interface AnnouncementTickerProps {
  // You can add props here if needed
}

const AnnouncementTicker: React.FC<AnnouncementTickerProps> = () => {
  return (
    <section className="py-3 bg-[rgba(0,0,30,0.5)] border-t border-b border-[rgba(128,128,255,0.2)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center overflow-hidden">
          <div className="flex-shrink-0 bg-[rgba(128,128,255,0.3)] px-4 py-1 rounded mr-4 font-medium text-sm">
            Latest Updates
          </div>
          <div className="overflow-hidden whitespace-nowrap">
            <p className="inline-block pr-12 m-0 text-white/90">
              Registration for Hackathon 2025 now open! &nbsp;•&nbsp; Technical Workshop on AI/ML on Sept 15
              &nbsp;•&nbsp; Campus recruitment drive by TechCorp on Sept 20
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementTicker;
