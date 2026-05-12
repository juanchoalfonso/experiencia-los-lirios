const mobileMenuBtn = document.getElementById('mobile-menu');
const navLinksContainer = document.getElementById('nav-links');

function closeMobileMenu() {
    navLinksContainer.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    }
}

// Toggle mobile menu
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinksContainer.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (
        navLinksContainer.classList.contains('active') &&
        !navLinksContainer.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
    ) {
        closeMobileMenu();
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Back to top button
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Scroll: header transparente → opaco + back to top + cerrar menú mobile
const mainHeader = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    mainHeader.classList.toggle('scrolled', window.scrollY > 50);

    if (backToTopBtn) {
        backToTopBtn.classList.toggle('visible', window.scrollY > 400);
    }

    if (navLinksContainer.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Navbar active section highlight
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navAnchors.forEach(a => a.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, { rootMargin: '-30% 0px -65% 0px', threshold: 0 });

sections.forEach(s => sectionObserver.observe(s));

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        preloader.addEventListener('transitionend', () => preloader.remove(), { once: true });
    }
});

// Scroll animations (Intersection Observer)
const animTargets = document.querySelectorAll(
    '.feature-card, .service-card, .trust-card, .review-card, ' +
    '.venue-intro, .services-intro, .gallery-intro, .location-header, .map-wrapper'
);

animTargets.forEach(el => el.classList.add('anim-fade-up'));

// Stagger delay for cards within each grid
['.venue-features-grid', '.services-grid', '.trust-container', '.reviews-grid'].forEach(grid => {
    document.querySelectorAll(`${grid} > *`).forEach((el, i) => {
        if (i > 0) el.style.transitionDelay = `${i * 0.1}s`;
    });
});

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

animTargets.forEach(el => scrollObserver.observe(el));

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryImgs = [...document.querySelectorAll('.gallery-item img')];
let currentIndex = 0;

function openLightbox(index) {
    currentIndex = (index + galleryImgs.length) % galleryImgs.length;
    lightboxImg.src = galleryImgs[currentIndex].src;
    lightboxImg.alt = galleryImgs[currentIndex].alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
    document.body.style.overflow = '';
}

function showPrev() { openLightbox(currentIndex - 1); }
function showNext() { openLightbox(currentIndex + 1); }

galleryImgs.forEach((img, i) => {
    img.addEventListener('click', () => openLightbox(i));
});

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            closeLightbox();
        }
    });
    document.querySelector('.lightbox-prev').addEventListener('click', showPrev);
    document.querySelector('.lightbox-next').addEventListener('click', showNext);

    // Swipe táctil
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? showNext() : showPrev();
        }
    }, { passive: true });
}

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  showPrev();
    if (e.key === 'ArrowRight') showNext();
});
