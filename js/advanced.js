// 🔥 Advanced 2025 Features

// Gesture Controls for Mobile
class GestureHandler {
    constructor() {
        this.startX = 0;
        this.startY = 0;
        this.init();
    }

    init() {
        document.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            this.handleGesture(this.startX, this.startY, endX, endY);
        });
    }

    handleGesture(startX, startY, endX, endY) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const minSwipeDistance = 100;

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe right - open command palette
                new CommandPalette().open();
                new ToastManager().show('Swipe gesture detected! 👆', 'success');
            } else {
                // Swipe left - close modals
                document.querySelectorAll('.modal, .command-palette').forEach(modal => {
                    modal.classList.remove('active');
                });
            }
        }
    }
}

// Particle System for Hero Section
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'particle-canvas';
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }

    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(34, 197, 94, ${particle.opacity})`;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Adaptive Theme based on Time/Location
class AdaptiveTheme {
    constructor() {
        this.init();
    }

    init() {
        this.adaptToTime();
        this.adaptToSystemColors();
        
        // Update every hour
        setInterval(() => this.adaptToTime(), 3600000);
    }

    adaptToTime() {
        const hour = new Date().getHours();
        const isDaytime = hour >= 6 && hour < 18;
        
        if (!isDaytime && !document.documentElement.hasAttribute('data-theme')) {
            new ThemeManager().setTheme('dark');
            new ToastManager().show('Switched to night mode 🌙', 'success');
        }
    }

    async adaptToSystemColors() {
        if ('EyeDropper' in window) {
            try {
                const eyeDropper = new EyeDropper();
                // Could be triggered by user action
                // const result = await eyeDropper.open();
                // this.updateThemeColors(result.sRGBHex);
            } catch (e) {
                console.log('EyeDropper not supported');
            }
        }
    }

    updateThemeColors(color) {
        document.documentElement.style.setProperty('--primary', color);
        new ToastManager().show('Theme adapted to your colors! 🎨', 'success');
    }
}

// Initialize all advanced features
document.addEventListener('DOMContentLoaded', () => {
    // Add small delay to ensure main.js loads first
    setTimeout(() => {
        new GestureHandler();
        new AdaptiveTheme();
        
        // Add particle system to hero
        const hero = document.querySelector('.hero');
        if (hero) {
            new ParticleSystem(hero);
        }
        
        
        // Remove any voice buttons that might have been added
        document.querySelectorAll('.voice-btn').forEach(btn => btn.remove());
    }, 1000);
});