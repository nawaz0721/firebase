// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
    getFirestore,
    collection, 
    addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { 
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

// Your web app's Firebase configuration
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
const storage = getStorage(app);

const signUpButton = document.getElementById('signUp');
const sign_UpButton = document.getElementById('sign_Up');
const signInButton = document.getElementById('signIn');
const sign_InButton = document.getElementById('sign_In');
const container = document.getElementById('container');
const userEmail = document.getElementById('userEmail');
const userPassword = document.getElementById('userPassword');
const createdEmail = document.getElementById('createEmail');
const createdPassword = document.getElementById('createPassword');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const profileImage = document.getElementById('profile');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});


onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in");
        // window.location.href = '/my portfolio/index.html';
    } else {
        console.log("User is not logged in");
    }
});



sign_InButton.addEventListener('click', async () => {
    const email = userEmail.value;
    const password = userPassword.value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        window.location.href = './my portfolio/index.html';
        localStorage.setItem('userUid', user.uid);
    } catch (error) {
        alert(error.message);
    }
});

sign_UpButton.addEventListener('click', async () => {
    container.classList.remove("right-panel-active");
    const email = createdEmail.value;
    const password = createdPassword.value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const imageRef = ref(storage, `user/${user.uid}`);
        const url = await uploadImage(imageRef, profileImage.files[0]);

        const userData = {
            firstName: firstName.value,
            lastName: lastName.value,
            age: age.value,
            email: email,
            profileImage: url,
        };

        await addDoc(collection(db, 'personalData'), { ...userData, uid: user.uid });

        alert("User successfully created with " + email);
    } catch (error) {
        alert(error.message);
    }
});

const uploadImage = async (imgRef, file) => {
    try {
        await uploadBytes(imgRef, file);
        return await getDownloadURL(imgRef);
    } catch (error) {
        console.error(error);
    }
};
