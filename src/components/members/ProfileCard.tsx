import React, { useRef, useCallback } from 'react';
import './ProfileCard.css';

interface ProfileCardProps {
  avatarUrl: string;
  className?: string;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  linkedinUrl?: string; // Added LinkedIn URL prop
  showUserInfo?: boolean;
  onLinkedinClick?: () => void; // Changed from onContactClick
  classInfo?: string;
  showGeniral?: boolean;
}

// Simple violet gradient without animation effects
const DEFAULT_GRADIENT = 'linear-gradient(145deg, #6d28d9 0%, #8b5cf6 100%)';

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl = '<Placeholder for avatar URL>',
  className = '',
  miniAvatarUrl,
  name = 'Javi A. Torres',
  title = 'Software Engineer',
  handle = 'javicodes',
  linkedinUrl = '', // Default empty
  showUserInfo = true,
  onLinkedinClick, // Changed from onContactClick
  classInfo = '',
  showGeniral = false
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleLinkedinClick = useCallback(() => {
    if (linkedinUrl) {
      window.open(linkedinUrl, '_blank');
    } else if (onLinkedinClick) {
      onLinkedinClick();
    }
  }, [linkedinUrl, onLinkedinClick]);

  return (
    <div ref={wrapRef} className={`pc-card-wrapper ${className}`.trim()}>
      <section ref={cardRef} className="pc-card">
        <div className="pc-inside">
          {showGeniral && <div className="pc-geniral-tag">Geniral</div>}
          <div className="pc-content pc-avatar-content">
            <img
              className="avatar"
              src={avatarUrl}
              alt={`${name || 'User'} avatar`}
              loading="lazy"
              onError={e => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            {showUserInfo && (
              <div className="pc-user-info">
                <div className="pc-user-details">
                  <div className="pc-mini-avatar">
                    <img
                      src={miniAvatarUrl || avatarUrl}
                      alt={`${name || 'User'} mini avatar`}
                      loading="lazy"
                      onError={e => {
                        const target = e.target as HTMLImageElement;
                        target.style.opacity = '0.5';
                        target.src = avatarUrl;
                      }}
                    />
                  </div>
                  <div className="pc-user-text">
                    <div className="pc-handle">@{handle}</div>
                  </div>
                </div>
                {/* LinkedIn icon instead of contact button */}
                <div 
                  className="pc-social-icon"
                  onClick={handleLinkedinClick}
                  style={{ pointerEvents: 'auto' }}
                  aria-label={`LinkedIn profile for ${name || 'user'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
              </div>
            )}
          </div>
          <div className="pc-content">
            <div className="pc-details">
              <h3>{name}</h3>
              <p>{title}</p>
              {classInfo && <div className="pc-class">{classInfo}</div>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);

export default ProfileCard;
