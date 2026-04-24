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
