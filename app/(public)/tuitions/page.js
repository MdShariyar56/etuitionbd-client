"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import TuitionCard from "@/components/TuitionCard";
import Pagination from "@/components/Pagination";
import Loading from "@/components/Loading";
import { qs } from "@/lib/api";
import { useApi } from "@/lib/useApi";

const LIMIT = 6;

function Listing() {
  const sp = useSearchParams();
  const [search, setSearch] = useState(sp.get("q") || "");
  const [q, setQ] = useState(sp.get("q") || "");
  const [subject, setSubject] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [location, setLocation] = useState(sp.get("location") || "");
  const [sort, setSort] = useState("newest");
  const [minBudget, setMin] = useState("");
  const [maxBudget, setMax] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => {
      setQ(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const filters = useApi("/tuitions/filters");
  const { data, loading } = useApi(
    `/tuitions${qs({ q, subject, classLevel, location, sort, minBudget, maxBudget, page, limit: LIMIT })}`
  );

  const set = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
  };
  const clear = () => {
    setSearch(""); setQ(""); setSubject(""); setClassLevel(""); setLocation("");
    setSort("newest"); setMin(""); setMax(""); setPage(1);
  };
  const opts = (list) => (list || []).map((v) => <option key={v}>{v}</option>);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="section-title">Available Tuitions</h1>
      <p className="section-sub mt-1">Search, filter and sort to find the tuition that fits you.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[18rem_1fr]">
        <aside className="h-fit space-y-4 rounded-box border border-base-300 bg-base-100 p-5 shadow-sm">
          <label className="form-control w-full">
            <span className="label-text mb-1 font-semibold">Search</span>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Subject or location" className="input input-bordered w-full" />
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-1 font-semibold">Subject</span>
            <select value={subject} onChange={set(setSubject)} className="select select-bordered w-full">
              <option value="">All subjects</option>
              {opts(filters.data?.subjects)}
            </select>
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-1 font-semibold">Class</span>
            <select value={classLevel} onChange={set(setClassLevel)} className="select select-bordered w-full">
              <option value="">All classes</option>
              {opts(filters.data?.classLevels)}
            </select>
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-1 font-semibold">Location</span>
            <select value={location} onChange={set(setLocation)} className="select select-bordered w-full">
              <option value="">All locations</option>
              {location && !filters.data?.locations?.includes(location) && <option>{location}</option>}
              {opts(filters.data?.locations)}
            </select>
          </label>
          <div>
            <span className="label-text mb-1 block font-semibold">Budget (৳)</span>
            <div className="flex gap-2">
              <input type="number" min="0" value={minBudget} onChange={set(setMin)} placeholder="Min" className="input input-bordered w-full" />
              <input type="number" min="0" value={maxBudget} onChange={set(setMax)} placeholder="Max" className="input input-bordered w-full" />
            </div>
          </div>
          <button onClick={clear} className="btn btn-outline btn-primary btn-sm w-full">Clear All</button>
        </aside>

        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-base-content/70">{data ? `${data.total} tuition${data.total === 1 ? "" : "s"} found` : " "}</p>
            <select value={sort} onChange={set(setSort)} className="select select-bordered select-sm" aria-label="Sort">
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="budget_asc">Budget: low to high</option>
              <option value="budget_desc">Budget: high to low</option>
            </select>
          </div>

          {loading && !data ? <Loading fullScreen={false} /> : data?.items?.length ? (
            <div className={`grid gap-5 sm:grid-cols-2 xl:grid-cols-3 ${loading ? "opacity-60" : ""}`}>
              {data.items.map((t) => <TuitionCard key={t._id} tuition={t} />)}
            </div>
          ) : (
            <div className="rounded-box bg-base-200 p-12 text-center text-base-content/60">No tuitions match your filters.</div>
          )}
          <Pagination page={page} pages={data?.pages || 1} onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
        </section>
      </div>
    </div>
  );
}

export default function TuitionsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Listing />
    </Suspense>
  );
}
