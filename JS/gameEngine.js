(function () {
    const STAGE_COORDS = [
        { x: 10, y: 80 }, { x: 25, y: 65 }, { x: 20, y: 45 }, { x: 35, y: 30 },
        { x: 50, y: 40 }, { x: 65, y: 25 }, { x: 80, y: 35 }, { x: 75, y: 55 },
        { x: 60, y: 70 }, { x: 90, y: 80 }
    ];

    const DEFAULT_BOSS = {
        initialImage: 'ตัวละคร/TJ(Boss)_Thai.png',
        transformedImage: 'ตัวละคร/บุญดา(Boss)_Thai.png',
        transformedName: 'งูบุญดา'
    };

    function normalizeText(value) {
        return String(value ?? '')
            .replace(/\s+/g, ' ')
            .replace(/\s+([?!.,:])/g, '$1')
            .trim();
    }

    function createSubjectGame(config) {
        const quizData = config.quizData || [];
        const progressKey = config.progressKey || 'magic_progress';
        const speechLang = config.speechLang || 'th-TH';
        const boss = { ...DEFAULT_BOSS, ...(config.boss || {}) };
        const stripThaiGlossFromQuestions = Boolean(config.stripThaiGlossFromQuestions);

        const state = {
            currentHearts: 3,
            currentStageIndex: -1,
            currentQuestionIndex: 0,
            unlockedStages: 1,
            isBossTransformed: false,
            score: 0
        };

        const maxHearts = 3;

        const dom = {
            videoZone: document.getElementById('video-zone'),
            quizZone: document.getElementById('quiz-zone'),
            mapScreen: document.getElementById('map-screen'),
            gameScreen: document.getElementById('game-screen'),
            stagesLayer: document.getElementById('stages-layer'),
            pathSvg: document.getElementById('path-svg'),
            heartsContainer: document.getElementById('hearts-container'),
            optionContainer: document.getElementById('options-container'),
            hintBubble: document.getElementById('hint-bubble'),
            endOverlay: document.getElementById('end-overlay'),
            specialInputContainer: document.getElementById('special-input-container'),
            questionText: document.getElementById('question-text'),
            questionNum: document.getElementById('question-num'),
            totalQuestions: document.getElementById('total-questions'),
            currentStageTitle: document.getElementById('current-stage-title'),
            stageNum: document.getElementById('stage-num'),
            stageName: document.getElementById('stage-name'),
            bossContainer: document.getElementById('boss-container'),
            bossImg: document.getElementById('boss-img'),
            bossBubble: document.getElementById('boss-bubble'),
            bossDisplayName: document.getElementById('boss-display-name')
        };

        function formatQuestionText(text) {
            let cleaned = normalizeText(text);

            if (stripThaiGlossFromQuestions) {
                cleaned = cleaned.replace(/\s*\((?=[^)]*[\u0E00-\u0E7F])[^)]*\)\s*$/u, '');
            }

            return cleaned;
        }

        function formatChoiceText(text) {
            return normalizeText(text);
        }

        function getStage() {
            return quizData[state.currentStageIndex];
        }

        function getQuestion() {
            return getStage()?.questions[state.currentQuestionIndex];
        }

        function getStageQuestionCount(stage) {
            return Array.isArray(stage?.questions) ? stage.questions.length : 0;
        }

        function loadProgression() {
            const saved = localStorage.getItem(progressKey);
            const parsedValue = Number.parseInt(saved, 10);

            if (Number.isInteger(parsedValue) && parsedValue > 0) {
                state.unlockedStages = parsedValue;
                return;
            }

            state.unlockedStages = 1;
            localStorage.setItem(progressKey, String(state.unlockedStages));
        }

        function saveProgression(stageNumberPassed) {
            if (stageNumberPassed >= state.unlockedStages && stageNumberPassed < quizData.length) {
                state.unlockedStages = stageNumberPassed + 1;
                localStorage.setItem(progressKey, String(state.unlockedStages));
            }
        }

        function showVideoZone() {
            dom.quizZone.classList.add('hidden');
            dom.videoZone.classList.remove('hidden');
        }

        function showGameScreen() {
            dom.mapScreen.classList.add('hidden');
            dom.gameScreen.classList.remove('hidden');
        }

        function showMapScreen() {
            dom.gameScreen.classList.add('hidden');
            dom.mapScreen.classList.remove('hidden');
            generateMap();
        }

        function convertCoordsToSvgPath(coords) {
            let d = `M ${coords[0].x} ${coords[0].y}`;

            for (let index = 1; index < coords.length; index += 1) {
                d += ` L ${coords[index].x} ${coords[index].y}`;
            }

            return d;
        }

        function generateMap() {
            dom.stagesLayer.innerHTML = '';
            dom.pathSvg.innerHTML = `<path class="map-line" d="${convertCoordsToSvgPath(STAGE_COORDS)}" />`;

            quizData.forEach((stage, index) => {
                const coords = STAGE_COORDS[index];
                const stageDot = document.createElement('div');
                const stageNum = stage.id;
                stageDot.classList.add('stage-icon');

                if (stage.isBoss) {
                    stageDot.innerText = '💀';
                    stageDot.classList.add('boss');
                } else {
                    stageDot.innerText = stageNum;
                }

                if (stageNum < state.unlockedStages) {
                    stageDot.classList.add('passed');
                } else if (stageNum === state.unlockedStages) {
                    stageDot.classList.add('current');
                } else {
                    stageDot.classList.add('locked');
                }

                stageDot.style.left = `${coords.x}%`;
                stageDot.style.top = `${coords.y}%`;

                if (!stageDot.classList.contains('locked')) {
                    stageDot.addEventListener('click', () => startStage(index));
                }

                dom.stagesLayer.appendChild(stageDot);
            });
        }

        function updateHeartsDisplay() {
            dom.heartsContainer.innerHTML = '';

            for (let index = 1; index <= maxHearts; index += 1) {
                const heartSpan = document.createElement('span');
                heartSpan.classList.add('heart');

                if (index <= state.currentHearts) {
                    heartSpan.innerText = '❤️';
                    heartSpan.classList.add('full');
                } else {
                    heartSpan.innerText = '🖤';
                    heartSpan.classList.add('empty');
                }

                dom.heartsContainer.appendChild(heartSpan);
            }
        }

        function resetBossVisuals(stage) {
            state.isBossTransformed = false;
            dom.bossDisplayName.innerText = stage.bossName || 'Boss';
            dom.bossImg.src = boss.initialImage;
            dom.bossBubble.innerText = 'รับมือ!';
        }

        function startStage(index) {
            const stage = quizData[index];

            state.currentStageIndex = index;
            state.currentQuestionIndex = 0;
            state.score = 0;
            state.currentHearts = maxHearts;
            state.isBossTransformed = false;

            dom.currentStageTitle.innerText = stage.name;
            dom.stageNum.innerText = stage.id;
            dom.stageName.innerText = stage.name;
            dom.totalQuestions.innerText = String(getStageQuestionCount(stage));

            if (stage.isBoss) {
                dom.bossContainer.classList.remove('hidden');
                resetBossVisuals(stage);
            } else {
                dom.bossContainer.classList.add('hidden');
            }

            updateHeartsDisplay();
            showVideoZone();
        }

        function showSpecialInput({
            text,
            showTextInput = false,
            showMic = false,
            showSpeaker = false,
            readOnlyInput = false,
            inputPlaceholder = 'พิมพ์คำตอบ...'
        }) {
            const actionButtons = [];

            if (showTextInput) {
                actionButtons.push('<button class="submit-text-btn" onclick="submitTextAnswer()">ส่งคำตอบ</button>');
            }

            if (showMic) {
                actionButtons.push('<button class="mic-btn" onclick="startSpeech(this)">พูด</button>');
            }

            if (showSpeaker) {
                actionButtons.push('<button class="speaker-btn" onclick="repeatAudio(this)">ฟังเสียง</button>');
            }

            dom.specialInputContainer.classList.remove('hidden');
            dom.specialInputContainer.innerHTML = `
                <p class="special-instruction">${text}</p>
                ${showTextInput ? `<input type="text" id="text-answer" placeholder="${inputPlaceholder}" ${readOnlyInput ? 'readonly' : ''} />` : ''}
                ${actionButtons.length ? `<div class="answer-actions">${actionButtons.join('')}</div>` : ''}
            `;
        }

        function hideSpecialInput() {
            dom.specialInputContainer.classList.add('hidden');
            dom.specialInputContainer.innerHTML = '';
        }

        function speak(text) {
            if (!text || !window.speechSynthesis) {
                return;
            }

            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = speechLang;
            utterance.rate = 0.9;

            window.speechSynthesis.speak(utterance);
        }

        function renderOptions(questionData) {
            dom.optionContainer.innerHTML = '';

            if (questionData.type === 'text' || questionData.type === 'speech') {
                return;
            }

            questionData.a.forEach((option, index) => {
                const button = document.createElement('button');
                button.classList.add('option-btn');
                button.innerText = formatChoiceText(option);
                button.addEventListener('click', () => checkAnswer(index, button));
                dom.optionContainer.appendChild(button);
            });
        }

        function loadQuestion() {
            const stage = getStage();
            const questionData = getQuestion();

            dom.questionNum.innerText = state.currentQuestionIndex + 1;
            dom.questionText.innerText = formatQuestionText(questionData.q);

            hideSpecialInput();

            if (questionData.type === 'text') {
                showSpecialInput({
                    text: 'พิมพ์คำตอบให้ถูกต้อง',
                    showTextInput: true
                });
            } else if (questionData.type === 'speech') {
                showSpecialInput({
                    text: 'กดปุ่มพูด แล้วส่งคำตอบ',
                    showTextInput: true,
                    showMic: true,
                    readOnlyInput: true,
                    inputPlaceholder: 'คำตอบจากเสียงจะขึ้นตรงนี้'
                });
            } else if (questionData.audio) {
                showSpecialInput({
                    text: 'ฟังเสียงแล้วเลือกคำตอบ',
                    showSpeaker: true
                });
                speak(questionData.audio);
            }

            if (stage.isBoss) {
                dom.bossBubble.innerText = questionData.bossSay || 'รับมือ!';
            }

            renderOptions(questionData);
        }

        function checkAnswer(selectedIndex, selectedBtn) {
            const stage = getStage();
            const questionData = getQuestion();
            const isCorrect = selectedIndex === questionData.correct;

            dom.optionContainer.querySelectorAll('.option-btn').forEach(button => {
                button.disabled = true;
            });

            if (isCorrect) {
                state.score += 1;
                selectedBtn.classList.add('correct');
                animateDreambull('correct');

                if (stage.isBoss && questionData.transforms && !state.isBossTransformed) {
                    triggerBossTransformation();
                }

                setTimeout(moveNext, 1000);
                return;
            }

            selectedBtn.classList.add('wrong');
            loseHeart();

            if (stage.isBoss) {
                dom.bossBubble.innerText = state.isBossTransformed ? 'ก๊ากก! อ่อนหัด!' : 'ฮ่าๆ! ตอบผิดแล้ว!';
            }
        }

        function moveNext() {
            state.currentQuestionIndex += 1;

            if (state.currentQuestionIndex < getStageQuestionCount(getStage())) {
                loadQuestion();
                return;
            }

            endStage(true);
        }

        function animateDreambull(stateName) {
            const image = document.querySelector('.dreambull-img');

            if (!image) {
                return;
            }

            if (stateName === 'correct') {
                image.style.transform = 'scale(1.2) rotate(5deg)';
                setTimeout(() => {
                    image.style.transform = 'scale(1) rotate(0)';
                }, 300);
                return;
            }

            image.style.transform = 'translateX(-5px)';
            setTimeout(() => {
                image.style.transform = 'translateX(0)';
            }, 300);
        }

        function loseHeart() {
            state.currentHearts -= 1;
            updateHeartsDisplay();
            animateDreambull('wrong');

            document.body.style.backgroundColor = '#FFEBEE';
            setTimeout(() => {
                document.body.style.backgroundColor = '#E8F5E9';
            }, 300);

            if (state.currentHearts <= 0) {
                setTimeout(() => endStage(false), 800);
                return;
            }

            setTimeout(() => {
                dom.optionContainer.querySelectorAll('.option-btn').forEach(button => {
                    button.disabled = false;
                    button.classList.remove('wrong');
                });

                const textAnswer = document.getElementById('text-answer');
                if (textAnswer) {
                    textAnswer.focus();
                    textAnswer.select();
                }
            }, 800);
        }

        function endStage(isPassed) {
            const stage = getStage();
            const endIcon = document.getElementById('end-icon');
            const endTitle = document.getElementById('end-title');
            const endMsg = document.getElementById('end-msg');
            const retryBtn = document.getElementById('retry-btn');
            const mainBtn = document.getElementById('end-main-btn');

            dom.endOverlay.classList.remove('hidden');

            if (isPassed) {
                saveProgression(stage.id);
                endIcon.innerText = '🎉';
                endTitle.innerText = 'สุดยอดไปเลย!';
                endMsg.innerText = `คุณผ่านด่าน ${stage.name} แล้ว!`;
                retryBtn.classList.add('hidden');
                mainBtn.innerText = 'กลับไปที่แผนที่เพื่อไปต่อ';
                mainBtn.onclick = resetToMap;
                return;
            }

            endIcon.innerText = '😥';
            endTitle.innerText = 'ว้า! หมดหัวใจแล้ว';
            endMsg.innerText = 'ลองเริ่มด่านนี้ใหม่อีกครั้งนะ';
            retryBtn.classList.remove('hidden');
            mainBtn.innerText = 'กลับไปที่แผนที่';
            mainBtn.onclick = resetToMap;
        }

        function resetToMap() {
            dom.endOverlay.classList.add('hidden');
            showMapScreen();
        }

        function retryCurrentStage() {
            dom.endOverlay.classList.add('hidden');
            startStage(state.currentStageIndex);
        }

        function triggerBossTransformation() {
            state.isBossTransformed = true;
            dom.bossImg.classList.add('transforming');
            dom.bossBubble.innerText = 'ว้ายยย! จะแปลงร่างแล้ว!';

            setTimeout(() => {
                dom.bossImg.classList.remove('transforming');
                dom.bossDisplayName.innerText = boss.transformedName;
                dom.bossImg.src = boss.transformedImage;
                dom.bossBubble.innerText = 'ฟู่ๆๆ! ฉันมาแล้ว!';
            }, 1000);
        }

        function submitTextAnswer() {
            const input = document.getElementById('text-answer')?.value.trim() || '';
            const questionData = getQuestion();
            const correctAnswer = questionData.a[questionData.correct];

            const normalizeForCompare = text => String(text ?? '')
                .replace(/\s/g, '')
                .replace(/-/g, '')
                .toLowerCase();

            if (normalizeForCompare(input) === normalizeForCompare(correctAnswer)) {
                state.score += 1;
                animateDreambull('correct');
                setTimeout(moveNext, 800);
                return;
            }

            loseHeart();
        }

        function startSpeech(button) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

            if (!SpeechRecognition) {
                window.alert('เบราว์เซอร์นี้ยังไม่รองรับการพูด กรุณาเปิดใน Chrome หรือ Edge');
                return;
            }

            const recognition = new SpeechRecognition();
            recognition.lang = speechLang;
            button.classList.add('listening');

            recognition.onresult = event => {
                const text = event.results[0][0].transcript;
                const textAnswer = document.getElementById('text-answer');

                if (textAnswer) {
                    textAnswer.value = text;
                }
            };

            recognition.onend = () => {
                button.classList.remove('listening');
            };

            recognition.start();
        }

        function repeatAudio(button) {
            const questionData = getQuestion();
            button.classList.add('speaking');
            speak(questionData.audio || questionData.q);

            setTimeout(() => {
                button.classList.remove('speaking');
            }, 1000);
        }

        function enterGame() {
            dom.videoZone.classList.add('hidden');
            dom.quizZone.classList.remove('hidden');
            showGameScreen();
            loadQuestion();
        }

        function backToMap() {
            dom.videoZone.classList.add('hidden');
            dom.quizZone.classList.remove('hidden');
            showMapScreen();
        }

        function init() {
            loadProgression();
            updateHeartsDisplay();
            generateMap();

            if (dom.hintBubble) {
                dom.hintBubble.classList.add('hidden');
            }
        }

        window.enterGame = enterGame;
        window.backToMap = backToMap;
        window.resetToMap = resetToMap;
        window.retryCurrentStage = retryCurrentStage;
        window.submitTextAnswer = submitTextAnswer;
        window.startSpeech = startSpeech;
        window.repeatAudio = repeatAudio;

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init, { once: true });
        } else {
            init();
        }
    }

    window.createSubjectGame = createSubjectGame;
})();
