// JS/auth.js
import { db } from "./firebase-config.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// ตัวแปรนี้จะเก็บรหัสลากเส้น (คุณต้องเอาค่าจาก Library ลากเส้นมาใส่ตัวแปรนี้)
// สมมติว่าลากเป็นตัว L ค่าอาจจะเป็น "14789"
window.currentPattern = ""; 

// ==========================================
// ระบบสร้างบัญชี (Sign Up)
// ==========================================
document.getElementById("btnSignUp").addEventListener("click", async () => {
    const name = document.getElementById("playerName").value.trim();
    const pattern = window.currentPattern;

    if (!name || !pattern) {
        return alert("ต้องพิมพ์ชื่อ และ ลากเส้นรหัสผ่านก่อนนะ!");
    }

    const userRef = doc(db, "students", name); // ใช้ชื่อเด็กเป็น ID
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
        alert("ชื่อนี้มีเพื่อนใช้ไปแล้ว ลองเติมตัวเลขหรือนามสกุลดูนะ!");
    } else {
        // บันทึกข้อมูลลงคลาวด์ (เริ่มด่าน 1 ทุกวิชา)
        await setDoc(userRef, {
            patternCode: pattern,
            magic_thai_progress: 1,
            score: 0
        });
        alert("สร้างบัญชีสำเร็จ! กดเข้าเล่นเกมได้เลย 🎉");
    }
});

// ==========================================
// ระบบเข้าสู่ระบบ (Log In)
// ==========================================
document.getElementById("btnLogin").addEventListener("click", async () => {
    const name = document.getElementById("playerName").value.trim();
    const pattern = window.currentPattern;

    if (!name || !pattern) {
        return alert("ต้องพิมพ์ชื่อ และ ลากเส้นรหัสผ่านก่อนนะ!");
    }

    const userRef = doc(db, "students", name);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
        const userData = docSnap.data();
        
        // เช็กว่ารหัสลากเส้นตรงกับที่เซฟไว้ไหม
        if (userData.patternCode === pattern) {
            alert("ยินดีต้อนรับกลับมา! ลุยกันเลย 🚀");
            
            // จำชื่อไว้ในเครื่อง และดึง Progress กลับมา
            localStorage.setItem("currentUser", name);
            localStorage.setItem("magic_thai_progress", userData.magic_thai_progress);
            
            // สั่งเปลี่ยนหน้าไปที่หน้าแผนที่ด่าน (ใส่ชื่อไฟล์แผนที่ของคุณ)
            window.location.href = "index.html"; 
        } else {
            alert("อ๊ะ! ลากเส้นรหัสผ่านผิดจ้า ลองวาดใหม่นะ ❌");
        }
    } else {
        alert("หาชื่อไม่เจอ สงสัยยังไม่ได้สมัครนะ!");
    }
});