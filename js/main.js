// Main JavaScript functionality
class ABSINCGROUPWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.handleLoading();
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initMobileNavigation();
            this.initSliders();
            this.initServicesTab();
            this.initTestimonials();
            this.initBackToTop();
            this.initSmoothScrolling();
            this.initHeaderScroll();
            this.initVideoPlayer();
        });

        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    initializeComponents() {
        // Initialize any other components here
        this.initParticles();
    }

    handleLoading() {
        const loadingScreen = document.getElementById('loadingScreen');

        window.addEventListener('load', () => {
            // Hide preloader immediately when page is ready
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 300); // Reduced transition time
        });
        
        // Fallback: hide preloader if it takes too long (max 2 seconds)
        setTimeout(() => {
            if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 300);
            }
        }, 2000);
    }

    initMobileNavigation() {
        const mobileToggle = document.getElementById('mobileToggle');
        const navigation = document.getElementById('navigation');

        if (mobileToggle && navigation) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                navigation.classList.toggle('active');
                document.body.style.overflow = navigation.classList.contains('active') ? 'hidden' : '';
            });

            // Close menu when clicking on nav links
            const navLinks = navigation.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileToggle.classList.remove('active');
                    navigation.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
    }

    initSliders() {
        const sliders = document.querySelectorAll('.auto-slider');

        sliders.forEach(slider => {
            const slides = slider.querySelectorAll('.hero-slide');
            if (!slides.length) return;

            let currentSlide = 0;

            const showSlide = (index) => {
                slides.forEach((slide, i) => {
                    slide.classList.toggle('active', i === index);
                });
            };

            const nextSlide = () => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            };

            // Initialize first slide
            showSlide(0);

            // Auto change every 3s
            setInterval(nextSlide, 3000);
        });
    }

    // Our Core Focus Area in Home Page to change the content based on the topic selected
    initServicesTab() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');

                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    initTestimonials() {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');

        if (!slides || slides.length === 0) return;

        let currentSlide = 0;
        let slideInterval;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            currentSlide = index;
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        const prevSlideFunc = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        };

        const startAutoSlide = () => {
            slideInterval = setInterval(nextSlide, 4000);
        };

        const stopAutoSlide = () => {
            clearInterval(slideInterval);
        };

        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoSlide();
                prevSlideFunc();
                startAutoSlide();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoSlide();
                showSlide(index);
                startAutoSlide();
            });
        });

        // Initialize
        showSlide(0);
        startAutoSlide();
    }

    initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');

        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update active nav link
                    this.updateActiveNavLink(href.substring(1));
                }
            });
        });
    }

    initHeaderScroll() {
        const header = document.getElementById('header');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (header) {
                if (currentScrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                // Hide/show header on scroll
                if (currentScrollY > lastScrollY && currentScrollY > 500) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            }

            lastScrollY = currentScrollY;
        });
    }

    initVideoPlayer() {
        const videoContainers = document.querySelectorAll('.video-placeholder');

        videoContainers.forEach(container => {
            const playButton = container.querySelector('.play-button');
            const videoSrc = container.dataset.video;

            if (playButton && videoSrc) {

                let video;

                playButton.addEventListener('click', () => {

                    if (!video) {
                        video = document.createElement('video');
                        video.src = videoSrc;
                        video.controls = true;
                        video.playsInline = true;
                        video.style.width = '100%';
                        video.style.height = '100%';
                        video.style.objectFit = 'cover';

                        // Insert video but KEEP play button
                        container.insertBefore(video, playButton);

                        // Hide the thumbnail image after first click
                        const thumbnail = container.querySelector('.video-thumbnail');
                        if (thumbnail) {
                            thumbnail.style.display = 'none';
                        }

                        // Hide button when playing
                        video.addEventListener('play', () => {
                            playButton.style.display = 'none';
                        });

                        // Show button when paused or ended
                        video.addEventListener('pause', () => {
                            playButton.style.display = 'flex';
                            playButton.style.alignItems = 'center';
                            playButton.style.justifyContent = 'center';
                        });
                        video.addEventListener('ended', () => {
                            playButton.style.display = 'flex';
                            playButton.style.alignItems = 'center';
                            playButton.style.justifyContent = 'center';
                        });
                    }

                    // Toggle play/pause
                    if (video.paused) {
                        video.play().catch(err => console.log("Autoplay blocked:", err));
                    } else {
                        video.pause();
                    }
                });
            }
        });
    }

    // For the bubble effect on the banners
    initParticles() {
        const createParticle = (section) => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';

            const particlesContainer = section.querySelector('.particles') || (() => {
                const container = document.createElement('div');
                container.className = 'particles';
                section.appendChild(container);
                return container;
            })();

            particlesContainer.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 6000);
        };

        // Attach particles to every section that has "with-bubbles" class
        const bubbleSections = document.querySelectorAll('.with-bubbles');
        bubbleSections.forEach(section => {
            setInterval(() => createParticle(section), 500);
        });

    }

    handleScroll() {
        // Back to top button visibility
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Update active section in navigation
        this.updateActiveSection();
    }

    handleResize() {
        // Handle any resize-specific logic
        const navigation = document.getElementById('navigation');
        const mobileToggle = document.getElementById('mobileToggle');

        if (window.innerWidth > 768) {
            if (navigation) navigation.classList.remove('active');
            if (mobileToggle) mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[data-section]');

        let currentSection = '';
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === currentSection) {
                link.classList.add('active');
            }
        });
    }

    updateActiveNavLink(sectionId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            }
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 20px',
            borderRadius: '8px',
            color: 'white',
            zIndex: '10000',
            maxWidth: '400px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease-in-out'
        });

        // Set background color based on type
        const colors = {
            success: '#10B981',
            error: '#EF4444',
            warning: '#F59E0B',
            info: '#0C7BC0'
        };
        notification.style.background = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        const removeNotification = () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        };

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', removeNotification);

        // Auto remove after 5 seconds
        setTimeout(removeNotification, 5000);
    }
}

// Add dynamic interactions
document.addEventListener('DOMContentLoaded', function () {
    const steps = document.querySelectorAll('.step');

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1
    });

    steps.forEach(step => {
        observer.observe(step);
    });

    // Add click interactions
    steps.forEach((step, index) => {
        step.addEventListener('click', function () {
            // Add a pulse effect
            const stepContent = step.querySelector('.step-content');
            stepContent.style.transform = 'scale(1.02)';
            setTimeout(() => {
                stepContent.style.transform = '';
            }, 200);
        });
    });

    // Add smooth scrolling between steps
    let currentStep = 0;
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' && currentStep < steps.length - 1) {
            currentStep++;
            steps[currentStep].scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === 'ArrowUp' && currentStep > 0) {
            currentStep--;
            steps[currentStep].scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Initialize the website
const website = new ABSINCGROUPWebsite();

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Create intersection observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');

            // Animate feature items with stagger effect
            if (entry.target.id === 'featuresSection') {
                const featureItems = document.querySelectorAll('.feature-item');
                featureItems.forEach((item, index) => {
                    const delay = parseInt(item.dataset.delay) || 0;
                    setTimeout(() => {
                        item.classList.add('animate-in');
                    }, delay);
                });
            }
        }
    });
}, observerOptions);

// Observe all sections
const sections = [
    'titleSection',
    'introContent',
    'imageSection',
    'subheadingSection',
    'featuresSection',
    'ctaSection'  //used for why Choose Us button in Home Page need to check why it is used
];

sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) observer.observe(section);
});

// ===== PARALLAX SCROLLING EFFECT =====
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    const imageContainers = document.querySelectorAll('.images');

    imageContainers.forEach((container, index) => {
        const speed = (index + 1) * 0.05;
        const yPos = rate * speed;

        // Only apply parallax on desktop
        if (window.innerWidth > 768) {
            const currentTransform = container.style.transform || '';
            const baseTransform = getBaseTransform(index);
            container.style.transform = `${baseTransform} translateY(${yPos}px)`;
        }
    });

    ticking = false;
}

function getBaseTransform(index) {
    const transforms = [
        'translateY(0)',
        'translateY(20px)',
        'translateY(-20px)',
        'translateY(0)'
    ];
    return transforms[index] || 'translateY(0)';
}

function requestParallaxTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

// ===== SMOOTH SCROLL FOR CTA BUTTON =====
document.querySelector('.cta-button').addEventListener('click', function (e) {
    // e.preventDefault();

    // Add a gentle shake animation to button
    this.style.transform = 'translateY(-3px) scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'translateY(-3px) scale(1)';
    }, 150);

    // Smooth scroll to bottom (or wherever you want to link)
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
});

// ===== ENHANCED IMAGE HOVER EFFECTS =====
const imageContainers = document.querySelectorAll('.images');

imageContainers.forEach((container, index) => {
    container.addEventListener('mouseenter', function () {
        // Add subtle rotation and glow effect
        this.style.filter = 'brightness(1.1)';

        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1000;
        `;

        this.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    });

    container.addEventListener('mouseleave', function () {
        this.style.filter = 'brightness(1)';
    });
});

// ===== CSS ANIMATION FOR RIPPLE EFFECT =====
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== PERFORMANCE OPTIMIZED SCROLL LISTENER =====
let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        isScrolling = true;
        requestParallaxTick();

        setTimeout(() => {
            isScrolling = false;
        }, 16); // ~60fps
    }
}, { passive: true });

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    // Add entrance animations after page load
    setTimeout(() => {
        const hero = document.getElementById('hero');
        hero.style.opacity = '1';
    }, 100);
});

// ===== RESIZE HANDLER FOR RESPONSIVE PARALLAX =====
window.addEventListener('resize', () => {
    // Reset transforms on mobile to avoid issues
    if (window.innerWidth <= 768) {
        imageContainers.forEach((container, index) => {
            const baseTransform = getBaseTransform(index);
            container.style.transform = baseTransform;
        });
    }
});

// ===== INITIAL SETUP =====
document.addEventListener('DOMContentLoaded', () => {
    // Set initial opacity for hero section
    const hero = document.getElementById('hero');
    hero.style.transition = 'opacity 0.5s ease-in-out';
    hero.style.opacity = '0';

    // Initialize parallax positions
    imageContainers.forEach((container, index) => {
        const baseTransform = getBaseTransform(index);
        container.style.transform = baseTransform;
    });
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ABSINCGROUPWebsite;
}

