import firebase from "firebase"; 

const firebaseConfig = {
    apiKey: "AIzaSyA85m-AcvIPmIR4Vclw_pTTYwC5eIBa95g",
    authDomain: "instagram-6a06f.firebaseapp.com",
    projectId: "instagram-6a06f",
    storageBucket: "instagram-6a06f.appspot.com",
    messagingSenderId: "968338728794",
    appId: "1:968338728794:web:e56661241fc4015385f563",
    measurementId: "G-KFQ10006VT"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  
  const storage = firebase.storage();

  export {db,auth,storage};
 