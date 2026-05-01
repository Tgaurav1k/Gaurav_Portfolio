// Premium portfolio — GSAP + Lenis + 3D + magnetic + char reveal
if (history.scrollRestoration) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
gsap.registerPlugin(ScrollTrigger);

// ---------- Loader ----------
(function () {
  const el = document.getElementById('loaderCount');
  const fill = document.getElementById('loaderFill');
  const loader = document.getElementById('loader');
  let n = 0;
  const tick = setInterval(() => {
    n += Math.ceil(Math.random() * 7) + 2;
    if (n >= 100) { n = 100; clearInterval(tick); }
    if (el) {
      el.textContent = String(n).padStart(3, '0');
      el.style.animation = 'none';
      el.offsetHeight; // reflow to restart animation
      el.style.animation = '';
    }
    if (fill) fill.style.width = n + '%';
    if (n === 100) setTimeout(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
      loader && loader.classList.add('done');
      runHeroIntro();
    }, 350);
  }, 50);
})();

// ---------- Lenis smooth scroll ----------
const lenis = new Lenis({ duration: 1.25, easing: t => 1 - Math.pow(1 - t, 4), smoothWheel: true, lerp: 0.09 });
lenis.scrollTo(0, { immediate: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

// ---------- Nav smooth scroll ----------
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href.length < 2) return;
    const t = document.querySelector(href);
    if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -80, duration: 1.2, easing: t => 1 - Math.pow(1 - t, 4) }); }
  });
});

// ---------- Cursor (dot + ring) ----------
const cursor = document.getElementById('cursor');
const cring = document.getElementById('cursorRing');
let dx = innerWidth / 2, dy = innerHeight / 2, rx = dx, ry = dy, tx = dx, ty = dy;
addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
function cursorLoop() {
  dx += (tx - dx) * 0.5; dy += (ty - dy) * 0.5;
  rx += (tx - rx) * 0.18; ry += (ty - ry) * 0.18;
  if (cursor) { cursor.style.left = dx + 'px'; cursor.style.top = dy + 'px'; }
  if (cring) { cring.style.left = rx + 'px'; cring.style.top = ry + 'px'; }
  requestAnimationFrame(cursorLoop);
}
cursorLoop();
document.querySelectorAll('a, button, .work, .service').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor && cursor.classList.add('hover'); cring && cring.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor && cursor.classList.remove('hover'); cring && cring.classList.remove('hover'); });
});
document.querySelectorAll('h1, h2, h3, p').forEach(el => {
  el.addEventListener('mouseenter', () => cring && cring.classList.add('text-hover'));
  el.addEventListener('mouseleave', () => cring && cring.classList.remove('text-hover'));
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

// ---------- Hero intro ----------
function runHeroIntro() {
  const lines = document.querySelectorAll('.hero-title .line span');
  gsap.set(lines, { yPercent: 110, rotate: 6 });
  gsap.to(lines, {
    yPercent: 0, rotate: 0,
    duration: 1.4, ease: 'expo.out', stagger: 0.1, delay: 0.05
  });
  gsap.from('.hero-meta .col, .hero-tag, .hero-scroll, .nav', {
    opacity: 0, y: 20, duration: 1, ease: 'power3.out', stagger: 0.07, delay: 0.7
  });
}

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
    s.textContent = ch === ' ' ? '\u00a0' : ch;
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
        v: target, duration: 1.8, ease: 'power3.out',
        onUpdate() { num.textContent = Math.round(this.targets()[0].v) + suffix; }
      });
    }
  });
});

// ---------- 3D tilt on project cards ----------
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

// ---------- Parallax orbs (mouse + scroll) ----------
const orbA = document.querySelector('.bg-orb.a');
const orbB = document.querySelector('.bg-orb.b');
addEventListener('mousemove', e => {
  const x = (e.clientX / innerWidth - 0.5) * 60;
  const y = (e.clientY / innerHeight - 0.5) * 60;
  if (orbA) gsap.to(orbA, { x, y, duration: 1.2, ease: 'power3.out' });
  if (orbB) gsap.to(orbB, { x: -x, y: -y, duration: 1.4, ease: 'power3.out' });
});
gsap.to('.bg-orb.a', { yPercent: 30, ease: 'none', scrollTrigger: { scrub: 1.5, start: 'top top', end: 'bottom bottom' } });
gsap.to('.bg-orb.b', { yPercent: -25, ease: 'none', scrollTrigger: { scrub: 1.5, start: 'top top', end: 'bottom bottom' } });

// ---------- Marquee scroll-velocity speedup ----------
const marqueeTrack = document.querySelector('.marquee-track');
let curVel = 0;
ScrollTrigger.create({
  start: 'top top', end: 'bottom bottom',
  onUpdate: self => {
    const v = Math.min(Math.abs(self.getVelocity()) / 2000, 1.5);
    curVel += (v - curVel) * 0.08;
    if (marqueeTrack) marqueeTrack.style.animationDuration = (45 / Math.max(1, curVel)) + 's';
  }
});

// ---------- Footer mark hover stretch ----------
const footerMark = document.querySelector('.footer-mark');
if (footerMark) {
  footerMark.addEventListener('mousemove', e => {
    const r = footerMark.getBoundingClientRect();
    const sx = 1 + ((e.clientX - r.left - r.width / 2) / r.width) * 0.15;
    gsap.to(footerMark, { scaleX: sx, duration: 0.6, ease: 'power3.out' });
  });
  footerMark.addEventListener('mouseleave', () => gsap.to(footerMark, { scaleX: 1, duration: 0.8, ease: 'elastic.out(1,0.4)' }));
}

// ---------- Grain canvas ----------
(function () {
  const c = document.getElementById('grain');
  if (!c) return;
  const ctx = c.getContext('2d');
  function size() { c.width = innerWidth; c.height = innerHeight; }
  size(); addEventListener('resize', size);
  function draw() {
    const w = c.width, h = c.height;
    const img = ctx.createImageData(w, h);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 30;
    }
    ctx.putImageData(img, 0, 0);
    setTimeout(draw, 90);
  }
  draw();
})();

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

// ---------- Nav hover image peek ----------
(function () {
  const peek = document.getElementById('navPeek');
  const peekImg = document.getElementById('navPeekImg');
  if (!peek || !peekImg) return;
  document.querySelectorAll('.nav-links a[data-preview]').forEach(a => {
    a.addEventListener('mouseenter', () => { peekImg.src = a.dataset.preview; peek.classList.add('show'); });
    a.addEventListener('mouseleave', () => peek.classList.remove('show'));
  });
})();

// ---------- Animated gradient canvas background ----------
(function () {
  const c = document.createElement('canvas');
  c.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:.04;mix-blend-mode:normal';
  document.body.appendChild(c);
  const ctx = c.getContext('2d');
  const resize = () => { c.width = Math.ceil(innerWidth / 3); c.height = Math.ceil(innerHeight / 3); };
  resize(); addEventListener('resize', resize);
  const blobs = [
    { x: 0.2, y: 0.3, r: 0.45, vx: 0.0003, vy: 0.00025, h: 240 },
    { x: 0.75, y: 0.65, r: 0.4, vx: -0.00025, vy: 0.0003, h: 280 },
    { x: 0.5, y: 0.85, r: 0.35, vx: 0.0002, vy: -0.0004, h: 210 }
  ];
  function draw() {
    const w = c.width, h = c.height;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'screen';
    blobs.forEach(b => {
      b.x += b.vx; b.y += b.vy;
      if (b.x < 0 || b.x > 1) b.vx *= -1;
      if (b.y < 0 || b.y > 1) b.vy *= -1;
      const g = ctx.createRadialGradient(b.x * w, b.y * h, 0, b.x * w, b.y * h, b.r * Math.max(w, h));
      g.addColorStop(0, `hsla(${b.h},80%,60%,1)`);
      g.addColorStop(1, `hsla(${b.h},80%,60%,0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ---------- Floating cursor project label ----------
(function () {
  const lb = document.createElement('div');
  lb.className = 'cursor-label';
  document.body.appendChild(lb);
  let lx = 0, ly = 0, cx = 0, cy = 0;
  document.querySelectorAll('.work').forEach(w => {
    const title = (w.querySelector('h3')?.textContent || '').trim().replace(/\s+/g, ' ');
    w.addEventListener('mouseenter', () => { lb.textContent = title; lb.classList.add('visible'); });
    w.addEventListener('mousemove', e => { lx = e.clientX + 22; ly = e.clientY - 12; });
    w.addEventListener('mouseleave', () => lb.classList.remove('visible'));
  });
  (function loop() { cx += (lx - cx) * 0.14; cy += (ly - cy) * 0.14; lb.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
})();

// ---------- Hero parallax exit ----------
gsap.to('.hero-title', { yPercent: -20, ease: 'none', scrollTrigger: { trigger: '.hero', scrub: 1.8, start: 'top top', end: 'bottom top' } });
gsap.to('.hero-meta', { yPercent: -35, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', scrub: 1.2, start: 'top top', end: '55% top' } });
gsap.to('.hero-bottom', { yPercent: -18, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', scrub: 1, start: '20% top', end: 'bottom top' } });

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
      gsap.to(fill, { width: fill.dataset.w + '%', duration: 1.4, ease: 'power3.out', delay: 0.08 * i });
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
      if (t) setTimeout(() => lenis.scrollTo(t, { offset: -80, duration: 1.2, easing: x => 1 - Math.pow(1 - x, 4) }), 60);
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
