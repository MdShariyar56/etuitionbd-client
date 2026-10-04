import { BUTTONS, swal } from "./swal";

export async function confirmAction({ title = "Are you sure?", text, confirmText = "Yes, continue", danger = false }) {
  const res = await swal.fire({
    title,
    text,
    icon: danger ? "warning" : "question",
    iconColor: danger ? "var(--color-error)" : "var(--color-primary)",
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: "Cancel",
    customClass: {
      popup: "etb-swal",
      confirmButton: danger ? BUTTONS.danger : BUTTONS.primary,
      cancelButton: BUTTONS.cancel,
    },
  });
  return res.isConfirmed;
}
