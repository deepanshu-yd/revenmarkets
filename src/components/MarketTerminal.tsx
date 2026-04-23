"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const MarketTerminal = () => {
  const [activeSubTab, setActiveSubTab] = useState("All Markets");

  const subTabs = [
    "All Markets", "Trump", "Politics", "Culture", "World", "Sports", 
    "Crypto", "Finance", "Economy", "Tech", "Breaking News", "Geopolitics", "New"
  ];

  const markets = [
    {
      id: 1,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=fed",
      description: "Will the Fed decrease interest rates by 50+ bps after the April 2026 meeting?",
      priceYes: "0.1¢",
      priceNo: "99.9¢",
      probability: "0%",
      volume: "$46,587,053.43",
      change: "-0.1¢",
      liquidity: "$5,882,713.97",
      age: "N/A",
      closingTime: "5d 9h 30m left"
    },
    {
      id: 2,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=panama",
      description: "Will Panama win the 2026 FIFA World Cup?",
      priceYes: "0.1¢",
      priceNo: "99.9¢",
      probability: "0%",
      volume: "$8,898,595.17",
      change: "-0.1¢",
      liquidity: "$5,568,766.14",
      age: "N/A",
      closingTime: "173d 9h 50m left"
    },
    {
      id: 3,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=iraq",
      description: "Will Iraq win the 2026 FIFA World Cup?",
      priceYes: "0.1¢",
      priceNo: "99.9¢",
      probability: "0%",
      volume: "$4,613,714.28",
      change: "-0.1¢",
      liquidity: "$5,563,867.42",
      age: "N/A",
      closingTime: "173d 9h 50m left"
    },
    {
      id: 4,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=haiti",
      description: "Will Haiti win the 2026 FIFA World Cup?",
      priceYes: "0.1¢",
      priceNo: "99.9¢",
      probability: "0%",
      volume: "$15,842,969.50",
      change: "-0.1¢",
      liquidity: "$5,512,062.22",
      age: "N/A",
      closingTime: "173d 9h 50m left"
    },
    {
      id: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=qatar",
      description: "Will Qatar win the 2026 FIFA World Cup?",
      priceYes: "0.1¢",
      priceNo: "99.9¢",
      probability: "0%",
      volume: "$17,518,945.94",
      change: "-0.1¢",
      liquidity: "$5,351,555.29",
      age: "N/A",
      closingTime: "173d 9h 50m left"
    },
    {
      id: 6,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan",
      description: "Will Jordan win the 2026 FIFA World Cup?",
      priceYes: "0.1¢",
      priceNo: "99.9¢",
      probability: "0%",
      volume: "$18,912,716.66",
      change: "-0.1¢",
      liquidity: "$5,311,467.23",
      age: "N/A",
      closingTime: "173d 9h 50m left"
    },
    {
      id: 7,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ivory",
      description: "Will Ivory Coast win the 2026 FIFA World Cup?",
      priceYes: "0.3¢",
      priceNo: "99.6¢",
      probability: "0%",
      volume: "$14,328,064.03",
      change: "-0.1¢",
      liquidity: "$5,303,585.12",
      age: "N/A",
      closingTime: "173d 9h 50m left"
    },
    {
      id: 8,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=tunisia",
      description: "Will Tunisia win the 2026 FIFA World Cup?",
      priceYes: "0.2¢",
      priceNo: "99.7¢",
      probability: "0%",
      volume: "$15,190,448.39",
      change: "-0.1¢",
      liquidity: "$5,244,445.18",
      age: "N/A",
      closingTime: "173d 9h 50m left"
    },
    {
      id: 9,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=bosnia",
      description: "Will Bosnia-Herzegovina win the 2026 FIFA World Cup?",
      priceYes: "0.2¢",
      priceNo: "99.7¢",
      probability: "0%",
      volume: "$5,132,747.88",
      change: "0.0¢",
      liquidity: "$5,230,527.30",
      age: "N/A",
      closingTime: "173d 8h 59m left"
    },
    {
      id: 10,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=cape",
      description: "Will Cape Verde win the 2026 FIFA World Cup?",
      priceYes: "0.1¢",
      priceNo: "99.9¢",
      probability: "0%",
      volume: "$16,703,153.18",
      change: "-0.1¢",
      liquidity: "$5,140,687.53",
      age: "N/A",
      closingTime: "173d 8h 58m left"
    },
    {
      id: 11,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ghana",
      description: "Will Ghana win the 2026 FIFA World Cup?",
      priceYes: "0.2¢",
      priceNo: "99.7¢",
      probability: "0%",
      volume: "$14,667,355.70",
      change: "-0.1¢",
      liquidity: "$5,120,384.29",
      age: "N/A",
      closingTime: "173d 8h 58m left"
    },
    {
      id: 12,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=japan",
      description: "Will Japan win the 2026 FIFA World Cup?",
      priceYes: "0.5¢",
      priceNo: "99.5¢",
      probability: "1%",
      volume: "$22,456,789.00",
      change: "+0.1¢",
      liquidity: "$6,123,456.78",
      age: "N/A",
      closingTime: "173d 9h 10m left"
    },
    {
      id: 13,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=brazil",
      description: "Will Brazil win the 2026 FIFA World Cup?",
      priceYes: "12.5¢",
      priceNo: "87.5¢",
      probability: "12%",
      volume: "$145,678,234.00",
      change: "+2.1¢",
      liquidity: "$12,456,789.00",
      age: "N/A",
      closingTime: "173d 10h 15m left"
    },
    {
      id: 14,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=france",
      description: "Will France win the 2026 FIFA World Cup?",
      priceYes: "10.2¢",
      priceNo: "89.8¢",
      probability: "10%",
      volume: "$132,456,789.00",
      change: "-1.5¢",
      liquidity: "$11,234,567.00",
      age: "N/A",
      closingTime: "173d 11h 20m left"
    },
    {
      id: 15,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=argentina",
      description: "Will Argentina win the 2026 FIFA World Cup?",
      priceYes: "15.8¢",
      priceNo: "84.2¢",
      probability: "15%",
      volume: "$189,234,567.00",
      change: "+3.2¢",
      liquidity: "$15,678,901.00",
      age: "N/A",
      closingTime: "173d 12h 30m left"
    },
    {
      id: 16,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=spain",
      description: "Will Spain win the 2026 FIFA World Cup?",
      priceYes: "8.4¢",
      priceNo: "91.6¢",
      probability: "8%",
      volume: "$98,765,432.00",
      change: "-0.5¢",
      liquidity: "$8,901,234.00",
      age: "N/A",
      closingTime: "173d 13h 40m left"
    },
    {
      id: 17,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=england",
      description: "Will England win the 2026 FIFA World Cup?",
      priceYes: "7.1¢",
      priceNo: "92.9¢",
      probability: "7%",
      volume: "$87,654,321.00",
      change: "+0.8¢",
      liquidity: "$7,890,123.00",
      age: "N/A",
      closingTime: "173d 14h 50m left"
    },
    {
      id: 18,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=germany",
      description: "Will Germany win the 2026 FIFA World Cup?",
      priceYes: "6.5¢",
      priceNo: "93.5¢",
      probability: "6%",
      volume: "$76,543,210.00",
      change: "-1.2¢",
      liquidity: "$6,789,012.00",
      age: "N/A",
      closingTime: "173d 15h 00m left"
    }
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#0a0c10]">
      {/* Sub-Tabs Navigation */}
      <div className="flex items-center gap-7 px-12 py-2 border-b border-white/[0.03] overflow-x-auto no-scrollbar">
        {subTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`text-[11px] font-bold tracking-tight whitespace-nowrap transition-all duration-200 relative py-2 ${
              activeSubTab === tab
                ? "text-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab}
            {activeSubTab === tab && (
              <div className="absolute bottom-[-9px] left-0 right-0 h-[1.5px] bg-[#5eead4] shadow-[0_0_8px_rgba(94,234,212,0.4)]" />
            )}
          </button>
        ))}
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
            {markets.map((market) => (
              <tr key={market.id} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors group">
                <td className="px-12 py-4">
                  <div className="flex items-center gap-3">
                    <img src={market.image} alt="" className="w-8 h-8 rounded-md bg-gray-800" />
                    <span className="text-[12px] font-medium text-white/80 leading-relaxed group-hover:text-white transition-colors">
                      {market.description}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[#5eead4] text-[12px] font-bold">{market.priceYes}</span>
                    <span className="text-gray-700">|</span>
                    <span className="text-[#f87171] text-[12px] font-bold">{market.priceNo}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-[12px] font-bold text-white/60">{market.probability}</td>
                <td className="px-4 py-4 text-[12px] font-bold text-white/60">{market.volume}</td>
                <td className="px-4 py-4 text-[#f87171] text-[12px] font-bold">{market.change}</td>
                <td className="px-4 py-4 text-[#5eead4] text-[12px] font-bold">{market.liquidity}</td>
                <td className="px-4 py-4 text-[12px] font-bold text-white/40">{market.age}</td>
                <td className="px-4 py-4 text-[11px] font-medium text-white/60">{market.closingTime}</td>
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
            ))}
          </tbody>
        </table>

        {/* Load More Button */}
        <div className="flex justify-center py-10">
          <button className="bg-[#11161d] hover:bg-[#1a1f26] border border-white/5 text-gray-400 hover:text-white px-8 py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg flex items-center gap-2 group">
            Load More Markets
            <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
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
