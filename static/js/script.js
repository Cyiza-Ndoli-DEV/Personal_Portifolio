// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Skip if it's a download link
        if (this.hasAttribute('download')) return;
        
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL without page reload
            history.pushState(null, null, this.getAttribute('href'));
        }
    });
});

// Sticky navbar
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'white';
        navbar.style.boxShadow = 'none';
    }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('#navbar ul');

if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
        const isVisible = navList.style.display === 'flex';
        navList.style.display = isVisible ? 'none' : 'flex';
        
        // Toggle aria-expanded for accessibility
        menuToggle.setAttribute('aria-expanded', !isVisible);
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('#navbar ul a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navList.style.display = 'none';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});