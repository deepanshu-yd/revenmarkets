import React, { useState } from 'react'
import { Market } from '@/types/market'
import { placeOrder } from '@/lib/polymarket'
import { useWallet, connect } from '@/lib/wallet'
import { Loader2, Wallet } from 'lucide-react'

type Props = {
  market: Market
}

export const TradePanel = ({ market }: Props) => {
  const { eoa, isConnected, connecting } = useWallet()
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY')
  const [outcome, setOutcome] = useState<0 | 1>(0) // 0: YES, 1: NO
  const [size, setSize] = useState('')
  const [isPlacing, setIsPlacing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const price = market.outcomePrices?.[outcome] ?? 0
  const totalCost = (Number(size) || 0) * price

  const handleTrade = async () => {
    if (!isConnected) {
      connect()
      return
    }

    setIsPlacing(true)
    setError(null)
    try {
      await placeOrder({
        tokenId: market.clobTokenIds[outcome],
        side,
        price,
        size: Number(size),
        tickSize: market.orderPriceMinTickSize,
        negRisk: market.negRisk,
      })
      setSize('')
      alert('Order placed successfully!')
    } catch (err: any) {
      setError(err.message || 'Failed to place order')
    } finally {
      setIsPlacing(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-white/[0.02] h-full">
      <div className="flex bg-[#0a0f14] p-1 rounded-xl border border-white/5">
        <button
          onClick={() => setSide('BUY')}
          className={`flex-1 py-2 text-[11px] font-black rounded-lg transition-all ${
            side === 'BUY' ? 'bg-[#5eead4] text-[#0a0f14]' : 'text-gray-500 hover:text-white'
          }`}
        >
          BUY
        </button>
        <button
          onClick={() => setSide('SELL')}
          className={`flex-1 py-2 text-[11px] font-black rounded-lg transition-all ${
            side === 'SELL' ? 'bg-[#f87171] text-[#0a0f14]' : 'text-gray-500 hover:text-white'
          }`}
        >
          SELL
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setOutcome(0)}
          className={`py-2 text-[11px] font-bold rounded-lg border transition-all ${
            outcome === 0
              ? 'border-[#5eead4] text-[#5eead4] bg-[#5eead4]/5'
              : 'border-white/5 text-gray-500 hover:border-white/10'
          }`}
        >
          YES {(market.outcomePrices?.[0] * 100).toFixed(1)}¢
        </button>
        <button
          onClick={() => setOutcome(1)}
          className={`py-2 text-[11px] font-bold rounded-lg border transition-all ${
            outcome === 1
              ? 'border-[#f87171] text-[#f87171] bg-[#f87171]/5'
              : 'border-white/5 text-gray-500 hover:border-white/10'
          }`}
        >
          NO {(market.outcomePrices?.[1] * 100).toFixed(1)}¢
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Order Size (Shares)</label>
        <div className="relative">
          <input
            type="number"
            placeholder="0.00"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full bg-[#0a0f14] border border-white/5 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#5eead4]/30 transition-all font-mono"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-600">SHARES</div>
        </div>
      </div>

      <div className="flex flex-col gap-3 py-4 border-y border-white/[0.03]">
        <div className="flex justify-between text-[11px]">
          <span className="text-gray-500 font-medium">Avg. Price</span>
          <span className="text-white font-bold">{(price * 100).toFixed(2)}¢</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-gray-500 font-medium">Total Cost</span>
          <span className="text-white font-bold">${totalCost.toFixed(2)}</span>
        </div>
      </div>

      {!isConnected ? (
        <button
          onClick={connect}
          disabled={connecting}
          className="w-full bg-white/[0.05] hover:bg-white/10 text-white py-3.5 rounded-xl font-black text-[11px] transition-all flex items-center justify-center gap-2 uppercase tracking-widest border border-white/5"
        >
          {connecting ? <Loader2 size={16} className="animate-spin" /> : <Wallet size={14} />}
          Connect Wallet to Trade
        </button>
      ) : (
        <button
          onClick={handleTrade}
          disabled={isPlacing || !size}
          className={`w-full py-3.5 rounded-xl font-black text-[11px] transition-all uppercase tracking-widest flex items-center justify-center gap-2 ${
            side === 'BUY' 
              ? 'bg-[#5eead4] text-[#0a0f14] hover:brightness-110' 
              : 'bg-[#f87171] text-[#0a0f14] hover:brightness-110'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isPlacing ? <Loader2 size={16} className="animate-spin" /> : `${side} ${outcome === 0 ? 'YES' : 'NO'}`}
        </button>
      )}

      {error && <div className="text-[10px] text-red-400 font-bold text-center mt-2">{error}</div>}
    </div>
  )
}
