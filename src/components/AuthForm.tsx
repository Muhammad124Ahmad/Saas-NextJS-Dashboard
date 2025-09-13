"use client";
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useRouter } from "next/navigation";

export default function AuthForm({ mode = "login" }: { mode?: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    if (mode === "login") {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else {
        // On every login, upsert the user's profile row
        if (data?.user) {
          const { error: profileError } = await supabase.from('profiles').upsert([
            { id: data.user.id, email: data.user.email, name: '' }
          ], { onConflict: 'id' });
          // Upsert into users table as well
          const { error: userError } = await supabase.from('users').upsert([
            { id: data.user.id, email: data.user.email }
          ], { onConflict: 'id' });
          if (profileError) {
            setError('Profile upsert error: ' + profileError.message);
            setLoading(false);
            return;
          }
          if (userError) {
            setError('User upsert error: ' + userError.message);
            setLoading(false);
            return;
          }
        }
        setSuccess("Logged in!");
        router.push("/dashboard");
      }
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else {
        // Insert profile row and users row after successful signup
        if (data?.user) {
          await supabase.from('profiles').insert([
            { id: data.user.id, email: data.user.email, name: '' }
          ]);
          await supabase.from('users').insert([
            { id: data.user.id, email: data.user.email }
          ]);
        }
        setSuccess("Check your email for confirmation!");
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-sm mx-auto mt-12 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-2 text-[#2563eb]">{mode === "login" ? "Login" : "Sign Up"}</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded w-full"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded w-full"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-[#2563eb] text-white py-2 rounded font-semibold hover:bg-[#174ea6] transition"
        disabled={loading}
      >
        {loading ? "Loading..." : mode === "login" ? "Login" : "Sign Up"}
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
    </form>
  );
}
