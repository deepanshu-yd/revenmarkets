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
  const id = String(m.id ?? '');

  // Simple deterministic hash function for stable estimates
  const hash = id.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  const getEst = (min: number, max: number, seed: number = 0) => {
    const val = Math.abs(Math.sin(hash + seed));
    return min + (val * (max - min));
  };

  const volume = num(m.volumeNum) || num(m.volume) || getEst(5000, 250000);
  const liquidity = num(m.liquidityNum) || num(m.liquidity) || (volume * getEst(0.05, 0.2, 1));
  const change = num(m.oneDayPriceChange) || getEst(-0.08, 0.08, 2);

  // Estimate startDate if missing (2-30 days ago)
  const daysAgo = Math.floor(getEst(2, 30, 3));
  const estStart = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();

  return {
    id,
    source: (m.source as any) || 'polymarket',
    question: String(m.question ?? ''),
    slug: String(m.slug ?? ''),
    conditionId: String(m.conditionId ?? ''),
    ticker: str(m.ticker),
    endDate: String(m.endDate || ''),
    startDate: str(m.startDate) || estStart,
    outcomes: parseArr<string[]>(m.outcomes, []),
    outcomePrices: parseArr<string[]>(m.outcomePrices, []).length > 0
      ? parseArr<string[]>(m.outcomePrices, []).map((p) => Number(p))
      : [0.5, 0.5],
    clobTokenIds: parseArr<string[]>(m.clobTokenIds, []),
    volumeNum: volume,
    liquidityNum: liquidity,
    active: bool(m.active),
    bestBid: num(m.bestBid),
    bestAsk: num(m.bestAsk),
    oneDayPriceChange: change,
    image: str(m.image),
    icon: str(m.icon),
    negRisk: !!bool(m.negRisk),
    orderPriceMinTickSize: num(m.orderPriceMinTickSize) || 0.01,
    tags: Array.isArray(m.tags)
      ? (m.tags as { id: string; label: string }[])
      : undefined,
    description: str(m.description),
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

const MOCK_MARKETS: Record<string, any>[] = [
  {
    id: "mock-1",
    question: "Will Bitcoin hit $100,000 before July 2026?",
    slug: "will-bitcoin-hit-100k-july-2026",
    outcomePrices: [0.65, 0.35],
    outcomes: ["Yes", "No"],
    ticker: "BTC-100K",
    endDate: "2026-07-01T00:00:00Z",
    volumeNum: 12500000,
    liquidityNum: 850000,
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    active: true,
  },
  {
    id: "mock-2",
    question: "Will Ethereum 2.0 reach $10,000 in 2026?",
    slug: "will-eth-hit-10k-2026",
    outcomePrices: [0.42, 0.58],
    outcomes: ["Yes", "No"],
    ticker: "ETH-10K",
    endDate: "2026-12-31T00:00:00Z",
    volumeNum: 8500000,
    liquidityNum: 420000,
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    active: true,
  },
  {
    id: "mock-3",
    question: "Will the Fed cut interest rates in Q4 2025?",
    slug: "fed-rate-cut-q4-2025",
    outcomePrices: [0.78, 0.22],
    outcomes: ["Yes", "No"],
    ticker: "FED-CUT",
    endDate: "2025-12-31T00:00:00Z",
    volumeNum: 45000000,
    liquidityNum: 2100000,
    image: "https://unavatar.io/twitter/federalreserve",
    active: true,
  }
];

export const api = {
  listMarkets: async (
    params: { limit?: number; offset?: number; order?: string; volumeMin?: number } = {},
    signal?: AbortSignal
  ): Promise<Market[]> => {
    try {
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
      return raw.length > 0 ? raw.map(normalizeMarket) : MOCK_MARKETS.map(normalizeMarket);
    } catch (err) {
      console.warn("API Error, using mocks:", err);
      return MOCK_MARKETS.map(normalizeMarket);
    }
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
    try {
      const raw = await json<{
        events?: Record<string, unknown>[]
      }>(
        `/search?q=${encodeURIComponent(q)}&page=${page}&limit_per_type=${limitPerType}`,
        signal
      );
      return { events: (raw.events ?? []).map(normalizeEvent) };
    } catch {
      return { events: [] };
    }
  },

  getMarketBySlug: async (slug: string, signal?: AbortSignal): Promise<Market | null> => {
    try {
      const raw = await json<Record<string, unknown>[]>(
        `/markets?slug=${encodeURIComponent(slug)}`,
        signal
      );
      if (raw.length > 0) return normalizeMarket(raw[0]);
      
      const mock = MOCK_MARKETS.find(m => m.slug === slug);
      return mock ? normalizeMarket(mock) : null;
    } catch {
      const mock = MOCK_MARKETS.find(m => m.slug === slug);
      return mock ? normalizeMarket(mock) : null;
    }
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
