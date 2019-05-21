import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyCJGzqivN5Fh5x-S-8zD2of1KvPIaoFxr4",
  authDomain: "udemy-ninja-chat-49899.firebaseapp.com",
  databaseURL: "https://udemy-ninja-chat-49899.firebaseio.com",
  projectId: "udemy-ninja-chat-49899",
  storageBucket: "udemy-ninja-chat-49899.appspot.com",
  messagingSenderId: "913347525404",
  appId: "1:913347525404:web:1809007f57fc2086"
};
// Initialize Firebase
const firebaseApp =  firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()