import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import genniralLogo from '/logo.png';
import { LightRays } from '.';

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-4 left-4 right-4 w-auto z-50 transition-all duration-300 ${
        scrolled || !transparent
          ? 'bg-[#0d0c20] bg-opacity-90 backdrop-blur-md'
          : 'bg-opacity-0'
      }`}
    >
      <div className="relative overflow-hidden rounded-lg">
        <div className="absolute inset-0 z-0">
          <LightRays
            raysColor="#8080ff"
            raysSpeed={0.6}
            lightSpread={1.0}
            rayLength={1}
            followMouse={false}
            mouseInfluence={0}
            noiseAmount={0.04}
            distortion={0.02}
            pulsating={true}
            fadeDistance={0.8}
            saturation={0.4}
            className="nav-rays"
          />
        </div>

        <div className="relative z-10 px-2 py-3">
          <div className="flex items-center justify-center gap-56">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center group">
                <span className="font-semibold text-2xl tracking-wide bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(161,196,253,0.5)]">
                  KPRIET
                </span>
              </Link>
            </div>
            
            <div className="flex items-center bg-gray-800/30 rounded-full px-4 py-1">
              <Link to="/" className="nav-link mx-2">
                Home
              </Link>
              <Link to="/gallery" className="nav-link mx-2">
                Gallery
              </Link>
              <Link to="/certificates" className="nav-link mx-2">
                Upcoming Events
              </Link>
              <Link to="/contact" className="nav-link mx-2">
                Association
              </Link>
            </div>

            <div className="flex-shrink-0">
              <Link
                to="/resume"
                className="inline-flex items-center w-[100px] h-[32px] justify-center px-6 py-2.5 rounded-md bg-[#8080ff]/30 hover:bg-[#8080ff]/40 text-white font-medium transition-all duration-300 backdrop-blur-sm border border-[#8080ff]/20 shadow-[0_0_15px_rgba(128,128,255,0.3)] relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8080ff]/20 to-transparent group-hover:via-[#8080ff]/30 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></span>
                <span className="flex items-center relative z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Login
                </span>
              </Link>
            </div>

            <button
              className="md:hidden absolute right-4 text-white focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden absolute top-full left-0 w-full bg-[#0a0a18] bg-opacity-95 backdrop-blur-md transition-all duration-300 z-50 ${
            menuOpen ? 'max-h-screen py-4' : 'max-h-0 py-0 overflow-hidden'
          }`}
        >
          <div className="px-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="nav-link-mobile"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="nav-link-mobile"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/skills"
              className="nav-link-mobile"
              onClick={() => setMenuOpen(false)}
            >
              Skills
            </Link>
            <Link
              to="/projects"
              className="nav-link-mobile"
              onClick={() => setMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              to="/works"
              className="nav-link-mobile"
              onClick={() => setMenuOpen(false)}
            >
              Works
            </Link>
            <Link
              to="/research"
              className="nav-link-mobile"
              onClick={() => setMenuOpen(false)}
            >
              Research
            </Link>
            <Link
              to="/certificates"
              className="nav-link-mobile"
              onClick={() => setMenuOpen(false)}
            >
              Certificates
            </Link>
            <Link
              to="/contact"
              className="nav-link-mobile"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/resume"
              className="px-6 py-3 rounded-full text-center bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              View Resume
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .nav-link {
          color: rgba(255, 255, 255, 0.8);
          position: relative;
          font-weight: 500;
          transition: all 0.3s;
          text-decoration: none;
          font-size: 0.95rem;
          display: inline-block;
          padding: 0.5rem 0.75rem;
        }

        .nav-link:hover {
          color: rgba(255, 255, 255, 1);
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0.25rem;
          left: 50%;
          background: linear-gradient(
            90deg,
            rgba(128, 128, 255, 0),
            rgba(128, 128, 255, 1),
            rgba(128, 128, 255, 0)
          );
          transition: all 0.3s;
          transform: translateX(-50%);
          opacity: 0;
          box-shadow: 0 0 8px rgba(128, 128, 255, 0.8);
        }

        .nav-link:hover::after {
          width: 80%;
          opacity: 1;
        }

        .nav-link-mobile {
          color: rgba(255, 255, 255, 0.8);
          padding: 0.75rem 0.5rem;
          font-weight: 500;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s;
        }

        .nav-link-mobile:hover {
          color: rgba(255, 255, 255, 1);
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
          background-color: rgba(128, 128, 255, 0.1);
        }

        .glow-effect {
          background: radial-gradient(
            circle,
            rgba(128, 128, 255, 0.3) 0%,
            rgba(128, 128, 255, 0) 70%
          );
          filter: blur(8px);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
