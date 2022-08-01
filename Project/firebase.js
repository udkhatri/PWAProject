
  // Import the functions you need from the SDKs you need

export default class Firebase {
    constructor(){
      console.log('firebase.js loaded');

      const firebaseConfig = {
        
        //Firebase Keys will go here
      };

      const app = initializeApp(firebaseConfig);
      this.db = getFirestore(app);
      
    }
}
    