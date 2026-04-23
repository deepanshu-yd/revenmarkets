"use client";

import React, { useEffect } from 'react';
import { SWRConfig } from 'swr';
import { initWalletAutoReconnect } from '@/lib/wallet';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initWalletAutoReconnect();
  }, []);

  return (
    <SWRConfig 
      value={{
        fetcher: (url: string) => fetch(url).then(res => res.json()),
        revalidateOnFocus: false,
        shouldRetryOnError: false
      }}
    >
      {children}
    </SWRConfig>
  );
}
