"use client";

import Link from "next/link";
import Loading from "@/components/Loading";
import PageHeader, { Empty } from "@/components/dashboard/PageHeader";
import { useApi } from "@/lib/useApi";
import { money } from "@/lib/utils";

export default function OngoingTuitionsPage() {
  const { data, loading } = useApi("/applications?status=approved");
  if (loading && !data) return <Loading fullScreen={false} />;
  const items = data?.items || [];

  return (
    <>
      <PageHeader title="Ongoing Tuitions" sub="Tuitions where a student has approved you and paid." />
      {items.length === 0 ? <Empty>No ongoing tuitions yet.</Empty> : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((a) => (
            <div key={a._id} className="rounded-box border border-base-300 bg-base-100 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-neutral">{a.tuitionSubject}</h3>
                <span className="badge badge-success badge-soft">Ongoing</span>
              </div>
              <p className="mt-1 text-sm text-base-content/60">Class {a.tuitionClass} · {a.tuitionLocation}</p>
              <p className="mt-4 text-xl font-extrabold text-primary">{money(a.expectedSalary)}<span className="text-xs font-medium text-base-content/60">/month</span></p>
              <Link href={`/tuitions/${a.tuitionId}`} className="btn btn-outline btn-primary btn-sm mt-4">View Tuition</Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
