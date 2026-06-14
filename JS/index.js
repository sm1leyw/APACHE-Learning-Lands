function navigateTo(url) {
    const destination = typeof url === "string" ? url.trim() : "";

    if (!destination) {
        return;
    }

    window.location.href = destination;
}

(function () {
    function bindSubjectNavigation() {
        const cards = document.querySelectorAll(".subject-card");
        const buttons = document.querySelectorAll(".play-btn[data-target]");

        buttons.forEach((button) => {
            button.addEventListener("click", (event) => {
                event.stopPropagation();
                navigateTo(button.dataset.target);
            });
        });

        cards.forEach((card) => {
            const destination = card.dataset.destination;

            if (!destination) {
                return;
            }

            card.addEventListener("click", (event) => {
                if (event.target.closest("button")) {
                    return;
                }

                navigateTo(destination);
            });

            card.addEventListener("keydown", (event) => {
                if (event.key !== "Enter" && event.key !== " ") {
                    return;
                }

                event.preventDefault();
                navigateTo(destination);
            });
        });
    }

    function initShaderBackground() {
        const mountPoint = document.getElementById("shader-background");
        const supportsReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

        if (!mountPoint || supportsReducedMotion.matches || !window.THREE) {
            return;
        }

        const THREE = window.THREE;
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        camera.position.z = 1;

        let animationFrameId = null;
        let renderer = null;
        let material = null;
        let geometry = null;
        let isDisposed = false;

        const uniforms = {
            uResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) },
            uTime: { value: 0 },
            u_time_scale: { value: 0.6 },
            u_view_scale: { value: 0.92 },
            u_detail: { value: 0.7 },
            u_shift_rate: { value: 0.83 },
            u_shift_amp: { value: 0.7 },
            u_tint_angle: { value: 0.0 },
            u_color_sat: { value: 1.0 },
            u_lum_factor: { value: 1.0 },
            u_rgb_weights: { value: new THREE.Vector3(1.0, 1.0, 1.0) }
        };

        const coreShaderCode = `
            uniform float u_time_scale;
            uniform float u_view_scale;
            uniform float u_detail;
            uniform float u_shift_rate;
            uniform float u_shift_amp;
            uniform float u_tint_angle;
            uniform float u_color_sat;
            uniform float u_lum_factor;
            uniform vec3 u_rgb_weights;

            void computeSurface(out vec4 fragColor, vec2 fragCoord) {
                vec2 resolution = uResolution.xy;
                float minRes = min(resolution.x, resolution.y);
                vec2 normCoord = (fragCoord * 2.0 - resolution) / minRes;

                normCoord *= u_view_scale;

                float t = uTime * u_time_scale * 0.3;
                float shiftT = uTime * u_shift_rate * 0.5;

                vec2 phase = vec2(-t * 0.5, 0.0);
                vec2 pos = normCoord;

                for (float j = 0.0; j < 8.0; j += 1.0) {
                    vec2 offset = vec2(sin(shiftT + j * 1.3), cos(shiftT - j * 1.1)) * u_shift_amp;
                    vec2 p = pos + offset;

                    phase.y += cos(j - phase.x - p.x * u_detail);
                    phase.x += sin(p.y * u_detail + phase.y);
                }

                phase.x += t * 0.5;

                vec3 color = vec3(
                    cos(normCoord.x * phase.x + normCoord.y * phase.y) * 0.6 + 0.4,
                    cos(phase.y + phase.x) * 0.5 + 0.5,
                    cos(phase.y + phase.x) * 0.5 + 0.5
                );

                color = cos(color * cos(vec3(phase.x, phase.y, 2.5)) * 0.5 + 0.5);
                color *= u_rgb_weights;

                float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
                color = mix(vec3(luma), color, u_color_sat);

                vec3 axis = vec3(0.577350269);
                float rotationCos = cos(u_tint_angle);
                color = color * rotationCos
                    + cross(axis, color) * sin(u_tint_angle)
                    + axis * dot(axis, color) * (1.0 - rotationCos);

                color *= u_lum_factor;
                fragColor = vec4(color, 1.0);
            }
        `;

        const vertexShader = `
            void main() {
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            uniform vec3 uResolution;
            uniform float uTime;

            ${coreShaderCode}

            void main() {
                computeSurface(gl_FragColor, gl_FragCoord.xy);
            }
        `;

        function resizeRenderer() {
            if (!renderer || isDisposed) {
                return;
            }

            const width = mountPoint.clientWidth || window.innerWidth;
            const height = mountPoint.clientHeight || window.innerHeight;

            renderer.setSize(width, height);
            uniforms.uResolution.value.set(width, height, 1);
        }

        function disposeBackground() {
            isDisposed = true;

            if (animationFrameId) {
                window.cancelAnimationFrame(animationFrameId);
            }

            window.removeEventListener("resize", resizeRenderer);

            if (geometry) {
                geometry.dispose();
            }

            if (material) {
                material.dispose();
            }

            if (renderer) {
                renderer.dispose();

                if (renderer.domElement.parentNode === mountPoint) {
                    mountPoint.removeChild(renderer.domElement);
                }
            }
        }

        try {
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
            renderer.setClearColor(0x000000, 0);

            material = new THREE.ShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms
            });

            geometry = new THREE.PlaneGeometry(2, 2);
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            mountPoint.appendChild(renderer.domElement);
            resizeRenderer();

            const clock = new THREE.Clock();

            function animate() {
                if (isDisposed) {
                    return;
                }

                uniforms.uTime.value = clock.getElapsedTime();
                renderer.render(scene, camera);
                animationFrameId = window.requestAnimationFrame(animate);
            }

            window.addEventListener("resize", resizeRenderer);
            window.addEventListener("beforeunload", disposeBackground, { once: true });
            animate();
        } catch (error) {
            disposeBackground();
            console.warn("Shader background fallback is active.", error);
        }
    }

    function initHomePage() {
        bindSubjectNavigation();
        initShaderBackground();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initHomePage, { once: true });
    } else {
        initHomePage();
    }
})();