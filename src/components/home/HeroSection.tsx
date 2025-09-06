"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { LightRays } from "../loading"
import "./hero.css"
import img from "../../assets/1.jpeg"
type HeroSectionProps = {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const backgroundImages = ["/1.jpeg", "/1.jpeg", "/1.jpeg", "/1.jpeg"]
  const fullText = "Student Association Geniral"

  useEffect(() => {
    let index = 0
    let timer: ReturnType<typeof setTimeout>

    const typeWriter = () => {
      if (!isDeleting) {
        if (index <= fullText.length) {
          setDisplayText(fullText.slice(0, index))
          index++
          timer = setTimeout(typeWriter, 100)
        } else {
          timer = setTimeout(() => {
            setIsDeleting(true)
            index = fullText.length
            typeWriter()
          }, 4000)
        }
      } else {
        if (index >= 0) {
          setDisplayText(fullText.slice(0, index))
          index--
          timer = setTimeout(typeWriter, 50)
        } else {
          timer = setTimeout(() => {
            setIsDeleting(false)
            index = 0
            typeWriter()
          }, 500)
        }
      }
    }

    typeWriter()

    return () => clearTimeout(timer)
  }, [isDeleting])

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, 4000)

    return () => clearInterval(imageTimer)
  }, [backgroundImages.length])

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1))
  }

  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <img
            key={index}
            src={img}
            alt={`Association Background ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-all duration-1000 ease-in-out ${
              index === currentImageIndex
                ? "opacity-70 translate-x-0"
                : index < currentImageIndex
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
            }`}
            onError={(e) => {
              console.error("Image failed to load:", e)
              e.currentTarget.style.display = "none"
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-[0_0_15px_rgba(128,128,255,0.3)]"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-[0_0_15px_rgba(128,128,255,0.3)]"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute inset-0 z-10">
        <LightRays
          raysColor="#ffffff"
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

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          <div className="text-left lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 shadow-[0_0_20px_rgba(128,128,255,0.15)]">
              <div className="w-2 h-2 bg-[#8080ff] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-white">KPR Institute of Engineering and Technology</span>
              <span className="text-xs bg-[#8080ff]/30 text-white px-2 py-1 rounded-full border border-[#8080ff]/50">
                Active
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
                <div className="text-white bg-gradient-to-r from-white via-[#c4c8ff] to-white bg-clip-text">
                  Department of
                </div>
                <div className="text-[#8080ff] bg-gradient-to-r from-[#8080ff] via-[#a8b5fb] to-[#8080ff] bg-clip-text animate-gradient">
                  Computer Science
                </div>
                <div className="text-white text-4xl md:text-5xl font-bold mt-2">
                  {displayText}
                  <span className="animate-blink">|</span>
                </div>
              </h1>
            </div>

            <div className="space-y-4 max-w-xl">
              <p className="text-xl text-white/95 leading-relaxed">
                Fostering innovation, collaboration, and technical excellence among the
                <span className="text-[#8080ff] font-medium"> future leaders</span> of technology
              </p>

              <div className="flex gap-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#8080ff]">500+</div>
                  <div className="text-xs text-white/90 uppercase tracking-wide">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#8080ff]">50+</div>
                  <div className="text-xs text-white/90 uppercase tracking-wide">Events</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#8080ff]">25+</div>
                  <div className="text-xs text-white/90 uppercase tracking-wide">Projects</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="px-8 py-4 bg-[#8080ff]/30 hover:bg-[#8080ff]/40 rounded-full text-white text-lg font-semibold transition-all border border-[#8080ff]/20 shadow-[0_0_15px_rgba(128,128,255,0.3)] relative overflow-hidden group animate-bounce">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8080ff]/20 to-transparent group-hover:via-[#8080ff]/30 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></span>
                <span className="relative z-10">Explore Events</span>
              </button>

              <button className="px-8 py-4 bg-[#8080ff]/30 hover:bg-[#8080ff]/40 rounded-full text-white text-lg font-semibold transition-all border border-[#8080ff]/20 shadow-[0_0_15px_rgba(128,128,255,0.3)] relative overflow-hidden group">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8080ff]/20 to-transparent group-hover:via-[#8080ff]/30 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></span>
                <span className="relative z-10 flex items-center">
                  Learn More
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-[#8080ff]/20 via-[#8080ff]/30 to-[#8080ff]/10 rounded-full blur-3xl animate-pulse"></div>

              <div className="absolute -top-10 -left-10 bg-black/30 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-xl animate-float-1">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#8080ff] rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">💻</span>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">Coding Club</div>
                    <div className="text-white/80 text-xs">Active Now</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-10 -right-10 bg-black/30 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-xl animate-float-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#8080ff] rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">🚀</span>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">Innovation Lab</div>
                    <div className="text-white/80 text-xs">24/7 Access</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-20 bg-black/30 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-xl animate-float-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#8080ff] rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">🏆</span>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">Hackathons</div>
                    <div className="text-white/80 text-xs">Monthly</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 text-white/80">
          <span className="text-xs uppercase tracking-wide">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
