import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { 
    getAuth, 
    signOut } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
    getFirestore,
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCWWSWx-0i3APLa6uVagGtvtnmVe9hCCnw",
    authDomain: "singin-732f2.firebaseapp.com",
    projectId: "singin-732f2",
    storageBucket: "singin-732f2.appspot.com",
    messagingSenderId: "719826244834",
    appId: "1:719826244834:web:0a61cfe5d8a02e8ee53abb",
    measurementId: "G-H90TZWV5B8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logout = document.getElementById('logout');
const userName = document.getElementById('userName');
const email = document.getElementById('email');
const profileImage = document.getElementById('profileImage');

console.log("User is logged in");

logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        location.href = '../index.html';
        }).catch((error) => {
            console.log(error);
            });
    });

document.addEventListener('DOMContentLoaded', async () => {
    const userUid = localStorage.getItem('userUid');
    if (userUid) {
        const q = query(collection(db, 'personalData'), where('uid', '==', userUid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            userName.innerText = `${data.firstName} ${data.lastName}`;
            email.innerText = data.email;
            profileImage.src = data.profileImage;
        });
    } else {
        location.href = '../index.html';
    }
});

(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        });
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });
})();
