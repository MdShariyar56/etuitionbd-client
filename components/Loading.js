import { FaGraduationCap } from "react-icons/fa6";

export default function Loading({ fullScreen = true, label = "Loading" }) {
  const body = (
    <div className="flex flex-col items-center gap-6" role="status" aria-live="polite">
      <div className="loader-orbit">
        <span className="loader-ring" />
        <span className="loader-core">
          <FaGraduationCap />
        </span>
      </div>
      <div className="text-center">
        <p className="text-xl font-extrabold tracking-tight text-neutral">
          E-Tuition<span className="text-accent">BD</span>
        </p>
        <p className="mt-1 flex items-center justify-center gap-1.5 text-sm font-medium text-base-content/60">
          {label}
          <span className="loader-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </p>
      </div>
    </div>
  );

  if (!fullScreen) return <div className="grid place-items-center py-20">{body}</div>;
  return <div className="hero-bg fixed inset-0 z-[100] grid place-items-center">{body}</div>;
}
