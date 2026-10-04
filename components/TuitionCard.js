import Link from "next/link";
import { FaBookOpen, FaLocationDot, FaCalendarDays, FaClock } from "react-icons/fa6";
import { money } from "@/lib/utils";

export default function TuitionCard({ tuition }) {
  return (
    <div className="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="card-body gap-3 p-5">
        <div className="flex items-center gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <FaBookOpen className="text-xl" />
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold text-neutral">{tuition.subject}</h3>
            <p className="flex items-center gap-1.5 truncate text-sm text-base-content/60">
              <FaLocationDot className="text-xs" /> {tuition.location}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-base-content/70">
          <span className="badge badge-ghost gap-1.5">Class {tuition.classLevel}</span>
          <span className="badge badge-ghost gap-1.5">
            <FaCalendarDays /> {tuition.daysPerWeek} days/week
          </span>
          <span className="badge badge-ghost gap-1.5">
            <FaClock /> {tuition.hoursPerDay} hr/day
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-lg font-extrabold text-primary">
            {money(tuition.budget)}
            <span className="text-xs font-medium text-base-content/60">/month</span>
          </p>
          <Link href={`/tuitions/${tuition._id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
