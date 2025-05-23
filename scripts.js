// Mobile menu toggle - Version améliorée
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');
const body = document.body;

if (mobileMenuToggle && mainNav) {
  mobileMenuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    mobileMenuToggle.classList.toggle('active');

    // Bloquer le défilement du corps quand le menu est ouvert
    if (mainNav.classList.contains('open')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  });
}

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll('.main-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      mobileMenuToggle.classList.remove('active');
      body.style.overflow = '';
    }
  });
});

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80, // Offset pour tenir compte du header
        behavior: 'smooth'
      });
    }
  });
});

// Animation de l'entrée des sections lors du défilement
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

// Observer les sections principales
document.querySelectorAll('section').forEach(section => {
  section.classList.add('fade-in');
  observer.observe(section);
});

// Ajouter classe active au lien du menu correspondant à la section visible
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;

  document.querySelectorAll('section[id]').forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// effet parallaxe pour l'image de la section hero
// Parallaxe optimal - version finale
function initCenteredParallax() {
  const heroImage = document.querySelector('.hero-image');
  const heroSection = document.querySelector('.hero-image-section');

  if (!heroImage || !heroSection) return;

  // IMPORTANT : S'assurer que l'image part de la position normale
  heroImage.style.transform = 'translateY(0px)';

  let ticking = false;

  function updateParallax() {
    const rect = heroSection.getBoundingClientRect();
    const scrolled = window.pageYOffset;

    // Seulement si la section est visible à l'écran
    if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
      // Parallaxe très subtil basé sur la position de la section
      const yPos = (scrolled - heroSection.offsetTop) * 0.1;
      const limitedYPos = Math.max(-10, Math.min(10, yPos));

      heroImage.style.transform = `translateY(${limitedYPos}px)`;
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
}

// Lancer seulement sur desktop
document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth > 768) {
    initCenteredParallax();
  }
});