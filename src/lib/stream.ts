import { useState, useEffect, useCallback, useRef } from 'react'
import type { OrderBook } from './api'

const base = (process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, '') ?? 'http://localhost:8080') + '/api'

export type SortedLevel = { price: number; size: number }
export type LastTrade = {
  price: number
  size: number
  side: 'BUY' | 'SELL'
  ts: number
}

type StreamMsg =
  | { type: 'book'; data: OrderBook & { asset_id: string } }
  | {
      type: 'price_change'
      data: {
        price_changes: {
          asset_id: string
          price: string
          size: string
          side: 'BUY' | 'SELL'
        }[]
      }
    }
  | {
      type: 'last_trade'
      data: {
        asset_id?: string
        price: string
        size: string
        side: 'BUY' | 'SELL'
        timestamp?: string
      }
    }
  | { type: 'tick_size'; data: { asset_id?: string; new_tick_size: string } }

export function useLiveBook(tokenId: string | undefined) {
  const [bids, setBids] = useState<SortedLevel[]>([])
  const [asks, setAsks] = useState<SortedLevel[]>([])
  const [lastTrade, setLastTrade] = useState<LastTrade | null>(null)
  const [connected, setConnected] = useState(false)
  const [version, setVersion] = useState(0)

  // Working copies to avoid per-event React state updates
  const workingBids = useRef<SortedLevel[]>([])
  const workingAsks = useRef<SortedLevel[]>([])
  const workingVersion = useRef(0)
  const lastTradeBuf = useRef<LastTrade | null>(null)
  const rafId = useRef<number | null>(null)

  const publish = useCallback(() => {
    rafId.current = null
    setBids([...workingBids.current])
    setAsks([...workingAsks.current])
    setVersion(workingVersion.current)
    if (lastTradeBuf.current) {
      setLastTrade(lastTradeBuf.current)
      lastTradeBuf.current = null
    }
  }, [])

  const schedule = useCallback(() => {
    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(publish)
    }
  }, [publish])

  useEffect(() => {
    if (!tokenId) {
      setBids([])
      setAsks([])
      setVersion(0)
      setLastTrade(null)
      setConnected(false)
      workingBids.current = []
      workingAsks.current = []
      workingVersion.current = 0
      return
    }

    const bsearch = (arr: SortedLevel[], price: number, desc: boolean) => {
      let lo = 0
      let hi = arr.length
      while (lo < hi) {
        const mid = (lo + hi) >>> 1
        const cmp = desc ? arr[mid].price > price : arr[mid].price < price
        if (cmp) lo = mid + 1
        else hi = mid
      }
      return lo
    }

    const applyChange = (
      arr: SortedLevel[],
      price: number,
      size: number,
      desc: boolean
    ) => {
      const idx = bsearch(arr, price, desc)
      const hit = idx < arr.length && arr[idx].price === price
      if (size === 0) {
        if (hit) arr.splice(idx, 1)
      } else if (hit) {
        arr[idx] = { price, size }
      } else {
        arr.splice(idx, 0, { price, size })
      }
    }

    const url = `${base}/stream/${tokenId}`
    const es = new EventSource(url)

    es.onopen = () => setConnected(true)
    es.onerror = () => setConnected(false)

    es.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data) as StreamMsg
        if (msg.type === 'book') {
          if (msg.data.asset_id && msg.data.asset_id !== tokenId) return
          workingBids.current = msg.data.bids
            .map((l) => ({ price: Number(l.price), size: Number(l.size) }))
            .sort((a, b) => b.price - a.price)
          workingAsks.current = msg.data.asks
            .map((l) => ({ price: Number(l.price), size: Number(l.size) }))
            .sort((a, b) => a.price - b.price)
          workingVersion.current++
          schedule()
        } else if (msg.type === 'price_change') {
          let mutated = false
          for (const ch of msg.data.price_changes) {
            if (ch.asset_id && ch.asset_id !== tokenId) continue
            const price = Number(ch.price)
            const size = Number(ch.size)
            if (ch.side === 'BUY') {
              applyChange(workingBids.current, price, size, true)
            } else {
              applyChange(workingAsks.current, price, size, false)
            }
            mutated = true
          }
          if (mutated) {
            workingVersion.current++
            schedule()
          }
        } else if (msg.type === 'last_trade') {
          if (msg.data.asset_id && msg.data.asset_id !== tokenId) return
          lastTradeBuf.current = {
            price: Number(msg.data.price),
            size: Number(msg.data.size),
            side: msg.data.side,
            ts: Date.now(),
          }
          schedule()
        }
      } catch (err) {
        console.warn('sse parse error', err)
      }
    }

    return () => {
      es.close()
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [tokenId, schedule])

  return { bids, asks, lastTrade, connected, version }
}
