"use client";

import React, { useState } from "react";
import { Timer, TrendingUp, TrendingDown, Clock, Search, SlidersHorizontal, ArrowRight, Bookmark } from "lucide-react";

const CRYPTO_DATA = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    color: "#f7931a",
    currentPrice: 77504.30,
    priceToBeat: 77326.70,
    upPrice: 30.0,
    downPrice: 69.0,
    probability: 30,
    status: "up",
    timeLeft: "3m 21s"
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    color: "#627eea",
    currentPrice: 2307.75,
    priceToBeat: 2309.82,
    upPrice: 25.0,
    downPrice: 74.0,
    probability: 25,
    status: "down",
    timeLeft: "3m 21s"
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    color: "#14f195",
    currentPrice: 85.21,
    priceToBeat: 85.35,
    upPrice: 5.0,
    downPrice: 94.0,
    probability: 5,
    status: "down",
    timeLeft: "3m 21s"
  },
  {
    id: "xrp",
    name: "XRP",
    symbol: "XRP",
    color: "#23292f",
    currentPrice: 1.425,
    priceToBeat: 1.425,
    upPrice: 12.0,
    downPrice: 87.0,
    probability: 12,
    status: "up",
    timeLeft: "3m 21s"
  }
];

const CryptoTerminal = () => {
  const [activeTimeframe, setActiveTimeframe] = useState("5 Min");
  const timeframes = ["5 Min", "15 Min", "Hourly", "4 Hour"];

  return (
    <div className="flex h-full bg-[#0a0c10] overflow-hidden">
      {/* Sidebar Timeframes */}
      <div className="w-[180px] border-r border-white/[0.03] flex flex-col py-6">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setActiveTimeframe(tf)}
            className={`flex items-center gap-3 px-6 py-4 transition-all relative ${
              activeTimeframe === tf 
                ? "text-[#5eead4] bg-[#5eead4]/5" 
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {activeTimeframe === tf && <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#5eead4]" />}
            <Clock size={16} className={activeTimeframe === tf ? "text-[#5eead4]" : "text-gray-600"} />
            <span className="text-[11px] font-black uppercase tracking-widest">{tf}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Sub Header */}
        <div className="px-12 py-6 flex items-center justify-between border-b border-white/[0.03]">
          <div>
            <h1 className="text-sm font-bold text-white/90">{activeTimeframe} Crypto Markets</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
              April 24, 5:50AM - 5:55AM ET
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">3m 21s left</span>
            <div className="w-2 h-2 rounded-full bg-[#f87171] animate-pulse" />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="flex-1 overflow-y-auto px-12 py-8 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {CRYPTO_DATA.map((crypto) => (
              <div 
                key={crypto.id}
                className="bg-[#11161d] border border-white/[0.05] rounded-xl p-5 hover:border-white/10 transition-all group"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img 
                        src={`https://raw.githubusercontent.com/spothq/cryptocharts/master/svg/${crypto.symbol.toLowerCase()}.svg`}
                        alt={crypto.symbol}
                        className="w-10 h-10 rounded-lg object-contain bg-white/5 p-1.5"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-600 rounded-full border border-[#11161d] flex items-center justify-center">
                        <span className="text-[8px] font-black text-white">B</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[12px] font-bold text-white/90 leading-snug">{crypto.name} Up or Down</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span className="text-[9px] text-gray-600 font-bold uppercase">Binance</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Circular Indicator */}
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="20"
                        cy="20"
                        r="16"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="3"
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r="16"
                        fill="none"
                        stroke={crypto.status === 'up' ? '#5eead4' : '#f87171'}
                        strokeWidth="3"
                        strokeDasharray={100}
                        strokeDashoffset={100 - crypto.probability}
                      />
                    </svg>
                    <span className="absolute text-[8px] font-black text-white/80">{crypto.probability}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button disabled className="flex flex-col items-center py-2.5 bg-[#065f46]/10 border border-[#065f46]/20 rounded-lg cursor-not-allowed group/btn relative overflow-hidden">
                    <span className="text-[10px] font-bold text-[#5eead4]/40 uppercase tracking-wider group-hover/btn:opacity-0 transition-opacity">Up {crypto.upPrice}¢</span>
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/btn:opacity-100 transition-opacity text-[8px] text-[#5eead4] font-black uppercase">Paused</span>
                  </button>
                  <button disabled className="flex flex-col items-center py-2.5 bg-[#991b1b]/10 border border-[#991b1b]/20 rounded-lg cursor-not-allowed group/btn relative overflow-hidden">
                    <span className="text-[10px] font-bold text-[#f87171]/40 uppercase tracking-wider group-hover/btn:opacity-0 transition-opacity">Down {crypto.downPrice}¢</span>
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/btn:opacity-100 transition-opacity text-[8px] text-[#f87171] font-black uppercase">Paused</span>
                  </button>
                </div>

                {/* Stats */}
                <div className="flex items-end justify-between">
                  <div className="space-y-3">
                    <div>
                      <div className="text-[9px] font-bold text-gray-600 uppercase tracking-widest flex items-center gap-1">
                        Current Price <TrendingDown size={10} className="text-[#f87171]" />
                      </div>
                      <div className="text-[12px] font-bold text-[#fbbf24] mt-0.5">
                        ${crypto.currentPrice.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                        Price to Beat
                      </div>
                      <div className="text-[12px] font-bold text-white/60 mt-0.5">
                        ${crypto.priceToBeat.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <button className="p-2 text-gray-600 hover:text-[#5eead4] transition-colors">
                    <Bookmark size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoTerminal;
