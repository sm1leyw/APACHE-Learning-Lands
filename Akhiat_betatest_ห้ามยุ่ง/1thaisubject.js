document.addEventListener("DOMContentLoaded", () => {

    let currentLevel = 0;
    let unlockedLevel = 0;
    let hearts = 3;

    // ===== 10 ด่าน =====
    const levels = [
        { q: "1+1=?", c:["1","2","3","4"], a:1 },
        { q: "2+2=?", c:["3","4","5","6"], a:1 },
        { q: "3+2=?", c:["4","5","6","7"], a:1 },
        { q: "5+3=?", c:["7","8","9","10"], a:1 },
        { q: "6+4=?", c:["9","10","11","12"], a:1 },
        { q: "7+5=?", c:["11","12","13","14"], a:1 },
        { q: "8+6=?", c:["13","14","15","16"], a:1 },
        { q: "9+7=?", c:["15","16","17","18"], a:1 },
        { q: "10+8=?", c:["17","18","19","20"], a:1 },
        { q: "🔥 BOSS: 12+13=?", c:["24","25","26","27"], a:1, boss:true }
    ];

    // ===== เปลี่ยนหน้า (กันพัง) =====
    function showScreen(id) {
        document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
        const el = document.getElementById(id);
        if (el) el.classList.add("active");
    }

    // ===== ปุ่ม =====
    window.returnToMenu = () => showScreen("map-screen");
    window.returnToMap = () => showScreen("map-screen");

    // ===== สร้าง map =====
    function generateMap() {
        const container = document.getElementById("nodes-container");
        if (!container) return;

        container.innerHTML = "";

        levels.forEach((lvl, i) => {
            const node = document.createElement("div");
            node.className = "node";
            node.innerText = i + 1;

            // ตำแหน่ง
            node.style.left = (10 + i * 8) + "%";
            node.style.top = (50 + Math.sin(i) * 20) + "%";

            // ล็อก / ปลดล็อก
            if (i > unlockedLevel) {
                node.classList.add("locked");
            } else {
                node.addEventListener("click", () => startLevel(i));
            }

            // boss
            if (lvl.boss) node.classList.add("boss");

            container.appendChild(node);
        });
    }

    // ===== เริ่มด่าน =====
    function startLevel(i) {
        currentLevel = i;
        hearts = 3;

        showScreen("game-screen");
        loadLevel();
    }

    // ===== โหลดคำถาม =====
    function loadLevel() {
        const lvl = levels[currentLevel];

        const levelTitle = document.getElementById("level-title");
        const questionText = document.getElementById("question-text");
        const heartsDisplay = document.getElementById("hearts-display");
        const bossUI = document.getElementById("boss-ui");
        const container = document.getElementById("choices-container");

        if (!levelTitle || !questionText || !heartsDisplay || !container) return;

        levelTitle.innerText = "ด่าน " + (currentLevel + 1);
        questionText.innerText = lvl.q;
        heartsDisplay.innerText = "❤️".repeat(hearts);

        if (bossUI) bossUI.style.display = lvl.boss ? "block" : "none";

        container.innerHTML = "";

        lvl.c.forEach((choice, i) => {
            const btn = document.createElement("button");
            btn.className = "choice-btn";
            btn.innerText = choice;

            btn.addEventListener("click", () => checkAnswer(i, btn));

            container.appendChild(btn);
        });
    }

    // ===== ตรวจคำตอบ =====
    function checkAnswer(i, btn) {
        const lvl = levels[currentLevel];

        // กันกดซ้ำ
        const allBtns = document.querySelectorAll(".choice-btn");
        allBtns.forEach(b => b.disabled = true);

        if (i === lvl.a) {
            btn.classList.add("correct");

            setTimeout(() => {

                if (currentLevel === unlockedLevel) {
                    unlockedLevel++;
                }

                // ชนะ boss
                if (currentLevel === levels.length - 1) {
                    alert("🏆 ชนะ BOSS!");
                    showScreen("map-screen");
                    generateMap();
                    return;
                }

                currentLevel++;
                loadLevel();

            }, 600);

        } else {
            btn.classList.add("wrong");
            hearts--;

            document.getElementById("hearts-display").innerText = "❤️".repeat(hearts);

            if (hearts <= 0) {
                setTimeout(() => {
                    alert("💀 แพ้แล้ว!");
                    showScreen("map-screen");
                    generateMap();
                }, 600);
            } else {
                // เปิดให้กดใหม่
                setTimeout(() => {
                    allBtns.forEach(b => b.disabled = false);
                }, 600);
            }
        }
    }

    // ===== เริ่มต้น =====
    generateMap();

});