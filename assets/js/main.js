// main.js — interactions, navbar, scroll reveal, dark mode, fiber animation
document.addEventListener('DOMContentLoaded', function () {

  /* MOBILE NAVBAR TOGGLE */
  const mobileBtn = document.getElementById('mobileBtn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  /* SMOOTH SCROLL */
  document.querySelectorAll('a[href^="#"], a[href$=".html"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        navLinks?.classList.remove('open');
      }
    });
  });

  /* SCROLL REVEAL */
  const revealEls = document.querySelectorAll('.reveal-up');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('show'); });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* CONTACT FORM FEEDBACK (client-side) */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const msg = document.getElementById('formMsg');
      msg.textContent = 'Sending message...';
      setTimeout(() => {
        msg.textContent = 'Thanks — message queued. We will contact you shortly.';
        contactForm.reset();
      }, 900);
    });
  }

  /* FIBER CANVAS ANIMATION */
  const canvas = document.getElementById('fiberCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    const fibers = [];
    for (let i = 0; i < 70; i++) {
      fibers.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: 80 + Math.random() * 160,
        speed: 0.6 + Math.random() * 1.8,
        alpha: 0.08 + Math.random() * 0.32
      });
    }
    (function drawFibers(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      fibers.forEach(f => {
        const grad = ctx.createLinearGradient(f.x, f.y, f.x + f.length, f.y);
        grad.addColorStop(0, `rgba(8,164,167,${f.alpha})`);
        grad.addColorStop(0.8, `rgba(255,255,255,0.02)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(f.x, f.y);
        ctx.lineTo(f.x + f.length, f.y);
        ctx.stroke();
        f.x += f.speed;
        if (f.x > canvas.width + f.length) { f.x = -f.length; f.y = Math.random() * canvas.height; }
      });
      requestAnimationFrame(drawFibers);
    })();
  }

  /* DARK MODE TOGGLE */
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme','dark'); themeBtn.textContent = '☀ Light';
      } else { localStorage.setItem('theme','light'); themeBtn.textContent = '🌙 Dark'; }
    });
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark'); themeBtn.textContent = '☀ Light';
    } else { themeBtn.textContent = '🌙 Dark'; }
  }

});
