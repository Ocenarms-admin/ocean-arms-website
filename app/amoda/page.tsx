"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── tiny SVG icons ─── */
function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div
        style={{ background: "#2563EB" }}
        className="h-8 w-8 flex items-center justify-center text-white text-sm font-bold rounded"
      >
        A
      </div>
      <span className="font-bold text-white text-lg tracking-tight">Amoda</span>
    </div>
  );
}

function ChevronDown({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function CheckCircle() {
  return (
    <svg className="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#2563EB" opacity=".12" />
      <path d="M8 12l3 3 5-5" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Browser mockup placeholder ─── */
function BrowserMock({
  label,
  color = "#e8edf5",
  height = 140,
}: {
  label: string;
  color?: string;
  height?: number;
}) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white">
      {/* browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 border-b border-gray-200">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <div className="ml-2 flex-1 bg-white rounded-sm h-4 border border-gray-200 text-[9px] text-gray-400 flex items-center px-2">
          amoda-demo.com
        </div>
      </div>
      <div style={{ background: color, height }} className="flex items-center justify-center">
        <span className="font-bold text-gray-500 text-sm tracking-wide">{label}</span>
      </div>
    </div>
  );
}

/* ─── Feature icon placeholder ─── */
function FeatureIcon({ emoji }: { emoji: string }) {
  return (
    <div
      style={{ background: "#EFF6FF" }}
      className="h-11 w-11 rounded-xl flex items-center justify-center text-xl"
    >
      {emoji}
    </div>
  );
}

/* ─── FAQ item ─── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors"
      >
        {q}
        <span
          style={{ color: "#2563EB" }}
          className="ml-4 shrink-0 transition-transform"
          aria-hidden
        >
          <ChevronDown />
        </span>
      </button>
      {open && (
        <p className="pb-4 text-sm text-gray-500 leading-relaxed pr-8">{a}</p>
      )}
    </div>
  );
}

/* ─── underline highlight ─── */
function BlueUnderline({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ color: "#2563EB" }} className="relative">
      {children}
      <span
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-4px",
          left: 0,
          width: "100%",
          height: "3px",
          background: "#2563EB",
          borderRadius: "2px",
        }}
      />
    </span>
  );
}

/* ═══════════════════════════════════════
   PAGE
═══════════════════════════════════════ */
export default function AmodaPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="font-sans" style={{ color: "#0F172A", background: "#fff" }}>

      {/* ── TOPBAR ── */}
      <div style={{ background: "#2563EB" }} className="hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-1.5 text-xs text-blue-100">
          <span>✨ The Most Complete Multipurpose HTML Template</span>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">Changelog</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </div>

      {/* ── NAV ── */}
      <header style={{ background: "#0F172A" }} className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-3.5">
          <Logo />

          {/* desktop nav */}
          <nav className="hidden md:flex items-center gap-7 text-sm text-gray-300">
            {["Home", "Pages", "Portfolio", "Elements", "Blog"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                {item}
                {(item === "Pages" || item === "Portfolio") && <ChevronDown />}
              </a>
            ))}
            <a
              href="#"
              style={{ background: "#2563EB" }}
              className="ml-2 px-5 py-2 text-white text-sm font-semibold rounded hover:opacity-90 transition-opacity"
            >
              Buy Now
            </a>
          </nav>

          {/* mobile hamburger */}
          <button
            className="md:hidden text-gray-300 hover:text-white p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {mobileOpen && (
          <div style={{ background: "#1E293B" }} className="md:hidden border-t border-white/10 px-6 py-4 space-y-3 text-sm text-gray-300">
            {["Home", "Pages", "Portfolio", "Elements", "Blog"].map((item) => (
              <a key={item} href="#" className="block py-1.5 hover:text-white">
                {item}
              </a>
            ))}
            <a
              href="#"
              style={{ background: "#2563EB" }}
              className="block text-center mt-3 px-5 py-2.5 text-white font-semibold rounded"
            >
              Buy Now
            </a>
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────
          HERO
      ───────────────────────────────────── */}
      <section style={{ background: "#F1F5F9" }} className="pt-16 pb-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            {/* badge */}
            <span
              style={{ background: "#EFF6FF", color: "#2563EB" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            >
              <span style={{ background: "#2563EB" }} className="w-1.5 h-1.5 rounded-full" />
              Multipurpose Creative HTML Template
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-gray-900 mb-6">
              Position Yourself As<br />
              The Only{" "}
              <BlueUnderline>Logical Option</BlueUnderline>
            </h1>

            <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
              A premium multipurpose template built for agencies, portfolios, and
              creative businesses — packed with demos, blocks, and all the elements
              you need to launch fast.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
              <a
                href="#"
                style={{ background: "#2563EB" }}
                className="px-7 py-3.5 text-white text-sm font-bold rounded hover:opacity-90 transition-opacity shadow-lg"
              >
                Get Started Now
              </a>
              <a
                href="#demos"
                className="px-7 py-3.5 text-sm font-bold rounded border-2 border-gray-200 text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors bg-white"
              >
                View All Demos →
              </a>
            </div>
          </div>

          {/* Browser mockups */}
          <div className="flex items-end justify-center gap-6 pb-0">
            <div className="flex-1 max-w-xs transform -rotate-1 -translate-y-2">
              <BrowserMock label="Lunex" color="#D1E8FF" height={180} />
            </div>
            <div className="flex-1 max-w-sm z-10 transform rotate-0 translate-y-4">
              <BrowserMock label="Armada" color="#1E3A5F" height={220} />
            </div>
            <div className="flex-1 max-w-xs transform rotate-1 -translate-y-2">
              <BrowserMock label="Auvora" color="#EDE9FE" height={180} />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          KEY FUNCTIONALITIES
      ───────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p style={{ color: "#2563EB" }} className="text-xs font-bold uppercase tracking-widest mb-3">
              Why Choose Amoda
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Key Website{" "}
              <BlueUnderline>Functionalities</BlueUnderline>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                emoji: "🎨",
                title: "Multiple Demo Sites",
                desc: "9+ complete, unique demo websites ready to use — simply pick your favourite and customise.",
              },
              {
                emoji: "📄",
                title: "Unique Page Layouts",
                desc: "Dozens of beautifully crafted inner pages: About, Services, Pricing, Blog and more.",
              },
              {
                emoji: "🧩",
                title: "Blocks & Elements",
                desc: "199+ pre-built UI blocks and elements to assemble any section in minutes.",
              },
              {
                emoji: "🛒",
                title: "eCommerce Ready",
                desc: "Shop pages, product cards, cart and checkout layouts included out of the box.",
              },
              {
                emoji: "📝",
                title: "Blog Templates",
                desc: "Multiple blog grid and list layouts with single post, author, and category pages.",
              },
              {
                emoji: "🛡️",
                title: "First Class Support",
                desc: "Dedicated support team with a 24-hour response time and comprehensive documentation.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group p-7 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all bg-white"
              >
                <FeatureIcon emoji={f.emoji} />
                <h3 className="mt-4 text-lg font-bold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          DEMO WEBSITES
      ───────────────────────────────────── */}
      <section id="demos" style={{ background: "#F8FAFC" }} className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p style={{ color: "#2563EB" }} className="text-xs font-bold uppercase tracking-widest mb-3">
              Ready To Launch
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Start Building With 9+ Complete{" "}
              <BlueUnderline>Demo Websites</BlueUnderline>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[
              { label: "Lunex", color: "#BFDBFE" },
              { label: "Camping", color: "#BBF7D0" },
              { label: "Latitude", color: "#FDE68A" },
              { label: "Auvora", color: "#E9D5FF" },
              { label: "Amato", color: "#FECACA" },
              { label: "Finesse", color: "#FBCFE8" },
              { label: "Forma", color: "#BAE6FD" },
              { label: "Career", color: "#D1FAE5" },
              { label: "Finance", color: "#FEF3C7" },
              { label: "Coming Soon", color: "#E5E7EB" },
            ].map((d) => (
              <div key={d.label} className="group cursor-pointer">
                <BrowserMock label={d.label} color={d.color} height={110} />
                <p className="mt-2 text-center text-xs font-semibold text-gray-600 group-hover:text-blue-600 transition-colors">
                  {d.label}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="#"
              style={{ background: "#2563EB" }}
              className="inline-block px-8 py-3.5 text-white text-sm font-bold rounded hover:opacity-90 transition-opacity"
            >
              Explore All Demos
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          PREMIUM FEATURES FOR FREE
      ───────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ color: "#2563EB" }} className="text-xs font-bold uppercase tracking-widest mb-4">
                No Extra Cost
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
                Premium And Exclusive{" "}
                <BlueUnderline>Features</BlueUnderline>{" "}
                For Free
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Every feature you see is included with your one-time purchase — no
                subscriptions, no upsells. Just a complete, production-ready
                template kit.
              </p>
              <ul className="space-y-3">
                {[
                  "One-time purchase, lifetime access",
                  "Regular free updates included",
                  "6 months premium support",
                  "Detailed documentation & video guides",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { emoji: "⚡", label: "Fast Performance" },
                { emoji: "📱", label: "Fully Responsive" },
                { emoji: "🎯", label: "SEO Ready" },
                { emoji: "🌙", label: "Dark Mode" },
                { emoji: "🔌", label: "Plugin Ready" },
                { emoji: "♿", label: "Accessible" },
                { emoji: "🗂️", label: "Mega Menu" },
                { emoji: "🎞️", label: "Animations" },
                { emoji: "📦", label: "PSD Files" },
              ].map((f) => (
                <div
                  key={f.label}
                  style={{ background: "#F8FAFC" }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl text-center hover:shadow-md transition-shadow"
                >
                  <span className="text-2xl">{f.emoji}</span>
                  <span className="text-xs font-semibold text-gray-600">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          SUPERIOR METHODOLOGY
      ───────────────────────────────────── */}
      <section style={{ background: "#F1F5F9" }} className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* visual */}
            <div className="relative flex justify-center">
              <div className="relative w-48 sm:w-56">
                {/* phone */}
                <div
                  style={{ background: "#1E293B", borderRadius: "2rem" }}
                  className="w-full aspect-[9/19] shadow-2xl overflow-hidden p-3"
                >
                  <div style={{ background: "#2563EB", borderRadius: "1.5rem" }} className="w-full h-full" />
                </div>
                {/* floating browser card */}
                <div className="absolute -right-16 sm:-right-24 top-10 w-40 sm:w-52 shadow-xl rounded-xl overflow-hidden border border-gray-200 bg-white">
                  <BrowserMock label="Auvora" color="#EDE9FE" height={80} />
                </div>
              </div>
            </div>

            {/* steps */}
            <div>
              <p style={{ color: "#2563EB" }} className="text-xs font-bold uppercase tracking-widest mb-4">
                How It Works
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8">
                A Superior Website{" "}
                <BlueUnderline>Creation</BlueUnderline>{" "}
                Methodology
              </h2>
              <div className="space-y-6">
                {[
                  {
                    n: "01",
                    title: "Choose Your Demo",
                    desc: "Browse 9+ complete demo sites and pick the one that best matches your vision.",
                  },
                  {
                    n: "02",
                    title: "Customise Your Design",
                    desc: "Swap colors, fonts, images, and content in minutes with clean, well-organised code.",
                  },
                  {
                    n: "03",
                    title: "Mix & Match Blocks",
                    desc: "Use 199+ pre-built sections to create any page layout you can imagine.",
                  },
                  {
                    n: "04",
                    title: "Launch With Confidence",
                    desc: "SEO-ready, optimised, and fully tested across all major browsers and devices.",
                  },
                ].map((step) => (
                  <div key={step.n} className="flex gap-5 items-start">
                    <span
                      style={{ background: "#EFF6FF", color: "#2563EB" }}
                      className="text-sm font-extrabold w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    >
                      {step.n}
                    </span>
                    <div>
                      <h4 className="font-bold text-gray-900">{step.title}</h4>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          READY BLOCKS (DARK)
      ───────────────────────────────────── */}
      <section style={{ background: "#0A0F1C" }} className="py-24 relative overflow-hidden">
        {/* subtle grid bg */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <p style={{ color: "#60A5FA" }} className="text-xs font-bold uppercase tracking-widest mb-4">
            Ultimate Flexibility
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Start Designing With Ready<br />
            <span style={{ color: "#2563EB" }}>Blocks</span> And{" "}
            <span style={{ color: "#2563EB" }}>Elements</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-8">
            Mix and match 199+ blocks to build any page you can imagine — headers,
            heroes, features, pricing, contact forms, footers, and much more.
          </p>
          <a
            href="#"
            style={{ background: "#2563EB" }}
            className="inline-block px-8 py-3.5 text-white text-sm font-bold rounded hover:opacity-90 transition-opacity mb-16"
          >
            Explore All Elements
          </a>

          {/* element categories */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 max-w-2xl mx-auto mb-14">
            {[
              { emoji: "🔤", label: "Typography" },
              { emoji: "🎛️", label: "Grid Layouts" },
              { emoji: "🗂️", label: "Headers" },
              { emoji: "🦸", label: "Hero Sections" },
              { emoji: "✨", label: "Features" },
              { emoji: "💬", label: "Testimonials" },
              { emoji: "💰", label: "Pricing" },
              { emoji: "📬", label: "Contact" },
              { emoji: "🔗", label: "Footers" },
              { emoji: "🎠", label: "Sliders" },
            ].map((el) => (
              <div
                key={el.label}
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:border-blue-600 transition-colors"
              >
                <span className="text-2xl">{el.emoji}</span>
                <span className="text-xs text-gray-400">{el.label}</span>
              </div>
            ))}
          </div>

          {/* device stack */}
          <div className="flex items-end justify-center gap-4">
            <div
              style={{ background: "#1E293B", borderRadius: "1.5rem", width: 90, height: 160 }}
              className="shadow-2xl flex items-center justify-center"
            >
              <div style={{ background: "#2563EB", borderRadius: "1rem", width: 70, height: 130 }} />
            </div>
            <div
              style={{ background: "#1E293B", borderRadius: "1rem", width: 220, height: 140 }}
              className="shadow-2xl flex items-center justify-center"
            >
              <div style={{ background: "#172554", borderRadius: "0.75rem", width: 200, height: 115 }} className="flex items-center justify-center">
                <span className="text-blue-400 text-xs font-bold">Amoda Template</span>
              </div>
            </div>
            <div
              style={{ background: "#1E293B", borderRadius: "1.5rem", width: 90, height: 160 }}
              className="shadow-2xl flex items-center justify-center"
            >
              <div style={{ background: "#1D4ED8", borderRadius: "1rem", width: 70, height: 130 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          STATS BAR
      ───────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-10 text-center">
            {[
              { stat: "199+", label: "Exclusive Elements", emoji: "🧩" },
              { stat: "100%", label: "Fully Responsive For Any Device", emoji: "📱" },
              { stat: "9+", label: "Flexible Header & Menu Templates", emoji: "🎛️" },
            ].map((s) => (
              <div key={s.stat} className="flex flex-col items-center gap-2">
                <span className="text-4xl">{s.emoji}</span>
                <span style={{ color: "#2563EB" }} className="text-4xl font-extrabold">
                  {s.stat}
                </span>
                <span className="text-sm text-gray-500 font-medium max-w-[180px]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          SHOP & BLOG
      ───────────────────────────────────── */}
      <section style={{ background: "#F8FAFC" }} className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ color: "#2563EB" }} className="text-xs font-bold uppercase tracking-widest mb-4">
                Shop & Blog
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                Quickly Launch a Modern Shop &{" "}
                <BlueUnderline>Blog</BlueUnderline>{" "}
                With Beautiful Pages
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Complete eCommerce layouts and blog templates are ready — just drop
                in your content and go live.
              </p>
              <div className="space-y-3">
                {["Shop Grid & List Pages", "Single Product Page", "Blog Grid & Masonry", "Author & Category Pages", "Cart & Checkout"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle />
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Shop Grid", color: "#BFDBFE" },
                { label: "Product Page", color: "#D1FAE5" },
                { label: "Blog Grid", color: "#FDE68A" },
                { label: "Blog Post", color: "#E9D5FF" },
              ].map((p) => (
                <BrowserMock key={p.label} label={p.label} color={p.color} height={100} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          SUPPORT + FAQ
      ───────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p style={{ color: "#2563EB" }} className="text-xs font-bold uppercase tracking-widest mb-4">
                We've Got Your Back
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                <BlueUnderline>First Class</BlueUnderline> Support
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Every purchase comes with 6 months of dedicated support and access
                to our growing documentation library.
              </p>
              <div className="flex items-center gap-4 p-5 rounded-2xl" style={{ background: "#EFF6FF" }}>
                <span className="text-4xl">⭐</span>
                <div>
                  <p className="font-extrabold text-xl text-gray-900">500+</p>
                  <p className="text-sm text-gray-500">Trusted customers rating us 5 stars</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              {[
                {
                  q: "What's included in my purchase?",
                  a: "You get all demo sites, 199+ page templates, complete source files (HTML/CSS/JS), PSD designs, documentation, and 6 months of premium support.",
                },
                {
                  q: "Is this template beginner-friendly?",
                  a: "Yes! The code is clean and well-commented. We also provide detailed documentation and video tutorials to help you get started quickly.",
                },
                {
                  q: "Can I use this for client projects?",
                  a: "With the Extended License you can use Amoda for unlimited client projects. Each end-product is sold only once.",
                },
                {
                  q: "Do you offer refunds?",
                  a: "Due to the digital nature of the product, refunds are not offered once the item has been downloaded. Please check the live preview before purchasing.",
                },
                {
                  q: "How do I get support?",
                  a: "Open a ticket through our dedicated support portal. We respond within 24 hours on business days.",
                },
              ].map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          TESTIMONIALS
      ───────────────────────────────────── */}
      <section style={{ background: "#F1F5F9" }} className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p style={{ color: "#2563EB" }} className="text-xs font-bold uppercase tracking-widest mb-3">
              Social Proof
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              500+{" "}
              <BlueUnderline>Trusted</BlueUnderline>{" "}
              Customers
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Alex Morgan",
                role: "Creative Director",
                review:
                  "Amoda saved us weeks of development time. The demos are stunning and the code quality is exceptional. Highly recommended!",
                stars: 5,
              },
              {
                name: "Sarah Chen",
                role: "Freelance Developer",
                review:
                  "The best template I've bought on Envato Market. The support team is incredibly responsive and helpful. Worth every penny.",
                stars: 5,
              },
              {
                name: "Marcus Rivera",
                role: "Agency Owner",
                review:
                  "We've built 12 client sites using Amoda. The variety of demos and the clean code structure makes customisation a breeze.",
                stars: 5,
              },
            ].map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl bg-white shadow-sm border border-gray-100"
              >
                <div className="flex mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} style={{ color: "#F59E0B" }} className="text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">"{t.review}"</p>
                <div className="flex items-center gap-3">
                  <div
                    style={{ background: "#BFDBFE" }}
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-blue-700"
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          FOOTER CTA (DARK)
      ───────────────────────────────────── */}
      <section style={{ background: "#0A0F1C" }} className="relative overflow-hidden py-24">
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse at 50% 100%, rgba(37,99,235,0.18) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <p style={{ color: "#60A5FA" }} className="text-xs font-bold uppercase tracking-widest mb-5">
            Let's Get Started
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            Let's Build a Creative<br />
            <span style={{ color: "#2563EB" }}>Website</span> Today!
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-10">
            Join 500+ happy customers who chose Amoda to power their online presence.
            Get instant access to everything — demos, blocks, and support.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#"
              style={{ background: "#2563EB" }}
              className="px-8 py-4 text-white text-sm font-bold rounded hover:opacity-90 transition-opacity shadow-lg"
            >
              Purchase Now — $19
            </a>
            <a
              href="#demos"
              className="px-8 py-4 text-sm font-bold rounded border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              View Live Demos
            </a>
          </div>

          {/* mini footer nav */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
            {["Home", "Pages", "Portfolio", "Elements", "Blog", "Documentation", "Support"].map((link) => (
              <a key={link} href="#" className="hover:text-gray-300 transition-colors">
                {link}
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs text-gray-600">
            © 2026 Amoda Template. All rights reserved.
          </p>
        </div>
      </section>

    </div>
  );
}
