import Rebase from "re-base";
import firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAWEs61MG3F5HLzP7ijdWFpX9d9KJ9ZPJM",
  authDomain: "catch-of-the-day-trainin-7589a.firebaseapp.com",
  databaseURL:
    "https://catch-of-the-day-trainin-7589a-default-rtdb.firebaseio.com",
});

// rebase bindings
const base = Rebase.createClass(firebaseApp.database());

export default base;
