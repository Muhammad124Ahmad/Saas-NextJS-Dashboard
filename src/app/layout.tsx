import type { Metadata } from "next";
import "./globals.css";

import React from "react";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";

export const metadata: Metadata = {
  title: "Saaslytic",
  description: "Modern analytics dashboard app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#f7fafd] text-[#1a1a1a] font-sans min-h-screen">
        <div className="flex bg-[#f7fafd]">
          <Sidebar />
          <div className="flex-1 flex flex-col bg-white">
            {/* Top Bar */}
            <TopBar />
            <main className="flex-1 min-h-screen px-4 sm:px-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
