// ================= 1. ข้อมูลวิชาและด่าน =================
const subjectData = {
    thai: {
        name: "ภาษาไทย",
        levels: [
            { id: 1, title: "ตัวสะกด", questions: [{ q: "ข้อใดคือแม่กน?", choices: ["ช้าง", "บ้าน", "แมว", "ดาว"], ans: 1 }] },
            { id: 2, title: "การฟัง", questions: [{ q: "มารยาทการฟังคือ?", choices: ["หลับ", "ตั้งใจฟัง", "คุยแทรก", "เล่นมือถือ"], ans: 1 }] },
            { id: 3, title: "การอ่าน", questions: [{ q: "ข้อใดอ่านถูกต้อง?", choices: ["กะ-ต่าย", "กระ-ต่าย", "กะ-ตาย", "กรา-ต่าย"], ans: 1 }] },
            { id: 4, title: "การเขียน", questions: [{ q: "คำใดเขียนถูก?", choices: ["สัปรด", "สับปะรด", "สัปปะรด", "สับปรด"], ans: 1 }] },
            { id: 5, title: "มารยาท", questions: [{ q: "เมื่อเดินผ่านผู้ใหญ่ควรทำอย่างไร?", choices: ["วิ่งผ่าน", "ก้มตัว", "กระโดด", "คลาน"], ans: 1 }] },
            { id: 6, title: "คำควบกล้ำ", questions: [{ q: "ข้อใดเป็นคำควบกล้ำ?", choices: ["กล้วย", "สวย", "รวย", "มวย"], ans: 0 }] },
            { id: 7, title: "คำนาม", questions: [{ q: "ข้อใดคือคำนาม?", choices: ["วิ่ง", "ดีใจ", "โรงเรียน", "มาก"], ans: 2 }] },
            { id: 8, title: "คำสรรพนาม", questions: [{ q: "ข้อใดคือคำสรรพนาม?", choices: ["ฉัน", "กิน", "ข้าว", "อร่อย"], ans: 0 }] },
            { id: 9, title: "คำกริยา", questions: [{ q: "ข้อใดคือคำกริยา?", choices: ["แมว", "นอน", "สีขาว", "บนโต๊ะ"], ans: 1 }] },
            { id: 10, title: "ลดรูป (BOSS)", isBoss: true, questions: [
                { q: "คำว่า 'ก้อ' รูปเต็มคือ?", choices: ["ก็", "ก้อ", "ก็อ", "กอ"], ans: 0 },
                { q: "ลดรูปสระคือคำใด?", choices: ["เดิน", "นก", "ข้าว", "น้ำ"], ans: 1 }
            ]}
        ]
    }
    // อนาคตเพิ่ม math, science, english ที่นี่
};

// ตำแหน่งของแต่ละด่านบนแผนที่ (X%, Y%) ไล่จากล่างขึ้นบนแบบคดเคี้ยว
const mapPositions = [
    { x: 15, y: 85 }, { x: 40, y: 80 }, { x: 70, y: 85 }, { x: 85, y: 65 }, { x: 60, y: 55 },
    { x: 30, y: 60 }, { x: 15, y: 40 }, { x: 35, y: 20 }, { x: 65, y: 30 }, { x: 85, y: 15 } // ด่าน 10 บอส
];

// ================= 2. ระบบเซฟความคืบหน้า =================
// เก็บว่าวิชาไหนด่านล่าสุดที่เล่นได้คือด่านอะไร (เริ่มที่ 1)
let userProgress = {
    thai: 1, 
    math: 0, // 0 = ล็อกทั้งวิชา
    science: 0,
    english: 0
};

let currentSubject = "";
let playingLevelIndex = 0; // index ของด่านที่กำลังเล่น (0-9)
let currentQuestionIndex = 0;
let hearts = 3;

// ================= 3. การควบคุมหน้าจอ =================
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function returnToMenu() { showScreen('menu-screen'); }
function returnToMap() { showScreen('map-screen'); buildMap(); }
function alertLockedSubject() { alert("ต้องผ่านวิชาก่อนหน้าและปราบมอนสเตอร์ให้หมดก่อนนะ!"); }

// ================= 4. ระบบแผนที่ (Map) =================
function enterSubject(subject) {
    currentSubject = subject;
    document.getElementById('map-title').innerText = `แผนที่ผจญภัย: ${subjectData[subject].name}`;
    showScreen('map-screen');
    buildMap();
}

function buildMap() {
    const container = document.getElementById('nodes-container');
    const svg = document.getElementById('path-svg');
    container.innerHTML = "";
    svg.innerHTML = "";

    const levels = subjectData[currentSubject].levels;
    const maxUnlocked = userProgress[currentSubject]; // ด่านสูงสุดที่เล่นได้

    // วาดเส้นเชื่อมก่อน
    let pathD = "";

    levels.forEach((lvl, index) => {
        const pos = mapPositions[index];
        
        // วาดเส้น SVG
        const px = `${pos.x}%`;
        const py = `${pos.y}%`;
        if (index === 0) pathD += `M ${pos.x} ${pos.y} `;
        else pathD += `L ${pos.x} ${pos.y} `;

        // สร้างปุ่มด่าน
        const btn = document.createElement('div');
        btn.className = 'stage-node';
        btn.style.left = px;
        btn.style.top = py;
        btn.setAttribute('data-label', lvl.isBoss ? "BOSS" : `ด่าน ${lvl.id}`);

        // เช็คสถานะล็อก/ปลดล็อก
        if (lvl.id < maxUnlocked) {
            btn.classList.add('passed');
            btn.innerHTML = "⭐"; // ผ่านแล้ว
            btn.onclick = () => startLevel(index); // กลับไปเล่นซ้ำได้
        } else if (lvl.id === maxUnlocked) {
            btn.classList.add('current');
            btn.innerHTML = lvl.isBoss ? "😈" : lvl.id;
            if(lvl.isBoss) btn.classList.add('boss');
            btn.onclick = () => startLevel(index);
        } else {
            btn.classList.add('locked');
            btn.innerHTML = "🔒"; // ล็อกอยู่
            btn.onclick = () => alert("ด่านนี้ยังถูกล็อกอยู่ เคลียร์ด่านก่อนหน้าก่อนนะ!");
            if(lvl.isBoss) {
                btn.classList.add('boss');
                btn.innerHTML = "😈";
            }
        }
        
        container.appendChild(btn);
    });

    // ใส่เส้นทางลงใน SVG (แปลง % เป็นขนาดพิกเซลเพื่อให้เส้นสวย)
    // หมายเหตุ: แบบจำลองอย่างง่ายเพื่อวาดเส้น
    svg.innerHTML = `<path d="${pathD}" fill="none" stroke="rgba(255, 255, 255, 0.3)" stroke-width="8" stroke-dasharray="10, 10" />`;
}

// ================= 5. ระบบเล่นเกม =================
function startLevel(index) {
    playingLevelIndex = index;
    hearts = 3;
    updateHearts();
    
    const levelInfo = subjectData[currentSubject].levels[playingLevelIndex];
    document.getElementById('level-title').innerText = `ด่านที่ ${levelInfo.id} - ${levelInfo.title}`;

    const bossUI = document.getElementById('boss-ui');
    const gameBoard = document.querySelector('.game-container');

    if (levelInfo.isBoss) {
        bossUI.style.display = 'block';
        gameBoard.style.border = "3px solid #ff4757";
    } else {
        bossUI.style.display = 'none';
        gameBoard.style.border = "2px solid rgba(255,255,255,0.2)";
    }

    currentQuestionIndex = 0;
    showScreen('game-screen');
    renderQuestion();
}

function updateHearts() {
    document.getElementById('hearts-display').innerText = "❤️".repeat(hearts);
}

function renderQuestion() {
    const levelInfo = subjectData[currentSubject].levels[playingLevelIndex];
    
    // ถ้าตอบครบทุกข้อ
    if (currentQuestionIndex >= levelInfo.questions.length) {
        handleLevelComplete();
        return;
    }

    const q = levelInfo.questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = q.q;
    
    const choicesBox = document.getElementById('choices-container');
    choicesBox.innerHTML = ""; 

    q.choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerText = choice;
        btn.onclick = () => {
            if (index === q.ans) {
                currentQuestionIndex++;
                renderQuestion();
            } else {
                hearts--;
                updateHearts();
                if (hearts <= 0) {
                    setTimeout(() => {
                        alert("หัวใจหมด! โดนมอนสเตอร์ตีกลับมา เริ่มใหม่นะ!");
                        startLevel(playingLevelIndex);
                    }, 100);
                } else {
                    alert("ตอบผิด เสีย 1 หัวใจ!");
                }
            }
        };
        choicesBox.appendChild(btn);
    });
}

// ================= 6. เคลียร์ด่านและอัปเดต Map =================
function handleLevelComplete() {
    const levelInfo = subjectData[currentSubject].levels[playingLevelIndex];

    // ถ้าด่านที่เพิ่งเคลียร์ เป็นด่านสูงสุดที่เคยมาถึง ให้อัปเดต Progress
    if (levelInfo.id === userProgress[currentSubject]) {
        userProgress[currentSubject]++;
    }

    if (levelInfo.isBoss) {
        alert("🎉 สุดยอด! ปราบบอส TJ ROBERT สำเร็จ! ปลดล็อกวิชาคณิตศาสตร์แล้ว!");
        unlockSubjectMenu('math');
        returnToMenu(); // จบวิชา กลับไปหน้าหลัก
    } else {
        alert(`เยี่ยมมาก! ผ่านด่าน ${levelInfo.id} แล้ว ไปลุยต่อกันเลย!`);
        returnToMap(); // กลับหน้าแผนที่ เพื่อกดด่านต่อไป
    }
}

// ปลดล็อกวิชาที่หน้าแรก
function unlockSubjectMenu(subject) {
    userProgress[subject] = 1; // เซ็ตให้วิชานั้นเริ่มเล่นด่าน 1 ได้
    const btn = document.getElementById(`btn-${subject}`);
    btn.classList.remove('locked');
    btn.classList.add('unlocked');
    btn.onclick = () => enterSubject(subject);
}