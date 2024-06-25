import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLKLrOpNK1kZP_GIrsfhe_ebcROpsoQ_s",
  authDomain: "my-maps-e2fe3.firebaseapp.com",
  projectId: "my-maps-e2fe3",
  storageBucket: "my-maps-e2fe3.appspot.com",
  messagingSenderId: "388199741472",
  appId: "1:388199741472:web:f55593209f4abac2356445",
  measurementId: "G-HHX98EGD8S"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };