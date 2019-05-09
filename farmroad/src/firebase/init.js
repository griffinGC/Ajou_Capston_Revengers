import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyBzzQDHZI75GxN4rYJtiXF3BhEX7EZTI4A",
  authDomain: "farmroad-chat.firebaseapp.com",
  databaseURL: "https://farmroad-chat.firebaseio.com",
  projectId: "farmroad-chat",
  storageBucket: "farmroad-chat.appspot.com",
  messagingSenderId: "569763400968",
  appId: "1:569763400968:web:171d5cd3c014486e"
};
// Initialize Firebase
const firebaseApp =  firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()