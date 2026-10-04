import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuCalendarDays, LuClock, LuGraduationCap, LuMapPin } from "react-icons/lu";
import { subjectImage } from "@/lib/subjectImage";
import { money } from "@/lib/utils";

export default function TuitionCard({ tuition }) {
  return (
    <article className="card-modern group flex h-full flex-col overflow-hidden">
      <div className="relative h-40 overflow-hidden">
        <Image
          src={subjectImage(tuition.subject)}
          alt={`${tuition.subject} tuition`}
          fill
          placeholder="blur"
          sizes="(min-width: 1280px) 300px, (min-width: 640px) 50vw, 100vw"
          className="img-zoom object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-primary shadow-sm backdrop-blur">
          <LuGraduationCap className="icon-anim" /> {tuition.classLevel}
        </span>
        <div className="absolute inset-x-4 bottom-3">
          <h3 className="truncate text-lg font-extrabold text-white drop-shadow">{tuition.subject}</h3>
          <p className="flex items-center gap-1 truncate text-xs font-medium text-white/85">
            <LuMapPin className="shrink-0" /> {tuition.location}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap gap-2 text-xs font-medium text-base-content/75">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-base-200 px-2.5 py-1">
            <LuCalendarDays className="text-primary" /> {tuition.daysPerWeek} days/week
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-base-200 px-2.5 py-1">
            <LuClock className="text-primary" /> {tuition.hoursPerDay} hr/day
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-base-300 pt-4">
          <p>
            <span className="text-gradient text-xl font-extrabold">{money(tuition.budget)}</span>
            <span className="text-xs font-medium text-base-content/60">/month</span>
          </p>
          <Link href={`/tuitions/${tuition._id}`} className="btn btn-primary btn-sm rounded-full">
            Details <LuArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
