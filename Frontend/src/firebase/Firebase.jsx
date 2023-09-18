import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAry7XYEtUk8U0Da31dnwhVXo4xES2NvgY",
  authDomain: "weather-f949e.firebaseapp.com",
  projectId: "weather-f949e",
  storageBucket: "weather-f949e.appspot.com",
  messagingSenderId: "543503502184",
  appId: "1:543503502184:web:5a95d961aafee33f3324dd",
  measurementId: "G-8SRP235NYQ"
};

const app = initializeApp(firebaseConfig);
export default app;