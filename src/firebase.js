import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCl0HboBYNFAnzCNWjRE26Z6os77aduxis",
  authDomain: "new-2399e.firebaseapp.com",
  projectId: "new-2399e",
  storageBucket: "new-2399e.appspot.com",
  messagingSenderId: "472971726075",
  appId: "1:472971726075:web:b3d3d169638a8809f9b45e",
  measurementId: "G-1J8CWJ5GB5",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
