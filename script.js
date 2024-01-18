// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDuxw8usHrNnpBSFVG7QL4VQ0Iqwj3W2g",
  authDomain: "softwareengineering-e29f1.firebaseapp.com",
  projectId: "softwareengineering-e29f1",
  storageBucket: "softwareengineering-e29f1.appspot.com",
  messagingSenderId: "232142952313",
  appId: "1:232142952313:web:dff5ac81bad1bce13c81a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export const addItem = function(item){
// Try to add a record to the database
try {
  const docRef =  addDoc(collection(db, "todos"), {
  name: item,
  isCompleted: false,
    
  });
  console.log("Document written with ID: ", docRef.id);
} 
catch (e) {
  console.error("Error adding item to database: ", e);
}
  document.getElementById("newItem").value = "";
}

export const showItems = async function(){
  //then print everything
  const databaseItems = await getDocs(collection(db, "todos"));
  var itemsToDo = document.getElementById("todos");
  var completedItems = document.getElementById("completed");
  itemsToDo.innerHTML = "";
  completedItems.innerHTML = "";
  databaseItems.forEach((item) => {
    if(!item.data().isCompleted){
      var checkbox = document.createElement("button");
      // checkbox.id = item.id;
      checkbox.innerHTML = "Mark Complete";
      checkbox.onclick = function() {
        const itemToComplete = doc(db, "todos", item.id);
        // Set the "isCompleted" field of the item
        updateDoc(itemToComplete, {
          isCompleted: true
        });
        showItems();
      };
      var newPar = document.createElement("label");
      newPar.innerHTML = item.data().name;
      newPar.for = item.id;
      itemsToDo.appendChild(checkbox);
      itemsToDo.appendChild(newPar);
      itemsToDo.appendChild(document.createElement("br"));
    }
    else{
      var newPar = document.createElement("p");
      newPar.innerHTML = item.data().name;
      completedItems.appendChild(newPar);
    }
      console.log(item.id + ", " + item.data().name);
  });
}




export const login =  function(email, password){
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    location.replace('list.html');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });


}
