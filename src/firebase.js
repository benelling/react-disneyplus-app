// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdMTOowVL_C-mDnwOiAuetqRZFkrHuksM",
  authDomain: "react-disneyplus-app-c0148.firebaseapp.com",
  projectId: "react-disneyplus-app-c0148",
  storageBucket: "react-disneyplus-app-c0148.appspot.com",
  messagingSenderId: "1081942072326",
  appId: "1:1081942072326:web:727cb01ae952fe61b17787"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;