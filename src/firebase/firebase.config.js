// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVY52RULbHUN649FgZQpVTnaJudMDsoxg",
  authDomain: "plateshare-986cd.firebaseapp.com",
  projectId: "plateshare-986cd",
  storageBucket: "plateshare-986cd.firebasestorage.app",
  messagingSenderId: "305426874797",
  appId: "1:305426874797:web:62603cbae516e052622124"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app
