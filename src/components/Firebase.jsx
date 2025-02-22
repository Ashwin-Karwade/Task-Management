import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAMxx8d1P7BYEEw1vlRono0oN4haKeueJE",
  authDomain: "task-management-6404d.firebaseapp.com",
  projectId: "task-management-6404d",
  storageBucket: "task-management-6404d.firebasestorage.app",
  messagingSenderId: "166548792209",
  appId: "1:166548792209:web:4300761b3c1e5a1766f030",
  measurementId: "G-73GP4BM0ZY"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export default app;