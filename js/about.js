// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'auto';
        initializeAnimations();
    }, 3000);
});

// Initialize all animations after loading
function initializeAnimations() {
    initAOS();
    animateCounters();
    createParticles();
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Animated counter for hero stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 60;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        // Add a slight delay for dramatic effect
        setTimeout(updateCounter, 500);
    });
}

// AOS (Animate On Scroll) Implementation
function initAOS() {
    const elementsToAnimate = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay');
                
                if (delay) {
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, parseInt(delay));
                } else {
                    entry.target.classList.add('aos-animate');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show success message
        showNotification('Thank you! Your message has been sent. We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        this.reset();
        
        // Reset floating labels
        document.querySelectorAll('.form-group label').forEach(label => {
            label.style.transform = '';
            label.style.color = '';
        });
        
        // Add micro-interaction
        this.classList.add('micro-bounce');
        setTimeout(() => {
            this.classList.remove('micro-bounce');
        }, 600);
    });
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 6 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 6000);
}

// Interactive world map regions
document.querySelectorAll('.region').forEach(region => {
    region.addEventListener('mouseenter', function() {
        const regionName = this.getAttribute('data-region');
        this.style.transform = 'scale(1.3)';
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'region-tooltip';
        tooltip.textContent = regionName;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 500;
            top: -50px;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
            z-index: 100;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        `;
        this.appendChild(tooltip);
    });
    
    region.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        const tooltip = this.querySelector('.region-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// Parallax effect for floating molecules
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const molecules = document.querySelectorAll('.molecule');
    
    molecules.forEach((molecule, index) => {
        const speed = 0.3 + (index * 0.1);
        const rotation = scrolled * 0.05;
        molecule.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
    });
});

// Create floating particles
function createParticles() {
    const particleContainer = document.querySelector('.hero-background');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particleContainer.appendChild(particle);
    }
}

// Smooth reveal animations for sections
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 1s ease';
    revealObserver.observe(section);
});

// Enhanced hover effects for interactive elements
document.querySelectorAll('.btn, .feature-card, .benefit-card, .category-card, .contact-item').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.classList.add('hover-lift');
    });
    
    element.addEventListener('mouseleave', function() {
        this.classList.remove('hover-lift');
    });
});

// Dynamic typing effect for hero title
function createTypingEffect() {
    const titles = document.querySelectorAll('.title-line');
    titles.forEach((title, index) => {
        const text = title.textContent;
        title.textContent = '';
        title.style.opacity = '1';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            title.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(typeInterval);
            }
        }, 80 + (index * 30));
    });
}

// Add click handlers for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced form interactions
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// Logo animation on scroll
window.addEventListener('scroll', function() {
    const logo = document.querySelector('.logo-icon');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (logo) {
        logo.style.transform = `rotate(${rate * 0.1}deg)`;
    }
});

// Interactive DNA helix
const helixStrands = document.querySelectorAll('.helix-strand');
helixStrands.forEach((strand, index) => {
    strand.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
        this.style.transform = 'rotateY(45deg) scale(1.1)';
    });
    
    strand.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
        this.style.transform = '';
    });
});

// Enhanced card interactions
document.querySelectorAll('.feature-card, .benefit-card, .category-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add glow effect
        this.style.boxShadow = '0 25px 50px rgba(30, 64, 175, 0.2)';
        
        // Animate icon
        const icon = this.querySelector('.feature-icon, .benefit-icon, .category-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
        
        const icon = this.querySelector('.feature-icon, .benefit-icon, .category-icon');
        if (icon) {
            icon.style.transform = '';
        }
    });
});

// Intersection Observer for enhanced animations
const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add staggered animation to child elements
            const children = entry.target.querySelectorAll('.feature-card, .benefit-card, .category-card, .expertise-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, {
    threshold: 0.2
});

// Apply enhanced observer to sections
document.querySelectorAll('.features-grid, .benefits-grid, .client-categories, .expertise-list').forEach(section => {
    enhancedObserver.observe(section);
});

// Easter egg: DNA sequence activation
let dnaSequence = [];
const dnaCode = ['d', 'n', 'a'];

document.addEventListener('keydown', function(e) {
    dnaSequence.push(e.key.toLowerCase());
    if (dnaSequence.length > dnaCode.length) {
        dnaSequence.shift();
    }
    
    if (JSON.stringify(dnaSequence) === JSON.stringify(dnaCode)) {
        activateDNAMode();
    }
});

function activateDNAMode() {
    document.querySelectorAll('.molecule').forEach(molecule => {
        molecule.style.animation = 'moleculeFloat 1s ease-in-out infinite';
        molecule.style.background = 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.1) 100%)';
        molecule.style.border = '2px solid rgba(251, 191, 36, 0.5)';
    });
    
    showNotification('🧬 DNA sequence activated! Welcome to the future of biopharmaceutical consulting!', 'success');
    
    // Reset after 5 seconds
    setTimeout(() => {
        document.querySelectorAll('.molecule').forEach(molecule => {
            molecule.style.animation = '';
            molecule.style.background = '';
            molecule.style.border = '';
        });
    }, 5000);
}

// Performance optimization: Lazy loading for heavy animations
const heavyAnimationElements = document.querySelectorAll('.dna-helix, .floating-molecules');
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-heavy');
        }
    });
}, {
    threshold: 0.1
});

heavyAnimationElements.forEach(el => {
    animationObserver.observe(el);
});

// Dynamic background color change based on scroll
window.addEventListener('scroll', function() {
    const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
    const hue = Math.floor(scrollPercent * 60) + 220; // Blue to purple range
    
    document.documentElement.style.setProperty('--dynamic-hue', hue);
});

// Enhanced button interactions
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
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
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Text reveal animation for section headers
const textRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            entry.target.innerHTML = text.split('').map((char, index) => 
                `<span style="animation-delay: ${index * 50}ms">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('');
            entry.target.classList.add('text-reveal');
        }
    });
});

document.querySelectorAll('.section-header h2').forEach(header => {
    textRevealObserver.observe(header);
});

// Enhanced scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// Dynamic grid animation
function animateGrid() {
    const gridOverlay = document.querySelector('.grid-overlay');
    if (gridOverlay) {
        let opacity = 0.03;
        let direction = 1;
        
        setInterval(() => {
            opacity += direction * 0.001;
            if (opacity >= 0.05 || opacity <= 0.01) {
                direction *= -1;
            }
            gridOverlay.style.opacity = opacity;
        }, 100);
    }
}

// Initialize grid animation
animateGrid();

// Enhanced form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            input.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';
            isValid = false;
            
            setTimeout(() => {
                input.style.borderColor = '';
                input.style.boxShadow = '';
            }, 3000);
        }
    });
    
    return isValid;
}

// Add form validation to contact form
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        if (!validateForm(this)) {
            e.preventDefault();
            showNotification('Please fill in all required fields.', 'error');
        }
    });
}

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add keyboard navigation styles
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 3px solid #fbbf24 !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(keyboardStyle);

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        });
    }
}

monitorPerformance();

// Intersection observer for counting animations
const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            countObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

const heroSection = document.querySelector('.hero');
if (heroSection) {
    countObserver.observe(heroSection);
}

// Add dynamic favicon
function updateFavicon() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    // Draw DNA icon
    ctx.fillStyle = '#1e40af';
    ctx.fillRect(14, 4, 4, 24);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(10, 8, 12, 2);
    ctx.fillRect(10, 16, 12, 2);
    ctx.fillRect(10, 24, 12, 2);
    
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = canvas.toDataURL();
    document.getElementsByTagName('head')[0].appendChild(link);
}

updateFavicon();

// Add error notification style
const errorStyle = document.createElement('style');
errorStyle.textContent = `
    .notification.error {
        border-left-color: #ef4444;
    }
    .notification.error .notification-content i {
        color: #ef4444;
    }
`;
document.head.appendChild(errorStyle);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Remove loading class after animations
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 3500);
});

// Add smooth transitions for all interactive elements
const transitionStyle = document.createElement('style');
transitionStyle.textContent = `
    * {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .loading * {
        transition: none !important;
        animation-duration: 0s !important;
    }
`;
document.head.appendChild(transitionStyle);