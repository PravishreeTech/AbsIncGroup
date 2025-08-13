// Main JavaScript functionality
class ABSincGroupWebsite {
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
            this.initHeroSlider();
            this.initServicesTab();
            this.initTestimonials();
            this.initContactForm();
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
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1500);
        });
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

    initHeroSlider() {
        const slider = document.getElementById('heroSlider');
        const slides = slider?.querySelectorAll('.hero-slide');
        const indicators = document.querySelectorAll('.hero-indicators .indicator');
        const prevBtn = document.querySelector('.hero-prev');
        const nextBtn = document.querySelector('.hero-next');

        if (!slides || slides.length === 0) return;

        let currentSlide = 0;
        let slideInterval;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
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
            slideInterval = setInterval(nextSlide, 5000);
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

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopAutoSlide();
                showSlide(index);
                startAutoSlide();
            });
        });

        // Initialize
        showSlide(0);
        startAutoSlide();

        // Pause on hover
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }

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

    initContactForm() {
        const form = document.getElementById('contactForm');
        const submitBtn = form?.querySelector('.submit-btn');

        if (form && submitBtn) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Add loading state
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;

                // Simulate form submission
                try {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    // Show success message
                    this.showNotification('Message sent successfully!', 'success');
                    form.reset();
                } catch (error) {
                    this.showNotification('Failed to send message. Please try again.', 'error');
                } finally {
                    // Remove loading state
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }
            });
        }
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
                playButton.addEventListener('click', () => {
                    const video = document.createElement('video');
                    video.src = videoSrc;
                    video.controls = true;
                    video.autoplay = true;
                    video.style.width = '100%';
                    video.style.height = '100%';
                    video.style.objectFit = 'cover';

                    container.innerHTML = '';
                    container.appendChild(video);
                });
            }
        });
    }

    initParticles() {
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                const particlesContainer = heroSection.querySelector('.particles') || (() => {
                    const container = document.createElement('div');
                    container.className = 'particles';
                    heroSection.appendChild(container);
                    return container;
                })();
                
                particlesContainer.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 6000);
            }
        };

        // Create particles periodically
        setInterval(createParticle, 500);
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
        document.addEventListener('DOMContentLoaded', function() {
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
                step.addEventListener('click', function() {
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
            document.addEventListener('keydown', function(e) {
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
const website = new ABSincGroupWebsite();

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ABSincGroupWebsite;
}