import Swal from "sweetalert2";

export const BUTTONS = {
  primary: "btn btn-primary rounded-full px-6",
  danger: "btn btn-error rounded-full px-6",
  cancel: "btn btn-ghost rounded-full px-6",
};

export const swal = Swal.mixin({
  buttonsStyling: false,
  reverseButtons: true,
  customClass: { popup: "etb-swal", confirmButton: BUTTONS.primary, cancelButton: BUTTONS.cancel },
  showClass: { popup: "swal-in" },
  hideClass: { popup: "swal-out" },
});
