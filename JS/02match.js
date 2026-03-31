let userProgress = JSON.parse(localStorage.getItem('apacheProgress')) || { thai: 1, math: 1 };
let playingLevelIndex = 0;
let hearts = 3;

// ข้อมูล 10 ด่านคณิตศาสตร์
const mathLevels = [
    { id: 1, title: "แผนภูมิรูปภาพ", type: "pictogram", q: "มีแอปเปิ้ลตกลงมากี่ลูก?", target: 3, emoji: "🍎", choices: ["2", "3", "4"], ans: 1 },
    { id: 2, title: "การบวก (ระบบต่อสู้)", type: "combat", q: "3 + 2 = ?", choices: ["4", "5", "6"], ans: 1 },
    { id: 3, title: "การลบ (ระบบต่อสู้)", type: "combat", q: "10 - 4 = ?", choices: ["5", "6", "7"], ans: 1 },
    { id: 4, title: "การคูณ (ระบบต่อสู้)", type: "combat", q: "2 x 3 = ?", choices: ["5", "6", "8"], ans: 1 },
    { id: 5, title: "การหาร (ระบบต่อสู้)", type: "combat", q: "8 ÷ 2 = ?", choices: ["2", "3", "4"], ans: 2 },
    { id: 6, title: "การวัดความยาว", type: "hover-zoom", q: "คลิกเลือกดินสอแท่งที่ 'ยาวกว่า'", images: ["✏️ (สั้น)", "✏️✏️ (ยาว)"], ans: 1 },
    { id: 7, title: "เรขาคณิต", type: "geometry", q: "รูปนี้คือรูปอะไร? (คลิกเพื่อเปลี่ยนสี)", shape: "🔺", choices: ["สี่เหลี่ยม", "สามเหลี่ยม", "วงกลม"], ans: 1 },
    { id: 8, title: "เวลา", type: "clock", q: "เข็มสั้นชี้เลข 3 เข็มยาวชี้เลข 12 คือเวลาอะไร?", choices: ["13:00 น.", "15:00 น.", "12:03 น."], ans: 1 },
    { id: 9, title: "เศษส่วน", type: "pizza", q: "คลิกกินพิซซ่าให้หายไป 2 ชิ้น!", target: 2, totalSlices: 4 },
    { id: 10, title: "หน่วยวัด (BOSS)", type: "combat", isBoss: true, q: "ความยาวของโต๊ะเรียน ควรใช้หน่วยวัดใด?", choices: ["กิโลกรัม", "ลิตร", "เซนติเมตร", "นาที"], ans: 2 }
];

const mapPositions = [
    {x: 20, y: 70}, {x: 35, y: 60}, {x: 50, y: 75}, {x: 65, y: 55}, {x: 80, y: 65},
    {x: 75, y: 40}, {x: 55, y: 30}, {x: 35, y: 40}, {x: 20, y: 25}, {x: 50, y: 15}
];

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function returnToMap() { showScreen('map-screen'); buildMap(); }

function buildMap() {
    const container = document.getElementById('nodes-container');
    const svg = document.getElementById('path-svg');
    container.innerHTML = ""; svg.innerHTML = "";
    
    const mapArea = document.getElementById('map-area');
    const width = mapArea.clientWidth;
    const height = mapArea.clientHeight;

    let pathD = "";
    mathLevels.forEach((lvl, index) => {
        const pos = mapPositions[index];
        const pixelX = (pos.x / 100) * width;
        const pixelY = (pos.y / 100) * height;

        if (index === 0) pathD += `M ${pixelX} ${pixelY} `;
        else pathD += `L ${pixelX} ${pixelY} `;

        const btn = document.createElement('div');
        btn.className = 'stage-node';
        btn.style.left = `${pos.x}%`; btn.style.top = `${pos.y}%`;
        btn.setAttribute('data-label', lvl.isBoss ? "BOSS" : `ด่าน ${lvl.id}`);

        if (lvl.id < userProgress.math) {
            btn.classList.add('passed'); btn.innerHTML = "⭐"; btn.onclick = () => startLevel(index);
        } else if (lvl.id === userProgress.math) {
            btn.classList.add('current'); btn.innerHTML = lvl.isBoss ? "😈" : lvl.id;
            if(lvl.isBoss) btn.classList.add('boss');
            btn.onclick = () => startLevel(index);
        } else {
            btn.classList.add('locked'); btn.innerHTML = "🔒";
            btn.onclick = () => alert("ด่านถูกล็อก! ต้องผ่านด่านก่อนหน้าก่อนนะ!");
            if(lvl.isBoss) { btn.classList.add('boss'); btn.innerHTML = "😈"; }
        }
        container.appendChild(btn);
    });

    svg.innerHTML = `<path d="${pathD}" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="10, 10" />`;
}

function startLevel(index) {
    playingLevelIndex = index;
    hearts = 3; document.getElementById('hearts-display').innerText = "❤️❤️❤️";
    document.getElementById('level-title').innerText = `ด่าน ${mathLevels[playingLevelIndex].id} - ${mathLevels[playingLevelIndex].title}`;
    showScreen('game-screen');
    renderQuestion();
}

function renderQuestion() {
    const q = mathLevels[playingLevelIndex];
    document.getElementById('question-text').innerText = q.q;
    const interactiveArea = document.getElementById('interactive-area');
    const choicesBox = document.getElementById('choices-container');
    
    interactiveArea.innerHTML = ""; choicesBox.innerHTML = "";
    
    if (q.type === "pictogram") {
        for(let i=0; i<q.target; i++) { interactiveArea.innerHTML += `<div class="bounce-item">${q.emoji}</div>`; }
        renderChoices(q.choices, q.ans);
    } 
    else if (q.type === "combat") {
        interactiveArea.innerHTML = `<div class="combat-area"><div class="character player" id="player-char">🧙‍♂️</div><div class="character enemy" id="enemy-char">${q.isBoss ? '🐉' : '👾'}</div></div>`;
        renderChoices(q.choices, q.ans, true);
    }
    else if (q.type === "pizza") {
        let eatenCount = 0;
        for(let i=0; i<q.totalSlices; i++) {
            const slice = document.createElement('div');
            slice.className = 'pizza-slice'; slice.innerText = '🍕';
            slice.onclick = function() {
                if(!this.classList.contains('eaten')) {
                    this.classList.add('eaten'); eatenCount++; playSound('sound-correct');
                    if(eatenCount === q.target) setTimeout(() => handleWin(), 1000);
                }
            };
            interactiveArea.appendChild(slice);
        }
    }
    else if (q.type === "geometry") {
        interactiveArea.innerHTML = `<div style="font-size: 100px; cursor: pointer; transition: 0.5s;" onclick="this.style.transform='rotate(180deg)'; this.style.filter='hue-rotate(90deg)';">${q.shape}</div>`;
        renderChoices(q.choices, q.ans);
    }
    else {
        if(q.images) {
            q.images.forEach((img, idx) => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn'; btn.style.fontSize = '40px'; btn.innerText = img;
                btn.onclick = () => checkAnswer(idx === q.ans);
                interactiveArea.appendChild(btn);
            });
        } else { renderChoices(q.choices, q.ans); }
    }
}

function renderChoices(choices, correctIndex, isCombat = false) {
    const choicesBox = document.getElementById('choices-container');
    choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn'; btn.innerText = choice;
        btn.onclick = () => isCombat ? handleCombatAnswer(index === correctIndex) : checkAnswer(index === correctIndex);
        choicesBox.appendChild(btn);
    });
}

function handleCombatAnswer(isCorrect) {
    const player = document.getElementById('player-char');
    const enemy = document.getElementById('enemy-char');
    if (isCorrect) {
        player.classList.add('attack'); playSound('sound-attack');
        setTimeout(() => {
            player.classList.remove('attack'); enemy.classList.add('hurt'); playSound('sound-correct');
            setTimeout(() => handleWin(), 800);
        }, 300);
    } else {
        playSound('sound-wrong'); hearts--; document.getElementById('hearts-display').innerText = "❤️".repeat(hearts);
        enemy.style.transform = "scale(1.5)"; setTimeout(() => enemy.style.transform = "scale(1)", 500);
        if (hearts <= 0) {
            setTimeout(() => { alert("💔 พลังชีวิตหมด! โดนมอนสเตอร์ตีตาย ต้องเริ่มด่าน 1 ใหม่!"); userProgress.math = 1; saveProgress(); returnToMap(); }, 500);
        }
    }
}

function checkAnswer(isCorrect) {
    if (isCorrect) { playSound('sound-correct'); handleWin(); } 
    else { playSound('sound-wrong'); alert("❌ ยังไม่ถูกนะ ลองคิดดูดีๆ!"); }
}

function handleWin() {
    const lvl = mathLevels[playingLevelIndex];
    if (lvl.id === userProgress.math) { userProgress.math++; saveProgress(); }
    
    if (lvl.isBoss) {
        alert("🎉 ยินดีด้วย! ปราบ Last Boss วิชาคณิตศาสตร์สำเร็จ!");
        window.location.href = 'index.html'; 
    } else {
        alert(`⭐ เก่งมาก! ผ่านด่าน ${lvl.id} แล้ว!`); returnToMap();
    }
}

function playSound(id) {
    const audio = document.getElementById(id);
    if(audio) { audio.currentTime = 0; audio.play().catch(e => console.log("รอคลิกก่อนเล่นเสียง")); }
}

function saveProgress() { localStorage.setItem('apacheProgress', JSON.stringify(userProgress)); }

window.addEventListener('resize', () => { if(document.getElementById('map-screen').classList.contains('active')) buildMap(); });
window.onload = buildMap;