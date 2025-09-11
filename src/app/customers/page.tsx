import React, { useState } from 'react';
import { mockTableData } from '../../data/mockDashboardData';
import { StatusBadge } from '../../components/StatusBadge';

interface Customer {
  id: number;
  name: string;
  plan: string;
  status: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockTableData);
  const [newCustomer, setNewCustomer] = useState({ name: '', plan: '', status: 'Active' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ name: '', plan: '', status: 'Active' });

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

  const handleEdit = (customer: Customer) => {
    setEditingId(customer.id);
    setEditData({ name: customer.name, plan: customer.plan, status: customer.status });
  };

  const handleEditSave = (id: number) => {
    setCustomers(customers.map((c) =>
      c.id === id ? { ...c, ...editData } : c
    ));
    setEditingId(null);
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Customers</h1>
      {/* Add Customer Form */}
      <form className="mb-8 flex gap-4 items-end bg-white p-4 rounded shadow" onSubmit={handleAdd}>
        <input
          className="border p-2 rounded w-40 focus:outline-blue-400 text-gray-900 placeholder-gray-500"
          placeholder="Name"
          value={newCustomer.name}
          onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
        />
        <input
          className="border p-2 rounded w-32 focus:outline-blue-400 text-gray-900 placeholder-gray-500"
          placeholder="Plan"
          value={newCustomer.plan}
          onChange={(e) => setNewCustomer({ ...newCustomer, plan: e.target.value })}
        />
        <select
          className="border p-2 rounded focus:outline-blue-400 text-gray-900"
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
        <table className="w-full text-left text-gray-900">
          <thead>
            <tr className="bg-gray-50 text-gray-800">
              <th className="py-2 px-2">Name</th>
              <th className="py-2 px-2">Plan</th>
              <th className="py-2 px-2">Status</th>
              <th className="py-2 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((row) => (
              <tr key={row.id} className="border-t hover:bg-gray-50 transition">
                {editingId === row.id ? (
                  <>
                    <td className="py-2 px-2 font-medium">
                      <input
                        className="border p-1 rounded w-32 text-gray-900"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        className="border p-1 rounded w-24 text-gray-900"
                        value={editData.plan}
                        onChange={(e) => setEditData({ ...editData, plan: e.target.value })}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <select
                        className="border p-1 rounded text-gray-900"
                        value={editData.status}
                        onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </td>
                    <td className="py-2 px-2 flex gap-2">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                        onClick={() => handleEditSave(row.id)}
                        type="button"
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded"
                        onClick={() => setEditingId(null)}
                        type="button"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-2 font-medium">{row.name}</td>
                    <td className="py-2 px-2">{row.plan}</td>
                    <td className="py-2 px-2"><StatusBadge status={row.status} /></td>
                    <td className="py-2 px-2 flex gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-800 font-semibold px-2 py-1 rounded hover:bg-blue-50 transition"
                        onClick={() => handleEdit(row)}
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 font-semibold px-2 py-1 rounded hover:bg-red-50 transition"
                        onClick={() => handleDelete(row.id)}
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
