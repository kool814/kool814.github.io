const navLinks = document.querySelectorAll('.nav-link');
const homeLink = document.querySelector('.nav-logo');
const sections = document.querySelectorAll('.content-section');
const imagePreview = document.getElementById('image-preview');
const mobileModal = document.getElementById('mobile-modal');
const modalClose = document.getElementById('modal-close');
const destinationInfo = document.getElementById('destination-info');
const hamburgerMenu = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-menu');

const textTransformations = {
    'About': '"Meet Karthik Suresh"',
    'Investments': '"View My Investments"',
    'Thoughts': '"Read My Thoughts"',
    'Mission': '"What Is The Mission?"',
    'Quotes': '"Interesting Quotes"',
    'Work Together': '"Let\'s Work Together"'
};

function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function getRandomDestination() {
    const destinations = Object.keys(imageData);
    const randomIndex = Math.floor(Math.random() * destinations.length);
    return destinations[randomIndex];
}

if (hamburgerMenu && navMenu) {
    hamburgerMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 &&
            navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !hamburgerMenu.contains(e.target)) {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        const defaultText = link.getAttribute('data-default-text');
        const isMobileDevice = window.innerWidth <= 768;
        const transformedText = isMobileDevice ? defaultText : (textTransformations[defaultText] || defaultText);

        showSection(sectionId);

        navLinks.forEach(l => {
            l.classList.remove('active');
            const defaultTxt = l.getAttribute('data-default-text');
            l.textContent = defaultTxt;
        });

        link.classList.add('active');
        link.textContent = transformedText;

        const randomDestination = getRandomDestination();
        const randomData = imageData[randomDestination];
        if (randomData && imagePreview) {
            imagePreview.innerHTML = `
                <img src="${randomData.url}" alt="${randomDestination}" />
            `;
            imagePreview.style.display = 'block';
            imagePreview.style.opacity = '0';

            setTimeout(() => {
                imagePreview.style.opacity = '0.2';
            }, 10);

            if (destinationInfo) {
                const visitedText = randomData.visited ? ' (Visited)' : '';
                const regionText = randomData.region ? `, ${randomData.region}` : '';
                destinationInfo.textContent = `${randomDestination}${regionText}${visitedText}`;
                destinationInfo.style.display = 'block';
            }
        }
    });
});

if (homeLink) {
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('word-cloud-section');

        navLinks.forEach(l => {
            l.classList.remove('active');
            const defaultTxt = l.getAttribute('data-default-text');
            l.textContent = defaultTxt;
        });

        if (imagePreview) {
            imagePreview.style.display = 'none';
            imagePreview.style.opacity = '0';
        }

        if (destinationInfo) {
            destinationInfo.style.display = 'none';
        }

        if (window.innerWidth <= 768 && hamburgerMenu && navMenu) {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

const imageData = {
    'Niseko': { url: 'https://images.unsplash.com/photo-1649359929082-df0ab123036c?w=1920', region: 'JP', visited: true },
    'Hakuba': { url: 'https://images.unsplash.com/photo-1740641428021-2247c440d737?w=1920', region: 'JP', visited: false },
    'Kiroro': { url: 'https://images.unsplash.com/photo-1698977557313-f201fa9114cc?w=1920', region: 'JP', visited: true },
    'Chamonix': { url: 'https://images.unsplash.com/photo-1731663020994-b3dbcaf14ac7?w=1920', region: 'FR', visited: true },
    'Val d\'Isère': { url: 'https://images.unsplash.com/photo-1706480883949-797b813aab17?w=1920', region: 'FR', visited: false },
    'Les Grands Montets': { url: 'https://mountainsrivers.com/wp-content/uploads/2014/03/dscn5314.jpg?w=1920', region: 'FR', visited: true },
    'Zermatt': { url: 'https://images.unsplash.com/photo-1708598660454-4011df6397f0?w=1920', region: 'CH', visited: false },
    'St. Moritz': { url: 'https://images.unsplash.com/photo-1547980562-3c008cd4b769?w=1920', region: 'CH', visited: false },
    'Whistler': { url: 'https://images.unsplash.com/photo-1531870884530-8c9e3e3bfa80?w=1920', region: 'CA', visited: false },
    'Jackson Hole': { url: 'https://images.unsplash.com/photo-1595131264251-63b7cf3b8564?w=1920', region: 'US', visited: false },
    'Kirkwood': { url: 'https://scene7.vailresorts.com/is/image/vailresorts/20230101_KW_Baggett_001:Medium-Hero?w=1920', region: 'US', visited: true },
    'Alta': { url: 'https://images.unsplash.com/photo-1561296125-58be0361f402?w=1920', region: 'US', visited: false },
    'Palisades': { url: 'https://images.unsplash.com/photo-1631212022270-bf2810e1c914?w=1920', region: 'US', visited: true },
    'Copper Mountain': { url: 'https://images.unsplash.com/photo-1455643117162-50a162d8d58d?w=1920', region: 'US', visited: true },
    'Valle Nevado': { url: 'https://images.unsplash.com/photo-1589496145106-2af25f7c8c1d?w=1920', region: 'CL', visited: false },
    'Portillo': { url: 'https://images.unsplash.com/photo-1700663852617-6ad9ff430710?w=1920', region: 'CL', visited: false },
    'Dolomiti Superski': { url: 'https://images.unsplash.com/photo-1579191399920-4e653acd6d04?w=1920', region: 'IT', visited: false },
    'J-Bay': { url: 'https://images.unsplash.com/photo-1591339773255-96bab1968a72?w=1920', region: 'ZA', visited: false },
    'Nazaré': { url: 'https://images.unsplash.com/photo-1582109256496-a53ee27a51ff?w=1920', region: 'PT', visited: false },
    'Uluwatu': { url: 'https://images.unsplash.com/photo-1587015539329-5f95ae6c1ee8?w=1920', region: 'ID', visited: false },
    'Tofino': { url: 'https://images.unsplash.com/photo-1639101658511-b5d16ecbbf34?w=1920', region: 'CA', visited: false },
    'Cloudbreak': { url: 'https://images.unsplash.com/photo-1602749035334-54ebc4010e0c?w=1920', region: 'FJ', visited: false },
    'Pipeline': { url: 'https://images.unsplash.com/photo-1610236681520-b70aee1514a3?w=1920', region: 'US', visited: true },
    'Honolua Bay': { url: 'https://images.unsplash.com/photo-1556754007-93614fe5ae16?w=1920', region: 'US', visited: true },
    'Ocean Beach': { url: 'https://images.unsplash.com/photo-1603660262505-52bdac2c973c?w=1920', region: 'US', visited: true },
    'Trestles': { url: 'https://images.unsplash.com/photo-1626363372603-e69defc65621?w=1920', region: 'US', visited: false },
    'Rockaway Beach': { url: 'https://images.unsplash.com/photo-1686566575197-5d45e6763c87?w=1920', region: 'US', visited: true },
    'Malibu': { url: 'https://images.unsplash.com/photo-1499898595565-f424ed1d075c?w=1920', region: 'US', visited: false },
    'Puerto Escondido': { url: 'https://images.unsplash.com/photo-1588623570373-24d3f3e3e3fb?w=1920', region: 'MX', visited: false },
    'Sayulita': { url: 'https://images.unsplash.com/photo-1583081425553-8368b299d01a?w=1920', region: 'MX', visited: false },
    'Teahupo\'o': { url: 'https://images.unsplash.com/photo-1741454720414-7e23dab9961a?w=1920', region: 'PF', visited: false },
    'Snapper Rocks': { url: 'https://images.unsplash.com/photo-1686007577372-c7cadfeb64ee?w=1920', region: 'AU', visited: false },
    'Pleasure Point': { url: 'https://images.unsplash.com/photo-1658989988950-40a0ca43e858?w=1920', region: 'US', visited: true },
    'Patagonia': { url: 'https://images.unsplash.com/photo-1600211906168-fbc6df476b1c?w=1920', region: 'CL', visited: false },
    'Fitz Roy / El Chaltén': { url: 'https://images.unsplash.com/photo-1637580980556-085dee659c7e?w=1920', region: 'AR', visited: false },
    'Lofoten': { url: 'https://images.unsplash.com/photo-1505312917212-9db5bde78aff?w=1920', region: 'NO', visited: false },
    'Faroe Islands': { url: 'https://images.unsplash.com/photo-1517751243320-0cc45ec82da7?w=1920', region: 'FO', visited: false },
    'Aiguille du Midi': { url: 'https://images.unsplash.com/photo-1576933231610-f3068fa67591?w=1920', region: 'FR', visited: true },
    'Laugavegur Trail': { url: 'https://images.unsplash.com/photo-1484604234936-eb54b8c10f6f?w=1920', region: 'IS', visited: false },
    'Mount Fuji': { url: 'https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?w=1920', region: 'JP', visited: true },
    'Zion Narrows': { url: 'https://images.unsplash.com/photo-1695870542685-242906f94997?w=1920', region: 'US', visited: false },
    'Mt. Whitney': { url: 'https://images.unsplash.com/photo-1694921944628-68af354173df?w=1920', region: 'US', visited: false },
    'Tahoe Rim': { url: 'https://images.unsplash.com/photo-1687309911603-db0280c9b959?w=1920', region: 'US', visited: true },
    'Annapurna': { url: 'https://images.unsplash.com/photo-1697621535550-1c671d4969c4?w=1920', region: 'NP', visited: false },
    'Everest Base Camp': { url: 'https://images.unsplash.com/photo-1737245610502-0b599c0f6c92?w=1920', region: 'NP', visited: false },
    'Kilimanjaro': { url: 'https://images.unsplash.com/photo-1631646109206-4b5616964f84?w=1920', region: 'TZ', visited: false },
    'Mt. Tam': { url: 'https://images.unsplash.com/photo-1487028463993-b7f901a8c2eb?w=1920', region: 'US', visited: true }
};

function isMobile() {
    return window.innerWidth <= 768;
}

let hideTimeout = null;

function setupDesktopHover(destinationWords) {
    destinationWords.forEach(word => {
        const destination = word.getAttribute('data-destination');
        const data = imageData[destination];

        if (!data) return;

        word.addEventListener('mouseenter', (e) => {
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

            if (destinationInfo) {
                destinationInfo.style.display = 'none';
            }

            setTimeout(() => {
                imagePreview.style.opacity = '1';
            }, 10);
        });

        word.addEventListener('mouseleave', () => {
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

    if (modalClose && !modalClose.hasAttribute('data-listener-attached')) {
        modalClose.setAttribute('data-listener-attached', 'true');
        modalClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            mobileModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (!mobileModal.hasAttribute('data-listener-attached')) {
        mobileModal.setAttribute('data-listener-attached', 'true');
        mobileModal.addEventListener('click', (e) => {
            if (e.target === mobileModal) {
                mobileModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

function initHoverPreview() {
    const destinationWords = document.querySelectorAll('.destination-word');

    if (isMobile()) {
        setupMobileTap(destinationWords);
    } else {
        setupDesktopHover(destinationWords);
    }
}

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        initHoverPreview();
    }, 250);
});

function applyTextTextures() {
    const destinationWords = document.querySelectorAll('.destination-word');

    destinationWords.forEach(word => {
        const destination = word.getAttribute('data-destination');
        const data = imageData[destination];
        const wordText = word.querySelector('.word-text');

        if (data && data.url && wordText) {
            wordText.style.backgroundImage = `url('${data.url}'), linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65))`;
            wordText.style.backgroundSize = 'cover, 100% 100%';
            wordText.style.backgroundPosition = 'center center, 0% 0%';
            wordText.style.backgroundRepeat = 'no-repeat, no-repeat';

            if (data.visited === true) {
                word.classList.add('visited');
            } else {
                word.classList.remove('visited');
            }
        } else if (wordText) {
            wordText.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9))';
            wordText.style.webkitTextFillColor = '#111';
            wordText.style.color = '#111';
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    applyTextTextures();
    initHoverPreview();
});

window.addEventListener('load', () => {
    applyTextTextures();
});
