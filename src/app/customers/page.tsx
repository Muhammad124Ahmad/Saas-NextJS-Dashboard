import React, { useState } from 'react';
import { mockTableData } from '../../data/mockDashboardData';
import { StatusBadge } from '../../components/StatusBadge';

export default function CustomersPage() {
  const [customers, setCustomers] = useState(mockTableData);
  const [newCustomer, setNewCustomer] = useState({ name: '', plan: '', status: 'Active' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.plan) return;
    setCustomers([
      ...customers,
      { id: Date.now(), ...newCustomer },
    ]);
    setNewCustomer({ name: '', plan: '', status: 'Active' });
  };

  const handleDelete = (id: number) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Customers</h1>
      {/* Add Customer Form */}
      <form className="mb-8 flex gap-4 items-end bg-white p-4 rounded shadow" onSubmit={handleAdd}>
        <input
          className="border p-2 rounded w-40 focus:outline-blue-400"
          placeholder="Name"
          value={newCustomer.name}
          onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
        />
        <input
          className="border p-2 rounded w-32 focus:outline-blue-400"
          placeholder="Plan"
          value={newCustomer.plan}
          onChange={(e) => setNewCustomer({ ...newCustomer, plan: e.target.value })}
        />
        <select
          className="border p-2 rounded focus:outline-blue-400"
          value={newCustomer.status}
          onChange={(e) => setNewCustomer({ ...newCustomer, status: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded shadow">Add</button>
      </form>
      {/* Customers Table */}
      <div className="bg-white rounded shadow p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-2">Name</th>
              <th className="py-2 px-2">Plan</th>
              <th className="py-2 px-2">Status</th>
              <th className="py-2 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((row) => (
              <tr key={row.id} className="border-t hover:bg-gray-50 transition">
                <td className="py-2 px-2 font-medium">{row.name}</td>
                <td className="py-2 px-2">{row.plan}</td>
                <td className="py-2 px-2"><StatusBadge status={row.status} /></td>
                <td className="py-2 px-2">
                  <button
                    className="text-red-500 hover:text-red-700 font-semibold px-2 py-1 rounded hover:bg-red-50 transition"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
