'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* ─── Iconify custom-element type (React 19 uses React.JSX namespace) ─── */
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          icon: string;
          width?: string | number;
          height?: string | number;
        },
        HTMLElement
      >;
    }
  }
}

/* ─── Helpers ─── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const prefersHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ─── Global CSS ─── */
function GlobalStyles() {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
      /* ── Fonts fallback stack ── */
      :root {
        --font-serif: 'Inter', system-ui, sans-serif;
        --font-sans: 'Inter', system-ui, sans-serif;
        --font-display: 'Inter', system-ui, sans-serif;
        --font-accent: 'Inter', system-ui, sans-serif;
        --c-bg: #F7FBFF;
        --c-fg: #3A5270;
        --c-primary: #3580B1;
        --c-muted: #80B8D8;
        --c-deep: #0C2340;
        --c-s100: #EBF4FA;
        --c-s200: #C6DFF0;
        --c-s300: #99C4E0;
      }
      * { box-sizing: border-box; }
      body { background: var(--c-bg); color: var(--c-fg); overflow-x: hidden; }

      /* ── Keyframes ── */
      @keyframes scrollMarquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes drawLine {
        to { stroke-dashoffset: 0; }
      }
      @keyframes fadeInFill {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes ctaBounce {
        0% { opacity: 0; transform: translateY(40px) skewX(-3deg); }
        55% { transform: translateY(-8px) skewX(-1deg); }
        75% { transform: translateY(4px) skewX(0); }
        100% { opacity: 1; transform: translateY(0) skewX(0); }
      }
      @keyframes pulseGlow {
        0% { transform: scale(1.02); opacity: 0.65; }
        100% { transform: scale(1.65); opacity: 0; }
      }
      @keyframes heroFloat {
        0%, 100% { transform: translateY(0px) rotate(0.3deg); }
        50% { transform: translateY(-14px) rotate(-0.3deg); }
      }
      @keyframes softRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes progressGrow {
        from { height: 0%; }
        to { height: 100%; }
      }

      /* ── Reusable animation classes ── */
      .cta-bounce { opacity: 0; animation: ctaBounce 0.9s cubic-bezier(0.34,1.56,0.64,1) forwards; }
      .svg-float { animation: heroFloat 6s ease-in-out infinite; }
      .pulse-glow { position: relative; }
      .pulse-glow::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 9999px;
        border: 2px solid rgba(53,128,177,0.55);
        animation: pulseGlow 2.2s ease-out infinite;
        pointer-events: none;
      }

      .draw-line {
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        animation: drawLine 2.4s cubic-bezier(0.25,1,0.5,1) forwards;
      }
      .fade-fill {
        opacity: 0;
        animation: fadeInFill 1.2s ease forwards;
      }

      /* ── Marquee ── */
      .marquee-track { display: flex; width: max-content; animation: scrollMarquee 28s linear infinite; }
      .marquee-track:hover { animation-play-state: paused; }

      /* ── Range input ── */
      input[type=range] { -webkit-appearance: none; appearance: none; background: transparent; width: 100%; }
      input[type=range]::-webkit-slider-runnable-track {
        height: 6px; background: var(--c-s200); border-radius: 9999px;
      }
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%;
        background: var(--c-deep); border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.25); margin-top: -7px; cursor: pointer;
      }
      input[type=range]::-moz-range-track { height: 6px; background: var(--c-s200); border-radius: 9999px; }
      input[type=range]::-moz-range-thumb {
        width: 20px; height: 20px; border-radius: 50%; background: var(--c-deep);
        border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.25); cursor: pointer;
      }

      /* ── 3D preserve ── */
      .preserve-3d { transform-style: preserve-3d; }
      .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }

      /* ── FAQ card flip ── */
      .faq-card-inner { transition: transform 0.35s cubic-bezier(0.77,0,0.175,1); transform-style: preserve-3d; }
      .faq-card-inner.flipped { transform: rotateY(180deg); }
      .faq-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
      .faq-back { transform: rotateY(180deg); }

      /* ── Milestone ── */
      .ms-dot { transition: background 0.45s, transform 0.45s; }
      .ms-content { overflow: hidden; max-height: 220px; opacity: 0; transition: opacity 0.4s; }
      .ms-item { opacity: 0.35; transition: opacity 0.4s; }
      .ms-item.active { opacity: 1; }
      .ms-item.active .ms-dot { background: var(--c-deep) !important; transform: scale(1.35); }
      .ms-item.active .ms-content { opacity: 1; }

      /* ── Nav underline accent ── */
      .logo-underline {
        position: absolute; bottom: -3px; right: -6px;
        width: 115%; height: 2.5px;
        background: linear-gradient(90deg, var(--c-muted), var(--c-primary));
        border-radius: 9999px; transform: rotate(-5deg);
      }

      /* ── Feature cards spread ── */
      .feat-card { position: absolute; inset: 0; border-radius: 2rem; will-change: transform; transition: box-shadow 0.3s; }
      .feat-card:hover { box-shadow: 0 32px 80px rgba(12,35,64,0.18) !important; }

      /* ── Section reveal ── */
      .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.8s cubic-bezier(0.25,1,0.5,1), transform 0.8s cubic-bezier(0.25,1,0.5,1); }
      .reveal.visible { opacity: 1; transform: translateY(0); }

      /* ── Scrollbar thin ── */
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: var(--c-s100); }
      ::-webkit-scrollbar-thumb { background: var(--c-s300); border-radius: 9999px; }

      /* ── Vision/Mission flip cards ── */
      .vm-flip { perspective: 1200px; }
      .vm-card {
        position: relative; width: 100%; height: 100%;
        transform-style: preserve-3d;
        transition: transform 0.75s cubic-bezier(0.23, 1, 0.32, 1);
        cursor: default;
      }
      @media (hover: hover) and (pointer: fine) {
        .vm-flip:hover .vm-card { transform: rotateY(180deg); }
      }
      .vm-face {
        position: absolute; inset: 0;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        border-radius: 2rem;
        display: flex; flex-direction: column; align-items: center;
        justify-content: center; text-align: center;
        padding: 3.5rem;
        gap: 1.5rem;
      }
      .vm-back { transform: rotateY(180deg); }

      /* ── Reduced motion ── */
      @media (prefers-reduced-motion: reduce) {
        .cta-bounce { animation: none !important; opacity: 1 !important; }
        .marquee-track { animation: none !important; }
        .pulse-glow::after { animation: none !important; }
        .svg-float { animation: none !important; }
        .reveal { transition: opacity 0.2s ease !important; transform: none !important; }
        .faq-card-inner { transition: none !important; }
        .ms-dot { transition: background 0.2s !important; }
        .ms-content { transition: opacity 0.2s !important; }
        .ms-item { transition: opacity 0.2s !important; }
        .feat-card { transition: none !important; }
        .vm-card { transition: none !important; }
      }
    `}} />
  );
}

/* ═══════════════════════════════════════
   REVEAL HOOK — IntersectionObserver
═══════════════════════════════════════ */
function useReveal(selector: string) {
  useEffect(() => {
    let obs: IntersectionObserver | null = null;
    const timer = setTimeout(() => {
      const els = document.querySelectorAll<HTMLElement>(selector);
      // Immediately reveal elements already well into or above the viewport
      els.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
          el.classList.add('visible');
        }
      });
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) { e.target.classList.add('visible'); obs!.unobserve(e.target); }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
      );
      els.forEach((el) => { if (!el.classList.contains('visible')) obs!.observe(el); });
    }, 80);
    return () => { clearTimeout(timer); obs?.disconnect(); };
  }, [selector]);
}

/* ═══════════════════════════════════════
   1. NAVBAR
═══════════════════════════════════════ */
function Navbar() {
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight - 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      height: 80, display: 'flex', alignItems: 'center',
      background: pastHero ? '#EBF4FA' : 'transparent',
      transition: 'background 0.5s ease',
      boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
      transition: 'background 0.4s ease',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src="/assets/o-a-logo-bg-rmd (1).png"
            alt="Ocean Arms Technical Services"
            style={{ height: 48, width: 'auto', objectFit: 'contain' }}
          />
        </a>

        {/* Links */}
        <div style={{ display: 'flex', gap: '2.2rem', alignItems: 'center' }}>
          {[['Services', '#process'], ['Industries', '#gallery'], ['Capabilities', '#services'], ['FAQ', '#faq']].map(([label, href]) => (
            <a key={label} href={href} style={{
              fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.7rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: pastHero ? 'var(--c-fg)' : 'rgba(247,251,255,0.82)', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.color = pastHero ? 'var(--c-deep)' : '#F7FBFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = pastHero ? 'var(--c-fg)' : 'rgba(247,251,255,0.82)')}>
              {label}
            </a>
          ))}
          <button style={{
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.7rem',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            background: pastHero ? 'var(--c-deep)' : 'rgba(255,255,255,0.15)', color: 'white',
            border: pastHero ? 'none' : '1px solid rgba(255,255,255,0.3)',
            borderRadius: 9999, padding: '0.75rem 1.75rem',
            cursor: 'pointer', transition: 'background 0.2s, transform 0.15s',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-primary)'; if (prefersHover) e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = pastHero ? 'var(--c-deep)' : 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'scale(1)'; }}>
            Request a Quote
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════
   2. HERO
═══════════════════════════════════════ */
function Hero() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      paddingTop: 80, position: 'relative', overflow: 'hidden',
    }}>
      {/* ── Full-bleed background image ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/new-hr-3.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* ── Dark overlay for text contrast ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'rgba(12,35,64,0.52)',
      }} />



      {/* ── Content ── */}
      <div style={{
        maxWidth: 1280, margin: '0 auto', width: '100%',
        padding: '4rem 1.5rem', position: 'relative', zIndex: 3,
      }}>
        <div style={{ maxWidth: 660 }}>
          {/* Eyebrow */}
          <p style={{
            fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.65rem',
            letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(198,223,240,0.9)',
            marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <iconify-icon icon="solar:verified-check-linear" width="13" />
            Dubai, United Arab Emirates
          </p>

          {/* Headline */}
          <h1 style={{ margin: 0, lineHeight: 1.06 }}>
            {[['Marine &', '0.05s', false], ['Industrial', '0.22s', false], ['Solutions.', '0.4s', true]].map(([text, delay, italic]) => (
              <span key={text as string} className="cta-bounce" style={{
                display: 'block',
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(3.2rem, 6.5vw, 5.2rem)',
                fontWeight: italic ? 400 : 500,
                fontStyle: 'normal',
                color: italic ? '#80B8D8' : '#F7FBFF',
                animationDelay: delay as string,
              }}>
                {text as string}
              </span>
            ))}
          </h1>

          {/* Description */}
          <p className="cta-bounce" style={{
            fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.75,
            color: 'rgba(247,251,255,0.72)', maxWidth: 480, marginTop: '1.75rem', animationDelay: '0.58s',
          }}>
            Ocean Arms Technical Services LLC delivers integrated technical solutions across
            Oil & Gas, Marine, Power, and Civil sectors throughout the GCC region.
          </p>

          {/* CTAs */}
          <div className="cta-bounce" style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap', animationDelay: '0.72s' }}>
            <button className="pulse-glow" style={{
              fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.72rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              background: 'var(--c-primary)', color: 'white',
              border: 'none', borderRadius: 9999, padding: '1rem 2.25rem',
              cursor: 'pointer', boxShadow: '0 8px 36px rgba(53,128,177,0.45)',
              transition: 'transform 0.2s', display: 'flex', alignItems: 'center', gap: 8,
            }}
              onMouseEnter={(e) => { if (prefersHover) e.currentTarget.style.transform = 'scale(1.04)'; }}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
              <iconify-icon icon="solar:document-text-linear" width="16" />
              Request a Quotation
            </button>
            <button style={{
              fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.72rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              background: 'rgba(255,255,255,0.08)', color: 'rgba(247,251,255,0.88)',
              border: '1px solid rgba(255,255,255,0.22)', borderRadius: 9999, padding: '1rem 2.25rem',
              cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(128,184,216,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; if (prefersHover) e.currentTarget.style.transform = 'scale(1.04)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'scale(1)'; }}>
              <iconify-icon icon="solar:buildings-linear" width="16" />
              Industries We Serve
            </button>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '2.5rem', marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            {[['24/7', 'Emergency Response'], ['4', 'Core Industries'], ['GCC', 'Coverage']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.7rem', fontWeight: 600, color: '#F7FBFF' }}>{num}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(198,223,240,0.8)', marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}


/* ═══════════════════════════════════════
   6. ROPE ACCESS SERVICES — Scroll-Scrubbed
═══════════════════════════════════════ */
const ROPE_SERVICES = [
  { name: 'Inspection & NDT',         desc: 'Visual, UT, MPI, and DPT testing on structures at height.',   icon: 'solar:eye-scan-linear' },
  { name: 'Blasting & Painting',      desc: 'Surface preparation and protective coating systems.',           icon: 'solar:paint-roller-linear' },
  { name: 'Surface Preparation',      desc: 'SSPC/NACE standard abrasive and hydro-blasting.',              icon: 'solar:waterdrops-linear' },
  { name: 'Welding Repairs',          desc: 'On-site structural and pipeline weld repairs at any height.',  icon: 'solar:fire-linear' },
  { name: 'Hydro Blasting',           desc: 'High-pressure water jetting for fouling and scale removal.',   icon: 'solar:waterdrop-linear' },
  { name: 'Insulation Works',         desc: 'Pipe and equipment insulation installation and replacement.',  icon: 'solar:layers-minimalistic-linear' },
  { name: 'Equipment Installation',   desc: 'Rigging, lifting, and positioning of industrial equipment.',   icon: 'solar:settings-linear' },
  { name: 'Building Maintenance',     desc: 'Facade, sealant, and structure maintenance at elevation.',     icon: 'solar:buildings-linear' },
];

const PROJECT_STAGES = [
  { label: 'Site Survey',       desc: 'Risk assessment, method statement, and permit-to-work.',  icon: 'solar:map-point-linear' },
  { label: 'Mobilisation',     desc: 'Equipment pre-checks, PPE issuance, and team briefing.',  icon: 'solar:box-linear' },
  { label: 'Execution',        desc: 'Supervised rope access operations with daily toolbox talks.', icon: 'solar:dumbbell-linear' },
  { label: 'QA / Inspection',  desc: 'Client sign-off, photographic evidence, NDT records.',    icon: 'solar:diploma-linear' },
  { label: 'Demobilisation',   desc: 'Site reinstatement and close-out report delivered.',      icon: 'solar:check-circle-linear' },
];

function Payment() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const connectorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const scrollable = section.offsetHeight - window.innerHeight;
    const raw = Math.max(0, Math.min(1, -rect.top / scrollable));

    // Service rows slide in at 0–0.55 progress
    serviceRefs.current.forEach((el, i) => {
      if (!el) return;
      const threshold = (i + 1) / (ROPE_SERVICES.length + 1) * 0.55;
      const visible = raw > threshold;
      el.style.opacity = visible ? '1' : '0';
      el.style.transform = visible ? 'translateX(0)' : 'translateX(-28px)';
    });

    // Project stages activate
    const stageThresholds = [0.22, 0.38, 0.55, 0.70, 0.86];
    stageRefs.current.forEach((el, i) => {
      if (!el) return;
      const active = raw > stageThresholds[i];
      el.classList.toggle('ms-item', true);
      el.classList.toggle('active', active);
    });

    // Connector lines between stages fill proportionally between thresholds
    connectorRefs.current.forEach((el, i) => {
      if (!el) return;
      const start = stageThresholds[i];
      const end = stageThresholds[i + 1];
      const fill = Math.max(0, Math.min(1, (raw - start) / (end - start)));
      el.style.transform = `scaleY(${fill})`;
    });

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = 0;
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(section);
    return () => { observer.disconnect(); cancelAnimationFrame(rafRef.current); };
  }, [animate]);

  return (
    <section id="services" ref={sectionRef} style={{ height: '350vh', position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'var(--c-bg)', overflow: 'hidden',
        padding: '5rem 2rem 1.5rem',
        gap: '1.5rem',
      }}>
        {/* Section header — inline, not absolute */}
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: '0.4rem' }}>
            Rope Access Services
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 500, color: 'var(--c-deep)', margin: 0 }}>
            What We Do <em>at Height</em>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', maxWidth: 1100, width: '100%', alignItems: 'stretch', flex: 1, minHeight: 0 }}>
          {/* Left: services card */}
          <div style={{ background: 'white', borderRadius: '1.5rem', padding: '1.5rem', boxShadow: '0 16px 60px rgba(12,35,64,0.1)', border: '1px solid var(--c-s200)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexShrink: 0 }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: '1.05rem', color: 'var(--c-deep)', margin: 0 }}>
                Service Capabilities
              </h3>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', background: 'var(--c-s100)', color: 'var(--c-fg)', padding: '0.3rem 0.7rem', borderRadius: 9999 }}>
                {ROPE_SERVICES.length} Services
              </span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {ROPE_SERVICES.map((svc, i) => (
                <div key={i} ref={(el) => { serviceRefs.current[i] = el; }} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  borderBottom: i < ROPE_SERVICES.length - 1 ? '1px solid var(--c-s200)' : 'none',
                  paddingBottom: i < ROPE_SERVICES.length - 1 ? '0.5rem' : 0,
                  opacity: 0, transform: 'translateX(-28px)',
                  transition: 'opacity 0.5s, transform 0.5s',
                  transitionDelay: `${i * 0.06}s`,
                }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--c-s100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <iconify-icon icon={svc.icon} width="15" style={{ color: 'var(--c-primary)' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.8rem', color: 'var(--c-deep)' }}>{svc.name}</div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.72rem', lineHeight: 1.4, color: 'var(--c-muted)' }}>{svc.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Project stages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Project stages */}
            <div style={{ background: 'white', borderRadius: '1.5rem', padding: '1.25rem', boxShadow: '0 12px 40px rgba(12,35,64,0.08)', border: '1px solid var(--c-s200)', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: '1rem', color: 'var(--c-deep)', margin: '0 0 1rem' }}>
                Project Workflow
              </h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {PROJECT_STAGES.map((stage, i) => (
                  <div key={i} ref={(el) => { stageRefs.current[i] = el; }} className="ms-item" style={{ display: 'flex', gap: '0.75rem', flex: i < PROJECT_STAGES.length - 1 ? 1 : 0 }}>
                    {/* Left: dot + connector column */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 12, flexShrink: 0 }}>
                      <div className="ms-dot" style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--c-s300)', flexShrink: 0, marginTop: 2, border: '2px solid white', boxShadow: '0 0 0 2px var(--c-s200)' }} />
                      {i < PROJECT_STAGES.length - 1 && (
                        <div style={{ flex: 1, width: 2, background: 'var(--c-s200)', borderRadius: 9999, marginTop: 4, marginBottom: 4, position: 'relative' }}>
                          <div ref={(el) => { connectorRefs.current[i] = el; }} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: 'var(--c-deep)', borderRadius: 9999, transform: 'scaleY(0)', transformOrigin: 'top' }} />
                        </div>
                      )}
                    </div>
                    {/* Right: content */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 1 }}>
                        <iconify-icon icon={stage.icon} width="12" style={{ color: 'var(--c-primary)' }} />
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-fg)' }}>{stage.label}</span>
                      </div>
                      <div className="ms-content">
                        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.76rem', lineHeight: 1.5, color: 'var(--c-fg)', margin: '0.3rem 0 0' }}>{stage.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   8. FOOTER
═══════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background: 'var(--c-deep)', color: '#FAFAFA', padding: '5rem 0 3rem' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Top */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '3rem', paddingBottom: '4rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Brand */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/o-a-logo-bg-rmd (1).png"
              alt="Ocean Arms Technical Services"
              style={{ height: 48, width: 'auto', objectFit: 'contain', marginBottom: '1.25rem', display: 'block' }}
            />
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.88rem', lineHeight: 1.7, color: 'rgba(250,250,250,0.6)', maxWidth: 280, margin: '0 0 1.75rem' }}>
              UAE-based integrated technical services for Oil & Gas, Marine, Power, and Civil sectors across the GCC region.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                ['solar:instagram-linear', '#'],
                ['solar:pinterest-linear', '#'],
                ['solar:linkedin-linear', '#'],
                ['solar:twitter-linear', '#'],
              ].map(([icon, href]) => (
                <a key={icon} href={href} style={{
                  width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--c-muted)'; e.currentTarget.style.background = 'rgba(128,184,216,0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'transparent'; }}>
                  <iconify-icon icon={icon} width="16" style={{ color: 'rgba(250,250,250,0.6)' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            ['Services', ['Rope Access', 'Inspection & NDT', 'Blasting & Painting', 'Welding Repairs']],
            ['Industries', ['Oil & Gas', 'Marine & Shipping', 'Power & Energy', 'Civil & Construction']],
            ['Company', ['About Us', 'Certifications', 'FAQ', 'Contact Us']],
          ].map(([heading, links]) => (
            <div key={heading as string}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-muted)', margin: '0 0 1.5rem' }}>
                {heading as string}
              </h4>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {(links as string[]).map((link) => (
                  <li key={link}>
                    <a href="#" style={{
                      fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.88rem',
                      color: 'rgba(250,250,250,0.6)', textDecoration: 'none', transition: 'color 0.2s',
                    }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#FAFAFA')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250,250,250,0.6)')}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.8rem', color: 'rgba(250,250,250,0.35)', margin: 0 }}>
            © 2026 Ocean Arms Technical Services LLC. All rights reserved. Dubai, UAE.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <a key={link} href="#" style={{
                fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.78rem',
                color: 'rgba(250,250,250,0.35)', textDecoration: 'none', transition: 'color 0.2s',
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(250,250,250,0.6)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250,250,250,0.35)')}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════
   9. ABOUT
═══════════════════════════════════════ */
function About() {
  return (
    <section id="about" style={{ padding: '7rem 0', background: 'var(--c-bg)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
        {/* Left */}
        <div className="reveal">
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <iconify-icon icon="solar:info-circle-linear" width="13" />
            About Us
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', fontWeight: 600, color: 'var(--c-deep)', margin: '0 0 1.75rem', lineHeight: 1.12 }}>
            A trusted industrial services partner <em>in the UAE</em>
          </h2>
          <div style={{ width: 48, height: 3, background: 'linear-gradient(90deg, var(--c-primary), var(--c-muted))', borderRadius: 9999 }} />
        </div>

        {/* Right */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.8, color: 'var(--c-fg)', margin: 0 }}>
            Ocean Arms Technical Services LLC is a UAE-registered company providing specialised industrial and marine technical services to clients across Oil & Gas, Marine & Shipping, Power & Energy, and Civil & Construction sectors.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.8, color: 'var(--c-fg)', margin: 0 }}>
            With a highly skilled workforce of certified rope access technicians, industrial painters, blasters, and marine maintenance specialists, we handle complex scopes in some of the most challenging environments in the region.
          </p>
          <div style={{ borderLeft: '3px solid var(--c-primary)', paddingLeft: '1.25rem', marginTop: '0.5rem', background: 'var(--c-s100)', padding: '1.25rem 1.25rem 1.25rem 1.5rem', borderRadius: '0 1rem 1rem 0' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--c-deep)', margin: 0 }}>
              Our teams operate 24/7, with rapid mobilisation capability across the UAE and broader GCC region — ensuring clients' assets remain operational, compliant, and well-maintained.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}



/* ═══════════════════════════════════════
   12. FEATURES — Sticky Card Deck
═══════════════════════════════════════ */
const CARDS = [
  {
    icon: 'solar:shield-check-linear',
    tag: 'Safety',
    title: 'Safety First',
    body: 'Zero-compromise HSSE culture on every site, every day.',
    bg: '#0C2340',
    color: '#F7FBFF',
    accent: '#80B8D8',
  },
  {
    icon: 'solar:star-linear',
    tag: 'Excellence',
    title: 'Excellence',
    body: 'Raising the standard on every scope we deliver.',
    bg: '#3580B1',
    color: '#F7FBFF',
    accent: '#C6DFF0',
  },
  {
    icon: 'solar:diploma-linear',
    tag: 'Integrity',
    title: 'Integrity',
    body: 'Transparent relationships built on trust and honesty.',
    bg: '#EBF4FA',
    color: '#0C2340',
    accent: '#3580B1',
  },
  {
    icon: 'solar:lightning-linear',
    tag: 'Efficiency',
    title: 'Efficiency',
    body: 'Rapid mobilisation, sharp execution, zero downtime.',
    bg: '#162D45',
    color: '#F7FBFF',
    accent: '#80B8D8',
  },
];

function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const rafRef = useRef<number>(0);

  const hoveredCard = useRef<number | null>(null);

  const animate = useCallback(() => {
    const section = sectionRef.current;
    const deck = deckRef.current;
    if (!section || !deck) return;

    const rect = section.getBoundingClientRect();
    const scrollable = section.offsetHeight - window.innerHeight;
    const raw = Math.max(0, Math.min(1, -rect.top / scrollable));
    progressRef.current = lerp(progressRef.current, raw, 0.07);
    const p = progressRef.current;

    const cards = deck.querySelectorAll<HTMLElement>('.feat-card');
    const txMap    = [-310, -103,  103,  310];
    const rotMap   = [ -13,   -4,    4,   13];
    const scaleMap = [0.85, 0.93, 0.93, 0.85];
    cards.forEach((card, i) => {
      const tx    = p * txMap[i];
      const rotZ  = p * rotMap[i];
      const scale = scaleMap[i] + p * (1 - scaleMap[i]);
      if (hoveredCard.current === i) {
        card.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s';
        card.style.transform = `translateX(${tx}px) rotateZ(0deg) scale(1)`;
        card.style.zIndex = '20';
        card.style.boxShadow = '0 32px 80px rgba(12,35,64,0.22)';
      } else {
        card.style.transition = 'box-shadow 0.3s';
        card.style.transform = `translateX(${tx}px) rotateZ(${rotZ}deg) scale(${scale})`;
        card.style.zIndex = String(i === 1 || i === 2 ? 10 : 2);
        card.style.boxShadow = '0 24px 64px rgba(12,35,64,0.14)';
      }
    });

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = 0;
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(section);
    return () => { observer.disconnect(); cancelAnimationFrame(rafRef.current); };
  }, [animate]);

  return (
    <section id="pillars" ref={sectionRef} style={{ height: '300vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: '0.75rem' }}>
            Core Values
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: 'var(--c-deep)', margin: 0 }}>
            The principles behind <em>every scope we deliver</em>
          </h2>
        </div>

        <div ref={deckRef} style={{ position: 'relative', width: 420, height: 360, perspective: '1200px' }}>
          {CARDS.map(({ icon, tag, title, body, bg, color, accent }, i) => (
            <div key={i} className="feat-card" style={{
              background: bg,
              boxShadow: '0 24px 64px rgba(12,35,64,0.14)',
              padding: '3rem',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              transformOrigin: 'bottom center',
              cursor: 'pointer',
            }}
              onMouseEnter={() => { hoveredCard.current = i; }}
              onMouseLeave={() => { hoveredCard.current = null; }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: `${accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <iconify-icon icon={icon} width="24" style={{ color: accent }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, padding: '0.35rem 0.9rem', border: `1px solid ${accent}44`, borderRadius: 9999 }}>
                    {tag}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.55rem', fontWeight: 500, color, margin: '0 0 1rem' }}>{title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.7, color: `${color}cc`, margin: 0 }}>{body}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: '2rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: accent }}>
                  {['Pillar 01', 'Pillar 02', 'Pillar 03', 'Pillar 04'][i]}
                </span>
                <div style={{ flex: 1, height: 1, background: `${accent}33` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   12. TESTIMONIALS
═══════════════════════════════════════ */

const VM_CARDS = [
  {
    icon: 'solar:eye-linear',
    label: 'Vision',
    heading: 'To be the leading technical services provider in the UAE marine and industrial sector',
    body: 'We aspire to build a reputation for excellence, reliability, and safety — becoming the partner of choice for asset owners and operators across the GCC and beyond.',
    frontBg: 'rgba(255,255,255,0.82)',
    frontBorder: 'rgba(12,35,64,0.08)',
    frontBorderTop: 'rgba(53,128,177,0.25)',
    frontInset: 'rgba(255,255,255,0.9)',
    backBg: '#0C2340',
    backBorder: 'rgba(53,128,177,0.3)',
    iconBg: 'var(--c-s100)',
    iconBorder: 'rgba(53,128,177,0.25)',
    frontImage: '/assets/light-blue-background-plain_C0PD.webp',
    frontOverlay: false,
  },
  {
    icon: 'solar:target-linear',
    label: 'Mission',
    heading: 'What drives every decision we make',
    body: 'To deliver safe, compliant, and high-quality services on every engagement — building long-term partnerships through reliability, technical excellence, and integrity in all client relationships.',
    frontBg: 'rgba(235,244,250,0.85)',
    frontBorder: 'rgba(53,128,177,0.12)',
    frontBorderTop: 'rgba(53,128,177,0.3)',
    frontInset: 'rgba(255,255,255,0.8)',
    backBg: '#162D45',
    backBorder: 'rgba(53,128,177,0.35)',
    iconBg: 'var(--c-s200)',
    iconBorder: 'rgba(53,128,177,0.3)',
    frontImage: '/assets/bef5af7e6bc17017a5694d1955cb4ae8.jpg',
    frontOverlay: true,
  },
];

function Testimonials() {
  return (
    <section style={{
      background: 'var(--c-bg)',
      padding: '7rem 0',
      position: 'relative',
      overflow: 'hidden',
    }}>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: '0.75rem' }}>
            Who We Are
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: 'var(--c-deep)', margin: 0 }}>
            Our <em>Vision & Mission</em>
          </h2>
        </div>

        {/* Flip cards */}
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
          {VM_CARDS.map(({ icon, label, heading, body, frontBg, frontBorder, frontBorderTop, frontInset, backBg, backBorder, iconBg, iconBorder, frontImage, frontOverlay }: any) => (
            <div key={label} className="reveal vm-flip" style={{ width: 340, flexShrink: 0, height: 520 }}>
              <div className="vm-card">

                {/* Front face — icon + pill title */}
                <div className="vm-face" style={{
                  background: frontBg,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: `1px solid ${frontBorder}`,
                  borderTop: `1px solid ${frontBorderTop}`,
                  boxShadow: `0 16px 56px rgba(12,35,64,0.10), inset 0 1px 0 ${frontInset}`,
                  overflow: 'hidden',
                }}>
                  {frontImage && (
                    <>
                      <div style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: `url(${frontImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: frontOverlay ? 0.55 : 1,
                        filter: frontOverlay ? 'grayscale(100%)' : 'none',
                        borderRadius: 'inherit',
                      }} />
                      {frontOverlay && (
                        <div style={{
                          position: 'absolute', inset: 0,
                          background: 'rgba(22,45,69,0.6)',
                          borderRadius: 'inherit',
                        }} />
                      )}
                    </>
                  )}
                  {/* Icon circle */}
                  <div style={{
                    position: 'relative', zIndex: 1,
                    width: 72, height: 72, borderRadius: '50%',
                    background: frontOverlay ? 'rgba(255,255,255,0.18)' : iconBg,
                    border: frontOverlay ? '1.5px solid rgba(255,255,255,0.45)' : `1px solid ${iconBorder}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: frontImage ? '0 4px 18px rgba(0,0,0,0.25)' : '0 8px 24px rgba(0,0,0,0.3)',
                  }}>
                    <iconify-icon icon={icon} width="30" style={{ color: frontOverlay ? '#ffffff' : 'var(--c-deep)' }} />
                  </div>

                  {/* Pill title */}
                  <div style={{
                    position: 'relative', zIndex: 1,
                    padding: '0.6rem 2rem',
                    border: frontOverlay ? '1px solid rgba(255,255,255,0.3)' : '1px solid var(--c-s200)',
                    borderRadius: 9999,
                    background: frontOverlay ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.6)',
                    boxShadow: frontImage ? '0 2px 12px rgba(0,0,0,0.15)' : 'none',
                  }}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.4rem', color: frontOverlay ? '#ffffff' : 'var(--c-deep)', letterSpacing: '0.01em' }}>
                      Our {label}
                    </span>
                  </div>

                  {/* Hover hint */}
                  <p style={{ position: 'relative', zIndex: 1, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: frontOverlay ? 'rgba(255,255,255,0.7)' : 'var(--c-deep)', margin: 0 }}>
                    Hover to learn more
                  </p>
                </div>

                {/* Back face — description */}
                <div className="vm-face vm-back" style={{
                  background: backBg,
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: `1px solid ${backBorder}`,
                  borderTop: `1px solid rgba(128,184,216,0.28)`,
                  boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
                }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#80B8D8', margin: 0 }}>
                    {label}
                  </p>
                  <div style={{ width: 48, height: 1, background: 'rgba(128,184,216,0.35)', borderRadius: 9999 }} />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1rem, 1.6vw, 1.35rem)', fontWeight: 500, color: '#F7FBFF', margin: 0, lineHeight: 1.4 }}>
                    {heading}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: 'rgba(198,223,240,0.82)', margin: 0 }}>
                    {body}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Touch hint for non-hover devices */}
        <p style={{ textAlign: 'center', marginTop: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-s300)' }}>
          Tap each card to explore
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   13. INDUSTRIES
═══════════════════════════════════════ */
const INDUSTRIES = [
  { title: 'Oil & Gas',           href: '/industries/oil-and-gas',        image: '/assets/oil-gas.jpg',  icon: 'solar:oil-linear',       desc: 'Rope access inspection, maintenance, and support services for onshore and offshore oil and gas facilities throughout the GCC.' },
  { title: 'Marine & Shipping',   href: '/industries/marine-and-shipping', image: '/assets/marine.jpg',   icon: 'solar:ship-linear',      desc: 'Ship repair support, vessel maintenance, hull cleaning, cargo hold cleaning, and specialist marine manpower across UAE ports.' },
  { title: 'Power & Energy',      href: '/industries/power-and-energy',    image: '/assets/power.jpg',    icon: 'solar:lightning-linear', desc: 'Power plant maintenance, shutdown support, heat exchanger cleaning, and structural services for conventional and renewable energy.' },
  { title: 'Civil & Construction',href: '/industries/civil-and-construction',image: '/assets/civil.jpg', icon: 'solar:buildings-linear', desc: 'High-rise facade maintenance, building cleaning, structural repairs, and specialist access services for commercial and industrial projects.' },
];

function Industries() {
  return (
    <section id="industries" style={{ padding: '7rem 0', background: 'var(--c-s100)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: '0.75rem' }}>Industries We Serve</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: 'var(--c-deep)', margin: 0 }}>
            Four sectors. <em>One multidisciplinary team.</em>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {INDUSTRIES.map(({ title, href, image, icon, desc }) => (
            <a key={href} href={href} className="reveal" style={{
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
              background: 'white', borderRadius: '1.75rem',
              boxShadow: '0 12px 40px rgba(12,35,64,0.09)', border: '1px solid var(--c-s200)',
              textDecoration: 'none', transition: 'box-shadow 0.3s, transform 0.3s',
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 24px 64px rgba(12,35,64,0.16)'; if (prefersHover) (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(12,35,64,0.09)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: 210, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
                  onMouseEnter={(e) => { if (prefersHover) e.currentTarget.style.transform = 'scale(1.05)'; }}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,35,64,0.5), transparent)' }} />
              </div>
              {/* Content */}
              <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 600, color: 'var(--c-deep)', margin: '0 0 0.75rem' }}>{title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--c-fg)', margin: '0 0 1.25rem', flex: 1 }}>{desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-primary)' }}>View services</span>
                  <iconify-icon icon="solar:arrow-right-linear" width="14" style={{ color: 'var(--c-primary)' }} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   13. WHY CHOOSE US
═══════════════════════════════════════ */
function WhyChoose() {
  const points = [
    'Certified rope access technicians',
    'Full HSSE compliance on every job',
    '24/7 emergency response capability',
    'Single-source multidisciplinary team',
    'Fully equipped with latest tooling',
    'Proven track record across GCC',
    'Competitive pricing with quality assurance',
    'Rapid mobilisation and deployment',
    'Experienced project management',
  ];
  const clientSectors = ['ADNOC Group', 'Dubai Petroleum', 'Drydocks World', 'DP World', 'DEWA', 'Gulf Navigation', 'Major EPC Contractors', 'Offshore Operators'];
  return (
    <section id="why-us" style={{ padding: '7rem 0', background: 'var(--c-bg)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: '0.75rem' }}>Why Choose Us</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: 'var(--c-deep)', margin: 0 }}>
            Strength across <em>every discipline</em>
          </h2>
        </div>

        {/* Points grid */}
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', marginBottom: '2rem', border: '1px solid var(--c-s200)', borderRadius: '1.5rem', overflow: 'hidden' }}>
          {points.map((point, i) => (
            <div key={point} style={{
              display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
              padding: '1.25rem 1.5rem',
              borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--c-s200)' : 'none',
              borderBottom: i < 6 ? '1px solid var(--c-s200)' : 'none',
              background: 'white',
            }}>
              <iconify-icon icon="solar:check-circle-linear" width="16" style={{ color: 'var(--c-primary)', flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '0.85rem', lineHeight: 1.55, color: 'var(--c-fg)' }}>{point}</span>
            </div>
          ))}
        </div>

        {/* Sub-cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="reveal" style={{ background: 'var(--c-s100)', borderRadius: '1.5rem', padding: '2rem', border: '1px solid var(--c-s200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
              <iconify-icon icon="solar:diploma-linear" width="20" style={{ color: 'var(--c-primary)' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--c-deep)', margin: 0 }}>Quality Assurance</h3>
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--c-fg)', margin: 0 }}>
              All works carried out under strict HSSE guidelines with documented quality control processes, third-party inspection support, and full compliance with international standards.
            </p>
          </div>
          <div className="reveal" style={{ background: 'var(--c-s100)', borderRadius: '1.5rem', padding: '2rem', border: '1px solid var(--c-s200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
              <iconify-icon icon="solar:buildings-linear" width="20" style={{ color: 'var(--c-primary)' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--c-deep)', margin: 0 }}>Client Sectors</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {clientSectors.map((sector) => (
                <span key={sector} style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'white', color: 'var(--c-fg)', padding: '0.35rem 0.75rem', borderRadius: 9999, border: '1px solid var(--c-s200)' }}>
                  {sector}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   14. CTA BANNER
═══════════════════════════════════════ */
function CTABanner() {
  return (
    <section style={{ background: 'var(--c-deep)', padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle radial glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 400, background: 'radial-gradient(ellipse, rgba(53,128,177,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', position: 'relative', zIndex: 1 }}>
        <div className="reveal">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 500, color: '#F5F5F4', margin: '0 0 0.75rem', maxWidth: 560, lineHeight: 1.2 }}>
            Let&apos;s build something <em>reliable together</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.65, color: 'rgba(245,245,244,0.65)', margin: 0 }}>
            Contact us for a project consultation or emergency support.
          </p>
        </div>
        <div className="reveal" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="/contact" style={{
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            background: 'var(--c-primary)', color: 'white', border: 'none', borderRadius: 9999,
            padding: '1rem 2.25rem', cursor: 'pointer', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: '0 8px 32px rgba(53,128,177,0.35)', transition: 'transform 0.2s, opacity 0.2s',
          }}
            onMouseEnter={(e) => { if (prefersHover) (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}>
            <iconify-icon icon="solar:document-text-linear" width="16" />
            Request a Quotation
          </a>
          <a href="tel:+971" style={{
            fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            background: 'transparent', color: 'rgba(245,245,244,0.85)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 9999, padding: '1rem 2.25rem', cursor: 'pointer', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 8, transition: 'border-color 0.2s',
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.5)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'; }}>
            <iconify-icon icon="solar:phone-linear" width="16" />
            Call Us 24/7
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   PAGE ROOT
═══════════════════════════════════════ */
export default function CasaFlowPage() {
  useReveal('.reveal');

  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Testimonials />
        <Industries />
        <Payment />
        <WhyChoose />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
