import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs } from "@firebase/firestore"; // Perbarui ini


// Your web app's Firebase configuration
// TODO: Replace this with your own Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPjqziswnzlBiD_uNTOUsAZHSdLdrrm2w",
  authDomain: "port-web-88497.firebaseapp.com",
  projectId: "port-web-88497",
  storageBucket: "port-web-88497.firebasestorage.app",
  messagingSenderId: "1074326088895",
  appId: "1:1074326088895:web:25328fee90709ef83daa0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };