"use client";

import React, { useState } from "react";
import { Zap } from "lucide-react";
import Link from "next/link";
import ConnectModal from "./ConnectModal";
import { useSettings } from "@/providers/SettingsContext";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { isPrivate, setIsPrivate } = useSettings();

  return (
    <>
      <header className="flex items-center justify-between px-12 py-3 bg-black border-b border-[#333333] sticky top-0 z-50">
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 flex items-center justify-center text-[#00ff41] animate-logo">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7 transition-transform duration-500 group-hover:scale-110"
              >
                {/* Ghost Body - Solid Shape for Sharpness */}
                <path
                  d="M12 2c4.418 0 8 3.582 8 8v11l-2.5-2.5L15 21l-3-3-3 3-2.5-2.5L4 21V10c0-4.418 3.582-8 8-8z"
                />
                {/* Angry Eyes - Cutouts */}
                <path
                  d="M8.5 10c1.5-1 3 0 3 0s-1 2.5-3 1z"
                  fill="#0a0f14"
                />
                <path
                  d="M15.5 10c-1.5-1-3 0-3 0s1 2.5 3 1z"
                  fill="#0a0f14"
                />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-white/90 uppercase tracking-[0.25em]">
              REVEN
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/?tab=New Markets"
              className="flex items-center gap-1.5 text-[#00ff41] text-[13px] font-semibold transition-colors hover:opacity-80"
            >
              <Zap size={14} fill="currentColor" />
              Flash
            </Link>
            {["Trade", "Copy"].map((item) => (
              <Link
                key={item}
                href={item === "Copy" ? "/?tab=Automated Bots" : "#"}
                className="text-gray-400 text-[13px] font-semibold transition-colors hover:text-white"
              >
                {item}
              </Link>
            ))}
            <Link
              href="/portfolio"
              className="text-gray-400 text-[13px] font-semibold transition-colors hover:text-white"
            >
              Portfolio
            </Link>
          </nav>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Private Mode Toggle */}
          <div className="flex items-center gap-3 mr-2 group">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-gray-400 transition-colors">Private Mode</span>
            <button 
              onClick={() => setIsPrivate(!isPrivate)}
              className={`w-8 h-4 rounded-full relative transition-all duration-300 ${isPrivate ? 'bg-[#00ff41]' : 'bg-white/10'}`}
            >
              <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-black transition-all duration-300 ${isPrivate ? 'left-[18px]' : 'left-0.5'}`} />
            </button>
          </div>

          {!isConnected ? (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#00ff41]/10 text-[#00ff41] px-6 py-2 border border-[#00ff41]/20 font-black text-[11px] uppercase tracking-widest hover:bg-[#00ff41]/20 transition-all rounded-none"
            >
              Connect
            </button>
          ) : (
            <>
              <button className="p-2.5 bg-[#111111] border border-[#333333] rounded-none text-gray-400 hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
              </button>

              <button 
                disabled
                className="bg-[#00ff41]/5 border border-[#00ff41]/10 rounded-none px-6 py-2 text-[11px] font-black text-[#00ff41]/40 uppercase tracking-widest cursor-not-allowed group relative overflow-hidden transition-all"
              >
                <span className="group-hover:opacity-0 transition-opacity">Deposit</span>
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-[#00ff41] font-black">PAUSED</span>
              </button>

              <button className="p-2.5 bg-[#111111] border border-[#333333] rounded-none text-gray-400 hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </button>
            </>
          )}
        </div>
      </header>

      <ConnectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={() => setIsConnected(true)}
      />
    </>
  );
};

export default Header;
