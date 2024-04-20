// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-real-estate-58a60.firebaseapp.com',
  projectId: 'mern-real-estate-58a60',
  storageBucket: 'mern-real-estate-58a60.appspot.com',
  messagingSenderId: '371630089477',
  appId: '1:371630089477:web:c08ee1041668d9bed4836c',
  measurementId: 'G-5V0LY44MBF',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
