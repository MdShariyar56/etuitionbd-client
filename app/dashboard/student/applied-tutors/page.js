"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Avatar from "@/components/Avatar";
import Loading from "@/components/Loading";
import StatusBadge from "@/components/StatusBadge";
import PageHeader, { Empty } from "@/components/dashboard/PageHeader";
import { api } from "@/lib/api";
import { confirmAction } from "@/lib/confirm";
import { useApi } from "@/lib/useApi";
import { money } from "@/lib/utils";

export default function AppliedTutorsPage() {
  const router = useRouter();
  const { data, loading, reload } = useApi("/applications");

  const reject = async (a) => {
    const ok = await confirmAction({ title: `Reject ${a.tutorName}?`, confirmText: "Yes, reject", danger: true });
    if (!ok) return;
    try {
      await api(`/applications/${a._id}/reject`, { method: "PATCH" });
      toast.success("Application rejected");
      reload();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const accept = async (a) => {
    const ok = await confirmAction({
      title: `Accept ${a.tutorName}?`,
      text: `You will pay ${money(a.expectedSalary)} to confirm this tutor.`,
      confirmText: "Continue to payment",
    });
    if (ok) router.push(`/dashboard/student/checkout/${a._id}`);
  };

  if (loading && !data) return <Loading fullScreen={false} />;
  const items = data?.items || [];

  return (
    <>
      <PageHeader title="Applied Tutors" sub="Tutor applications received for your tuitions. A tutor is approved only after payment." />
      {items.length === 0 ? <Empty>No tutor has applied yet.</Empty> : (
        <div className="grid gap-4 lg:grid-cols-2">
          {items.map((a) => (
            <div key={a._id} className="rounded-box border border-base-300 bg-base-100 p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <Avatar src={a.tutorPhoto} name={a.tutorName} size="size-14" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-bold text-neutral">{a.tutorName}</h3>
                    <StatusBadge status={a.status} />
                  </div>
                  <p className="text-sm text-base-content/60">For: {a.tuitionSubject} · Class {a.tuitionClass}</p>
                </div>
              </div>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-base-content/60">Qualifications</dt><dd className="text-right font-medium">{a.qualifications}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-base-content/60">Experience</dt><dd className="text-right font-medium">{a.experience}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-base-content/60">Expected salary</dt><dd className="font-extrabold text-primary">{money(a.expectedSalary)}/month</dd></div>
              </dl>
              {a.status === "pending" && (
                <div className="mt-4 flex gap-2">
                  <button onClick={() => accept(a)} className="btn btn-primary btn-sm flex-1">Accept Tutor</button>
                  <button onClick={() => reject(a)} className="btn btn-outline btn-error btn-sm flex-1">Reject</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
