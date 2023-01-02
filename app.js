// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import {
  getDatabase,
  onValue,
  onChildAdded,
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
// const auth = getAuth();
const db = getDatabase();

var userId = localStorage.getItem("userAuthId");
var userObj;
var doctorList = [];

var userName = document.getElementById("userName");
var parent = document.getElementById("parent");

function getDataById() {
  const reference = ref(db, `users/${userId}`);
  onValue(reference, function (dt) {
    console.log(dt.val());
    userObj = dt.val();
    userName.innerHTML = userObj.name;
  });
}

function renderDocList() {
  parent.innerHTML = "";
  for (var i = 0; i < doctorList.length; i++) {
    parent.innerHTML += `<div class="col-md-4 py-2">
        <div class="p-2 rounded shadow bg-white text-center">
          <h1><i class="fa-solid fa-user-doctor"></i></h1>
          <div class="p-3">
            <h2>${doctorList[i].name}</h2>
            <p>
              <span class='text-info'><i class="fa-solid fa-clock"></i></span> Timings: ${
                doctorList[i].startTime
              } - ${doctorList[i].endTime}
            </p>
            <p>
            <span class='text-info'><i class="fa-solid fa-location-dot"></i></span> Location: ${
              doctorList[i].location || "--"
            }
            </p>
            <div>
              <button onclick="moveDoctorPage('${
                doctorList[i].id
              }')" class="btn bg-info w-100 rounded-pill">
                View More
              </button>
            </div>
          </div>
        </div>
      </div>`;
  }
}

window.moveDoctorPage = function (doctorId) {
  console.log(doctorId);
  localStorage.setItem("doctorId", doctorId);
  window.location.assign("pages/doctor.html");
};

function getDoctorList() {
  const reference = ref(db, `users/`);
  onChildAdded(reference, function (dt) {
    var obj = dt.val();
    if (obj.category == "doctor") {
      doctorList.push(obj);
    }
    console.log(doctorList);
    renderDocList();
  });
}

getDataById();
getDoctorList();
