"use client";

export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;
  const nums = Array.from({ length: pages }, (_, i) => i + 1);
  return (
    <div className="join mx-auto mt-8 flex w-fit">
      <button className="btn join-item btn-sm" disabled={page === 1} onClick={() => onChange(page - 1)}>
        «
      </button>
      {nums.map((n) => (
        <button
          key={n}
          className={`btn join-item btn-sm ${n === page ? "btn-primary" : ""}`}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}
      <button className="btn join-item btn-sm" disabled={page === pages} onClick={() => onChange(page + 1)}>
        »
      </button>
    </div>
  );
}
