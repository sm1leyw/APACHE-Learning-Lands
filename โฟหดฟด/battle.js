let hearts = 3;
let currentLine = 0;

const storyLines = [
    "เจ้ามนุษย์! คิดว่าจะผ่านด่านนี้ไปได้งั้นรึ?",
    "ป่าแห่งนี้คือถิ่นของข้า ข้าไม่ยอมให้ใครผ่านไปง่ายๆ หรอก!",
    "จงตอบคำถามของข้าให้ถูกต้องซะ! ไม่งั้นเจ้าได้กลับบ้านเก่าแน่!",
    "(เริ่มการต่อสู้...)"
];

// ฟังก์ชันคลิกกล่องข้อความ
function nextDialogue() {
    currentLine++;
    if (currentLine < storyLines.length) {
        document.getElementById("dialogue-text").innerText = storyLines[currentLine];
    } else {
        // คุยจบ -> ซ่อนกล่องคุย โชว์กล่องคำถาม
        document.getElementById("dialogue-box").classList.add("hidden");
        document.getElementById("quiz-box").classList.remove("hidden");
    }
}

// ฟังก์ชันตรวจคำตอบ
function checkAnswer(isCorrect) {
    const boss = document.getElementById("boss-sprite");
    const gameScreen = document.getElementById("gameScreen");

    if (isCorrect) {
        // ตอบถูก -> บอสกระพริบแดง (โดนตี)
        boss.classList.remove("idle");
        boss.classList.add("hit-effect");
        
        setTimeout(() => {
            alert("ตอบถูก! โจมตีสำเร็จ บอสตายแล้ว! 🎉 (ผ่านด่าน)");
            // โค้ดสำหรับไปด่านต่อไปใส่ตรงนี้
        }, 1000); // รออนิเมชั่นเล่นจบ 1 วิค่อยขึ้น Alert
        
    } else {
        // ตอบผิด -> หัวใจลด + หน้าจอสั่น
        hearts--;
        updateHearts();
        
        gameScreen.classList.add("shake-screen"); // สั่นหน้าจอ
        setTimeout(() => gameScreen.classList.remove("shake-screen"), 400); // เอาสั่นออก

        if (hearts > 0) {
            alert(`ตอบผิด! โดนบอสโจมตี! (เหลือหัวใจ ${hearts} ดวง)`);
        } else {
            setTimeout(() => {
                alert("Game Over! หัวใจหมดแล้ว 💀 กลับไปเริ่มใหม่");
                location.reload();
            }, 500);
        }
    }
}

// อัปเดต UI หัวใจ
function updateHearts() {
    let heartHTML = "";
    for(let i=0; i<hearts; i++) heartHTML += "❤️";
    for(let i=0; i<(3-hearts); i++) heartHTML += "🖤"; 
    document.getElementById("heart-container").innerText = heartHTML;
}