/**
 * Experiencia Los Lirios - Main Logic
 */

// Mobile navigation elements
const mobileMenuBtn = document.getElementById('mobile-menu');
const navLinksContainer = document.getElementById('nav-links');

// Handle mobile menu interaction
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        
        // Toggle icon between bars and close (X)
        const iconElement = mobileMenuBtn.querySelector('i');
        iconElement.classList.toggle('fa-bars');
        iconElement.classList.toggle('fa-times');
    });
}

// Close mobile menu when a navigation item is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        
        // Reset to default bars icon
        const iconElement = mobileMenuBtn.querySelector('i');
        iconElement.classList.add('fa-bars');
        iconElement.classList.remove('fa-times');
    });
});

// Smooth scrolling for navigation anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        const targetId = this.getAttribute('href');
        
        if (targetId !== "#") {
            event.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

window.addEventListener('scroll', function() {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) { // Si bajó más de 50px
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// =========================================
// Close mobile menu on scroll
// =========================================
window.addEventListener('scroll', () => {
    // Verificamos si el menú está abierto
    if (navLinksContainer.classList.contains('active')) {
        // Lo cerramos
        navLinksContainer.classList.remove('active');
        
        // Volvemos a poner el icono de la "hamburguesa"
        const iconElement = mobileMenuBtn.querySelector('i');
        if (iconElement) {
            iconElement.classList.add('fa-bars');
            iconElement.classList.remove('fa-times');
        }
    }
});

// Esperamos a que todo el contenido cargue
document.addEventListener('DOMContentLoaded', () => {
    const gardenCard = document.querySelector('.garden-special');
    const gardenVideo = gardenCard?.querySelector('.feature-video-element');

    if (gardenCard && gardenVideo) {
        // Reforzamos el mudo por JS (algunos browsers lo necesitan)
        gardenVideo.muted = true;

        gardenCard.addEventListener('mouseenter', () => {
            // Intentamos reproducir y capturamos posibles errores
            const playPromise = gardenVideo.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("El navegador bloqueó el autoplay:", error);
                });
            }
        });

        gardenCard.addEventListener('mouseleave', () => {
            gardenVideo.pause();
            // Opcional: gardenVideo.currentTime = 0; // Para que vuelva a empezar
        });
    }
});