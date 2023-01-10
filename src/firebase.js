import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDsY94Cwn7jdG8LWhUrR2uSNfVwCmW9iyg",
    authDomain: "blogdac-d8add.firebaseapp.com",
    projectId: "blogdac-d8add",
    storageBucket: "blogdac-d8add.appspot.com",
    messagingSenderId: "549938590740",
    appId: "1:549938590740:web:1f6c7cb527c85fcbb22301"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage}