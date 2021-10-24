import React, { useContext, useState, useEffect } from "react";
import { auth } from "../Firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  sendPasswordResetEmail 
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const auth = getAuth();

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signup(auth, email, password) {
    //return auth.createUserWithEmailAndPassword(email, password);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  }

  async function login(auth, email, password) {
    //return auth.signInWithEmailAndPassword(email, password);
    return signInWithEmailAndPassword(auth, email, password)
    
  }

  async function logout(auth) {
    //return auth.signOut();
    return signOut(auth)
  }

  async function resetPassword(auth, email) {
    //return auth.sendPasswordResetEmail(email);
    return sendPasswordResetEmail(auth, email)
  }

  async function updatedEmail(auth , email) {
    //return currentUser.updateEmail(email);
    return updateEmail(auth.currentUser, email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updatedEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
