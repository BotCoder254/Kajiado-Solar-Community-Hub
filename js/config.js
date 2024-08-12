
  

  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBMjKssyRSZJ16EhSdVOFd2XjIkj8_BT-E",
    authDomain: "twitterclone-47ebf.firebaseapp.com",
    projectId: "twitterclone-47ebf",
    storageBucket: "twitterclone-47ebf.appspot.com",
    messagingSenderId: "700556014223",
    appId: "1:700556014223:web:a0646158ade0b1e55ab6fa"
  };

 const app = firebase.initializeApp(firebaseConfig);
 const auth = firebase.auth();
  firebase.analytics();
  const db = firebase.firestore();
  const storage = firebase.storage();



 
