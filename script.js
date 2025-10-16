/* Basic interactions:
   - Mobile nav toggle (accessible)
   - Smooth scrolling for internal links (works with nav too)
   - Active nav link update on scroll
   - Footer year inject
*/

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav
  const navToggle = document.getElementById('nav-toggle');
  const primaryNav = document.getElementById('primary-navigation');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    primaryNav.classList.toggle('open');
  });

  // Close nav when a link is clicked (mobile)
  primaryNav.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => {
      if (primaryNav.classList.contains('open')) {
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Smooth scrolling + focus management
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // set focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  // Active link highlighting on scroll
  const sections = document.querySelectorAll('main > section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function onScroll() {
    const pos = window.scrollY + window.innerHeight / 3;
    sections.forEach(s => {
      const top = s.offsetTop;
      const bottom = top + s.offsetHeight;
      const id = s.id;
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (!link) return;
      if (pos >= top && pos < bottom) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
});
// =========================
// Footer Send Message Button Functionality
// =========================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default reload

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const project = document.getElementById('project').value.trim();

    if (!name || !email || !project) {
      alert("⚠️ Please fill out all fields before sending.");
      return;
    }

    alert(`✅ Message sent successfully!\n\nThank you, ${name}. We’ll contact you soon.`);
    contactForm.reset(); // clear input fields
  });
}
