import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  registerUser = (email, password) => {
    console.log('user registered');
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signInUser = (email, password) => {
    console.log('user signed in');
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOutUser = () => {
    console.log('signed out user');
    return this.auth.signOut();
  }

  resetPassword = (email) => {
    console.log('password reset done');
    return this.auth.sendPasswordResetEmail(email);
  }

  updatePassword = (password) => {
    console.log('updated user');
    return this.auth.currentUser.updatePassword(password);
  }
}

export default new Firebase();
