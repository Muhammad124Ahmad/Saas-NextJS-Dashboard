
"use client";

type Customer = {
  id: string;
  status: string;
  created_at: string;
  updated_at?: string;
};


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
    // Fetch stats from users table
    const fetchStats = async () => {
      // Fetch all customers
      const { data: customers, error: customersError } = await supabase.from('customers').select('id, status, created_at');
      if (!customersError && customers) {
  const customerList: Customer[] = customers;
  // Active Users = customers with status 'Active' (case-insensitive, trimmed)
  const active = customerList.filter((c) => c.status && c.status.trim().toLowerCase() === 'active');
  setActiveUsers(active.length);

        // New Signups (last 7 days)
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const newSignupsCount = customerList.filter((c) => new Date(c.created_at) > weekAgo).length;
        setNewSignups(newSignupsCount);

        // User Growth (per month for last 6 months)
        const growth: { [key: string]: number } = {};
        for (let i = 5; i >= 0; i--) {
          const d = new Date();
          d.setMonth(d.getMonth() - i);
          const key = d.toLocaleString('default', { month: 'short', year: '2-digit' });
          growth[key] = 0;
        }
        customerList.forEach((c) => {
          const d = new Date(c.created_at);
          const key = d.toLocaleString('default', { month: 'short', year: '2-digit' });
          if (growth[key] !== undefined) growth[key]++;
        });
        setUserGrowth(Object.entries(growth).map(([month, users]) => ({ month, users })));
      }

      // Revenue (sum from payments table if exists)
      const { data: payments, error: paymentsError } = await supabase.from('payments').select('amount');
      if (!paymentsError && payments) {
        setRevenue(payments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0));
      } else {
        setRevenue(0); // Placeholder if no payments table
      }

      // Churn Rate: % of customers who became inactive in last 30 days and were active 30 days ago
      const { data: churnCustomers, error: churnCustomersError } = await supabase.from('customers').select('id, status, created_at, updated_at');
      if (!churnCustomersError && churnCustomers) {
        const churnList: Customer[] = churnCustomers;
        const now = new Date();
        const monthAgo = new Date();
        monthAgo.setDate(now.getDate() - 30);
        // Customers who became inactive in last 30 days (status is Inactive, updated_at in last 30 days, and created_at before 30 days ago)
        const churned = churnList.filter((c) =>
          c.status === 'Inactive' &&
          c.updated_at && new Date(c.updated_at) > monthAgo &&
          new Date(c.created_at) <= monthAgo
        );
        // Customers who were active 30 days ago (created before 30 days ago)
        const totalMonthAgo = churnList.filter((c) => new Date(c.created_at) <= monthAgo);
        const churnRateValue = totalMonthAgo.length > 0 ? (churned.length / totalMonthAgo.length) * 100 : 0;
        setChurnRate(totalMonthAgo.length > 0 ? churnRateValue.toFixed(1) + '%' : '-');
      } else {
        "use client";
      }
    };
    fetchStats();
  }, []);

  return (
    <ProtectedRoute>
  <main className="p-4 sm:p-6 md:p-8">
  <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-[#222] tracking-tight">Saaslytic</h1>
        {/* Stats */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="bg-white border border-[#e5eaf2] rounded-xl shadow-sm p-4 sm:p-6 text-center transition-transform duration-200 hover:scale-105 hover:shadow-md">
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
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
          <div className="bg-white border border-[#e5eaf2] rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-bold mb-4 text-[#2563eb]">User Growth</h2>
            <div className="flex space-x-2 sm:space-x-4 items-end h-32 sm:h-40 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-200">
              {userGrowth.map((data) => (
                <div key={data.month} className="flex flex-col items-center group min-w-[48px]">
                  <div
                    className="bg-gradient-to-t from-[#2563eb] to-[#60a5fa] w-6 sm:w-8 rounded-lg shadow transition-all duration-200 group-hover:scale-110 group-hover:shadow-md"
                    style={{ height: `${data.users * 8}px` }}
                  ></div>
                  <span className="mt-2 text-xs sm:text-sm text-[#2563eb] font-semibold">{data.month}</span>
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
