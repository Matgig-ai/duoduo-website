// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (mobileMenuToggle && mainNav) {
  mobileMenuToggle.addEventListener('click', () => {
    mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
    mainNav.classList.toggle('open');
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

    if (mainNav && mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
    }
  });
});
