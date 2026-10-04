"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { FaPen, FaTrash, FaEye } from "react-icons/fa6";
import Loading from "@/components/Loading";
import StatusBadge from "@/components/StatusBadge";
import PageHeader, { Empty } from "@/components/dashboard/PageHeader";
import { api } from "@/lib/api";
import { confirmAction } from "@/lib/confirm";
import { useApi } from "@/lib/useApi";
import { formatDate, money } from "@/lib/utils";

export default function MyTuitionsPage() {
  const { data, loading, reload } = useApi("/tuitions/mine");

  const remove = async (t) => {
    const ok = await confirmAction({
      title: "Delete this tuition?",
      text: "This will permanently remove the post and its pending applications.",
      confirmText: "Yes, delete",
      danger: true,
    });
    if (!ok) return;
    try {
      await api(`/tuitions/${t._id}`, { method: "DELETE" });
      toast.success("Tuition deleted");
      reload();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading && !data) return <Loading fullScreen={false} />;
  const items = data?.items || [];

  return (
    <>
      <PageHeader title="My Tuitions" sub="All tuition posts you have created.">
        <Link href="/dashboard/student/post-tuition" className="btn btn-primary btn-sm">Post New Tuition</Link>
      </PageHeader>
      {items.length === 0 ? <Empty>You haven&apos;t posted any tuition yet.</Empty> : (
        <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100 shadow-sm">
          <table className="table">
            <thead>
              <tr><th>Subject</th><th>Class</th><th>Location</th><th>Budget</th><th>Applicants</th><th>Status</th><th>Posted</th><th className="text-right">Actions</th></tr>
            </thead>
            <tbody>
              {items.map((t) => (
                <tr key={t._id}>
                  <td className="font-semibold text-neutral">
                    {t.subject}
                    {t.hiredTutorName && <span className="badge badge-success badge-soft ml-2">Tutor: {t.hiredTutorName}</span>}
                  </td>
                  <td>{t.classLevel}</td>
                  <td>{t.location}</td>
                  <td>{money(t.budget)}</td>
                  <td>{t.applicationCount}</td>
                  <td><StatusBadge status={t.status} /></td>
                  <td className="whitespace-nowrap">{formatDate(t.createdAt)}</td>
                  <td>
                    <div className="flex justify-end gap-1">
                      <Link href={`/tuitions/${t._id}`} className="btn btn-ghost btn-xs" title="View"><FaEye /></Link>
                      {!t.hiredTutorId && <Link href={`/dashboard/student/edit-tuition/${t._id}`} className="btn btn-ghost btn-xs" title="Edit"><FaPen /></Link>}
                      <button onClick={() => remove(t)} className="btn btn-ghost btn-xs text-error" title="Delete"><FaTrash /></button>
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
