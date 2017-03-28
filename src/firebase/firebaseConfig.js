import * as firebase from 'firebase'



 var config = {
    apiKey: "AIzaSyDF9ZteN3qgj0kZ5YZrphbfY1l8yd9k9Ps",
    authDomain: "quizapplication-a77d3.firebaseapp.com",
    databaseURL: "https://quizapplication-a77d3.firebaseio.com",
    storageBucket: "quizapplication-a77d3.appspot.com",
    messagingSenderId: "561230066857"
  };
  firebase.initializeApp(config);
//firebase link is required here


export default class FirebaseConfigration {
static ref = firebase.database().ref();
static storage = firebase.storage().ref();
static auth = firebase.auth();
static customLogin(user){
    return this.auth.signInWithEmailAndPassword(user.email,user.password)
}

}