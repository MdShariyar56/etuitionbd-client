"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { dashboardPath, useAuth } from "@/context/AuthContext";
import { authMessage } from "@/lib/authErrors";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, login, googleLogin } = useAuth();
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
      toast.success(`Welcome back, ${u.name}!`);
      go(u);
    } catch (err) {
      toast.error(authMessage(err));
      setBusy(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    run(() => login(form.email.trim(), form.password));
  };

  return (
    <div className="hero-bg grid min-h-[calc(100vh-4rem)] place-items-center px-4 py-12">
      <div className="w-full max-w-md rounded-box border border-base-300 bg-base-100 p-8 shadow-xl">
        <h1 className="text-center text-2xl font-extrabold text-neutral">Welcome Back!</h1>
        <p className="section-sub mt-1 text-center text-sm">Login to your account</p>

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
          <button className="btn btn-primary w-full" disabled={busy}>
            {busy ? <span className="loading loading-spinner loading-sm" /> : "Login"}
          </button>
        </form>

        <div className="divider text-xs text-base-content/50">or continue with</div>
        <button onClick={() => run(googleLogin)} disabled={busy} className="btn btn-outline w-full">
          <FcGoogle className="text-xl" /> Google Login
        </button>

        <p className="mt-6 text-center text-sm text-base-content/70">
          Don&apos;t have an account? <Link href="/register" className="font-bold text-primary">Register</Link>
        </p>
      </div>
    </div>
  );
}
