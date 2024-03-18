// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOhZNloTmqpBBPOy0103bsyhY-S-AQFi4",
  authDomain: "studyfusion-4620.firebaseapp.com",
  databaseURL: "https://studyfusion-4620-default-rtdb.firebaseio.com",
  projectId: "studyfusion-4620",
  storageBucket: "studyfusion-4620.appspot.com",
  messagingSenderId: "803677334069",
  appId: "1:803677334069:web:00a1efeaf396f553529f7c",
  measurementId: "G-6GR16XG4SR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;