import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
    apiKey: "AIzaSyCdr2N-ipWZShUUprg4XOZUgxLxv26IkcQ",
    authDomain: "netflix-clone-84cf1.firebaseapp.com",
    projectId: "netflix-clone-84cf1",
    storageBucket: "netflix-clone-84cf1.firebasestorage.app",
    messagingSenderId: "617796733221",
    appId: "1:617796733221:web:beedd01f0e3ea3bd6172cc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        });
    } catch (error) {
       toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, login, logout, signUp }