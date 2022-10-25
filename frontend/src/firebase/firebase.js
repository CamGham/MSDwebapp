import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrvTiijvp2jnPvnQuJwX-96ozQBhtLLlA",
  authDomain: "msdshooter-5d748.firebaseapp.com",
  projectId: "msdshooter-5d748",
  storageBucket: "msdshooter-5d748.appspot.com",
  messagingSenderId: "220828170947",
  appId: "1:220828170947:web:a166ef59d20be7e32f8076",
  measurementId: "G-60JSFHFE4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
