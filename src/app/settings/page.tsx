"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    theme: "light",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        setError("Could not get user info");
        setLoading(false);
        return;
      }
      // Fetch profile from 'profiles' table
      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("name, email, theme")
        .eq("id", user.id)
        .single();
      if (profileError) {
        // If not found, create a new profile row for this user
        if (profileError.code === 'PGRST116' || profileError.message.includes('No rows')) {
          const { error: insertError } = await supabase.from('profiles').insert([
            { id: user.id, email: user.email, name: '', theme: 'light' }
          ]);
          if (insertError) {
            setError("Could not create profile: " + insertError.message);
            setLoading(false);
            return;
          }
          setProfile({ name: '', email: user.email || '', theme: 'light' });
          setLoading(false);
          return;
        } else {
          setError("Could not fetch profile");
          setLoading(false);
          return;
        }
      }
      setProfile({
        name: data.name || "",
        email: data.email || user.email || "",
        theme: data.theme || "light",
      });
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      setError("Could not get user info");
      setLoading(false);
      return;
    }
    // Update profile in 'profiles' table
    const { error: updateError } = await supabase
      .from("profiles")
      .upsert({ id: user.id, name: profile.name, email: profile.email, theme: profile.theme }, { onConflict: "id" });
    if (updateError) {
      setError("Could not update profile: " + updateError.message);
      setLoading(false);
      return;
    }
    setMessage("Settings saved");
    setLoading(false);
  };

  return (
    <ProtectedRoute>
      <main className="p-4 sm:p-6 md:p-8 flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-black w-full max-w-md text-center sm:text-left">Settings</h1>
        <form className="bg-white p-3 xs:p-4 sm:p-6 rounded shadow w-full max-w-md" onSubmit={handleSubmit}>
          {error && <div className="mb-4 text-red-600">{error}</div>}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-800">Name</label>
            <input
              className="border p-2 rounded w-full text-gray-900"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-medium text-gray-800">Theme</label>
            <select
              className="border p-2 rounded w-full text-gray-900"
              name="theme"
              value={profile.theme}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow w-full sm:w-auto" disabled={loading}>
            {loading ? "Saving..." : "Save Settings"}
          </button>
          {message && <div className="mt-4 text-green-600">{message}</div>}
        </form>
      </main>
    </ProtectedRoute>
  );
}
