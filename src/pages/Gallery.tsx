import React from "react";
import { LightRays } from '../components/loading';

const Gallery = () => {
  return (
    <div className="gallery-page min-h-screen">
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
      
      {/* Gallery Header */}
      <section className="gallery-header relative z-10 pt-24 pb-12">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-[#8080ff]/40 via-[#80ffea]/20 to-transparent blur-3xl opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-[0_0_30px_rgba(128,128,255,0.3)]">
            <span className="text-white">GENNIRAL</span> <span className="text-gradient">GALLERY</span>
          </h1>
          <p className="text-center max-w-3xl mx-auto mb-12 text-lg text-white/80 leading-relaxed">
            Explore memories and moments from our events, workshops, and celebrations that showcase the vibrant life of our Computer Science student community.
          </p>
        </div>
      </section>
      
      {/* Gallery Grid */}
      <section className="gallery-grid-section relative z-10 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="gallery-categories mb-8 flex flex-wrap justify-center gap-4">
            <button className="category-btn active">All</button>
            <button className="category-btn">Events</button>
            <button className="category-btn">Workshops</button>
            <button className="category-btn">Competitions</button>
            <button className="category-btn">Club Activities</button>
          </div>
          
          <div className="gallery-grid">
            {/* Gallery Item 1 */}
            <div className="gallery-item">
              <div className="gallery-image">
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" alt="Tech Workshop" />
                <div className="gallery-overlay">
                  <div className="gallery-actions">
                    <button className="gallery-action-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="gallery-content">
                <h3 className="gallery-title">Web Development Workshop</h3>
                <p className="gallery-description">Students learning modern web technologies and frameworks</p>
                <div className="gallery-meta">
                  <span className="gallery-date">October 2023</span>
                  <span className="gallery-category">Workshops</span>
                </div>
              </div>
            </div>
            
            {/* Gallery Item 2 */}
            <div className="gallery-item">
              <div className="gallery-image">
                <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8" alt="Hackathon Winners" />
                <div className="gallery-overlay">
                  <div className="gallery-actions">
                    <button className="gallery-action-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="gallery-content">
                <h3 className="gallery-title">Annual Hackathon Winners</h3>
                <p className="gallery-description">Team Innovators with their smart agriculture solution</p>
                <div className="gallery-meta">
                  <span className="gallery-date">March 2024</span>
                  <span className="gallery-category">Competitions</span>
                </div>
              </div>
            </div>
            
            {/* Gallery Item 3 */}
            <div className="gallery-item">
              <div className="gallery-image">
                <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095" alt="Tech Conference" />
                <div className="gallery-overlay">
                  <div className="gallery-actions">
                    <button className="gallery-action-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="gallery-content">
                <h3 className="gallery-title">Tech Conference 2024</h3>
                <p className="gallery-description">Industry experts sharing insights on emerging technologies</p>
                <div className="gallery-meta">
                  <span className="gallery-date">February 2024</span>
                  <span className="gallery-category">Events</span>
                </div>
              </div>
            </div>
            
            {/* Gallery Item 4 */}
            <div className="gallery-item">
              <div className="gallery-image">
                <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d" alt="Coding Competition" />
                <div className="gallery-overlay">
                  <div className="gallery-actions">
                    <button className="gallery-action-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="gallery-content">
                <h3 className="gallery-title">Code Sprint Challenge</h3>
                <p className="gallery-description">Students competing in the 24-hour coding marathon</p>
                <div className="gallery-meta">
                  <span className="gallery-date">November 2023</span>
                  <span className="gallery-category">Competitions</span>
                </div>
              </div>
            </div>
            
            {/* Gallery Item 5 */}
            <div className="gallery-item">
              <div className="gallery-image">
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998" alt="AI Workshop" />
                <div className="gallery-overlay">
                  <div className="gallery-actions">
                    <button className="gallery-action-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="gallery-content">
                <h3 className="gallery-title">AI and Machine Learning Workshop</h3>
                <p className="gallery-description">Hands-on training with the latest AI frameworks and tools</p>
                <div className="gallery-meta">
                  <span className="gallery-date">January 2024</span>
                  <span className="gallery-category">Workshops</span>
                </div>
              </div>
            </div>
            
            {/* Gallery Item 6 */}
            <div className="gallery-item">
              <div className="gallery-image">
                <img src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2" alt="Club Activity" />
                <div className="gallery-overlay">
                  <div className="gallery-actions">
                    <button className="gallery-action-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="gallery-content">
                <h3 className="gallery-title">Tech Patrons Club Meeting</h3>
                <p className="gallery-description">Weekly club meeting discussing upcoming technology trends</p>
                <div className="gallery-meta">
                  <span className="gallery-date">April 2024</span>
                  <span className="gallery-category">Club Activities</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="load-more-container mt-12 text-center">
            <button className="load-more-btn">Load More</button>
          </div>
        </div>
      </section>
      
      {/* CSS Styles */}
      <style>{`
        .gallery-page {
          background: radial-gradient(circle at center, #111133 0%, #0a0a18 50%, #050510 100%);
          color: white;
          min-height: 100vh;
          overflow-x: hidden;
        }
        
        .light-rays-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        
        .text-gradient {
          background: linear-gradient(90deg, #a8b5fb, #b1caf8);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 30px rgba(161, 196, 253, 0.5);
          color: #b1caf8;
        }
        
        .gallery-categories {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .category-btn {
          background: rgba(20, 20, 50, 0.5);
          border-radius: 9999px;
          padding: 0.5rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.3s ease;
          border: 1px solid rgba(128, 128, 255, 0.1);
        }
        
        .category-btn:hover, .category-btn.active {
          background: rgba(128, 128, 255, 0.2);
          border-color: rgba(128, 128, 255, 0.3);
          box-shadow: 0 0 15px rgba(128, 128, 255, 0.2);
          transform: translateY(-2px);
        }
        
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }
        
        .gallery-item {
          background: rgba(20, 20, 50, 0.5);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          border: 1px solid rgba(128, 128, 255, 0.1);
        }
        
        .gallery-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }
        
        .gallery-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        
        .gallery-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .gallery-item:hover .gallery-image img {
          transform: scale(1.05);
        }
        
        .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }
        
        .gallery-actions {
          display: flex;
          gap: 1rem;
        }
        
        .gallery-action-btn {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .gallery-action-btn:hover {
          background: rgba(128, 128, 255, 0.3);
          transform: scale(1.1);
        }
        
        .gallery-content {
          padding: 1.5rem;
        }
        
        .gallery-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        
        .gallery-description {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 1rem;
        }
        
        .gallery-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }
        
        .load-more-btn {
          background: rgba(128, 128, 255, 0.2);
          color: white;
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          font-weight: 500;
          transition: all 0.3s ease;
          border: 1px solid rgba(128, 128, 255, 0.3);
        }
        
        .load-more-btn:hover {
          background: rgba(128, 128, 255, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 0 15px rgba(128, 128, 255, 0.3);
        }
        
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
          
          .gallery-categories {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
