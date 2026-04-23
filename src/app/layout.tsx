import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "REVEN | Prediction Market Terminal",
  description: "The ultimate terminal for prediction markets. Trade smarter, find the edge, and grow your revenue with REVEN.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0a0f14] text-white min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1 pb-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
