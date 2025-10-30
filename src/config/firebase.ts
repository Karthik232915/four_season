import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMFoiFkQzG7CeOT0CVpVU47n7uc3KFp5w",
  authDomain: "e-commerce-2762e.firebaseapp.com",
  projectId: "e-commerce-2762e",
  storageBucket: "e-commerce-2762e.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
