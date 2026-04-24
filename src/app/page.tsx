"use client";

import React, { useState } from "react";
import MarketNav from "@/components/layout/MarketNav";
import MarketTerminal from "@/components/market/MarketTerminal";
import CryptoTerminal from "@/components/market/CryptoTerminal";
import AggregatorTerminal from "@/components/market/AggregatorTerminal";
import ArbitrageTerminal from "@/components/market/ArbitrageTerminal";
import BotsTerminal from "@/components/market/BotsTerminal";

export default function Home() {
  const [activeTab, setActiveTab] = useState("New Markets");

  const renderContent = () => {
    switch (activeTab) {
      case "Crypto":
        return <CryptoTerminal />;
      case "Aggregator":
        return <AggregatorTerminal />;
      case "Arbitrage Finder":
        return <ArbitrageTerminal />;
      case "Automated Bots":
        return <BotsTerminal />;
      default:
        return <MarketTerminal />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0a0c10] overflow-hidden">
      <MarketNav activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
}
