import Swal from "sweetalert2";

export const showAlertSuccess = (message) => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        text: message,
        showConfirmButton: false,
        flex: 1,
        timer: 1000
    });
}
export const showAlertConfirm = (title, text) => {
    return Swal.fire({
        title: title,
        icon: 'warning',
        text: text,
        showCancelButton: true,
        confirmButtonText: 'Có!',
        cancelButtonText: 'Không!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            return true;
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            return false
        }
    })
}