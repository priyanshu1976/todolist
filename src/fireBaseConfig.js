import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrLE8uoNelrPHDp8RK8SovJSLxo4cEX24",
  authDomain: "priyanshu-first-project.firebaseapp.com",
  projectId: "priyanshu-first-project",
  storageBucket: "priyanshu-first-project.appspot.com",
  messagingSenderId: "21033893080",
  appId: "1:21033893080:web:ee07b305eecca0a5552bad",
  measurementId: "G-1FZ2GSY0K8",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);
export { app, database, auth };
