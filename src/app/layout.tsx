import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

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
      <body className={`${plusJakartaSans.variable} font-sans bg-[#0a0f14] text-white h-screen flex flex-col overflow-hidden antialiased`} suppressHydrationWarning>
        <Header />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
