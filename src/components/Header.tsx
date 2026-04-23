"use client";

import React from "react";
import { Zap } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-[#0a0f14] border-b border-white/5 sticky top-0 z-50">
      <div className="flex items-center gap-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 flex items-center justify-center text-[#5eead4] animate-logo">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7 transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(94,234,212,0.4)]"
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
            href="#"
            className="flex items-center gap-1.5 text-[#5eead4] text-[13px] font-semibold transition-colors hover:opacity-80"
          >
            <Zap size={14} fill="currentColor" />
            Lightning
          </Link>
          {["Trade", "Copy", "Tournament", "Portfolio"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-gray-400 text-[13px] font-semibold transition-colors hover:text-white"
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>

      {/* Connect Button */}
      <button className="bg-[#5eead4] hover:brightness-110 text-[#0a0f14] px-6 py-2 rounded-[10px] font-bold text-sm transition-all duration-200 active:scale-95 shadow-[0_0_20px_rgba(94,234,212,0.15)]">
        Connect
      </button>
    </header>
  );
};

export default Header;
