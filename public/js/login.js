import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFIL8N-d5POTlzxZwg4C5xSJmU9KJujPY",
  authDomain: "firestore-app-13292.firebaseapp.com",
  projectId: "firestore-app-13292",
  storageBucket: "firestore-app-13292.firebasestorage.app",
  messagingSenderId: "265444500199",
  appId: "1:265444500199:web:59af772fc030c4ba003842",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// DOM Elements
const submitButton = document.getElementById("submit");
const errorMessage = document.getElementById("error-message");
const usernameField = document.getElementById("username");
const passwordField = document.getElementById("password");
const passIcon = document.getElementById("pass-icon");
const rmCheck = document.getElementById("remember-me");

// State variables
let passwordVisible = false;

// Initialize "Remember Me" state
initializeRememberMe();

// Event listeners
submitButton.addEventListener("click", handleFormSubmission);
passIcon.addEventListener("click", togglePasswordVisibility);

/**
 * Initialize the "Remember Me" feature
 */
function initializeRememberMe() {
  if (localStorage.checkbox && localStorage.checkbox !== "") {
    rmCheck.checked = true;
    usernameField.value = localStorage.email || "";
    passwordField.value = localStorage.password || "";
  } else {
    rmCheck.checked = false;
    usernameField.value = "";
    passwordField.value = "";
  }
}

/**
 * Handle form submission
 */
function handleFormSubmission(event) {
  event.preventDefault();

  const username = usernameField.value.trim();
  const password = passwordField.value.trim();

  if (!username || !password) {
    displayError("Please fill in both username and password.");
    return;
  }

  if (rmCheck.checked) {
    localStorage.setItem("checkbox", "true");
    localStorage.setItem("email", username);
    localStorage.setItem("password", password);
  } else {
    localStorage.removeItem("checkbox");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  }

  // Firebase Authentication
  signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      clearError();
      alert("Logging in...");
      window.location.href = "home.html"; // Redirect to home page
    })
    .catch((error) => {
      displayError(error.message);
    });
}

/**
 * Toggle password visibility
 */
function togglePasswordVisibility() {
  if (passwordVisible) {
    passwordField.type = "password";
    passIcon.src = "img/eye-close.png";
  } else {
    passwordField.type = "text";
    passIcon.src = "img/eye-open.png";
  }
  passwordVisible = !passwordVisible;
}

/**
 * Display error messages
 */
function displayError(message) {
  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.style.color = "red";
  } else {
    alert(`Error: ${message}`);
  }
}

/**
 * Clear error messages
 */
function clearError() {
  if (errorMessage) {
    errorMessage.textContent = "";
  }
}
