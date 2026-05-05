import { Megaphone, MessageSquare } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      {/* Floating Chat Button */}
      <button className="fixed bottom-12 right-6 w-12 h-12 bg-[#00ff41] rounded-none flex items-center justify-center text-black transition-transform z-50 group">
        <MessageSquare className="w-6 h-6 fill-current" />
      </button>

      <footer className="fixed bottom-0 left-0 right-0 h-8 bg-black border-t border-[#333333] flex items-center justify-between px-12 z-50">
        {/* Left side: Status */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-2 h-2 rounded-full bg-[#22c55e]  animate-pulse" />
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.1em] group-hover:text-white/80 transition-colors">
            Status
          </span>
        </div>

        {/* Right side: Links */}
        <div className="flex items-center gap-8">
          <Link 
            href="#" 
            className="text-[10px] font-bold text-white/30 hover:text-white/80 transition-colors uppercase tracking-[0.1em]"
          >
            Docs
          </Link>
          <Link 
            href="#" 
            className="flex items-center gap-1.5 text-[10px] font-bold text-white/30 hover:text-white/80 transition-colors uppercase tracking-[0.1em]"
          >
            Social
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </Link>
          <Link 
            href="#" 
            className="flex items-center gap-1.5 text-[10px] font-bold text-white/30 hover:text-white/80 transition-colors uppercase tracking-[0.1em]"
          >
            Telegram Support
            <Megaphone className="w-3.5 h-3.5" />
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
