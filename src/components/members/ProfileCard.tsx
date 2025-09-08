"use client"

import React, { useRef, useCallback } from "react"
import { FaLinkedin } from "react-icons/fa"
import "./ProfileCard.css"

interface ProfileCardProps {
  avatarUrl: string
  className?: string
  name?: string
  title?: string
  linkedinUrl?: string
  showUserInfo?: boolean
  onLinkedinClick?: () => void
  classInfo?: string
  showGeniral?: boolean
}

const DEFAULT_GRADIENT = "linear-gradient(145deg, #6d28d9 0%, #8b5cf6 100%)"

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl = "/placeholder.svg?height=200&width=200",
  className = "",
  name = "Rajiv Kumar",
  title = "President | IV CSE-A",
  linkedinUrl = "",
  showUserInfo = true,
  onLinkedinClick,
  classInfo = "",
  showGeniral = false,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleLinkedinClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Always redirect to google.com
    window.open("https://www.google.com", "_blank", "noopener,noreferrer")
  }, [])

  return (
    <div ref={wrapRef} className={`pc-card-wrapper mx-auto max-w-[220px] sm:max-w-[280px] mobile-card-margin sm:mx-0 ${className}`.trim()}>
      <section ref={cardRef} className="pc-card purple-theme" style={{ zIndex: 1 }}>
        <div className="pc-inside" style={{ zIndex: 1 }}>
          {showGeniral && <div className="pc-geniral-tag">Geniral</div>}
          <div className="pc-content pc-header-content" style={{ zIndex: 1 }}>
            <div className="pc-details">
              <h5 className="pc-name">{name}</h5>
              <p className="pc-title">{title}</p>
            </div>
          </div>

          <div className="pc-content pc-avatar-content" style={{ zIndex: 1 }}>
            <div className="pc-avatar-container">
              {avatarUrl ? (
                <img
                  className="avatar"
                  src={avatarUrl}
                  alt={`${name || "User"} avatar`}
                  loading="lazy"
                  style={{ zIndex: 1 }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=200&width=200"
                  }}
                />
              ) : (
                <div 
                  className="avatar flex items-center justify-center bg-purple-700 text-white text-xl font-bold"
                  style={{ zIndex: 1 }}
                >
                  {name ? name.charAt(0) : "U"}
                </div>
              )}

              {showUserInfo && (
                <div className="pc-linkedin-overlay" style={{ zIndex: 99999 }}>
                  <a
                    className="pc-social-icon"
                    onClick={handleLinkedinClick}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        handleLinkedinClick(e as any)
                      }
                    }}
                    style={{
                      pointerEvents: "auto",
                      cursor: "pointer",
                      userSelect: "none",
                      zIndex: 99999,
                      position: "relative",
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`LinkedIn profile for ${name || "user"}`}
                    title="View LinkedIn Profile"
                  >
                    <FaLinkedin
                      size={20}
                      style={{
                        zIndex: 100000,
                        color: "white", // Changed from "#e879f9" to "white"
                        position: "relative",
                      }}
                    />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const ProfileCard = React.memo(ProfileCardComponent)

export default ProfileCard
