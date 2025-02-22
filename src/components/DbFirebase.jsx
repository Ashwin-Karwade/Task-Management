import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMxx8d1P7BYEEw1vlRono0oN4haKeueJE",
  authDomain: "task-management-6404d.firebaseapp.com",
  databaseURL: "https://task-management-6404d-default-rtdb.firebaseio.com",
  projectId: "task-management-6404d",
  storageBucket: "task-management-6404d.firebasestorage.app",
  messagingSenderId: "166548792209",
  appId: "1:166548792209:web:4300761b3c1e5a1766f030",
  measurementId: "G-73GP4BM0ZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;