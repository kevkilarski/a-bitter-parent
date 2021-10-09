// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJu5VEnfJ_BGyFokoIlHC0P6G7GBhjU7k",
    authDomain: "a-bitter-parent.firebaseapp.com",
    databaseURL: "https://a-bitter-parent-default-rtdb.firebaseio.com",
    projectId: "a-bitter-parent",
    storageBucket: "a-bitter-parent.appspot.com",
    messagingSenderId: "564251576224",
    appId: "1:564251576224:web:5f85d505da4f627dc2c6c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const realtime = getDatabase(app);


export default realtime;