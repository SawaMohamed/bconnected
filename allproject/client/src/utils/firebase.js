// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDTyT_jOAhCenzIDuTsExfTSkVCETbctVY',
  authDomain: 'bbconnectect.firebaseapp.com',
  projectId: 'bbconnectect',
  storageBucket: 'bbconnectect.appspot.com',
  messagingSenderId: '754763547446',
  appId: '1:754763547446:web:a140b93e93e7427e8b2997',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
