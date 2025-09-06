import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LightRays from '../components/loading/LightRays';

type GalleryImageGroup = {
  subtitle: string;
  images: string[];
};

type GalleryItem = {
  id: number;
  groups: GalleryImageGroup[];
  title: string;
  description: string;
  date: string;
  category: string;
};

// Example gallery items structured with subtitles and image groups
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    groups: [
      {
        subtitle: 'Inauguration',
        images: [
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
        ],
      },
      {
        subtitle: 'Guest Speech',
        images: [
          'https://images.unsplash.com/photo-1504639725590-34d0984388bd',
        ],
      },
    ],
    title: 'Web Development Workshop',
    description: 'Students learning modern web technologies and frameworks',
    date: 'October 2023',
    category: 'Workshops',
  },
  {
    id: 2,
    groups: [
      {
        subtitle: 'Team Announcement',
        images: [
          'https://images.unsplash.com/photo-1501504905252-473c47e087f8',
        ],
      },
      {
        subtitle: 'Prize Distribution',
        images: [
          'https://images.unsplash.com/photo-1560472354-b33ff0c44a43',
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
        ],
      },
    ],
    title: 'Annual Hackathon Winners',
    description: 'Team Innovators with their smart agriculture solution',
    date: 'March 2024',
    category: 'Competitions',
  },
  // Repeat for other items if needed
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [modalItem, setModalItem] = useState<GalleryItem | null>(null);
  const [fullScreenImg, setFullScreenImg] = useState<string | null>(null);

  useEffect(() => {
    if (modalItem || fullScreenImg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalItem, fullScreenImg]);

  const categories = ['All', 'Events', 'Workshops', 'Competitions', 'Club Activities'];

  const filteredItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group rounded-3xl overflow-hidden border border-white/10 bg-white/10 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-indigo-400/60 hover:-translate-y-1 transition-all duration-300 h-[400px] flex flex-col"
              >
                {/* Thumbnail image */}
                <div
                  className="overflow-hidden cursor-pointer h-56"
                  onClick={() => setModalItem(item)}
                >
                  <img
                    src={item.groups[0]?.images[0]} // First image in first group as card thumbnail
                    alt={item.title}
                    className="w-full h-full object-cover rounded-t-3xl shadow-md transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h2 className="text-xl font-extrabold mb-1 tracking-tight line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20">
                        {item.date}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500 to-indigo-500">
                        {item.category}
                      </span>
                    </div>
                    <button
                      onClick={() => setModalItem(item)}
                      className="px-4 py-2 text-xs rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-600 hover:to-indigo-600 transition-colors"
                    >
                      View More
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Modal: Grid of Images with Subtitles ===== */}
      {modalItem && !fullScreenImg && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center overflow-y-auto"
          onClick={() => setModalItem(null)}
        >
          <button
            aria-label="Close"
            className="absolute top-6 right-10 text-white text-4xl"
            onClick={(e) => { e.stopPropagation(); setModalItem(null); }}
          >
            &times;
          </button>
          <div
            className="w-full h-full overflow-y-auto flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-5xl mx-auto py-10 px-4">
              {modalItem.groups.map((group, gi) => (
                <div key={group.subtitle} className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-white">{group.subtitle}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {group.images.map((img, idx) => (
                      <div key={img} className="cursor-pointer"
                        onClick={() => setFullScreenImg(img)}>
                        <img
                          src={img}
                          alt={`${group.subtitle} ${idx + 1}`}
                          className="w-full h-64 object-cover rounded-xl shadow-xl"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== Fullscreen Modal for single image ===== */}
      {fullScreenImg && (
        <div
          className="fixed inset-0 bg-black/95 z-60 flex items-center justify-center"
          onClick={() => setFullScreenImg(null)}
        >
          <button
            aria-label="Close"
            className="absolute top-6 right-10 text-white text-4xl"
            onClick={(e) => { e.stopPropagation(); setFullScreenImg(null); }}
          >
            &times;
          </button>
          <img
            src={fullScreenImg}
            alt=""
            className="max-w-5xl max-h-[80vh] w-full h-auto object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
