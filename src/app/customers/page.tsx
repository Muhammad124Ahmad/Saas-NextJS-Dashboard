"use client";
import React, { useState, useEffect } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { supabase } from "../../supabaseClient";
import { StatusBadge } from "../../components/StatusBadge";
interface Customer {
  id: string;
  name: string;
  plan: string;
  status: string;
  created_at?: string;
}


interface PaymentFormState {
  [customerId: string]: {
    show: boolean;
    amount: string;
    error: string;
    success: string;
  };
}

export default function CustomersPage() {

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    plan: "",
    status: "Active",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    name: "",
    plan: "",
    status: "Active",
  });
  const [addError, setAddError] = useState<string>("");
  const [paymentForm, setPaymentForm] = useState<PaymentFormState>({});
  // Handle payment form open/close and submit
  const handleShowPayment = (customerId: string) => {
    setPaymentForm((prev) => ({
      ...prev,
      [customerId]: { show: true, amount: "", error: "", success: "" },
    }));
  };
  const handleHidePayment = (customerId: string) => {
    setPaymentForm((prev) => ({
      ...prev,
      [customerId]: { show: false, amount: "", error: "", success: "" },
    }));
  };
  const handlePaymentChange = (customerId: string, value: string) => {
    setPaymentForm((prev) => ({
      ...prev,
      [customerId]: { ...prev[customerId], amount: value },
    }));
  };
  const handleAddPayment = async (customerId: string) => {
    const amount = paymentForm[customerId]?.amount;
    if (!amount || isNaN(Number(amount))) {
      setPaymentForm((prev) => ({
        ...prev,
        [customerId]: { ...prev[customerId], error: "Enter a valid amount.", success: "" },
      }));
      return;
    }
    const { error } = await supabase.from("payments").insert([
      { user_id: customerId, amount: parseFloat(amount) },
    ]);
    if (error) {
      setPaymentForm((prev) => ({
        ...prev,
        [customerId]: { ...prev[customerId], error: error.message, success: "" },
      }));
      return;
    }
    setPaymentForm((prev) => ({
      ...prev,
      [customerId]: { ...prev[customerId], error: "", success: "Payment added!" },
    }));

    // Log activity
    const customer = customers.find((c) => c.id === customerId);
    await supabase.from('activities').insert([
      { description: `Added payment for customer: ${customer ? customer.name : customerId} ($${parseFloat(amount).toFixed(2)})` }
    ]);
  };

  // Fetch customers from Supabase
  useEffect(() => {
    const fetchCustomers = async () => {
      const { data, error } = await supabase
        .from("customers")
        .select("id, name, plan, status, created_at")
        .order("created_at", { ascending: false });
      console.log("Fetch customers:", { data, error });
      if (error) {
        setAddError("Fetch error: " + error.message);
      }
      if (!error && data) setCustomers(data as Customer[]);
    };
    fetchCustomers();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError("");
    if (!newCustomer.name || !newCustomer.plan) {
      setAddError("Name and Plan are required.");
      return;
    }
    const { data, error } = await supabase
      .from("customers")
      .insert([{ ...newCustomer }])
      .select();
    if (error) {
      setAddError(error.message);
      console.error("Supabase insert error:", error);
      return;
    }
    if (data) setCustomers([data[0], ...customers]);
    setNewCustomer({ name: "", plan: "", status: "Active" });

    // Log activity
    if (data && data[0]) {
      await supabase.from('activities').insert([
        { description: `Added customer: ${data[0].name}` }
      ]);
    }
  };

  const handleDelete = async (id: string) => {
    const customer = customers.find((c) => c.id === id);
    const { error } = await supabase.from("customers").delete().eq("id", id);
    if (!error) {
      setCustomers(customers.filter((c) => c.id !== id));
      // Log activity
      if (customer) {
        await supabase.from('activities').insert([
          { description: `Deleted customer: ${customer.name}` }
        ]);
      }
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditingId(customer.id);
    setEditData({
      name: customer.name,
      plan: customer.plan,
      status: customer.status,
    });
  };


  const handleEditSave = async (id: string) => {
    const { data, error } = await supabase
      .from("customers")
      .update(editData)
      .eq("id", id)
      .select();
    if (!error && data) {
      setCustomers(customers.map((c) => (c.id === id ? { ...c, ...data[0] } : c)));
      // Log activity
      await supabase.from('activities').insert([
        { description: `Edited customer: ${data[0].name}` }
      ]);
    }
    setEditingId(null);
  };

  return (
    <ProtectedRoute>
  <main className="p-4 sm:p-6 md:p-8">
  <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-[#222] tracking-tight">Customers</h1>
        {/* Add Customer Form */}
        <form
          className="mb-8 sm:mb-10 flex flex-col sm:flex-row gap-4 items-stretch sm:items-end bg-white border border-[#e5eaf2] p-4 sm:p-6 rounded-xl shadow-sm"
          onSubmit={handleAdd}
        >
          <input
            className="border p-2 rounded w-full sm:w-40 focus:outline-blue-400 text-gray-900 placeholder-gray-500"
            placeholder="Name"
            value={newCustomer.name}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, name: e.target.value })
            }
          />
          <input
            className="border p-2 rounded w-full sm:w-32 focus:outline-blue-400 text-gray-900 placeholder-gray-500"
            placeholder="Plan"
            value={newCustomer.plan}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, plan: e.target.value })
            }
          />
          <select
            className="border p-2 rounded w-full sm:w-auto focus:outline-blue-400 text-gray-900"
            value={newCustomer.status}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, status: e.target.value })
            }
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded shadow w-full sm:w-auto"
          >
            Add
          </button>
  {addError && <div className="text-red-600 mb-2">{addError}</div>}
  </form>
        {/* Customers Table */}
        <div className="bg-white border border-[#e5eaf2] rounded-xl shadow-sm p-2 sm:p-6">
          {/* Responsive Table: show as cards on mobile, table on md+ */}
          <div className="block md:hidden space-y-4">
            {customers.map((row) => (
              <div key={row.id} className="border rounded-lg p-3 flex flex-col gap-2 bg-[#f7fafd]">
                {editingId === row.id ? (
                  <>
                    <div>
                      <span className="block text-xs text-black mb-1">Name</span>
                      <input
                        className="border p-1 rounded w-full text-gray-900"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <span className="block text-xs text-black mb-1">Plan</span>
                      <input
                        className="border p-1 rounded w-full text-gray-900"
                        value={editData.plan}
                        onChange={(e) => setEditData({ ...editData, plan: e.target.value })}
                      />
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">Status</span>
                      <select
                        className="border p-1 rounded w-full text-gray-900"
                        value={editData.status}
                        onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded w-full"
                        onClick={() => handleEditSave(row.id)}
                        type="button"
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded w-full"
                        onClick={() => setEditingId(null)}
                        type="button"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="block text-xs text-black">Name</span>
                      <span className="font-medium text-black">{row.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="block text-xs text-black">Plan</span>
                      <span className="text-black font-medium">{row.plan}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="block text-xs text-gray-500">Status</span>
                      <StatusBadge status={row.status} />
                    </div>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <button
                        className="text-blue-600 hover:text-blue-800 font-semibold px-2 py-1 rounded hover:bg-blue-50 transition w-full"
                        onClick={() => handleEdit(row)}
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 font-semibold px-2 py-1 rounded hover:bg-red-50 transition w-full"
                        onClick={() => handleDelete(row.id)}
                        type="button"
                      >
                        Delete
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800 font-semibold px-2 py-1 rounded hover:bg-green-50 transition w-full"
                        onClick={() => handleShowPayment(row.id)}
                        type="button"
                      >
                        Add Payment
                      </button>
                    </div>
                    {paymentForm[row.id]?.show && (
                      <div className="mt-2 bg-gray-50 p-2 rounded border">
                        <input
                          className="border p-1 rounded w-24 mr-2"
                          placeholder="Amount"
                          type="number"
                          min="0"
                          step="0.01"
                          value={paymentForm[row.id]?.amount || ""}
                          onChange={e => handlePaymentChange(row.id, e.target.value)}
                        />
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                          onClick={() => handleAddPayment(row.id)}
                          type="button"
                        >
                          Save
                        </button>
                        <button
                          className="ml-2 text-gray-600 hover:text-gray-900"
                          onClick={() => handleHidePayment(row.id)}
                          type="button"
                        >
                          Cancel
                        </button>
                        {paymentForm[row.id]?.error && <div className="text-red-600 text-xs mt-1">{paymentForm[row.id].error}</div>}
                        {paymentForm[row.id]?.success && <div className="text-green-600 text-xs mt-1">{paymentForm[row.id].success}</div>}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="hidden md:block">
            <table className="w-full text-left text-[#222] text-sm">
              <thead>
                <tr className="bg-[#f3f6fd] text-[#2563eb]">
                  <th className="py-2 px-2">Name</th>
                  <th className="py-2 px-2">Plan</th>
                  <th className="py-2 px-2">Status</th>
                  <th className="py-2 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((row) => (
                  <tr key={row.id} className="border-t hover:bg-[#f3f6fd] transition-all duration-150">
                    {editingId === row.id ? (
                      <>
                        <td className="py-2 px-2 font-medium">
                          <input
                            className="border p-1 rounded w-full sm:w-32 text-gray-900"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            className="border p-1 rounded w-full sm:w-24 text-gray-900"
                            value={editData.plan}
                            onChange={(e) => setEditData({ ...editData, plan: e.target.value })}
                          />
                        </td>
                        <td className="py-2 px-2">
                          <select
                            className="border p-1 rounded w-full sm:w-auto text-gray-900"
                            value={editData.status}
                            onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </td>
                        <td className="py-2 px-2 flex flex-col sm:flex-row gap-2">
                          <button
                            className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded w-full sm:w-auto"
                            onClick={() => handleEditSave(row.id)}
                            type="button"
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded w-full sm:w-auto"
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
                        <td className="py-2 px-2">
                          <StatusBadge status={row.status} />
                        </td>
                        <td className="py-2 px-2 flex flex-col sm:flex-row gap-2">
                          <button
                            className="text-blue-600 hover:text-blue-800 font-semibold px-2 py-1 rounded hover:bg-blue-50 transition w-full sm:w-auto"
                            onClick={() => handleEdit(row)}
                            type="button"
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700 font-semibold px-2 py-1 rounded hover:bg-red-50 transition w-full sm:w-auto"
                            onClick={() => handleDelete(row.id)}
                            type="button"
                          >
                            Delete
                          </button>
                          <button
                            className="text-green-600 hover:text-green-800 font-semibold px-2 py-1 rounded hover:bg-green-50 transition w-full sm:w-auto"
                            onClick={() => handleShowPayment(row.id)}
                            type="button"
                          >
                            Add Payment
                          </button>
                          {paymentForm[row.id]?.show && (
                            <div className="mt-2 bg-gray-50 p-2 rounded border">
                              <input
                                className="border p-1 rounded w-24 mr-2"
                                placeholder="Amount"
                                type="number"
                                min="0"
                                step="0.01"
                                value={paymentForm[row.id]?.amount || ""}
                                onChange={e => handlePaymentChange(row.id, e.target.value)}
                              />
                              <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                                onClick={() => handleAddPayment(row.id)}
                                type="button"
                              >
                                Save
                              </button>
                              <button
                                className="ml-2 text-gray-600 hover:text-gray-900"
                                onClick={() => handleHidePayment(row.id)}
                                type="button"
                              >
                                Cancel
                              </button>
                              {paymentForm[row.id]?.error && <div className="text-red-600 text-xs mt-1">{paymentForm[row.id].error}</div>}
                              {paymentForm[row.id]?.success && <div className="text-green-600 text-xs mt-1">{paymentForm[row.id].success}</div>}
                            </div>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
