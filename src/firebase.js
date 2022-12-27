import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCTUum3itIuwyx81Vb_2uQBVJs1UVsKu50",
    authDomain: "react-blog-698ba.firebaseapp.com",
    databaseURL: "https://react-blog-698ba-default-rtdb.firebaseio.com",
    projectId: "react-blog-698ba",
    storageBucket: "react-blog-698ba.appspot.com",
    messagingSenderId: "963259049845",
    appId: "1:963259049845:web:8cde42b516381994b0553c",
    measurementId: "G-SC9LC06NB5"
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export default firebase;  