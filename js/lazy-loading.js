// Lazy Loading Implementation
class LazyLoader {
    constructor() {
        this.imageObserver = null;
        this.backgroundObserver = null;
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.initImageLazyLoading();
            this.initBackgroundLazyLoading();
            this.initContentLazyLoading();
        } else {
            // Fallback for older browsers
            this.loadAllImages();
        }
    }

    initImageLazyLoading() {
        const imageObserverConfig = {
            rootMargin: '50px 0px',
            threshold: 0.01
        };

        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    this.imageObserver.unobserve(img);
                }
            });
        }, imageObserverConfig);

        // Observe all images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            this.imageObserver.observe(img);
        });
    }

    initBackgroundLazyLoading() {
        const backgroundObserverConfig = {
            rootMargin: '50px 0px',
            threshold: 0.01
        };

        this.backgroundObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    this.loadBackground(element);
                    this.backgroundObserver.unobserve(element);
                }
            });
        }, backgroundObserverConfig);

        // Observe all elements with data-bg attribute
        const lazyBackgrounds = document.querySelectorAll('[data-bg]');
        lazyBackgrounds.forEach(element => {
            this.backgroundObserver.observe(element);
        });
    }

    initContentLazyLoading() {
        const contentObserverConfig = {
            rootMargin: '100px 0px',
            threshold: 0.1
        };

        const contentObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    this.loadContent(element);
                    contentObserver.unobserve(element);
                }
            });
        }, contentObserverConfig);

        // Observe elements that should load content lazily
        const lazyContent = document.querySelectorAll('[data-lazy-content]');
        lazyContent.forEach(element => {
            contentObserver.observe(element);
        });
    }

    loadImage(img) {
        // Create a skeleton loader
        this.addSkeletonLoader(img);

        // Create a new image to preload
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            // Image loaded successfully
            img.src = img.dataset.src;
            img.classList.add('loaded');
            this.removeSkeletonLoader(img);
            
            // Add fade-in effect
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease-in-out';
            
            // Force reflow
            img.offsetHeight;
            
            img.style.opacity = '1';
        };
        
        imageLoader.onerror = () => {
            // Error loading image, show placeholder
            img.src = this.createPlaceholderDataURL(img.clientWidth, img.clientHeight);
            img.classList.add('error');
            this.removeSkeletonLoader(img);
        };

        imageLoader.src = img.dataset.src;
    }

    loadBackground(element) {
        // Add skeleton loader for background
        this.addSkeletonLoader(element);

        // Create a new image to preload the background
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            element.style.backgroundImage = `url(${element.dataset.bg})`;
            element.classList.add('loaded');
            this.removeSkeletonLoader(element);
            
            // Add fade-in effect
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.5s ease-in-out';
            
            // Force reflow
            element.offsetHeight;
            
            element.style.opacity = '1';
        };
        
        imageLoader.onerror = () => {
            // Error loading background, use gradient fallback
            element.style.background = 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)';
            element.classList.add('error');
            this.removeSkeletonLoader(element);
        };

        imageLoader.src = element.dataset.bg;
    }

    loadContent(element) {
        const contentType = element.dataset.lazyContent;
        
        switch (contentType) {
            case 'testimonials':
                this.loadTestimonials(element);
                break;
            case 'team':
                this.loadTeamMembers(element);
                break;
            case 'stats':
                this.animateNumbers(element);
                break;
            default:
                element.classList.add('loaded');
        }
    }

    addSkeletonLoader(element) {
        // Don't add skeleton if already present
        if (element.querySelector('.skeleton-loader')) return;

        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton-loader';
        skeleton.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: skeleton-loading 1.5s infinite;
            z-index: 1;
        `;

        // Position the parent element relatively if not already positioned
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.position === 'static') {
            element.style.position = 'relative';
        }

        element.appendChild(skeleton);
    }

    removeSkeletonLoader(element) {
        const skeleton = element.querySelector('.skeleton-loader');
        if (skeleton) {
            skeleton.style.opacity = '0';
            skeleton.style.transition = 'opacity 0.3s ease-out';
            setTimeout(() => {
                if (skeleton.parentNode) {
                    skeleton.parentNode.removeChild(skeleton);
                }
            }, 300);
        }
    }

    createPlaceholderDataURL(width, height) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = width || 300;
        canvas.height = height || 200;
        
        // Draw placeholder
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ccc';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Image not available', canvas.width / 2, canvas.height / 2);
        
        return canvas.toDataURL();
    }

    loadTestimonials(element) {
        // Simulate loading testimonials with stagger effect
        const items = element.querySelectorAll('.testimonial-slide');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                
                // Force reflow
                item.offsetHeight;
                
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        element.classList.add('loaded');
    }

    loadTeamMembers(element) {
        // Stagger animation for team members
        const teamCards = element.querySelectorAll('.team-card');
        teamCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                
                // Force reflow
                card.offsetHeight;
                
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
        
        element.classList.add('loaded');
    }

    animateNumbers(element) {
        const numbers = element.querySelectorAll('[data-count]');
        
        numbers.forEach(numberElement => {
            const finalNumber = parseInt(numberElement.dataset.count);
            const duration = 2000; // 2 seconds
            const increment = finalNumber / (duration / 16); // 60fps
            let currentNumber = 0;
            
            const updateNumber = () => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    numberElement.textContent = finalNumber.toLocaleString();
                } else {
                    numberElement.textContent = Math.floor(currentNumber).toLocaleString();
                    requestAnimationFrame(updateNumber);
                }
            };
            
            updateNumber();
        });
        
        element.classList.add('loaded');
    }

    loadAllImages() {
        // Fallback for browsers without IntersectionObserver
        const lazyImages = document.querySelectorAll('img[data-src]');
        const lazyBackgrounds = document.querySelectorAll('[data-bg]');
        
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
        
        lazyBackgrounds.forEach(element => {
            element.style.backgroundImage = `url(${element.dataset.bg})`;
            element.classList.add('loaded');
        });
    }

    // Preload critical images
    preloadCriticalImages() {
        const criticalImages = [
            // 'https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
            // 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Progressive image enhancement
    enhanceImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('load', () => {
                // Add loaded class for styling
                img.classList.add('image-loaded');
                
                // Add subtle animation
                img.style.transform = 'scale(1.01)';
                setTimeout(() => {
                    img.style.transform = 'scale(1)';
                }, 200);
            });
        });
    }

    // Lazy load additional resources
    loadAdditionalResources() {
        // Load non-critical CSS
        const loadCSS = (href) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        };

        // Load additional fonts
        const loadFont = (fontFamily) => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            link.href = fontFamily;
            document.head.appendChild(link);
        };

        // Example usage (uncomment if needed)
        // loadCSS('path/to/non-critical.css');
        // loadFont('path/to/font.woff2');
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const lazyLoader = new LazyLoader();
    lazyLoader.preloadCriticalImages();
    lazyLoader.enhanceImages();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LazyLoader;
}