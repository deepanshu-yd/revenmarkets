import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import { Providers } from "@/providers/Providers";

export const metadata: Metadata = {
  title: "REVEN | Prediction Market Terminal",
  description: "The ultimate terminal for prediction markets. Trade smarter, find the edge, and grow your revenue with REVEN.",
  icons: {
    icon: "/assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={`font-['JetBrains_Mono',monospace] bg-black text-[#e0e0e0] h-screen flex flex-col overflow-hidden antialiased`} suppressHydrationWarning>
        <Providers>
          <Header />
          <AnnouncementBanner />
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
