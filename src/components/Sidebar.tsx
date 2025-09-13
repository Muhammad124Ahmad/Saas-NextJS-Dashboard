'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return (
    <>
      {/* Mobile menu button and overlay only after mount (client) */}
      {mounted && (
        <>
          <button
            className="fixed top-4 left-4 z-40 bg-[#2563eb] text-white p-2 rounded shadow-lg lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          {open && (
            <div className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden" onClick={() => setOpen(false)}></div>
          )}
        </>
      )}
      {/* Sidebar */}
      <aside
        className={
          mounted
            ? `bg-[#f7fafd] border-r border-[#e5eaf2] flex flex-col p-6 z-40 transition-transform duration-300 fixed top-0 left-0 h-screen w-64 ${open ? "translate-x-0" : "-translate-x-full"} lg:static lg:w-56 lg:z-30 lg:translate-x-0`
            : "bg-[#f7fafd] border-r border-[#e5eaf2] flex flex-col p-6 z-40 lg:static lg:w-56 lg:z-30 lg:translate-x-0"
        }
      >
  <div className="text-2xl font-extrabold mb-10 tracking-tight text-[#2563eb] select-none">Saaslytic</div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard" className="block px-3 py-2 rounded-lg hover:bg-[#e5eaf2] hover:text-[#2563eb] text-[#222] font-semibold transition-all duration-150" onClick={() => setOpen(false)}>Dashboard</Link>
            </li>
            <li>
              <Link href="/customers" className="block px-3 py-2 rounded-lg hover:bg-[#e5eaf2] hover:text-[#2563eb] text-[#222] font-semibold transition-all duration-150" onClick={() => setOpen(false)}>Customers</Link>
            </li>
            <li>
              <Link href="/settings" className="block px-3 py-2 rounded-lg hover:bg-[#e5eaf2] text-black font-semibold transition-all duration-150" onClick={() => setOpen(false)}>Settings</Link>
            </li>
          </ul>
        </nav>
  <div className="mt-auto text-xs text-[#6b7280] select-none">&copy; 2025 Saaslytic</div>
      </aside>
    </>
  );
}
