
"use client";


import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import RecentActivity from "../../components/RecentActivity";
import ProtectedRoute from "../../components/ProtectedRoute";
export default function DashboardPage() {
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const [newSignups, setNewSignups] = useState<number>(0);
  const [churnRate, setChurnRate] = useState<string>("-");
  const [userGrowth, setUserGrowth] = useState<{ month: string; users: number }[]>([]);

  useEffect(() => {
    // Fetch active users (count from auth.users)
    const fetchStats = async () => {
      // Active Users
      const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
      if (!usersError && users && users.users) {
        setActiveUsers(users.users.length);

        // New Signups (last 7 days)
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const newSignupsCount = users.users.filter(u => new Date(u.created_at) > weekAgo).length;
        setNewSignups(newSignupsCount);

        // User Growth (per month for last 6 months)
        const growth: { [key: string]: number } = {};
        for (let i = 5; i >= 0; i--) {
          const d = new Date();
          d.setMonth(d.getMonth() - i);
          const key = d.toLocaleString('default', { month: 'short', year: '2-digit' });
          growth[key] = 0;
        }
        users.users.forEach(u => {
          const d = new Date(u.created_at);
          const key = d.toLocaleString('default', { month: 'short', year: '2-digit' });
          if (growth[key] !== undefined) growth[key]++;
        });
        setUserGrowth(Object.entries(growth).map(([month, users]) => ({ month, users })));
      }

      // Revenue (sum from payments table if exists)
      const { data: payments, error: paymentsError } = await supabase.from('payments').select('amount');
      if (!paymentsError && payments) {
        setRevenue(payments.reduce((sum, p) => sum + (p.amount || 0), 0));
      } else {
        setRevenue(0); // Placeholder if no payments table
      }

      // Churn Rate (placeholder, needs a flag or status in users or customers table)
      setChurnRate("-");
    };
    fetchStats();
  }, []);

  return (
    <ProtectedRoute>
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-8 text-[#222] tracking-tight">Dashboard</h1>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white border border-[#e5eaf2] rounded-xl shadow-sm p-6 text-center transition-transform duration-200 hover:scale-105 hover:shadow-md">
            <div className="text-2xl font-bold text-[#2563eb] mb-1">{activeUsers}</div>
            <div className="text-base text-[#222] font-medium tracking-tight">Active Users</div>
          </div>
          <div className="bg-white border border-[#e5eaf2] rounded-xl shadow-sm p-6 text-center transition-transform duration-200 hover:scale-105 hover:shadow-md">
            <div className="text-2xl font-bold text-[#2563eb] mb-1">${revenue.toLocaleString()}</div>
            <div className="text-base text-[#222] font-medium tracking-tight">Revenue</div>
          </div>
          <div className="bg-white border border-[#e5eaf2] rounded-xl shadow-sm p-6 text-center transition-transform duration-200 hover:scale-105 hover:shadow-md">
            <div className="text-2xl font-bold text-[#2563eb] mb-1">{newSignups}</div>
            <div className="text-base text-[#222] font-medium tracking-tight">New Signups</div>
          </div>
          <div className="bg-white border border-[#e5eaf2] rounded-xl shadow-sm p-6 text-center transition-transform duration-200 hover:scale-105 hover:shadow-md">
            <div className="text-2xl font-bold text-[#2563eb] mb-1">{churnRate}</div>
            <div className="text-base text-[#222] font-medium tracking-tight">Churn Rate</div>
          </div>
        </div>
        {/* Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white border border-[#e5eaf2] rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4 text-[#2563eb]">User Growth</h2>
            <div className="flex space-x-4 items-end h-40">
              {userGrowth.map((data) => (
                <div key={data.month} className="flex flex-col items-center group">
                  <div
                    className="bg-gradient-to-t from-[#2563eb] to-[#60a5fa] w-8 rounded-lg shadow transition-all duration-200 group-hover:scale-110 group-hover:shadow-md"
                    style={{ height: `${data.users * 8}px` }}
                  ></div>
                  <span className="mt-2 text-sm text-[#2563eb] font-semibold">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
          <RecentActivity />
        </div>
        {/* Table */}
      </main>
    </ProtectedRoute>
  );
}
// ...existing code...
