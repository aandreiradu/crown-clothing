import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { CollectionReference } from "firebase/firestore";
import { getFirestore, doc, getDoc, setDoc,collection,writeBatch,query,getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCl4kV9UzurzF-Gs9nGf6q-UJ4yvC-bToc",
  authDomain: "crwn-clothing-db-37a76.firebaseapp.com",
  projectId: "crwn-clothing-db-37a76",
  storageBucket: "crwn-clothing-db-37a76.appspot.com",
  messagingSenderId: "96883012174",
  appId: "1:96883012174:web:18de5ff5564100d207491f",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// Fireabse
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

// Firestore
export const db = getFirestore();

export const addCollectionAndDocument = async (collectionKey,objectsToAdd) => {
    const collectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef,object.title.toLowerCase());
      batch.set(docRef,object);
    })

    await batch.commit();
    console.log('done batch');
}


export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db,'categories');

    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);


    const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot) => {
          const {title,items} = docSnapshot.data();
          acc[title.toLowerCase()] = items;
          return acc;
    },{});

    return categoryMap;
}

export const createUserDocumentAuth = async (userAuthData,additionalInformation={}) => {
  console.log('createUserDocumentAuth received',userAuthData,additionalInformation);
  
    if (!userAuthData) {
    return;
  }

  const userDocRef = doc(db, "users", userAuthData?.uid);
  const userSnapshot = await getDoc(userDocRef);

  // check if user does not exists;
  if (!userSnapshot.exists()) {
    // create user
    const { email, displayName } = userAuthData;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName: displayName,
        email: email,
        createdAt: createdAt,
        ...additionalInformation
      });
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  }

  return userDocRef;
};

// create user with email and password (dont need provider)
export const createAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }

  return await createUserWithEmailAndPassword(auth, email, password);
};


export const signInAuthWithEmailAndPassword = async(email,password) => {
  if(!email  || !password) {
    return;
  }

  return await signInWithEmailAndPassword(auth,email,password)
}


export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = async (callback) => onAuthStateChanged(auth,callback);