import { readFileSync } from 'fs';
import { join } from 'path';

const VERCEL_BASE = 'https://rayo-agency-template.vercel.app';

const ANIMATION_SCRIPT = `
<script>
(function () {
  'use strict';

  /* ── helpers ── */
  function load(src, cb) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = cb;
    s.onerror = function () { cb && cb(); };
    document.head.appendChild(s);
  }

  /* ── counter max values from RSC payload ── */
  function getMaxValues() {
    var vals = [];
    var re = /"max":(\d+),"parentClass":"mxd-counter__number/g;
    document.querySelectorAll('script').forEach(function (s) {
      var text = s.textContent || '';
      if (!text.includes('mxd-counter__number')) return;
      var m;
      while ((m = re.exec(text)) !== null) vals.push(parseInt(m[1], 10));
      re.lastIndex = 0;
    });
    return vals;
  }

  /* ── counter animation ── */
  function initCounters() {
    var maxVals = getMaxValues();
    var els = document.querySelectorAll('.mxd-stats-number');
    if (!els.length) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        var el = entry.target;
        var idx = Array.prototype.indexOf.call(els, el);
        var max = maxVals[idx] != null ? maxVals[idx] : 100;
        var t0 = null;
        (function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / 1500, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * max);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = max;
        })(performance.now());
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* ── GSAP animations (exact patterns from Rayo source) ── */
  function initGSAP() {
    var gsap = window.gsap;
    var ST = window.ScrollTrigger;
    if (!gsap || !ST) return;
    gsap.registerPlugin(ST);

    var css = getComputedStyle(document.documentElement);

    /* hero page-load animation */
    var wrap = document.querySelector('.loading-wrap');
    if (wrap) {
      var items = wrap.querySelectorAll('.loading__item');
      var fades = document.querySelectorAll('.loading__fade');
      gsap.set(items, { opacity: 0 });
      gsap.to(items, { duration: 1.1, ease: 'power4', startAt: { y: 120 }, y: 0, opacity: 1, delay: 0.5, stagger: 0.08 });
      gsap.set(fades, { opacity: 0 });
      gsap.to(fades, { duration: 0.8, ease: 'none', opacity: 1, delay: 0.9 });
    }

    /* anim-uni-in-up */
    document.querySelectorAll('.anim-uni-in-up').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 50 }, {
        y: 0, opacity: 1, duration: 1.2,
        scrollTrigger: { trigger: el, start: 'top 95%', toggleActions: 'play none none reverse' }
      });
    });

    /* anim-uni-scale-in */
    document.querySelectorAll('.anim-uni-scale-in').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 50, scale: 1.2 }, {
        y: 0, x: 0, opacity: 1, scale: 1, duration: 1.2,
        scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 15%', toggleActions: 'play none none reverse' }
      });
    });

    /* anim-uni-scale-in-right (slides in from left side) */
    document.querySelectorAll('.anim-uni-scale-in-right').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 50, x: -70, scale: 1.2 }, {
        y: 0, x: 0, opacity: 1, scale: 1, duration: 1.2,
        scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 15%', toggleActions: 'play none none reverse' }
      });
    });

    /* anim-uni-scale-in-left (slides in from right side) */
    document.querySelectorAll('.anim-uni-scale-in-left').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 50, x: 70, scale: 1.2 }, {
        y: 0, x: 0, opacity: 1, scale: 1, duration: 1.2,
        scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 15%', toggleActions: 'play none none reverse' }
      });
    });

    /* anim-top-to-bottom (horizontal scroll text) */
    document.querySelectorAll('.anim-top-to-bottom').forEach(function (el) {
      var trig = document.querySelector('.fullwidth-text__tl-trigger') || el;
      gsap.timeline({ scrollTrigger: { trigger: trig, start: 'top 99%', end: 'top 24%', scrub: true } })
        .fromTo(el, { transform: 'translate3d(0,-100%,0)' }, { transform: 'translate3d(0,0,0)' });
    });

    /* anim-zoom-in-container */
    var radL = css.getPropertyValue('--_radius-l') || '2rem';
    document.querySelectorAll('.anim-zoom-in-container').forEach(function (el) {
      gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 82%', end: 'top 14%', scrub: true } })
        .fromTo(el, { borderRadius: '200px', scale: 0.94 }, { borderRadius: radL, scale: 1 });
    });

    /* anim-zoom-out-container */
    document.querySelectorAll('.anim-zoom-out-container').forEach(function (el) {
      gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 82%', end: 'top 14%', scrub: true } })
        .fromTo(el, { borderRadius: '200px', scale: 1.14 }, { borderRadius: radL, scale: 1 });
    });

    /* batch card animations */
    function batch(sel, opts) {
      if (!document.querySelector(sel)) return;
      gsap.set(sel, { y: 50, opacity: 0 });
      ST.batch(sel, {
        interval: 0.1,
        batchMax: opts.batchMax,
        start: 'top 80%', end: 'bottom 20%',
        delay: opts.delay || 0,
        onEnter: function (b) { gsap.to(b, { opacity: 1, y: 0, ease: 'sine', stagger: { each: 0.15, grid: [1, opts.gridCols] }, overwrite: true }); },
        onLeave: function (b) { gsap.set(b, { opacity: 1, y: 0, overwrite: true }); },
        onEnterBack: function (b) { gsap.to(b, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }); },
        onLeaveBack: function (b) { gsap.set(b, { opacity: 0, y: 50, overwrite: true }); }
      });
    }
    batch('.animate-card-2', { batchMax: 2, gridCols: 2 });
    batch('.animate-card-3', { batchMax: 3, gridCols: 3 });
    batch('.animate-card-4', { batchMax: 4, gridCols: 4, delay: 1000 });
    batch('.animate-card-5', { batchMax: 5, gridCols: 5, delay: 1000 });

    ST.refresh();
  }

  /* ── Lenis smooth scroll + ScrollTrigger proxy ── */
  function initLenis() {
    if (!window.Lenis || !window.ScrollTrigger) return;
    var lenis = new window.Lenis({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true
    });
    var ST = window.ScrollTrigger;
    try {
      ST.scrollerProxy(document.body, {
        scrollTop: function (val) {
          if (arguments.length && val != null) lenis.scrollTo(val, { immediate: true });
          return lenis.scroll;
        },
        scrollLeft: function () { return 0; },
        getBoundingClientRect: function () {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: 'fixed'
      });
      lenis.on('scroll', ST.update);
    } catch (e) {}
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    window.__lenis = lenis;
  }

  /* ── boot ── */
  var GSAP = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js';
  var ST_URL = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js';
  var LENIS_URL = 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js';

  load(GSAP, function () {
    load(ST_URL, function () {
      load(LENIS_URL, function () {
        /* small tick so DOM is fully ready after hydration attempt */
        setTimeout(function () {
          initLenis();
          initGSAP();
          initCounters();
        }, 150);
      });
    });
  });
})();
</script>`;

export async function GET() {
  const filePath = join(process.cwd(), 'public', 'rayo-static', 'home-main.html');
  let html = readFileSync(filePath, 'utf-8');

  // Base tag makes all relative paths (CSS, JS in <head>, video, favicon) resolve to /rayo-static/
  html = html.replace('<head>', '<head><base href="/rayo-static/">');

  // RSC payload and inline scripts use absolute /_next/static/ — redirect to our served chunks
  html = html.replaceAll('/_next/static/', '/rayo-static/_next/static/');

  // Next.js image optimizer URLs → direct paths on Vercel
  html = html.replace(
    /\/_next\/image\?url=(%2F[^&"'\s,]+)(?:(?:&amp;|&)[^"'\s,]*)*/g,
    (_match, encodedPath) => {
      const path = decodeURIComponent(encodedPath);
      return `${VERCEL_BASE}${path}`;
    },
  );

  // Tilde chars in RSC chunk references (HTTrack saved files with underscore)
  html = html.replace(
    /(self\.__next_f\.push\([\s\S]*?<\/script>)/g,
    (block) => block.replaceAll('~', '_'),
  );

  // Inject full GSAP + Lenis animation script before </body>
  html = html.replace('</body>', ANIMATION_SCRIPT + '</body>');

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
