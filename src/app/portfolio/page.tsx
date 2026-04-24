"use client";

import React, { useState } from "react";
import { 
  Wallet, 
  ChevronDown, 
  LogOut, 
  Download, 
  PlusCircle, 
  CheckCircle2, 
  Copy, 
  Diamond
} from "lucide-react";

const PortfolioPage = () => {
  const [activeTab, setActiveTab] = useState("Active Positions");

  const tabs = [
    "Active Positions", 
    "Closed Positions", 
    "Open Orders", 
    "Trade History", 
    "Copied Trades", 
    "Bot Activity"
  ];

  const mainStats = [
    { label: "Total Portfolio Value", value: "$0.00", icon: <Wallet className="text-[#5eead4]" size={16} />, isMain: true },
    { label: "Active Positions Value", value: "$0.00" },
    { label: "Cash Balance", value: "$0.00" },
    { label: "Open Limit Orders", value: "$0.00" },
    { label: "Copy Trading", value: "$0.00" },
    { label: "Trading Bot", value: "$0.00" },
  ];

  return (
    <div className="h-full bg-[#080a0c] overflow-y-auto custom-scrollbar">
      <main className="px-12 py-10">
        <div className="max-w-[1600px] mx-auto space-y-8">
          
          {/* Page Title */}
          <h1 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Portfolio Overview</h1>

          {/* User Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#11161d] border border-white/5 rounded-lg px-3 py-2">
                <CheckCircle2 size={12} className="text-[#5eead4]" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">yadavdeepanshu000@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 bg-[#11161d] border border-white/5 rounded-lg px-3 py-2">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">0xab63d3Aa6...</span>
                <Copy size={12} className="text-gray-500 hover:text-white cursor-pointer" />
                <ChevronDown size={12} className="text-gray-500" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#11161d] border border-white/5 rounded-lg px-4 py-2 cursor-pointer hover:bg-white/[0.03] transition-colors">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Showing 2 venues</span>
                <ChevronDown size={12} className="text-gray-500" />
              </div>
              
              <button className="flex items-center gap-2 bg-[#11161d] border border-white/5 rounded-lg px-4 py-2 text-[10px] font-black text-white/60 hover:bg-white/[0.03] transition-all uppercase tracking-widest">
                <Download size={14} />
                Export
              </button>
              
              <button className="flex items-center gap-2 bg-[#11161d] border border-white/5 rounded-lg px-4 py-2 text-[10px] font-black text-white/60 hover:bg-white/[0.03] transition-all uppercase tracking-widest">
                <LogOut size={14} />
                Logout
              </button>

              <button className="flex items-center gap-2 bg-[#11161d] border border-white/5 rounded-lg px-4 py-2 text-[10px] font-black text-white/60 hover:bg-white/[0.03] transition-all uppercase tracking-widest">
                <PlusCircle size={14} className="text-gray-500" />
                Withdraw
              </button>

              <div className="text-[10px] font-bold text-gray-600 ml-4 uppercase tracking-widest">
                Redeem Cashback <span className="text-white/60 ml-1">$0.00</span>
              </div>
            </div>
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {mainStats.map((stat, i) => (
                <div key={i} className="bg-[#11161d]/60 border border-white/5 rounded-xl p-5">
                  <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-3">{stat.label}</span>
                  <div className="flex items-center gap-2">
                    {stat.icon && stat.icon}
                    <span className="text-[14px] font-black text-white">{stat.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Loyalty/Rewards Card */}
            <div className="lg:col-span-3 bg-[#11161d]/60 border border-white/5 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/10">
                    <span className="text-[10px]">🐾</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-gray-600 uppercase block tracking-widest">1X Rewards</span>
                    <span className="text-[11px] font-black text-white">Cub</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-bold text-gray-600 uppercase block tracking-widest">Cashback</span>
                  <span className="text-[11px] font-black text-white">5%</span>
                </div>
              </div>
              
              <div className="space-y-2 mt-6">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Next: <span className="text-white/40">Pack</span></span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden relative">
                   <div className="absolute inset-y-0 left-0 w-[5%] bg-[#5eead4] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Stats Row */}
          <div className="bg-[#11161d]/30 border border-white/[0.03] rounded-xl px-10 py-5 flex flex-wrap items-center gap-x-12 gap-y-4">
             <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Unrealized PnL</span>
                <span className="text-[12px] font-bold text-[#5eead4]">+$0.00</span>
             </div>
             <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Realized PnL</span>
                <span className="text-[12px] font-bold text-[#5eead4]">+$0.00</span>
             </div>
             <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Total Volume</span>
                <span className="text-[12px] font-bold text-white/90">$0.00</span>
             </div>
             <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">LP Rewards</span>
                <span className="text-[12px] font-bold text-white/90">$0.00</span>
             </div>
             <div className="flex items-center gap-4 ml-auto">
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Points</span>
                <div className="flex items-center gap-1.5">
                   <Diamond size={12} className="text-[#5eead4]" fill="currentColor" />
                   <span className="text-[14px] font-black text-white">0</span>
                </div>
             </div>
          </div>

          {/* Tabs Section */}
          <div className="bg-[#11161d]/40 border border-white/[0.05] rounded-xl overflow-hidden min-h-[400px] flex flex-col">
            <div className="px-8 border-b border-white/[0.03] flex items-center justify-between">
              <div className="flex items-center gap-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[10px] font-bold tracking-widest uppercase py-5 relative transition-colors ${
                      activeTab === tab ? "text-white" : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-[-1px] left-0 right-0 h-[1.5px] bg-[#5eead4]" />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-3 h-3 rounded-sm border border-white/10 group-hover:border-[#5eead4]/50 transition-colors" />
                  <span className="text-[9px] font-bold text-gray-600 group-hover:text-gray-400 uppercase tracking-widest">Include Copy Trades</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-3 h-3 rounded-sm border border-white/10 group-hover:border-[#5eead4]/50 transition-colors" />
                  <span className="text-[9px] font-bold text-gray-600 group-hover:text-gray-400 uppercase tracking-widest">Include Bot Trades</span>
                </div>
              </div>
            </div>

            {/* Empty State */}
            <div className="flex-1 flex items-center justify-center">
              <span className="text-[11px] font-bold text-gray-800 uppercase tracking-widest">No positions found</span>
            </div>
          </div>

        </div>
      </main>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
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

export default PortfolioPage;
