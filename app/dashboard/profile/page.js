"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import Avatar from "@/components/Avatar";
import PageHeader from "@/components/dashboard/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { api } from "@/lib/api";

export default function ProfileSettingsPage() {
  const { user, setUser } = useAuth();
  const tutor = user.role === "tutor";
  const [form, setForm] = useState({
    name: user.name || "",
    photoURL: user.photoURL || "",
    phone: user.phone || "",
    subjects: Array.isArray(user.subjects) ? user.subjects.join(", ") : user.subjects || "",
    location: user.location || "",
    qualification: user.qualification || "",
    experience: user.experience || "",
    bio: user.bio || "",
    ratePerHour: user.ratePerHour || "",
  });
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = { name: form.name, photoURL: form.photoURL, phone: form.phone };
      if (tutor) {
        Object.assign(body, {
          subjects: form.subjects.split(",").map((s) => s.trim()).filter(Boolean),
          location: form.location,
          qualification: form.qualification,
          experience: form.experience,
          bio: form.bio,
          ratePerHour: form.ratePerHour,
        });
      }
      const { user: updated } = await api("/users/me", { method: "PATCH", body });
      setUser(updated);
      if (auth.currentUser) await updateProfile(auth.currentUser, { displayName: updated.name, photoURL: updated.photoURL || null });
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const Input = ({ label, k, ...rest }) => (
    <label className="form-control w-full">
      <span className="label-text mb-1 font-semibold">{label}</span>
      <input value={form[k]} onChange={set(k)} className="input input-bordered w-full" {...rest} />
    </label>
  );

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Profile Settings" sub="Update your personal information." />
      <form onSubmit={save} className="space-y-5 rounded-box border border-base-300 bg-base-100 p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <Avatar src={form.photoURL} name={form.name} size="size-20" />
          <div>
            <p className="font-bold text-neutral">{user.email}</p>
            <p className="text-sm capitalize text-base-content/60">{user.role}</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {Input({ label: "Name", k: "name", required: true })}
          {Input({ label: "Phone", k: "phone" })}
        </div>
        {Input({ label: "Photo URL", k: "photoURL", type: "url", placeholder: "https://..." })}
        {tutor && (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              {Input({ label: "Subjects (comma separated)", k: "subjects", placeholder: "Math, Physics" })}
              {Input({ label: "Location", k: "location" })}
              {Input({ label: "Qualification", k: "qualification" })}
              {Input({ label: "Experience", k: "experience" })}
              {Input({ label: "Rate per hour (৳)", k: "ratePerHour", type: "number", min: "0" })}
            </div>
            <label className="form-control w-full">
              <span className="label-text mb-1 font-semibold">Bio</span>
              <textarea rows={4} value={form.bio} onChange={set("bio")} className="textarea textarea-bordered w-full" />
            </label>
          </>
        )}
        <button className="btn btn-primary" disabled={saving}>
          {saving ? <span className="loading loading-spinner loading-sm" /> : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
