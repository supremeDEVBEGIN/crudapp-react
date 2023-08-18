// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCreH5J-DRivYRRdFhzZwKSqU65FU567o",
  authDomain: "crudapp-react-vite.firebaseapp.com",
  projectId: "crudapp-react-vite",
  storageBucket: "crudapp-react-vite.appspot.com",
  messagingSenderId: "276783860159",
  appId: "1:276783860159:web:76bbf6e9064efd5fef790a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}