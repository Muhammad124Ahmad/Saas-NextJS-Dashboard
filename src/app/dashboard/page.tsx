
import React from "react";
import { mockStats, mockChartData, mockTableData } from "../../data/mockDashboardData";
import RecentActivity from "../../components/RecentActivity";

export default function DashboardPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-[#222] tracking-tight">Dashboard</h1>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {mockStats.map((stat: { label: string; value: string | number }) => (
          <div
            key={stat.label}
            className="bg-white border border-[#e5eaf2] rounded-xl shadow-sm p-6 text-center transition-transform duration-200 hover:scale-105 hover:shadow-md"
          >
            <div className="text-2xl font-bold text-[#2563eb] mb-1">{stat.value}</div>
            <div className="text-base text-[#222] font-medium tracking-tight">{stat.label}</div>
          </div>
        ))}
      </div>
      {/* Chart (placeholder) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white border border-[#e5eaf2] rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4 text-[#2563eb]">User Growth (Mock Chart)</h2>
          <div className="flex space-x-4 items-end h-40">
            {mockChartData.map((data: { month: string; users: number }) => (
              <div key={data.month} className="flex flex-col items-center group">
                <div
                  className="bg-gradient-to-t from-[#2563eb] to-[#60a5fa] w-8 rounded-lg shadow transition-all duration-200 group-hover:scale-110 group-hover:shadow-md"
                  style={{ height: `${data.users / 10}px` }}
                ></div>
                <span className="mt-2 text-sm text-[#2563eb] font-semibold">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
        <RecentActivity />
      </div>
      {/* Table */}
      <div className="bg-white border border-[#e5eaf2] rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4 text-[#2563eb]">Customers</h2>
        <table className="w-full text-left text-[#222]">
          <thead>
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Plan</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockTableData.map(
              (row: {
                id: number;
                name: string;
                plan: string;
                status: string;
              }) => (
                <tr key={row.id} className="border-t hover:bg-[#f3f6fd] transition-all duration-150">
                  <td className="py-2 font-semibold">{row.name}</td>
                  <td className="py-2">{row.plan}</td>
                  <td className="py-2">{row.status}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
