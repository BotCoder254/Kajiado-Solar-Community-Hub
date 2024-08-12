document.addEventListener('DOMContentLoaded', (event) => {
    gsap.from(".container", {duration: 1, y: 50, opacity: 0, ease: "power3.out"});
    gsap.from("h1, p", {duration: 1, y: 20, opacity: 0, stagger: 0.2, delay: 0.5, ease: "power3.out"});
    gsap.from(".float", {duration: 1, scale: 0, opacity: 0, delay: 1, ease: "elastic.out(1, 0.5)"});
});

document.getElementById('togglePassword').addEventListener('click', function() {
    const password = document.getElementById('password');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('bx-show');
    this.classList.toggle('bx-hide');
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    window.location.href = 'login.html';
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    // ..
  });
    if (document.getElementById('password').value !== document.getElementById('confirmPassword').value) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Passwords do not match!',
            confirmButtonColor: '#4f46e5'
        });
        return;
    }
    Swal.fire({
        title: 'Creating your account...',
        html: 'Please wait',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        },
    });

    setTimeout(() => {
        Swal.fire({
            icon: 'success',
            title: 'Account created successfully!',
            text: 'Welcome to Kajiado Solar Community Hub',
            confirmButtonColor: '#4f46e5'
        });
    }, 2000);
});

// google button with firebase 

    var provider = new firebase.auth.GoogleAuthProvider();

    document.getElementById('googleButton').addEventListener('click', function() {
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
      
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          window.location.href = 'login.html';
          // IdP data available in result.additionalUserInfo.profile.
            // ...
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(errorMessage);
          // ...
        });
    });