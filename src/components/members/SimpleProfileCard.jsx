import React from 'react';

const SimpleProfileCard = ({ name, avatarUrl, linkedinUrl }) => {
  const handleLinkedinClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (linkedinUrl && linkedinUrl.trim() !== "") {
      window.open(linkedinUrl, "_blank", "noopener,noreferrer");
    } else {
      // Optional fallback for no LinkedIn URL
      console.log("No LinkedIn profile available for", name);
    }
  };

  return (
    <div 
      className="relative bg-[#111133]/90 backdrop-blur-md rounded-xl border border-[#8080ff]/50 shadow-[0_10px_50px_-5px_rgba(128,128,255,0.8)] overflow-hidden transition-all duration-300 ease-in-out" 
      style={{ height: '280px', width: '100%' }}
    >
      {/* Full-size image with controlled height */}
      <div className="w-full h-full">
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt={name} 
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-700">
            <span className="text-white text-8xl font-bold">
              {name ? name.charAt(0) : "?"}
            </span>
          </div>
        )}
      </div>
      
      {/* LinkedIn icon - always display */}
      <button
        onClick={handleLinkedinClick}
        className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-[#0077B5]/80 hover:bg-[#0077B5] rounded-full transition-colors z-50 border-2 border-white/80 shadow-lg"
        aria-label={`View ${name}'s LinkedIn profile`}
        style={{ pointerEvents: 'auto' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-white" viewBox="0 0 16 16">
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
        </svg>
      </button>
    </div>
  );
};

export default SimpleProfileCard;