// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCPxst1oWNVqOxwGaEmHSnob5_ahfrxjNs",
    authDomain: "soul-source-9fa61.firebaseapp.com",
    projectId: "soul-source-9fa61",
    storageBucket: "soul-source-9fa61.appspot.com",
    messagingSenderId: "301996501723",
    appId: "1:301996501723:web:68803a04a4205e5f30fafe",
    measurementId: "G-8VFN0994SH"
};

firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebase.auth();
// export const firebaseDB = firebase.database();

export default firebase;