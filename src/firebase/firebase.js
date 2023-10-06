// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCT05cR-23Dbkl8LABTjFPGfHfnt_D9PKs',
  authDomain: 'swpt-1c7b5.firebaseapp.com',
  projectId: 'swpt-1c7b5',
  storageBucket: 'swpt-1c7b5.appspot.com',
  messagingSenderId: '660384233317',
  appId: '1:660384233317:web:ccf24c78bcf8575832938c',
  measurementId: 'G-8DY57E9D2F',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
