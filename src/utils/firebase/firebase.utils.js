import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  writeBatch,
} from 'firebase/firestore';

const { REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_MESSAGING_SENDER_ID, REACT_APP_FIREBASE_APP_ID } = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: "strava-runs.firebaseapp.com",
  projectId: "strava-runs",
  storageBucket: "strava-runs.appspot.com",
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID
};

initializeApp(firebaseConfig);

const db = getFirestore();
const AUTH_COLLECTION = 'auth';
const ACTIVITIES_COLLECTION = 'activities';
const TOKEN_DOCUMENT = 'token';

export const getToken = async () => {
  const docRef = doc(db, AUTH_COLLECTION, TOKEN_DOCUMENT);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const persistToken = async (token) => {
  return setDoc(doc(db, AUTH_COLLECTION, TOKEN_DOCUMENT), { ...token, last_modified_date: Date.now() });
}

const formatId = (id) => {
  const idStr = id.toString();
  if (idStr.length < 10) {
    return '0' + idStr;
  }
  return idStr;
}

export const saveActivities = async (activities) => {
  const batch = writeBatch(db);

  activities.forEach(activity => {
    const docRef = doc(db, ACTIVITIES_COLLECTION, formatId(activity.id));
    batch.set(docRef, activity);
  })
  try {
    await batch.commit();
  } catch (error) {
    console.log('Error during commit: ', error);
  }
}

export const fetchActivities = async () => {
  const q = query(collection(db, ACTIVITIES_COLLECTION), orderBy("id", "desc"), limit(10));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
  } catch (error) {
    console.log('Error retrieving activities ', error);
  }
}