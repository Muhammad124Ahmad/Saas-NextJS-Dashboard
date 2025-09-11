import type { Metadata } from "next";
import "./globals.css";

import React from "react";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";

export const metadata: Metadata = {
  title: "SaaS Dashboard",
  description: "Modern SaaS dashboard app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#f7fafd] text-[#1a1a1a] font-sans min-h-screen">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col bg-white border-l border-[#e5eaf2] ml-56">
            {/* Top Bar */}
            <TopBar />
            <main className="flex-1 px-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
