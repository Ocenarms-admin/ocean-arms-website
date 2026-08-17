"use client";

import { useState, useEffect, useRef } from "react";

/* ═══ DESIGN TOKENS ═══ */
const C = {
  bg: "#FFFFFF",
  bgAlt: "#F7F7F5",
  dark: "#0A0A0A",
  darkCard: "#111111",
  accent: "#6366F1",   // indigo
  accentHover: "#4F46E5",
  text: "#0A0A0A",
  muted: "#71717A",
  border: "#E4E4E7",
  borderDark: "rgba(255,255,255,0.1)",
  white: "#FFFFFF",
};

/* ═══ TINY ICONS ═══ */
function IconArrow({ dir = "right", size = 16, color = "currentColor" }: { dir?: "right" | "up-right" | "down"; size?: number; color?: string }) {
  const d =
    dir === "right"
      ? "M5 12h14M13 6l6 6-6 6"
      : dir === "up-right"
      ? "M7 17L17 7M7 7h10v10"
      : "M12 5v14M6 13l6 6 6-6";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
    >
      <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

/* ═══ ANIMATED COUNTER ═══ */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start = 0;
        const step = target / 60;
        const tick = () => {
          start += step;
          if (start >= target) { setVal(target); return; }
          setVal(Math.floor(start));
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ═══ ROTATING SCROLL LABEL ═══ */
function ScrollLabel() {
  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: "10s" }}>
        <defs>
          <path id="circle" d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" />
        </defs>
        <text fontSize="11" fill={C.text} fontWeight="600" letterSpacing="3">
          <textPath href="#circle">SCROLL TO EXPLORE • SCROLL TO EXPLORE •</textPath>
        </text>
      </svg>
      <div style={{ background: C.dark }} className="w-10 h-10 rounded-full flex items-center justify-center">
        <IconArrow dir="down" size={16} color={C.white} />
      </div>
    </div>
  );
}

/* ═══ NAV DROPDOWN ═══ */
function NavDropdown({ label, items }: { label: string; items: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 text-sm font-medium hover:opacity-70 transition-opacity">
        {label} <IconChevron open={open} />
      </button>
      {open && (
        <div
          style={{ background: C.white, border: `1px solid ${C.border}`, top: "calc(100% + 8px)" }}
          className="absolute left-0 w-52 rounded-lg shadow-xl z-50 overflow-hidden"
        >
          {items.map((item) => (
            <a
              key={item}
              href="#"
              style={{ borderBottom: `1px solid ${C.border}` }}
              className="block px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors last:border-0"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══ HERO CAROUSEL ═══ */
const heroSlides = [
  { bg: "#0A0A0A", accent: C.accent, label: "Brand Strategy" },
  { bg: "#1A1A2E", accent: "#EC4899", label: "Creative Development" },
  { bg: "#0F2027", accent: "#10B981", label: "Digital Experience" },
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % heroSlides.length), 3500);
    return () => clearInterval(t);
  }, []);
  const slide = heroSlides[current];
  return (
    <div
      style={{ background: slide.bg, transition: "background 0.8s ease" }}
      className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden"
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60%",
          background: `linear-gradient(to top, ${slide.accent}33, transparent)`,
          transition: "all 0.8s ease",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          style={{ border: `2px solid ${slide.accent}55` }}
          className="w-20 h-20 rounded-full flex items-center justify-center"
        >
          <div style={{ background: slide.accent }} className="w-10 h-10 rounded-full" />
        </div>
      </div>
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
        <span
          style={{ background: `${slide.accent}22`, color: slide.accent, border: `1px solid ${slide.accent}44` }}
          className="text-xs font-bold px-3 py-1 rounded-full"
        >
          {slide.label}
        </span>
        <div className="flex gap-1.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{ background: i === current ? C.white : `${C.white}44`, width: i === current ? 20 : 6 }}
              className="h-1.5 rounded-full transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══ PROJECT CARD ═══ */
function ProjectCard({ title, tags, color }: { title: string; tags: string[]; color: string }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group cursor-pointer"
      style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: "1.5rem", marginBottom: "1.5rem" }}
    >
      <div style={{ background: color, borderRadius: "1rem", overflow: "hidden" }} className="relative h-48 sm:h-56 mb-4">
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            opacity: hover ? 1 : 0,
            transition: "opacity 0.3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ background: C.white, borderRadius: "50%" }} className="w-12 h-12 flex items-center justify-center">
            <IconArrow dir="up-right" size={18} color={C.dark} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex gap-2 mb-2">
            {tags.map((t) => (
              <span
                key={t}
                style={{ background: C.bgAlt, color: C.muted, fontSize: "11px" }}
                className="px-2.5 py-1 rounded-full font-medium uppercase tracking-wide"
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="font-bold text-lg" style={{ color: C.text }}>
            {title}
          </h3>
        </div>
        <div
          style={{
            border: `1.5px solid ${C.border}`,
            borderRadius: "50%",
            transform: hover ? "rotate(-45deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}
          className="w-10 h-10 flex items-center justify-center shrink-0 ml-4"
        >
          <IconArrow dir="up-right" size={14} color={C.dark} />
        </div>
      </div>
    </div>
  );
}

/* ═══ SERVICE CARD ═══ */
function ServiceCard({ emoji, title, tags, delay }: { emoji: string; title: string; tags: string[]; delay: number }) {
  return (
    <div
      style={{
        border: `1px solid ${C.border}`,
        borderRadius: "1.25rem",
        padding: "1.75rem",
        background: C.white,
        animationDelay: `${delay}ms`,
      }}
      className="hover:shadow-lg transition-shadow"
    >
      <span className="text-4xl block mb-4">{emoji}</span>
      <h3 className="font-bold text-xl mb-3" style={{ color: C.text }}>
        {title}
      </h3>
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((t) => (
          <span
            key={t}
            style={{ background: C.bgAlt, color: C.muted, fontSize: "12px" }}
            className="px-3 py-1 rounded-full font-medium"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══ TESTIMONIAL CARD ═══ */
function TestimonialCard({ quote, name, role, initials, color }: { quote: string; name: string; role: string; initials: string; color: string }) {
  return (
    <div
      style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: "1.25rem", padding: "1.75rem" }}
      className="flex flex-col h-full"
    >
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: "#F59E0B" }} className="text-base">★</span>
        ))}
      </div>
      <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: C.muted }}>
        "{quote}"
      </p>
      <div className="flex items-center gap-3">
        <div
          style={{ background: color, color: C.white, borderRadius: "50%" }}
          className="w-10 h-10 flex items-center justify-center font-bold text-sm shrink-0"
        >
          {initials}
        </div>
        <div>
          <p className="font-bold text-sm" style={{ color: C.text }}>{name}</p>
          <p className="text-xs" style={{ color: C.muted }}>{role}</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   PAGE
═══════════════════════════════════════ */
export default function RayoPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── NAV ── */}
      <header
        style={{ background: `${C.white}ee`, backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 50 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 font-extrabold text-xl tracking-tight" style={{ color: C.dark }}>
            <div style={{ background: C.dark, borderRadius: "6px" }} className="w-7 h-7 flex items-center justify-center">
              <span style={{ color: C.white, fontSize: "13px", fontWeight: 900 }}>R</span>
            </div>
            rayo
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" style={{ color: C.text }}>
            <NavDropdown
              label="Home"
              items={["Main", "Software Dev", "Freelancer", "Agency", "Studio", "Portfolio", "Web Agency", "Developer", "Designer"]}
            />
            <NavDropdown label="Works" items={["Portfolio Grid", "Portfolio Masonry", "Project Details"]} />
            <NavDropdown label="Pages" items={["About", "Services", "Team", "Pricing", "FAQ", "404", "Landing Page"]} />
            <a href="#insights" className="text-sm font-medium hover:opacity-70 transition-opacity">Insights</a>
            <a href="#contact" className="text-sm font-medium hover:opacity-70 transition-opacity">Contact</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              style={{ background: C.dark, color: C.white, borderRadius: "8px" }}
              className="px-5 py-2.5 text-sm font-bold hover:opacity-80 transition-opacity"
            >
              Let's talk
            </a>
          </div>

          <button className="md:hidden p-1" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>

        {mobileOpen && (
          <div style={{ background: C.white, borderTop: `1px solid ${C.border}` }} className="md:hidden px-6 py-4 space-y-3">
            {["Home", "Works", "Pages", "Insights", "Contact"].map((item) => (
              <a key={item} href="#" className="block py-2 text-sm font-medium hover:opacity-60 transition-opacity">
                {item}
              </a>
            ))}
            <a
              href="#contact"
              style={{ background: C.dark, color: C.white, borderRadius: "8px" }}
              className="block text-center mt-3 px-5 py-3 text-sm font-bold"
            >
              Let's talk
            </a>
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────
          HERO
      ───────────────────────────────────── */}
      <section style={{ background: C.bg, paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div
                style={{ background: C.bgAlt, color: C.muted, borderRadius: "999px", display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600, padding: "6px 14px", marginBottom: "1.5rem" }}
              >
                🦄 Innovative design and cutting-edge development
              </div>

              <h1
                style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 900, lineHeight: 1.05, color: C.dark, marginBottom: "1.5rem" }}
              >
                Design, tech<br />
                and some{" "}
                <span style={{ color: C.accent }}>magic</span>
                <span style={{ color: C.accent }}>.</span>
              </h1>

              <p style={{ color: C.muted, fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "440px", marginBottom: "2.5rem" }}>
                We are a creative digital agency specialising in innovative design
                and cutting-edge development. Let's build something remarkable together.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#works"
                  style={{ background: C.dark, color: C.white, borderRadius: "8px", padding: "14px 28px", fontWeight: 700, fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "8px" }}
                  className="hover:opacity-80 transition-opacity"
                >
                  View our work <IconArrow dir="up-right" size={15} color={C.white} />
                </a>
                <a
                  href="#contact"
                  style={{ color: C.dark, fontWeight: 700, fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "8px", borderBottom: `2px solid ${C.dark}`, paddingBottom: "2px" }}
                  className="hover:opacity-60 transition-opacity"
                >
                  Start a project
                </a>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4 mt-10" style={{ color: C.muted, fontSize: "13px" }}>
                <span style={{ fontWeight: 600 }}>Follow us:</span>
                {["Dribbble", "Behance", "Instagram"].map((s) => (
                  <a key={s} href="#" className="hover:opacity-60 transition-opacity font-medium">
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Right — carousel + scroll label */}
            <div className="flex flex-col items-end gap-4">
              <HeroCarousel />
              <div className="self-start ml-2">
                <ScrollLabel />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          STATS
      ───────────────────────────────────── */}
      <section style={{ background: C.dark, padding: "4rem 0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 120, suffix: "+", label: "Happy clients who trust our work" },
              { value: 94, suffix: "%", label: "Clients come back for new projects" },
              { value: 8, suffix: "+", label: "Years of professional experience" },
              { value: 340, suffix: "+", label: "Successfully completed projects" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-2">
                <p style={{ fontSize: "3rem", fontWeight: 900, lineHeight: 1, color: C.white }}>
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: 1.5 }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          SERVICES
      ───────────────────────────────────── */}
      <section style={{ background: C.bgAlt, padding: "5rem 0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p style={{ color: C.accent, fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                What we offer
              </p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, lineHeight: 1.1, color: C.dark }}>
                Our services
              </h2>
            </div>
            <a
              href="#"
              style={{ color: C.dark, fontWeight: 700, fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "8px", borderBottom: `2px solid ${C.dark}`, paddingBottom: "2px", whiteSpace: "nowrap" }}
              className="hover:opacity-60 transition-opacity"
            >
              All services <IconArrow size={14} color={C.dark} />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <ServiceCard
              emoji="🎨"
              title="Digital Art & Graphic Design"
              tags={["UI/UX", "Web", "Packaging", "Motion", "3D"]}
              delay={0}
            />
            <ServiceCard
              emoji="⚡"
              title="Creative Development"
              tags={["Frontend", "Interactions", "Backend", "Mobile"]}
              delay={80}
            />
            <ServiceCard
              emoji="✦"
              title="Brand Identity"
              tags={["Strategy", "Logo", "Guidelines", "Rebranding"]}
              delay={160}
            />
            <ServiceCard
              emoji="📣"
              title="Digital Marketing"
              tags={["Strategy", "Social", "SEO", "Campaigns"]}
              delay={240}
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          FEATURED WORKS
      ───────────────────────────────────── */}
      <section id="works" style={{ background: C.bg, padding: "5rem 0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p style={{ color: C.accent, fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                Portfolio
              </p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, lineHeight: 1.1, color: C.dark }}>
                Featured projects
              </h2>
            </div>
            <a
              href="#"
              style={{ color: C.dark, fontWeight: 700, fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "8px", borderBottom: `2px solid ${C.dark}`, paddingBottom: "2px", whiteSpace: "nowrap" }}
              className="hover:opacity-60 transition-opacity"
            >
              View all work <IconArrow size={14} color={C.dark} />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard title="Luminary Brand Identity" tags={["Branding", "Design"]} color="#E0E7FF" />
            <ProjectCard title="Nova E-Commerce Platform" tags={["UI/UX", "Development"]} color="#D1FAE5" />
            <ProjectCard title="Vortex Mobile App" tags={["Mobile", "UI/UX"]} color="#FEF3C7" />
            <ProjectCard title="Pulse Marketing Campaign" tags={["Marketing", "Strategy"]} color="#FCE7F3" />
            <ProjectCard title="Orbit SaaS Dashboard" tags={["Development", "Design"]} color="#E0F2FE" />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          APPROACH
      ───────────────────────────────────── */}
      <section style={{ background: C.dark, padding: "5rem 0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              How we work
            </p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, lineHeight: 1.1, color: C.white }}>
              Our approach
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { emoji: "🎯", label: "Perfection", desc: "Every pixel, every line of code crafted with precision." },
              { emoji: "💡", label: "Innovative", desc: "Pushing boundaries with fresh ideas and bold thinking." },
              { emoji: "🏆", label: "Expertise", desc: "Years of experience across design and development." },
              { emoji: "🔄", label: "Full-Cycle", desc: "From concept to launch — we handle everything." },
              { emoji: "🤝", label: "Client Success", desc: "Your goals drive every decision we make." },
            ].map((item) => (
              <div
                key={item.label}
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1.25rem", padding: "1.75rem 1.25rem", textAlign: "center" }}
                className="hover:border-indigo-500 transition-colors"
              >
                <span className="text-3xl block mb-3">{item.emoji}</span>
                <h4 style={{ color: C.white, fontWeight: 800, fontSize: "15px", marginBottom: "0.5rem" }}>{item.label}</h4>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          TESTIMONIALS
      ───────────────────────────────────── */}
      <section style={{ background: C.bgAlt, padding: "5rem 0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p style={{ color: C.accent, fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                What clients say
              </p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, lineHeight: 1.1, color: C.dark }}>
                Testimonials
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <TestimonialCard
              quote="Working with Rayo transformed our brand. The attention to detail and creative execution was beyond what we expected."
              name="Lea Tomato"
              role="CEO, Harvest Co."
              initials="LT"
              color="#F87171"
            />
            <TestimonialCard
              quote="Incredible team — they delivered a world-class product and were communicative and professional throughout."
              name="Ashley Cherry"
              role="Marketing Director, NovaTech"
              initials="AC"
              color="#FB7185"
            />
            <TestimonialCard
              quote="The website they built for us increased conversions by 40% in the first month. Absolutely phenomenal work."
              name="Patrick Pineapple"
              role="Founder, ZestLab"
              initials="PP"
              color="#FBBF24"
            />
            <TestimonialCard
              quote="Creative, fast, and reliable. Rayo understood our vision from the first call and delivered it perfectly."
              name="John Lemon"
              role="Product Lead, Citrus Digital"
              initials="JL"
              color="#34D399"
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          INSIGHTS / BLOG
      ───────────────────────────────────── */}
      <section id="insights" style={{ background: C.bg, padding: "5rem 0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p style={{ color: C.accent, fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                Knowledge
              </p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, lineHeight: 1.1, color: C.dark }}>
                Recent insights
              </h2>
            </div>
            <a
              href="#"
              style={{ color: C.dark, fontWeight: 700, fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "8px", borderBottom: `2px solid ${C.dark}`, paddingBottom: "2px", whiteSpace: "nowrap" }}
              className="hover:opacity-60 transition-opacity"
            >
              All articles <IconArrow size={14} color={C.dark} />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { cat: "Design", title: "The future of UI design: trends to watch in 2026", date: "Mar 12, 2026", color: "#E0E7FF" },
              { cat: "Development", title: "Why performance-first development wins clients", date: "Feb 28, 2026", color: "#D1FAE5" },
              { cat: "Branding", title: "How a strong brand identity drives business growth", date: "Feb 10, 2026", color: "#FEF3C7" },
            ].map((post) => (
              <article
                key={post.title}
                style={{ border: `1px solid ${C.border}`, borderRadius: "1.25rem", overflow: "hidden", background: C.white, cursor: "pointer" }}
                className="group hover:shadow-lg transition-shadow"
              >
                <div style={{ background: post.color, height: "180px" }} className="relative">
                  <span
                    style={{ position: "absolute", top: "1rem", left: "1rem", background: C.dark, color: C.white, fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "999px" }}
                  >
                    {post.cat}
                  </span>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <p style={{ color: C.muted, fontSize: "12px", marginBottom: "0.5rem" }}>{post.date}</p>
                  <h3 style={{ fontWeight: 800, fontSize: "17px", lineHeight: 1.35, color: C.dark, marginBottom: "1rem" }}>
                    {post.title}
                  </h3>
                  <a
                    href="#"
                    style={{ color: C.accent, fontWeight: 700, fontSize: "13px", display: "inline-flex", alignItems: "center", gap: "6px" }}
                    className="group-hover:gap-2 transition-all"
                  >
                    Read article <IconArrow size={13} color={C.accent} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          CTA BAND
      ───────────────────────────────────── */}
      <section style={{ background: C.accent, padding: "4rem 0" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 900, color: C.white, lineHeight: 1.2 }}>
            Ready to build something<br className="hidden sm:block" /> remarkable?
          </h2>
          <a
            href="#contact"
            style={{ background: C.white, color: C.accent, borderRadius: "8px", padding: "14px 28px", fontWeight: 800, fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap" }}
            className="hover:opacity-90 transition-opacity shrink-0"
          >
            Start a project <IconArrow dir="up-right" size={15} color={C.accent} />
          </a>
        </div>
      </section>

      {/* ─────────────────────────────────────
          FOOTER
      ───────────────────────────────────── */}
      <footer id="contact" style={{ background: C.dark, color: C.white, padding: "4rem 0 2rem" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10" style={{ borderBottom: `1px solid rgba(255,255,255,0.1)` }}>
            {/* Brand */}
            <div className="lg:col-span-2">
              <a href="#" className="flex items-center gap-2 font-extrabold text-xl tracking-tight mb-4" style={{ color: C.white }}>
                <div style={{ background: C.white, borderRadius: "6px" }} className="w-7 h-7 flex items-center justify-center">
                  <span style={{ color: C.dark, fontSize: "13px", fontWeight: 900 }}>R</span>
                </div>
                rayo
              </a>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", lineHeight: 1.7, maxWidth: "340px", marginBottom: "1.5rem" }}>
                A creative digital agency specialising in innovative design and
                cutting-edge development. Let's build something remarkable.
              </p>
              {/* Newsletter */}
              <div className="flex gap-2 mt-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: C.white, borderRadius: "8px", padding: "10px 14px", fontSize: "13px", flex: 1, outline: "none" }}
                />
                <button
                  style={{ background: C.accent, color: C.white, borderRadius: "8px", padding: "10px 16px", fontSize: "13px", fontWeight: 700 }}
                  className="hover:opacity-90 transition-opacity shrink-0"
                >
                  Subscribe
                </button>
              </div>
            </div>

            {/* Links */}
            <div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
                Company
              </p>
              <ul className="space-y-2.5">
                {["Home", "About", "Works", "Services", "Insights", "Contact"].map((link) => (
                  <li key={link}>
                    <a href="#" style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }} className="hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + Social */}
            <div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
                Get in touch
              </p>
              <ul className="space-y-2.5 mb-6">
                <li>
                  <a href="mailto:hello@rayostudio.com" style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }} className="hover:text-white transition-colors">
                    hello@rayostudio.com
                  </a>
                </li>
                <li>
                  <a href="tel:+12127089400" style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }} className="hover:text-white transition-colors">
                    +1 212-708-9400
                  </a>
                </li>
              </ul>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                Follow us
              </p>
              <div className="flex flex-wrap gap-2">
                {["Dribbble", "Behance", "Instagram", "GitHub"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", fontSize: "12px", padding: "5px 10px", borderRadius: "6px" }}
                    className="hover:bg-white/20 hover:text-white transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6" style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>
            <p>© 2026 Rayo Studio. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
