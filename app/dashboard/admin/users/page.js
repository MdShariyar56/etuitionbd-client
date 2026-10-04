"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPen, FaTrash } from "react-icons/fa6";
import Avatar from "@/components/Avatar";
import Loading from "@/components/Loading";
import StatusBadge from "@/components/StatusBadge";
import PageHeader, { Empty } from "@/components/dashboard/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { api, qs } from "@/lib/api";
import { confirmAction } from "@/lib/confirm";
import { useApi } from "@/lib/useApi";
import { formatDate } from "@/lib/utils";

export default function UserManagementPage() {
  const { user: me } = useAuth();
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setQ(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const { data, loading, reload } = useApi(`/users${qs({ q, role })}`);
  const set = (k) => (e) => setEditing((u) => ({ ...u, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { name, phone, photoURL, role: r, status, verified } = editing;
      const body = { name, phone, photoURL, verified: !!verified };
      if (editing._id !== me._id) Object.assign(body, { role: r, status });
      await api(`/users/${editing._id}`, { method: "PATCH", body });
      toast.success("User updated");
      setEditing(null);
      reload();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (u) => {
    const ok = await confirmAction({ title: `Delete ${u.name}?`, text: "This account will be permanently removed.", confirmText: "Yes, delete", danger: true });
    if (!ok) return;
    try {
      await api(`/users/${u._id}`, { method: "DELETE" });
      toast.success("User deleted");
      reload();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const items = data?.items || [];

  return (
    <>
      <PageHeader title="User Management" sub="View, update, change roles or delete user accounts." />
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email or phone" className="input input-bordered flex-1" />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="select select-bordered sm:w-48">
          <option value="">All roles</option>
          <option value="student">Student</option>
          <option value="tutor">Tutor</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      {loading && !data ? <Loading fullScreen={false} /> : items.length === 0 ? <Empty>No users found.</Empty> : (
        <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100 shadow-sm">
          <table className="table">
            <thead><tr><th>User</th><th>Phone</th><th>Role</th><th>Status</th><th>Verified</th><th>Joined</th><th className="text-right">Actions</th></tr></thead>
            <tbody>
              {items.map((u) => (
                <tr key={u._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <Avatar src={u.photoURL} name={u.name} />
                      <div><p className="font-semibold text-neutral">{u.name}</p><p className="text-xs text-base-content/60">{u.email}</p></div>
                    </div>
                  </td>
                  <td>{u.phone || "—"}</td>
                  <td><span className="badge badge-primary badge-soft capitalize">{u.role}</span></td>
                  <td><StatusBadge status={u.status || "active"} /></td>
                  <td>{u.verified ? "Yes" : "No"}</td>
                  <td className="whitespace-nowrap">{formatDate(u.createdAt)}</td>
                  <td>
                    <div className="flex justify-end gap-1">
                      <button onClick={() => setEditing(u)} className="btn btn-ghost btn-xs" title="Edit"><FaPen /></button>
                      {u._id !== me._id && <button onClick={() => remove(u)} className="btn btn-ghost btn-xs text-error" title="Delete"><FaTrash /></button>}
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
            <h3 className="text-lg font-bold text-neutral">Edit User</h3>
            <form onSubmit={save} className="mt-4 space-y-3">
              <input required value={editing.name || ""} onChange={set("name")} placeholder="Name" className="input input-bordered w-full" />
              <input value={editing.email} readOnly className="input input-bordered w-full bg-base-200" />
              <input value={editing.phone || ""} onChange={set("phone")} placeholder="Phone" className="input input-bordered w-full" />
              <input value={editing.photoURL || ""} onChange={set("photoURL")} placeholder="Photo URL" className="input input-bordered w-full" />
              <div className="grid grid-cols-2 gap-3">
                <select value={editing.role} onChange={set("role")} disabled={editing._id === me._id} className="select select-bordered w-full">
                  <option value="student">Student</option><option value="tutor">Tutor</option><option value="admin">Admin</option>
                </select>
                <select value={editing.status || "active"} onChange={set("status")} disabled={editing._id === me._id} className="select select-bordered w-full">
                  <option value="active">Active</option><option value="blocked">Blocked</option>
                </select>
              </div>
              <label className="flex cursor-pointer items-center gap-3">
                <input type="checkbox" checked={!!editing.verified} onChange={set("verified")} className="checkbox checkbox-primary" />
                <span className="label-text font-semibold">Verified</span>
              </label>
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
