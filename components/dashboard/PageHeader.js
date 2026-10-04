export default function PageHeader({ title, sub, children }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral">{title}</h1>
        {sub && <p className="section-sub mt-1 text-sm">{sub}</p>}
      </div>
      {children}
    </div>
  );
}

export function Empty({ children }) {
  return <div className="rounded-box border border-dashed border-base-300 bg-base-100 p-12 text-center text-base-content/60">{children}</div>;
}
