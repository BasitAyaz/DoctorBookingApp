// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import {
  getDatabase,
  onValue,
  onChildAdded,
  push,
  ref,
  set,
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
// const auth = getAuth();
const db = getDatabase();
var doctorDetail;

var doctorId = localStorage.getItem("doctorId");

if (!doctorId) {
  window.location.assign("../index.html");
}

var name = document.getElementById("name");
var startTime = document.getElementById("startTime");
var endTime = document.getElementById("endTime");
var location = document.getElementById("location");

function getDoctorData() {
  const reference = ref(db, `users/${doctorId}`);
  onValue(reference, function (dt) {
    doctorDetail = dt.val();
    name.innerHTML = doctorDetail.name;
    startTime.innerHTML = doctorDetail.startTime;
    endTime.innerHTML = doctorDetail.endTime;
    location.innerHTML = doctorDetail.location;
  });
}
getDoctorData();

var message = document.getElementById("message");

window.sendFeedback = function () {
  var obj = {
    message: message.value,
    time: JSON.stringify(new Date()),
  };

  const keyReference = ref(db, `users/${doctorId}/feedback/`);

  obj.id = push(keyReference).key;
  console.log(obj.id);

  const reference = ref(db, `users/${doctorId}/feedback/${obj.id}`);
  set(reference, obj);
};

// localStorage.setItem("arr", JSON.stringify(["as", "asd", "asd"]));
// var arrFromLocalStrg = JSON.parse(localStorage.getItem("arr"));
// localStorage.removeItem("arr");
