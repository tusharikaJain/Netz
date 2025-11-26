// main.js — small interactions and scroll reveal
document.addEventListener('DOMContentLoaded', function () {
  // Mobile toggle
  const mobileBtn = document.getElementById('mobileBtn') || document.getElementById('mobileBtn2') || document.getElementById('mobileBtn3') || document.getElementById('mobileBtn4') || document.getElementById('mobileBtn5') || document.getElementById('mobileBtn6');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"], a[href$=".html"]').forEach(a => {
    a.addEventListener('click', (e) => {
      // default behaviour for page links retained (so site navigation works)
      // for same-page anchors, enable smooth scroll:
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Scroll reveal using IntersectionObserver
  const revealEls = document.querySelectorAll('.reveal-up');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));

  // Contact form simple client-side feedback (no backend)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const msg = document.getElementById('formMsg');
      msg.textContent = 'Sending message...';
      // fake delay
      setTimeout(() => {
        msg.textContent = 'Thanks — message queued. We will contact you shortly.';
        contactForm.reset();
      }, 900);
    });
  }

  // tiny parallax-like hero tilt on mouse move (desktop)
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && window.innerWidth > 900) {
    heroVisual.addEventListener('mousemove', (e) => {
      const r = heroVisual.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const tx = (x - 0.5) * 12;
      const ty = (y - 0.5) * 12;
      heroVisual.style.transform = `translate(${tx}px, ${ty}px) rotate(${tx/8}deg)`;
    });
    heroVisual.addEventListener('mouseleave', () => {
      heroVisual.style.transform = '';
    });
  }
});
