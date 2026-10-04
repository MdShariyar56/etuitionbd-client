"use client";

import AuthShell from "@/components/AuthShell";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { alertError, alertSuccess } from "@/lib/alert";
import { FcGoogle } from "react-icons/fc";
import { FaUserGraduate, FaChalkboardUser } from "react-icons/fa6";
import { dashboardPath, useAuth } from "@/context/AuthContext";
import { authMessage } from "@/lib/authErrors";

const roles = [
  { value: "student", label: "Student", Icon: FaUserGraduate, hint: "Post tuitions & hire tutors" },
  { value: "tutor", label: "Tutor", Icon: FaChalkboardUser, hint: "Apply & earn from tuitions" },
];

export default function RegisterPage() {
  const router = useRouter();
  const { user, loading, register, googleLogin } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", photoURL: "", role: "student" });
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    if (!loading && user && !busy) router.replace(dashboardPath(user.role));
  }, [loading, user, busy, router]);

  const submit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return alertError("Password must be at least 6 characters.");
    if (!/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password)) {
      return alertError("Password needs both uppercase and lowercase letters.");
    }
    if (!/^(\+?88)?01[3-9]\d{8}$/.test(form.phone.replace(/[\s-]/g, ""))) {
      return alertError("Enter a valid Bangladeshi phone number.");
    }
    setBusy(true);
    try {
      const u = await register({ ...form, email: form.email.trim(), name: form.name.trim() });
      alertSuccess("Account created!");
      router.replace(dashboardPath(u.role));
    } catch (err) {
      alertError(authMessage(err));
      setBusy(false);
    }
  };

  const google = async () => {
    setBusy(true);
    try {
      const u = await googleLogin();
      router.replace(dashboardPath(u.role));
    } catch (err) {
      alertError(authMessage(err));
      setBusy(false);
    }
  };

  return (
    <AuthShell title="Create your account" sub="Join E-TuitionBD as a student or tutor" wide>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {roles.map(({ value, label, Icon, hint }) => (
              <button
                type="button"
                key={value}
                onClick={() => setForm({ ...form, role: value })}
                className={`rounded-2xl border-2 p-3 text-left transition-all duration-300 hover:-translate-y-0.5 ${form.role === value ? "border-primary bg-primary/10 shadow-lg shadow-primary/15" : "border-base-300 hover:border-primary/40"}`}
              >
                <Icon className="text-xl text-primary" />
                <p className="mt-1 font-bold text-neutral">{label}</p>
                <p className="text-xs text-base-content/60">{hint}</p>
              </button>
            ))}
          </div>
          <input required value={form.name} onChange={set("name")} placeholder="Full name" className="input input-bordered w-full" />
          <input type="email" required value={form.email} onChange={set("email")} placeholder="Email address" className="input input-bordered w-full" />
          <input required value={form.phone} onChange={set("phone")} placeholder="Phone (01XXXXXXXXX)" className="input input-bordered w-full" />
          <input type="url" value={form.photoURL} onChange={set("photoURL")} placeholder="Photo URL (optional)" className="input input-bordered w-full" />
          <input type="password" required value={form.password} onChange={set("password")} placeholder="Password (min 6, upper & lower case)" className="input input-bordered w-full" />
          <button className="btn btn-primary shine w-full rounded-full shadow-lg shadow-primary/25" disabled={busy}>
            {busy ? <span className="loading loading-spinner loading-sm" /> : "Create Account"}
          </button>
        </form>

        <div className="divider text-xs text-base-content/50">or</div>
        <button onClick={google} disabled={busy} className="btn btn-outline w-full rounded-full">
          <FcGoogle className="text-xl" /> Continue with Google
        </button>
        <p className="mt-6 text-center text-sm text-base-content/70">
          Already have an account? <Link href="/login" className="font-bold text-primary">Login</Link>
        </p>
    </AuthShell>
  );
}
