"use client";

import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MarketNav = ({ activeTab, onTabChange }: Props) => {
  const router = useRouter();
  const [activeSize, setActiveSize] = useState("5$");

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    router.push(`/?tab=${tab}`);
  };

  const tabs = ["New Markets", "Crypto", "Aggregator", "Arbitrage Finder", "Automated Bots"];
  const sizes = ["5$", "10$", "25$", "50$", "100$", "Custom"];

  return (
    <div className="w-full bg-black border-b border-[#333333] px-12 py-2.5 flex items-center justify-between gap-4">
      {/* Left side: Tabs */}
      <div className="flex items-center gap-7">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`text-[13px] font-bold tracking-wide transition-all duration-200 relative py-2 ${
              activeTab === tab
                ? "text-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-[-11px] left-0 right-0 h-[2px] bg-[#00ff41]  z-10" />
            )}
          </button>
        ))}
      </div>

      {/* Right side: Tools */}
      <div className="flex items-center gap-5">
        {/* Buy Size */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Buy Size</span>
          <div className="flex items-center bg-[#111111] rounded-none p-1 border border-[#333333]">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setActiveSize(size)}
                className={`px-3.5 py-1.5 text-[11px] font-black rounded-none transition-all duration-200 ${
                  activeSize === size
                    ? "bg-[#00ff41]/10 text-[#00ff41] "
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#00ff41] transition-colors" size={13} />
          <input
            type="text"
            placeholder="Search for a market"
            className="bg-[#111111] border border-[#333333] rounded-none pl-10 pr-4 py-2.5 text-[12px] text-white placeholder:text-gray-700 focus:outline-none focus:border-[#00ff41]/30 focus:ring-1 focus:ring-[#00ff41]/10 w-[260px] transition-all"
          />
        </div>

        {/* Filters */}
        <button className="flex items-center gap-2.5 bg-[#111111] border border-[#333333] hover:border-white/[0.1] px-4 py-2.5 rounded-none transition-all group">
          <span className="text-[12px] font-bold text-gray-500 group-hover:text-gray-300">Filters</span>
          <SlidersHorizontal size={14} className="text-gray-600 group-hover:text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default MarketNav;
