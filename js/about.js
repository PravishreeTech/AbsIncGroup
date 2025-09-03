// about.js - Optimized animations for About page 
// The below code is provided by ChatGpt as the about page has animations so to reduce the load 
// I used this script but need to check this once and understand

document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.innerWidth <= 768;

  // Show instantly on mobile for performance
  if (isMobile) {
    document.querySelectorAll("[data-aos]").forEach((el) => {
      el.classList.add("aos-animate");
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  // IntersectionObserver for data-aos animations
  const aosObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.getAttribute("data-aos-delay")) || 0;

          setTimeout(() => {
            el.classList.add("aos-animate");
          }, delay);

          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
  );

  document.querySelectorAll("[data-aos]").forEach((el) => {
    aosObserver.observe(el);
  });

  // IntersectionObserver for stagger animations
  const staggerObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const container = entry.target;
        const delay = parseInt(container.getAttribute("data-stagger-delay")) || 100;
        Array.from(container.children).forEach((child, i) => {
          child.style.opacity = "0";
          child.style.transform = "translateY(30px)";
          child.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";

          setTimeout(() => {
            child.style.opacity = "1";
            child.style.transform = "translateY(0)";
          }, i * delay);
        });

        observer.unobserve(container);
      }
    });
  });

  document.querySelectorAll("[data-stagger]").forEach((container) => {
    staggerObserver.observe(container);
  });
});