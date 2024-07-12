// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDJPXk8fZ2_iaFzjEEE1p30n_5r8JqPU0",
  authDomain: "ryder-consulting.firebaseapp.com",
  projectId: "ryder-consulting",
  storageBucket: "ryder-consulting.appspot.com",
  messagingSenderId: "225884479857",
  appId: "1:225884479857:web:49d22bf9e9701f08b216d0"
};

// Initialize Firebase
const AppFirebase = initializeApp(firebaseConfig);


export default AppFirebase;