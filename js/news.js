// Mock data for news and podcasts
const mockData = [
    // News Items
    {
        id: 1,
        type: 'news',
        title: 'FDA Approves Revolutionary Gene Therapy for Rare Disease',
        description: 'Breakthrough treatment shows 95% efficacy in clinical trials, offering new hope for patients with previously untreatable genetic disorders.',
        date: '2025-01-15',
        image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800',
        readTime: '4 min read'
    },
    {
        id: 2,
        type: 'news',
        title: 'Advancing Personalized Medicine Through AI Integration',
        description: 'New artificial intelligence platform enables precision drug discovery, reducing development time by 40% and improving patient outcomes.',
        date: '2025-01-12',
        image: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=800',
        readTime: '6 min read'
    },
    {
        id: 3,
        type: 'news',
        title: 'Regulatory Updates: New Guidelines for Clinical Trials',
        description: 'Updated FDA regulations streamline approval process while maintaining safety standards for innovative therapeutic approaches.',
        date: '2025-01-10',
        image: 'https://images.pexels.com/photos/3984824/pexels-photo-3984824.jpeg?auto=compress&cs=tinysrgb&w=800',
        readTime: '3 min read'
    },
    {
        id: 4,
        type: 'news',
        title: 'Breakthrough in Cancer Immunotherapy Research',
        description: 'Novel checkpoint inhibitor combination demonstrates unprecedented response rates in late-stage clinical trials across multiple tumor types.',
        date: '2025-01-08',
        image: 'https://images.pexels.com/photos/3938026/pexels-photo-3938026.jpeg?auto=compress&cs=tinysrgb&w=800',
        readTime: '5 min read'
    },
    // Podcast Items
    {
        id: 5,
        type: 'podcast',
        title: 'The Future of Drug Discovery: AI and Machine Learning',
        description: 'Industry experts discuss how artificial intelligence is revolutionizing pharmaceutical research and development processes.',
        date: '2025-01-14',
        image: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=800',
        duration: '42 min'
    },
    {
        id: 6,
        type: 'podcast',
        title: 'Navigating Regulatory Compliance in Biotech',
        description: 'Compliance experts share insights on successfully managing regulatory requirements for emerging biotechnology companies.',
        date: '2025-01-11',
        image: 'https://images.pexels.com/photos/3984824/pexels-photo-3984824.jpeg?auto=compress&cs=tinysrgb&w=800',
        duration: '38 min'
    },
    {
        id: 7,
        type: 'podcast',
        title: 'Patient-Centric Clinical Trial Design',
        description: 'Leading researchers discuss innovative approaches to clinical trials that prioritize patient experience and outcomes.',
        date: '2025-01-09',
        image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800',
        duration: '45 min'
    },
    {
        id: 8,
        type: 'podcast',
        title: 'Investment Trends in Pharmaceutical Innovation',
        description: 'Venture capital experts analyze current funding patterns and emerging opportunities in the pharmaceutical sector.',
        date: '2025-01-07',
        image: 'https://images.pexels.com/photos/3938026/pexels-photo-3938026.jpeg?auto=compress&cs=tinysrgb&w=800',
        duration: '35 min'
    }
];

// Global variables
let currentTab = 'news';
let searchQuery = '';
let filteredData = [];

// DOM elements
const tabButtons = document.querySelectorAll('.tab-btn');
const searchInput = document.getElementById('searchInput');
const contentGrid = document.getElementById('contentGrid');
const resultsText = document.getElementById('resultsText');
const noResults = document.getElementById('noResults');
const clearSearchBtn = document.getElementById('clearSearchBtn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
    setupEventListeners();
});

// Initialize the application
function initializeApp() {
    filterAndDisplayContent();
}

// Setup event listeners
function setupEventListeners() {
    // Tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', handleTabClick);
    });

    // Search input
    searchInput.addEventListener('input', handleSearch);

    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);

    // Newsletter form (basic functionality)
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const emailInput = document.querySelector('.email-input');

    subscribeBtn.addEventListener('click', function () {
        const email = emailInput.value.trim();
        if (email && isValidEmail(email)) {
            alert('Thank you for subscribing! You will receive updates at ' + email);
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Handle tab click
function handleTabClick(event) {
    const clickedTab = event.currentTarget;
    const tabType = clickedTab.getAttribute('data-tab');

    // Update active tab
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });

    clickedTab.classList.add('active');
    clickedTab.setAttribute('aria-selected', 'true');

    // Update current tab and filter content
    currentTab = tabType;
    searchInput.placeholder = `Search ${tabType}...`;
    filterAndDisplayContent();
}

// Handle search input
function handleSearch(event) {
    searchQuery = event.target.value.toLowerCase().trim();
    filterAndDisplayContent();
}

// Clear search
function clearSearch() {
    searchQuery = '';
    searchInput.value = '';
    filterAndDisplayContent();
}

// Filter and display content
function filterAndDisplayContent() {
    // Filter data based on current tab and search query
    filteredData = mockData.filter(item => {
        const matchesTab = item.type === currentTab;
        const matchesSearch = searchQuery === '' ||
            item.title.toLowerCase().includes(searchQuery) ||
            item.description.toLowerCase().includes(searchQuery);

        return matchesTab && matchesSearch;
    });

    // Update results count
    updateResultsCount();

    // Display content or no results message
    if (filteredData.length > 0) {
        displayContent();
        noResults.style.display = 'none';
        contentGrid.style.display = 'grid';
    } else {
        contentGrid.style.display = 'none';
        noResults.style.display = 'block';
    }
}

// Update results count
function updateResultsCount() {
    const contentType = currentTab === 'news' ? 'articles' : 'episodes';
    let text = `Showing ${filteredData.length} ${contentType}`;

    if (searchQuery) {
        text += ` for "${searchQuery}"`;
    }

    resultsText.textContent = text;
}

// Display content in grid
function displayContent() {
    contentGrid.innerHTML = '';

    filteredData.forEach((item, index) => {
        const card = createCard(item);
        card.style.animationDelay = `${index * 0.1}s`;
        contentGrid.appendChild(card);
    });
}

// Create a card element
function createCard(item) {
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('role', 'article');

    const formattedDate = formatDate(item.date);
    const badgeText = item.type === 'news' ? 'News' : 'Podcast';
    const actionText = item.type === 'news' ? 'Read More' : 'Listen Now';
    const metaInfo = item.type === 'news' ? item.readTime : item.duration;

    card.innerHTML = `
        <div class="card-image">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="card-badge">${badgeText}</div>
        </div>
        <div class="card-content">
            <div class="card-meta">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>${formattedDate}</span>
                ${metaInfo ? `
                    <span class="separator">•</span>
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${item.type === 'news' ?
                '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>' :
                '<polygon points="5,3 19,12 5,21 5,3"></polygon>'
            }
                    </svg>
                    <span>${metaInfo}</span>
                ` : ''}
            </div>
            <h3 class="card-title">${item.title}</h3>
            <p class="card-description">${item.description}</p>
            <a href="#" class="card-action" aria-label="${actionText}: ${item.title}">
                ${actionText}
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15,3 21,3 21,9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
            </a>
        </div>
    `;

    // Add click event for the entire card
    card.addEventListener('click', function (event) {
        // Prevent default if clicking on the action link
        if (event.target.closest('.card-action')) {
            event.preventDefault();
            handleCardAction(item);
        } else {
            handleCardAction(item);
        }
    });

    return card;
}

// Handle card action (click)
function handleCardAction(item) {
    const actionType = item.type === 'news' ? 'Reading' : 'Playing';
    alert(`${actionType}: ${item.title}\n\nThis would normally open the full ${item.type} content.`);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth scroll utility (if needed for future enhancements)
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Debounce utility for search optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced search with debouncing (optional optimization)
const debouncedSearch = debounce(function (query) {
    searchQuery = query.toLowerCase().trim();
    filterAndDisplayContent();
}, 300);

// You can replace the direct search handler with debounced version if needed:
// searchInput.addEventListener('input', (e) => debouncedSearch(e.target.value));