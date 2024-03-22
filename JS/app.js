import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth,onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
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

var main = document.getElementById("main");
var products = [];

function renderProducts() {
  main.innerHTML = "";
  for (var i = 0; i < products.length; i++) {
    var x = products[i];

    main.innerHTML += `
      <div class="col-md-3">
        <div onclick="cardClick('${x.id}')" class="text-center">
              <img src="${x.imgUrl}" alt=""  width = "100%">
            <div class="p-2">
                    <h4>${x.title}</h4>
                    <p>${x.description}</p>
                    <h3>Rs ${x.price}/-</h3>
                <div class="d-flex justify-content-center align-items-center">
                    <button type="button" class="btn btn-secondary header">
                        ADD TO CART <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
      </div>`;
  }
}


function getProduct() {
  var reference = ref(db, `products/`);

  onValue(reference, function (data) {
    console.log(data.val());
    products = Object.values(data.val());
    renderProducts();
  });
}
getProduct();



function checkAuth(){
  onAuthStateChanged(auth, function(user) {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(uid)

    var userObj = localStorage.getItem("userData")
    userObj = JSON.parse(userObj)

      userBox.style.display = "block"
      userName.innerHTML = userObj.userName
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}
checkAuth()



window.logoutUser = function(){
  signOut(auth).then(() => {
    // Sign-out successful.
    localStorage.removeItem("userData")
  }).catch((error) => {
    // An error happened.
  });
}


window.cardClick = function(id){
  localStorage.setItem("productId",id)
  window.location.assign('pages/single product/singleproduct.html')
}