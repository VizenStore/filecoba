// Main JavaScript functionality
class MainApp {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.initAnimations();
        this.setupPerformance();
    }

    bindEvents() {
        console.log('🔧 Binding events...');
        
        // Handle images loading
        this.handleImageLoading();
    }

    initAnimations() {
        console.log('🎬 Initializing animations...');
        
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Unobserve after animation to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.feature-card, .material-section'
        );
        
        animatedElements.forEach(element => {
            if (!element.classList.contains('animate-in')) {
                observer.observe(element);
            }
        });
    }

    setupPerformance() {
        console.log('⚡ Setting up performance optimizations...');
        
        // Preload critical pages only on good connections
        if ('connection' in navigator) {
            if (navigator.connection.saveData) {
                console.log('Save-Data mode enabled, skipping preloads');
                return;
            }
        }
    }

    handleImageLoading() {
        console.log('🖼️ Setting up image loading...');
        
        // Add loading state to images
        document.querySelectorAll('img').forEach(img => {
            if (!img.complete) {
                img.classList.add('loading');
            }
            
            img.addEventListener('load', () => {
                img.classList.remove('loading');
                img.classList.add('loaded');
            });
            
            img.addEventListener('error', () => {
                img.classList.remove('loading');
                img.classList.add('error');
                console.warn('Failed to load image:', img.src);
            });
        });
    }
}

// Enhanced CSS untuk additional animations
const enhancedStyles = `
    .feature-card {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .material-section {
        transition: all 0.4s ease;
    }
    
    /* Image loading states */
    img.loading {
        opacity: 0.5;
        background: var(--bg-tertiary);
    }
    
    img.loaded {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    
    img.error {
        opacity: 0.3;
        background: var(--bg-tertiary);
    }
`;

// Inject enhanced styles
const enhancedStyleSheet = document.createElement('style');
enhancedStyleSheet.textContent = enhancedStyles;
document.head.appendChild(enhancedStyleSheet);

// Initialize main app
document.addEventListener('DOMContentLoaded', () => {
    // Add loading state
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        window.mainApp = new MainApp();
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle page before unload for smooth transitions
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0.7';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Handle page load errors
window.addEventListener('load', () => {
    // Remove loading state if still present
    document.body.style.opacity = '1';
});