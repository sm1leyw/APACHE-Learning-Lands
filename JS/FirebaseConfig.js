// JS/FirebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDFQ8ZgmvXTSVWlSUjnVJKT5KjWEQ-vICg",
  authDomain: "apache-ll.firebaseapp.com",
  projectId: "apache-ll",
  storageBucket: "apache-ll.firebasestorage.app",
  messagingSenderId: "379684983455",
  appId: "1:379684983455:web:88d0dd53dd70be921e08aa",
  measurementId: "G-D8M98PBM84"
};

// เพิ่ม 2 บรรทัดนี้ เพื่อเปิดสวิตช์ Firebase และส่งออกตัวแปร db ให้ไฟล์อื่นใช้งาน
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);