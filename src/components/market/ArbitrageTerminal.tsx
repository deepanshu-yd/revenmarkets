"use client";

import React, { useState } from "react";
import { ExternalLink, TrendingUp, Zap, Sparkles, ArrowRightLeft, Info } from "lucide-react";
import { MarketImage } from "./MarketImage";
import AggregatorModal from "./AggregatorModal";

const ARBITRAGE_DATA = [
  {
    id: 1,
    title: "US Federal Funds Rate",
    description: "Will the Fed cut rates by 25bps in June?",
    profit: "4.2%",
    risk: "Low",
    poly: {
      question: "Will the Fed cut rates by 25bps in June?",
      yes: 42,
      no: 58,
      image: "https://unavatar.io/twitter/federalreserve"
    },
    kalshi: {
      question: "Will the Fed cut rates by 25bps in June?",
      yes: 54,
      no: 46,
      image: "https://unavatar.io/twitter/federalreserve"
    },
    strategy: "Buy YES on Poly (42¢) + Buy NO on Kalshi (46¢)",
    totalCost: 88,
    potentialProfit: 12,
    match: 99
  },
  {
    id: 2,
    title: "SEC vs Ripple Appeal",
    description: "Will the SEC file an appeal in the Ripple case before the deadline?",
    profit: "7.5%",
    risk: "Medium",
    poly: {
      question: "Will SEC appeal Ripple case?",
      yes: 65,
      no: 35,
      image: "https://unavatar.io/twitter/SECGov"
    },
    kalshi: {
      question: "SEC vs Ripple: Appeal filed by October?",
      yes: 85,
      no: 15,
      image: "https://unavatar.io/twitter/Ripple"
    },
    strategy: "Buy YES on Poly (65¢) + Buy NO on Kalshi (15¢)",
    totalCost: 80,
    potentialProfit: 20,
    match: 94
  },
  {
    id: 3,
    title: "SpaceX Starship Launch",
    description: "Will the next Starship flight reach orbit?",
    profit: "12.0%",
    risk: "High",
    poly: {
      question: "Will Starship reach orbit on flight 4?",
      yes: 30,
      no: 70,
      image: "https://unavatar.io/twitter/SpaceX"
    },
    kalshi: {
      question: "SpaceX Starship Flight 4 Orbit success?",
      yes: 55,
      no: 45,
      image: "https://unavatar.io/twitter/elonmusk"
    },
    strategy: "Buy YES on Poly (30¢) + Buy NO on Kalshi (45¢)",
    totalCost: 75,
    potentialProfit: 25,
    match: 91
  },
  {
    id: 4,
    title: "UK General Election Date",
    description: "Will the UK election be held in October?",
    profit: "2.8%",
    risk: "Low",
    poly: {
      question: "Will the UK General Election be in October?",
      yes: 20,
      no: 80,
      image: "https://unavatar.io/twitter/10DowningStreet"
    },
    kalshi: {
      question: "UK Election Month: October?",
      yes: 25,
      no: 75,
      image: "https://unavatar.io/twitter/Conservatives"
    },
    strategy: "Buy YES on Poly (20¢) + Buy NO on Kalshi (75¢)",
    totalCost: 95,
    potentialProfit: 5,
    match: 98
  }
];

import { ArbitrageMarket } from "@/types/market";

const ArbitrageTerminal = () => {
  const [selectedItem, setSelectedItem] = useState<ArbitrageMarket | null>(null);

  return (
    <div className="h-full overflow-y-auto bg-black px-12 py-8 custom-scrollbar">
      {selectedItem && (
        <AggregatorModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
      
      <div className="max-w-[1600px] mx-auto mb-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-sm font-bold text-white mb-1 flex items-center gap-3">
              <ArrowRightLeft className="text-[#00ff41]" size={16} />
              Arbitrage Finder
            </h2>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Identify and execute guaranteed profit opportunities across prediction markets.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-[#111111] border border-[#333333] rounded-none px-5 py-2.5 flex items-center gap-3">
              <Zap size={14} className="text-[#00ff41]" />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Active Ops: <span className="text-white">14</span></span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-20">
          {ARBITRAGE_DATA.map((item) => {
            // Find the best arb strategy for the UI
            const isPolyYesArb = item.poly.yes + item.kalshi.no < 100;
            const isKalshiYesArb = item.kalshi.yes + item.poly.no < 100;
            
            const arbProfit = isPolyYesArb 
              ? 100 - (item.poly.yes + item.kalshi.no)
              : isKalshiYesArb 
                ? 100 - (item.kalshi.yes + item.poly.no)
                : 0;

            return (
              <div 
                key={item.id}
                className="bg-[#111111] border border-[#333333] rounded-none overflow-hidden hover:border-[#00ff41]/30 transition-all group  relative"
              >
                {/* Arb Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-[#00ff41]/10 border border-[#00ff41]/20 rounded-full px-3 py-1 flex items-center gap-1.5 ">
                    <Sparkles size={10} className="text-[#00ff41]" />
                    <span className="text-[10px] font-black text-[#00ff41] uppercase tracking-wider">{item.profit} ROI</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <MarketImage src={item.poly.image} alt="" seed={item.title} className="w-12 h-12 rounded-none  border border-[#333333]" />
                    <div>
                      <h3 className="text-[12px] font-bold text-white/90 leading-tight mb-1">{item.title}</h3>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest line-clamp-1">{item.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Poly Side */}
                    <div className="bg-white/[0.02] border border-[#333333] rounded-none p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center">
                          <span className="text-[8px] font-black text-white">P</span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Polymarket</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <span className="text-[9px] font-bold text-gray-600 uppercase block mb-1">Yes</span>
                          <span className="text-[12px] font-bold text-[#00ff41]">{item.poly.yes}¢</span>
                        </div>
                        <div className="w-px h-6 bg-white/5" />
                        <div className="text-center">
                          <span className="text-[9px] font-bold text-gray-600 uppercase block mb-1">No</span>
                          <span className="text-[12px] font-bold text-[#ff3333]">{item.poly.no}¢</span>
                        </div>
                      </div>
                    </div>

                    {/* Kalshi Side */}
                    <div className="bg-white/[0.02] border border-[#333333] rounded-none p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-4 h-4 bg-green-600 rounded flex items-center justify-center">
                          <span className="text-[8px] font-black text-white">K</span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Kalshi</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <span className="text-[9px] font-bold text-gray-600 uppercase block mb-1">Yes</span>
                          <span className="text-[12px] font-bold text-[#00ff41]">{item.kalshi.yes}¢</span>
                        </div>
                        <div className="w-px h-6 bg-white/5" />
                        <div className="text-center">
                          <span className="text-[9px] font-bold text-gray-600 uppercase block mb-1">No</span>
                          <span className="text-[12px] font-bold text-[#ff3333]">{item.kalshi.no}¢</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arb Strategy */}
                  <div className="bg-[#00ff41]/5 border border-[#00ff41]/10 rounded-none p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap size={14} className="text-[#00ff41]" />
                      <span className="text-[10px] font-black text-[#00ff41] uppercase tracking-widest">Optimal Strategy</span>
                    </div>
                    <p className="text-xs font-bold text-white/70 leading-relaxed">
                      Buy <span className="text-[#00ff41]">YES</span> on Polymarket for {item.poly.yes}¢ and <span className="text-[#ff3333]">NO</span> on Kalshi for {item.kalshi.no}¢.
                    </p>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="text-[10px] font-bold text-gray-500 uppercase">Total Cost: <span className="text-white ml-1">{item.poly.yes + item.kalshi.no}¢</span></div>
                      <div className="text-[10px] font-bold text-gray-500 uppercase">Net Profit: <span className="text-[#00ff41] ml-1">{100 - (item.poly.yes + item.kalshi.no)}¢</span></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Risk Level</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                        item.risk === 'Low' ? 'bg-green-500/10 text-green-500' : 
                        item.risk === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {item.risk}
                      </span>
                    </div>
                    <button 
                      onClick={() => setSelectedItem(item)}
                      className="px-6 py-2.5 bg-[#111111] border border-[#333333] rounded-none text-[10px] font-black text-white hover:bg-[#00ff41] hover:text-black hover:border-[#00ff41] transition-all uppercase tracking-widest flex items-center gap-2 group/btn"
                    >
                      Execute Arb
                      <TrendingUp size={12} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArbitrageTerminal;
