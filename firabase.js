import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyB1hO4vIIZ5jinP5ZOP4gGnpxKjLMaMYso",
  authDomain: "login-with-720b9.firebaseapp.com",
  projectId: "login-with-720b9",
  storageBucket: "login-with-720b9.firebasestorage.app",
  messagingSenderId: "733914856275",
  appId: "1:733914856275:web:142d1a0667a3f2a5bdffa6",
  measurementId: "G-CHX0ER7NP0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
}
export {signInWithGoogle}
