import { addDoc,query,where,getDocs, updateDoc, doc, getFirestore, deleteDoc, getDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from "../Firebase";
import { useState } from "react";

const auth = getAuth();
const db = getFirestore(app);
//const[services, setServices]=useState([])

async function getAllUserService(serviceCollectionRef) {
    const userServices = query(
        serviceCollectionRef,
        where("createdBy", "==", auth.currentUser.email)
    );
    const querySnapshot = await getDocs(userServices);
  //  console.log(querySnapshot)
  //  console.log(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
   return (querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    // return querySnapshot.forEach((doc) => {
    //     console.log(doc)
    //     console.log(doc.id, " => ", doc.data());
    // });
}


async function getSingleService(collection, id){
    const docRef = doc(db,collection , id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
     return  console.log("No such document!");
    }
  
  }

async function setService(catgory,{ serviceName, serviceDescripition, servicePrice, servicePhone , imagePath, brandName }) {
    return await addDoc(catgory, {
        serviceName: serviceName,
        serviceDescripition: serviceDescripition,
        servicePrice: servicePrice,
        brandName:brandName,
        servicePhone: servicePhone,
        imagePath:imagePath,
        createdBy: auth.currentUser.email,
        offerd:false,
        offerRatio:"",
        createdAt: new Date(),
    });
}
async function editAllServicesFields(collectionName, documentId,{serviceDescripition,serviceName,servicePhone,servicePrice, offerd , offerRatio, imagePath, brandName}){
    const alyDocRef = doc(db, collectionName, documentId);
    await updateDoc(alyDocRef, { 
        serviceDescripition: serviceDescripition,
        serviceName: serviceName,
        servicePhone:servicePhone,
        servicePrice: servicePrice,
        offerd:offerd,
        brandName:brandName,
        offerRatio:offerRatio,
        createdAt: new Date(),
        createdBy: auth.currentUser.email,
        imagePath: imagePath

    });
}

async function editServiceField(collectionName, documentId,inputTitle){
    const alyDocRef = doc(db, collectionName, documentId);
    await updateDoc(alyDocRef,{...{inputTitle:inputTitle}});
}

async function deletService(collectionName, documentId){
    console.log(documentId)
    console.log(collectionName)
    console.log(db)
const alyDocRef = doc(db, collectionName, documentId);
   return await deleteDoc(alyDocRef);
}

export {getAllUserService};
export { editAllServicesFields };
export { editServiceField };
export { setService };
export { deletService };
export { getSingleService };


