import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

import {
  getStorage,
  ref as strRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHxf5bYlSnXANdpctodAQwaKQnB2av-QA",
  authDomain: "e-commerce-c6752.firebaseapp.com",
  databaseURL: "https://e-commerce-c6752-default-rtdb.firebaseio.com",
  projectId: "e-commerce-c6752",
  storageBucket: "e-commerce-c6752.appspot.com",
  messagingSenderId: "61225470679",
  appId: "1:61225470679:web:5e485117a22c5dc12e3e92",
  measurementId: "G-KM4NF5CN9C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth();
const storage = getStorage();

var user = localStorage.getItem("userDetails");

user = JSON.parse(user);
// console.log(user);

function imageUploader(file) {
  return new Promise(function (resolve, reject) {
    const storageRef = strRef(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        reject(error.message);
      },
      function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};

var imgUpload = document.getElementById("imgUpload");
var title = document.getElementById("title");
var decsription = document.getElementById("decsription");
var price = document.getElementById("price");

window.addItem = function () {
  imageUploader(imgUpload.files[0])
    .then(function (url) {
      var obj = {
        title: title.value,
        description: decsription.value,
        price: price.value,
        imgUrl: url,
      };

      console.log(obj)
      obj.id = push(ref(db, "products")).key;

      var reference = ref(db, `products/${obj.id}`);

      set(reference, obj);
    })
    .catch(function (err) {
      console.log(err);
    });
};