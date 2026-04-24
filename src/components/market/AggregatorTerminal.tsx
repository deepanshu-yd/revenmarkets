"use client";

import React from "react";
import { ExternalLink, ArrowRightLeft } from "lucide-react";
import { MarketImage } from "./MarketImage";
import { AggregatorMarket } from "@/types/market";

const AGGREGATOR_DATA = [
  {
    id: 1,
    title: "Yvette Cooper",
    poly: {
      question: "Will Yvette Cooper be the next Prime Minister of the United Kingdom in 2028?",
      yes: 3,
      no: 97,
      image: "https://unavatar.io/twitter/YvetteCooperMP"
    },
    kalshi: {
      question: "Will Yvette Cooper be the next Prime Minister of United Kingdom?",
      yes: 4,
      no: 94,
      image: "https://unavatar.io/twitter/YvetteCooperMP"
    },
    match: 95,
    priceDiff: 1
  },
  {
    id: 2,
    title: "Republican NH Governor",
    poly: {
      question: "Will the Republicans win the New Hampshire governor race in 2026?",
      yes: 70,
      no: 30,
      image: "https://unavatar.io/twitter/GOP"
    },
    kalshi: {
      question: "Will the Republican party win the governorship in New Hampshire",
      yes: 74,
      no: 24,
      image: "https://unavatar.io/twitter/NHGOP"
    },
    match: 97,
    priceDiff: 4
  },
  {
    id: 3,
    title: "Democratic NH Governor",
    poly: {
      question: "Will the Democrats win the New Hampshire governor race in 2026?",
      yes: 30,
      no: 70,
      image: "https://unavatar.io/twitter/TheDemocrats"
    },
    kalshi: {
      question: "Will the Democratic party win the governorship in New Hampshire",
      yes: 24,
      no: 74,
      image: "https://unavatar.io/twitter/NHDems"
    },
    match: 97,
    priceDiff: 6
  },
  {
    id: 4,
    title: "Sarah Huckabee Sanders",
    poly: {
      question: "Will Sarah Huckabee Sanders win the 2028 Republican presidential nomination?",
      yes: 1,
      no: 99,
      image: "https://unavatar.io/twitter/SarahHuckabee"
    },
    kalshi: {
      question: "Will Sarah Huckabee Sanders be the nominee for the Presidency for the Republican party?",
      yes: 0,
      no: 100,
      image: "https://unavatar.io/twitter/SarahHuckabee"
    },
    match: 99,
    priceDiff: 1
  },
  {
    id: 5,
    title: "Greg Abbott",
    poly: {
      question: "Will Greg Abbott win the 2028 US Presidential Election?",
      yes: 1,
      no: 99,
      image: "https://unavatar.io/twitter/GregAbbott_TX"
    },
    kalshi: {
      question: "Who will win the next presidential election?",
      yes: 0,
      no: 100,
      image: "https://unavatar.io/twitter/GregAbbott_TX"
    },
    match: 97,
    priceDiff: 1
  },
  {
    id: 6,
    title: "Andy Beshear",
    poly: {
      question: "Will Andy Beshear win the 2028 US Presidential Election?",
      yes: 1,
      no: 99,
      image: "https://unavatar.io/twitter/AndyBeshearKY"
    },
    kalshi: {
      question: "Who will win the next presidential election?",
      yes: 2,
      no: 97,
      image: "https://unavatar.io/twitter/AndyBeshearKY"
    },
    match: 97,
    priceDiff: 1
  },
  {
    id: 7,
    title: "Ted Cruz",
    poly: {
      question: "Will Ted Cruz win the 2028 Republican presidential nomination?",
      yes: 1,
      no: 99,
      image: "https://unavatar.io/twitter/tedcruz"
    },
    kalshi: {
      question: "Will Ted Cruz be the nominee for the Presidency for the Republican party?",
      yes: 1,
      no: 99,
      image: "https://unavatar.io/twitter/tedcruz"
    },
    match: 97,
    priceDiff: 0
  },
  {
    id: 8,
    title: "Gavin Newsom",
    poly: {
      question: "Will Gavin Newsom win the 2028 Democratic presidential nomination?",
      yes: 26,
      no: 74,
      image: "https://unavatar.io/twitter/GavinNewsom"
    },
    kalshi: {
      question: "Who will win the next presidential election?",
      yes: 10,
      no: 90,
      image: "https://unavatar.io/twitter/GavinNewsom"
    },
    match: 91,
    priceDiff: 16
  },
  {
    id: 9,
    title: "Marjorie Taylor Greene",
    poly: {
      question: "Will Marjorie Taylor Greene win the 2028 Republican presidential nomination?",
      yes: 1,
      no: 99,
      image: "https://unavatar.io/twitter/mtgreenee"
    },
    kalshi: {
      question: "Will Marjorie Taylor Greene be the nominee for the Presidency for the Republican party?",
      yes: 0,
      no: 100,
      image: "https://unavatar.io/twitter/mtgreenee"
    },
    match: 99,
    priceDiff: 1
  }
];

import AggregatorModal from "./AggregatorModal";

const AggregatorTerminal = () => {
  const [selectedItem, setSelectedItem] = React.useState<AggregatorMarket | null>(null);

  return (
    <div className="h-full overflow-y-auto bg-[#0a0c10] px-12 py-8 custom-scrollbar">
      {selectedItem && (
        <AggregatorModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-[1600px] mx-auto pb-20">
        {AGGREGATOR_DATA.map((item) => (
          <div 
            key={item.id}
            className="bg-[#11161d] border border-white/[0.05] rounded-xl overflow-hidden hover:border-white/10 transition-all group shadow-lg"
          >
            {/* Polymarket Row */}
            <div className="px-6 py-5 border-b border-white/[0.03] flex items-center justify-between group/row hover:bg-white/[0.01] transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative">
                  <MarketImage 
                    src={item.poly.image} 
                    alt="" 
                    seed={item.title}
                  />
                  <div className="absolute -top-1 -left-1 w-4 h-4 bg-blue-600 rounded-full border border-[#11161d] flex items-center justify-center">
                    <span className="text-[8px] font-black text-white">P</span>
                  </div>
                </div>
                <h3 className="text-[12px] font-bold text-white/80 line-clamp-1 max-w-[400px]">
                  {item.poly.question}
                </h3>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-0.5">Yes</span>
                  <span className="text-[12px] font-bold text-[#5eead4]">{item.poly.yes}¢</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-0.5">No</span>
                  <span className="text-[12px] font-bold text-[#f87171]">{item.poly.no}¢</span>
                </div>
              </div>
            </div>

            {/* Kalshi Row */}
            <div className="px-6 py-5 border-b border-white/[0.03] flex items-center justify-between group/row hover:bg-white/[0.01] transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative">
                  <MarketImage 
                    src={item.kalshi.image} 
                    alt="" 
                    seed={item.title}
                  />
                  <div className="absolute -top-1 -left-1 w-4 h-4 bg-green-600 rounded-full border border-[#11161d] flex items-center justify-center">
                    <span className="text-[8px] font-black text-white">K</span>
                  </div>
                </div>
                <h3 className="text-[12px] font-bold text-white/80 line-clamp-1 max-w-[400px]">
                  {item.kalshi.question}
                </h3>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-0.5">Yes</span>
                  <span className="text-[12px] font-bold text-[#5eead4]">{item.kalshi.yes}¢</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-0.5">No</span>
                  <span className="text-[12px] font-bold text-[#f87171]">{item.kalshi.no}¢</span>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="px-6 py-4 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Match</span>
                  <span className="text-[12px] font-bold text-[#5eead4]">{item.match}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Price Diff</span>
                  <span className="text-[12px] font-bold text-white/90">{item.priceDiff}¢</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedItem(item)}
                className="px-5 py-2 bg-[#1a212c] border border-white/10 rounded-lg text-[10px] font-black text-white hover:bg-[#232d3b] hover:border-[#5eead4]/50 transition-all uppercase tracking-widest"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AggregatorTerminal;
