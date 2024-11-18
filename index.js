import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCSL8G_cSeNObDA8paC5cPaBtZkGEGKlCs",
    authDomain: "sinhnhat-9fa13.firebaseapp.com",
    projectId: "sinhnhat-9fa13",
    storageBucket: "sinhnhat-9fa13.firebasestorage.app",
    messagingSenderId: "703409036417",
    appId: "1:703409036417:web:6dd9043f1f7b18c6a08180",
    measurementId: "G-BFGLV0YZ3R"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Ensure auth is initialized

// Get references to form inputs and the submit button
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('submit');

// Add click event listener to the submit button
submitButton.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get the input values
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Input validation
    if (!email || !password) {
        console.error('Email or password cannot be empty');
        alert('Please enter both email and password.');
        return;
    }

    // Create user with email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User successfully created
            const user = userCredential.user;
            console.log('User created:', user);
            alert('User account created successfully!');
            window.location.href = "./happy/grand.html";

        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error:', errorCode, errorMessage);

            // Display user-friendly error messages
            if (errorCode === 'auth/email-already-in-use') {
                alert('This email is already in use. Please try another.');
            } else if (errorCode === 'auth/invalid-email') {
                alert('Invalid email format. Please check your email.');
            } else if (errorCode === 'auth/weak-password') {
                alert('Password is too weak. Please use a stronger password.');
            } else {
                alert('Error creating account: ' + errorMessage);
            }
        });
});
