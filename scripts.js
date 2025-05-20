// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (mobileMenuToggle && mainNav) {
  mobileMenuToggle.addEventListener('click', () => {
    mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
    mobileMenuToggle.classList.toggle('active');
  });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // Header height offset
        behavior: 'smooth'
      });
    }
  });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScrollY = window.scrollY;
});
