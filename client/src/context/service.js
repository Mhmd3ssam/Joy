import { addDoc,query,where,getDocs, updateDoc, doc, getFirestore, deleteDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from "../Firebase";
import { useState } from "react";

const auth = getAuth();
const db = getFirestore(app);
//const[services, setServices]=useState([])


async function setService(catgory,{ serviceName, serviceDescripition, servicePrice, servicePhone , imagePath , offerd , offerRatio}) {
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

async function editAllservices(collectionName, documentId,{serviceDescripition,serviceName,servicePhone,servicePrice}){
    const alyDocRef = doc(db, collectionName, documentId);
    await updateDoc(alyDocRef, { serviceDescripition: serviceDescripition,
         serviceName: serviceName,
         servicePhone:servicePhone,
         servicePrice: servicePrice
    });
}

async function editservice(collectionName, documentId,inputTitle){
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
export { editAllservices };
export { editservice };
export { setService };
export { deletService };


