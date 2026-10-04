import { swal } from "./swal";

export const alertSuccess = (title, text) =>
  swal.fire({
    icon: "success",
    iconColor: "var(--color-success)",
    title,
    text,
    timer: 2200,
    timerProgressBar: true,
    showConfirmButton: false,
  });

export const alertError = (message) =>
  swal.fire({
    icon: "error",
    iconColor: "var(--color-error)",
    title: "Oops!",
    text: message,
    confirmButtonText: "Got it",
  });
