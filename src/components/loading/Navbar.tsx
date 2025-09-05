"use client"

import type React from "react"
import { useState, useEffect } from "react"

// Mock components for demonstration - replace with your actual components
const TransitionLink = ({ to, className, children, onClick }: any) => (
  <a href={to} className={className} onClick={onClick}>
    {children}
  </a>
)

const LightRays = ({ className, ...props }: any) => (
  <div
    className={`${className} absolute inset-0 opacity-20 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10`}
  />
)

interface NavbarProps {
  transparent?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (menuOpen && !target.closest("nav")) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [menuOpen])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled || !transparent ? "bg-[#0d0c20] bg-opacity-90 backdrop-blur-md" : "bg-opacity-0"
      }`}
    >
      <div className="relative overflow-hidden">
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

        <div className="relative z-10 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo */}
            <div className="flex-shrink-0">
              <TransitionLink to="/" className="flex items-center group">
                <span className="font-semibold text-xl md:text-2xl tracking-wide bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(161,196,253,0.5)]">
                  KPRIET
                </span>
              </TransitionLink>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center bg-gray-800/30 rounded-full px-4 py-1.5">
              <TransitionLink to="/" className="nav-link mx-1 lg:mx-2">
                Home
              </TransitionLink>
              <TransitionLink to="/gallery" className="nav-link mx-1 lg:mx-2">
                Gallery
              </TransitionLink>
              <TransitionLink to="/association" className="nav-link mx-1 lg:mx-2">
                Association
              </TransitionLink>
              <TransitionLink to="/upcoming-events" className="nav-link mx-1 lg:mx-2">
                Upcoming Events
              </TransitionLink>
            </div>

            {/* Login Button - Desktop */}
            <div className="hidden md:block flex-shrink-0">
              <TransitionLink
                to="/resume"
                className="inline-flex items-center h-[36px] justify-center px-4 lg:px-6 py-2 rounded-md bg-[#8080ff]/30 hover:bg-[#8080ff]/40 text-white font-medium transition-all duration-300 backdrop-blur-sm border border-[#8080ff]/20 shadow-[0_0_15px_rgba(128,128,255,0.3)] relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8080ff]/20 to-transparent group-hover:via-[#8080ff]/30 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></span>
                <span className="flex items-center relative z-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Login
                </span>
              </TransitionLink>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white focus:outline-none p-2 rounded-md hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <svg
                className="w-6 h-6 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden absolute left-0 right-0 bg-[#0a0a18]/95 backdrop-blur-lg border-t border-purple-500/20 shadow-lg transition-all duration-300 ease-in-out ${
            menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
          style={{
            top: "100%",
            transformOrigin: "top",
          }}
        >
          <div className="px-4 py-4 space-y-1">
            <TransitionLink to="/" className="nav-link-mobile block" onClick={() => setMenuOpen(false)}>
              Home
            </TransitionLink>
            <TransitionLink to="/gallery" className="nav-link-mobile block" onClick={() => setMenuOpen(false)}>
              Gallery
            </TransitionLink>
            <TransitionLink to="/association" className="nav-link-mobile block" onClick={() => setMenuOpen(false)}>
              Association
            </TransitionLink>
            <TransitionLink to="/upcoming-events" className="nav-link-mobile block" onClick={() => setMenuOpen(false)}>
              Upcoming Events
            </TransitionLink>

            <div className="pt-3 mt-3 border-t border-white/10">
              <TransitionLink
                to="/resume"
                className="flex items-center justify-center w-full px-4 py-3 text-center rounded-md bg-[#8080ff]/30 hover:bg-[#8080ff]/40 text-white font-medium transition-all duration-300 border border-[#8080ff]/20"
                onClick={() => setMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Login
              </TransitionLink>
            </div>
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
          font-size: 0.9rem;
          display: inline-block;
          padding: 0.5rem 0.75rem;
          border-radius: 0.375rem;
        }

        @media (min-width: 1024px) {
          .nav-link {
            font-size: 0.95rem;
          }
        }

        .nav-link:hover {
          color: rgba(255, 255, 255, 1);
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
          background-color: rgba(255, 255, 255, 0.05);
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
          padding: 0.75rem 1rem;
          font-weight: 500;
          transition: all 0.3s;
          font-size: 1rem;
          text-decoration: none;
          border-radius: 0.5rem;
          margin-bottom: 0.25rem;
        }

        .nav-link-mobile:hover {
          color: rgba(255, 255, 255, 1);
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
          background-color: rgba(128, 128, 255, 0.1);
        }
      `}</style>
    </nav>
  )
}

export default Navbar
