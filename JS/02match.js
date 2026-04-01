// --- Game State ---
let currentHearts = 3;
let currentStageIndex = -1; // 0-9
let currentQuestionIndex = 0;
let unlockedStages = 1; // Highest stage number unlocked
let livesResetOnGameOver = false; // Flag to track if we came from Game Over

const maxHearts = 3;
let totalStages = matchQuizData.length;
let score = 0; // Correct in current stage

// Boss phase for stage 10
let isBossTransformed = false;

// DOM Elements
const videoZone = document.getElementById('video-zone');
const quizZone = document.getElementById('quiz-zone');
const mapScreen = document.getElementById('map-screen');
const gameScreen = document.getElementById('game-screen');
const stagesLayer = document.getElementById('stages-layer');
const pathSvg = document.getElementById('path-svg');
const heartsContainer = document.getElementById('hearts-container');
const optionContainer = document.getElementById('options-container');
const hintBubble = document.getElementById('hint-bubble');
const endOverlay = document.getElementById('end-overlay');


// Initialize Game on Load
document.addEventListener('DOMContentLoaded', () => {
    loadProgression();
    updateHeartsDisplay();
    generateMap();
});

// --- Progression & LocalStorage ---
function loadProgression() {
    const saved = localStorage.getItem('magic_match_progress');
    if (saved) {
        unlockedStages = parseInt(saved);
    } else {
        unlockedStages = 1; // Default
        localStorage.setItem('magic_match_progress', unlockedStages);
    }
}

function saveProgression(stageNumberPassed) {
    if (stageNumberPassed >= unlockedStages && stageNumberPassed < totalStages) {
        unlockedStages = stageNumberPassed + 1;
        // แก้ตรงนี้ไม่ให้เซฟทับกับวิชาภาษาไทย
        localStorage.setItem('magic_match_progress', unlockedStages);
    }
}

// --- Navigation ---
function showQuizZone() {
    videoZone.classList.add('hidden');
    quizZone.classList.remove('hidden');
    generateMap(); // Re-render map in case of unlock
}

function showVideoZone() {
    quizZone.classList.add('hidden');
    videoZone.classList.remove('hidden');
}

function showGameScreen() {
    mapScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
}

function showMapScreen() {
    gameScreen.classList.add('hidden');
    mapScreen.classList.remove('hidden');
    generateMap();
}

// --- Map Logic ---
function generateMap() {
    stagesLayer.innerHTML = '';
    pathSvg.innerHTML = ''; // Clear lines
    
    // 1. Define Map Coords (winding path in % of map area)
    const stageCoords = [
        { x: 10, y: 80 }, { x: 25, y: 65 }, { x: 20, y: 45 }, { x: 35, y: 30 },
        { x: 50, y: 40 }, { x: 65, y: 25 }, { x: 80, y: 35 }, { x: 75, y: 55 },
        { x: 60, y: 70 }, { x: 90, y: 80 } // Stages 1 to 10
    ];

    // 2. Draw Dashed Path (SVG)
    let pathData = `M ${stageCoords[0].x},${stageCoords[0].y}`;
    for (let i = 1; i < stageCoords.length; i++) {
        // Simple curve or straight line (using straight here for simplicity)
        pathData += ` L ${stageCoords[i].x},${stageCoords[i].y}`;
    }
    
    // Note: SVG path coordinates are 0-100 based for viewBox simplification, 
    // real map CSS uses % positioning on divs.

    pathSvg.innerHTML = `<path class="map-line" d="${convertCoordsToSvgPath(stageCoords)}" />`;

    // 3. Draw Stage Dots (Divs)
    matchQuizData.forEach((stage, index) => {
        const coords = stageCoords[index];
        const stageDot = document.createElement('div');
        const stageNum = stage.id;
        stageDot.classList.add('stage-icon');
        
        // Icon content
        if (stage.isBoss) {
            stageDot.innerHTML = "💀";
            stageDot.classList.add('boss');
        } else {
            stageDot.innerText = stageNum;
        }

        // Determine State
        if (stageNum < unlockedStages) {
            stageDot.classList.add('passed');
        } else if (stageNum === unlockedStages) {
            stageDot.classList.add('current');
        } else {
            stageDot.classList.add('locked');
        }

        // Positioning (must correct for absolute centering, done in CSS)
        stageDot.style.left = coords.x + '%';
        stageDot.style.top = coords.y + '%';

        // Event
        if (!stageDot.classList.contains('locked')) {
            stageDot.addEventListener('click', () => startStage(index));
        }

        stagesLayer.appendChild(stageDot);
    });
}

// Helper for SVG path generation from 0-100 coords
function convertCoordsToSvgPath(coords) {
    // This is tricky because SVGs aren't responsive to inner 'viewBox' percentages well without extra setup.
    // Simplifying: we'll skip the exact dashed path in dynamic code for now, 
    // and rely on background img or static svg. Or assume the SVG viewBox is 0 0 100 100.
    
    let d = `M ${coords[0].x} ${coords[0].y}`;
    for(let i=1; i<coords.length; i++){
        d += ` L ${coords[i].x} ${coords[i].y}`;
    }
    return d;
}


// --- Gameplay Engine ---
function startStage(index) {
    currentStageIndex = index;
    currentQuestionIndex = 0;
    score = 0;
    currentHearts = maxHearts; // Reset hearts for a NEW attempt
    isBossTransformed = false; // Reset boss phase
    
    const stage = matchQuizData[index];
    
    // Update HUD
    document.getElementById('current-stage-title').innerText = stage.name;
    document.getElementById('stage-num').innerText = stage.id;
    document.getElementById('stage-name').innerText = stage.name;
    
    // Boss SetupStage 10
    const bossContainer = document.getElementById('boss-container');
    if (stage.isBoss) {
        bossContainer.classList.remove('hidden');
        resetBossVisuals(); // TJ Robert initially
        document.getElementById('total-questions').innerText = "10";
    } else {
        bossContainer.classList.add('hidden');
        document.getElementById('total-questions').innerText = "5";
    }
    
    updateHeartsDisplay();
    showGameScreen();
    loadQuestion();
}

function loadQuestion() {
    const stage = matchQuizData[currentStageIndex];
    const questionData = stage.questions[currentQuestionIndex];
    
    document.getElementById('question-num').innerText = currentQuestionIndex + 1;
    document.getElementById('question-text').innerText = questionData.q;
    hintBubble.innerText = questionData.hint;
    
    // Special Instructions handling
    if (currentStageIndex + 1 === 4) { // Stage 4: Writing (Telling verbally)
        showSpecialInput("บอกพี่ช้างหน่อยว่าสะกดคำนี้ยังไง (เลือกสะกดถูก)", false);
    } else if (currentStageIndex + 1 === 2) { // Stage 2: Listening
        showSpecialInput("🔊 ฟังเสียงคุณครู แล้วเลือกคำที่ได้ยิน", false);
    } else {
        hideSpecialInput();
    }

    // Boss Phase Dialogue
    if (stage.isBoss) {
        document.getElementById('boss-bubble').innerText = questionData.bossSay || "รับมือ!";
    }

    renderOptions(questionData);
}

function renderOptions(questionData) {
    optionContainer.innerHTML = '';
    
    questionData.a.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = option;
        btn.addEventListener('click', () => checkAnswer(index, btn));
        optionContainer.appendChild(btn);
    });
}

function showSpecialInput(text, isInputRequired) {
    document.getElementById('special-input-container').classList.remove('hidden');
    document.querySelector('.special-instruction').innerText = text;
    // multiple choice still rendered below
}
function hideSpecialInput() {
    document.getElementById('special-input-container').classList.add('hidden');
}

// --- Logic ---
function checkAnswer(selectedIndex, selectedBtn) {
    const stage = matchQuizData[currentStageIndex];
    const questionData = stage.questions[currentQuestionIndex];
    const isCorrect = (selectedIndex === questionData.correct);

    // Disable all options
    document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);

    if (isCorrect) {
        score++;
        selectedBtn.classList.add('correct');
        // Simple visual punch animation (could add character attack animation here)
        DreambullAnimate('correct'); 
        
        // Boss Phase Logic (Stage 10, transformation after Q5)
        if (stage.isBoss && questionData.transforms && !isBossTransformed) {
            triggerBossTransformation();
        }
        
        // Wait 1s and move next
        setTimeout(moveNext, 1000);
    } else {
        selectedBtn.classList.add('wrong');
        loseHeart();
        
        // Boss Phase Logic (Boss attacks user)
        if (stage.isBoss) {
            document.getElementById('boss-bubble').innerText = isBossTransformed ? "ก๊ากก! อ่อนหัด!" : "ฮ่าๆ! ตอบผิดแล้ว!";
        }
    }
}

function moveNext() {
    currentQuestionIndex++;
    const stage = matchQuizData[currentStageIndex];
    const totalQ = stage.isBoss ? 10 : 5;

    if (currentQuestionIndex < totalQ) {
        loadQuestion();
    } else {
        endStage(true); // Passed
    }
}

// --- Hearts System ---
function loseHeart() {
    currentHearts--;
    updateHeartsDisplay();
    DreambullAnimate('wrong'); // elephant looks sad/hurt

    // Visual effect: screen flash red
    document.body.style.backgroundColor = '#FFEBEE';
    setTimeout(() => document.body.style.backgroundColor = '#E8F5E9', 300);

    if (currentHearts <= 0) {
        // Game Over logic
        setTimeout(() => endStage(false), 800);
    } else {
        // Retry question / or lock other options? Keep simpler: unlock options for retry after a delay
        setTimeout(() => {
             document.querySelectorAll('.option-btn').forEach(b => {
                 b.disabled = false;
                 b.classList.remove('wrong'); // let them try other options
             });
        }, 800);
    }
}

function updateHeartsDisplay() {
    heartsContainer.innerHTML = '';
    for (let i = 1; i <= maxHearts; i++) {
        const heartSpan = document.createElement('span');
        heartSpan.classList.add('heart');
        if (i <= currentHearts) {
            heartSpan.innerText = "❤️";
            heartSpan.classList.add('full');
        } else {
            heartSpan.innerText = "🖤"; // or empty heart
            heartSpan.classList.add('empty');
        }
        heartsContainer.appendChild(heartSpan);
    }
}

// --- End Stage / Overlay ---
function endStage(isPassed) {
    endOverlay.classList.remove('hidden');
    const endIcon = document.getElementById('end-icon');
    const endTitle = document.getElementById('end-title');
    const endMsg = document.getElementById('end-msg');
    const retryBtn = document.getElementById('retry-btn');
    const mainBtn = document.getElementById('end-main-btn');

    if (isPassed) {
        saveProgression(matchQuizData[currentStageIndex].id);
        
        endIcon.innerText = "🎉";
        endTitle.innerText = "สุดยอดไปเลย!";
        endMsg.innerText = `คุณผ่านด่าน ${matchQuizData[currentStageIndex].name} แล้ว!`;
        retryBtn.classList.add('hidden');
        mainBtn.innerText = "กลับไปที่แผนที่เพื่อไปต่อ";
        mainBtn.onclick = resetToMap;
    } else {
        // GAME OVER
        endIcon.innerText = "😥";
        endTitle.innerText = "ว้า! หมดหัวใจแล้ว";
        endMsg.innerText = `ไม่ต้องเสียใจนะ ลองใหม่อีกครั้งในด่านนี้!`;
        retryBtn.classList.remove('hidden');
        mainBtn.innerText = "กลับไปที่แผนที่";
        mainBtn.onclick = resetToMapOnGameOver; // Special handling required
    }
}

function resetToMap() {
    endOverlay.classList.add('hidden');
    showMapScreen();
}

function resetToMapOnGameOver() {
    // Requirements: "กลับไปเริ่มทำด่านที่ไม่ผ่านใหม่ แต่ด่านที่ผ่านแล้วก็ปล่อยไว้เหมือนเดิมแแต่ user กลับไปเล่นซ้ำได้"
    // So map screen is shown, hearts will reset on the NEXT stage click
    endOverlay.classList.add('hidden');
    showMapScreen();
}

// --- Boss Stage Specifics (Transformation) ---
function resetBossVisuals() {
    isBossTransformed = false;
    document.getElementById('boss-display-name').innerText = matchQuizData[9].bossName; // King Nasir
    
    document.getElementById('boss-img').src = 'ตัวละคร/TJ(Boss)_Thai.png'; 
}

function triggerBossTransformation() {
    isBossTransformed = true;
    const bossImg = document.getElementById('boss-img');
    const bossBubble = document.getElementById('boss-bubble');
    
    // Transformation animation state in CSS
    bossImg.classList.add('transforming');
    bossBubble.innerText = "ว้ายยยๆ! จะแปลงร่างแล้ว!";

    setTimeout(() => {
        bossImg.classList.remove('transforming');
        document.getElementById('boss-display-name').innerText = "งูบุญดา";
        
        bossImg.src = 'ตัวละคร/บุญดา(Boss)_Thai.png';
        
        bossBubble.innerText = "ฟู่ๆๆ! ฉันคือบุญดา!";
    }, 1000); // 1s transformation
}

// --- Character Animations (Simulated) ---
function DreambullAnimate(state) {
    const img = document.querySelector('.dreambull-img');
    if (state === 'correct') {
        img.style.transform = 'scale(1.2) rotate(5deg)';
        setTimeout(() => img.style.transform = 'scale(1) rotate(0)', 300);
    } else if (state === 'wrong') {
        img.style.transform = 'translateX(-5px)'; // shiver
        setTimeout(() => img.style.transform = 'translateX(0)', 300);
    }
}