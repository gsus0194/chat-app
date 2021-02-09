import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAS_kZEdziPX5X4cFDeUxdaeOco798tIF4",
  authDomain: "chat-app-194.firebaseapp.com",
  projectId: "chat-app-194",
  storageBucket: "chat-app-194.appspot.com",
  messagingSenderId: "775821151192",
  appId: "1:775821151192:web:6431c7af9510bebaee40ad",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
