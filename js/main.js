class ABSINCGROUPWebsite {

    constructor() {
        this.init()
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.handleLoading()
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initMobileNavigation();
            this.initSliders();
            this.initTestimonials();
            this.initBackToTop();
            this.initContactForm();
            this.initVideoPlayer()
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
        const slider = document.querySelector('.auto-slider');
        if (!slider) return;

        const bg = slider.querySelector('.hero-bg');
        const announcer = slider.querySelector('.sr-announcer');

        const images = [
            './assets/images/compressed/banner1.jpg',
            './assets/images/compressed/banner2.jpg',
            './assets/images/compressed/banner3.jpg'
        ];

        let current = 0;

        const showSlide = (index) => {
            bg.style.backgroundImage = `url(${images[index]})`;
            if (announcer) announcer.textContent = `Background ${index + 1} of ${images.length}`;
        };

        const nextSlide = () => {
            current = (current + 1) % images.length;
            showSlide(current);
        };

        showSlide(0);

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setInterval(nextSlide, 3000);
        }
    }

    // for reviews section
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

    // back-to-top icon
    initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            })
        }
    }

    // for video section to play the video
    initVideoPlayer() {
        const videoContainers = document.querySelectorAll('.video-placeholder');
        videoContainers.forEach(container => {
            const playButton = container.querySelector('.play-button');
            const thumbnail = container.querySelector('.video-thumbnail');
            const videoUrl = container.dataset.videoUrl;
            if (playButton && videoUrl) {
                playButton.addEventListener('click', () => {
                    playButton.style.display = 'none';
                    if (thumbnail) thumbnail.style.display = 'none';
                    if (!container.querySelector('iframe')) {
                        const videoIframe = document.createElement('iframe');
                        videoIframe.src = videoUrl;
                        videoIframe.frameBorder = '0';
                        videoIframe.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';
                        videoIframe.referrerPolicy = 'strict-origin-when-cross-origin';
                        Object.assign(videoIframe.style, {
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        });
                        container.appendChild(videoIframe)
                    }
                })
            }
        })
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
                particle.remove()
            }, 6000)
        };
        const bubbleSections = document.querySelectorAll('.with-bubbles');
        bubbleSections.forEach(section => {
            setInterval(() =>
                createParticle(section), 500)
        })

    }

    // For Contact Form
    initContactForm() {
        const getValue = (id) => {
            const el = document.getElementById(id);
            return (el && el.value) ? el.value.trim() : "";
        };

        const contactForm = document.getElementById("contactForm");
        if (!contactForm) return; // exit if no form exists on page

        // Load SweetAlert + EmailJS when form first interacted
        const initializeContactForm = () => {
            if (typeof window.loadSweetAlert === "function") {
                window.loadSweetAlert();
            }
            if (typeof window.loadEmailJS === "function") {
                window.loadEmailJS();
            }
        };
        contactForm.addEventListener("focus", initializeContactForm, { once: true });
        contactForm.addEventListener("click", initializeContactForm, { once: true });

        const fonts = ["cursive", "sans-serif", "serif", "monospace"];
        let captchaValue = "";

        // Generate captcha string
        const generateCaptcha = () => {
            let value = btoa(Math.random() * 1000000000);
            value = value.substr(0, 5 + Math.floor(Math.random() * 5));
            captchaValue = value;
        };

        // Show captcha with random rotation + font
        const setCaptcha = () => {
            let html = captchaValue
                .split("")
                .map((char) => {
                    const rotate = -20 + Math.floor(Math.random() * 30);
                    const font = Math.floor(Math.random() * fonts.length);
                    return `<span style="transform:rotate(${rotate}deg); font-family:${fonts[font]};">${char}</span>`;
                })
                .join("");
            document.querySelector(".contact-form .captcha .preview").innerHTML = html;
        };

        // Init captcha on load + refresh
        const initCaptcha = () => {
            document
                .querySelector(".contact-form .captcha .captcha-refresh")
                .addEventListener("click", (e) => {
                    e.preventDefault();
                    generateCaptcha();
                    setCaptcha();
                    document.querySelector(".captcha-input").value = "";
                });
            generateCaptcha();
            setCaptcha();
        };
        initCaptcha();

        // ✅ Initialize EmailJS
        emailjs.init("YnXDg-Fl9ECD1bWm3");

        // ✅ Submit handler
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const inputCaptchaValue = document.querySelector(".contact-form .captcha-input").value;

            if (inputCaptchaValue === captchaValue) {
                const params = {
                    from_firstname: getValue("firstname"),
                    from_lastname: getValue("lastname"),
                    from_email: getValue("email"),
                    from_company: getValue("company"),
                    from_contact: getValue("phone"),
                    from_subject: getValue("subject"),
                    message: getValue("message"),
                };

                emailjs
                    .send("service_xoi6ahq", "template_3i9pf1e", params)
                    .then(() => {
                        swal("Success!", "Your message has been sent.", "success");
                        contactForm.reset();
                        generateCaptcha();
                        setCaptcha();
                    })
                    .catch((error) => {
                        swal("Oops!", "Failed to send email. Try again.", "error");
                        console.error("EmailJS error:", error);
                    });
            } else {
                swal("Oops!", "Invalid Captcha. Try again.", "error");
            }
        });
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