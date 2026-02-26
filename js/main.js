(function () {
  'use strict';

  // Current page for active nav link
  function isCurrentPage(href) {
    if (!href || href === '#') return false;
    var path = window.location.pathname || '';
    var full = window.location.href || '';
    var file = path.split('/').pop() || '';
    if (file === '' && (path === '/' || path === '')) return href === 'index.html';
    if (full.endsWith(href)) return true;
    if (path.endsWith(href)) return true;
    return file === href;
  }

  function setActiveNav() {
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (a) {
      var href = (a.getAttribute('href') || '').replace(/^\.\//, '');
      if (isCurrentPage(href)) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }
  setActiveNav();

  // Mobile menu toggle
  var menuBtn = document.getElementById('menuBtn');
  var menuBtnMobile = document.getElementById('menuBtnMobile');
  var mobileMenu = document.getElementById('mobileMenu');

  function toggleMenu() {
    if (mobileMenu) mobileMenu.classList.toggle('open');
  }

  function closeMenu() {
    if (mobileMenu) mobileMenu.classList.remove('open');
  }

  if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
  if (menuBtnMobile) menuBtnMobile.addEventListener('click', toggleMenu);

  mobileMenu && mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  // Scroll animations: reveal elements when they enter viewport
  var observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-animate]').forEach(function (el) {
    observer.observe(el);
  });

  // Pillar cards with staggered delay (by index)
  document.querySelectorAll('.pillar-card').forEach(function (card, i) {
    card.style.transitionDelay = (i * 0.2) + 's';
  });

  document.querySelectorAll('.project-card').forEach(function (card, i) {
    card.style.transitionDelay = (i * 0.1) + 's';
  });

  document.querySelectorAll('.animate-on-scroll').forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.1) + 's';
  });
})();
