//////////// Interactive Service Categories Tabs Setion
function showTab(tabName) {
    // Hide all tab panels
    const tabPanels = document.querySelectorAll('.tab-panel');
    tabPanels.forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab panel
    const selectedPanel = document.getElementById(tabName);
    if (selectedPanel) {
        selectedPanel.classList.add('active');
    }
    
    // Add active class to clicked button
    const activeButton = document.querySelector(`[onclick="showTab('${tabName}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

//////////// CTA-Cards Section  ////////////
        