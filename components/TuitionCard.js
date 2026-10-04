import Link from "next/link";
import { FaArrowRight, FaBookOpen, FaCalendarDays, FaClock, FaGraduationCap, FaLocationDot } from "react-icons/fa6";
import { money } from "@/lib/utils";

export default function TuitionCard({ tuition }) {
  return (
    <article className="card-modern group flex h-full flex-col overflow-hidden">
      <div className="bg-brand h-1.5 w-full" />
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start gap-3">
          <span className="icon-tile size-12 shrink-0 text-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
            <FaBookOpen />
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold text-neutral">{tuition.subject}</h3>
            <p className="flex items-center gap-1.5 truncate text-sm text-base-content/60">
              <FaLocationDot className="shrink-0 text-xs text-primary" /> {tuition.location}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-medium text-base-content/75">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-base-200 px-2.5 py-1">
            <FaGraduationCap className="text-primary" /> {tuition.classLevel}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-base-200 px-2.5 py-1">
            <FaCalendarDays className="text-primary" /> {tuition.daysPerWeek} days/wk
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-base-200 px-2.5 py-1">
            <FaClock className="text-primary" /> {tuition.hoursPerDay} hr/day
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-base-300 pt-4">
          <p>
            <span className="text-gradient text-xl font-extrabold">{money(tuition.budget)}</span>
            <span className="text-xs font-medium text-base-content/60">/month</span>
          </p>
          <Link href={`/tuitions/${tuition._id}`} className="btn btn-primary btn-sm rounded-full">
            Details <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
