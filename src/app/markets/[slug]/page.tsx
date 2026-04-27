"use client";

import React, { useState, use } from "react";
import { useMarketDetail } from "@/hooks/useMarkets";
import { useLiveBook } from "@/lib/stream";
import { fmtUSD, fmtPct, relativeTime } from "@/lib/format";
import { Avatar } from "@/components/ui/Avatar";
import { OrderBook } from "@/components/market/OrderBook";
import { PriceChart } from "@/components/market/PriceChart";
import { TradePanel } from "@/components/market/TradePanel";
import { Loader2, ArrowLeft, Star, Share2, Info, ShieldCheck } from "lucide-react";
import { useSettings } from "@/providers/SettingsContext";
import Link from "next/link";

import { TradeTerminal } from "@/components/market/TradeTerminal";

export default function MarketPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { market, history, error, isLoading } = useMarketDetail(slug);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0a0c10]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-[#5eead4] animate-spin" />
          <span className="text-gray-500 font-bold text-xs uppercase tracking-[0.2em]">Loading Terminal...</span>
        </div>
      </div>
    );
  }

  if (error || !market) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0a0c10]">
        <div className="flex flex-col items-center gap-4">
          <span className="text-red-400 font-bold uppercase tracking-widest text-[10px]">Market data not found</span>
          <Link href="/" className="px-6 py-2 bg-white/5 border border-white/5 rounded-lg text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Go Back</Link>
        </div>
      </div>
    );
  }

  return <TradeTerminal market={market} history={history} />;
}
