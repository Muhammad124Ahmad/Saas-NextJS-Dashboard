
"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { getSectionTitle } from "../utils/sectionTitle";
import LoginLogoutButton from "./LoginLogoutButton";

export default function TopBar() {
  // Notification bell and functionality removed
  const pathname = usePathname();
  const sectionTitle = getSectionTitle(pathname);
  return (
    <header className="h-16 bg-white border-b border-[#e5eaf2] flex items-center px-8 mb-4 justify-between">
      <div className="flex items-center gap-2 text-base font-medium text-[#222]">
        <span className="text-[#6b7280]">Welcome</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mx-1"><path d="M2 6h8" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"/></svg>
        <span className="text-[#2563eb] font-semibold">{sectionTitle}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mx-1"><path d="M2 6h8" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </div>
      <div className="flex items-center gap-4">
  {/* Notification bell removed */}
  {/* Login/Logout Button */}
  <LoginLogoutButton />
      </div>
    </header>
  );
}
