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
  User,
  NextOrObserver,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Category } from "../../store/categories/categories.types";

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

export type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocument = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done batch");
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");

  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  /*
      generate categorymap => 
          {
            'hats' : 
              [{"name": "Brown Brim","imageUrl": "https://i.ibb.co/ZYW3VTp/brown-brim.png","price": 25,"id": 1} , ...etc],
            
            'jackets' : 
              [{"price": 125,"id": 18,"imageUrl": "https://i.ibb.co/XzcwL5s/black-shearling.png","name": "Black Jean Shearling"}],

            'sneakers' : 
            [{"price": 220,"id": 10,"imageUrl": "https://i.ibb.co/0s3pdnc/adidas-nmd.png","name": "Adidas NMD}],

            ...etc
          } 
    
    */
  // moved to category.selector.js
  // const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot) => {
  //       const {title,items} = docSnapshot.data();
  //       acc[title.toLowerCase()] = items;
  //       return acc;
  // },{});

  // return categoryMap;

  // modified because we need to create multiple selectors for categories
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );
};

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

export const createUserDocumentAuth = async (
  userAuthData: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  // console.log('createUserDocumentAuth received',userAuthData,additionalInformation);

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
        ...additionalInformation,
      });
    } catch (err) {
      console.log("error creating the user", err);
    }
  }
  // without saga
  // return userDocRef;

  // with saga
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

// create user with email and password (dont need provider)
export const createAuthWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    return;
  }

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    return;
  }

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = async (
  callback: NextOrObserver<User>
) => onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
