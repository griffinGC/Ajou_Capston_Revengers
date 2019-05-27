import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyCVG_0UMNpKdBTQnFX69hQlcu-NKSpcQis",
    authDomain: "farmroad-62098.firebaseapp.com",
    databaseURL: "https://farmroad-62098.firebaseio.com",
    projectId: "farmroad-62098",
    storageBucket: "farmroad-62098.appspot.com",
    messagingSenderId: "738792225888",
    appId: "1:738792225888:web:3c549003bf088676"
};
// Initialize Firebase
const firebaseApp =  firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()