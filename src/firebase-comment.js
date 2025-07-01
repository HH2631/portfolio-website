import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

// TODO: Replace this with your own Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPjqziswnzlBiD_uNTOUsAZHSdLdrrm2w",
    authDomain: "port-web-88497.firebaseapp.com",
    projectId: "port-web-88497",
    storageBucket: "port-web-88497.firebasestorage.app",
    messagingSenderId: "1074326088895",
    appId: "1:1074326088895:web:25328fee90709ef83daa0a"
};

// Initialize with a unique name
const app = initializeApp(firebaseConfig, 'comments-app');
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };