// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

// Configuración de Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VUE_APP_API_KEY,
  authDomain: import.meta.env.VUE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VUE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VUE_APP_APP_ID
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default app; 
export { firestore };
