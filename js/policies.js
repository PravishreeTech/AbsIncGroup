// As policies page need only (Navbar, Banner, Back-to-top) js codes so only those are used for
// policies pages to reduce load

class ABSINCGROUPWebsite {

    constructor() 
    { 
        this.init() 
    }
    
    init() 
    { 
        this.setupEventListeners(); 
        this.initializeComponents(); 
        this.handleLoading() 
    }
    
    setupEventListeners() { 
        document.addEventListener('DOMContentLoaded', () => { 
            this.initMobileNavigation(); 
            this.initSliders(); 
            this.initBackToTop(); 
        }); 
        let scrollTimeout; 
        window.addEventListener('scroll', () => { 
            if (scrollTimeout) { 
                clearTimeout(scrollTimeout) 
            } 
            scrollTimeout = setTimeout(() => { 
                this.handleScroll() 
            }, 16) 
        }, 
        { passive: true }); 
    }
    
    initializeComponents() { 
        this.initParticles() 
    }
    
    // for loading animation at the start of every page
    handleLoading() { 
        const loadingScreen = document.getElementById('loadingScreen'); 
        window.addEventListener('load', () => { 
            loadingScreen.classList.add('hidden'); 
            setTimeout(() => { 
                loadingScreen.style.display = 'none' 
            }, 300) 
        }); setTimeout(() => { 
            if (loadingScreen && !loadingScreen.classList.contains('hidden')) { 
                loadingScreen.classList.add('hidden'); 
                setTimeout(() => { 
                    loadingScreen.style.display = 'none' 
                }, 300) 
            } 
        }, 2000) 
    }

    // to get menu-icon and navbar functionality in mobile and tab-views
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

    // for banner section automatic image-changes
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

    // For bubbles effect on the banners
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
            return container 
        })(); 
        particlesContainer.appendChild(particle); 
        setTimeout(() => { 
            particle.remove() }, 6000) 
        }; 
        const bubbleSections = document.querySelectorAll('.with-bubbles'); 
        bubbleSections.forEach(section => { setInterval(() => 
            createParticle(section), 500) 
        }) 
        
    }

    // back-to-top icon
    initBackToTop() { 
        const backToTopBtn = document.getElementById('backToTop'); 
        if (backToTopBtn) { 
            backToTopBtn.addEventListener('click', () => { 
                window.scrollTo({ top: 0, behavior: 'smooth' }) 
            }) 
        } 
    }

    // the below is logic is responsible for back-to-top icon visible on screen, if it is not present the button won't display
    handleScroll() { 
        const backToTopBtn = document.getElementById('backToTop'); 
        if (backToTopBtn) { 
            if (window.scrollY > 300) { 
                backToTopBtn.classList.add('visible') 
            } else { 
                backToTopBtn.classList.remove('visible') 
            } 
        } 
    }
}

// Initialize the website
const website = new ABSINCGROUPWebsite();