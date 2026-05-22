import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {/* Container for the rings */}
      <div className="relative w-32 h-32">
        
        {/* Outer Ring (Spin Animation) */}
        <div className="absolute inset-0 w-32 h-32 rounded-full border-4 border-blue-200 border-t-transparent border-r-transparent border-b-transparent animate-spin duration-[2s]"></div>
        
        {/* Inner Ring (Solid Blue, Pulse Animation) */}
        <div className="absolute top-3 left-3 w-26 h-26 rounded-full bg-blue-600 animate-pulse opacity-80"></div>
      </div>
    </div>
  );
};

export default Loader;