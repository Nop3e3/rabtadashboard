import React from 'react';
import "./header.css"
const AppContentHeader = () => {
  // Common style for Lexend Exa font
  const lexendStyle = { fontFamily: "'Lexend Exa', sans-serif" };

  return (
    <div 
      className="flex "
      style={{lexendStyle}
   
    
    
    }
    >
      {/* Left Content */}
      <div className="txt">
        <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight">
          Mobile App Content Manager
        </h1>
        <p className="text-[#A1A1A1] text-lg md:text-xl font-light">
          Edit all screens and sections of your mobile app
        </p>
      </div>

      {/* Right Content - Action Button */}
      <div className="mt-6 md:mt-0">
        <button 
          className="save"
        
        >
          {/* Floppy Disk Icon */}
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#FFFFFF" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>

          <span className="text-white text-xl font-semibold">
            Save Changes
          </span>
        </button>
      </div>
    </div>
  );
};

export default AppContentHeader;