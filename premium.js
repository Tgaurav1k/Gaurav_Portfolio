// Portfolio interactions — lean build (no Lenis, no pre-loader, no custom cursor, no perpetual canvas RAFs)
// Kept: hero intro, scroll reveals, char/word reveals, count-up stats, 3D tilt cards, magnetic buttons,
// service spotlight, bg-orb scroll parallax (light), marquee, tab switchers, scroll progress, active nav,
// nav peek, h2 reveal, skill bars, mobile menu, contact mail reveal, hero parallax exit.
if (history.scrollRestoration) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
gsap.registerPlugin(ScrollTrigger);

// ---------- Hero intro (runs immediately, no loader gate) ----------
function runHeroIntro() {
  const lines = document.querySelectorAll('.hero-title .line span');
  gsap.set(lines, { yPercent: 110, rotate: 6 });
  gsap.to(lines, {
    yPercent: 0, rotate: 0,
    duration: 1.2, ease: 'expo.out', stagger: 0.08, delay: 0.05
  });
  gsap.from('.hero-meta .col, .hero-tag, .hero-scroll, .nav', {
    opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', stagger: 0.06, delay: 0.4
  });
}
// ---------- Intro loader: count 0 → 100, then reveal (lightweight, self-removing) ----------
(function runLoader() {
  const loader = document.getElementById('loader');
  const num = document.getElementById('loaderNum');
  const bar = document.getElementById('loaderBar');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // No loader / reduced motion → skip straight to hero intro
  if (!loader || !num || reduce) {
    if (loader) loader.remove();
    runHeroIntro();
    return;
  }
  document.documentElement.style.overflow = 'hidden'; // lock scroll while counting
  gsap.to({ v: 0 }, {
    v: 100, duration: 1.4, ease: 'power2.out',
    onUpdate() {
      const v = Math.round(this.targets()[0].v);
      num.textContent = v;
      if (bar) bar.style.width = v + '%';
    },
    onComplete() {
      gsap.to(loader, {
        opacity: 0, duration: 0.6, ease: 'power2.inOut',
        onComplete() {
          loader.remove();                              // drop the layer entirely
          document.documentElement.style.overflow = '';
          runHeroIntro();
        }
      });
    }
  });
})();

// ---------- Nav smooth scroll (native, not Lenis) ----------
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href.length < 2) return;
    const t = document.querySelector(href);
    if (t) {
      e.preventDefault();
      const y = t.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// ---------- Sticky-blur nav ----------
const nav = document.getElementById('nav');
ScrollTrigger.create({
  start: 'top -50',
  onUpdate: self => nav && nav.classList.toggle('scrolled', self.scroll() > 50)
});

// ---------- Nav link hover (split) ----------
document.querySelectorAll('.nav-links a').forEach(a => {
  const txt = a.textContent;
  a.innerHTML = '<span>' + txt + '</span><span class="dup">' + txt + '</span>';
});

// ---------- Reveals ----------
document.querySelectorAll('.reveal').forEach(el => {
  ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => el.classList.add('in') });
});
document.querySelectorAll('.reveal-img').forEach(el => {
  ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => el.classList.add('in') });
});

// ---------- Char-by-char reveal for big italic headings ----------
function splitChars(el) {
  const text = el.textContent;
  el.innerHTML = '';
  const wrap = document.createElement('span');
  wrap.className = 'char-wrap';
  el.appendChild(wrap);
  const chars = [];
  [...text].forEach(ch => {
    const s = document.createElement('span');
    s.className = 'char';
    s.textContent = ch === ' ' ? ' ' : ch;
    if (ch === ' ') s.style.marginRight = '.05em';
    wrap.appendChild(s);
    chars.push(s);
  });
  return chars;
}
document.querySelectorAll('[data-char-reveal]').forEach(el => {
  const chars = splitChars(el);
  gsap.set(chars, { yPercent: 100, opacity: 0 });
  ScrollTrigger.create({
    trigger: el, start: 'top 85%', once: true,
    onEnter: () => gsap.to(chars, { yPercent: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.025 })
  });
});

// ---------- Stats count-up ----------
document.querySelectorAll('.about-stat .num').forEach(num => {
  const raw = num.textContent.trim();
  const m = raw.match(/^(\d+)([+%]*)/);
  if (!m) return;
  const target = +m[1];
  const suffix = m[2];
  num.textContent = '0' + suffix;
  ScrollTrigger.create({
    trigger: num, start: 'top 90%', once: true,
    onEnter: () => {
      gsap.to({ v: 0 }, {
        v: target, duration: 1.5, ease: 'power3.out',
        onUpdate() { num.textContent = Math.round(this.targets()[0].v) + suffix; }
      });
    }
  });
});

// ---------- 3D tilt on project cards (hover-only, RAF stops when settled) ----------
// Disabled on touch devices to save battery + main thread
const isTouch = matchMedia('(hover: none)').matches;
if (!isTouch) {
  document.querySelectorAll('.work').forEach(card => {
    const frame = card.querySelector('.work-frame');
    if (!frame) return;
    let rafId = null;
    const target = { rx: 0, ry: 0, tx: 0, ty: 0 };
    const current = { rx: 0, ry: 0, tx: 0, ty: 0 };
    card.addEventListener('mousemove', e => {
      const r = frame.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      target.rx = -py * 7;
      target.ry = px * 9;
      target.tx = px * 10;
      target.ty = py * 10;
      if (!rafId) rafId = requestAnimationFrame(loop);
    });
    card.addEventListener('mouseleave', () => {
      target.rx = 0; target.ry = 0; target.tx = 0; target.ty = 0;
    });
    function loop() {
      current.rx += (target.rx - current.rx) * 0.12;
      current.ry += (target.ry - current.ry) * 0.12;
      current.tx += (target.tx - current.tx) * 0.12;
      current.ty += (target.ty - current.ty) * 0.12;
      frame.style.transform = `perspective(1100px) rotateX(${current.rx.toFixed(2)}deg) rotateY(${current.ry.toFixed(2)}deg) translate3d(${current.tx.toFixed(2)}px,${current.ty.toFixed(2)}px,0)`;
      if (Math.abs(current.rx - target.rx) > 0.01 || Math.abs(current.ry - target.ry) > 0.01 || Math.abs(current.tx - target.tx) > 0.01 || Math.abs(current.ty - target.ty) > 0.01) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = null;
        if (target.rx === 0 && target.ry === 0) frame.style.transform = '';
      }
    }
  });

  // ---------- Magnetic buttons ----------
  document.querySelectorAll('.magnetic').forEach(el => {
    const strength = parseFloat(el.dataset.magnet || '0.35');
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      gsap.to(el, { x, y, duration: 0.5, ease: 'power3.out' });
    });
    el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' }));
  });

  // ---------- Service hover spotlight ----------
  document.querySelectorAll('.service').forEach(s => {
    s.addEventListener('mousemove', e => {
      const r = s.getBoundingClientRect();
      s.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      s.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });
}

// ---------- Light bg-orb scroll parallax (no mousemove handler — that was the heavy one) ----------
gsap.to('.bg-orb.a', { yPercent: 20, ease: 'none', scrollTrigger: { scrub: 2, start: 'top top', end: 'bottom bottom' } });
gsap.to('.bg-orb.b', { yPercent: -15, ease: 'none', scrollTrigger: { scrub: 2, start: 'top top', end: 'bottom bottom' } });

// ---------- Tab switchers (scoped per tabset) ----------
document.querySelectorAll('.amz-tab').forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation();
    if (tab.classList.contains('active')) return;
    const set = tab.dataset.tabset || 'amz';
    const targetId = tab.dataset.target || 'amzMain';
    document.querySelectorAll('.amz-tab[data-tabset="' + set + '"]').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const main = document.getElementById(targetId);
    if (!main) return;
    gsap.to(main, {
      opacity: 0, scale: 1.02, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        main.src = tab.dataset.src;
        gsap.fromTo(main, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.55, ease: 'power3.out' });
      }
    });
  });
});

addEventListener('resize', () => ScrollTrigger.refresh());

// ---------- Scroll progress bar ----------
(function () {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { scrub: 0.3, start: 'top top', end: 'bottom bottom' } });
})();

// ---------- Active nav section ----------
(function () {
  const secs = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  secs.forEach(sec => {
    ScrollTrigger.create({
      trigger: sec, start: 'top 50%', end: 'bottom 50%',
      onEnter: () => links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + sec.id)),
      onEnterBack: () => links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + sec.id)),
      onLeave: () => links.forEach(a => { if (a.getAttribute('href') === '#' + sec.id) a.classList.remove('active'); }),
      onLeaveBack: () => links.forEach(a => { if (a.getAttribute('href') === '#' + sec.id) a.classList.remove('active'); })
    });
  });
})();

// ---------- Nav hover image peek (desktop only) ----------
if (!isTouch) (function () {
  const peek = document.getElementById('navPeek');
  const peekImg = document.getElementById('navPeekImg');
  if (!peek || !peekImg) return;
  document.querySelectorAll('.nav-links a[data-preview]').forEach(a => {
    a.addEventListener('mouseenter', () => { peekImg.src = a.dataset.preview; peek.classList.add('show'); });
    a.addEventListener('mouseleave', () => peek.classList.remove('show'));
  });
})();

// ---------- Hero parallax exit (light scrub) ----------
gsap.to('.hero-title', { yPercent: -15, ease: 'none', scrollTrigger: { trigger: '.hero', scrub: 2, start: 'top top', end: 'bottom top' } });
gsap.to('.hero-meta', { yPercent: -25, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', scrub: 1.5, start: 'top top', end: '55% top' } });

// ---------- Works decorative ghost text ----------
(function () {
  const ws = document.getElementById('work');
  if (!ws) return;
  const d = document.createElement('div');
  d.className = 'works-deco'; d.textContent = 'Work'; d.setAttribute('aria-hidden', 'true');
  ws.appendChild(d);
  gsap.fromTo(d, { yPercent: -10 }, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: ws, scrub: 2.5, start: 'top bottom', end: 'bottom top' } });
})();

// ---------- Service items stagger ----------
document.querySelectorAll('.service').forEach(s => {
  const items = s.querySelectorAll('li');
  ScrollTrigger.create({ trigger: s, start: 'top 75%', once: true, onEnter: () => gsap.from(items, { y: 14, opacity: 0, duration: 0.65, ease: 'power3.out', stagger: 0.06 }) });
});

// ---------- Work tags pop-in ----------
document.querySelectorAll('.work').forEach(w => {
  const tags = w.querySelectorAll('.work-tag');
  if (!tags.length) return;
  ScrollTrigger.create({ trigger: w, start: 'top 85%', once: true, onEnter: () => gsap.from(tags, { scale: 0.8, opacity: 0, duration: 0.45, ease: 'back.out(1.7)', stagger: 0.06 }) });
});

// ---------- H2 word-split masked reveal ----------
document.querySelectorAll('h2').forEach(h2 => {
  if ([...h2.childNodes].some(n => n.nodeType === 1)) return;
  const words = h2.textContent.trim().split(/\s+/);
  h2.innerHTML = words.map(w => `<span class="w-word"><span class="w-inner">${w}</span></span>`).join(' ');
  const inners = h2.querySelectorAll('.w-inner');
  gsap.set(inners, { yPercent: 110, opacity: 0 });
  ScrollTrigger.create({ trigger: h2, start: 'top 88%', once: true,
    onEnter: () => gsap.to(inners, { yPercent: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.055 }) });
});

// ---------- Skill bars — animate on scroll ----------
ScrollTrigger.create({
  trigger: '.hero-cards',
  start: 'top 88%',
  once: true,
  onEnter: () => {
    document.querySelectorAll('.sbar-fill').forEach((fill, i) => {
      gsap.to(fill, { width: fill.dataset.w + '%', duration: 1.2, ease: 'power3.out', delay: 0.06 * i });
    });
  }
});

// ---------- Mobile hamburger menu ----------
(function () {
  const btn = document.getElementById('navHamburger');
  const overlay = document.getElementById('navOverlay');
  if (!btn || !overlay) return;
  function open() {
    btn.classList.add('open');
    overlay.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
  function close() {
    btn.classList.remove('open');
    overlay.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }
  btn.addEventListener('click', () => btn.classList.contains('open') ? close() : open());
  overlay.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      close();
      if (t) setTimeout(() => {
        const y = t.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 60);
    });
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

// ---------- Contact mail line reveal ----------
(function () {
  const m = document.querySelector('.contact-mail');
  if (!m) return;
  const parts = m.innerHTML.split(/<br\s*\/?>/i);
  m.innerHTML = parts.map(p => `<span class="line-mask"><span class="line-inner">${p}</span></span>`).join('');
  const inners = m.querySelectorAll('.line-inner');
  gsap.set(inners, { yPercent: 110 });
  ScrollTrigger.create({ trigger: m, start: 'top 88%', once: true,
    onEnter: () => gsap.to(inners, { yPercent: 0, duration: 1.15, ease: 'expo.out', stagger: 0.14 }) });
})();
