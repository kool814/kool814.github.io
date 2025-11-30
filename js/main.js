// Navigation and section management
const navLinks = document.querySelectorAll('.nav-link');
const homeLink = document.querySelector('.nav-logo');
const sections = document.querySelectorAll('.content-section');
const imagePreview = document.getElementById('image-preview');
const mobileModal = document.getElementById('mobile-modal');
const modalClose = document.getElementById('modal-close');

// Text transformations for navigation
const textTransformations = {
    'About': '"Meet Karthik Suresh"',
    'Investments': '"View My Investments"',
    'Thoughts': '"Read My Thoughts"',
    'Mission': '"What Is The Mission?"',
    'Quotes': '"Interesting Quotes"',
    'Work Together': '"Let\'s Work Together"'
};

// Show specific section
function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Get random destination from imageData
function getRandomDestination() {
    const destinations = Object.keys(imageData);
    const randomIndex = Math.floor(Math.random() * destinations.length);
    return destinations[randomIndex];
}


// Navigation click handlers
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        const defaultText = link.getAttribute('data-default-text');
        const transformedText = textTransformations[defaultText] || defaultText;

        showSection(sectionId);

        navLinks.forEach(l => {
            l.classList.remove('active');
            const defaultTxt = l.getAttribute('data-default-text');
            l.textContent = defaultTxt;
        });

        link.classList.add('active');
        link.textContent = transformedText;

        // Show random destination image in background
        const randomDestination = getRandomDestination();
        const randomData = imageData[randomDestination];
        if (randomData && imagePreview) {
            imagePreview.innerHTML = `
                <img src="${randomData.url}" alt="${randomDestination}" />
            `;
            imagePreview.style.display = 'block';
            imagePreview.style.opacity = '0';
            
            // Fade in the background image
            setTimeout(() => {
                imagePreview.style.opacity = '0.3';
            }, 10);
        }
    });
});

// Home link handler
if (homeLink) {
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('word-cloud-section');

        navLinks.forEach(l => {
            l.classList.remove('active');
            const defaultTxt = l.getAttribute('data-default-text');
            l.textContent = defaultTxt;
        });

        // Hide background image when returning home
        if (imagePreview) {
            imagePreview.style.display = 'none';
            imagePreview.style.opacity = '0';
        }
    });
}

// Position words - no longer needed for flowing text layout
function positionWords() {
    // Words now flow naturally in a multi-column CSS layout
    return;
}

// Image data mapping - using destination-specific images
// Same image URL used for both hover background and text texture
const imageData = {
    // Ski destinations - Japan (snow, mountains, ski slopes)
    'Niseko': { url: 'https://images.unsplash.com/photo-1649359929082-df0ab123036c?w=1920', region: 'JP', visited: true },
    'Hakuba': { url: 'https://images.unsplash.com/photo-1740641428021-2247c440d737?w=1920', region: 'JP', visited: false },
    'Kiroro': { url: 'https://images.unsplash.com/photo-1698977557313-f201fa9114cc?w=1920', region: 'JP', visited: true },
    // Ski destinations - France (Alps, snow-capped peaks)
    'Chamonix': { url: 'https://images.unsplash.com/photo-1731663020994-b3dbcaf14ac7?w=1920', region: 'FR', visited: true },
    'Val d\'Isère': { url: 'https://images.unsplash.com/photo-1706480883949-797b813aab17?w=1920', region: 'FR', visited: false },
    'Les Grands Montets': { url: 'https://mountainsrivers.com/wp-content/uploads/2014/03/dscn5314.jpg?w=1920', region: 'FR', visited: true },
    // Ski destinations - Switzerland (mountain peaks, alpine)
    'Zermatt': { url: 'https://images.unsplash.com/photo-1708598660454-4011df6397f0?w=1920', region: 'CH', visited: false },
    //   'Verbier': { url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920', region: 'CH' },
    'St. Moritz': { url: 'https://images.unsplash.com/photo-1547980562-3c008cd4b769?w=1920', region: 'CH', visited: false },
    //   'Engelberg': { url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920', region: 'CH' },
    // Ski destinations - Canada (Rocky Mountains, powder snow)
    'Whistler': { url: 'https://images.unsplash.com/photo-1531870884530-8c9e3e3bfa80?w=1920', region: 'CA', visited: false },
    //   'Revelstoke': { url: 'https://images.unsplash.com/photo-1551524164-6cf77f7e1e4f?w=1920', region: 'CA' },
    //   'Kicking Horse': { url: 'https://images.unsplash.com/photo-1551524164-6cf77f7e1e4f?w=1920', region: 'CA' },
    //   'Fernie': { url: 'https://images.unsplash.com/photo-1551524164-6cf77f7e1e4f?w=1920', region: 'CA' },
    // Ski destinations - USA (mountain ranges, ski resorts)
    'Jackson Hole': { url: 'https://images.unsplash.com/photo-1595131264251-63b7cf3b8564?w=1920', region: 'US', visited: false },
    'Kirkwood': { url: 'https://scene7.vailresorts.com/is/image/vailresorts/20230101_KW_Baggett_001:Medium-Hero?w=1920', region: 'US', visited: true },
    'Alta': { url: 'https://images.unsplash.com/photo-1561296125-58be0361f402?w=1920', region: 'US', visited: false },
    'Palisades': { url: 'https://images.unsplash.com/photo-1631212022270-bf2810e1c914?w=1920', region: 'US', visited: true },
    //   'Taos': { url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920', region: 'US', visited: false },
    'Copper Mountain': { url: 'https://images.unsplash.com/photo-1588383576412-45b821abb093?w=1920', region: 'US', visited: true },
    // Ski destinations - Italy & Austria (Dolomites, Alps)
    'Valle Nevado': { url: 'https://images.unsplash.com/photo-1589164664921-a755b54f4847?w=1920', region: 'CL', visited: false },
    'Portillo': { url: 'https://images.unsplash.com/photo-1700663852617-6ad9ff430710?w=1920', region: 'CL', visited: false },
    'Dolomiti Superski': { url: 'https://images.unsplash.com/photo-1579191399920-4e653acd6d04?w=1920', region: 'IT', visited: false },
    //   'St. Anton': { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920', region: 'AT' },
    //   'Kitzbühel': { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920', region: 'AT' },

    // Surf destinations - South Africa & Portugal (ocean waves, beaches)
    'J-Bay': { url: 'https://images.unsplash.com/photo-1591339773255-96bab1968a72?w=1920', region: 'ZA', visited: false },
    'Nazaré': { url: 'https://images.unsplash.com/photo-1582109256496-a53ee27a51ff?w=1920', region: 'PT', visited: false },
    // 'Ericeira': { url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920', region: 'PT', visited: false },
    // 'Peniche / Supertubos': { url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920', region: 'PT', visited: false },
    // Surf destinations - Indonesia (tropical beaches, waves)
    'Uluwatu': { url: 'https://images.unsplash.com/photo-1587015539329-5f95ae6c1ee8?w=1920', region: 'ID', visited: false },
    // 'Mentawai Islands': { url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920', region: 'ID', visited: false },
    // 'Nias': { url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920', region: 'ID', visited: false },
    // 'Lakey Peak': { url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920', region: 'ID', visited: false },
    // 'Sri Lanka': { url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920', region: 'LK', visited: false },
    'Tofino': { url: 'https://images.unsplash.com/photo-1639101658511-b5d16ecbbf34?w=1920', region: 'CA', visited: false },
    // Surf destinations - Fiji (tropical islands, reef breaks)
    'Cloudbreak': { url: 'https://images.unsplash.com/photo-1602749035334-54ebc4010e0c?w=1920', region: 'FJ', visited: false },
    // 'Restaurants': { url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920', region: 'FJ', visited: false },
    // Surf destinations - USA (Hawaii & California)
    'Pipeline': { url: 'https://images.unsplash.com/photo-1610236681520-b70aee1514a3?w=1920', region: 'US', visited: true },
    'Honolua Bay': { url: 'https://images.unsplash.com/photo-1556754007-93614fe5ae16?w=1920', region: 'US', visited: true },
    'Ocean Beach': { url: 'https://images.unsplash.com/photo-1603660262505-52bdac2c973c?w=1920', region: 'US', visited: true },
    'Trestles': { url: 'https://images.unsplash.com/photo-1626363372603-e69defc65621?w=1920', region: 'US', visited: false },
    'Malibu': { url: 'https://images.unsplash.com/photo-1499898595565-f424ed1d075c?w=1920', region: 'US', visited: false },
    // Surf destinations - Costa Rica & Mexico
    // 'Santa Teresa': { url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920', region: 'CR', visited: false },
    // 'Pavones': { url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920', region: 'CR', visited: false },
    'Puerto Escondido': { url: 'https://images.unsplash.com/photo-1588623570373-24d3f3e3e3fb?w=1920', region: 'MX', visited: false },
    'Sayulita': { url: 'https://images.unsplash.com/photo-1583081425553-8368b299d01a?w=1920', region: 'MX', visited: false },
    // Surf destinations - French Polynesia, France, Australia
    'Teahupo\'o': { url: 'https://images.unsplash.com/photo-1526813951498-5498cce49cdf?w=1920', region: 'PF', visited: false },
    // 'Hossegor': { url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920', region: 'FR', visited: false },
    // 'Biarritz': { url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920', region: 'FR', visited: false },
    'Snapper Rocks': { url: 'https://images.unsplash.com/photo-1686007577372-c7cadfeb64ee?w=1920', region: 'AU', visited: false },
    
    // Run / Hike destinations - South America (mountains, trails)
    'Patagonia': { url: 'https://images.unsplash.com/photo-1600211906168-fbc6df476b1c?w=1920', region: 'CL', visited: false },
    'Fitz Roy / El Chaltén': { url: 'https://images.unsplash.com/photo-1637580980556-085dee659c7e?w=1920', region: 'AR', visited: false },
    // Run / Hike destinations - Europe (Alps, Dolomites, trails)
    // 'Dolomites Alta Via 1': { url: 'https://images.unsplash.com/photo-1464822759844-d150ad2996e3?w=1920', region: 'IT', visited: false },
    // 'Cinque Terre Trail': { url: 'https://images.unsplash.com/photo-1464822759844-d150ad2996e3?w=1920', region: 'IT', visited: false },
    // 'Zermatt 5-Seenweg': { url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920', region: 'CH', visited: false },
    // 'Eiger Trail': { url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920', region: 'CH', visited: false },
    'Lofoten': { url: 'https://images.unsplash.com/photo-1505312917212-9db5bde78aff?w=1920', region: 'NO', visited: false },
    // 'Trolltunga': { url: 'https://images.unsplash.com/photo-1464822759844-d150ad2996e3?w=1920', region: 'NO', visited: false },
    // 'Preikestolen': { url: 'https://images.unsplash.com/photo-1464822759844-d150ad2996e3?w=1920', region: 'NO', visited: false },
    'Faroe Islands': { url: 'https://images.unsplash.com/photo-1517751243320-0cc45ec82da7?w=1920', region: 'FO', visited: false },
    'Iceland Laugavegur Trail': { url: 'https://images.unsplash.com/photo-1484604234936-eb54b8c10f6f?w=1920', region: 'IS', visited: false },
    // Run / Hike destinations - Japan (mountains, trails)
    // 'Kumano Kodo': { url: 'https://images.unsplash.com/photo-1464822759844-d150ad2996e3?w=1920', region: 'JP', visited: false },
    'Mount Fuji': { url: 'https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?w=1920', region: 'JP', visited: true },
    // Run / Hike destinations - USA (national parks, trails)
    // 'Grand Canyon Rim-to-Rim': { url: 'https://images.unsplash.com/photo-1464822759844-d150ad2996e3?w=1920', region: 'US', visited: false },
    'Zion Narrows': { url: 'https://images.unsplash.com/photo-1695870542685-242906f94997?w=1920', region: 'US', visited: false },
    // 'The Enchantments': { url: 'https://images.unsplash.com/photo-1464822759844-d150ad2996e3?w=1920', region: 'US', visited: false },
    'Mt. Whitney': { url: 'https://images.unsplash.com/photo-1694921944628-68af354173df?w=1920', region: 'US', visited: false },
    'Tahoe Rim': { url: 'https://images.unsplash.com/photo-1687309911603-db0280c9b959?w=1920', region: 'US', visited: true },
    // 'Timberline Trail / Mt. Hood': { url: 'https://images.unsplash.com/photo-1464822759844-d150ad2996e3?w=1920', region: 'US', visited: false },
    // 'John Muir Trail': { url: 'https://images.unsplash.com/photo-1464822759844-d150ad2996e3?w=1920', region: 'US', visited: false },
    // Run / Hike destinations - Canada
    // 'West Coast Trail': { url: 'https://images.unsplash.com/photo-1464822759844-d150ad2996e3?w=1920', region: 'CA', visited: false },
    // 'Skyline Trail, Jasper': { url: 'https://images.unsplash.com/photo-1464822759844-d150ad2996e3?w=1920', region: 'CA', visited: false },
    'Annapurna': { url: 'https://images.unsplash.com/photo-1697621535550-1c671d4969c4?w=1920', region: 'NP', visited: false },
    'Everest Base Camp': { url: 'https://images.unsplash.com/photo-1737245610502-0b599c0f6c92?w=1920', region: 'NP', visited: false },
    'Kilimanjaro': { url: 'https://images.unsplash.com/photo-1631646109206-4b5616964f84?w=1920', region: 'TZ', visited: false }
};

// Check if mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Desktop hover preview - full page background
let hideTimeout = null;

function setupDesktopHover(destinationWords) {
    destinationWords.forEach(word => {
        const destination = word.getAttribute('data-destination');
        const data = imageData[destination];

        if (!data) return;

        word.addEventListener('mouseenter', (e) => {
            // Cancel any pending hide operations
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }

            imagePreview.innerHTML = `
        <img src="${data.url}" alt="${destination}" />
        <div class="preview-text">${destination}</div>
      `;
            imagePreview.style.display = 'block';
            imagePreview.style.opacity = '0';

            // Fade in the full-page background
            setTimeout(() => {
                imagePreview.style.opacity = '1';
            }, 10);
        });

        word.addEventListener('mouseleave', () => {
            // Add a small delay before hiding to prevent flickering
            hideTimeout = setTimeout(() => {
                imagePreview.style.opacity = '0';
                setTimeout(() => {
                    imagePreview.style.display = 'none';
                }, 250);
                hideTimeout = null;
            }, 100);
        });
    });
}

// Mobile tap-to-expand
function setupMobileTap(destinationWords) {
    destinationWords.forEach(word => {
        const destination = word.getAttribute('data-destination');
        const data = imageData[destination];

        if (!data) return;

        word.addEventListener('click', (e) => {
            e.preventDefault();

            const modalImageContainer = mobileModal.querySelector('.modal-image-container');
            const modalText = mobileModal.querySelector('.modal-text');

            modalImageContainer.innerHTML = `<img src="${data.url}" alt="${destination}" />`;
            modalText.textContent = destination;

            mobileModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal handlers
    modalClose.addEventListener('click', () => {
        mobileModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    mobileModal.addEventListener('click', (e) => {
        if (e.target === mobileModal) {
            mobileModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Initialize based on screen size
function initHoverPreview() {
    const destinationWords = document.querySelectorAll('.destination-word');

    if (isMobile()) {
        setupMobileTap(destinationWords);
    } else {
        setupDesktopHover(destinationWords);
    }
}

// Reinitialize on resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        positionWords();
        initHoverPreview();
    }, 250);
});

// Apply destination-specific textures to text
function applyTextTextures() {
    const destinationWords = document.querySelectorAll('.destination-word');

    destinationWords.forEach(word => {
        const destination = word.getAttribute('data-destination');
        const data = imageData[destination];
        const wordText = word.querySelector('.word-text');

        if (data && data.url && wordText) {
            // Apply destination-specific static texture image with dark overlay for readability
            wordText.style.backgroundImage = `url('${data.url}'), linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65))`;
            wordText.style.backgroundSize = 'cover, 100% 100%';
            wordText.style.backgroundPosition = 'center center, 0% 0%';
            wordText.style.backgroundRepeat = 'no-repeat, no-repeat';

            // Add strikethrough for visited destinations
            if (data.visited === true) {
                word.classList.add('visited');
            } else {
                word.classList.remove('visited');
            }
        } else if (wordText) {
            // Fallback for destinations without texture data
            wordText.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9))';
            wordText.style.webkitTextFillColor = '#111';
            wordText.style.color = '#111';
        }
    });
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    positionWords();
    applyTextTextures();
    initHoverPreview();
});

// Also position on window load
window.addEventListener('load', () => {
    positionWords();
    applyTextTextures();
});
