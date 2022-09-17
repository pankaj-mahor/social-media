// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLkdv6AoPJNaFADtLAjCGxswi-pRNq-_0",
  authDomain: "react-social-2a2bd.firebaseapp.com",
  projectId: "react-social-2a2bd",
  storageBucket: "react-social-2a2bd.appspot.com",
  messagingSenderId: "450010067170",
  appId: "1:450010067170:web:bed152f8a0818af5616ebb",
  measurementId: "G-832RYPYBF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app)