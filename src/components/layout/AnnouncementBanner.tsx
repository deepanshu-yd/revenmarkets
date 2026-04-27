"use client";

import React from "react";
import { Hammer } from "lucide-react";

const AnnouncementBanner = () => {
  return (
    <div className="w-full bg-[#0d151a] border-b border-[#5eead4]/10 py-2 px-12 flex items-center justify-center gap-3 relative overflow-hidden group">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[#5eead4]/[0.02] transition-colors group-hover:bg-[#5eead4]/[0.04]" />
      
      <div className="flex items-center gap-3 relative z-10">
        <div className="flex items-center gap-2 px-2 py-0.5 bg-[#5eead4]/10 border border-[#5eead4]/20 rounded text-[#5eead4] flex-shrink-0">
          <Hammer size={12} className="animate-bounce" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Early Access</span>
        </div>
        <p className="text-[11px] font-bold tracking-[0.05em] uppercase text-[#5eead4]/80 leading-none">
          REVEN is currently under development. Some features may not work and some modules display raw/simulated data. This does not represent the final version — V1 shipping soon.
        </p>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
