// Theme Management
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            this.setTheme('dark');
        }
        
        this.bindEvents();
    }

    setTheme(theme) {
        const html = document.documentElement;
        const sunIcon = document.getElementById('sun-icon');
        const moonIcon = document.getElementById('moon-icon');
        
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            sunIcon?.classList.add('hidden');
            moonIcon?.classList.remove('hidden');
        } else {
            html.removeAttribute('data-theme');
            sunIcon?.classList.remove('hidden');
            moonIcon?.classList.add('hidden');
        }
        
        localStorage.setItem('theme', theme);
    }

    toggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        this.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    }

    bindEvents() {
        const toggleBtn = document.getElementById('theme-toggle');
        toggleBtn?.addEventListener('click', () => this.toggle());
    }
}

// Mobile Menu Management
class MobileMenu {
    constructor() {
        this.menu = document.getElementById('mobile-menu');
        this.overlay = document.getElementById('mobile-overlay');
        this.openBtn = document.getElementById('mobile-menu-btn');
        this.closeBtn = document.getElementById('mobile-close');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    open() {
        this.menu?.classList.add('active');
        this.overlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.menu?.classList.remove('active');
        this.overlay?.classList.remove('active');
        document.body.style.overflow = '';
    }

    bindEvents() {
        this.openBtn?.addEventListener('click', () => this.open());
        this.closeBtn?.addEventListener('click', () => this.close());
        this.overlay?.addEventListener('click', () => this.close());
        
        // Close on navigation
        this.menu?.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.close());
        });
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}

// Modern Animations Class
class ModernAnimations {
    constructor() {
        this.initScrollAnimations();
        this.initStaggerAnimations();
        this.initParallaxEffects();
    }

    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.card, .section h2').forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    initStaggerAnimations() {
        document.querySelectorAll('.grid').forEach(grid => {
            const items = grid.children;
            Array.from(items).forEach((item, index) => {
                item.style.setProperty('--animation-order', index);
            });
        });
    }

    initParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.ascii-logo');
            
            parallaxElements.forEach(element => {
                const speed = 0.1;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// Enhanced Interactions
class EnhancedInteractions {
    constructor() {
        this.initRippleEffect();
        this.initMagneticButtons();
    }

    initRippleEffect() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255,255,255,0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    initMagneticButtons() {
        document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// Enhanced Command Palette with 2025 Features
class CommandPalette {
    constructor() {
        this.palette = document.getElementById('command-palette');
        this.input = document.getElementById('command-input');
        this.results = document.getElementById('command-results');
        this.selectedIndex = -1;
        this.recentCommands = JSON.parse(localStorage.getItem('recent-commands') || '[]');
        
        this.commands = [
            // Navigation
            { name: 'Home', url: 'index.html', category: 'navigation', icon: '🏠', description: 'Go to homepage' },
            { name: 'API Documentation', url: 'api.html', category: 'navigation', icon: '📚', description: 'Developer API reference' },
            { name: 'Command Reference', url: 'commands.html', category: 'navigation', icon: '⌨️', description: 'Vim commands guide' },
            { name: 'Levels Guide', url: 'levels.html', category: 'navigation', icon: '🎯', description: 'Learning progression' },
            
            // External Links
            { name: 'GitHub Repository', url: 'https://github.com/renzorlive/vimmaster', category: 'external', icon: '🔗', description: 'View source code' },
            { name: 'Report Issue', url: 'https://github.com/renzorlive/vimmaster/issues', category: 'external', icon: '🐛', description: 'Report a bug' },
            { name: 'Discussions', url: 'https://github.com/renzorlive/vimmaster/discussions', category: 'external', icon: '💬', description: 'Community discussions' },
            
            // Actions
            { name: 'Toggle Theme', action: 'theme', category: 'action', icon: '🌙', description: 'Switch between light/dark mode' },
            { name: 'Copy Current URL', action: 'copy-url', category: 'action', icon: '📋', description: 'Copy page URL to clipboard' },
            { name: 'Search Commands', action: 'search', category: 'action', icon: '🔍', description: 'Search through commands' },
            
            // Quick Actions
            { name: 'Scroll to Top', action: 'scroll-top', category: 'quick', icon: '⬆️', description: 'Jump to page top' },
            { name: 'Scroll to Bottom', action: 'scroll-bottom', category: 'quick', icon: '⬇️', description: 'Jump to page bottom' },
            { name: 'Focus Search', action: 'focus-search', category: 'quick', icon: '🔍', description: 'Focus search input' }
        ];
        
        this.init();
    }

    init() {
        if (!this.palette || !this.input || !this.results) return;
        
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.open();
            }
            if (e.key === 'Escape') {
                this.close();
            }
            if (this.palette && this.palette.classList.contains('active')) {
                this.handleKeyNavigation(e);
            }
        });

        const backdrop = this.palette.querySelector('.command-palette-backdrop');
        if (backdrop) backdrop.addEventListener('click', () => this.close());
        
        this.input.addEventListener('input', (e) => this.search(e.target.value));
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.executeSelected();
            }
        });
    }

    open() {
        this.palette.classList.add('active');
        this.palette.setAttribute('aria-hidden', 'false');
        this.input.focus();
        this.selectedIndex = -1;
        
        // Show recent commands if no query
        if (!this.input.value) {
            this.showRecentCommands();
        }
    }

    close() {
        this.palette.classList.remove('active');
        this.palette.setAttribute('aria-hidden', 'true');
        this.input.value = '';
        this.results.innerHTML = '';
        this.selectedIndex = -1;
    }

    handleKeyNavigation(e) {
        const items = this.results.querySelectorAll('.command-result');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.selectedIndex = Math.min(this.selectedIndex + 1, items.length - 1);
            this.updateSelection(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
            this.updateSelection(items);
        }
    }

    updateSelection(items) {
        items.forEach((item, index) => {
            item.classList.toggle('selected', index === this.selectedIndex);
        });
        
        if (this.selectedIndex >= 0 && items[this.selectedIndex]) {
            items[this.selectedIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    executeSelected() {
        const items = this.results.querySelectorAll('.command-result');
        if (this.selectedIndex >= 0 && items[this.selectedIndex]) {
            items[this.selectedIndex].click();
        } else if (items.length > 0) {
            items[0].click();
        }
    }

    showRecentCommands() {
        if (this.recentCommands.length === 0) {
            this.showAllCommands();
            return;
        }
        
        const recentItems = this.recentCommands.map(cmdName => 
            this.commands.find(cmd => cmd.name === cmdName)
        ).filter(Boolean);
        
        this.renderResults(recentItems, 'Recent Commands');
    }

    showAllCommands() {
        const grouped = this.groupByCategory(this.commands);
        let html = '';
        
        Object.entries(grouped).forEach(([category, commands]) => {
            html += `<div class="command-category-header">${this.getCategoryIcon(category)} ${this.formatCategory(category)}</div>`;
            html += commands.map(cmd => this.renderCommand(cmd)).join('');
        });
        
        this.results.innerHTML = html;
        this.bindResultEvents();
    }

    search(query) {
        if (!query.trim()) {
            this.showRecentCommands();
            return;
        }
        
        const filtered = this.fuzzySearch(query);
        this.renderResults(filtered, `Results for "${query}"`);
    }

    fuzzySearch(query) {
        const searchTerm = query.toLowerCase();
        
        return this.commands
            .map(cmd => ({
                ...cmd,
                score: this.calculateScore(cmd, searchTerm)
            }))
            .filter(cmd => cmd.score > 0)
            .sort((a, b) => b.score - a.score);
    }

    calculateScore(cmd, query) {
        const name = cmd.name.toLowerCase();
        const description = cmd.description.toLowerCase();
        
        // Exact match gets highest score
        if (name === query) return 100;
        
        // Starts with query gets high score
        if (name.startsWith(query)) return 90;
        
        // Contains query gets medium score
        if (name.includes(query)) return 70;
        
        // Description match gets lower score
        if (description.includes(query)) return 50;
        
        // Fuzzy match for typos
        const fuzzyScore = this.fuzzyMatch(name, query);
        if (fuzzyScore > 0.6) return Math.floor(fuzzyScore * 40);
        
        return 0;
    }

    fuzzyMatch(str, pattern) {
        let score = 0;
        let patternIdx = 0;
        
        for (let i = 0; i < str.length && patternIdx < pattern.length; i++) {
            if (str[i] === pattern[patternIdx]) {
                score += 1;
                patternIdx++;
            }
        }
        
        return patternIdx === pattern.length ? score / pattern.length : 0;
    }

    renderResults(commands, title) {
        if (commands.length === 0) {
            this.results.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <div class="no-results-text">No commands found</div>
                    <div class="no-results-hint">Try a different search term</div>
                </div>
            `;
            return;
        }
        
        const html = `
            <div class="command-section-title">${title}</div>
            ${commands.map(cmd => this.renderCommand(cmd)).join('')}
        `;
        
        this.results.innerHTML = html;
        this.bindResultEvents();
    }

    renderCommand(cmd) {
        return `
            <div class="command-result" data-command="${cmd.name}" data-url="${cmd.url || ''}" data-action="${cmd.action || ''}">
                <div class="command-icon">${cmd.icon}</div>
                <div class="command-content">
                    <div class="command-name">${cmd.name}</div>
                    <div class="command-description">${cmd.description}</div>
                </div>
                <div class="command-category-badge">${cmd.category}</div>
                <div class="command-shortcut">↵</div>
            </div>
        `;
    }

    bindResultEvents() {
        this.results.querySelectorAll('.command-result').forEach(result => {
            result.addEventListener('click', () => this.executeCommand(result));
            result.addEventListener('mouseenter', () => {
                this.selectedIndex = Array.from(this.results.querySelectorAll('.command-result')).indexOf(result);
                this.updateSelection(this.results.querySelectorAll('.command-result'));
            });
        });
    }

    executeCommand(element) {
        const commandName = element.dataset.command;
        const url = element.dataset.url;
        const action = element.dataset.action;
        
        // Add to recent commands
        this.addToRecent(commandName);
        
        if (action) {
            this.executeAction(action);
        } else if (url) {
            if (url.startsWith('http')) {
                window.open(url, '_blank');
            } else {
                window.location.href = url;
            }
        }
        
        this.close();
    }

    executeAction(action) {
        switch (action) {
            case 'theme':
                new ThemeManager().toggle();
                new ToastManager().show('Theme switched! 🎨');
                break;
            case 'copy-url':
                navigator.clipboard.writeText(window.location.href);
                new ToastManager().show('URL copied to clipboard! 📋');
                break;
            case 'scroll-top':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'scroll-bottom':
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                break;
            case 'focus-search':
                const searchInput = document.querySelector('input[type="search"], .search-input');
                if (searchInput) {
                    searchInput.focus();
                    new ToastManager().show('Search focused! 🔍');
                }
                break;
        }
    }

    addToRecent(commandName) {
        this.recentCommands = this.recentCommands.filter(cmd => cmd !== commandName);
        this.recentCommands.unshift(commandName);
        this.recentCommands = this.recentCommands.slice(0, 5); // Keep only 5 recent
        localStorage.setItem('recent-commands', JSON.stringify(this.recentCommands));
    }

    groupByCategory(commands) {
        return commands.reduce((groups, cmd) => {
            const category = cmd.category;
            if (!groups[category]) groups[category] = [];
            groups[category].push(cmd);
            return groups;
        }, {});
    }

    getCategoryIcon(category) {
        const icons = {
            navigation: '🧭',
            external: '🔗',
            action: '⚡',
            quick: '⚡'
        };
        return icons[category] || '📁';
    }

    formatCategory(category) {
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
}

// Toast Notifications
class ToastManager {
    constructor() {
        this.container = document.getElementById('toast-container');
    }

    show(message, type = 'success', duration = 3000) {
        if (!this.container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        this.container.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
}

// Newsletter Modal
class NewsletterModal {
    constructor() {
        this.modal = document.getElementById('newsletter-modal');
        if (!this.modal) return;
        this.form = this.modal.querySelector('.newsletter-form');
        this.init();
    }

    init() {
        if (!this.modal || !this.form) return;
        
        // Show after 30 seconds if not shown before
        setTimeout(() => {
            if (!localStorage.getItem('newsletter-shown')) {
                this.show();
            }
        }, 30000);

        const closeBtn = this.modal.querySelector('.newsletter-close');
        const backdrop = this.modal.querySelector('.newsletter-backdrop');
        
        if (closeBtn) closeBtn.addEventListener('click', () => this.close());
        if (backdrop) backdrop.addEventListener('click', () => this.close());
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    show() {
        this.modal.classList.add('active');
        this.modal.setAttribute('aria-hidden', 'false');
        localStorage.setItem('newsletter-shown', 'true');
    }

    close() {
        this.modal.classList.remove('active');
        this.modal.setAttribute('aria-hidden', 'true');
    }

    handleSubmit(e) {
        e.preventDefault();
        const email = this.form.querySelector('input[type="email"]').value;
        // Simulate newsletter signup
        new ToastManager().show('Thanks for subscribing! 🎉');
        this.close();
    }
}

// Dynamic Social Proof
class DynamicSocialProof {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.init();
    }

    async init() {
        await this.fetchRealData();
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        });

        this.counters.forEach(counter => observer.observe(counter));
    }

    async fetchRealData() {
        try {
            const [repoResponse, contributorsResponse] = await Promise.all([
                fetch('https://api.github.com/repos/renzorlive/vimmaster'),
                fetch('https://api.github.com/repos/renzorlive/vimmaster/contributors')
            ]);
            
            if (repoResponse.ok && contributorsResponse.ok) {
                const repoData = await repoResponse.json();
                const contributors = await contributorsResponse.json();
                
                this.updateCounter('[data-count="2500"]', repoData.stargazers_count);
                this.updateCounter('[data-count="150"]', contributors.length);
                this.updateCounter('[data-count="10000"]', Math.floor(repoData.stargazers_count * 4.2));
            }
        } catch (error) {
            console.log('Using static fallback numbers:', error);
        }
    }
    
    updateCounter(selector, value) {
        const element = document.querySelector(selector);
        if (element && value) {
            element.dataset.count = value;
        }
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }
}

// Skill Bar Animation
class SkillBarAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillBar(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.skillBars.forEach(bar => observer.observe(bar));
    }

    animateSkillBar(element) {
        const width = element.dataset.width;
        setTimeout(() => {
            element.style.width = width + '%';
        }, Math.random() * 500);
    }
}

// Footer Component Loader
class FooterLoader {
    constructor() {
        this.loadFooter();
    }

    async loadFooter() {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (!footerPlaceholder) return;

        try {
            const response = await fetch('./components/footer.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const footerHTML = await response.text();
            footerPlaceholder.innerHTML = footerHTML;
        } catch (error) {
            console.error('Failed to load footer component:', error);
            // Fallback: create a simple footer inline
            footerPlaceholder.innerHTML = `
                <footer class="section bg-alt">
                    <div class="container text-center">
                        <div class="flex items-center justify-center mb-4">
                            <div class="logo-icon" style="margin-right: 0.75rem;">V</div>
                            <span style="font-size: 1.25rem; font-weight: bold;">VimMaster</span>
                        </div>
                        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Interactive Vim Learning Game</p>
                        <div class="flex justify-center flex-wrap gap-2 mb-6">
                            <a href="index.html" class="nav-link" style="font-size: 0.875rem; padding: 0.5rem 0.75rem;">Home</a>
                            <a href="levels.html" class="nav-link" style="font-size: 0.875rem; padding: 0.5rem 0.75rem;">Levels</a>
                            <a href="commands.html" class="nav-link" style="font-size: 0.875rem; padding: 0.5rem 0.75rem;">Commands</a>
                            <a href="api.html" class="nav-link" style="font-size: 0.875rem; padding: 0.5rem 0.75rem;">API</a>
                            <a href="https://github.com/renzorlive/vimmaster" class="nav-link" style="font-size: 0.875rem; padding: 0.5rem 0.75rem;">GitHub</a>
                        </div>
                        <div class="footer-donations">
                            <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem; color: var(--text);">❤️ Support VimMaster</h3>
                            <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.875rem;">Help keep this project alive and growing!</p>
                            <div class="donation-grid">
                                <a href="https://github.com/sponsors/renzorlive" class="donation-btn github" title="GitHub Sponsors">
                                    <img src="img/github-142-svgrepo-com.svg" width="18" height="18" alt="GitHub">
                                    <span>Sponsor</span>
                                </a>
                                <a href="https://ko-fi.com/renzor" class="donation-btn kofi" title="Ko-fi">
                                    <img src="img/kofi-svgrepo-com.svg" width="18" height="18" alt="Ko-fi">
                                    <span>Ko-fi</span>
                                </a>
                                <a href="https://buymeacoffee.com/renzorlive" class="donation-btn coffee" title="Buy Me Coffee">
                                    <img src="img/buy-me-a-coffee-svgrepo-com.svg" width="18" height="18" alt="Buy Me Coffee">
                                    <span>Coffee</span>
                                </a>
                                <a href="https://patreon.com/renzor" class="donation-btn patreon" title="Patreon">
                                    <img src="img/patreon-141-svgrepo-com.svg" width="18" height="18" alt="Patreon">
                                    <span>Patreon</span>
                                </a>
                            </div>
                        </div>
                        <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 0.875rem;">
                            <p>© 2025 VimMaster. Made with ❤️ for the developer community.</p>
                        </div>
                    </div>
                </footer>
            `;
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new MobileMenu();
    new SmoothScroll();
    new ModernAnimations();
    new EnhancedInteractions();
    new CommandPalette();
    new NewsletterModal();
    new DynamicSocialProof();
    new SkillBarAnimation();
    new FooterLoader();
    
    // Show welcome toast
    setTimeout(() => {
        new ToastManager().show('Press Ctrl+K or swipe right to open command palette! ⌨️', 'success', 5000);
    }, 2000);
});