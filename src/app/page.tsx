import MarketNav from "@/components/layout/MarketNav";
import MarketTerminal from "@/components/market/MarketTerminal";

export default function Home() {
  return (
    <div className="h-full flex flex-col bg-[#0a0c10] overflow-hidden">
      <MarketNav />
      <div className="flex-1 overflow-hidden">
        <MarketTerminal />
      </div>
    </div>
  );
}
