import Link from "next/link";
import { FaGraduationCap } from "react-icons/fa6";

export default function Logo({ light = false, tagline = false }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-content shadow-sm">
        <FaGraduationCap className="text-xl" />
      </span>
      <span className="leading-tight">
        <span className={`block text-xl font-extrabold tracking-tight ${light ? "text-white" : "text-neutral"}`}>
          E-Tuition<span className="text-accent">BD</span>
        </span>
        {tagline && (
          <span className={`block text-[11px] tracking-widest ${light ? "text-white/70" : "text-base-content/60"}`}>
            LEARN · TEACH · GROW
          </span>
        )}
      </span>
    </Link>
  );
}
