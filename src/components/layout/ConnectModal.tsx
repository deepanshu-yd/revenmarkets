"use client";

import React from "react";
import { X, Mail, Wallet } from "lucide-react";

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect?: () => void;
}

const ConnectModal: React.FC<ConnectModalProps> = ({ isOpen, onClose, onConnect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60  transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-[440px] bg-[#111111] border border-[#333333] rounded-none overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="px-8 pt-10 pb-12 flex flex-col items-center">
          {/* Header */}
          <h2 className="text-xl font-bold text-white/90 mb-8 tracking-tight">
            Welcome to Reven Markets
          </h2>

          {/* Logo Section */}
          <div className="flex items-center gap-3 mb-10 group">
            <div className="relative w-12 h-12 flex items-center justify-center text-[#00ff41]">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10 transition-transform duration-500 group-hover:scale-110"
              >
                <path
                  d="M12 2c4.418 0 8 3.582 8 8v11l-2.5-2.5L15 21l-3-3-3 3-2.5-2.5L4 21V10c0-4.418 3.582-8 8-8z"
                />
                <path
                  d="M8.5 10c1.5-1 3 0 3 0s-1 2.5-3 1z"
                  fill="#1a1f26"
                />
                <path
                  d="M15.5 10c-1.5-1-3 0-3 0s1 2.5 3 1z"
                  fill="#1a1f26"
                />
              </svg>
            </div>
            <span className="text-3xl font-bold tracking-[0.1em] text-white uppercase">
              reven
            </span>
          </div>

          {/* Login Options */}
          <div className="w-full flex flex-col gap-3">
            {/* Email Login */}
            <button className="w-full bg-[#252b33] hover:bg-[#2d343d] border border-[#333333] rounded-[14px] py-4 px-6 flex items-center justify-center gap-3 transition-all group">
              <Mail size={18} className="text-gray-400 group-hover:text-white transition-colors" />
              <span className="text-[15px] font-bold text-gray-300 group-hover:text-white transition-colors">
                Login with Email
              </span>
            </button>

            {/* X Login */}
            <button className="w-full bg-[#252b33] hover:bg-[#2d343d] border border-[#333333] rounded-[14px] py-4 px-6 flex items-center justify-center gap-3 transition-all group">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-gray-400 group-hover:fill-white transition-colors">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="text-[15px] font-bold text-gray-300 group-hover:text-white transition-colors">
                Login with X
              </span>
            </button>

            {/* Wallet Login */}
            <button 
              onClick={() => {
                if (onConnect) onConnect();
                onClose();
              }}
              className="w-full bg-[#252b33] hover:bg-[#2d343d] border border-[#333333] rounded-[14px] py-4 px-6 flex items-center justify-center gap-3 transition-all group"
            >
              <Wallet size={18} className="text-gray-400 group-hover:text-white transition-colors" />
              <span className="text-[15px] font-bold text-gray-300 group-hover:text-white transition-colors">
                Login with Wallet
              </span>
            </button>
          </div>

          {/* Footer Links */}
          <p className="mt-10 text-[12px] font-medium text-gray-500">
            By logging in I agree to the{" "}
            <a href="#" className="text-gray-400 hover:text-[#00ff41] underline transition-colors">Terms</a>
            {" & "}
            <a href="#" className="text-gray-400 hover:text-[#00ff41] underline transition-colors">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;
