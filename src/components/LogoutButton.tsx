"use client";
import { supabase } from "../supabaseClient";

export default function LogoutButton() {
  return (
    <button
      onClick={async () => { await supabase.auth.signOut(); window.location.reload(); }}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}
