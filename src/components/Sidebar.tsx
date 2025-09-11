import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-56 bg-[#f7fafd] border-r border-[#e5eaf2] flex flex-col p-6 z-30">
      <div className="text-2xl font-extrabold mb-10 tracking-tight text-[#2563eb] select-none">SaaS Dashboard</div>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="block px-3 py-2 rounded-lg hover:bg-[#e5eaf2] hover:text-[#2563eb] text-[#222] font-semibold transition-all duration-150">Dashboard</Link>
          </li>
          <li>
            <Link href="/customers" className="block px-3 py-2 rounded-lg hover:bg-[#e5eaf2] hover:text-[#2563eb] text-[#222] font-semibold transition-all duration-150">Customers</Link>
          </li>
          <li>
            <Link href="/settings" className="block px-3 py-2 rounded-lg hover:bg-[#e5eaf2] text-black font-semibold transition-all duration-150">Settings</Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto text-xs text-[#6b7280] select-none">&copy; 2025 SaaS Inc.</div>
    </aside>
  );
}
