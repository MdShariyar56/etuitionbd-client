"use client";

import Link from "next/link";
import { useState } from "react";
import { alertError, alertSuccess } from "@/lib/alert";
import Loading from "@/components/Loading";
import StatusBadge from "@/components/StatusBadge";
import PageHeader, { Empty } from "@/components/dashboard/PageHeader";
import { api, qs } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import { formatDate, money } from "@/lib/utils";

const tabs = [["", "All"], ["pending", "Pending"], ["approved", "Approved"], ["rejected", "Rejected"]];

export default function TuitionManagementPage() {
  const [status, setStatus] = useState("");
  const { data, loading, reload } = useApi(`/tuitions/admin${qs({ status })}`);
  const [busyId, setBusyId] = useState(null);

  const review = async (t, next) => {
    setBusyId(t._id);
    try {
      await api(`/tuitions/${t._id}/status`, { method: "PATCH", body: { status: next } });
      alertSuccess(`Tuition ${next}`);
      reload();
    } catch (err) {
      alertError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const items = data?.items || [];

  return (
    <>
      <PageHeader title="Tuition Management" sub="Review posts before they become visible to tutors." />
      <div role="tablist" className="tabs tabs-box mb-4 w-fit">
        {tabs.map(([v, l]) => (
          <button key={l} role="tab" onClick={() => setStatus(v)} className={`tab ${status === v ? "tab-active" : ""}`}>{l}</button>
        ))}
      </div>
      {loading && !data ? <Loading fullScreen={false} /> : items.length === 0 ? <Empty>No tuitions here.</Empty> : (
        <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100 shadow-sm">
          <table className="table">
            <thead><tr><th>Tuition</th><th>Student</th><th>Location</th><th>Budget</th><th>Posted</th><th>Status</th><th className="text-right">Review</th></tr></thead>
            <tbody>
              {items.map((t) => (
                <tr key={t._id}>
                  <td>
                    <Link href={`/tuitions/${t._id}`} className="font-semibold text-primary">{t.subject}</Link>
                    <p className="text-xs text-base-content/60">Class {t.classLevel}</p>
                  </td>
                  <td>{t.studentName}<p className="text-xs text-base-content/60">{t.studentEmail}</p></td>
                  <td>{t.location}</td>
                  <td>{money(t.budget)}</td>
                  <td className="whitespace-nowrap">{formatDate(t.createdAt)}</td>
                  <td><StatusBadge status={t.status} /></td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button disabled={busyId === t._id || t.status === "approved"} onClick={() => review(t, "approved")} className="btn btn-success btn-xs">Approve</button>
                      <button disabled={busyId === t._id || t.status === "rejected"} onClick={() => review(t, "rejected")} className="btn btn-error btn-xs">Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
