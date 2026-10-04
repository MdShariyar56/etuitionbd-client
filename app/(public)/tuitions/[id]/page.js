"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaLocationDot, FaCalendarDays, FaClock, FaGraduationCap, FaCircleCheck } from "react-icons/fa6";
import Avatar from "@/components/Avatar";
import ApplyModal from "@/components/ApplyModal";
import Loading from "@/components/Loading";
import StatusBadge from "@/components/StatusBadge";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/lib/useApi";
import { formatDate, money } from "@/lib/utils";

export default function TuitionDetailsPage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const [applied, setApplied] = useState(false);

  const { data, loading, error } = useApi(`/tuitions/${id}`, !authLoading);
  const tuition = data?.tuition;
  const similar = useApi(tuition ? `/tuitions?subject=${encodeURIComponent(tuition.subject)}&limit=4` : null, !!tuition);

  if (authLoading || (loading && !data)) return <Loading />;
  if (error || !tuition) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="section-title">Tuition not found</h1>
        <p className="section-sub mt-2">This post may have been removed or is not available.</p>
        <Link href="/tuitions" className="btn btn-primary mt-6">Browse Tuitions</Link>
      </div>
    );
  }

  const others = (similar.data?.items || []).filter((t) => t._id !== tuition._id).slice(0, 3);
  const isTutor = user?.role === "tutor";

  let action;
  if (tuition.hiredTutorId) action = <p className="alert alert-info alert-soft">A tutor has already been hired.</p>;
  else if (tuition.status !== "approved") action = <p className="alert alert-warning alert-soft">This post is awaiting approval.</p>;
  else if (!user) action = <Link href={`/login?next=/tuitions/${id}`} className="btn btn-primary w-full">Login to Apply</Link>;
  else if (isTutor) {
    action = (
      <button className="btn btn-primary w-full" disabled={applied} onClick={() => setOpen(true)}>
        {applied ? "Applied" : "Apply Now"}
      </button>
    );
  } else action = <p className="text-sm text-base-content/60">Only tutors can apply to tuitions.</p>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          <div className="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-3xl font-extrabold text-neutral">{tuition.subject} Tuition</h1>
                <p className="mt-2 flex items-center gap-2 text-base-content/70"><FaLocationDot /> {tuition.location}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-primary">{money(tuition.budget)}<span className="text-sm font-medium text-base-content/60">/month</span></p>
                {tuition.status !== "approved" && <StatusBadge status={tuition.status} />}
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <span className="badge badge-lg badge-ghost gap-2"><FaGraduationCap /> Class {tuition.classLevel}</span>
              <span className="badge badge-lg badge-ghost gap-2"><FaCalendarDays /> {tuition.daysPerWeek} days/week</span>
              <span className="badge badge-lg badge-ghost gap-2"><FaClock /> {tuition.hoursPerDay} hours/day</span>
            </div>
          </div>

          <div className="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-neutral">About This Tuition</h2>
            <p className="mt-2 whitespace-pre-line leading-relaxed text-base-content/75">
              {tuition.description || "No additional description provided."}
            </p>
            {tuition.requirements?.length > 0 && (
              <>
                <h3 className="mt-6 text-lg font-bold text-neutral">Required Qualifications</h3>
                <ul className="mt-2 space-y-2">
                  {tuition.requirements.map((r) => (
                    <li key={r} className="flex items-center gap-2 text-base-content/75"><FaCircleCheck className="text-success" /> {r}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-box border border-base-300 bg-base-100 p-5 shadow-sm">
            <p className="mb-3 text-sm font-semibold text-base-content/60">Tuition Posted By</p>
            <div className="flex items-center gap-3">
              <Avatar src={tuition.studentPhoto} name={tuition.studentName} size="size-12" />
              <div>
                <p className="font-bold text-neutral">{tuition.studentName}</p>
                <p className="text-xs text-base-content/60">Student · Member since {formatDate(tuition.studentSince || tuition.createdAt)}</p>
              </div>
            </div>
            <div className="mt-5">{action}</div>
          </div>

          {others.length > 0 && (
            <div className="rounded-box border border-base-300 bg-base-100 p-5 shadow-sm">
              <p className="mb-3 font-bold text-neutral">Similar Tuitions</p>
              <ul className="space-y-3">
                {others.map((t) => (
                  <li key={t._id}>
                    <Link href={`/tuitions/${t._id}`} className="block rounded-lg p-2 transition hover:bg-base-200">
                      <p className="font-semibold text-neutral">{t.subject} Tuition</p>
                      <p className="text-xs text-base-content/60">{t.location} · {money(t.budget)}/month</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {isTutor && <ApplyModal tuition={tuition} open={open} onClose={() => setOpen(false)} onApplied={() => setApplied(true)} />}
    </div>
  );
}
