export interface Market {
  id: string;
  source: 'polymarket' | 'kalshi';
  question: string;
  slug: string;
  image?: string;
  icon?: string;
  ticker?: string;
  outcomePrices: number[];
  outcomes: string[];
  volumeNum: number;
  liquidityNum: number;
  oneDayPriceChange?: number;
  startDate?: string;
  endDate: string;
  tags?: Array<{ id: string; label: string }>;
  clobTokenIds: string[];
  conditionId: string;
  orderPriceMinTickSize: number;
  negRisk: boolean;
  bestBid?: number;
  bestAsk?: number;
  description?: string;
  active?: boolean;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  markets: Market[];
  image?: string;
  icon?: string;
  ticker?: string;
}

export type OrderSide = 'BUY' | 'SELL';

export interface OrderBookLevel {
  price: number;
  size: number;
}

export interface OrderBookData {
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
}

export interface HistoryPoint {
  t: number;
  p: number;
}

export interface PlatformData {
  question: string;
  yes: number;
  no: number;
  image: string;
}

export interface AggregatorMarket {
  id: number;
  title: string;
  poly: PlatformData;
  kalshi: PlatformData;
  match: number;
  priceDiff?: number;
}

export interface ArbitrageMarket extends AggregatorMarket {
  description: string;
  profit: string;
  risk: string;
  totalCost: number;
  potentialProfit: number;
  strategy: string;
}
