document.addEventListener('DOMContentLoaded', (event) => {
    gsap.from(".container", {duration: 1, y: 50, opacity: 0, ease: "power3.out"});
    gsap.from("h1, p", {duration: 1, y: 20, opacity: 0, stagger: 0.2, delay: 0.5, ease: "power3.out"});
    gsap.from(".float", {duration: 1, scale: 0, opacity: 0, delay: 1, ease: "elastic.out(1, 0.5)"});
});

// document.getElementById('toggleNewPassword').addEventListener('click', function() {
//     const password = document.getElementById('newPassword');
//     const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
//     password.setAttribute('type', type);
//     this.classList.toggle('bx-show');
//     this.classList.toggle('bx-hide');
// });

document.getElementById('resetPasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    // Password reset email sent!
    // ..
    window.location.href ='/login.html';
    window.alert("Password reset email sent to " + email);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
    console.log(errorMessage);
  });
    if (document.getElementById('newPassword').value !== document.getElementById('confirmNewPassword').value) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Passwords do not match!',
            confirmButtonColor: '#4f46e5'
        });
        return;
    }
    Swal.fire({
        title: 'Resetting your password...',
        html: 'Please wait',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        },
    });

    setTimeout(() => {
        Swal.fire({
            icon: 'success',
            title: 'Password reset successfully!',
            text: 'You can now log in with your new password',
            confirmButtonColor: '#4f46e5'
        });
    }, 2000);
});