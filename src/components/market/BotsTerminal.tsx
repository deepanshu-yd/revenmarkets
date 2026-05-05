"use client";

import React, { useState } from "react";
import { 
  Bot, 
  Zap, 
  TrendingUp, 
  Users, 
  Play, 
  Square, 
  Plus, 
  ArrowUpRight, 
  ShieldCheck, 
  Cpu,
  BarChart3,
  Activity
} from "lucide-react";

const ACTIVE_BOTS = [
  {
    id: 1,
    name: "Arb-Runner V3",
    type: "Arbitrage",
    status: "Running",
    roi: "+12.4%",
    profit: "$420.69",
    uptime: "4d 12h",
    color: "#00ff41"
  },
  {
    id: 2,
    name: "MM-Alpha",
    type: "Market Maker",
    status: "Paused",
    roi: "+5.2%",
    profit: "$128.50",
    uptime: "12d 5h",
    color: "#a855f7"
  }
];

const BOT_TEMPLATES = [
  {
    id: "arb",
    name: "Cross-Market Arbitrage",
    description: "Automatically scans Poly & Kalshi for price gaps and executes risk-free trades.",
    risk: "Low",
    avgRoi: "8-12%",
    icon: <Zap size={20} />
  },
  {
    id: "mm",
    name: "Liquidity Provider",
    description: "Provides liquidity to thin markets and profits from the spread.",
    risk: "Medium",
    avgRoi: "15-25%",
    icon: <Activity size={20} />
  },
  {
    id: "trend",
    name: "Sentiment Follower",
    description: "Uses AI to analyze Twitter & News sentiment to predict market moves.",
    risk: "High",
    avgRoi: "30%+",
    icon: <TrendingUp size={20} />
  }
];

const TOP_TRADERS = [
  { id: 1, name: "CryptoWhale_0x", winRate: "89%", followers: 1240, roi30d: "+450%" },
  { id: 2, name: "PollyPredictor", winRate: "76%", followers: 850, roi30d: "+210%" },
  { id: 3, name: "ArbKing", winRate: "99%", followers: 3200, roi30d: "+85%" }
];

const BotsTerminal = () => {
  const [activeTab, setActiveTab] = useState("Manage");

  return (
    <div className="h-full overflow-y-auto bg-black px-12 py-8 custom-scrollbar">
      <div className="max-w-[1400px] mx-auto space-y-10 pb-20">
        
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-3 mb-1">
              <Bot className="text-[#00ff41]" size={18} />
              Automated Bots
            </h2>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Deploy algorithmic strategies and copy the world's best predictors.</p>
          </div>
          <button disabled className="bg-[#00ff41]/20 text-[#00ff41]/40 px-5 py-2.5 rounded-none font-black text-[10px] uppercase tracking-widest flex items-center gap-2 cursor-not-allowed group relative overflow-hidden transition-all">
            <span className="group-hover:opacity-0 transition-opacity flex items-center gap-2">
              <Plus size={14} />
              Create Custom Bot
            </span>
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-[#00ff41] font-black">CREATION PAUSED</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Active Bots", val: "14", icon: <Bot size={16} />, color: "text-[#00ff41]" },
            { label: "Total Profit", val: "$12,450", icon: <TrendingUp size={16} />, color: "text-white" },
            { label: "Avg. Win Rate", val: "84%", icon: <ShieldCheck size={16} />, color: "text-white" },
            { label: "Gas Saved", val: "1.2 ETH", icon: <Zap size={16} />, color: "text-white" }
          ].map((stat, i) => (
            <div key={i} className="bg-[#111111] border border-[#333333] rounded-none p-6 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.2em] block mb-2">{stat.label}</span>
                <span className={`text-[20px] font-black ${stat.color}`}>{stat.val}</span>
              </div>
              <div className="w-10 h-10 rounded-none bg-[#111111] flex items-center justify-center text-gray-500">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content: Bot Management & Deployment */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Active Bots */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <Activity size={14} />
                  Live Performance
                </h3>
                <div className="flex gap-2">
                  {["Manage", "Analytics"].map(t => (
                    <button 
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-none transition-all ${activeTab === t ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-400'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {ACTIVE_BOTS.map(bot => (
                  <div key={bot.id} className="bg-[#111111] border border-[#333333] rounded-none p-6 group hover:border-[#333333] transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-none flex items-center justify-center" style={{ backgroundColor: `${bot.color}10`, color: bot.color }}>
                          <Cpu size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h4 className="font-bold text-white text-[12px]">{bot.name}</h4>
                            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${bot.status === 'Running' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                              {bot.status}
                            </span>
                          </div>
                          <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mt-1">{bot.type} • Uptime: {bot.uptime}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-12">
                        <div className="text-right">
                          <span className="text-[9px] font-bold text-gray-600 uppercase block mb-1">ROI</span>
                          <span className="text-lg font-black text-[#00ff41]">{bot.roi}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-3 bg-[#111111] rounded-none text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                            {bot.status === 'Running' ? <Square size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                          </button>
                          <button className="p-3 bg-[#111111] rounded-none text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                            <BarChart3 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deployment Templates */}
            <div>
              <h3 className="text-sm font-black text-white/40 uppercase tracking-widest flex items-center gap-2 mb-6">
                <Plus size={14} />
                Deploy New Strategy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BOT_TEMPLATES.map(template => (
                  <div key={template.id} className="bg-[#111111] border border-[#333333] rounded-none p-6 flex flex-col hover:border-[#00ff41]/30 transition-all cursor-pointer group">
                    <div className="w-10 h-10 rounded-none bg-[#111111] flex items-center justify-center text-[#00ff41] mb-5 group-hover:scale-110 transition-transform">
                      {template.icon}
                    </div>
                    <h4 className="font-black text-white mb-2">{template.name}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mb-6 flex-1">{template.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#333333]">
                      <div>
                        <span className="text-[9px] font-bold text-gray-600 uppercase block mb-0.5">Est. ROI</span>
                        <span className="text-xs font-black text-[#00ff41]">{template.avgRoi}</span>
                      </div>
                      <button className="p-2 bg-white/5 rounded-none text-white opacity-0 group-hover:opacity-100 transition-all">
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Copy Trading */}
          <div className="space-y-8">
            <div className="bg-[#111111] border border-[#333333] rounded-none overflow-hidden">
              <div className="p-6 border-b border-[#333333]">
                <h3 className="text-sm font-black text-white flex items-center gap-3">
                  <Users size={16} className="text-[#00ff41]" />
                  Copy Trading
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {TOP_TRADERS.map((trader, i) => (
                  <div key={trader.id} className="p-4 rounded-none hover:bg-white/[0.02] transition-all flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-none bg-[#111111] flex items-center justify-center border border-[#333333]">
                        <span className="text-[10px] font-black text-white/40">{i+1}</span>
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-white/90">{trader.name}</h5>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{trader.winRate} Win Rate</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-[#00ff41] block">{trader.roi30d}</span>
                      <button disabled className="text-[9px] font-black text-gray-700 uppercase tracking-widest mt-1 cursor-not-allowed group relative overflow-hidden px-2 py-0.5">
                        <span className="group-hover:opacity-0 transition-opacity">Copy</span>
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[7px] text-[#00ff41] font-black">PAUSED</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-white/[0.01]">
                <button className="w-full py-3 bg-white/5 rounded-none text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all">
                  View Full Leaderboard
                </button>
              </div>
            </div>

            {/* AI Assistant Promo */}
            <div className="bg-[#111111] border border-[#00ff41]/10 rounded-none p-6 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
                <Bot size={120} />
              </div>
              <h3 className="text-sm font-black text-[#00ff41] uppercase tracking-widest mb-3">AI Strategy Optimizer</h3>
              <p className="text-xs text-white/60 leading-relaxed mb-6">Let Reven AI analyze your portfolio and suggest the best active bots for current market conditions.</p>
              <button disabled className="px-5 py-2.5 bg-[#00ff41]/10 border border-[#00ff41]/20 rounded-none text-[10px] font-black text-[#00ff41]/40 uppercase tracking-widest cursor-not-allowed group relative overflow-hidden">
                <span className="group-hover:opacity-0 transition-opacity">Run AI Audit</span>
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-[#00ff41] font-black">AUDIT PAUSED</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BotsTerminal;
