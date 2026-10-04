"use client";

import { useEffect, useState } from "react";
import TutorCard from "@/components/TutorCard";
import Pagination from "@/components/Pagination";
import Loading from "@/components/Loading";
import { qs } from "@/lib/api";
import { useApi } from "@/lib/useApi";

export default function TutorsPage() {
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => {
      setQ(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const { data, loading } = useApi(`/tutors${qs({ q, location, page, limit: 8 })}`);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="section-title">Our Verified Tutors</h1>
      <p className="section-sub mt-1">Find an experienced tutor for your subject and area.</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or subject" className="input input-bordered flex-1" />
        <input value={location} onChange={(e) => { setLocation(e.target.value); setPage(1); }} placeholder="Filter by location" className="input input-bordered sm:w-64" />
      </div>

      <div className="mt-8">
        {loading && !data ? <Loading fullScreen={false} /> : data?.items?.length ? (
          <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-4 ${loading ? "opacity-60" : ""}`}>
            {data.items.map((t) => <TutorCard key={t._id} tutor={t} />)}
          </div>
        ) : (
          <div className="rounded-box bg-base-200 p-12 text-center text-base-content/60">No tutors found.</div>
        )}
        <Pagination page={page} pages={data?.pages || 1} onChange={setPage} />
      </div>
    </div>
  );
}
