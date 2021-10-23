import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCsCz9GNYM3Pb5_u0zPYH7ZyN_ZdvloSpM",
  authDomain: "auzh-developement.firebaseapp.com",
  projectId: "auzh-developement",
  storageBucket: "auzh-developement.appspot.com",
  messagingSenderId: "816901510848",
  appId: "1:816901510848:web:56a8f3230620e726163f25"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export default app;
