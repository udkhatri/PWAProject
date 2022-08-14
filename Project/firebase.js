
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInAnonymously,signInWithEmailAndPassword, onAuthStateChanged,updateProfile } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";
  import { getFirestore, setDoc,collection, addDoc,getDocs ,query,where,doc,updateDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js';

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
      storeUserName(name){
        updateProfile(this.auth.currentUser, {
          displayName: name
        })
      }
      logout(){
        return new Promise((resolve,reject) =>{
          this.auth.signOut()
          resolve(true)
        });
      }
      anonymousLogin(){
        return new Promise((resolve,reject) =>{
          const auth = getAuth();
          signInAnonymously(auth)
            .then((user) => {
              console.log("Created",user.user);
              this.createUser(user.user.uid, "Guest user", "Anonymous",user.user.isAnonymous);
              resolve(user.user);
            })
            .catch((error) => {
              reject(error.message);
              const errorCode = error.code;
              const errorMessage = error.message;
            });
        })
        
      }
      async createUser(id,name,email,isAnonymous) {
        const newUserRef = doc(collection(this.db, "users"),id);
        let data = {
          isGuest: isAnonymous,
          name: name,
          email: email,
          id: id,
          favorites: []
        }
        await setDoc(newUserRef, data);
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
      async getUserData(id){
        console.log("Reached here",id);
        return new Promise(async (resolve,reject) =>{
          const q = query(collection(this.db, "users"), where("id", "==", id));
          const querySnapshot = await getDocs(q);
          console.log("op", querySnapshot);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            resolve(doc.data());
          });
        }
        )
      }
      onAuthStateChanged(callback){
        onAuthStateChanged(this.auth, callback);
      }
      async addToFavorite(user,id,oldFavorites){
        console.log("data: ",user,oldFavorites);
        return new Promise(async(resolve,reject) =>{
          const userCollection = doc(this.db, "users", user);
          var newArray = []
          console.log("fav is: ",oldFavorites);
          if (oldFavorites.includes(id)){
            const index = oldFavorites.indexOf(id);
            if (index > -1) { // only splice array when item is found
              oldFavorites.splice(index, 1); // 2nd parameter means remove one item only
            }
            console.log("new array is: ",oldFavorites);
            newArray = oldFavorites;
            resolve({newArray:newArray,added:false});
          }
          else{
            newArray = [...oldFavorites,id];
            resolve({newArray:newArray,added:true});
          }
          await updateDoc(userCollection, {
            favorites: newArray
          });
        }
        )
      }
}
    