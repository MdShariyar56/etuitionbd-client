"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./Loading";
import { useAuth } from "@/context/AuthContext";

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [loading, user, pathname, router]);

  if (loading || !user) return <Loading label="Checking your account" />;
  return children;
}
