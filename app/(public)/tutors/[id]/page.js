"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FaLocationDot, FaEnvelope, FaPhone, FaCircleCheck } from "react-icons/fa6";
import Avatar from "@/components/Avatar";
import Loading from "@/components/Loading";
import { useApi } from "@/lib/useApi";
import { money } from "@/lib/utils";

export default function TutorProfilePage() {
  const { id } = useParams();
  const { data, loading, error } = useApi(`/tutors/${id}`);
  const t = data?.tutor;

  if (loading && !data) return <Loading />;
  if (error || !t) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="section-title">Tutor not found</h1>
        <Link href="/tutors" className="btn btn-primary mt-6">Browse Tutors</Link>
      </div>
    );
  }
  const subjects = Array.isArray(t.subjects) ? t.subjects : String(t.subjects || "").split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid gap-6 md:grid-cols-[1fr_18rem]">
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-5 rounded-box border border-base-300 bg-base-100 p-6 shadow-sm sm:flex-row">
            <Avatar src={t.photoURL} name={t.name} size="size-28" className="ring-4 ring-primary/10" />
            <div className="text-center sm:text-left">
              <h1 className="flex items-center justify-center gap-2 text-2xl font-extrabold text-neutral sm:justify-start">
                {t.name} {t.verified && <FaCircleCheck className="text-base text-accent" title="Verified" />}
              </h1>
              <p className="mt-1 flex items-center justify-center gap-2 text-base-content/70 sm:justify-start"><FaLocationDot /> {t.location || "Bangladesh"}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                {subjects.map((s) => <span key={s} className="badge badge-primary badge-soft">{s}</span>)}
              </div>
            </div>
          </div>

          <div className="space-y-5 rounded-box border border-base-300 bg-base-100 p-6 shadow-sm">
            <div>
              <h2 className="font-bold text-neutral">About</h2>
              <p className="mt-1 whitespace-pre-line text-base-content/75">{t.bio || "This tutor has not added a bio yet."}</p>
            </div>
            <div>
              <h2 className="font-bold text-neutral">Education</h2>
              <p className="mt-1 text-base-content/75">{t.qualification || "Not provided"}</p>
            </div>
            <div>
              <h2 className="font-bold text-neutral">Experience</h2>
              <p className="mt-1 text-base-content/75">{t.experience || "Not provided"}</p>
            </div>
          </div>
        </div>

        <aside className="h-fit space-y-4 rounded-box border border-base-300 bg-base-100 p-5 shadow-sm">
          <h2 className="font-bold text-neutral">Contact Info</h2>
          <p className="flex items-center gap-3 text-sm"><FaPhone className="text-primary" /> {t.phone || "Not shared"}</p>
          <p className="flex items-center gap-3 break-all text-sm"><FaEnvelope className="text-primary" /> {t.email}</p>
          <p className="flex items-center gap-3 text-sm"><FaLocationDot className="text-primary" /> {t.location || "Bangladesh"}</p>
          {t.ratePerHour > 0 && <p className="border-t border-base-300 pt-4 text-lg font-extrabold text-primary">{money(t.ratePerHour)}<span className="text-sm font-medium text-base-content/60"> /hour</span></p>}
        </aside>
      </div>
    </div>
  );
}
