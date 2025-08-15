document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = parseInt(element.dataset.delay) || 0;
                setTimeout(() => {
                    element.classList.add('visible');
                }, delay);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Observe header
    const header = document.querySelector('.call-header');
    if (header) observer.observe(header);

    // Observe cards
    document.querySelectorAll('.call-cards').forEach((card, index) => {
        if (index % 3 === 0) card.classList.add('slide-left');
        else if (index % 3 === 2) card.classList.add('slide-right');
        observer.observe(card);
    });
});
