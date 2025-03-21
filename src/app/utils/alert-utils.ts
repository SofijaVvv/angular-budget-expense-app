import Swal from 'sweetalert2';

export const showErrorAlert = (
  title: string,
  text: string,
  timer = 2000,
  showConfirmButton = true,
) => {
  return Swal.fire({ icon: 'error', title, text, timer, showConfirmButton });
};
