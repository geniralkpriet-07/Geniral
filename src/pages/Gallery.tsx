import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LightRays from "../components/loading/LightRays";

type GalleryItem = {
  id: number;
  images: string[];
  title: string;
  description: string;
  date: string;
  category: string;
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [modalItem, setModalItem] = useState<GalleryItem | null>(null);
  const [modalStartIndex, setModalStartIndex] = useState<number>(0);

  useEffect(() => {
    if (modalItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalItem]);

  const categories = ["All", "Events", "Workshops", "Competitions", "Club Activities"];

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      images: [
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
      ],
      title: "Web Development Workshop",
      description: "Students learning modern web technologies and frameworks",
      date: "October 2023",
      category: "Workshops",
    },
    {
      id: 2,
      images: [
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      ],
      title: "Annual Hackathon Winners",
      description: "Team Innovators with their smart agriculture solution",
      date: "March 2024",
      category: "Competitions",
    },
    // ... keep the rest of your items
  ];

  const filteredItems =
    activeCategory === "All"
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

      {/* Category Filters */}
      <section className="relative z-10 pb-12 pt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-xl shadow-md font-semibold transition-all border
                  ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-[#8080ff] to-[#b1caf8] text-[#181830] border-[#a8b5fb] scale-105"
                      : "bg-[#181830]/80 text-white border-[#23234a] hover:bg-[#23234a]/80 hover:scale-105"
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
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 cursor-pointer group"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-64 object-cover rounded-t-3xl shadow-md transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between h-56">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                    <p className="text-white/80 mb-4 text-sm">{item.description}</p>
                  </div>

                  {/* Tags & Button */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-medium">
                        {item.date}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-xs font-medium">
                        {item.category}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setModalItem(item);
                        setModalStartIndex(0);
                      }}
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

      {/* Keep your modal code as it is */}
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
