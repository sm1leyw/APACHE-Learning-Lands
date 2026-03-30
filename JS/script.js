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

// ================= ระบบแผนที่ & เซฟ =================
const mapPositions = [
    {x: 15, y: 70}, {x: 30, y: 60}, {x: 45, y: 75}, {x: 65, y: 65}, {x: 80, y: 80},
    {x: 85, y: 50}, {x: 60, y: 40}, {x: 35, y: 30}, {x: 20, y: 15}, {x: 50, y: 10} // Boss
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

function enterSubject(subject) {
    showScreen('map-screen');
    buildMap();
}

function buildMap() {
    const container = document.getElementById('nodes-container');
    const svg = document.getElementById('path-svg');
    container.innerHTML = ""; svg.innerHTML = "";
    document.getElementById('current-save').innerText = userProgress.thai;
    
    let pathD = "";
    thaiLevels.forEach((lvl, index) => {
        const pos = mapPositions[index];
        if (index === 0) pathD += `M ${pos.x}% ${pos.y}% `;
        else pathD += `L ${pos.x}% ${pos.y}% `;

        const btn = document.createElement('div');
        btn.className = 'stage-node';
        btn.style.left = `${pos.x}%`; btn.style.top = `${pos.y}%`;
        btn.setAttribute('data-label', lvl.isBoss ? "BOSS" : `ด่าน ${lvl.id}`);

        if (lvl.id < userProgress.thai) {
            btn.classList.add('passed'); btn.innerHTML = "⭐"; btn.onclick = () => startLevel(index);
        } else if (lvl.id === userProgress.thai) {
            btn.classList.add('current'); btn.innerHTML = lvl.isBoss ? "😈" : lvl.id;
            if(lvl.isBoss) btn.classList.add('boss');
            btn.onclick = () => startLevel(index);
        } else {
            btn.classList.add('locked'); btn.innerHTML = "🔒";
            btn.onclick = () => alert("ด่านถูกล็อก! ต้องเคลียร์ด่านก่อนหน้า หรือคุณอาจจะโดนตีกลับมาจุดเซฟ!");
            if(lvl.isBoss) { btn.classList.add('boss'); btn.innerHTML = "😈"; }
        }
        container.appendChild(btn);
    });
    svg.innerHTML = `<path d="${pathD}" fill="none" stroke="#7bed9f" stroke-width="8" stroke-dasharray="10, 10" />`;
}

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
    showScreen('game-screen');
    renderQuestion();
}

function updateHearts() { document.getElementById('hearts-display').innerText = "❤️".repeat(hearts); }

function renderQuestion() {
    if (currentQuestionIndex >= 10) { handleLevelComplete(); return; }
    
    const q = thaiLevels[playingLevelIndex].questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = `ข้อ ${currentQuestionIndex+1}: ` + q.q;
    
    // จัดการปุ่มฟังเสียงครู (TTS)
    const ttsBtn = document.getElementById('btn-speak-q');
    if (q.tts) {
        ttsBtn.style.display = 'block';
        speakQuestion(); // เล่นเสียงอัตโนมัติ 1 รอบ
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
    if (!recognition) { alert("เบราว์เซอร์ของคุณไม่รองรับระบบไมโครโฟน แนะนำให้ใช้ Google Chrome ครับ"); return; }
    
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
        // ตรวจคำตอบแบบยืดหยุ่น ถ้ามีคำตอบอยู่ในประโยคถือว่าถูก
        if (transcript.includes(q.ansText)) {
            setTimeout(() => checkAnswer(true), 1500);
        } else {
            setTimeout(() => checkAnswer(false), 1500);
        }
    };
    
    recognition.onerror = function(event) {
        micBtn.classList.remove('recording');
        micBtn.innerText = "🎤 กดเพื่อพูด";
        alert("ไม่ได้ยินเสียงเลย ลองกดพูดใหม่อีกครั้งนะ!");
    };
}

function checkAnswer(isCorrect) {
    if (isCorrect) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        hearts--; updateHearts();
        if (hearts <= 0) {
            // ระบบ Permadeath หัวใจหมด กลับไปเริ่มด่าน 1 ใหม่
            setTimeout(() => {
                alert("💔 หัวใจหมดแล้ว!! น้องๆ โดนมอนสเตอร์ตีกลับไปจุดเริ่มต้น ต้องเริ่มลุยด่าน 1 ใหม่ทั้งหมดเลยนะ!");
                userProgress.thai = 1; // ล้างเซฟกลับด่าน 1
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
        alert("🎉 ยินดีด้วย! ปราบ Last Boss สำเร็จ ปลดล็อกวิชาต่อไปได้แล้ว!");
        returnToMenu();
    } else {
        alert(`⭐ ผ่านด่าน ${lvl.id} แล้ว! ไปลุยด่านต่อไปกันเลย!`);
        returnToMap();
    }
}