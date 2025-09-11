import React from "react";
import {
  mockStats,
  mockChartData,
  mockTableData,
} from "../../data/mockDashboardData";

export default function DashboardPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {mockStats.map((stat: { label: string; value: string | number }) => (
          <div
            key={stat.label}
            className="bg-white rounded shadow p-4 text-center"
          >
            <div className="text-xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-base text-gray-800">{stat.label}</div>
          </div>
        ))}
      </div>
      {/* Chart (placeholder) */}
      <div className="bg-white rounded shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          User Growth (Mock Chart)
        </h2>
        <div className="flex space-x-4">
          {mockChartData.map((data: { month: string; users: number }) => (
            <div key={data.month} className="flex flex-col items-center">
              <div
                className="bg-blue-500 w-8"
                style={{ height: `${data.users / 10}px` }}
              ></div>
              <span className="mt-2 text-sm text-gray-800">{data.month}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Table */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Customers</h2>
        <table className="w-full text-left text-gray-900">
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
                <tr key={row.id} className="border-t">
                  <td className="py-2">{row.name}</td>
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
