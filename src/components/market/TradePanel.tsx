"use client";

import React, { useState } from 'react';
import { Market } from '@/types/market';
import { placeOrder } from '@/lib/polymarket';
import { useWallet, connect } from '@/lib/wallet';
import { Loader2, Info } from 'lucide-react';

interface TradePanelProps {
  market: Market;
}

export const TradePanel = ({ market }: TradePanelProps) => {
  const { eoa, connecting } = useWallet();
  const isConnected = !!eoa;
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [mode, setMode] = useState<'Market' | 'Limit' | 'Pro'>('Market');
  const [outcome, setOutcome] = useState<0 | 1>(0); // 0: YES, 1: NO
  const [size, setSize] = useState('');
  const [isPlacing, setIsPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const price = market.outcomePrices?.[outcome] ?? 0;
  const totalCost = (Number(size) || 0) * price;

  const handleTrade = async () => {
    if (!isConnected) {
      connect();
      return;
    }

    setIsPlacing(true);
    setError(null);
    try {
      await placeOrder({
        tokenId: market.clobTokenIds[outcome],
        side,
        price,
        size: Number(size),
        tickSize: market.orderPriceMinTickSize,
        negRisk: market.negRisk,
      });
      setSize('');
      alert('Order placed successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to place order');
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Side Switcher (Buy/Sell) */}
      <div className="flex bg-[#0a0f14] p-0.5 rounded-md border border-white/5">
        <button
          onClick={() => setSide('BUY')}
          className={`flex-1 py-2 text-[10px] font-black tracking-[0.1em] rounded transition-all uppercase ${
            side === 'BUY' ? 'bg-[#1a232b] text-white' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setSide('SELL')}
          className={`flex-1 py-2 text-[10px] font-black tracking-[0.1em] rounded transition-all uppercase ${
            side === 'SELL' ? 'bg-[#1a232b] text-white' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          Sell
        </button>
      </div>

      {/* Mode Switcher (Market/Limit/Pro) */}
      <div className="flex border-b border-white/[0.05]">
        {['Market', 'Limit', 'Pro'].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m as any)}
            className={`flex-1 py-2 text-[10px] font-bold transition-all relative ${
              mode === m ? 'text-[#5eead4]' : 'text-gray-600 hover:text-gray-400'
            }`}
          >
            {m}
            {mode === m && <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#5eead4]" />}
          </button>
        ))}
      </div>

      {/* Outcome Selection */}
      <div className="grid grid-cols-2 gap-2 mt-1">
        <button
          onClick={() => setOutcome(0)}
          className={`py-3 px-4 rounded-md border flex flex-col items-center gap-1 transition-all ${
            outcome === 0
              ? 'border-[#5eead4] bg-[#5eead4]/5'
              : 'border-white/5 bg-white/[0.02] hover:border-white/10'
          }`}
        >
          <span className={`text-[10px] font-black tracking-widest ${outcome === 0 ? 'text-[#5eead4]' : 'text-gray-500'}`}>YES</span>
          <span className="text-sm font-black text-white">{(market.outcomePrices?.[0] * 100).toFixed(1)}¢</span>
        </button>
        <button
          onClick={() => setOutcome(1)}
          className={`py-3 px-4 rounded-md border flex flex-col items-center gap-1 transition-all ${
            outcome === 1
              ? 'border-[#f87171] bg-[#f87171]/5'
              : 'border-white/5 bg-white/[0.02] hover:border-white/10'
          }`}
        >
          <span className={`text-[10px] font-black tracking-widest ${outcome === 1 ? 'text-[#f87171]' : 'text-gray-500'}`}>NO</span>
          <span className="text-sm font-black text-white">{(market.outcomePrices?.[1] * 100).toFixed(1)}¢</span>
        </button>
      </div>

      {/* Size Input */}
      <div className="flex flex-col gap-1.5 mt-2">
        <div className="flex items-center justify-between px-1">
          <label className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Order Size</label>
          <span className="text-[9px] font-bold text-gray-500">$0.00</span>
        </div>
        <div className="relative group">
          <input
            type="number"
            placeholder="0"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#5eead4]/40 transition-all font-mono"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-white/5 hover:bg-white/10 rounded text-[9px] font-black text-gray-500 hover:text-white transition-all">
            MAX
          </button>
        </div>
      </div>

      {/* Percentage Slider */}
      <div className="flex flex-col gap-2 mt-1 px-1">
        <div className="relative w-full h-1 bg-white/5 rounded-full">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#5eead4] rounded-full shadow-[0_0_8px_rgba(94,234,212,0.5)] cursor-pointer" />
        </div>
        <div className="flex justify-between text-[9px] font-bold text-gray-600 uppercase tracking-tighter">
          <span>0%</span>
        </div>
      </div>

      {/* Info Rows */}
      <div className="flex flex-col gap-2 mt-2 px-1">
        <div className="flex justify-between items-center text-[9px] font-bold">
          <span className="text-gray-600 uppercase tracking-wider">Available to Trade</span>
          <span className="text-white">$0.00</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <input type="checkbox" className="w-3 h-3 rounded border-white/10 bg-transparent" />
          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
            Take Profit / Stop Loss <Info size={10} />
          </span>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handleTrade}
        disabled={isPlacing || !size}
        className="w-full bg-[#1e2329] hover:bg-[#2b3139] text-white py-3 rounded font-black text-[11px] transition-all uppercase tracking-widest mt-2 border border-white/5 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        {isPlacing ? (
          <Loader2 size={16} className="animate-spin mx-auto" />
        ) : (
          `Place ${side} Order`
        )}
      </button>

      {error && <div className="text-[9px] text-red-500 font-bold text-center">{error}</div>}
    </div>
  );
};
