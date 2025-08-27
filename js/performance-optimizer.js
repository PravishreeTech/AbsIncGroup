/**
 * Performance Optimizer for ABSINCGROUP Website
 * This file contains comprehensive performance optimizations
 */

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeResourceLoading();
        this.optimizeImages();
        this.optimizeVideos();
        this.optimizeFonts();
        this.optimizeCSS();
        this.optimizeJavaScript();
        this.setupPerformanceMonitoring();
    }

    optimizeResourceLoading() {
        // Preload critical resources
        this.preloadCriticalResources();

        // Defer non-critical resources
        this.deferNonCriticalResources();

        // Optimize third-party scripts
        this.optimizeThirdPartyScripts();
    }

    preloadCriticalResources() {
        const criticalResources = [
            { href: './assets/logo.png', as: 'image', type: 'image/png' },
            { href: './assets/images/compressed/banner1-min.jpg', as: 'image', type: 'image/jpeg' },
            { href: './css/style.css', as: 'style' },
            { href: './js/main.js', as: 'script' }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            if (resource.as) link.as = resource.as;
            if (resource.type) link.type = resource.type;
            document.head.appendChild(link);
        });
    }

    deferNonCriticalResources() {
        // Defer Font Awesome loading
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'preload';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
        fontAwesomeLink.as = 'style';
        fontAwesomeLink.onload = () => {
            fontAwesomeLink.rel = 'stylesheet';
        };
        document.head.appendChild(fontAwesomeLink);

        // Defer Google Fonts loading
        const googleFontsLink = document.createElement('link');
        googleFontsLink.rel = 'preload';
        googleFontsLink.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&display=swap';
        googleFontsLink.as = 'style';
        googleFontsLink.onload = () => {
            googleFontsLink.rel = 'stylesheet';
        };
        document.head.appendChild(googleFontsLink);
    }

    optimizeThirdPartyScripts() {
        // Add loading attributes to external scripts
        const externalScripts = document.querySelectorAll('script[src*="unpkg.com"], script[src*="cdn.jsdelivr.net"]');
        externalScripts.forEach(script => {
            script.setAttribute('loading', 'lazy');
        });
    }

    optimizeImages() {
        // Add loading="lazy" to images below the fold
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach((img, index) => {
            if (index > 2) { // Skip first 3 images (above the fold)
                img.loading = 'lazy';
            }
        });

        // Optimize background images
        const backgroundElements = document.querySelectorAll('[style*="background-image"]');
        backgroundElements.forEach(element => {
            const style = element.getAttribute('style');
            if (style && style.includes('background-image')) {
                // Add will-change for better performance
                element.style.willChange = 'transform';
            }
        });
    }

    optimizeVideos() {
        // Prevent large video files from loading immediately
        const videoPlaceholders = document.querySelectorAll('.lazy-video');
        videoPlaceholders.forEach(placeholder => {
            const videoSrc = placeholder.dataset.video;
            if (videoSrc) {
                // Create a lightweight video element with preload="none"
                const video = document.createElement('video');
                video.preload = 'none';
                video.poster = placeholder.dataset.poster || '';
                video.style.display = 'none';
                placeholder.appendChild(video);
            }
        });
    }

    optimizeFonts() {
        // Optimize font loading
        if ('fonts' in document) {
            // Use Font Loading API for better performance
            const font = new FontFace('Noto Sans', 'url(https://fonts.gstatic.com/s/notosans/v28/o-0IIpQlx3QUlC5A4PNr5TRA.woff2)');
            font.load().then(() => {
                document.fonts.add(font);
            });
        }
    }

    optimizeCSS() {
        // Remove unused CSS rules
        this.removeUnusedCSS();

        // Optimize animations
        this.optimizeAnimations();
    }

    removeUnusedCSS() {
        // This would typically be done during build process
        // For now, we'll just ensure critical CSS is inline
        console.log('CSS optimization: Consider using PurgeCSS or similar tools during build');
    }

    optimizeAnimations() {
        // Use transform and opacity for better performance
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });
    }

    optimizeJavaScript() {
        // Debounce scroll events
        this.debounceScrollEvents();

        // Optimize event listeners
        this.optimizeEventListeners();

        // Use requestIdleCallback for non-critical tasks
        this.useRequestIdleCallback();
    }

    debounceScrollEvents() {
        let scrollTimeout;
        const scrollHandler = () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                // Handle scroll events here
                this.handleScrollOptimized();
            }, 16); // ~60fps
        };

        window.addEventListener('scroll', scrollHandler, { passive: true });
    }

    handleScrollOptimized() {
        // Optimized scroll handling
        const scrolled = window.pageYOffset;
        const parallax = document.querySelectorAll('.parallax');

        parallax.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    optimizeEventListeners() {
        // Use event delegation where possible
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-link')) {
                this.handleNavigationClick(e);
            }
        });
    }

    handleNavigationClick(e) {
        // Handle navigation clicks efficiently
        const target = e.target.getAttribute('href');
        if (target && target.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    useRequestIdleCallback() {
        // Use requestIdleCallback for non-critical tasks
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                this.loadNonCriticalResources();
            });
        } else {
            // Fallback for older browsers
            setTimeout(() => {
                this.loadNonCriticalResources();
            }, 1000);
        }
    }

    loadNonCriticalResources() {
        // Load non-critical resources when browser is idle
        console.log('Loading non-critical resources...');
    }

    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            try {
                // Monitor Largest Contentful Paint (LCP)
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('LCP:', lastEntry.startTime);
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

                // Monitor First Input Delay (FID)
                const fidObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        console.log('FID:', entry.processingStart - entry.startTime);
                    });
                });
                fidObserver.observe({ entryTypes: ['first-input'] });

                // Monitor Cumulative Layout Shift (CLS)
                const clsObserver = new PerformanceObserver((list) => {
                    let clsValue = 0;
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    });
                    console.log('CLS:', clsValue);
                });
                clsObserver.observe({ entryTypes: ['layout-shift'] });
            } catch (e) {
                console.log('Performance monitoring setup failed:', e);
            }
        }
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize performance optimizer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PerformanceOptimizer();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceOptimizer;
}
