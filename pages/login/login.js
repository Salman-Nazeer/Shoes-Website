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

import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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

var email = document.getElementById('email')
var password = document.getElementById('password')

window.loginUser = function () {
    var obj = {
        email: email.value,
        password: password.value
    }
    console.log(obj)
    signInWithEmailAndPassword(auth, obj.email, obj.password)
        .then(function (res) {
            alert("Login Successfully", res)

            var id = res.user.uid

            var reference = ref(db, `users/${id}`)

            onValue(reference, function (data) {
                var responseUser = data.val()
                
                console.log(responseUser)

                localStorage.setItem("userData", JSON.stringify(responseUser))
            })

            email.value = "";
            password.value = "";

        }).catch(function (err) {
            alert(err)
        })
};