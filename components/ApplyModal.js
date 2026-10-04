"use client";

import { useState } from "react";
import { alertError, alertSuccess } from "@/lib/alert";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function ApplyModal({ tuition, open, onClose, onApplied }) {
  const { user } = useAuth();
  const [form, setForm] = useState({ qualifications: "", experience: "", expectedSalary: tuition.budget || "" });
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api("/applications", { method: "POST", body: { ...form, tuitionId: tuition._id } });
      alertSuccess("Application submitted!");
      onApplied?.();
      onClose();
    } catch (err) {
      alertError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="text-xl font-bold text-neutral">Apply for {tuition.subject} Tuition</h3>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <label className="form-control w-full">
            <span className="label-text mb-1 font-semibold">Name</span>
            <input value={user?.name || ""} readOnly className="input input-bordered w-full bg-base-200" />
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-1 font-semibold">Email</span>
            <input value={user?.email || ""} readOnly className="input input-bordered w-full bg-base-200" />
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-1 font-semibold">Qualifications</span>
            <input required value={form.qualifications} onChange={set("qualifications")} placeholder="e.g. BSc in Mathematics, DU" className="input input-bordered w-full" />
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-1 font-semibold">Experience</span>
            <input required value={form.experience} onChange={set("experience")} placeholder="e.g. 3 years teaching experience" className="input input-bordered w-full" />
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-1 font-semibold">Expected Salary (৳/month)</span>
            <input required type="number" min="1" value={form.expectedSalary} onChange={set("expectedSalary")} className="input input-bordered w-full" />
          </label>
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" disabled={saving}>
              {saving ? <span className="loading loading-spinner loading-sm" /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
}
