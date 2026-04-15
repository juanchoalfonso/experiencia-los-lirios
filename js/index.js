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