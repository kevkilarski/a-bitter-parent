import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyBgqrMFqBc8q8mmrC4pzU6WiD75NtsX_HU",

  authDomain: "a-bitter-parent-augmented.firebaseapp.com",

  projectId: "a-bitter-parent-augmented",

  storageBucket: "a-bitter-parent-augmented.appspot.com",

  messagingSenderId: "181994276915",

  appId: "1:181994276915:web:e29cfc15be81e0ba943b46"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const realtime = getDatabase(app);

export default realtime;
