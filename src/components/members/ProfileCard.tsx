"use client"

import React, { useRef, useCallback } from "react"
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
  name = "Javi A. Torres",
  title = "Software Engineer",
  linkedinUrl = "",
  showUserInfo = true,
  onLinkedinClick,
  classInfo = "",
  showGeniral = false,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleLinkedinClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      if (linkedinUrl && linkedinUrl.trim() !== "") {
        window.open(linkedinUrl, "_blank", "noopener,noreferrer")
      } else if (onLinkedinClick) {
        onLinkedinClick()
      } else {
        alert("LinkedIn profile not available")
      }
    },
    [linkedinUrl, onLinkedinClick],
  )

  return (
    <div ref={wrapRef} className={`pc-card-wrapper mx-auto max-w-[280px] sm:max-w-none sm:mx-0 ${className}`.trim()}>
      <section ref={cardRef} className="pc-card">
        <div className="pc-inside">
          {showGeniral && <div className="pc-geniral-tag">Geniral</div>}
          <div className="pc-content pc-avatar-content">
            <img
              className="avatar"
              src={avatarUrl || "/placeholder.svg?height=200&width=200&query=profile"}
              alt={`${name || "User"} avatar`}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=200&width=200"
              }}
            />

            {classInfo && <div className="pc-class-info-fixed">{classInfo}</div>}

            {showUserInfo && (
              <div className="pc-user-info linkedin-only">
                <div
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
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`LinkedIn profile for ${name || "user"}`}
                  title="View LinkedIn Profile"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          <div className="pc-content">
            <div className="pc-details">
              <h5 className="text-xl sm:text-2xl font-bold">{name}</h5>
              <p>{title}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const ProfileCard = React.memo(ProfileCardComponent)

export default ProfileCard
