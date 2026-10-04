"use client";

import { useState } from "react";

const empty = {
  subject: "", classLevel: "", location: "", budget: "", daysPerWeek: 3, hoursPerDay: 2, description: "", requirements: "",
};

function Field({ label, children }) {
  return (
    <label className="form-control w-full">
      <span className="label-text mb-1 font-semibold">{label}</span>
      {children}
    </label>
  );
}

export default function TuitionForm({ initial, submitLabel, onSubmit }) {
  const [form, setForm] = useState(() =>
    initial ? { ...empty, ...initial, requirements: (initial.requirements || []).join("\n") } : empty
  );
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit({
        ...form,
        requirements: form.requirements.split("\n").map((r) => r.trim()).filter(Boolean),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 rounded-box border border-base-300 bg-base-100 p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Subject"><input required value={form.subject} onChange={set("subject")} placeholder="e.g. Mathematics" className="input input-bordered w-full" /></Field>
        <Field label="Class"><input required value={form.classLevel} onChange={set("classLevel")} placeholder="e.g. 6-10" className="input input-bordered w-full" /></Field>
        <Field label="Location"><input required value={form.location} onChange={set("location")} placeholder="e.g. Mirpur, Dhaka" className="input input-bordered w-full" /></Field>
        <Field label="Budget (৳/month)"><input required type="number" min="1" value={form.budget} onChange={set("budget")} className="input input-bordered w-full" /></Field>
        <Field label="Days per week"><input type="number" min="1" max="7" value={form.daysPerWeek} onChange={set("daysPerWeek")} className="input input-bordered w-full" /></Field>
        <Field label="Hours per day"><input type="number" min="1" max="8" step="0.5" value={form.hoursPerDay} onChange={set("hoursPerDay")} className="input input-bordered w-full" /></Field>
      </div>
      <Field label="Description">
        <textarea rows={4} value={form.description} onChange={set("description")} placeholder="Describe what you are looking for" className="textarea textarea-bordered w-full" />
      </Field>
      <Field label="Required qualifications (one per line)">
        <textarea rows={3} value={form.requirements} onChange={set("requirements")} placeholder={"Minimum graduation\nGood communication skills"} className="textarea textarea-bordered w-full" />
      </Field>
      <button className="btn btn-primary" disabled={saving}>
        {saving ? <span className="loading loading-spinner loading-sm" /> : submitLabel}
      </button>
    </form>
  );
}
