
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "igenai-c8f1e.firebaseapp.com",
  projectId: "igenai-c8f1e",
  storageBucket: "igenai-c8f1e.firebasestorage.app",
  messagingSenderId: "272617014678",
  appId: "1:272617014678:web:415b6e0ef6b7aafd2d49b7",
  measurementId: "G-WKKGQDTYVL"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export { auth, provider }