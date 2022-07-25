import * as firebaseApp from "firebase/app";
// import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import * as firebaseAuth from 'firebase/auth';
import * as firebaseDatabase from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
export const app = firebaseApp.initializeApp(firebaseConfig);
export default app;


// Authentication
export const auth = firebaseAuth.getAuth(app);

export const authInstance = firebaseAuth;

export const googleAuthProvider = new firebaseAuth.GoogleAuthProvider();

export const githubAuthProvider = new firebaseAuth.GithubAuthProvider();

// Database
export const database = firebaseDatabase.getFirestore(app);

export const databaseInstance = firebaseDatabase;

