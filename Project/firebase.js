
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";
  import { getFirestore, collection, addDoc,getDocs ,query,where,doc,updateDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js';

export default class Firebase {
    constructor(){
      console.log('firebase.js loaded');

      const firebaseConfig = {
        apiKey: "AIzaSyALep_uvvNo6obA_bB7-1GXE5_Ij7BTcus",
        authDomain: "pwaproject-d9ca0.firebaseapp.com",
        projectId: "pwaproject-d9ca0",
        storageBucket: "pwaproject-d9ca0.appspot.com",
        messagingSenderId: "438376804850",
        appId: "1:438376804850:web:ee23e6d6b22ab8341e7b6b",
        measurementId: "G-ZK1ZG85T0T"
      };

      const app = initializeApp(firebaseConfig);
      this.db = getFirestore(app);
      this.auth = getAuth(app);
      this.user = this.auth.currentUser;
    }

    signup(email, password){
      return new Promise((resolve,reject) =>{
        createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          resolve(user);
        })
        .catch((error) => {
        reject(error);
        });
      }) 
      }

      signin(email, password){
        return new Promise((resolve,reject) =>{
          signInWithEmailAndPassword(this.auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            resolve(user);
          }).catch((error) => {
            reject(error);
          });
        })
      }

      onAuthStateChanged(callback){
        onAuthStateChanged(this.auth, callback);
      }
}
    