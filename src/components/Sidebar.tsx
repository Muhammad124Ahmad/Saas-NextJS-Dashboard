import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="h-screen w-56 bg-gray-900 text-white flex flex-col p-4">
      <div className="text-2xl font-bold mb-8">SaaS Dashboard</div>
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard" className="hover:text-blue-400">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/customers" className="hover:text-blue-400">
              Customers
            </Link>
          </li>
          <li>
            <Link href="/settings" className="hover:text-blue-400">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto text-xs text-gray-400">&copy; 2025 SaaS Inc.</div>
    </aside>
  );
}
