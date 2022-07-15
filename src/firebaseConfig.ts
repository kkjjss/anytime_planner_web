import { initializeApp } from "firebase/app";
// import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import * as firebaseAuth from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = firebaseAuth.getAuth(app);

export const authInstance = firebaseAuth;

export const googleAuthProvider = new firebaseAuth.GoogleAuthProvider();

export const githubAuthProvider = new firebaseAuth.GithubAuthProvider();

export default app;