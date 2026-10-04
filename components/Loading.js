export default function Loading({ fullScreen = true, label = "Loading..." }) {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <span className="loading loading-spinner loading-lg text-primary" />
      <p className="text-sm font-medium text-base-content/60">{label}</p>
    </div>
  );
  if (!fullScreen) return <div className="grid place-items-center py-20">{spinner}</div>;
  return <div className="fixed inset-0 z-[100] grid place-items-center bg-base-100">{spinner}</div>;
}
