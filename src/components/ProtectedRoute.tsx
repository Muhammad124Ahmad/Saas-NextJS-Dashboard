"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabaseClient";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user && mounted) {
          setIsLoggedIn(false);
          router.push("/login?session=expired");
        } else if (mounted) {
          setIsLoggedIn(true);
        }
      } catch (err: any) {
        // Handle Supabase AuthApiError for invalid refresh token
        if (err?.message?.includes("Invalid Refresh Token")) {
          await supabase.auth.signOut();
          setIsLoggedIn(false);
          router.push("/login?session=expired");
        } else {
          setIsLoggedIn(false);
          router.push("/login");
        }
      }
    })();
    return () => { mounted = false; };
  }, [router]);

  if (isLoggedIn === null) return <div className="p-8 text-center">Checking authentication...</div>;
  if (!isLoggedIn) return null;
  return <>{children}</>;
}
