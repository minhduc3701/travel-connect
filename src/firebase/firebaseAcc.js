import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";
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

const firebaseConfigApp = {
  apiKey: "AIzaSyCnJTOQTnRiyaP8y-prCMaoIu9cbpn2bE0",
  authDomain: "tc-appglobal.firebaseapp.com",
  databaseURL: "https://tc-appglobal.firebaseio.com",
  projectId: "tc-appglobal",
  storageBucket: "tc-appglobal.appspot.com",
  messagingSenderId: "241697753440",
  appId: "1:241697753440:web:f28ffc2065f7d30b96f605",
  measurementId: "G-T8RMP555B3"
};

const firebaseAccConfigB2B = {
  apiKey: "AIzaSyCS_TcfDb_dslwU9lh-a8Hhb3e38Q7Il1c",
  authDomain: "tc-b2b.firebaseapp.com",
  databaseURL: "https://tc-b2b.firebaseio.com",
  projectId: "tc-b2b",
  storageBucket: "tc-b2b.appspot.com",
  messagingSenderId: "342589287280",
  appId: "1:342589287280:web:07359311318e406bde7db5",
  measurementId: "G-8XPVLPR376"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

let FirebaseB2B = firebase.initializeApp(firebaseAccConfigB2B, "FirebaseB2B");
export let FirebaseDataB2B = FirebaseB2B.database();

let FirebaseApp = firebase.initializeApp(firebaseConfigApp, "FirebaseApp");
export let FirebaseDataApp = FirebaseApp.database();

export default firebase;
