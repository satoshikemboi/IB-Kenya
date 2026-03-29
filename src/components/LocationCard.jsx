import React from 'react';

function LocationCard() {
    return (
      <div className="bg-white dark:bg-[#0D1B2E] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden max-w-2xl">
        
        {/* Map area */}
        <div className="h-44 bg-[#1a2744] relative flex items-center justify-center">
          <div className="absolute inset-0 opacity-30">
            {/* grid lines to suggest a map */}
            <div className="w-full h-px bg-blue-900 absolute top-1/3" />
            <div className="w-full h-px bg-blue-900 absolute top-2/3" />
            <div className="h-full w-px bg-blue-900 absolute left-1/3" />
            <div className="h-full w-px bg-blue-900 absolute left-2/3" />
          </div>
          {/* Pin */}
          <div className="flex flex-col items-center z-10">
            <div className="w-3.5 h-3.5 rounded-full bg-[#C9A84C] border-2 border-white" />
            <div className="w-0.5 h-5 bg-[#C9A84C]" />
            <div className="w-2.5 h-1 bg-black/30 rounded-full" />
          </div>
          <div className="absolute bg-[#C9A84C]/90 text-[#07101E] text-xs font-medium px-2 py-1 rounded"
            style={{ top: "calc(50% - 36px)", left: "calc(50% + 10px)" }}>
            Westlands
          </div>
        </div>
  
        {/* Body */}
        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/25 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#C9A84C]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Westlands</p>
              <p className="text-xs text-gray-500">Nairobi, Kenya · -1.2675, 36.8120</p>
            </div>
          </div>
  
          <hr className="border-gray-100 dark:border-white/10 mb-4" />
  
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            {[["County","Nairobi County"],["Sub-county","Westlands"],["Zone","Central Business"],["Timezone","EAT (UTC+3)"]].map(([l,v]) => (
              <div key={l}>
                <p className="text-xs text-gray-400">{l}</p>
                <p className="font-medium text-gray-900 dark:text-white">{v}</p>
              </div>
            ))}
          </div>
  
          <div className="flex flex-wrap gap-2 mb-4">
            {["Commercial hub","Diplomatic area","Shopping & dining","Tech offices"].map(t => (
              <span key={t} className="text-xs border border-gray-200 dark:border-white/15 text-gray-500 rounded-full px-3 py-0.5">{t}</span>
            ))}
          </div>
  
          <div className="flex gap-2">
            <a href="https://maps.google.com/?q=Westlands,Nairobi,Kenya" target="_blank"
              className="flex-1 bg-[#C9A84C] text-[#07101E] text-xs font-bold py-2.5 rounded-lg text-center">
              Open in Maps
            </a>
            <a href="https://en.wikipedia.org/wiki/Westlands,_Nairobi" target="_blank"
              className="flex-1 border border-gray-200 dark:border-white/15 text-gray-700 dark:text-gray-300 text-xs font-medium py-2.5 rounded-lg text-center">
              Learn more
            </a>
          </div>
        </div>
      </div>
    );
  }

  export default LocationCard;