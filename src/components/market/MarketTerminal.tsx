"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search, Loader2 } from "lucide-react";
import { useMarkets } from "@/hooks/useMarkets";
import { fmtUSD, fmtPct, relativeTime } from "@/lib/format";
import Link from "next/link";

const MarketTerminal = () => {
  const [activeSubTab, setActiveSubTab] = useState("All Markets");
  const [searchQuery, setSearchQuery] = useState("");

  const subTabs = [
    "All Markets", "Trump", "Politics", "Culture", "World", "Sports",
    "Crypto", "Finance", "Economy", "Tech", "Breaking News", "Geopolitics"
  ];

  const { markets, error, isLoading } = useMarkets(activeSubTab, searchQuery);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#0a0c10]">
      {/* Sub-Tabs Navigation & Search */}
      <div className="flex items-center justify-between px-12 py-2 border-b border-white/[0.03] bg-[#0a0c10] z-30">
        <div className="flex items-center gap-7 py-2">
          {subTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`text-[11px] font-bold tracking-tight whitespace-nowrap transition-all duration-200 relative py-2 ${activeSubTab === tab
                ? "text-white"
                : "text-gray-500 hover:text-gray-300"
                }`}
            >
              {tab}
              {activeSubTab === tab && (
                <div className="absolute bottom-[-11px] left-0 right-0 h-[1.5px] bg-[#5eead4] shadow-[0_0_8px_rgba(94,234,212,0.4)]" />
              )}
            </button>
          ))}
        </div>

        <div className="relative ml-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
          <input
            type="text"
            placeholder="Search markets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/[0.03] border border-white/10 rounded-lg py-1.5 pl-9 pr-4 text-[11px] text-white focus:outline-none focus:border-[#5eead4]/50 w-[240px] transition-all"
          />
        </div>
      </div>

      {/* Terminal Content (Scrollable Box) */}
      <div className="flex-1 overflow-y-auto overflow-x-auto custom-scrollbar pb-12">
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead className="sticky top-0 bg-[#0a0c10] z-20">
            <tr className="border-b border-white/[0.03]">
              <th className="px-12 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider w-[400px]">Market</th>
              <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Price (yes|no)</th>
              <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Probability <ChevronDown size={12} />
                </div>
              </th>
              <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Volume <ChevronUp size={12} />
                </div>
              </th>
              <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  24h Change <ChevronUp size={12} />
                </div>
              </th>
              <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Liquidity <ChevronDown size={12} />
                </div>
              </th>
              <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Market Age <ChevronUp size={12} />
                </div>
              </th>
              <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Closing Time <ChevronUp size={12} />
                </div>
              </th>
              <th className="px-4 pr-12 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Quick Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-[#5eead4] animate-spin" />
                    <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">Loading Markets...</span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={9} className="py-20 text-center">
                  <span className="text-red-400 font-bold text-xs">Error loading markets. Make sure the backend is running.</span>
                </td>
              </tr>
            ) : markets.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-20 text-center">
                  <span className="text-gray-500 font-bold text-xs">No markets found.</span>
                </td>
              </tr>
            ) : (
              markets.map((market) => (
                <tr key={market.id} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors group cursor-pointer">
                  <td className="px-12 py-4">
                    <Link href={`/markets/${market.slug}`} className="flex items-center gap-3">
                      <img
                        src={market.image || market.icon || `https://api.dicebear.com/7.x/initials/svg?seed=${market.ticker || market.id}`}
                        alt=""
                        className="w-8 h-8 rounded-md bg-gray-800 object-cover"
                      />
                      <span className="text-[12px] font-medium text-white/80 leading-relaxed group-hover:text-white transition-colors">
                        {market.question}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[#5eead4] text-[12px] font-bold">
                        {market.outcomePrices?.[0] != null ? `${(market.outcomePrices[0] * 100).toFixed(1)}¢` : "—"}
                      </span>
                      <span className="text-gray-700">|</span>
                      <span className="text-[#f87171] text-[12px] font-bold">
                        {market.outcomePrices?.[1] != null ? `${(market.outcomePrices[1] * 100).toFixed(1)}¢` : "—"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-[12px] font-bold text-white/60">
                    {market.outcomePrices?.[0] != null ? `${(market.outcomePrices[0] * 100).toFixed(0)}%` : "—"}
                  </td>
                  <td className="px-4 py-4 text-[12px] font-bold text-white/60">
                    {fmtUSD(market.volumeNum)}
                  </td>
                  <td className={`px-4 py-4 text-[12px] font-bold ${((market.oneDayPriceChange ?? 0) >= 0) ? "text-[#5eead4]" : "text-[#f87171]"}`}>
                    {fmtPct(market.oneDayPriceChange)}
                  </td>
                  <td className="px-4 py-4 text-[#5eead4] text-[12px] font-bold">
                    {fmtUSD(market.liquidityNum)}
                  </td>
                  <td className="px-4 py-4 text-[12px] font-bold text-white/40">
                    {market.startDate ? new Date(market.startDate).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-4 py-4 text-[11px] font-medium text-white/60">
                    {relativeTime(market.endDate)}
                  </td>
                  <td className="px-4 pr-12 py-4">
                    <div className="flex items-center gap-2">
                      <button className="bg-[#5eead4]/5 hover:bg-[#5eead4]/10 text-[#5eead4] text-[10px] font-black px-3 py-1.5 rounded border border-[#5eead4]/10 transition-all active:scale-95">
                        BUY YES
                      </button>
                      <button className="bg-[#f87171]/5 hover:bg-[#f87171]/10 text-[#f87171] text-[10px] font-black px-3 py-1.5 rounded border border-[#f87171]/10 transition-all active:scale-95">
                        BUY NO
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Load More Button */}
        {!isLoading && markets.length > 0 && (
          <div className="flex justify-center py-10">
            <button className="bg-[#11161d] hover:bg-[#1a1f26] border border-white/5 text-gray-400 hover:text-white px-8 py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg flex items-center gap-2 group">
              Load More Markets
              <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(94, 234, 212, 0.2);
        }
      `}</style>
    </div>
  );
};

export default MarketTerminal;
