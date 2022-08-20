// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

// import  * as firebase  from "firebase";
//  const firebaseConfig = {
//    apiKey: "AIzaSyAU7OQPS5DrfgQiRhl14yPq-QT59LFCtgI",
//    authDomain: "whatinmyfridge.firebaseapp.com",
//    projectId: "whatinmyfridge",
//    storageBucket: "whatinmyfridge.appspot.com",
//    messagingSenderId: "912351029195",
//    appId: "1:912351029195:web:8dba5988138c40107e384e"
//  };
//  // Initialize Firebase
//  let app;
//  if(firebase.apps.length === 0){
//      app = firebase.initializeApp(firebaseConfig);
//  }else{
//      app = firebase.app()
//  }
//  const auth = firebase.auth();
//  export{auth};

import app from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export {app, auth, firestore};