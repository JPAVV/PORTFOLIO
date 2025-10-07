(function() {
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
  } else {
    // default dark
    html.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeToggle.textContent = next === 'light' ? '🌙' : '☀️';
  });

  // Mobile nav
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
  if (navLinks) {
    navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') navLinks.classList.remove('open');
    });
  }

  // Active link on scroll
  const sectionIds = ['accueil', 'projets', 'experience', 'competences', 'qualites', 'voyages', 'contact'];
  const linkMap = new Map();
  document.querySelectorAll('.nav-links a').forEach(a => linkMap.set(a.getAttribute('href').slice(1), a));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = linkMap.get(id);
      if (!link) return;
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });

  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  // Reveal on scroll
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Lightbox for travel images with navigation
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbCaption = document.getElementById('lightboxCaption');
  const lbClose = document.getElementById('lightboxClose');
  const lbPrev = document.getElementById('lightboxPrev');
  const lbNext = document.getElementById('lightboxNext');

  const travelImages = Array.from(document.querySelectorAll('#voyages .travel-card img'));
  const travelCaptions = travelImages.map(img => img.parentElement.querySelector('figcaption')?.textContent || '');
  let currentIndex = -1;

  function showIndex(index) {
    if (!lb || !lbImg) return;
    const normalized = (index + travelImages.length) % travelImages.length;
    currentIndex = normalized;
    const img = travelImages[normalized];
    lbImg.src = img.getAttribute('src');
    if (lbCaption) lbCaption.textContent = travelCaptions[normalized] || '';
  }
  function openLightboxAt(index) {
    showIndex(index);
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lbPrev) lbPrev.style.display = '';
    if (lbNext) lbNext.style.display = '';
  }
  function closeLightbox() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lbPrev) lbPrev.style.display = '';
    if (lbNext) lbNext.style.display = '';
  }

  travelImages.forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightboxAt(i));
  });

  if (lbPrev) lbPrev.addEventListener('click', () => showIndex(currentIndex - 1));
  if (lbNext) lbNext.addEventListener('click', () => showIndex(currentIndex + 1));
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lb) lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
  window.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showIndex(currentIndex - 1);
    if (e.key === 'ArrowRight') showIndex(currentIndex + 1);
  });

  // Clickable avatar -> open in lightbox (single image mode)
  const avatarImg = document.querySelector('.avatar img');
  function openLightboxWith(src, captionText) {
    if (!lb || !lbImg) return;
    lbImg.src = src;
    if (lbCaption) lbCaption.textContent = captionText || '';
    currentIndex = -1; // not part of gallery
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lbPrev) lbPrev.style.display = 'none';
    if (lbNext) lbNext.style.display = 'none';
  }
  if (avatarImg) {
    avatarImg.style.cursor = 'zoom-in';
    const caption = 'Jean-Philippe VONTHRON';
    avatarImg.addEventListener('click', () => openLightboxWith(avatarImg.getAttribute('src'), caption));
  }

  // Copy email
  const copyBtn = document.getElementById('copyEmail');
  const emailLink = document.getElementById('emailLink');
  const copyStatus = document.getElementById('copyStatus');
  if (copyBtn && emailLink) {
    copyBtn.addEventListener('click', async () => {
      const email = emailLink.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        if (copyStatus) {
          copyStatus.textContent = "Email copié ✓";
          copyStatus.classList.add('muted');
        }
        copyBtn.textContent = "Copié";
        copyBtn.disabled = true;
        setTimeout(() => {
          copyBtn.textContent = "Copier l'email";
          copyBtn.disabled = false;
          if (copyStatus) copyStatus.textContent = "";
        }, 1600);
      } catch (e) {
        if (copyStatus) copyStatus.textContent = "Impossible de copier. Copiez manuellement.";
      }
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})(); 