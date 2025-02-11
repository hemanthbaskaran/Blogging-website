import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFIL8N-d5POTlzxZwg4C5xSJmU9KJujPY",
  authDomain: "firestore-app-13292.firebaseapp.com",
  projectId: "firestore-app-13292",
  storageBucket: "firestore-app-13292.firebasestorage.app",
  messagingSenderId: "265444500199",
  appId: "1:265444500199:web:59af772fc030c4ba003842"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(); // Initialize Firebase Auth

// Password visibility toggle
let passwordVisible = false;

function togglePasswordVisibility() {
  const passwordField = document.getElementById("password");
  const passIcon = document.getElementById("pass-icon");

  if (passwordVisible) {
    passwordField.type = "password";
    passIcon.src = "img/eye-close.png";
    passwordVisible = false;
  } else {
    passwordField.type = "text";
    passIcon.src = "img/eye-open.png";
    passwordVisible = true;
  }
}

// Add event listener for the password visibility toggle
document.getElementById("pass-icon").addEventListener("click", togglePasswordVisibility);

// Form submission handler
document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please fill out both fields.");
    return;
  }

  createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      alert("Account created successfully!");
      window.location.href = "home.html"; // Redirect to home page
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
});
