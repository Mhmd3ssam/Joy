import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
const firebaseConfig = {
  // apiKey: "AIzaSyAPlhhe0YQA3jCRVT7fzee7AfT06Hvig74",
  // authDomain: "test-145b9.firebaseapp.com",
  // projectId: "test-145b9",
  // storageBucket: "test-145b9.appspot.com",
  // messagingSenderId: "376795287070",
  // appId: "1:376795287070:web:1729695c7bfbe7d89ba80f"
  apiKey: "AIzaSyD8LkRfAIW5GIAqKBezNf3t1rHe8ziSaKQ",
  authDomain: "jooy-dadba.firebaseapp.com",
  projectId: "jooy-dadba",
  storageBucket: "jooy-dadba.appspot.com",
  messagingSenderId: "100134874659",
  appId: "1:100134874659:web:68834c90b339dfa9a94b96",
  measurementId: "G-HGCC5Q6FYT"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export default app;
