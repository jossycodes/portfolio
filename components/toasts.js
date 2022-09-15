import Swal from 'sweetalert2'
 
export default function Toast(title,icon) {
const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: false, 
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

toast.fire({
  icon: icon,
  title: title 
}) 
}