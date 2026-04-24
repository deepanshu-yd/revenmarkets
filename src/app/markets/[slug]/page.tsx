"use client";

import React, { useState, use } from "react";
import { useMarketDetail } from "@/hooks/useMarkets";
import { useLiveBook } from "@/lib/stream";
import { fmtUSD, fmtPct, relativeTime } from "@/lib/format";
import { Avatar } from "@/components/ui/Avatar";
import { OrderBook } from "@/components/market/OrderBook";
import { PriceChart } from "@/components/market/PriceChart";
import { TradePanel } from "@/components/market/TradePanel";
import { Loader2, ArrowLeft, Star, Share2, Info } from "lucide-react";
import Link from "next/link";

export default function MarketPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [activeTab, setActiveTab] = useState<'book' | 'history' | 'info'>('book');

  const { market, history, error, isLoading, yesToken } = useMarketDetail(slug);
  const { bids, asks, lastTrade, connected } = useLiveBook(yesToken);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0a0c10]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-[#5eead4] animate-spin" />
          <span className="text-gray-500 font-bold text-xs uppercase tracking-[0.2em]">Loading Market...</span>
        </div>
      </div>
    );
  }

  if (error || !market) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0a0c10]">
        <div className="flex flex-col items-center gap-4">
          <span className="text-red-400 font-bold">Market not found</span>
          <Link href="/" className="text-[#5eead4] text-xs font-bold underline">Go Back</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#0a0c10] overflow-hidden">
      {/* Header / Breadcrumb */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.03] bg-[#0a0f14]/50">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-gray-500 hover:text-white">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex items-center gap-2 text-[11px] font-bold">
            <span className="text-gray-500 uppercase tracking-wider">Markets</span>
            <span className="text-gray-700">/</span>
            <span className="text-white truncate max-w-[300px]">{market.question}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {connected && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#5eead4]/10 border border-[#5eead4]/20">
              <div className="w-1.5 h-1.5 rounded-full bg-[#5eead4] animate-pulse" />
              <span className="text-[#5eead4] text-[10px] font-bold uppercase tracking-wider">Live</span>
            </div>
          )}
          <button className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-[#5eead4] transition-colors">
            <Star size={18} />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar border-r border-white/[0.03]">
          {/* Market Hero */}
          <div className="p-8 border-b border-white/[0.03]">
            <div className="flex items-start gap-6">
              <Avatar src={market.image || market.icon} seed={market.ticker} size="lg" className="rounded-xl shadow-2xl" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-3">
                  {market.tags?.map(tag => (
                    <span key={tag.id} className="px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/5 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                      {tag.label}
                    </span>
                  ))}
                  {market.negRisk && (
                    <span className="px-2.5 py-0.5 rounded-md bg-[#f87171]/10 border border-[#f87171]/20 text-[9px] font-bold text-[#f87171] uppercase tracking-wider">
                      Neg Risk
                    </span>
                  )}
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight mb-4">
                  {market.question}
                </h1>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Ends In</span>
                    <span className="text-sm font-bold text-white">{relativeTime(market.endDate)}</span>
                  </div>
                  <div className="h-8 w-px bg-white/[0.03]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Volume</span>
                    <span className="text-sm font-bold text-white">{fmtUSD(market.volumeNum)}</span>
                  </div>
                  <div className="h-8 w-px bg-white/[0.03]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Liquidity</span>
                    <span className="text-sm font-bold text-white">{fmtUSD(market.liquidityNum)}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Current Probability</div>
                <div className="text-5xl font-black text-[#5eead4] tracking-tighter">
                  {market.outcomePrices?.[0] != null ? `${(market.outcomePrices[0] * 100).toFixed(0)}%` : "—"}
                </div>
                <div className={`mt-2 text-xs font-bold ${((market.oneDayPriceChange ?? 0) >= 0) ? "text-[#5eead4]" : "text-[#f87171]"}`}>
                  {market.oneDayPriceChange != null ? (market.oneDayPriceChange >= 0 ? "+" : "") : ""}
                  {fmtPct(market.oneDayPriceChange)} (24h)
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="flex-1 min-h-[400px] p-6 relative">
            <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-[#0a0f14] border border-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Info size={12} className="text-[#5eead4]" />
                Price History (7D)
              </div>
            </div>
            {history ? (
              <PriceChart data={history.history} liveTick={lastTrade ? { t: Math.floor(lastTrade.ts / 1000), p: lastTrade.price } : null} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600 font-bold text-xs uppercase tracking-widest">
                Loading Chart Data...
              </div>
            )}
          </div>

          {/* Description / Info Section */}
          {market.description && (
            <div className="p-8 border-t border-white/[0.03] bg-white/[0.01]">
              <div className="flex items-center gap-2 mb-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <Info size={14} />
                Resolution Criteria
              </div>
              <div className="text-sm text-gray-400 leading-relaxed max-w-4xl whitespace-pre-wrap">
                {market.description}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: OrderBook & Trade Panel */}
        <div className="w-full lg:w-[400px] flex flex-col bg-[#0a0f14]/50">
          <div className="flex border-b border-white/[0.03]">
            <button
              onClick={() => setActiveTab('book')}
              className={`flex-1 py-4 text-[11px] font-black uppercase tracking-widest transition-all relative ${activeTab === 'book' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
            >
              Order Book
              {activeTab === 'book' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#5eead4]" />}
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-4 text-[11px] font-black uppercase tracking-widest transition-all relative ${activeTab === 'history' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
            >
              Trades
              {activeTab === 'history' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#5eead4]" />}
            </button>
          </div>

          <div className="flex-1 min-h-[300px] overflow-hidden">
            {activeTab === 'book' ? (
              <OrderBook bids={bids} asks={asks} levels={15} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-600 text-[10px] font-bold uppercase tracking-widest">
                Trade History coming soon
              </div>
            )}
          </div>

          <div className="border-t border-white/[0.03] p-4 bg-[#0a0f14]">
            <TradePanel market={market} />
          </div>
        </div>
      </div>

      <style jsx>{`
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
}
