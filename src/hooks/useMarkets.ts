import useSWR from 'swr';
import { api } from '@/lib/api';
import { Market } from '@/types/market';

export function useMarkets(activeTab: string, searchQuery: string) {
  const { data, error, isLoading } = useSWR(
    ['markets', activeTab, searchQuery],
    async () => {
      if (searchQuery) {
        const res = await api.searchEvents(searchQuery);
        const allMarkets: Market[] = [];
        res.events.forEach(e => allMarkets.push(...(e.markets as any)));
        return allMarkets;
      }
      return api.listMarkets({ limit: 50 }) as Promise<Market[]>;
    }
  );

  const filteredMarkets = data ? (
    // If it's a category we know exists in tags, filter by it.
    // Otherwise, show all data (like for 'New Markets', 'Aggregator', etc.)
    ['crypto', 'politics', 'culture', 'world', 'sports', 'finance', 'economy', 'tech', 'trump', 'breaking news', 'geopolitics'].includes(activeTab.toLowerCase())
      ? data.filter(m => 
          m.tags?.some(t => t.label.toLowerCase() === activeTab.toLowerCase()) ||
          m.question.toLowerCase().includes(activeTab.toLowerCase())
        )
      : data
  ) : [];

  return {
    markets: filteredMarkets,
    error,
    isLoading
  };
}

export function useMarketDetail(slug: string) {
  const { data: market, error, isLoading } = useSWR(
    ['market', slug],
    () => api.getMarketBySlug(slug) as Promise<Market>
  );

  const yesToken = market?.clobTokenIds?.[0];

  const { data: history } = useSWR(
    yesToken ? ['history', yesToken] : null,
    () => api.getHistory(yesToken!, '1w')
  );

  return {
    market,
    history,
    error,
    isLoading,
    yesToken
  };
}
