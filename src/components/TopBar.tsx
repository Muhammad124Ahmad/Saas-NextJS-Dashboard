
"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { getSectionTitle } from "../utils/sectionTitle";
import LogoutButton from "./LogoutButton";

export default function TopBar() {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const notifications = [
    { id: 1, text: "New user signed up", time: "2m ago" },
    { id: 2, text: "Payment received", time: "10m ago" },
    { id: 3, text: "Server backup completed", time: "1h ago" },
  ];
  const unreadCount = notifications.length;
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
        {/* Notification Bell */}
        <div className="relative">
          <button className="relative group" onClick={() => setShowNotifications((v) => !v)}>
            <svg className="w-6 h-6 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{unreadCount}</span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-[#e5eaf2] rounded shadow-lg z-20 animate-fade-in">
              <div className="p-4 border-b border-[#e5eaf2] font-semibold text-[#2563eb]">Notifications</div>
              <ul>
                {notifications.map((n) => (
                  <li key={n.id} className="px-4 py-3 text-[#222] border-b border-[#f3f6fd] last:border-b-0">
                    <div className="font-medium">{n.text}</div>
                    <div className="text-xs text-[#6b7280]">{n.time}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
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
