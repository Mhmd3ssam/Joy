import { doc, setDoc, getFirestore , getDoc } from "firebase/firestore"; 
import app from "../Firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  sendPasswordResetEmail ,
  onAuthStateChanged
} from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth();

async function signup(auth, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}

async function login(auth, email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

async function logout(auth) {
  return signOut(auth)
}

async function resetPassword(auth, email) {
  return sendPasswordResetEmail(auth, email)
}

async function updatedEmail(auth , email) {
  return updateEmail(auth.currentUser, email)
}

async function setUser(Collection,id,{englishUserName,arabicUserName,userEmail,userPassword,userPhone}){
    return await setDoc(doc(db,Collection , id), {
      englishUserName:englishUserName,
      arabicUserName: arabicUserName,
      userPassword: userPassword,
      userEmail: userEmail,
      userPhone:userPhone
    })
}

async function getUser(collection, id){
  const docRef = doc(db,collection , id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
   return  console.log("No such document!");
  }
}



export {signup}
export {login}
export {logout}
export {resetPassword}
export {updatedEmail}
export {setUser}
export {getUser}