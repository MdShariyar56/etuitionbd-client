import Swal from "sweetalert2";

export async function confirmAction({ title = "Are you sure?", text, confirmText = "Yes, continue", danger = false }) {
  const res = await Swal.fire({
    title,
    text,
    icon: danger ? "warning" : "question",
    showCancelButton: true,
    confirmButtonText: confirmText,
    confirmButtonColor: danger ? "#dc2626" : "#0b6b53",
    cancelButtonColor: "#64748b",
  });
  return res.isConfirmed;
}
