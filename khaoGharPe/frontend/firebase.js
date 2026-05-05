// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "khao-ghar-pe.firebaseapp.com",
  projectId: "khao-ghar-pe",
  storageBucket: "khao-ghar-pe.firebasestorage.app",
  messagingSenderId: "758134244174",
  appId: "1:758134244174:web:912ab9672d2565bb07141f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {app,auth}