"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

interface Payment {
  id: number;
  user_id: string;
  amount: number;
  created_at: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const { data, error } = await supabase
      .from("payments")
      .select("id, user_id, amount, created_at")
      .order("created_at", { ascending: false });
    if (!error && data) setPayments(data as Payment[]);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!userId || !amount) {
      setError("User ID and Amount are required.");
      return;
    }
    const { error } = await supabase.from("payments").insert([
      { user_id: userId, amount: parseFloat(amount) },
    ]);
    if (error) {
      setError(error.message);
      return;
    }
    setSuccess("Payment added!");
    setUserId("");
    setAmount("");
    fetchPayments();
  };

  return (
    <main className="p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6 text-[#2563eb]">Payments</h1>
      <form onSubmit={handleAdd} className="mb-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-end bg-white border border-[#e5eaf2] p-4 rounded-xl shadow-sm">
        <input
          className="border p-2 rounded w-full sm:w-64"
          placeholder="User ID (uuid)"
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
        <input
          className="border p-2 rounded w-full sm:w-32"
          placeholder="Amount"
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow w-full sm:w-auto">Add Payment</button>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
      </form>
      <div className="bg-white border border-[#e5eaf2] rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-bold mb-4 text-[#2563eb]">Recent Payments</h2>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-[#f3f6fd] text-[#2563eb]">
              <th className="py-2 px-2">ID</th>
              <th className="py-2 px-2">User ID</th>
              <th className="py-2 px-2">Amount</th>
              <th className="py-2 px-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="py-2 px-2">{p.id}</td>
                <td className="py-2 px-2">{p.user_id}</td>
                <td className="py-2 px-2">${p.amount.toFixed(2)}</td>
                <td className="py-2 px-2">{new Date(p.created_at).toLocaleString()}</td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr><td colSpan={4} className="py-2 text-gray-500">No payments yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
