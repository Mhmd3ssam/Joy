import { doc, setDoc, getFirestore , getDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore"; 
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
//const userProviderCollectionRef = collection(db, "UserProvider");

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
async function editeUserData(collectionName, userEmailId,{englishUserName,userEmail,userPassword,userPhone,imagePath,gender}){
  const alyDocRef = doc(db, collectionName, userEmailId);
  await updateDoc(alyDocRef, { 
      englishUserName:englishUserName,
      userPassword: userPassword,
      userEmail: userEmail,
      userPhone:userPhone,
      imagePath:imagePath,
      gender:gender
  });
}
async function setUser(Collection,id,{englishUserName,userEmail,userPassword,userPhone,imagePath,gender,plane}){
    return await setDoc(doc(db,Collection , id), {
      englishUserName:englishUserName,
      userPassword: userPassword,
      userEmail: userEmail,
      userPhone:userPhone,
      imagePath:imagePath,
      gender:gender,
      plane:plane,
      createdAt: new Date(),
      paid:false
    })
}
async function setAdman(Collection,id,{englishUserName,userEmail,userPassword,userPhone,imagePath,gender,}){
    return await setDoc(doc(db,Collection , id), {
      englishUserName:englishUserName,
      userPassword: userPassword,
      userEmail: userEmail,
      userPhone:userPhone,
      imagePath:imagePath,
      gender:gender,
      createdAt: new Date(),
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

async function getAllServiceProviders(userProviderCollectionRef) {
  const querySnapshot = await getDocs(userProviderCollectionRef);
 return (querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

}

async function deleteSingleUser(collectionName, documentId){
    console.log(documentId)
    console.log(collectionName)
    console.log(db)
const userRef = doc(db, collectionName, documentId);
   return await deleteDoc(userRef);
}



export {signup}
export {login}
export {logout}
export {resetPassword}
export {updatedEmail}
export {setUser}
export {getUser}
export {editeUserData}
export {getAllServiceProviders}
export {deleteSingleUser}
export {setAdman}