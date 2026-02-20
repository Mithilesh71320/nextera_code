"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthGate({ requireAuth, children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      const hasSession = !!data?.session;

      if (!isMounted) return;

      if (requireAuth && !hasSession) {
        router.replace("/admin/login/signin");
        return;
      }

      if (!requireAuth && hasSession) {
        router.replace("/admin/dashboard");
        return;
      }

      setChecking(false);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (requireAuth && !session) {
        router.replace("/admin/login/signin");
      }

      if (!requireAuth && session) {
        router.replace("/admin/dashboard");
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [requireAuth, router]);

  if (checking) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <p className="text-sm text-gray-500">Checking session...</p>
      </main>
    );
  }

  return children;
}
