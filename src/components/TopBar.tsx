
"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { getSectionTitle } from "../utils/sectionTitle";
import LogoutButton from "./LogoutButton";

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
        {/* Profile Avatar & Dropdown */}
        <div className="relative group">
          <img src="https://i.pravatar.cc/40?img=3" alt="avatar" className="w-9 h-9 rounded-full border-2 border-[#2563eb] cursor-pointer" />
          <div className="absolute right-0 mt-2 w-40 bg-white border border-[#e5eaf2] rounded shadow-lg opacity-0 group-hover:opacity-100 transition z-10">
            <a href="/settings" className="block px-4 py-2 text-[#2563eb] hover:bg-[#f3f6fd]">Settings</a>
            <div className="px-4 py-2"><LogoutButton /></div>
          </div>
        </div>
      </div>
    </header>
  );
}
