// Mock data for news and podcasts 
const mockData = [
    // News Items
    {
        id: 1,
        type: 'news',
        title: 'FDA PreCheck Initiative: Streamlining Domestic Pharma Manufacturing',
        description: 'The FDA recently unveiled its FDA PreCheck program, designed to accelerate the development and approval process for new U.S.-based drug.....',
        // date: '2025-08-07',
        date: '7th Aug, 2025',
        // image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800',
        // readTime: '4 min read',
        link: './news/fda-precheck-initiative.html'
    },
    {
        id: 2,
        type: 'news',
        title: 'Sunspring in Hot Water: Foam Sunscreens Under Fire',
        description: 'The FDA issued warning letters to five brands—including Supergoop! and Vacation Inc.—for marketing sunscreen in foam, mousse, or whipped.....',
        // date: '2025-07',
        date: 'July, 2025',
        // image: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=800',
        // readTime: '6 min read'
        link: './news/sunspring-in-hot-water.html'
    },
    {
        id: 3,
        type: 'news',
        title: 'FDA Enforcement Snapshot: July 2025',
        description: 'Inspections revealed critical deficiencies like poor aseptic practices, peeling paint in cleanrooms, and mislabeling.....',
        description: 'Updated FDA regulations streamline approval process while maintaining safety standards for innovative therapeutic approaches.',
        // date: '2025-07',
        date: 'July, 2025',
        // image: 'https://images.pexels.com/photos/3984824/pexels-photo-3984824.jpeg?auto=compress&cs=tinysrgb&w=800',
        // readTime: '3 min read'
        link: './news/fda-enforcement-snapshot.html'
    },
    {
        id: 4,
        type: 'news',
        title: 'NuNaturals Recall: Mislabeling of Sweetener Products',
        description: 'NuNaturals voluntarily recalled two sweetener products (Class II) due to ingredient mislabeling (Stevia vs. Monk Fruit).',
        // description: 'Novel checkpoint inhibitor combination demonstrates unprecedented response rates in late-stage clinical trials across multiple tumor types.',
        date: '2025',
        // image: 'https://images.pexels.com/photos/3938026/pexels-photo-3938026.jpeg?auto=compress&cs=tinysrgb&w=800',
        // readTime: '5 min read'
        link: './news/nunaturals-recall.html'
    },
    {
        id: 5,
        type: 'news',
        title: 'Nature’s Fusions – FDA Warning Letter',
        description: 'Nature’s Fusions received a Warning Letter after ceasing production and failing to maintain compliance in stability testing.....',
        // description: 'Industry experts discuss how artificial intelligence is revolutionizing pharmaceutical research and development processes.',
        date: '2025',
        // image: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=800',
        // duration: '42 min'
        link: './news/natures-fusions.html'
    },
    {
        id: 6,
        type: 'news',
        title: 'Dexcom Receives FDA Warning Letter',
        description: 'Dexcom received a Warning Letter for manufacturing deficiencies at U.S. sites, leading to a stock dip but no anticipated operational impacts.',
        // description: 'Compliance experts share insights on successfully managing regulatory requirements for emerging biotechnology companies.',
        // date: '2025-03-07',
        date: '7th March, 2025',
        // image: 'https://images.pexels.com/photos/3984824/pexels-photo-3984824.jpeg?auto=compress&cs=tinysrgb&w=800',
        // duration: '38 min'
        link: './news/dexcom-receives-fda.html'
    },
    {
        id: 7,
        type: 'news',
        title: 'Empower Pharmacy Under Legal Scrutiny',
        description: 'Empower Pharmacy is facing legal and safety scrutiny over repeated FDA violations relating to compounding practices.....',
        // description: 'Leading researchers discuss innovative approaches to clinical trials that prioritize patient experience and outcomes.',
        // date: '2025-05-12',
        date: '12th May, 2025',
        // image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800',
        // duration: '45 min'
        link: './news/empower-pharmacy.html'
    },
    {
        id: 8,
        type: 'news',
        title: 'FDA Finalizes Guidance on Post-Warning Letter Meetings (PWLMs)',
        description: 'In June 2025, FDA finalized guidance to clarify the process for PWLMs under GDUFA. These meetings help generic.....',
        // description: 'Venture capital experts analyze current funding patterns and emerging opportunities in the pharmaceutical sector.',
        // date: '2025-06',
        date: 'June 2025',
        // image: 'https://images.pexels.com/photos/3938026/pexels-photo-3938026.jpeg?auto=compress&cs=tinysrgb&w=800',
        // duration: '35 min'
        link: './news/fda-finalizes-guidance.html'
    },
    // Podcast Items
    {
        id: 9,
        type: 'podcast',
        title: 'Current Safety and Toxicity Issues with FDA-Approved AAV Vectors',
        description: 'AAV-based gene therapies such as Zolgensma, Luxturna, and Elevidys are effective but carry risks of hepatotoxicity.....',
        // description: 'Venture capital experts analyze current funding patterns and emerging opportunities in the pharmaceutical sector.',
        date: '',
        // image: 'https://images.pexels.com/photos/3938026/pexels-photo-3938026.jpeg?auto=compress&cs=tinysrgb&w=800',
        // duration: '35 min'
        link: './podcasts/current-safety-toxicity-issues.html'
    },
    {
        id: 10,
        type: 'podcast',
        title: 'How Our Expert Team Helps Sponsors Develop Safer Next-Gen AAVs',
        description: 'Experts address toxicity in AAV therapies via bioinformatics-driven capsid engineering, immune evasion strategies.....',
        // description: 'Venture capital experts analyze current funding patterns and emerging opportunities in the pharmaceutical sector.',
        date: '',
        // image: 'https://images.pexels.com/photos/3938026/pexels-photo-3938026.jpeg?auto=compress&cs=tinysrgb&w=800',
        // duration: '35 min'
        link: './podcasts/how-our-expert-team-helps-sponsors.html'
    },
    {
        id: 11,
        type: 'podcast',
        title: 'Detailed Risk-Mitigation Plan for Next-Gen AAV9 (CNS Applications) and Lentiviral Vectors (CAR-T Therapy)',
        description: 'A comprehensive step-by-step mitigation plan addressing AAV9 risks (neuroinflammation, hepatotoxicity, pre-existing.....',
        // description: 'Venture capital experts analyze current funding patterns and emerging opportunities in the pharmaceutical sector.',
        date: '',
        // image: 'https://images.pexels.com/photos/3938026/pexels-photo-3938026.jpeg?auto=compress&cs=tinysrgb&w=800',
        // duration: '35 min'
        link: './podcasts/detailed-risk-mitigation-plan-for-next-gen.html'
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

    // const formattedDate = formatDate(item.date);
    const badgeText = item.type === 'news' ? 'News' : 'Podcast';
    const actionText = item.type === 'news' ? 'Read More' : 'Listen Now';
    // const metaInfo = item.type === 'news' ? item.readTime : item.duration;

    // Old Card Design
    // card.innerHTML = `
    //     <div class="card-image">
    //         <img src="${item.image}" alt="${item.title}" loading="lazy">
    //         <div class="card-badge">${badgeText}</div>
    //     </div>
    //     <div class="card-content">
    //         <div class="card-meta">
    //             <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    //                 <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    //                 <line x1="16" y1="2" x2="16" y2="6"></line>
    //                 <line x1="8" y1="2" x2="8" y2="6"></line>
    //                 <line x1="3" y1="10" x2="21" y2="10"></line>
    //             </svg>
    //             <span>${formattedDate}</span>
    //             ${metaInfo ? `
    //                 <span class="separator">•</span>
    //                 <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    //                     ${item.type === 'news' ?
    //             '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>' :
    //             '<polygon points="5,3 19,12 5,21 5,3"></polygon>'
    //         }
    //                 </svg>
    //                 <span>${metaInfo}</span>
    //             ` : ''}
    //         </div>
    //         <h3 class="card-title">${item.title}</h3>
    //         <p class="card-description">${item.description}</p>
    //         <a href="${item.link}" class="card-action" aria-label="${actionText}: ${item.title}" target="_blank">
    //             ${actionText}
    //             <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    //                 <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    //                 <polyline points="15,3 21,3 21,9"></polyline>
    //                 <line x1="10" y1="14" x2="21" y2="3"></line>
    //             </svg>
    //         </a>
    //     </div>
    // `;   

    // New Card Design
    card.innerHTML = `
        <div class="card-content">
            <!-- Title -->
            <h3 class="card-title">${item.title}</h3>

            <!-- Date only -->
            <div class="card-date">
                <span>${item.date}</span>
            </div>

            <!-- Description -->
            <p class="card-description">${item.description}</p>

            <!-- Action Button -->
            <a href="${item.link}" class="card-action" aria-label="${actionText}: ${item.title}" target="_blank">
                ${actionText}
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15,3 21,3 21,9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
            </a>
        </div>
    `;

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