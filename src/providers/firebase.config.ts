import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyCIvF8UbbHrxvrTQC4-oMfATtM9XCd9jac",
    authDomain: "tic-tac-toe-test-56f74.firebaseapp.com",
    databaseURL: "https://tic-tac-toe-test-56f74-default-rtdb.firebaseio.com",
    projectId: "tic-tac-toe-test-56f74",
    storageBucket: "tic-tac-toe-test-56f74.appspot.com",
    messagingSenderId: "401757048791",
    appId: "1:401757048791:web:67f347009e878176904592",
    measurementId: "G-MFV6STQF7M"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);