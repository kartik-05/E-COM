// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBU5ALxrRFSVUebeJ45aG3nEsXzR2tzyls",
  authDomain: "gameon-d06a6.firebaseapp.com",
  projectId: "gameon-d06a6",
  storageBucket: "gameon-d06a6.appspot.com",
  messagingSenderId: "53934145311",
  appId: "1:53934145311:web:58f3699addcf64198bba2a",
  measurementId: "G-YNRGYX7SYQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

var storage = getStorage(app);
export default storage;
