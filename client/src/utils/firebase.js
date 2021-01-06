import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSmnVGYHZfhce1NXXJjzM9KJJNtZNf0eA",
  authDomain: "graphqlreactnode-822de.firebaseapp.com",
  projectId: "graphqlreactnode-822de",
  storageBucket: "graphqlreactnode-822de.appspot.com",
  messagingSenderId: "643555437576",
  appId: "1:643555437576:web:8719f4689450636a5ab5bd",
  measurementId: "G-BFWRNPJ3R8"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();