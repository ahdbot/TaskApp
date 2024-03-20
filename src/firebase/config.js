// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7zjYycqcL9UzwgW8Qts4EqwCsf1Kv4GU",
  authDomain: "react2-lesson8-986e1.firebaseapp.com",
  projectId: "react2-lesson8-986e1",
  storageBucket: "react2-lesson8-986e1.appspot.com",
  messagingSenderId: "852480038136",
  appId: "1:852480038136:web:bda7fabdbea7b974ba570d"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);