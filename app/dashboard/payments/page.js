"use client";

import Loading from "@/components/Loading";
import StatusBadge from "@/components/StatusBadge";
import PageHeader, { Empty } from "@/components/dashboard/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/lib/useApi";
import { formatDate, money } from "@/lib/utils";

export default function PaymentsPage() {
  const { user } = useAuth();
  const { data, loading } = useApi("/payments");
  const tutor = user?.role === "tutor";

  if (loading && !data) return <Loading fullScreen={false} />;
  const items = data?.items || [];

  return (
    <>
      <PageHeader
        title={tutor ? "Revenue History" : "Payment History"}
        sub={tutor ? "Your total earnings and transactions." : "All payments you have made."}
      />
      <div className="mb-6 w-full max-w-xs bg-brand rounded-box p-5 text-white shadow-lg shadow-primary/20">
        <p className="text-sm text-white/75">{tutor ? "Total Earnings" : "Total Paid"}</p>
        <p className="mt-1 text-3xl font-extrabold">{money(data?.total)}</p>
      </div>
      {items.length === 0 ? <Empty>No transactions yet.</Empty> : (
        <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100 shadow-sm">
          <table className="table">
            <thead>
              <tr><th>Date</th><th>Tuition</th><th>{tutor ? "Student" : "Tutor"}</th><th>Transaction ID</th><th>Amount</th><th>Status</th></tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p._id}>
                  <td className="whitespace-nowrap">{formatDate(p.createdAt)}</td>
                  <td className="font-semibold text-neutral">{p.tuitionSubject}</td>
                  <td>{tutor ? p.studentName : p.tutorName}</td>
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
