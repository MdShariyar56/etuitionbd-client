import Link from "next/link";
import { FaArrowRight, FaCircleCheck, FaLocationDot } from "react-icons/fa6";
import Avatar from "./Avatar";
import { money } from "@/lib/utils";

export default function TutorCard({ tutor }) {
  const subjects = Array.isArray(tutor.subjects)
    ? tutor.subjects
    : String(tutor.subjects || "").split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <article className="card-modern group flex h-full flex-col overflow-hidden text-center">
      <div className="bg-brand relative h-20 overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-30" />
      </div>
      <div className="-mt-10 flex flex-1 flex-col items-center gap-2 px-5 pb-5">
        <Avatar
          src={tutor.photoURL}
          name={tutor.name}
          size="size-20"
          className="shadow-lg ring-4 ring-base-100 transition-transform duration-300 group-hover:scale-105"
        />
        <h3 className="mt-1 flex items-center gap-1.5 text-lg font-bold text-neutral">
          {tutor.name}
          {tutor.verified && <FaCircleCheck className="text-sm text-accent" title="Verified" />}
        </h3>
        <div className="flex min-h-6 flex-wrap justify-center gap-1.5">
          {(subjects.length ? subjects.slice(0, 2) : ["Tutor"]).map((s) => (
            <span key={s} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {s}
            </span>
          ))}
        </div>
        <p className="flex items-center gap-1.5 text-sm text-base-content/60">
          <FaLocationDot className="text-xs text-primary" /> {tutor.location || "Bangladesh"}
        </p>
        <div className="mt-auto flex w-full items-center justify-between border-t border-base-300 pt-4">
          <span className="text-sm font-bold text-neutral">
            {tutor.ratePerHour ? `${money(tutor.ratePerHour)}/hr` : "Rate on request"}
          </span>
          <Link href={`/tutors/${tutor._id}`} className="btn btn-primary btn-sm rounded-full">
            Profile <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
