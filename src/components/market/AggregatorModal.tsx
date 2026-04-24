"use client";

import React, { useState } from "react";
import { X, ExternalLink, Info, Sparkles, TrendingUp, Zap } from "lucide-react";
import { MarketImage } from "./MarketImage";

interface Props {
  item: any;
  onClose: () => void;
}

const AggregatorModal = ({ item, onClose }: Props) => {
  const [side, setSide] = useState<"Yes" | "No">("Yes");
  const [amount, setAmount] = useState("6");

  const quickAmounts = ["$6", "$10", "$25", "$50", "$100", "MAX"];

  // Logic to determine best venue
  const polyPrice = side === "Yes" ? item.poly.yes : item.poly.no;
  const kalshiPrice = side === "Yes" ? item.kalshi.yes : item.kalshi.no;
  
  const bestVenue = polyPrice <= kalshiPrice ? "Polymarket" : "Kalshi";
  const bestPrice = polyPrice <= kalshiPrice ? polyPrice : kalshiPrice;
  const otherPrice = polyPrice <= kalshiPrice ? kalshiPrice : polyPrice;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#11161d] border border-white/10 rounded-2xl w-full max-w-[850px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/[0.03]">
          <h2 className="text-xl font-bold text-white/90">Market Aggregator Detail</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-500 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Comparison Grid */}
          <div className="grid grid-cols-[160px_1fr_1fr] gap-4">
            {/* Labels Column */}
            <div className="flex flex-col text-[11px] font-bold text-gray-500/80 uppercase tracking-widest h-full">
              <div className="h-[52px] flex items-center">Venue</div>
              <div className="h-[80px] flex items-center">Market</div>
              <div className="h-[52px] flex items-center">Current Price</div>
              <div className="h-[52px] flex items-center">Volume</div>
              <div className="h-[52px] flex items-center">Liquidity</div>
              <div className="h-[52px] flex items-center">Resolution Date</div>
            </div>

            {/* Polymarket Column */}
            <div className="bg-[#1a212c]/40 border border-white/[0.04] rounded-xl overflow-hidden">
              <div className="h-[52px] px-6 flex items-center justify-between border-b border-white/[0.03]">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-[10px] font-black text-white">P</span>
                  </div>
                  <span className="text-xs font-bold text-white/90">Polymarket</span>
                </div>
                <ExternalLink size={12} className="text-gray-600 hover:text-white/40 cursor-pointer" />
              </div>
              <div className="h-[80px] px-6 flex items-center gap-4 border-b border-white/[0.03]">
                <MarketImage 
                  src={item.poly.image} 
                  alt="" 
                  seed={item.title} 
                />
                <p className="text-[12px] font-bold text-white/60 leading-snug line-clamp-2">{item.poly.question}</p>
              </div>
              <div className="h-[52px] px-6 flex items-center gap-4 border-b border-white/[0.03]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Yes</span>
                  <span className="text-[13px] font-black text-[#5eead4]">{item.poly.yes}¢</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">No</span>
                  <span className="text-[13px] font-black text-[#f87171]">{item.poly.no}¢</span>
                </div>
              </div>
              <div className="h-[52px] px-6 flex items-center text-[13px] font-black text-white/80 border-b border-white/[0.03]">$208K</div>
              <div className="h-[52px] px-6 flex items-center text-[13px] font-black text-white/80 border-b border-white/[0.03]">$35K</div>
              <div className="h-[52px] px-6 flex items-center text-[11px] font-bold text-white/30 gap-2 uppercase tracking-tight">
                N/A <Info size={12} />
              </div>
            </div>

            {/* Kalshi Column */}
            <div className="bg-[#1a212c]/40 border border-white/[0.04] rounded-xl overflow-hidden">
              <div className="h-[52px] px-6 flex items-center justify-between border-b border-white/[0.03]">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-600 rounded flex items-center justify-center">
                    <span className="text-[10px] font-black text-white">K</span>
                  </div>
                  <span className="text-xs font-bold text-white/90">Kalshi</span>
                </div>
                <ExternalLink size={12} className="text-gray-600 hover:text-white/40 cursor-pointer" />
              </div>
              <div className="h-[80px] px-6 flex items-center gap-4 border-b border-white/[0.03]">
                <MarketImage 
                  src={item.kalshi.image} 
                  alt="" 
                  seed={item.title} 
                />
                <p className="text-[12px] font-bold text-white/60 leading-snug line-clamp-2">{item.kalshi.question}</p>
              </div>
              <div className="h-[52px] px-6 flex items-center gap-4 border-b border-white/[0.03]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Yes</span>
                  <span className="text-[13px] font-black text-[#5eead4]">{item.kalshi.yes}¢</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">No</span>
                  <span className="text-[13px] font-black text-[#f87171]">{item.kalshi.no}¢</span>
                </div>
              </div>
              <div className="h-[52px] px-6 flex items-center text-[13px] font-black text-white/80 border-b border-white/[0.03]">$6K</div>
              <div className="h-[52px] px-6 flex items-center text-[13px] font-black text-white/80 border-b border-white/[0.03]">$0</div>
              <div className="h-[52px] px-6 flex items-center text-[11px] font-bold text-white/30 gap-2 uppercase tracking-tight">
                1/1/2030 <Zap size={12} className="text-blue-500" /> 8:30 PM
              </div>
            </div>
          </div>

          {/* Matching Score Bar */}
          <div className="bg-[#5eead4]/5 border border-[#5eead4]/10 rounded-xl px-6 py-3 flex items-center justify-center gap-2">
            <span className="text-[14px] font-black text-[#5eead4]">{item.match}%</span>
            <span className="text-[11px] font-bold text-white/50 uppercase tracking-[0.2em]">Matching Score</span>
            <Info size={14} className="text-[#5eead4]/40" />
          </div>

          {/* Execution Section */}
          <div className="grid grid-cols-2 gap-8 pt-4">
            {/* Opportunity */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest">Execution Opportunity</h3>
                <div className="flex items-center bg-black/40 p-1 rounded-lg border border-white/5">
                  <button 
                    onClick={() => setSide("Yes")}
                    className={`px-5 py-1.5 text-[10px] font-black rounded-md transition-all ${side === "Yes" ? "bg-white/10 text-white shadow-lg" : "text-gray-500 hover:text-gray-400"}`}
                  >
                    YES
                  </button>
                  <button 
                    onClick={() => setSide("No")}
                    className={`px-5 py-1.5 text-[10px] font-black rounded-md transition-all ${side === "No" ? "bg-white/10 text-white shadow-lg" : "text-gray-500 hover:text-gray-400"}`}
                  >
                    NO
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="relative group">
                  <input 
                    type="text" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:border-[#5eead4]/30 transition-all" 
                    placeholder="Trade Amount ($)"
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Amount</span>
                    <span className="text-[13px] font-black text-[#5eead4]">${amount}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-6 gap-2">
                  {quickAmounts.map(val => (
                    <button 
                      key={val}
                      onClick={() => setAmount(val.replace('$', ''))}
                      className="py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-[10px] font-bold text-white/40 hover:bg-white/5 hover:text-white/80 transition-all border-dashed"
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Analysis */}
            <div className="bg-[#1a212c]/40 border border-white/[0.04] rounded-2xl p-6 relative group overflow-hidden">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={14} className="text-[#5eead4]" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Reven AI Execution Analysis</span>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-2xl ${bestVenue === "Polymarket" ? "bg-blue-600" : "bg-green-600"}`}>
                    <span className="text-sm font-black text-white">{bestVenue[0]}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white/90">{bestVenue}</h4>
                    <span className="text-[10px] font-bold text-[#5eead4] uppercase tracking-widest opacity-80">Recommended</span>
                  </div>
                </div>
                <TrendingUp size={16} className="text-[#5eead4]/40" />
              </div>

              <div className="space-y-3 mb-6">
                <div className="bg-[#5eead4]/5 px-4 py-3 rounded-xl border border-[#5eead4]/10">
                  <p className="text-[11px] font-bold text-[#5eead4]/80 leading-relaxed">
                    This venue offers a better execution price for your trade.
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/5">
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Higher Liquidity</p>
                  </div>
                  <div className="bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/5">
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Fast Execution</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className={`py-3 rounded-xl text-[11px] font-black border transition-all ${side === "Yes" ? "bg-[#5eead4] text-black border-[#5eead4] shadow-[0_0_20px_rgba(94,234,212,0.3)]" : "bg-white/[0.02] border-white/10 text-white/40"}`}>
                  YES {bestPrice}¢
                </button>
                <button className={`py-3 rounded-xl text-[11px] font-black border transition-all ${side === "No" ? "bg-[#f87171] text-white border-[#f87171] shadow-[0_0_20px_rgba(248,113,113,0.3)]" : "bg-white/[0.02] border-white/10 text-white/40"}`}>
                  NO {100 - bestPrice}¢
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AggregatorModal;
