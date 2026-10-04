import Link from "next/link";
import { FaLocationDot, FaCircleCheck } from "react-icons/fa6";
import Avatar from "./Avatar";
import { money } from "@/lib/utils";

export default function TutorCard({ tutor }) {
  const subjects = Array.isArray(tutor.subjects) ? tutor.subjects.join(", ") : tutor.subjects;
  return (
    <div className="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="card-body items-center gap-2 p-5 text-center">
        <Avatar src={tutor.photoURL} name={tutor.name} size="size-20" className="ring-4 ring-primary/10" />
        <h3 className="flex items-center gap-1.5 text-lg font-bold text-neutral">
          {tutor.name}
          {tutor.verified && <FaCircleCheck className="text-sm text-accent" title="Verified" />}
        </h3>
        <p className="line-clamp-1 min-h-5 text-sm font-medium text-primary">{subjects || "Tutor"}</p>
        <p className="flex items-center gap-1.5 text-sm text-base-content/60">
          <FaLocationDot className="text-xs" /> {tutor.location || "Bangladesh"}
        </p>
        <div className="flex w-full items-center justify-between pt-2">
          <span className="text-sm font-bold text-neutral">
            {tutor.ratePerHour ? `${money(tutor.ratePerHour)}/hr` : "Rate on request"}
          </span>
          <Link href={`/tutors/${tutor._id}`} className="btn btn-primary btn-sm">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
