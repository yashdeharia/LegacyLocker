// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA87DdPXWn14cPDXvxP2C-LXAQwUjkM5lc",
  authDomain: "legacylocker-295da.firebaseapp.com",
  projectId: "legacylocker-295da",
  storageBucket: "legacylocker-295da.firebasestorage.app",
  messagingSenderId: "396076710943",
  appId: "1:396076710943:web:5ccb287cf37aa32c90292a",
  measurementId: "G-DPWHC0BSKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

console.log("hogaya installed")

export { storage, firebaseConfig };