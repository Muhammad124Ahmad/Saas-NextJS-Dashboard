"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabaseClient";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user && mounted) {
        router.push("/login");
        setIsLoggedIn(false);
      } else if (mounted) {
        setIsLoggedIn(true);
      }
    });
    return () => { mounted = false; };
  }, [router]);

  if (isLoggedIn === null) return <div className="p-8 text-center">Checking authentication...</div>;
  if (!isLoggedIn) return null;
  return <>{children}</>;
}
