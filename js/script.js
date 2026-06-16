/* ── Navbar: cambio al hacer scroll ── */
const navbar = document.getElementById('navbar');

function updateNavbar() {
  navbar.classList.toggle('is-scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

/* ── Hamburger menu ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', function () {
  const isOpen = navLinks.classList.toggle('is-open');
  hamburger.classList.toggle('is-open', isOpen);
  hamburger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-label', 'Abrir menú');
  });
});

/* ── GSAP: Tarjeta de presentación ── */
gsap.from('.biz-card', {
  y: 70,
  opacity: 0,
  duration: 1.3,
  ease: 'power4.out',
  delay: 0.1
});

gsap.from('.biz-name span', {
  y: 40,
  opacity: 0,
  stagger: 0.14,
  delay: 0.4,
  duration: 1,
  ease: 'power4.out'
});

gsap.from('.biz-role', {
  y: 16,
  opacity: 0,
  delay: 0.72,
  duration: 0.8,
  ease: 'power3.out'
});

gsap.from(['.biz-divider', '.biz-dot'], {
  scaleX: 0,
  opacity: 0,
  delay: 0.9,
  duration: 0.7,
  stagger: 0.1,
  ease: 'power2.out'
});

gsap.to('.biz-icon', {
  strokeDashoffset: 0,
  duration: 1.2,
  stagger: 0.2,
  delay: 1.1,
  ease: 'power2.out'
});

gsap.from('.biz-info .biz-item', {
  x: -20,
  opacity: 0,
  stagger: 0.15,
  delay: 1.0,
  duration: 0.7,
  ease: 'power3.out'
});

gsap.from('.hero-scroll-cta', {
  y: 12,
  opacity: 0,
  delay: 1.6,
  duration: 0.7,
  ease: 'power2.out'
});

/* Watermark drift */
gsap.to('.biz-watermark', {
  y: -20,
  x: 10,
  duration: 10,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

/* Color splash float */
gsap.to('.biz-splash', {
  x: 20,
  y: 20,
  scale: 1.12,
  duration: 12,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

/* Magnetic card on mousemove */
const bizCard = document.querySelector('.biz-card');
if (bizCard) {
  bizCard.addEventListener('mousemove', function (e) {
    const r = bizCard.getBoundingClientRect();
    const x = e.clientX - r.left - r.width  / 2;
    const y = e.clientY - r.top  - r.height / 2;
    gsap.to(bizCard, {
      x: x * 0.07,
      y: y * 0.07,
      rotateX: -y * 0.025,
      rotateY:  x * 0.025,
      duration: 0.6,
      ease: 'power3.out'
    });
  });

  bizCard.addEventListener('mouseleave', function () {
    gsap.to(bizCard, {
      x: 0, y: 0, rotateX: 0, rotateY: 0,
      duration: 0.9,
      ease: 'power4.out'
    });
  });
}

/* ── Scroll reveal (IntersectionObserver) ── */
const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
      setTimeout(function () { el.classList.add('is-visible'); }, delay);
      revealObserver.unobserve(el);
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(function (el) {
  if (!el.closest('.hero')) revealObserver.observe(el);
});

/* ── Smooth scroll con offset para navbar ── */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 16;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });
});

/* ── Nav: resaltar sección activa ── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
      });
    });
  },
  { threshold: 0.4 }
);

sections.forEach(function (s) { sectionObserver.observe(s); });
