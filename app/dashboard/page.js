"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/components/Loading";
import { dashboardPath, useAuth } from "@/context/AuthContext";

export default function DashboardIndex() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) router.replace(dashboardPath(user.role));
  }, [user, router]);
  return <Loading />;
}
