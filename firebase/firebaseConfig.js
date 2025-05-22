// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuMtnaMbeYUbluD_ITrNoQZxmGHrdej8c",
  authDomain: "dekut-e-learning.firebaseapp.com",
  projectId: "dekut-e-learning",
  storageBucket: "dekut-e-learning.firebasestorage.app",
  messagingSenderId: "971055523000",
  appId: "1:971055523000:web:893394a952129d9ecb004d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };