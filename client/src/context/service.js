import { addDoc,query,where,getDocs, updateDoc, doc, getFirestore, deleteDoc} from "firebase/firestore";
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

async function setService(catgory,{ serviceName, serviceDescripition, servicePrice, servicePhone , imagePath }) {
    return await addDoc(catgory, {
        serviceName: serviceName,
        serviceDescripition: serviceDescripition,
        servicePrice: servicePrice,
        servicePhone: servicePhone,
        imagePath:imagePath,
        createdBy: auth.currentUser.email,
        offerd:false,
        offerRatio:null,
        createdAt: new Date(),
    });
}

async function editAllServicesFields(collectionName, documentId,{serviceDescripition,serviceName,servicePhone,servicePrice, offerd , offerRatio, imagePath}){
    const alyDocRef = doc(db, collectionName, documentId);
    await updateDoc(alyDocRef, { 
        serviceDescripition: serviceDescripition,
        serviceName: serviceName,
        servicePhone:servicePhone,
        servicePrice: servicePrice,
        offerd:offerd,
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


