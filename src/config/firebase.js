import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"


const firebaseConfig = {
    apiKey: "SECRET",
    authDomain: "blogredux-26f93.firebaseapp.com",
    projectId: "blogredux-26f93",
    storageBucket: "blogredux-26f93.appspot.com",
    messagingSenderId: "73101190862",
    appId: "1:73101190862:web:0c52b8758148273416529f"
  };

const fire = firebase.initializeApp(firebaseConfig);


export const auth = fire.auth();
export const firestore = fire.firestore();
export const storage = fire.storage();