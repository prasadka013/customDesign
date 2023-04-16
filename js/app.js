import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js'
import { collection, doc, addDoc, getFirestore } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const app = initializeApp({
    apiKey: "AIzaSyAHulvliwBoLxv9TiGPvXGjrIMPo1bVfBs",
    authDomain: "mini-project-acbef.firebaseapp.com",
    projectId: "mini-project-acbef",
    storageBucket: "mini-project-acbef.appspot.com",
    messagingSenderId: "919915545532",
    appId: "1:919915545532:web:d856cb2268f2739ad921b9",
    measurementId: "G-ECQ2TNBM5S",
});

btnLogin.addEventListener('click', (e) => {
    const email= document.getElementById('txtEmail').value;
    const password= document.getElementById('txtPassword').value;
    
    if (email=="Admin" && password=="Admin") 
        window.location= "admin.html";
    
     signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
         
        const user = userCredential.user;
        alert('login sucessful')
        window.location= "index.html";
      
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
    });
    const auth = getAuth();
});

const firestore = getFirestore(app);

const sizes = ["S", "M", "L", "XL"];

let size;

for(let i = 0; i < sizes.length; ++i) {
    document.getElementById(`size-${sizes[i].toLowerCase()}`).addEventListener('click', () => {
        size = sizes[i];
        for (let j = 0; j < sizes.length; ++j) {
            if (size === sizes[j])
                document.getElementById(
                    `size-${sizes[j].toLowerCase()}`
                ).style.backgroundColor = "orange";
            else
                document.getElementById(
                    `size-${sizes[j].toLowerCase()}`
                ).style.backgroundColor = "transparent";
        }
    });
}

document.getElementById('buyNow').addEventListener('click', () => {
    if(!size) 
        return alert('Select a tshirt size');
    html2canvas(document.getElementById("shirtDiv"), { useCORS:true}).then(async (canvas) => {
        const url = canvas.toDataURL();
        await addDoc(collection(firestore, "designs"), {
            image: url,
            size
        });
        alert('Order placed');
    });
});