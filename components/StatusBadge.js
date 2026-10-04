const styles = {
  pending: "badge-warning",
  approved: "badge-success",
  rejected: "badge-error",
  active: "badge-success",
  blocked: "badge-error",
  succeeded: "badge-success",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`badge badge-soft capitalize ${styles[status] || "badge-neutral"}`}>{status}</span>
  );
}
