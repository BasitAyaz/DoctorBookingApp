// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrWNfsPn4VChXCQEMwXxAQBXVOeJXilbM",
  authDomain: "zzaadmin.firebaseapp.com",
  databaseURL: "https://zzaadmin-default-rtdb.firebaseio.com",
  projectId: "zzaadmin",
  storageBucket: "zzaadmin.appspot.com",
  messagingSenderId: "589107365746",
  appId: "1:589107365746:web:eda6a0a59accf48b6a7feb",
  measurementId: "G-W294EXYFP9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getDatabase();

var category = document.getElementById("category");
var name = document.getElementById("name");
var email = document.getElementById("email");
var password = document.getElementById("password");
var startTime = document.getElementById("startTime");
var endTime = document.getElementById("endTime");
var location = document.getElementById("location");

window.selectCategory = function () {
  if (category.value == "doctor") {
    startTime.style.display = "block";
    endTime.style.display = "block";
    location.style.display = "block";
  }
};

window.signUp = function () {
  if (!category.value) {
    alert("Enter Category");
    return;
  }
  if (!name.value) {
    alert("Enter name");
    return;
  }
  if (!email.value) {
    alert("Enter email");
    return;
  }
  if (!password.value) {
    alert("Enter password");
    return;
  }

  var obj = {
    category: category.value,
    name: name.value,
    email: email.value,
    password: password.value,
    startTime: startTime.value,
    endTime: endTime.value,
    location: location.value,
  };

  createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (res) {
      console.log(res.user.uid);
      obj.id = res.user.uid;
      const reference = ref(db, `users/${obj.id}/`);
      set(reference, obj)
        .then(function () {
          localStorage.setItem("userAuthId", obj.id);
          window.location.replace("../index.html");
        })
        .catch(function (err) {
          alert(err.message);
        });
    })
    .catch(function (err) {
      alert(err.message);
    });

  console.log(obj);
};
