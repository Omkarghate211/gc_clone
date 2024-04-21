import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { getAnalytics } from "firebase/analytics";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBttHX2OQ7rO5iV3t9SJew0sS82Olicdus",
  authDomain: "classroom-726e9.firebaseapp.com",
  databaseURL: "https://classroom-726e9-default-rtdb.firebaseio.com",
  projectId: "classroom-726e9",
  storageBucket: "classroom-726e9.appspot.com",
  messagingSenderId: "126997284159",
  appId: "1:126997284159:web:0365bbe03fa0c57c683f8a",
  measurementId: "G-YER92TZG1X"
};



const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();





const googleProvider = new firebase.auth.GoogleAuthProvider();
// Sign in and check or create account in firestore
const signInWithGoogle = async () => {
  try {
    const response = await auth.signInWithPopup(googleProvider);
    console.log(response.user);
    const user = response.user;
    console.log(`User ID - ${user.uid}`);
    const querySnapshot = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (querySnapshot.docs.length === 0) {
      // create a new user
      await db.collection("users").add({
        uid: user.uid,
        enrolledClassrooms: [],
      });
    }
  } catch (err) {
    alert(err.message);
  }
};
const logout = () => {
  const userConfirmed = window.confirm("Are you sure you want to Logout?");

  if (userConfirmed) {
    auth.signOut();

  } else {
    // console.log("Deletion cancelled by user.");
  }
  // auth.signOut();
};

export { app, auth, storage, firebase, db, signInWithGoogle, logout }; // add   storage, googleAuthProvider,