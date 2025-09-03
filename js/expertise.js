///////////////////// NEW SCRIPT /////////////////////
document.addEventListener('DOMContentLoaded', () => {
    // ===== INTERSECTION OBSERVER SETUP =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const delay = parseInt(el.dataset.delay) || 0;

            // Handle animations with delay
            setTimeout(() => {
                el.classList.add('visible', 'animate-in');
            }, delay);

            // Special handling for feature section (staggered items)
            if (el.id === 'featuresSection') {
                const featureItems = el.querySelectorAll('.feature-item');
                featureItems.forEach(item => {
                    const itemDelay = parseInt(item.dataset.delay) || 0;
                    setTimeout(() => {
                        item.classList.add('animate-in');
                    }, itemDelay);
                });
            }

            // Stop observing once animated
            obs.unobserve(el);
        });
    }, observerOptions);

    // ===== OBSERVE CARDS =====
    document.querySelectorAll('.call-cards').forEach((card, index) => {
        if (index % 3 === 0) card.classList.add('slide-left');
        else if (index % 3 === 2) card.classList.add('slide-right');
        observer.observe(card);
    });

    // ===== OBSERVE MAIN SECTIONS =====
    const sections = [
        'titleSection',
        'introContent',
        'imageSection',
        'subheadingSection',
        'featuresSection'
    ];

    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
    });
});