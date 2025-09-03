//////////////////// NEW SCRIPT //////////////////////////////////
// Optimized Interactive Service Categories Tabs
document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel, .therapeutic"); // include therapeutic section

    // Set initial state (only first active)
    if (tabButtons.length > 0) {
        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabButtons[0].classList.add("active");
    }
    if (tabPanels.length > 0) {
        tabPanels.forEach(panel => panel.classList.remove("active"));
        tabPanels[0].classList.add("active");
    }
    
    // Event delegation: handle all clicks on parent container
    document.querySelector(".tab-buttons").addEventListener("click", (e) => {
        const button = e.target.closest(".tab-btn");
        if (!button) return; // ignore clicks outside buttons

        // Remove active from all
        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabPanels.forEach(panel => panel.classList.remove("active"));

        // Activate clicked button
        button.classList.add("active");

        // Show related panel
        const tabName = button.getAttribute("data-tab");
        const targetPanel = document.getElementById(tabName);
        if (targetPanel) {
            targetPanel.classList.add("active");
        }
    });
});