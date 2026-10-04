import Link from "next/link";
import { LuGraduationCap } from "react-icons/lu";

export default function Logo({ light = false, tagline = false }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="E-TuitionBD home">
      <span className="bg-brand grid size-10 place-items-center rounded-xl text-white shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
        <LuGraduationCap className="text-xl" />
      </span>
      <span className="leading-tight">
        <span className={`block text-xl font-extrabold tracking-tight ${light ? "text-white" : "text-neutral"}`}>
          E-Tuition<span className="text-gradient">BD</span>
        </span>
        {tagline && (
          <span className={`block text-[11px] font-semibold tracking-[0.2em] ${light ? "text-stone-400" : "text-base-content/60"}`}>
            LEARN · TEACH · GROW
          </span>
        )}
      </span>
    </Link>
  );
}
