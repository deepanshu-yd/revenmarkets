import { Market, Event, HistoryPoint } from '@/types/market';

export interface OrderBook {
  market: string;
  asset_id: string;
  timestamp: string;
  hash: string;
  bids: { price: string; size: string }[];
  asks: { price: string; size: string }[];
}

export type History = { history: HistoryPoint[] };

const base = (process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, '') ?? 'http://localhost:8080') + '/api';

async function json<T>(path: string, signal?: AbortSignal): Promise<T> {
  const r = await fetch(`${base}${path}`, { signal });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}: ${await r.text()}`);
  return r.json() as Promise<T>;
}

function parseArr<T>(v: unknown, fb: T): T {
  if (Array.isArray(v)) return v as unknown as T;
  if (typeof v === 'string') {
    try {
      const p = JSON.parse(v);
      return Array.isArray(p) ? (p as unknown as T) : fb;
    } catch {
      return fb;
    }
  }
  return fb;
}

const num = (v: unknown): number | undefined => {
  if (v == null) return undefined;
  const n = typeof v === 'string' ? Number(v) : (v as number);
  return Number.isFinite(n) ? n : undefined;
};

const str = (v: unknown): string | undefined =>
  typeof v === 'string' && v ? v : undefined;

const bool = (v: unknown): boolean | undefined =>
  typeof v === 'boolean' ? v : typeof v === 'string' ? v === 'true' : undefined;

function normalizeMarket(m: Record<string, unknown>): Market {
  return {
    id: String(m.id ?? ''),
    question: String(m.question ?? ''),
    slug: String(m.slug ?? ''),
    conditionId: String(m.conditionId ?? ''),
    ticker: str(m.ticker),
    endDate: String(m.endDate || ''),
    startDate: str(m.startDate),
    outcomes: parseArr<string[]>(m.outcomes, []),
    outcomePrices: parseArr<string[]>(m.outcomePrices, []).map((p) => Number(p)),
    clobTokenIds: parseArr<string[]>(m.clobTokenIds, []),
    volumeNum: num(m.volumeNum) || num(m.volume) || 0,
    liquidityNum: num(m.liquidityNum) || num(m.liquidity) || 0,
    active: bool(m.active),
    bestBid: num(m.bestBid),
    bestAsk: num(m.bestAsk),
    oneDayPriceChange: num(m.oneDayPriceChange),
    image: str(m.image),
    icon: str(m.icon),
    negRisk: !!bool(m.negRisk),
    orderPriceMinTickSize: num(m.orderPriceMinTickSize) || 0.01,
    tags: Array.isArray(m.tags)
      ? (m.tags as { id: string; label: string }[])
      : undefined,
  };
}

function normalizeEvent(e: Record<string, unknown>): Event {
  const markets = Array.isArray(e.markets)
    ? (e.markets as Record<string, unknown>[]).map(normalizeMarket)
    : [];
  return {
    id: String(e.id ?? ''),
    title: String(e.title ?? ''),
    slug: String(e.slug ?? ''),
    markets,
    image: str(e.image),
    icon: str(e.icon),
    ticker: str(e.ticker),
  };
}

export const api = {
  listMarkets: async (
    params: { limit?: number; offset?: number; order?: string; volumeMin?: number } = {},
    signal?: AbortSignal
  ): Promise<Market[]> => {
    const q = new URLSearchParams();
    if (params.limit != null) q.set('limit', String(params.limit));
    if (params.offset != null) q.set('offset', String(params.offset));
    if (params.order) q.set('order', params.order);
    if (params.volumeMin != null) q.set('volume_min', String(params.volumeMin));
    const qs = q.toString();
    const raw = await json<Record<string, unknown>[]>(
      `/markets${qs ? `?${qs}` : ''}`,
      signal
    );
    return raw.map(normalizeMarket);
  },

  getBook: (tokenId: string, signal?: AbortSignal) =>
    json<OrderBook>(`/book/${tokenId}`, signal),

  getHistory: (
    tokenId: string,
    interval?: string,
    signal?: AbortSignal
  ) =>
    json<History>(
      `/history/${tokenId}${interval ? `?interval=${interval}` : ''}`,
      signal
    ),

  searchEvents: async (
    q: string,
    page = 1,
    limitPerType = 40,
    signal?: AbortSignal
  ): Promise<{ events: Event[] }> => {
    const raw = await json<{
      events?: Record<string, unknown>[]
    }>(
      `/search?q=${encodeURIComponent(q)}&page=${page}&limit_per_type=${limitPerType}`,
      signal
    );
    return { events: (raw.events ?? []).map(normalizeEvent) };
  },

  getMarketBySlug: async (slug: string, signal?: AbortSignal): Promise<Market | null> => {
    const raw = await json<Record<string, unknown>[]>(
      `/markets?slug=${encodeURIComponent(slug)}`,
      signal
    );
    if (!raw.length) return null;
    return normalizeMarket(raw[0]);
  },
};

export const INTERVALS = [
  { key: '1h', label: '1H' },
  { key: '6h', label: '6H' },
  { key: '1d', label: '1D' },
  { key: '1w', label: '1W' },
  { key: '1m', label: '1M' },
  { key: 'max', label: 'MAX' },
] as const;
export type IntervalKey = (typeof INTERVALS)[number]['key'];
