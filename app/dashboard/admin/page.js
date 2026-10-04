"use client";

import { FaUsers, FaBookOpen, FaMoneyBillWave, FaHourglassHalf } from "react-icons/fa6";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Loading from "@/components/Loading";
import PageHeader from "@/components/dashboard/PageHeader";
import { useChartColors } from "@/lib/theme";
import { useApi } from "@/lib/useApi";
import { money } from "@/lib/utils";

function Stat({ Icon, label, value, tone }) {
  return (
    <div className="card-modern flex items-center gap-4 p-5">
      <span className={`grid size-12 place-items-center rounded-xl text-xl ${tone}`}><Icon /></span>
      <div>
        <p className="text-sm text-base-content/60">{label}</p>
        <p className="text-2xl font-extrabold text-neutral">{value}</p>
      </div>
    </div>
  );
}

export default function AdminOverview() {
  const { data, loading, error } = useApi("/stats");
  const c = useChartColors();
  if (loading && !data) return <Loading fullScreen={false} />;
  if (error) return <p className="alert alert-error">{error.message}</p>;
  const s = data;

  return (
    <>
      <PageHeader title="Admin Dashboard" sub="Platform overview at a glance." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat Icon={FaUsers} label="Total Users" value={s.totalUsers} tone="bg-primary/10 text-primary" />
        <Stat Icon={FaBookOpen} label="Total Tuitions" value={s.totalTuitions} tone="bg-accent/15 text-accent" />
        <Stat Icon={FaMoneyBillWave} label="Total Earnings" value={money(s.totalEarnings)} tone="bg-success/15 text-success" />
        <Stat Icon={FaHourglassHalf} label="Pending Tuitions" value={s.pendingTuitions} tone="bg-warning/20 text-warning" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="card-modern p-5">
          <h2 className="mb-4 font-bold text-neutral">Earnings (last 6 months)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={s.monthly}>
                <defs>
                  <linearGradient id="earn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={c.primary} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={c.primary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
                <XAxis dataKey="month" tick={{ fill: c.text, fontSize: 12 }} axisLine={{ stroke: c.grid }} tickLine={false} />
                <YAxis tick={{ fill: c.text, fontSize: 12 }} axisLine={{ stroke: c.grid }} tickLine={false} />
                <Tooltip formatter={(v) => money(v)} contentStyle={{ background: "var(--color-base-100)", border: "1px solid var(--color-base-300)", borderRadius: 12, color: "var(--color-base-content)" }} />
                <Area type="monotone" dataKey="earnings" stroke={c.primary} strokeWidth={2} fill="url(#earn)" name="Earnings" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card-modern p-5">
          <h2 className="mb-4 font-bold text-neutral">New Users (last 6 months)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={s.monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
                <XAxis dataKey="month" tick={{ fill: c.text, fontSize: 12 }} axisLine={{ stroke: c.grid }} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fill: c.text, fontSize: 12 }} axisLine={{ stroke: c.grid }} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-base-100)", border: "1px solid var(--color-base-300)", borderRadius: 12, color: "var(--color-base-content)" }} cursor={{ fill: c.grid, opacity: 0.4 }} />
                <Legend />
                <Bar dataKey="students" name="Students" fill={c.primary} radius={[6, 6, 0, 0]} />
                <Bar dataKey="tutors" name="Tutors" fill={c.secondary} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
