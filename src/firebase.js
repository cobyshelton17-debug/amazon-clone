import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA6NVXKvSpSUv0Rv5tcfX-POXEfZG4mynU',
  authDomain: 'clone-1dc85.firebaseapp.com',
  projectId: 'clone-1dc85',
  storageBucket: 'clone-1dc85.firebasestorage.app',
  messagingSenderId: '643301814374',
  appId: '1:643301814374:web:3f0b2b78b4d8533bd27da7',
  measurementId: 'G-9S147ZK2CV',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
