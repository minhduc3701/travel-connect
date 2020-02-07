import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA13DiR0f31WdTkv9ahV76boHPCe6nZ14E",
  authDomain: "tc-account.firebaseapp.com",
  databaseURL: "https://tc-account.firebaseio.com",
  projectId: "tc-account",
  storageBucket: "tc-account.appspot.com",
  messagingSenderId: "529883594394",
  appId: "1:529883594394:web:a2dbbec19d2e9487b3a923",
  measurementId: "G-F0CV0GQJ4F"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;
