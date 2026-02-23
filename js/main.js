/* ============================================
   IronForge Advisors — Main JS
   Mobile nav, FAQ accordion, sticky header
   ============================================ */

(function () {
  'use strict';

  /* --- Sticky header scroll shadow --- */
  var header = document.querySelector('.header');
  if (header) {
    var scrollThreshold = 10;
    var ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          if (window.scrollY > scrollThreshold) {
            header.classList.add('header--scrolled');
          } else {
            header.classList.remove('header--scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --- Mobile nav toggle --- */
  var toggle = document.querySelector('.nav__toggle');
  var mobileNav = document.querySelector('.nav__mobile');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var isOpen = toggle.classList.contains('nav__toggle--open');

      if (isOpen) {
        toggle.classList.remove('nav__toggle--open');
        mobileNav.classList.remove('nav__mobile--open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        toggle.classList.add('nav__toggle--open');
        mobileNav.classList.add('nav__mobile--open');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    });

    /* Close mobile nav on link click */
    var mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('nav__toggle--open');
        mobileNav.classList.remove('nav__mobile--open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- FAQ accordion --- */
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-item__question');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('faq-item--open');

      /* Close all others */
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('faq-item--open');
          var otherBtn = other.querySelector('.faq-item__question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      /* Toggle current */
      if (isOpen) {
        item.classList.remove('faq-item--open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('faq-item--open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* --- Current page nav highlight --- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.nav__link');

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('nav__link--active');
    }
  });

})();
