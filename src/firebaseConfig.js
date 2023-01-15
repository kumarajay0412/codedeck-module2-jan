
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBthUPxFhTumeMLCmP55NC8a4Og9CXgA_s",
    authDomain: "codedeckmodule2.firebaseapp.com",
    projectId: "codedeckmodule2",
    storageBucket: "codedeckmodule2.appspot.com",
    messagingSenderId: "280489929374",
    appId: "1:280489929374:web:209095af3bebc652ca698f",
    measurementId: "G-WBS5K65HZ9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebaseApp.auth();

export { db, auth };