import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnWC14kl59R7Iv98r0KePp9tdB5cfXMWg",
  authDomain: "clone-8a861.firebaseapp.com",
  projectId: "clone-8a861",
  storageBucket: "clone-8a861.firebasestorage.app",
  messagingSenderId: "227035745145",
  appId: "1:227035745145:web:49c408ad5a638e6c7ffda8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

