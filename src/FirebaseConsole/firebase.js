// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
require("dotenv").config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

/*
const firebaseConfig = {
  apiKey: "AIzaSyAZmYazovaaf1DZbbtM3GYwHdIzKHMM6CA",
  authDomain: "clone-295a6.firebaseapp.com",
  projectId: "clone-295a6",
  storageBucket: "clone-295a6.appspot.com",
  messagingSenderId: "278278145914",
  appId: "1:278278145914:web:897c85a87cb450f07338c3",
  measurementId: "G-V5SX8PNWWM",
};
*/
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain:  process.env.AUTHDOMAIN,
  projectId:  process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId:  process.env.MASSAGINGSENDERID,
  appId:  process.env.APPID,
  measurementId:  process.env.MEASUREMENTID,
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
