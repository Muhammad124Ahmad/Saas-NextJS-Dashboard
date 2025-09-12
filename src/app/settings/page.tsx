"use client";
import React, { useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    theme: "light",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Settings saved (mock)");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <ProtectedRoute>
  <main className="p-4 sm:p-6 md:p-8">
  <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-black">Settings</h1>
  <form className="bg-white p-4 sm:p-6 rounded shadow max-w-md w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-800">Name</label>
            <input
              className="border p-2 rounded w-full text-gray-900"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-800">Email</label>
            <input
              className="border p-2 rounded w-full text-gray-900"
              name="email"
              value={profile.email}
              onChange={handleChange}
              type="email"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-medium text-gray-800">Theme</label>
            <select
              className="border p-2 rounded w-full text-gray-900"
              name="theme"
              value={profile.theme}
              onChange={handleChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow w-full sm:w-auto">
            Save Settings
          </button>
          {message && <div className="mt-4 text-green-600">{message}</div>}
        </form>
      </main>
    </ProtectedRoute>
  );
}
