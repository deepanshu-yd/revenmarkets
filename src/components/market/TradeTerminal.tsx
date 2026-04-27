"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Share2, Info, Link as LinkIcon, Settings, ShieldCheck, Zap, Search } from "lucide-react";
import { useMarkets } from "@/hooks/useMarkets";
import { useRouter } from "next/navigation";
import { Market } from "@/types/market";
import { fmtUSD, relativeTime } from "@/lib/format";
import { PriceChart } from "./PriceChart";
import { OrderBook } from "./OrderBook";
import { TradePanel } from "./TradePanel";
import { useSettings } from "@/providers/SettingsContext";
import { useLiveBook } from "@/lib/stream";

interface TradeTerminalProps {
  market: Market;
  history?: any;
}

export const TradeTerminal = ({ market, history }: TradeTerminalProps) => {
  const [activeBottomTab, setActiveBottomTab] = useState("Positions");
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [selectorSearch, setSelectorSearch] = useState("");
  const { isPrivate } = useSettings();
  const router = useRouter();
  const selectorRef = useRef<HTMLDivElement>(null);

  const { markets } = useMarkets("All", selectorSearch);
  const yesToken = market?.clobTokenIds?.[0];
  const { bids, asks, lastTrade, connected } = useLiveBook(yesToken);

  // Close selector on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsSelectorOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const bottomTabs = [
    "Positions", "Open Orders", "TWAP", "Pegged Orders", "Trade History", "Funding History", "Order History"
  ];

  return (
    <div className="flex flex-col h-full bg-[#0a0c10] text-gray-400 font-sans select-none">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.03] bg-[#0a0f14]">
        <div className="flex items-center gap-8">
          {/* Market Selector */}
          <div className="relative" ref={selectorRef}>
            <div 
              onClick={() => setIsSelectorOpen(!isSelectorOpen)}
              className="flex items-center gap-3 px-2 py-1 hover:bg-white/5 rounded transition-colors cursor-pointer group"
            >
              <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center overflow-hidden">
                <img src={market.image || market.icon} alt="" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-[13px] font-bold text-white truncate max-w-[200px]">{market.question}</h1>
              <ChevronDown size={14} className={`text-gray-500 group-hover:text-white transition-transform ${isSelectorOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown Menu */}
            {isSelectorOpen && (
              <div className="absolute top-full left-0 mt-2 w-[400px] bg-[#0d121a] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-3 border-b border-white/5">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search markets..."
                      value={selectorSearch}
                      onChange={(e) => setSelectorSearch(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-[12px] text-white focus:outline-none focus:border-[#5eead4]/50 transition-all"
                    />
                  </div>
                </div>
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                  {markets.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => {
                        router.push(`/markets/${m.slug}`);
                        setIsSelectorOpen(false);
                      }}
                      className={`flex items-center gap-3 p-3 hover:bg-white/[0.03] transition-colors cursor-pointer border-b border-white/[0.02] last:border-0 ${
                        m.id === market.id ? 'bg-[#5eead4]/5' : ''
                      }`}
                    >
                      <img src={m.image || m.icon} alt="" className="w-8 h-8 rounded bg-gray-800 flex-shrink-0 object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className={`text-[11px] font-bold truncate ${m.id === market.id ? 'text-[#5eead4]' : 'text-white/80'}`}>
                          {m.question}
                        </p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-[9px] font-bold text-[#5eead4] uppercase tracking-tighter">
                            {m.outcomePrices?.[0] != null ? `${(m.outcomePrices[0] * 100).toFixed(1)}%` : '—'}
                          </span>
                          <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                            Vol {fmtUSD(m.volumeNum)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {markets.length === 0 && (
                    <div className="p-8 text-center">
                      <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">No markets found</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Market Stats */}
          <div className="flex items-center gap-6">
            <StatItem label="Liquidity" value={fmtUSD(market.liquidityNum)} />
            <StatItem label="Volume" value={fmtUSD(market.volumeNum)} />
            <StatItem label="Start Date" value={new Date(market.startDate || "").toLocaleDateString()} />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                Strength <Info size={10} />
              </span>
              <div className="mt-1 w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-pink-500 w-[65%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-[#5eead4] text-[11px] font-bold">
            <span className="flex items-center gap-1">
              <Zap size={12} fill="currentColor" />
              248d 17h 17m 47s
            </span>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <LinkIcon size={14} className="hover:text-white cursor-pointer" />
            <Share2 size={14} className="hover:text-white cursor-pointer" />
            <Info size={14} className="hover:text-white cursor-pointer" />
            <Settings size={14} className="hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-white/[0.03]">
          {/* Chart Header */}
          <div className="px-6 py-3 flex items-center justify-between border-b border-white/[0.02]">
            <div className="flex items-center gap-4">
              <span className="text-lg font-black text-white">3.8% Chance</span>
            </div>
            <div className="flex items-center gap-1 p-0.5 bg-white/[0.02] rounded-md border border-white/5">
              {["5m", "15m", "1h", "4h", "1d", "1w", "1m", "All"].map((t) => (
                <button
                  key={t}
                  className={`px-2 py-1 text-[10px] font-bold rounded ${t === "1w" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Area */}
          <div className="flex-1 relative">
            {history ? (
              <PriceChart data={history.history} liveTick={lastTrade ? { t: Math.floor(lastTrade.ts / 1000), p: lastTrade.price } : null} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-gray-700">
                Loading Market Data...
              </div>
            )}
          </div>

          {/* Bottom Tabs Section */}
          <div className="h-[200px] border-t border-white/[0.03] flex flex-col bg-[#0a0f14]">
            <div className="flex items-center justify-between px-4 border-b border-white/[0.02]">
              <div className="flex items-center">
                {bottomTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveBottomTab(tab)}
                    className={`px-4 py-3 text-[11px] font-bold transition-all relative ${activeBottomTab === tab ? "text-white" : "text-gray-500 hover:text-gray-300"
                      }`}
                  >
                    {tab}
                    {activeBottomTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#5eead4]" />}
                  </button>
                ))}
              </div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                Showing All Venues <ChevronDown size={10} />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <span className="text-[11px] font-bold text-gray-600 uppercase tracking-widest">No positions found</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[340px] flex flex-col bg-[#0a0f14]">
          {/* Order Book / Others Toggle */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.02]">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-black text-white border-b-2 border-[#5eead4] pb-1 cursor-pointer">Order Book</span>
              <span className="text-[11px] font-bold text-gray-500 hover:text-gray-300 cursor-pointer pb-1">Others</span>
            </div>
            <ChevronDown size={14} className="text-gray-600" />
          </div>

          {/* Order Book Content */}
          <div className="flex-1 overflow-hidden">
            <OrderBook bids={bids} asks={asks} levels={12} />
          </div>

          {/* Trade Panel */}
          <div className="border-t border-white/[0.05] p-3 bg-[#0c1218]">
            <TradePanel market={market} />
          </div>

          {/* Related Markets */}
          <div className="border-t border-white/[0.05] p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-white uppercase tracking-widest">Related Markets</span>
              <ChevronDown size={14} className="text-gray-500" />
            </div>
            <div className="flex flex-col gap-4">
              <RelatedMarketItem question="Will Jesus Christ return before 2027?" percentage={49} color="bg-[#4f46e5]" />
              <RelatedMarketItem question="Will Trump resign before 2027?" percentage={5} color="bg-[#dc2626]" />
              <RelatedMarketItem question="Will Trump pardon Diddy before 2027?" percentage={4} color="bg-[#4b5563]" />
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              {["All", "Trump", "Politics", "Crypto"].map((t) => (
                <button key={t} className="px-2 py-1 rounded bg-white/[0.03] border border-white/5 text-[9px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-tighter">
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest leading-none">{label}</span>
    <span className="text-[11px] font-black text-white/90 tracking-tight leading-none">{value}</span>
  </div>
);

const RelatedMarketItem = ({ question, percentage, color }: { question: string; percentage: number; color: string }) => (
  <div className="flex items-center gap-3 group cursor-pointer">
    <div className={`w-8 h-8 rounded ${color} flex-shrink-0 flex items-center justify-center overflow-hidden border border-white/10 shadow-lg`}>
      <Zap size={14} className="text-white/40 group-hover:text-white transition-colors" />
    </div>
    <div className="flex flex-col flex-1 gap-0.5 min-w-0">
      <span className="text-[10px] font-bold text-gray-400 group-hover:text-white transition-colors line-clamp-2 leading-snug">{question}</span>
    </div>
    <span className="text-sm font-black text-white tracking-tighter">{percentage}%</span>
  </div>
);
