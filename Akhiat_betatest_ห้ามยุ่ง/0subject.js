// ===== ข้อมูลวิชา =====
const subjects = {
    thai: { unlocked: true, name: "ภาษาไทย" },
    math: { unlocked: false, name: "คณิตศาสตร์" },
    science: { unlocked: false, name: "วิทยาศาสตร์" },
    english: { unlocked: false, name: "ภาษาอังกฤษ" }
};

// ===== เข้าเรียน =====
function enterSubject(subject) {
    if (!subjects[subject].unlocked) {
        alertLockedSubject();
        return;
    }

    // เอฟเฟกต์ก่อนเข้า
    const screen = document.getElementById("menu-screen");
    screen.style.opacity = "0";

    setTimeout(() => {
        alert("เข้าสู่วิชา " + subjects[subject].name);
        // ตรงนี้เอาไปเปลี่ยนหน้าได้ เช่น window.location
    }, 500);
}

// ===== แจ้งเตือนวิชาที่ยังล็อก =====
function alertLockedSubject() {
    // เอฟเฟกต์สั่นปุ่มทั้งหมดที่ล็อก
    document.querySelectorAll(".subject-btn.locked").forEach(btn => {
        btn.classList.add("shake");
        setTimeout(() => btn.classList.remove("shake"), 400);
    });

    alert("🔒 วิชานี้ยังไม่ปลดล็อก!");
}

// ===== ปลดล็อกวิชา =====
function unlockSubject(subject) {
    subjects[subject].unlocked = true;

    const btn = document.getElementById("btn-" + subject);
    btn.classList.remove("locked");
    btn.classList.add("unlocked");

    // เปลี่ยน onclick
    btn.onclick = () => enterSubject(subject);

    // เอฟเฟกต์ปลดล็อก
    btn.style.boxShadow = "0 0 30px lime";
    setTimeout(() => {
        btn.style.boxShadow = "";
    }, 1000);
}

// ===== โหลดหน้า =====
document.addEventListener("DOMContentLoaded", () => {

    // ตั้งค่า event ปุ่มทั้งหมด
    Object.keys(subjects).forEach(subject => {
        const btn = document.getElementById("btn-" + subject);

        if (subjects[subject].unlocked) {
            btn.onclick = () => enterSubject(subject);
        } else {
            btn.onclick = alertLockedSubject;
        }
    });

    // ตัวอย่าง: ปลดล็อกอัตโนมัติหลัง 3 วิ
    // setTimeout(() => unlockSubject("math"), 3000);
});