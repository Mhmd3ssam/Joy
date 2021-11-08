import { addDoc,query,where,getDocs, updateDoc, doc, getFirestore, deleteDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from "../Firebase";

const auth = getAuth();
const db = getFirestore(app);


async function setService(catgory,{ serviceName, serviceDescripition, servicePrice, servicePhone }) {
    return await addDoc(catgory, {
        serviceName: serviceName,
        serviceDescripition: serviceDescripition,
        servicePrice: servicePrice,
        servicePhone: servicePhone,
        createdBy: auth.currentUser.email,
        createdAt: new Date(),
    });
}

async function getAllUserService(serviceCollectionRef) {
    const userServices = query(
        serviceCollectionRef,
        where("createdBy", "==", auth.currentUser.email)
    );
    const querySnapshot = await getDocs(userServices);
    return querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
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
    await deleteDoc(doc(db, collectionName, documentId));
}

export {getAllUserService};
export { editAllservices };
export { editservice };
export { setService };
export { deletService };


