import { supabase } from "../supabaseClient";
import React from "react";

export default function LoginLogoutButton() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  React.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setLoggedIn(!!user);
    });
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session?.user);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleSignUp = () => {
    window.location.href = "/signup";
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return loggedIn ? (
    <button onClick={handleLogout} className="px-4 py-2 text-[#2563eb] hover:bg-[#f3f6fd] rounded font-medium">Logout</button>
  ) : (
    <button onClick={handleSignUp} className="px-4 py-2 text-[#2563eb] hover:bg-[#f3f6fd] rounded font-medium">Sign Up</button>
  );
}
