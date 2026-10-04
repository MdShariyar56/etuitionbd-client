import Swal from "sweetalert2";

const COLOR = "#0b6b53";

export const alertSuccess = (title, text) =>
  Swal.fire({
    icon: "success",
    title,
    text,
    timer: 2200,
    timerProgressBar: true,
    showConfirmButton: false,
  });

export const alertError = (message) =>
  Swal.fire({
    icon: "error",
    title: "Oops!",
    text: message,
    confirmButtonColor: COLOR,
  });
