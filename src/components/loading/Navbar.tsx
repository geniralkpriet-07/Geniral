"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import LoginModal from "../auth/LoginModal"

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
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

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
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.body.style.overflow = "unset"
    }
  }, [menuOpen])

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
  }

  return (
    <>
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
              <div className="flex-shrink-0">
                <TransitionLink to="/" className="flex items-center group">
                  <span className="font-semibold text-xl md:text-2xl tracking-wide text-white drop-shadow-[0_0_30px_rgba(161,196,253,0.5)]">
                    KPRIET
                  </span>
                </TransitionLink>
              </div>

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
                {isAuthenticated && user?.role === 'admin' && (
                  <>
                   
                    <TransitionLink to="/admin" className="nav-link mx-1 lg:mx-2">
                      Admin Panel
                    </TransitionLink>
                  </>
                )}
              </div>

              <div className="hidden md:block flex-shrink-0">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-white/80 text-sm">
                      Welcome, {user?.email}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center h-[36px] justify-center px-4 lg:px-6 py-2 rounded-md bg-red-500/30 hover:bg-red-500/40 text-white font-medium transition-all duration-300 backdrop-blur-sm border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.3)] relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent group-hover:via-red-500/30 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></span>
                      <span className="flex items-center relative z-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Logout
                      </span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setLoginModalOpen(true)}
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
                  </button>
                )}
              </div>

              <button
                className="md:hidden text-white focus:outline-none p-2 rounded-md hover:bg-white/10 transition-colors relative z-50"
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
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#0a0a18]/95 backdrop-blur-xl border-l border-purple-500/20 shadow-2xl z-50 md:hidden transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <span className="font-semibold text-lg text-white">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white/70 hover:text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 px-6 py-6 space-y-2">
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
            {isAuthenticated && user?.role === 'admin' && (
              <>
                <TransitionLink to="/admin" className="nav-link-mobile block" onClick={() => setMenuOpen(false)}>
                  Admin Panel
                </TransitionLink>
              </>
            )}
          </div>

          <div className="p-6 border-t border-white/10">
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="text-white/80 text-sm text-center">
                  Welcome, {user?.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-full px-4 py-3 text-center rounded-md bg-red-500/30 hover:bg-red-500/40 text-white font-medium transition-all duration-300 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setLoginModalOpen(true)
                  setMenuOpen(false)
                }}
                className="flex items-center justify-center w-full px-4 py-3 text-center rounded-md bg-[#8080ff]/30 hover:bg-[#8080ff]/40 text-white font-medium transition-all duration-300 border border-[#8080ff]/20 shadow-[0_0_15px_rgba(128,128,255,0.3)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />

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
          padding: 1rem 1.25rem;
          font-weight: 500;
          transition: all 0.3s;
          font-size: 1rem;
          text-decoration: none;
          border-radius: 0.5rem;
          margin-bottom: 0.25rem;
          display: block;
          width: 100%;
        }

        .nav-link-mobile:hover {
          color: rgba(255, 255, 255, 1);
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
          background-color: rgba(128, 128, 255, 0.1);
        }
      `}</style>
    </>
  )
}

export default Navbar
