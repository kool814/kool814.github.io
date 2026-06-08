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

    if (sectionId === 'word-cloud-section') {
        document.body.classList.remove('minimal-view');
    } else {
        document.body.classList.add('minimal-view');
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
        document.title = defaultTitle;
        history.replaceState(null, '', window.location.pathname);

        navLinks.forEach(l => {
            l.classList.remove('active');
            const defaultTxt = l.getAttribute('data-default-text');
            l.textContent = defaultTxt;
        });

        link.classList.add('active');
        link.textContent = transformedText;

        if (imagePreview) {
            imagePreview.style.display = 'none';
            imagePreview.style.opacity = '0';
        }
        if (destinationInfo) {
            destinationInfo.style.display = 'none';
        }
    });
});

function goHome() {
    showSection('word-cloud-section');
    document.title = defaultTitle;
    navLinks.forEach(l => {
        l.classList.remove('active');
        const defaultTxt = l.getAttribute('data-default-text');
        l.textContent = defaultTxt;
    });
    if (imagePreview) {
        imagePreview.style.display = 'none';
        imagePreview.style.opacity = '0';
    }
    if (destinationInfo) destinationInfo.style.display = 'none';
    if (window.innerWidth <= 768 && hamburgerMenu && navMenu) {
        hamburgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

if (homeLink) {
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        goHome();
        history.replaceState(null, '', window.location.pathname);
    });
}

// Handle hash links (blog posts) - show section and update title
const pageTitles = {
    'agency': 'On Agency — Karthik Suresh',
    'nominative-determinism': 'Nominative Determinism — Karthik Suresh'
};
const defaultTitle = 'About Karthik Suresh';

function showSectionFromHash() {
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
        showSection(hash);
        document.title = pageTitles[hash] || defaultTitle;
    }
}

document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link && link.getAttribute('href') !== '#') {
        const id = link.getAttribute('href').slice(1);
        if (document.getElementById(id)) {
            e.preventDefault();
            history.replaceState(null, '', '#' + id);
            showSectionFromHash();
        }
    }
});

window.addEventListener('hashchange', showSectionFromHash);

const imageData = {
    'Niseko': { url: 'https://images.unsplash.com/photo-1649359929082-df0ab123036c?w=1920', region: 'JP', visited: true },
    'Hakuba': { url: 'https://images.unsplash.com/photo-1740641428021-2247c440d737?w=1920', region: 'JP', visited: false },
    'Kiroro': { url: 'https://images.unsplash.com/photo-1698977557313-f201fa9114cc?w=1920', region: 'JP', visited: true },
    'Chamonix': { url: 'https://images.unsplash.com/photo-1731663020994-b3dbcaf14ac7?w=1920', region: 'FR', visited: true },
    'Val d\'Isère': { url: 'https://images.unsplash.com/photo-1706480883949-797b813aab17?w=1920', region: 'FR', visited: false },
    'Les Grands Montets': { url: 'https://images.unsplash.com/photo-1644756435038-78987714d88c?w=1920', region: 'FR', visited: true },
    'Zermatt': { url: 'https://images.unsplash.com/photo-1708598660454-4011df6397f0?w=1920', region: 'CH', visited: false },
    'St. Moritz': { url: 'https://images.unsplash.com/photo-1547980562-3c008cd4b769?w=1920', region: 'CH', visited: false },
    'Whistler': { url: 'https://images.unsplash.com/photo-1531870884530-8c9e3e3bfa80?w=1920', region: 'CA', visited: false },
    'Jackson Hole': { url: 'https://images.unsplash.com/photo-1595131264251-63b7cf3b8564?w=1920', region: 'US', visited: false },
    'Kirkwood': { url: 'https://images.unsplash.com/photo-1639094455050-c966c74d8459?w=1920', region: 'US', visited: true },
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

function optimizeUrl(url, width) {
    let optimized = url.replace(/([?&])w=\d+/, '$1w=' + width);
    if (url.includes('images.unsplash.com') && !url.includes('auto=')) {
        // Let Unsplash's imgix CDN pick the best format per the browser's
        // Accept header (AVIF where supported, else WebP) and compress. AVIF is
        // ~20-40% smaller than WebP at q=80, which loads visibly faster with no
        // perceptible quality loss on a full-bleed background.
        optimized += '&auto=format,compress&q=80';
    }
    return optimized;
}

function thumbnailUrl(url) {
    return optimizeUrl(url, 400);
}

function previewUrl(url) {
    // The preview fills the viewport with object-fit: cover, so on high-DPI
    // displays a flat 1920px source gets upscaled and looks grainy. Unsplash
    // can serve larger sizes on demand, so request enough pixels to cover the
    // viewport at the device's pixel ratio. Capped at 2560 — beyond that the
    // extra pixels aren't perceptible on a full-bleed background but cost real
    // download time, so this keeps the high-res warm-up fast.
    if (url.includes('images.unsplash.com')) {
        const dpr = window.devicePixelRatio || 1;
        const target = Math.round(Math.max(window.innerWidth, window.innerHeight) * dpr);
        return optimizeUrl(url, Math.min(Math.max(target, 1920), 2560));
    }
    return optimizeUrl(url, 1920);
}

const preloadedPreviews = new Set();

// Fetch (and cache) a word's full-size preview. Deduped so the warm-up pool
// and a hover never request the same image twice. highPriority hints the
// browser to fetch it ahead of lower-priority work.
function preloadPreview(url, highPriority) {
    if (!url || preloadedPreviews.has(url)) return Promise.resolve();
    preloadedPreviews.add(url);
    return new Promise((resolve) => {
        const img = new Image();
        if (highPriority && 'fetchPriority' in img) img.fetchPriority = 'high';
        img.onload = resolve;
        img.onerror = resolve; // resolve either way so the pool keeps draining
        img.src = previewUrl(url);
    });
}

function preloadImages() {
    Object.values(imageData).forEach((data) => {
        if (data && data.url) {
            const img = new Image();
            img.src = thumbnailUrl(data.url);
        }
    });

    window._preloadPreview = (url) => preloadPreview(url, false);
}

// Warm the full-size preview cache eagerly and in parallel as soon as the DOM
// is ready, so the first hover shows a genuine high-res image with no wait and
// no low-res placeholder. Runs a bounded pool (not all 47 at once) so the
// fetches don't starve each other or the rest of page load.
// Desktop only — on mobile previews open via tap and pre-fetching 40+ full-res
// images would waste cellular data.
function warmPreviews() {
    if (isMobile()) return;

    // Respect Data Saver and very slow (2g/slow-2g) connections — skip the bulk
    // warm so we don't force ~40+ full-res downloads the visitor may never need.
    const conn = navigator.connection;
    if (conn && (conn.saveData || /2g/.test(conn.effectiveType || ''))) return;

    const urls = Object.values(imageData)
        .map(data => data && data.url)
        .filter(Boolean);

    const MAX_PARALLEL = 6;
    let i = 0;
    const pump = () => {
        if (i >= urls.length) return;
        preloadPreview(urls[i++], true).then(pump);
    };
    for (let k = 0; k < MAX_PARALLEL; k++) pump();
}

let hideTimeout = null;
// Incremented on every hover/leave so a slow-loading image can't reveal itself
// after the pointer has already moved to another word or left the cloud.
let previewToken = 0;

function setupDesktopHover(destinationWords) {
    destinationWords.forEach(word => {
        const destination = word.getAttribute('data-destination');
        const data = imageData[destination];

        if (!data) return;

        // initHoverPreview re-runs on every (debounced) resize; bind once per
        // word so listeners don't stack across resizes.
        if (word.hasAttribute('data-desktop-hover-bound')) return;
        word.setAttribute('data-desktop-hover-bound', 'true');

        word.addEventListener('mouseenter', (e) => {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }

            if (window._preloadPreview) window._preloadPreview(data.url);

            // Invalidate any in-flight reveal from a previously hovered word.
            const token = ++previewToken;
            const fullSrc = previewUrl(data.url);

            if (destinationInfo) {
                destinationInfo.style.display = 'none';
            }

            // Reveal the full-res image only once it's decoded, so the visitor
            // never sees a low-res frame. The previews are warmed in parallel at
            // page load (warmPreviews), so this is normally already cached and
            // shows with no wait; on a rare cold hover the previous word's photo
            // stays on screen until the new one is ready rather than flashing.
            const reveal = () => {
                if (token !== previewToken) return;

                let img = imagePreview.querySelector('img');
                if (!img) {
                    imagePreview.innerHTML = '<img alt=""><div class="preview-text"></div>';
                    img = imagePreview.querySelector('img');
                }
                img.alt = destination;
                img.src = fullSrc;
                imagePreview.querySelector('.preview-text').textContent = destination;
                imagePreview.style.display = 'block';

                // Flip opacity on the next frame so the just-set content is
                // committed before the fade transition runs.
                requestAnimationFrame(() => {
                    if (token !== previewToken) return;
                    imagePreview.style.opacity = '1';
                });
            };

            const loader = new Image();
            let revealed = false;
            const onReady = () => {
                if (revealed) return;
                revealed = true;
                reveal();
            };
            loader.onload = onReady;
            loader.onerror = onReady; // fail open rather than hang on a dead URL
            loader.src = fullSrc;
            if (loader.complete) onReady(); // already cached — show immediately
        });

        word.addEventListener('mouseleave', (e) => {
            const related = e.relatedTarget;
            const movingToAnotherWord = related && typeof related.closest === 'function' &&
                related.closest('.destination-word');

            if (movingToAnotherWord) {
                return;
            }

            // Cancel any pending reveal so a late-loading image can't pop in
            // after the pointer has already left the word cloud.
            previewToken++;

            // Snap straight back to the white page instead of fading out. The
            // short timeout only bridges the gap between adjacent words (a new
            // mouseenter cancels it), so hopping word-to-word stays seamless.
            hideTimeout = setTimeout(() => {
                imagePreview.style.display = 'none';
                imagePreview.style.opacity = '0';
                hideTimeout = null;
            }, 60);
        });
    });
}

function setupMobileTap(destinationWords) {
    destinationWords.forEach(word => {
        const destination = word.getAttribute('data-destination');
        const data = imageData[destination];

        if (!data) return;

        // Bind once per word — initHoverPreview re-runs on every resize.
        if (word.hasAttribute('data-mobile-tap-bound')) return;
        word.setAttribute('data-mobile-tap-bound', 'true');

        word.addEventListener('click', (e) => {
            e.preventDefault();

            const modalImageContainer = mobileModal.querySelector('.modal-image-container');
            const modalText = mobileModal.querySelector('.modal-text');

            modalImageContainer.innerHTML = `<img src="${previewUrl(data.url)}" alt="${destination}" />`;
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
            wordText.style.backgroundImage = `url('${thumbnailUrl(data.url)}')`;
            wordText.style.backgroundSize = 'cover';
            wordText.style.backgroundPosition = 'center center';
            wordText.style.backgroundRepeat = 'no-repeat';

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
    showSectionFromHash();
    preloadImages();
    warmPreviews();
    applyTextTextures();
    initHoverPreview();
});

window.addEventListener('load', () => {
    applyTextTextures();
});
