// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCh1171Mf8YXpa_mP6inxzLJqp9RDYQ588",
  authDomain: "votaciones-70f6d.firebaseapp.com",
  projectId: "votaciones-70f6d",
  storageBucket:"votaciones-70f6d.appspot.com",
  messagingSenderId: "1043395963178",
  appId: "1:1043395963178:web:8c37f37101c525d1785653"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default app; 
export { firestore };
