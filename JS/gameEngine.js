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

    const AUDIO_FILE_PATTERN = /\.(mp3|wav|ogg|m4a|aac|webm)(\?.*)?$/i;

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
            score: 0,
            currentAudioPlayer: null
        };

        const maxHearts = 3;

        const dom = {
            videoZone: document.getElementById('video-zone'),
            levelVideoIframe: document.getElementById('levelVideoIframe'),
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
            questionBox: document.querySelector('.question-box'),
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
        const defaultMapTitle = normalizeText(config.mapTitle || dom.currentStageTitle?.innerText || 'แผนที่การผจญภัย');

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

        function isAudioFileSource(value) {
            const normalized = String(value ?? '').trim();

            if (!normalized) {
                return false;
            }

            return AUDIO_FILE_PATTERN.test(normalized)
                || normalized.startsWith('data:audio/')
                || normalized.startsWith('blob:');
        }

        function getQuestionAudioConfig(questionData) {
            const audioConfig = questionData?.audio;

            if (!audioConfig) {
                return null;
            }

            if (typeof audioConfig === 'string') {
                return isAudioFileSource(audioConfig)
                    ? { src: audioConfig, text: '', autoplay: false }
                    : { src: '', text: audioConfig, autoplay: false };
            }

            if (typeof audioConfig === 'object') {
                return {
                    src: typeof audioConfig.src === 'string' ? audioConfig.src : '',
                    text: typeof audioConfig.text === 'string' ? audioConfig.text : '',
                    autoplay: Boolean(audioConfig.autoplay)
                };
            }

            return null;
        }

        function setAudioButtonState(button, isPlaying) {
            if (!button) {
                return;
            }

            button.classList.toggle('speaking', isPlaying);
            button.innerText = isPlaying ? 'กำลังเล่น...' : 'เล่นเสียง';
        }

        function stopAudioPlayback() {
            if (state.currentAudioPlayer) {
                state.currentAudioPlayer.pause();
                state.currentAudioPlayer.currentTime = 0;
                state.currentAudioPlayer = null;
            }

            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }

            setAudioButtonState(document.querySelector('.speaker-btn'), false);
        }

        function ensureQuestionMediaElements() {
            if (!dom.questionBox) {
                return null;
            }

            let mediaContainer = dom.questionBox.querySelector('.question-media-container');

            if (!mediaContainer) {
                mediaContainer = document.createElement('div');
                mediaContainer.className = 'question-media-container hidden';

                const mediaImage = document.createElement('img');
                mediaImage.className = 'question-media';
                mediaImage.alt = '';
                mediaImage.loading = 'lazy';

                const mediaCaption = document.createElement('p');
                mediaCaption.className = 'question-media-caption hidden';

                mediaContainer.appendChild(mediaImage);
                mediaContainer.appendChild(mediaCaption);
                dom.questionBox.appendChild(mediaContainer);
            }

            return {
                container: mediaContainer,
                image: mediaContainer.querySelector('.question-media'),
                caption: mediaContainer.querySelector('.question-media-caption')
            };
        }

        function getQuestionImageConfig(questionData) {
            const imageConfig = questionData?.image;

            if (!imageConfig) {
                return null;
            }

            if (typeof imageConfig === 'string') {
                return {
                    src: imageConfig,
                    alt: questionData.imageAlt || formatQuestionText(questionData.q),
                    caption: questionData.imageCaption || ''
                };
            }

            if (typeof imageConfig === 'object' && typeof imageConfig.src === 'string') {
                return {
                    src: imageConfig.src,
                    alt: imageConfig.alt || questionData.imageAlt || formatQuestionText(questionData.q),
                    caption: imageConfig.caption || questionData.imageCaption || ''
                };
            }

            return null;
        }

        function clearQuestionImage(mediaElements) {
            if (!mediaElements) {
                return;
            }

            mediaElements.container.classList.add('hidden');
            mediaElements.image.removeAttribute('src');
            mediaElements.image.alt = '';
            mediaElements.image.onerror = null;
            mediaElements.caption.innerText = '';
            mediaElements.caption.classList.add('hidden');
            dom.questionBox?.classList.remove('has-media');
        }

        function renderQuestionImage(questionData) {
            const mediaElements = ensureQuestionMediaElements();
            const imageConfig = getQuestionImageConfig(questionData);

            if (!mediaElements || !imageConfig?.src) {
                clearQuestionImage(mediaElements);
                return;
            }

            mediaElements.image.onerror = () => {
                clearQuestionImage(mediaElements);
            };
            mediaElements.image.src = imageConfig.src;
            mediaElements.image.alt = imageConfig.alt;

            if (imageConfig.caption) {
                mediaElements.caption.innerText = imageConfig.caption;
                mediaElements.caption.classList.remove('hidden');
            } else {
                mediaElements.caption.innerText = '';
                mediaElements.caption.classList.add('hidden');
            }

            mediaElements.container.classList.remove('hidden');
            dom.questionBox?.classList.add('has-media');
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
            setHeartsVisibility(false);
        }

        function showGameScreen() {
            dom.mapScreen.classList.add('hidden');
            dom.gameScreen.classList.remove('hidden');
            setHudTitle(getStage()?.name || defaultMapTitle);
            setHeartsVisibility(true);
        }

        function showMapScreen() {
            dom.gameScreen.classList.add('hidden');
            dom.mapScreen.classList.remove('hidden');
            setHudTitle(defaultMapTitle);
            setHeartsVisibility(false);
            generateMap();
        }

        function setHudTitle(title) {
            if (!dom.currentStageTitle) {
                return;
            }

            dom.currentStageTitle.innerText = title;
        }

        function setHeartsVisibility(isVisible) {
            if (!dom.heartsContainer) {
                return;
            }

            dom.heartsContainer.classList.toggle('hidden', !isVisible);
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
        dom.bossImg.src = config.boss?.initialImage || DEFAULT_BOSS.initialImage; 
    
        dom.bossBubble.innerText = 'รับมือ!';
        }



        function startStage(index) {
            const stage = quizData[index];

            state.currentStageIndex = index;
            state.currentQuestionIndex = 0;
            state.score = 0;
            state.currentHearts = maxHearts;
            state.isBossTransformed = false;

            dom.stageNum.innerText = stage.id;
            dom.stageName.innerText = stage.name;
            dom.totalQuestions.innerText = String(getStageQuestionCount(stage));

            // ---------- ส่วนที่แก้ไข: ดึงวิดีโอตามด่าน ----------
            const videoIframe = document.getElementById('levelVideoIframe');
    
            // เช็กว่ามีกล่องวิดีโอในหน้าเว็บไหม และด่านนี้มี vdoId หรือเปล่า
            if (videoIframe && stage.vdoId) {
                // อัปเดตลิงก์ YouTube เป็นด่านนั้นๆ 
                videoIframe.src = `https://www.youtube.com/embed/${stage.vdoId}?rel=0&autoplay=0`;
                console.log(`กำลังโหลดวิดีโอสำหรับด่าน ${stage.id} ID: ${stage.vdoId}`);
            } else if (videoIframe) {
                // ถ้าด่านไหนไม่ได้ใส่ vdoId ไว้ ให้เคลียร์หน้าจอว่าง
                videoIframe.src = "";
            }
            // ------------------------------------------------

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
                actionButtons.push('<button class="speaker-btn" onclick="repeatAudio(this)">เล่นเสียง</button>');
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

        function speak(text, callbacks = {}) {
            if (!text || !window.speechSynthesis) {
                callbacks.onError?.();
                return false;
            }

            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = speechLang;
            utterance.rate = 0.9;
            utterance.onend = () => {
                callbacks.onEnd?.();
            };
            utterance.onerror = () => {
                callbacks.onError?.();
            };

            window.speechSynthesis.speak(utterance);
            return true;
        }

        function playQuestionAudio(button) {
            const questionData = getQuestion();
            const audioConfig = getQuestionAudioConfig(questionData);

            if (!audioConfig || (!audioConfig.src && !audioConfig.text)) {
                return;
            }

            stopAudioPlayback();
            setAudioButtonState(button, true);

            if (audioConfig.src) {
                const audioPlayer = new Audio(audioConfig.src);
                state.currentAudioPlayer = audioPlayer;

                audioPlayer.onended = () => {
                    state.currentAudioPlayer = null;
                    setAudioButtonState(button, false);
                };

                audioPlayer.onerror = () => {
                    state.currentAudioPlayer = null;
                    setAudioButtonState(button, false);
                    window.alert('ไม่สามารถเล่นไฟล์เสียงของข้อนี้ได้');
                };

                const playPromise = audioPlayer.play();
                if (playPromise?.catch) {
                    playPromise.catch(() => {
                        state.currentAudioPlayer = null;
                        setAudioButtonState(button, false);
                        window.alert('เบราว์เซอร์ยังไม่อนุญาตให้เล่นเสียง กรุณากดปุ่มเล่นอีกครั้ง');
                    });
                }

                return;
            }

            if (!window.speechSynthesis) {
                setAudioButtonState(button, false);
                window.alert('เบราว์เซอร์นี้ยังไม่รองรับการเล่นเสียงคำพูด');
                return;
            }

            speak(audioConfig.text, {
                onEnd: () => setAudioButtonState(button, false),
                onError: () => setAudioButtonState(button, false)
            });
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
            const questionAudio = getQuestionAudioConfig(questionData);

            stopAudioPlayback();
            dom.questionNum.innerText = state.currentQuestionIndex + 1;
            dom.questionText.innerText = formatQuestionText(questionData.q);
            renderQuestionImage(questionData);

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
                    text: 'กดปุ่มเล่นเสียง แล้วเลือกคำตอบ',
                    showSpeaker: true
                });
                setAudioButtonState(document.querySelector('.speaker-btn'), false);

                if (questionAudio?.autoplay) {
                    requestAnimationFrame(() => {
                        const speakerButton = document.querySelector('.speaker-btn');
                        if (speakerButton) {
                            playQuestionAudio(speakerButton);
                        }
                    });
                }
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

            stopAudioPlayback();
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
            stopAudioPlayback();
            dom.endOverlay.classList.add('hidden');
            showMapScreen();
        }

        function retryCurrentStage() {
            stopAudioPlayback();
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
            playQuestionAudio(button);
        }

        function enterGame() {
            dom.videoZone.classList.add('hidden');
            dom.quizZone.classList.remove('hidden');
            showGameScreen();
            loadQuestion();
        }

        function backToMap() {
            stopAudioPlayback();
            dom.videoZone.classList.add('hidden'); // ซ่อนหน้าวิดีโอ
            dom.quizZone.classList.remove('hidden'); // แสดงหน้าเกม
            showMapScreen(); // เรียกแสดงหน้าแผนที่ด่าน

            const videoIframe = document.getElementById('levelVideoIframe');
            if (videoIframe) {
            videoIframe.src = ""; 
            }
        }

        function init() {
            loadProgression();
            updateHeartsDisplay();
            showMapScreen();

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
    
    createSubjectGame({
    quizData: thaiQuizData,
    boss: {
        initialImage: 'ตัวละคร/TJ(Boss)_Thai.png',
        transformedImage: 'ตัวละคร/บุญดา(Boss)_Thai.png',
        transformedName: 'งูบุญดา'
    }
    }
    );

    createSubjectGame({
    quizData: engQuizData,
    boss: {
        initialImage: 'ตัวละคร/Joffy Extreme_(EngBoss).png', // รูปบอสอังกฤษ
        transformedImage: 'ตัวละคร/Joffy_Extreme_buss(EngBoss).png',
        transformedName: 'บอสงูอังกฤษ'
    }
    }
    );
})();
