import React, { useContext, useState, useEffect } from "react";
import { auth } from "../Firebase";
import { doc, setDoc, getFirestore , getDoc, addDoc , collection , query, where } from "firebase/firestore"; 
import app from "../Firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  sendPasswordResetEmail ,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const auth = getAuth();
  const db = getFirestore(app);




  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

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

  function updatePassword(password) {
    return currentUser.updatePassword(password);
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

  async function getService(collection, id){
    const docRef = doc(db,collection , id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
  
     return  console.log("No such document!");
    }

  }

  async function setService(catgory,{serviceName,serviceDescripition,servicePrice,servicePhone}){

    return await addDoc( catgory,{
      serviceName:serviceName,
      serviceDescripition:serviceDescripition,
      servicePrice:servicePrice,
      servicePhone:servicePhone,
      createdBy: auth.currentUser.email
    });
    
  }

  async function getAllUserService(){
    
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


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser,auth]);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updatedEmail,
    updatePassword,
    setUser,
    getUser,
    setService,
    getService
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
