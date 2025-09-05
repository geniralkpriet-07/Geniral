import React, { useState, useEffect } from 'react';
import LightRays from '../components/loading/LightRays';

type GalleryItem = {
  id: number;
  images: string[];
  title: string;
  description: string;
  date: string;
  category: string;
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [modalItem, setModalItem] = useState<GalleryItem | null>(null);
  const [modalStartIndex, setModalStartIndex] = useState<number>(0);

  // Disable website scroll when modal is open
  useEffect(() => {
    if (modalItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalItem]);

  const categories = ['All', 'Events', 'Workshops', 'Competitions', 'Club Activities'];

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      images: [
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
        'https://images.unsplash.com/photo-1504639725590-34d0984388bd'
      ],
      title: 'Web Development Workshop',
      description: 'Students learning modern web technologies and frameworks',
      date: 'October 2023',
      category: 'Workshops'
    },
    {
      id: 2,
      images: [
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8',
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f'
      ],
      title: 'Annual Hackathon Winners',
      description: 'Team Innovators with their smart agriculture solution',
      date: 'March 2024',
      category: 'Competitions'
    },
    {
      id: 3,
      images: [
        'https://images.unsplash.com/photo-1573164713988-8665fc963095',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
        'https://images.unsplash.com/photo-1515187029135-18ee286d815b'
      ],
      title: 'Tech Conference 2024',
      description: 'Industry experts sharing insights on emerging technologies',
      date: 'February 2024',
      category: 'Events'
    },
    {
      id: 4,
      images: [
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
        'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
      ],
      title: 'Code Sprint Challenge',
      description: 'Students competing in the 24-hour coding marathon',
      date: 'November 2023',
      category: 'Competitions'
    },
    {
      id: 5,
      images: [
        'https://images.unsplash.com/photo-1531482615713-2afd69097998',
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
      ],
      title: 'AI and Machine Learning Workshop',
      description: 'Hands-on training with the latest AI frameworks and tools',
      date: 'January 2024',
      category: 'Workshops'
    },
    {
      id: 6,
      images: [
        'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4'
      ],
      title: 'Tech Patrons Club Meeting',
      description: 'Weekly club meeting discussing upcoming technology trends',
      date: 'April 2024',
      category: 'Club Activities'
    }
  ];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  // Ref array for scrolling to the clicked image
  const imgRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  // Scroll to the clicked image when modal opens
  useEffect(() => {
    if (modalItem && imgRefs.current[modalStartIndex]) {
      imgRefs.current[modalStartIndex]?.scrollIntoView({ behavior: 'smooth',  block:  'center', });
    }
  }, [modalItem, modalStartIndex]);

  return (
    <div className="min-h-screen text-white bg-[#0a0a18] [background:radial-gradient(circle_at_center,_#111133_0%,_#0a0a18_50%,_#050510_100%)]">
      {/* Light Rays Background */}
      <div className="fixed inset-0 z-0">
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

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16">
        <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 gallery-glow blur-3xl opacity-60 animate-pulse-glow"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-float">
            <span className="text-foreground drop-shadow-2xl">GENNIRAL</span>{' '}
            <span className="text-gradient">GALLERY</span>
          </h1>
          <p className="max-w-4xl mx-auto mb-12 text-lg md:text-xl text-muted-foreground leading-relaxed">
            Explore memories and moments from our events, workshops, and celebrations that showcase 
            the vibrant life of our Computer Science student community.
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="relative z-10 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-xl shadow-md font-semibold transition-all border
                  ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-[#8080ff] to-[#b1caf8] text-[#181830] border-[#a8b5fb] scale-105'
                      : 'bg-[#181830]/80 text-white border-[#23234a] hover:bg-[#23234a]/80 hover:scale-105'
                  }
                `}
                style={{ minWidth: 140 }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="relative z-10 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[rgba(20,20,50,0.7)] rounded-3xl overflow-hidden shadow-2xl border border-[rgba(128,128,255,0.15)] backdrop-blur-lg transition-transform hover:scale-105 cursor-pointer"
                style={{ minHeight: 480 }}
                onClick={() => {
                  setModalItem(item);
                  setModalStartIndex(0);
                }}
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-80 object-cover object-center transition-all duration-300"
                />
                <div className="p-7">
                  <h2 className="text-2xl font-bold mb-2 text-white">{item.title}</h2>
                  <p className="text-white/80 mb-3 text-base">{item.description}</p>
                  <div className="flex justify-between text-sm text-white/60 mt-2">
                    <span>{item.date}</span>
                    <span>{item.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for vertical scroll images - FULL WIDTH & HEIGHT */}
      {modalItem && (
  <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
    <button
      className="absolute top-6 right-10 text-white text-4xl"
      onClick={() => setModalItem(null)}
    >
      &times;
    </button>
    <div
      className="w-full h-full overflow-y-auto flex flex-col items-center"
      style={{ scrollSnapType: "y mandatory" }}
    >
      {modalItem.images.map((img, idx) => (
        <div
          key={img}
          ref={(el) => {
            imgRefs.current[idx] = el;
          }}
          className="py-8 w-full flex justify-center"
          style={{ scrollSnapAlign: "center" }}
        >
          <img
            src={img}
            alt={`${modalItem.title} ${idx + 1}`}
            className="w-full max-w-5xl h-[80vh] object-cover rounded-xl shadow-2xl"
          />
        </div>
      ))}
    </div>
  </div>
)}
    </div>
  );
};

export default Gallery;