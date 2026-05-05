import React, { useMemo } from 'react'
import { SortedLevel } from '@/lib/stream'

type Props = {
  bids: SortedLevel[]
  asks: SortedLevel[]
  levels?: number
}

export const OrderBook = ({ bids, asks, levels = 10 }: Props) => {
  const displayBids = useMemo(() => bids.slice(0, levels), [bids, levels])
  const displayAsks = useMemo(() => asks.slice(0, levels).reverse(), [asks, levels])

  const maxTotal = useMemo(() => {
    const bTotal = displayBids.reduce((acc, l) => acc + l.size, 0)
    const aTotal = displayAsks.reduce((acc, l) => acc + l.size, 0)
    return Math.max(bTotal, aTotal, 1)
  }, [displayBids, displayAsks])

  return (
    <div className="flex flex-col h-full text-[11px] font-medium font-mono">
      {/* Asks (Sell orders) - Best ask at the bottom of this list */}
      <div className="flex-1 flex flex-col justify-end">
        {displayAsks.map((l, i) => (
          <BookRow key={`ask-${i}`} level={l} type="ask" maxTotal={maxTotal} />
        ))}
      </div>

      {/* Spread */}
      <div className="flex items-center justify-between px-3 py-1 bg-white/[0.02] border-y border-[#333333] text-[10px] text-gray-500 uppercase font-bold tracking-wider">
        <span>Spread</span>
        <span>
          {bids[0] && asks[0] ? `${((asks[0].price - bids[0].price) * 100).toFixed(2)}¢` : "—"}
        </span>
      </div>

      {/* Bids (Buy orders) - Best bid at the top of this list */}
      <div className="flex-1">
        {displayBids.map((l, i) => (
          <BookRow key={`bid-${i}`} level={l} type="bid" maxTotal={maxTotal} />
        ))}
      </div>
    </div>
  )
}

const BookRow = ({ level, type, maxTotal }: { level: SortedLevel; type: 'bid' | 'ask'; maxTotal: number }) => {
  const depth = (level.size / maxTotal) * 100

  return (
    <div className="relative flex items-center justify-between px-3 h-6 group hover:bg-[#111111] transition-colors">
      <div 
        className={`absolute right-0 top-0 bottom-0 transition-all duration-300 ${type === 'bid' ? 'bg-[#00ff41]/10' : 'bg-[#ff3333]/10'}`} 
        style={{ width: `${depth}%` }} 
      />
      <span className={`relative z-10 font-bold ${type === 'bid' ? 'text-[#00ff41]' : 'text-[#ff3333]'}`}>
        {(level.price * 100).toFixed(1)}¢
      </span>
      <span className="relative z-10 text-gray-400 tabular-nums">
        {level.size.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </span>
    </div>
  )
}
