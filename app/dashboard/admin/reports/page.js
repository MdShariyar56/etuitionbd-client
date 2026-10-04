"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Loading from "@/components/Loading";
import StatusBadge from "@/components/StatusBadge";
import PageHeader, { Empty } from "@/components/dashboard/PageHeader";
import { useApi } from "@/lib/useApi";
import { formatDate, money } from "@/lib/utils";

export default function ReportsPage() {
  const payments = useApi("/payments");
  const stats = useApi("/stats");

  if ((payments.loading && !payments.data) || (stats.loading && !stats.data)) return <Loading fullScreen={false} />;
  const items = payments.data?.items || [];

  return (
    <>
      <PageHeader title="Reports & Analytics" sub="Platform earnings and all successful transactions." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-box bg-primary p-5 text-primary-content shadow-sm">
          <p className="text-sm text-white/75">Total Platform Earnings</p>
          <p className="mt-1 text-3xl font-extrabold">{money(payments.data?.total)}</p>
        </div>
        <div className="rounded-box border border-base-300 bg-base-100 p-5 shadow-sm">
          <p className="text-sm text-base-content/60">Successful Transactions</p>
          <p className="mt-1 text-3xl font-extrabold text-neutral">{items.length}</p>
        </div>
      </div>

      {stats.data && (
        <div className="mt-6 rounded-box border border-base-300 bg-base-100 p-5 shadow-sm">
          <h2 className="mb-4 font-bold text-neutral">Monthly Revenue</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.data.monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d9e8e2" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(v) => money(v)} />
                <Bar dataKey="earnings" name="Revenue" fill="#0b6b53" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <h2 className="mb-3 mt-8 text-lg font-bold text-neutral">Transaction History</h2>
      {items.length === 0 ? <Empty>No transactions yet.</Empty> : (
        <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100 shadow-sm">
          <table className="table">
            <thead><tr><th>Date</th><th>Tuition</th><th>Student</th><th>Tutor</th><th>Transaction ID</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {items.map((p) => (
                <tr key={p._id}>
                  <td className="whitespace-nowrap">{formatDate(p.createdAt)}</td>
                  <td className="font-semibold text-neutral">{p.tuitionSubject}</td>
                  <td>{p.studentName}</td>
                  <td>{p.tutorName}</td>
                  <td className="font-mono text-xs">{p.paymentIntentId}</td>
                  <td className="font-bold text-primary">{money(p.amount)}</td>
                  <td><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
