// Advanced Animation Controller
class AnimationController {
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.initHoverAnimations();
        this.initParallaxAnimations();
        this.initMorphingAnimations();
        this.initStaggerAnimations();
        this.setupPerformanceOptimizations();
    }

    initScrollAnimations() {
        // Custom AOS-like functionality
        const observerConfig = {
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    this.animateElement(element);
                    scrollObserver.unobserve(element);
                }
            });
        }, observerConfig);

        // Observe all elements with data-aos attributes
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(element => {
            scrollObserver.observe(element);
        });

        this.observers.set('scroll', scrollObserver);
    }

    animateElement(element) {
        const animationType = element.getAttribute('data-aos');
        const delay = parseInt(element.getAttribute('data-aos-delay')) || 0;
        const duration = parseInt(element.getAttribute('data-aos-duration')) || 600;

        // Apply initial styles
        element.style.transition = `all ${duration}ms ease-out`;
        
        setTimeout(() => {
            element.classList.add('aos-animate');
            
            // Apply specific animation
            switch (animationType) {
                case 'fade-up':
                    this.fadeUp(element);
                    break;
                case 'fade-down':
                    this.fadeDown(element);
                    break;
                case 'fade-left':
                    this.fadeLeft(element);
                    break;
                case 'fade-right':
                    this.fadeRight(element);
                    break;
                case 'zoom-in':
                    this.zoomIn(element);
                    break;
                case 'slide-up':
                    this.slideUp(element);
                    break;
                default:
                    this.fadeIn(element);
            }
        }, delay);
    }

    fadeUp(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }

    fadeDown(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }

    fadeLeft(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
    }

    fadeRight(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
    }

    fadeIn(element) {
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
    }

    zoomIn(element) {
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
    }

    slideUp(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }

    initHoverAnimations() {
        // Enhanced hover effects
        const hoverElements = document.querySelectorAll('.hover-lift, .hover-scale, .hover-rotate');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.playHoverAnimation(element, 'enter');
            });
            
            element.addEventListener('mouseleave', () => {
                this.playHoverAnimation(element, 'leave');
            });
        });
    }

    playHoverAnimation(element, state) {
        const animationType = element.classList.contains('hover-lift') ? 'lift' :
                            element.classList.contains('hover-scale') ? 'scale' :
                            element.classList.contains('hover-rotate') ? 'rotate' : null;

        if (!animationType) return;

        switch (animationType) {
            case 'lift':
                if (state === 'enter') {
                    element.style.transform = 'translateY(-10px)';
                    element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                } else {
                    element.style.transform = 'translateY(0)';
                    element.style.boxShadow = '';
                }
                break;
            case 'scale':
                element.style.transform = state === 'enter' ? 'scale(1.05)' : 'scale(1)';
                break;
            case 'rotate':
                element.style.transform = state === 'enter' ? 'rotate(2deg)' : 'rotate(0deg)';
                break;
        }
    }

    initParallaxAnimations() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        const parallaxObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.enableParallax(entry.target);
                } else {
                    this.disableParallax(entry.target);
                }
            });
        });

        parallaxElements.forEach(element => {
            parallaxObserver.observe(element);
        });

        this.observers.set('parallax', parallaxObserver);
    }

    enableParallax(element) {
        const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
        
        const updateParallax = () => {
            const rect = element.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const parallax = scrolled * speed;
            
            element.style.transform = `translateY(${parallax}px)`;
            
            if (this.animations.get(element)) {
                requestAnimationFrame(updateParallax);
            }
        };

        this.animations.set(element, true);
        requestAnimationFrame(updateParallax);
    }

    disableParallax(element) {
        this.animations.set(element, false);
    }

    initMorphingAnimations() {
        const morphElements = document.querySelectorAll('[data-morph]');
        
        morphElements.forEach(element => {
            const morphType = element.getAttribute('data-morph');
            
            element.addEventListener('mouseenter', () => {
                this.startMorph(element, morphType);
            });
            
            element.addEventListener('mouseleave', () => {
                this.resetMorph(element);
            });
        });
    }

    startMorph(element, morphType) {
        switch (morphType) {
            case 'roundedSquare':
                element.style.borderRadius = '50px';
                element.style.transform = 'rotate(5deg)';
                break;
            case 'elastic':
                element.style.transform = 'scaleX(1.1) scaleY(0.9)';
                setTimeout(() => {
                    element.style.transform = 'scaleX(0.9) scaleY(1.1)';
                    setTimeout(() => {
                        element.style.transform = 'scaleX(1) scaleY(1)';
                    }, 150);
                }, 150);
                break;
        }
    }

    resetMorph(element) {
        element.style.borderRadius = '';
        element.style.transform = '';
    }

    initStaggerAnimations() {
        const staggerContainers = document.querySelectorAll('[data-stagger]');
        
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.playStaggerAnimation(entry.target);
                    staggerObserver.unobserve(entry.target);
                }
            });
        });

        staggerContainers.forEach(container => {
            staggerObserver.observe(container);
        });

        this.observers.set('stagger', staggerObserver);
    }

    playStaggerAnimation(container) {
        const delay = parseInt(container.getAttribute('data-stagger-delay')) || 100;
        const children = container.children;
        
        Array.from(children).forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(30px)';
            child.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            
            setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            }, index * delay);
        });
    }

    // Advanced animation utilities
    createTimeline() {
        return {
            animations: [],
            add(element, properties, duration = 300, delay = 0) {
                this.animations.push({ element, properties, duration, delay });
                return this;
            }
        };
    }

    // Cleanup method
    destroy() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.animations.clear();
        this.observers.clear();
    }
}

// Optimized AOS initialization with performance considerations
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize AOS if not on mobile for better performance
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
        const animationController = new AnimationController();
        
        // Make it available globally for potential use
        window.animationController = animationController;
    } else {
        // For mobile, just show all elements without animation
        const aosElements = document.querySelectorAll('[data-aos]');
        aosElements.forEach(el => {
            el.classList.add('aos-animate');
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationController;
}