// ================= ระบบ Admin Role =================
let isAdmin = false;
let clickCount = 0;
let clickTimer;

// ฟังก์ชันนับการคลิกหนังสือเวทมนตร์
function triggerAdminLogin() {
    clickCount++;
    clearTimeout(clickTimer);
    
    // ถ้าคลิกครบ 5 ครั้งติดกัน ให้โชว์หน้า Login
    if (clickCount >= 5) {
        document.getElementById('admin-modal').style.display = 'flex';
        document.getElementById('admin-password').value = '';
        clickCount = 0;
    }
    
    // ถ้ารีรอไม่กดต่อภายใน 1 วินาที ให้รีเซ็ตการนับใหม่ (กันเด็กกดมั่ว)
    clickTimer = setTimeout(() => { clickCount = 0; }, 1000);
}

function closeAdminModal() {
    document.getElementById('admin-modal').style.display = 'none';
}

function verifyAdmin() {
    const pass = document.getElementById('admin-password').value;
    if (pass === 'apache2026') { // <--- เปลี่ยนรหัสผ่านตรงนี้ได้เลยครับ!
        isAdmin = true;
        closeAdminModal();
        alert("✅ เข้าสู่โหมด Admin สำเร็จ! ปลดล็อกทุกวิชาและทุกด่านแล้ว");
        unlockAllSubjectsForAdmin();
        if (document.getElementById('map-screen').classList.contains('active')) {
            buildMap(); // รีเฟรชแผนที่ถ้าเปิดอยู่
        }
    } else {
        alert("❌ รหัสผ่านไม่ถูกต้อง!");
    }
}

// ปลดล็อกวิชาทั้งหมดในหน้าแรก
function unlockAllSubjectsForAdmin() {
    document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.classList.remove('locked');
        btn.classList.add('unlocked');
        // ดึงชื่อวิชาจาก id (เช่น btn-math ตัดเหลือ math)
        let subj = btn.id.replace('btn-', '');
        btn.onclick = () => {
            // ถ้าเป็นวิชาที่ยังไม่ได้สร้างข้อมูลไว้ให้แจ้งเตือน (กันบั๊กกรณีตัวแปร subjectData ยังไม่มี)
            if (typeof subjectData !== 'undefined' && !subjectData[subj]) {
                alert(`วิชา ${subj} กำลังอยู่ระหว่างการสร้างข้อมูลครับ!`);
                return;
            }
            enterSubject(subj);
        };
    });
}

// ================= ข้อมูลโจทย์ 10 ด่าน 100 ข้อ =================
const thaiLevels = [
    { id: 1, title: "ตัวสะกด", questions: [
        { q: 'คำว่า “แมว” ลงท้ายด้วยตัวสะกดอะไร', type: 'choice', choices: ["ว", "ม", "ก", "ง"], ans: 0 },
        { q: '“บ้าน” มีตัวสะกดไหม', type: 'choice', choices: ["มี (น)", "ไม่มี", "มี (บ)", "มี (า)"], ans: 0 },
        { q: 'คำว่า “รถ” สะกดด้วยตัวอะไรตอนท้าย', type: 'choice', choices: ["ถ", "ร", "ด", "ต"], ans: 0 },
        { q: '“ปลา” มีตัวสะกดหรือไม่', type: 'choice', choices: ["มี", "ไม่มี", "ไม่แน่ใจ", "มี (ล)"], ans: 1 },
        { q: '“นก” ลงท้ายเสียงอะไร', type: 'choice', choices: ["ก", "น", "ม", "ง"], ans: 0 },
        { q: '“ดิน” ตัวสะกดคืออะไร', type: 'choice', choices: ["น", "ด", "ม", "ง"], ans: 0 },
        { q: '“มือ” มีตัวสะกดไหม', type: 'choice', choices: ["ไม่มี", "มี", "มี (อ)", "มี (ม)"], ans: 0 },
        { q: '“เด็ก” สะกดด้วยตัวอะไร', type: 'choice', choices: ["ก", "ด", "ข", "ค"], ans: 0 },
        { q: '“ลม” ลงท้ายเสียงอะไร', type: 'choice', choices: ["ม", "ล", "น", "ง"], ans: 0 },
        { q: '“ไฟ” มีตัวสะกดหรือเปล่า', type: 'choice', choices: ["ไม่มี", "มี", "มี (ฟ)", "มี (ย)"], ans: 0 }
    ]},
    { id: 2, title: "การฟัง", questions: [
        { q: 'ครูพูดคำว่า “ส้ม” เด็กได้ยินว่าอะไร', tts: 'ส้ม', type: 'choice', choices: ["ส้ม", "ผม", "ล้ม", "ก้ม"], ans: 0 },
        { q: 'ครูพูด “โรงเรียน” ให้พูดตาม', tts: 'โรงเรียน', type: 'speech', ansText: 'โรงเรียน' },
        { q: 'ครูพูด “หมา แมว” มีคำว่าอะไรบ้าง', tts: 'หมา แมว', type: 'choice', choices: ["หมา แมว", "นก ปลา", "หมู ไก่", "ช้าง ม้า"], ans: 0 },
        { q: 'ครูพูด “กินข้าว” เด็กได้ยินคำว่าอะไร', tts: 'กินข้าว', type: 'choice', choices: ["กินข้าว", "กินน้ำ", "เดินเล่น", "วิ่งเร็ว"], ans: 0 },
        { q: 'ครูพูด “น้ำเย็น” คำไหนเกี่ยวกับของกิน', tts: 'น้ำเย็น', type: 'choice', choices: ["น้ำ", "เย็น", "แก้ว", "หลอด"], ans: 0 },
        { q: 'ครูพูด “วิ่งเร็ว” เด็กได้ยินคำว่าอะไร', tts: 'วิ่งเร็ว', type: 'speech', ansText: 'วิ่ง' },
        { q: 'ครูพูด “ดอกไม้” ให้พูดตาม', tts: 'ดอกไม้', type: 'speech', ansText: 'ดอกไม้' },
        { q: 'ครูพูด “นั่งเรียน” เด็กได้ยินคำว่าอะไร', tts: 'นั่งเรียน', type: 'choice', choices: ["นั่งเรียน", "วิ่งเล่น", "นอนหลับ", "กินข้าว"], ans: 0 },
        { q: 'ครูพูด “สีแดง” ให้บอกสีที่ได้ยิน', tts: 'สีแดง', type: 'speech', ansText: 'แดง' },
        { q: 'ครูพูด “ฝนตก” เกิดอะไรขึ้น', tts: 'ฝนตก', type: 'choice', choices: ["ฝนตก", "แดดออก", "ลมพัด", "หิมะตก"], ans: 0 }
    ]},
    { id: 3, title: "การอ่าน", questions: [
        { q: 'อ่านคำว่า “ปลา” แล้วหมายถึงอะไร', type: 'choice', choices: ["สัตว์น้ำ", "ผลไม้", "รถยนต์", "บ้าน"], ans: 0 },
        { q: 'อ่าน “หมา” เป็นเสียงว่าอะไร', type: 'choice', choices: ["โฮ่งๆ", "เหมียวๆ", "จิ๊บๆ", "มอๆ"], ans: 0 },
        { q: 'อ่านคำว่า “บ้าน”', type: 'speech', ansText: 'บ้าน' },
        { q: 'อ่าน “นกบิน” แล้วเกิดอะไรขึ้น', type: 'choice', choices: ["นกลอยฟ้า", "นกตกน้ำ", "นกเดิน", "นกนอน"], ans: 0 },
        { q: 'อ่านคำว่า “รถ”', type: 'speech', ansText: 'รถ' },
        { q: 'อ่าน “กินข้าว” ใครทำอะไร', type: 'choice', choices: ["คนกำลังกิน", "คนกำลังนอน", "คนกำลังวิ่ง", "คนกำลังร้องไห้"], ans: 0 },
        { q: 'อ่านคำว่า “ครู”', type: 'speech', ansText: 'ครู' },
        { q: 'อ่าน “เด็กเล่น” ใครกำลังทำอะไร', type: 'choice', choices: ["เด็กกำลังสนุก", "ผู้ใหญ่ทำงาน", "แมวนอน", "หมาเห่า"], ans: 0 },
        { q: 'อ่านคำว่า “น้ำ”', type: 'speech', ansText: 'น้ำ' },
        { q: 'อ่าน “ฝนตก” แล้วเกิดอะไร', type: 'choice', choices: ["เปียก", "แห้ง", "ร้อน", "หนาว"], ans: 0 }
    ]},
    { id: 4, title: "การเขียน (พูดเพื่อตอบ)", questions: [
        { q: 'ถ้าจะเขียนคำว่า “แมว” ต้องเขียนว่าอะไร', type: 'speech', ansText: 'แมว' },
        { q: 'คำว่า “ปลา” เขียนยังไง', type: 'speech', ansText: 'ปลา' },
        { q: 'เขียนคำว่า “บ้าน”', type: 'speech', ansText: 'บ้าน' },
        { q: 'ถ้าจะเขียน “นก” ต้องใช้ตัวอะไร', type: 'speech', ansText: 'นก' },
        { q: 'เขียนคำว่า “รถ”', type: 'speech', ansText: 'รถ' },
        { q: 'คำว่า “เด็ก” เขียนยังไง', type: 'speech', ansText: 'เด็ก' },
        { q: 'เขียนคำว่า “มือ”', type: 'speech', ansText: 'มือ' },
        { q: 'คำว่า “ดิน” เขียนอย่างไร', type: 'speech', ansText: 'ดิน' },
        { q: 'เขียนคำว่า “ไฟ”', type: 'speech', ansText: 'ไฟ' },
        { q: 'คำว่า “ลม” เขียนยังไง', type: 'speech', ansText: 'ลม' }
    ]},
    { id: 5, title: "มารยาท", questions: [
        { q: 'เวลาเจอครูควรพูดว่าอะไร', type: 'choice', choices: ["สวัสดีครับ/ค่ะ", "ไปไหน", "ทำอะไร", "บาย"], ans: 0 },
        { q: 'ถ้าจะขอของ ต้องพูดยังไง', type: 'speech', ansText: 'ขอ' },
        { q: 'ถ้ามีคนให้ของ ควรพูดว่าอะไร', type: 'choice', choices: ["ขอบคุณครับ/ค่ะ", "ไม่เอา", "เอามาอีก", "เฉยๆ"], ans: 0 },
        { q: 'เวลาจะขอโทษ ต้องพูดว่าอะไร', type: 'speech', ansText: 'ขอโทษ' },
        { q: 'เวลาจะถาม ควรทำอย่างไร', type: 'choice', choices: ["ยกมือ", "ตะโกน", "แย่งพูด", "ร้องไห้"], ans: 0 },
        { q: 'เวลาผู้ใหญ่พูด ควรทำยังไง', type: 'choice', choices: ["ตั้งใจฟัง", "เล่นมือถือ", "คุยแทรก", "เดินหนี"], ans: 0 },
        { q: 'ถ้าจะยืมของเพื่อน ต้องพูดว่าอะไร', type: 'choice', choices: ["ขอยืมหน่อย", "เอามานี่", "ขโมย", "แย่งมา"], ans: 0 },
        { q: 'เวลาไอหรือจาม ควรทำยังไง', type: 'choice', choices: ["ปิดปาก", "จามใส่เพื่อน", "ตะโกนดังๆ", "ไม่ทำอะไร"], ans: 0 },
        { q: 'เวลาเข้าแถว ควรทำยังไง', type: 'choice', choices: ["ต่อคิว", "แซงคิว", "ผลักเพื่อน", "วิ่งเล่น"], ans: 0 },
        { q: 'เวลาพูดกับเพื่อน ควรพูดแบบไหน', type: 'choice', choices: ["พูดเพราะๆ", "ตะคอก", "ด่าทอ", "ใช้คำหยาบ"], ans: 0 }
    ]},
    { id: 6, title: "คำควบกล้ำ", questions: [
        { q: 'คำว่า “ปลา” มีคำควบกล้ำไหม', type: 'choice', choices: ["มี (ปล)", "ไม่มี", "มี (ล)", "มี (ป)"], ans: 0 },
        { q: '“กรง” มีเสียงควบอะไร', type: 'choice', choices: ["กร", "ง", "ร", "ก"], ans: 0 },
        { q: '“ครู” มีเสียงควบอะไร', type: 'choice', choices: ["คร", "รู", "ค", "ร"], ans: 0 },
        { q: '“กล้วย” มีเสียงควบอะไร', type: 'choice', choices: ["กล", "ล", "ก", "ย"], ans: 0 },
        { q: '“ปรา” (หรือ ปลา) มีเสียงอะไรควบ', type: 'choice', choices: ["ปร / ปล", "ร / ล", "ป / ร", "ป / ล"], ans: 0 },
        { q: '“แปรง” มีเสียงควบอะไร', type: 'choice', choices: ["ปร", "ร", "ป", "ง"], ans: 0 },
        { q: '“ตรา” มีเสียงควบไหม', type: 'choice', choices: ["มี (ตร)", "ไม่มี", "มี (ร)", "มี (ต)"], ans: 0 },
        { q: '“กลม” มีเสียงควบอะไร', type: 'choice', choices: ["กล", "ล", "ก", "ม"], ans: 0 },
        { q: '“พร้อม” มีเสียงควบอะไร', type: 'choice', choices: ["พร", "ร", "พ", "ม"], ans: 0 },
        { q: '“ขวาน” มีเสียงควบอะไร', type: 'choice', choices: ["ขว", "ว", "ข", "น"], ans: 0 }
    ]},
    { id: 7, title: "คำนาม", questions: [
        { q: '“หมา” เป็นอะไร', type: 'choice', choices: ["สัตว์", "สิ่งของ", "สถานที่", "คน"], ans: 0 },
        { q: '“โรงเรียน” เป็นอะไร', type: 'choice', choices: ["สถานที่", "คน", "สัตว์", "สิ่งของ"], ans: 0 },
        { q: '“โต๊ะ” คืออะไร', type: 'choice', choices: ["สิ่งของ", "สัตว์", "คน", "สถานที่"], ans: 0 },
        { q: '“ครู” เป็นอะไร', type: 'choice', choices: ["คน", "สัตว์", "สิ่งของ", "สถานที่"], ans: 0 },
        { q: '“หนังสือ” คืออะไร', type: 'choice', choices: ["สิ่งของ", "สถานที่", "คน", "สัตว์"], ans: 0 },
        { q: '“น้ำ” เป็นอะไร', type: 'choice', choices: ["สิ่งของ", "คน", "สัตว์", "สถานที่"], ans: 0 },
        { q: '“ดอกไม้” คืออะไร', type: 'choice', choices: ["พืช/สิ่งของ", "สัตว์", "คน", "สถานที่"], ans: 0 },
        { q: '“เด็ก” เป็นอะไร', type: 'choice', choices: ["คน", "สัตว์", "สิ่งของ", "สถานที่"], ans: 0 },
        { q: '“บ้าน” คืออะไร', type: 'choice', choices: ["สถานที่", "คน", "สัตว์", "สิ่งของ"], ans: 0 },
        { q: '“รถ” เป็นอะไร', type: 'choice', choices: ["สิ่งของ/ยานพาหนะ", "สัตว์", "คน", "สถานที่"], ans: 0 }
    ]},
    { id: 8, title: "คำสรรพนาม", questions: [
        { q: 'ถ้าแทนคำว่า “ครู” ใช้คำว่าอะไรได้', type: 'choice', choices: ["ท่าน/คุณ", "มัน", "แก", "เอ็ง"], ans: 0 },
        { q: '“ฉัน” ใช้แทนใคร', type: 'choice', choices: ["ตัวเราเอง", "เพื่อน", "ครู", "สัตว์"], ans: 0 },
        { q: '“เธอ” ใช้แทนใคร', type: 'choice', choices: ["คนที่คุยด้วย", "ตัวเรา", "สัตว์", "สิ่งของ"], ans: 0 },
        { q: '“เขา” ใช้แทนใคร', type: 'choice', choices: ["คนที่พูดถึง", "ตัวเรา", "สัตว์", "คนที่คุยด้วย"], ans: 0 },
        { q: '“เรา” ใช้แทนใคร', type: 'choice', choices: ["ตัวเราและเพื่อน", "สัตว์", "สิ่งของ", "ครูคนเดียว"], ans: 0 },
        { q: 'ถ้าไม่อยากพูดชื่อเพื่อน ใช้อะไรแทน', type: 'choice', choices: ["เธอ/เขา", "ฉัน", "มัน", "แก"], ans: 0 },
        { q: '“มัน” ใช้แทนอะไร', type: 'choice', choices: ["สัตว์/สิ่งของ", "ครู", "พ่อแม่", "ตัวเรา"], ans: 0 },
        { q: '“พวกเรา” หมายถึงใคร', type: 'choice', choices: ["ตัวเรากับคนอื่น", "สัตว์หลายตัว", "เพื่อนคนเดียว", "ครูหลายคน"], ans: 0 },
        { q: '“เขา” ใช้กับคนใกล้หรือไกล', type: 'choice', choices: ["คนที่ไม่ได้อยู่ตรงนี้", "ตัวเอง", "หมาที่บ้าน", "คนที่ยืนข้างๆ"], ans: 0 },
        { q: '“ฉัน” หมายถึงใคร', type: 'speech', ansText: 'ตัวเอง' }
    ]},
    { id: 9, title: "คำกริยา", questions: [
        { q: '“กิน” คือทำอะไร', type: 'choice', choices: ["เอาอาหารเข้าปาก", "หลับตา", "ขยับขา", "พูดเสียงดัง"], ans: 0 },
        { q: '“วิ่ง” คือทำอะไร', type: 'choice', choices: ["เคลื่อนที่เร็วๆ", "อยู่นิ่งๆ", "นอน", "กินข้าว"], ans: 0 },
        { q: '“นอน” คือทำอะไร', type: 'choice', choices: ["พักผ่อนหลับตา", "เดินไปมา", "กระโดด", "ร้องเพลง"], ans: 0 },
        { q: '“อ่าน” คือทำอะไร', type: 'choice', choices: ["ดูหนังสือ", "เตะบอล", "วาดรูป", "ฟังเพลง"], ans: 0 },
        { q: '“เขียน” คือทำอะไร', type: 'choice', choices: ["ใช้ดินสอจดลงกระดาษ", "วิ่งเล่น", "กินขนม", "ดูทีวี"], ans: 0 },
        { q: '“เล่น” คือทำอะไร', type: 'choice', choices: ["ทำกิจกรรมสนุกๆ", "นอนหลับ", "ร้องไห้", "ยืนนิ่ง"], ans: 0 },
        { q: '“เดิน” คือทำอะไร', type: 'choice', choices: ["ก้าวเท้าไปข้างหน้า", "บินขึ้นฟ้า", "ว่ายน้ำ", "ขับรถ"], ans: 0 },
        { q: '“พูด” คือทำอะไร', type: 'choice', choices: ["ออกเสียงจากปาก", "ฟังหู", "มองด้วยตา", "เขียนด้วยมือ"], ans: 0 },
        { q: '“ดู” คือทำอะไร', type: 'choice', choices: ["ใช้ตามอง", "ใช้หูฟัง", "ใช้จมูกดม", "ใช้ปากชิม"], ans: 0 },
        { q: '“กระโดด” คือทำอะไร', type: 'choice', choices: ["เอาเท้าสปริงตัวขึ้น", "คลาน", "กลิ้ง", "นั่ง"], ans: 0 }
    ]},
    { id: 10, title: "ลดรูป (BOSS)", isBoss: true, questions: [
        { q: '“ครับผม” พูดสั้นลงว่าอะไร', type: 'speech', ansText: 'ครับ' },
        { q: '“ใช่หรือไม่” พูดสั้นว่าอะไร', type: 'choice', choices: ["ใช่ไหม", "ใช่เปล่า", "ใช่นะ", "ใช่สิ"], ans: 0 },
        { q: '“อะไร” พูดเร็ว ๆ เป็นว่าอะไร', type: 'speech', ansText: 'ไร' },
        { q: '“อย่างไร” พูดเร็วเป็นอะไร', type: 'choice', choices: ["ยังไง", "ทำไม", "อะไร", "เมื่อไหร่"], ans: 0 },
        { q: '“หรือเปล่า” พูดสั้นว่าอะไร', type: 'choice', choices: ["ป่าว", "ไหม", "หรอ", "นะ"], ans: 0 },
        { q: '“ไม่ได้” พูดเร็วเป็นอะไร', type: 'speech', ansText: 'ม่ายด้าย' },
        { q: '“ไปไหม” พูดเร็วเป็นอะไร', type: 'choice', choices: ["ไปป่าว", "ไปนะ", "ไปสิ", "ไปเลย"], ans: 0 },
        { q: '“ทำอะไรอยู่” พูดเร็วเป็นอะไร', type: 'speech', ansText: 'ทำไร' },
        { q: '“จะไปไหม” พูดสั้นเป็นอะไร', type: 'choice', choices: ["ไปป่ะ", "ไปนะ", "ไปดิ", "ไปเถอะ"], ans: 0 },
        { q: '“กินหรือยัง” พูดเร็วเป็นอะไร', type: 'speech', ansText: 'กินยัง' }
    ]}
];

// ================= ระบบแผนที่ (อัปเดตจุด x,y ตามลายแทงกระดาษ) =================
const mapPositions = [
    {x: 28, y: 65}, // ด่าน 1
    {x: 30, y: 52}, // ด่าน 2
    {x: 45, y: 62}, // ด่าน 3
    {x: 35, y: 35}, // ด่าน 4
    {x: 60, y: 55}, // ด่าน 5 (มิดบอสเงาดำ)
    {x: 50, y: 38}, // ด่าน 6
    {x: 70, y: 70}, // ด่าน 7
    {x: 82, y: 62}, // ด่าน 8
    {x: 72, y: 48}, // ด่าน 9
    {x: 85, y: 35}  // ด่าน 10 (Last Boss เตาหลอม)
];

let userProgress = { thai: 1 };
let playingLevelIndex = 0;
let currentQuestionIndex = 0;
let hearts = 3;

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}
function returnToMenu() { showScreen('menu-screen'); }
function returnToMap() { showScreen('map-screen'); buildMap(); }
function alertLockedSubject() { alert("ต้องผ่านวิชาภาษาไทยให้หมดก่อนนะ!"); }

function enterSubject(subject) {
    showScreen('map-screen');
    buildMap();
}

function buildMap() {
    const container = document.getElementById('nodes-container');
    const svg = document.getElementById('path-svg');
    container.innerHTML = ""; 
    svg.innerHTML = "";
    
    // ดึงขนาดของพื้นที่แผนที่มาเพื่อคำนวณวาดเส้นให้ตรงเป๊ะกับหน้าจอ
    const mapArea = document.getElementById('map-area');
    const width = mapArea.clientWidth;
    const height = mapArea.clientHeight;

    document.getElementById('current-save').innerText = userProgress.thai;
    
    let pathD = "";
    thaiLevels.forEach((lvl, index) => {
        const pos = mapPositions[index];
        
        // คำนวณ % ให้กลายเป็นพิกเซล (Pixel) เพื่อให้เส้นเชื่อมตรงกับจุดกลางของปุ่มพอดี
        const pixelX = (pos.x / 100) * width;
        const pixelY = (pos.y / 100) * height;

        if (index === 0) pathD += `M ${pixelX} ${pixelY} `;
        else pathD += `L ${pixelX} ${pixelY} `;

        // สร้างปุ่มด่าน
        const btn = document.createElement('div');
        btn.className = 'stage-node';
        btn.style.left = `${pos.x}%`; 
        btn.style.top = `${pos.y}%`;
        btn.setAttribute('data-label', lvl.isBoss ? "BOSS" : `ด่าน ${lvl.id}`);

        // ==========================================
        // ส่วนที่แก้แล้ว: เช็คสิทธิ์ด้วยระบบ Admin
        // ==========================================
        const isUnlocked = isAdmin || lvl.id <= userProgress.thai;

        if (isUnlocked) {
            // ด่านปัจจุบัน (ไม่ได้เปิดแอดมิน) ให้เป็นคลาส current
            if (lvl.id === userProgress.thai && !isAdmin) {
                btn.classList.add('current');
            } else {
                btn.classList.add('passed'); // ด่านที่ผ่านแล้ว หรือ แอดมินปลดล็อก
            }

            // ใส่ไอคอน/ตัวเลขให้ตรง
            if (lvl.isBoss) {
                btn.classList.add('boss');
                btn.innerHTML = "😈";
            } else if (lvl.id < userProgress.thai) {
                btn.innerHTML = "⭐"; // ผ่านแล้ว
            } else {
                btn.innerHTML = lvl.id; // ด่านปัจจุบัน หรือ แอดมินปลด
            }

            btn.onclick = () => startLevel(index);

        } else {
            // โหมดปกติที่ด่านยังล็อกอยู่
            btn.classList.add('locked'); 
            btn.innerHTML = "🔒";
            btn.onclick = () => alert("ด่านถูกล็อก! ต้องเคลียร์ด่านก่อนหน้า หรือคุณอาจจะโดนตีกลับมาจุดเซฟ!");
            if(lvl.isBoss) { 
                btn.classList.add('boss'); 
                btn.innerHTML = "😈"; 
            }
        }
        
        container.appendChild(btn);
    });

    // วาดเส้นปะสีน้ำตาลเข้ม (ไม้) ให้เห็นชัดเจนและเข้ากับแผนที่กระดาษ
    svg.innerHTML = `<path d="${pathD}" fill="none" stroke="#5c2a16" stroke-width="5" stroke-dasharray="12, 10" stroke-linecap="round" stroke-linejoin="round" />`;
}

// ผูกอีเวนต์ ถ้ามีการย่อ/ขยายหน้าจอ ให้วาดเส้นใหม่เพื่อไม่ให้เส้นเบี้ยว
window.addEventListener('resize', () => {
    if (document.getElementById('map-screen').classList.contains('active')) {
        buildMap();
    }
});

// ================= ระบบเกม & เสียง (Web Speech API) =================
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'th-TH';
    recognition.continuous = false;
}

function startLevel(index) {
    playingLevelIndex = index;
    hearts = 3; updateHearts();
    document.getElementById('level-title').innerText = `ด่าน ${thaiLevels[playingLevelIndex].id} - ${thaiLevels[playingLevelIndex].title}`;
    currentQuestionIndex = 0;
    
    const lvl = thaiLevels[playingLevelIndex];
    const bossUI = document.getElementById('boss-ui');
    const gameBoard = document.querySelector('.game-container');
    
    if (lvl.isBoss) {
        bossUI.style.display = 'block';
        gameBoard.style.border = "4px solid #ff4757";
    } else {
        bossUI.style.display = 'none';
        gameBoard.style.border = "4px solid #00ffff";
    }

    showScreen('game-screen');
    renderQuestion();
}

function updateHearts() { document.getElementById('hearts-display').innerText = "❤️".repeat(hearts); }

function renderQuestion() {
    if (currentQuestionIndex >= 10) { handleLevelComplete(); return; }
    
    const q = thaiLevels[playingLevelIndex].questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = `ข้อ ${currentQuestionIndex+1}: ` + q.q;
    
    const ttsBtn = document.getElementById('btn-speak-q');
    if (q.tts) {
        ttsBtn.style.display = 'block';
        speakQuestion(); 
    } else {
        ttsBtn.style.display = 'none';
    }

    const choicesBox = document.getElementById('choices-container');
    const speechBox = document.getElementById('speech-container');
    
    if (q.type === 'choice') {
        speechBox.style.display = 'none';
        choicesBox.style.display = 'grid';
        choicesBox.innerHTML = ""; 
        q.choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn'; btn.innerText = choice;
            btn.onclick = () => checkAnswer(index === q.ans);
            choicesBox.appendChild(btn);
        });
    } else if (q.type === 'speech') {
        choicesBox.style.display = 'none';
        speechBox.style.display = 'block';
        document.getElementById('speech-result').innerText = "";
    }
}

function speakQuestion() {
    const q = thaiLevels[playingLevelIndex].questions[currentQuestionIndex];
    if (q.tts) {
        const utterance = new SpeechSynthesisUtterance(q.tts);
        utterance.lang = 'th-TH';
        speechSynthesis.speak(utterance);
    }
}

function startRecording() {
    if (!recognition) { alert("เบราว์เซอร์ไม่รองรับระบบไมโครโฟน แนะนำให้ใช้ Google Chrome ครับ"); return; }
    
    const micBtn = document.getElementById('btn-mic');
    micBtn.classList.add('recording');
    micBtn.innerText = "กำลังฟัง...";
    
    recognition.start();
    
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('speech-result').innerText = `น้องพูดว่า: "${transcript}"`;
        micBtn.classList.remove('recording');
        micBtn.innerText = "🎤 กดเพื่อพูดใหม่";
        
        const q = thaiLevels[playingLevelIndex].questions[currentQuestionIndex];
        if (transcript.includes(q.ansText)) {
            setTimeout(() => checkAnswer(true), 1500);
        } else {
            setTimeout(() => checkAnswer(false), 1500);
        }
    };
    
    recognition.onerror = function(event) {
        micBtn.classList.remove('recording');
        micBtn.innerText = "🎤 กดเพื่อพูด";
        
        // เช็กว่าพังเพราะอะไร แล้วแจ้งเตือนให้ตรงจุด
        if (event.error === 'not-allowed') {
            alert("⚠️ เบราว์เซอร์บล็อกไมค์อยู่ครับ! อย่าลืมกดอนุญาตการใช้ไมค์ที่มุมขวาบน หรือต้องเปิดผ่าน Live Server (localhost) นะครับ");
        } else if (event.error === 'no-speech') {
            alert("ไม่ได้ยินเสียงเลย ลองพูดให้ดังขึ้น หรือขยับเข้าใกล้ไมค์อีกนิดนะ!");
        } else if (event.error === 'network') {
            alert("⚠️ ฟังก์ชันนี้ต้องต่ออินเทอร์เน็ตเพื่อแปลงเสียงเป็นข้อความครับ ลองเช็กเน็ตดูนะ!");
        } else {
            alert("เกิดข้อผิดพลาดกับไมโครโฟน: " + event.error);
        }
    };
}

function checkAnswer(isCorrect) {
    if (isCorrect) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        hearts--; updateHearts();
        if (hearts <= 0) {
            setTimeout(() => {
                alert("💔 หัวใจหมดแล้ว!! น้องๆ โดนมอนสเตอร์ตีกลับไปจุดเริ่มต้น ต้องเริ่มลุยด่าน 1 ใหม่ทั้งหมดเลยนะ!");
                userProgress.thai = 1; 
                returnToMap();
            }, 500);
        } else {
            alert("❌ ตอบผิด เสีย 1 หัวใจ!");
        }
    }
}

function handleLevelComplete() {
    const lvl = thaiLevels[playingLevelIndex];
    if (lvl.id === userProgress.thai) userProgress.thai++;
    
    if (lvl.isBoss) {
        alert("🎉 ยินดีด้วย! ปราบ Last Boss (มุกตา) สำเร็จ ปลดล็อกวิชาต่อไปได้แล้ว!");
        const btnMath = document.getElementById('btn-math');
        // เพิ่มเช็คเผื่อมีปุ่มเลขคณิต
        if(btnMath) {
            btnMath.classList.remove('locked');
            btnMath.classList.add('unlocked');
            btnMath.onclick = () => {
                window.location.href = "match.html";
            };
        }
        returnToMenu();
    } else {
        alert(`⭐ ผ่านด่าน ${lvl.id} แล้ว! ไปลุยด่านต่อไปกันเลย!`);
        returnToMap();
    }
}