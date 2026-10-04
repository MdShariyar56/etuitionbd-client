"use client";

import AuthShell from "@/components/AuthShell";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { alertError, alertSuccess } from "@/lib/alert";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { dashboardPath, useAuth } from "@/context/AuthContext";
import { authMessage } from "@/lib/authErrors";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, login, googleLogin, resetPassword } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  const go = (u) => {
    const next = new URLSearchParams(window.location.search).get("next");
    router.replace(next && next.startsWith("/") ? next : dashboardPath(u.role));
  };

  useEffect(() => {
    if (!loading && user && !busy) go(user);
  }, [loading, user]);

  const run = async (fn) => {
    setBusy(true);
    try {
      const u = await fn();
      alertSuccess(`Welcome back, ${u.name}!`);
      go(u);
    } catch (err) {
      alertError(authMessage(err));
      setBusy(false);
    }
  };

  const forgot = async () => {
    const email = form.email.trim();
    if (!email) return alertError("Enter your email address first.");
    setBusy(true);
    try {
      await resetPassword(email);
      alertSuccess("If an account exists for this email, a password reset link has been sent.");
    } catch (err) {
      alertError(authMessage(err));
    }
    setBusy(false);
  };

  const submit = (e) => {
    e.preventDefault();
    run(() => login(form.email.trim(), form.password));
  };

  return (
    <AuthShell title="Welcome back!" sub="Login to your account to continue">

        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="form-control w-full">
            <span className="label-text mb-1 font-semibold">Email address</span>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Enter your email" className="input input-bordered w-full" />
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-1 font-semibold">Password</span>
            <div className="relative">
              <input type={show ? "text" : "password"} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Enter your password" className="input input-bordered w-full pr-10" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50" aria-label="Toggle password">
                {show ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>
          <div className="text-right">
            <button type="button" onClick={forgot} disabled={busy} className="text-sm font-semibold text-primary hover:underline">
              Forgot password?
            </button>
          </div>
          <button className="btn btn-primary shine w-full rounded-full shadow-lg shadow-primary/25" disabled={busy}>
            {busy ? <span className="loading loading-spinner loading-sm" /> : "Login"}
          </button>
        </form>

        <div className="divider text-xs text-base-content/50">or continue with</div>
        <button onClick={() => run(googleLogin)} disabled={busy} className="btn btn-outline w-full rounded-full">
          <FcGoogle className="text-xl" /> Google Login
        </button>

        <p className="mt-6 text-center text-sm text-base-content/70">
          Don&apos;t have an account? <Link href="/register" className="font-bold text-primary">Register</Link>
        </p>
    </AuthShell>
  );
}
