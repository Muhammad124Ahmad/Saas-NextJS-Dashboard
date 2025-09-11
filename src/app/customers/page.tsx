import React, { useState } from 'react';
import { mockTableData } from '../../data/mockDashboardData';

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
      <form className="mb-8 flex gap-4 items-end" onSubmit={handleAdd}>
        <input
          className="border p-2 rounded"
          placeholder="Name"
          value={newCustomer.name}
          onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Plan"
          value={newCustomer.plan}
          onChange={(e) => setNewCustomer({ ...newCustomer, plan: e.target.value })}
        />
        <select
          className="border p-2 rounded"
          value={newCustomer.status}
          onChange={(e) => setNewCustomer({ ...newCustomer, status: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </form>
      {/* Customers Table */}
      <div className="bg-white rounded shadow p-6">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Plan</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="py-2">{row.name}</td>
                <td className="py-2">{row.plan}</td>
                <td className="py-2">{row.status}</td>
                <td className="py-2">
                  <button
                    className="text-red-500 hover:underline"
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
