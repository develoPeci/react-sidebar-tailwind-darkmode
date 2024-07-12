import { getFirestore, doc, getDoc } from "firebase/firestore";
import AppFirebase from "../firebase-config";

const db = getFirestore(AppFirebase);

const fetchUserData = async (uid) => {
  try {
    const userDoc = doc(db, "usuarios", uid); 
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      console.log('userData', userData); 
      return userData;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
    throw error;
  }
};

export default fetchUserData;
