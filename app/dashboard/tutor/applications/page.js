"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPen, FaTrash } from "react-icons/fa6";
import Loading from "@/components/Loading";
import StatusBadge from "@/components/StatusBadge";
import PageHeader, { Empty } from "@/components/dashboard/PageHeader";
import { api } from "@/lib/api";
import { confirmAction } from "@/lib/confirm";
import { useApi } from "@/lib/useApi";
import { formatDate, money } from "@/lib/utils";

export default function MyApplicationsPage() {
  const { data, loading, reload } = useApi("/applications");
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const remove = async (a) => {
    const ok = await confirmAction({ title: "Delete this application?", confirmText: "Yes, delete", danger: true });
    if (!ok) return;
    try {
      await api(`/applications/${a._id}`, { method: "DELETE" });
      toast.success("Application deleted");
      reload();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { qualifications, experience, expectedSalary } = editing;
      await api(`/applications/${editing._id}`, { method: "PATCH", body: { qualifications, experience, expectedSalary } });
      toast.success("Application updated");
      setEditing(null);
      reload();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading && !data) return <Loading fullScreen={false} />;
  const items = data?.items || [];
  const set = (k) => (e) => setEditing((a) => ({ ...a, [k]: e.target.value }));

  return (
    <>
      <PageHeader title="My Applications" sub="Track your applications. You can edit or delete them until they are approved." />
      {items.length === 0 ? (
        <Empty>
          You haven&apos;t applied to any tuition yet. <Link href="/tuitions" className="font-bold text-primary">Browse tuitions</Link>
        </Empty>
      ) : (
        <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100 shadow-sm">
          <table className="table">
            <thead>
              <tr><th>Tuition</th><th>Qualifications</th><th>Experience</th><th>Expected</th><th>Status</th><th>Applied</th><th className="text-right">Actions</th></tr>
            </thead>
            <tbody>
              {items.map((a) => (
                <tr key={a._id}>
                  <td>
                    <Link href={`/tuitions/${a.tuitionId}`} className="font-semibold text-primary">{a.tuitionSubject}</Link>
                    <p className="text-xs text-base-content/60">Class {a.tuitionClass} · {a.tuitionLocation}</p>
                  </td>
                  <td>{a.qualifications}</td>
                  <td>{a.experience}</td>
                  <td className="font-semibold">{money(a.expectedSalary)}</td>
                  <td><StatusBadge status={a.status} /></td>
                  <td className="whitespace-nowrap">{formatDate(a.createdAt)}</td>
                  <td>
                    <div className="flex justify-end gap-1">
                      {a.status === "pending" && <button onClick={() => setEditing(a)} className="btn btn-ghost btn-xs" title="Edit"><FaPen /></button>}
                      {a.status !== "approved" && <button onClick={() => remove(a)} className="btn btn-ghost btn-xs text-error" title="Delete"><FaTrash /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <dialog className={`modal ${editing ? "modal-open" : ""}`}>
        {editing && (
          <div className="modal-box">
            <h3 className="text-lg font-bold text-neutral">Edit Application</h3>
            <form onSubmit={save} className="mt-4 space-y-3">
              <label className="form-control w-full"><span className="label-text mb-1 font-semibold">Qualifications</span>
                <input required value={editing.qualifications} onChange={set("qualifications")} className="input input-bordered w-full" /></label>
              <label className="form-control w-full"><span className="label-text mb-1 font-semibold">Experience</span>
                <input required value={editing.experience} onChange={set("experience")} className="input input-bordered w-full" /></label>
              <label className="form-control w-full"><span className="label-text mb-1 font-semibold">Expected Salary (৳)</span>
                <input required type="number" min="1" value={editing.expectedSalary} onChange={set("expectedSalary")} className="input input-bordered w-full" /></label>
              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setEditing(null)}>Cancel</button>
                <button className="btn btn-primary" disabled={saving}>{saving ? <span className="loading loading-spinner loading-sm" /> : "Save"}</button>
              </div>
            </form>
          </div>
        )}
        <div className="modal-backdrop" onClick={() => setEditing(null)} />
      </dialog>
    </>
  );
}
