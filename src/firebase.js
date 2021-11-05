// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBlG0EESaVlo0QxCMegbzvroGC_Px5uyjE",
	authDomain: "flyingstuff-94cd5.firebaseapp.com",
	projectId: "flyingstuff-94cd5",
	storageBucket: "flyingstuff-94cd5.appspot.com",
	messagingSenderId: "662696856709",
	appId: "1:662696856709:web:0f26c150a3c402ba7dedec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const realtime = getDatabase(app)

export default realtime