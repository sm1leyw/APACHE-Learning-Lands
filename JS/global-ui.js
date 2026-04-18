(function () {
    const STORAGE_KEY = "apache-theme";
    const DEFAULT_THEME = "dark";
    const root = document.documentElement;

    const iconSet = {
        sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 4.75a.75.75 0 0 1 .75.75v1.2a.75.75 0 0 1-1.5 0V5.5a.75.75 0 0 1 .75-.75Zm0 12.55a.75.75 0 0 1 .75.75v1.2a.75.75 0 0 1-1.5 0v-1.2a.75.75 0 0 1 .75-.75Zm7.25-4.55a.75.75 0 0 1 0 1.5h-1.2a.75.75 0 0 1 0-1.5h1.2Zm-12.1 0a.75.75 0 0 1 0 1.5h-1.2a.75.75 0 0 1 0-1.5h1.2Zm8.48-5.73a.75.75 0 0 1 1.06 0l.85.85a.75.75 0 1 1-1.06 1.06l-.85-.85a.75.75 0 0 1 0-1.06Zm-9.02 9.02a.75.75 0 0 1 1.06 0l.85.85a.75.75 0 0 1-1.06 1.06l-.85-.85a.75.75 0 0 1 0-1.06Zm9.87 1.91a.75.75 0 0 1 1.06 0l.85.85a.75.75 0 0 1-1.06 1.06l-.85-.85a.75.75 0 0 1 0-1.06Zm-9.87-9.87a.75.75 0 0 1 1.06 0l.85.85A.75.75 0 0 1 7.46 9.98l-.85-.85a.75.75 0 0 1 0-1.06ZM12 8a4 4 0 1 1 0 8a4 4 0 0 1 0-8Z"/></svg>',
        moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M15.57 3.67a.75.75 0 0 1 .27 1.02a7.8 7.8 0 1 0 3.46 10.56a.75.75 0 0 1 1.34.67a9.3 9.3 0 1 1-4.11-12a.75.75 0 0 1-.96-.25Z"/></svg>',
        menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.5 7.25h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1 0-1.5Zm0 4h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1 0-1.5Zm0 4h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1 0-1.5Z"/></svg>',
        home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M11.42 4.35a1 1 0 0 1 1.16 0l6.25 4.72a1 1 0 0 1 .4.8v8.03a1.1 1.1 0 0 1-1.1 1.1H14.7a1.1 1.1 0 0 1-1.1-1.1v-3.4h-3.2v3.4a1.1 1.1 0 0 1-1.1 1.1H5.87a1.1 1.1 0 0 1-1.1-1.1V9.87a1 1 0 0 1 .4-.8l6.25-4.72Z"/></svg>',
        contact: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5.75 5.5h12.5A1.75 1.75 0 0 1 20 7.25v9.5A1.75 1.75 0 0 1 18.25 18.5H5.75A1.75 1.75 0 0 1 4 16.75v-9.5A1.75 1.75 0 0 1 5.75 5.5Zm0 1.5a.25.25 0 0 0-.25.25v.27l6.1 4.53a.7.7 0 0 0 .8 0l6.1-4.53v-.27a.25.25 0 0 0-.25-.25H5.75Zm12.5 10a.25.25 0 0 0 .25-.25v-7.38l-5.2 3.87a2.2 2.2 0 0 1-2.6 0L5.5 9.37v7.38c0 .14.11.25.25.25h12.5Z"/></svg>',
        news: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.5 5.5h11a2 2 0 0 1 2 2v8.75a2.25 2.25 0 0 1-2.25 2.25H8.25A3.25 3.25 0 0 1 5 15.25V7a1.5 1.5 0 0 1 1.5-1.5Zm.75 2a.75.75 0 0 0-.75.75v7a1.75 1.75 0 0 0 1.75 1.75h9a.75.75 0 0 0 .75-.75V7.5a.5.5 0 0 0-.5-.5h-10.25Zm1.75 2h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1 0-1.5Zm0 3h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1 0-1.5Z"/></svg>',
        video: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.25 6.25h8.5A2.25 2.25 0 0 1 17 8.5v1.37l2.8-1.77a.75.75 0 0 1 1.15.64v6.52a.75.75 0 0 1-1.15.64L17 14.13v1.37a2.25 2.25 0 0 1-2.25 2.25h-8.5A2.25 2.25 0 0 1 4 15.5v-7A2.25 2.25 0 0 1 6.25 6.25Zm0 1.5a.75.75 0 0 0-.75.75v7c0 .41.34.75.75.75h8.5c.41 0 .75-.34.75-.75v-7a.75.75 0 0 0-.75-.75h-8.5Z"/></svg>'
    };

    function getSavedTheme() {
        try {
            const savedTheme = localStorage.getItem(STORAGE_KEY);
            return savedTheme === "light" ? "light" : DEFAULT_THEME;
        } catch (error) {
            return DEFAULT_THEME;
        }
    }

    function setTheme(theme, persist = true) {
        const nextTheme = theme === "light" ? "light" : DEFAULT_THEME;
        root.dataset.theme = nextTheme;

        if (persist) {
            try {
                localStorage.setItem(STORAGE_KEY, nextTheme);
            } catch (error) {
                console.warn("Unable to save theme preference.", error);
            }
        }

        const label = document.querySelector(".theme-toggle__label");
        const button = document.querySelector(".theme-toggle");

        if (label) {
            label.textContent = nextTheme === "dark" ? "Dark" : "Light";
        }

        if (button) {
            button.setAttribute("aria-pressed", String(nextTheme === "light"));
            button.setAttribute("aria-label", nextTheme === "dark" ? "Switch to light theme" : "Switch to dark theme");
        }
    }

    function buildFloatingUi() {
        if (document.querySelector(".global-ui-shell")) {
            return;
        }

        const shell = document.createElement("div");
        shell.className = "global-ui-shell";
        shell.innerHTML = `
            <canvas class="interaction-canvas" aria-hidden="true"></canvas>

            <button class="theme-toggle" type="button" aria-pressed="false">
                <span class="theme-toggle__track">
                    <span class="theme-toggle__icon">${iconSet.sun}</span>
                    <span class="theme-toggle__icon">${iconSet.moon}</span>
                    <span class="theme-toggle__thumb"></span>
                </span>
                <span class="theme-toggle__label">Dark</span>
            </button>

            <div class="nav-orb">
                <button class="nav-orb__action nav-orb__action--home" onclick="window.location='index.html'" type="button" data-nav="home" aria-label="Home">
                    <span class="nav-orb__icon">${iconSet.home}</span>
                    <span class="nav-orb__label">Home</span>
                </button>
                <button class="nav-orb__action nav-orb__action--video" onclick="window.location='คลังวิดีโอ.html'" type="button" data-nav="video" aria-label="Video">
                    <span class="nav-orb__icon">${iconSet.video}</span>
                    <span class="nav-orb__label">Vdo</span>
                </button>
                <button class="nav-orb__action nav-orb__action--news" onclick="window.location='news.html'"  type="button" data-nav="news" aria-label="News">
                    <span class="nav-orb__icon">${iconSet.news}</span>
                    <span class="nav-orb__label">News</span>
                </button>
                <button class="nav-orb__action nav-orb__action--contact" onclick="window.location='contact.html'" type="button" data-nav="contact" aria-label="Contact">
                    <span class="nav-orb__icon">${iconSet.contact}</span>
                    <span class="nav-orb__label">Contact</span>
                </button>
                <button class="nav-orb__center" type="button" aria-expanded="false" aria-label="Open navigation menu">
                    ${iconSet.menu}
                    <span class="sr-only">Navigation menu</span>
                </button>
            </div>
        `;

        document.body.appendChild(shell);
    }

    function bindThemeToggle() {
        const themeToggle = document.querySelector(".theme-toggle");

        if (!themeToggle) {
            return;
        }

        themeToggle.addEventListener("click", () => {
            const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
            setTheme(nextTheme);
        });

        setTheme(getSavedTheme(), false);
    }

    function bindNavOrb() {
        const navOrb = document.querySelector(".nav-orb");
        const centerButton = navOrb?.querySelector(".nav-orb__center");
        const actions = navOrb?.querySelectorAll(".nav-orb__action");

        if (!navOrb || !centerButton || !actions?.length) {
            return;
        }

        function setExpanded(isExpanded) {
            navOrb.classList.toggle("is-expanded", isExpanded);
            centerButton.setAttribute("aria-expanded", String(isExpanded));
        }

        centerButton.addEventListener("click", (event) => {
            event.stopPropagation();
            setExpanded(!navOrb.classList.contains("is-expanded"));
        });

        actions.forEach((action) => {
            action.addEventListener("click", () => {
                action.classList.add("is-tapped");
                window.setTimeout(() => {
                    action.classList.remove("is-tapped");
                }, 180);
            });
        });

        document.addEventListener("click", (event) => {
            if (!navOrb.classList.contains("is-expanded")) {
                return;
            }

            if (!navOrb.contains(event.target)) {
                setExpanded(false);
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                setExpanded(false);
            }
        });
    }

    function initPointerFx() {
        const canvas = document.querySelector(".interaction-canvas");
        const ctx = canvas?.getContext("2d");
        const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

        if (!canvas || !ctx) {
            return;
        }

        const particles = [];
        const ripples = [];
        let lastPoint = null;

        function prefersReducedMotion() {
            return reducedMotionQuery.matches;
        }

        function resizeCanvas() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(window.innerWidth * dpr);
            canvas.height = Math.floor(window.innerHeight * dpr);
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
        }

        function spawnTrail(x, y, strength = 1) {
            const count = prefersReducedMotion() ? 1 : 3;

            for (let index = 0; index < count; index += 1) {
                const hue = (performance.now() * 0.06 + index * 36 + Math.random() * 28) % 360;
                particles.push({
                    x,
                    y,
                    px: x,
                    py: y,
                    vx: (Math.random() - 0.5) * 1.8,
                    vy: (Math.random() - 0.5) * 1.8,
                    life: 1,
                    decay: 0.018 + Math.random() * 0.015,
                    size: 1.8 + Math.random() * 2.4 * strength,
                    hue
                });
            }

            const maxParticles = prefersReducedMotion() ? 60 : 180;

            if (particles.length > maxParticles) {
                particles.splice(0, particles.length - maxParticles);
            }
        }

        function spawnRipple(x, y) {
            ripples.push({
                x,
                y,
                radius: 10,
                alpha: 0.36,
                hue: (performance.now() * 0.08) % 360
            });

            if (ripples.length > 20) {
                ripples.splice(0, ripples.length - 20);
            }
        }

        function handlePointerMove(event) {
            if (prefersReducedMotion()) {
                lastPoint = { x: event.clientX, y: event.clientY };
                return;
            }

            const x = event.clientX;
            const y = event.clientY;

            if (!lastPoint) {
                lastPoint = { x, y };
            }

            const dx = x - lastPoint.x;
            const dy = y - lastPoint.y;
            const distance = Math.hypot(dx, dy);
            const strength = Math.min(1.9, Math.max(0.75, distance / 16));

            spawnTrail(x, y, strength);
            lastPoint = { x, y };
        }

        function handlePointerDown(event) {
            spawnRipple(event.clientX, event.clientY);

            if (!prefersReducedMotion()) {
                spawnTrail(event.clientX, event.clientY, 1.4);
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            particles.forEach((particle) => {
                particle.life -= particle.decay;
                particle.px = particle.x;
                particle.py = particle.y;
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vx *= 0.96;
                particle.vy *= 0.96;

                if (particle.life <= 0) {
                    return;
                }

                ctx.strokeStyle = `hsla(${particle.hue}, 100%, 62%, ${particle.life})`;
                ctx.shadowColor = `hsla(${particle.hue}, 100%, 62%, ${particle.life * 0.75})`;
                ctx.shadowBlur = 12;
                ctx.lineWidth = particle.size;
                ctx.beginPath();
                ctx.moveTo(particle.px, particle.py);
                ctx.lineTo(particle.x, particle.y);
                ctx.stroke();
            });

            ripples.forEach((ripple) => {
                ripple.radius += 2.8;
                ripple.alpha *= 0.95;

                if (ripple.alpha <= 0.03) {
                    return;
                }

                ctx.strokeStyle = `hsla(${ripple.hue}, 100%, 70%, ${ripple.alpha})`;
                ctx.shadowColor = `hsla(${ripple.hue}, 100%, 70%, ${ripple.alpha})`;
                ctx.shadowBlur = 10;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                ctx.stroke();
            });

            ctx.shadowBlur = 0;

            for (let index = particles.length - 1; index >= 0; index -= 1) {
                if (particles[index].life <= 0) {
                    particles.splice(index, 1);
                }
            }

            for (let index = ripples.length - 1; index >= 0; index -= 1) {
                if (ripples[index].alpha <= 0.03) {
                    ripples.splice(index, 1);
                }
            }

            window.requestAnimationFrame(animate);
        }

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        window.addEventListener("pointerdown", handlePointerDown, { passive: true });
        window.addEventListener("pointerleave", () => {
            lastPoint = null;
        });

        animate();
    }

    function initGlobalUi() {
        buildFloatingUi();
        bindThemeToggle();
        bindNavOrb();
        initPointerFx();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initGlobalUi, { once: true });
    } else {
        initGlobalUi();
    }
})();
