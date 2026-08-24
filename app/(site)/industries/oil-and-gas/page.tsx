"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";

/* ─── Helpers ─────────────────────────────────────────────────── */

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
}

function Icon({ type, className }: { type: string; className?: string }) {
  const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: `h-5 w-5 ${className ?? ""}` };
  const icons: Record<string, React.ReactNode> = {
    rope:      <svg {...base}><circle cx="12" cy="5" r="2"/><path d="M12 7v5M9 21l3-9 3 9M10 17h4"/></svg>,
    paint:     <svg {...base}><path d="M3 7h3l3-4 4 8 2-4h6"/><path d="M3 17h18M3 21h18"/></svg>,
    blast:     <svg {...base}><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>,
    water:     <svg {...base}><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
    tank:      <svg {...base}><ellipse cx="12" cy="7" rx="8" ry="3"/><path d="M4 7v10c0 1.66 3.58 3 8 3s8-1.34 8-3V7"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/></svg>,
    gear:      <svg {...base}><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.2 4.2l2.9 2.9M16.9 16.9l2.9 2.9M1 12h4M19 12h4M4.2 19.8l2.9-2.9M16.9 7.1l2.9-2.9"/></svg>,
    calendar:  <svg {...base}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
    valve:     <svg {...base}><circle cx="12" cy="12" r="4"/><path d="M4 12h4M16 12h4M12 4v4M12 16v4"/></svg>,
    pipe:      <svg {...base}><path d="M3 12h18M3 6h6a6 6 0 0 1 0 12H3M15 6a6 6 0 0 1 0 12h6"/></svg>,
    structure: <svg {...base}><path d="M4 20V4h16v16M4 12h16M12 4v16"/></svg>,
    inspect:   <svg {...base}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>,
    confined:  <svg {...base}><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="8" r="2"/><path d="M12 11v5M10 14h4"/></svg>,
    layers:    <svg {...base}><path d="M2 17l10 5 10-5M2 12l10 5 10-5M12 2L2 7l10 5 10-5-10-5z"/></svg>,
    fire:      <svg {...base}><path d="M12 2s-5 6-5 10a5 5 0 0 0 10 0c0-4-5-10-5-10z"/></svg>,
    shield:    <svg {...base}><path d="M12 2L4 6v6c0 5.5 3.5 9.7 8 11 4.5-1.3 8-5.5 8-11V6L12 2z"/></svg>,
    weld:      <svg {...base}><path d="M3 21l9.5-9.5M14 6l4 4M16 2l6 6-1 1-6-6 1-1z"/><path d="M3 21h6v-6"/></svg>,
    people:    <svg {...base}><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85"/></svg>,
    ship:      <svg {...base}><path d="M2 20h20M5 20l2-9h10l2 9"/><path d="M9 11V7l3-3 3 3v4"/></svg>,
    platform:  <svg {...base}><rect x="2" y="13" width="20" height="5"/><path d="M6 13V7M18 13V7M4 7h16M9 18v4M15 18v4"/></svg>,
    drydock:   <svg {...base}><path d="M2 21h20M4 21V10l8-5 8 5v11"/><path d="M9 21v-5h6v5"/></svg>,
  };
  return (icons[type] ?? icons.gear) as React.ReactElement;
}

/* ─── Data ────────────────────────────────────────────────────── */

const stats = [
  { value: "18",   label: "Service lines" },
  { value: "24/7", label: "Turnaround cover" },
  { value: "100%", label: "Certified crews" },
  { value: "0",    label: "Safety compromise" },
];

const approach = [
  { num: "01", title: "Single mobilization",  body: "Access, surface prep, mechanical and inspection disciplines arrive as one crew under one permit set." },
  { num: "02", title: "Built for the window", body: "Shift planning, spares staging and manpower ramp designed backwards from your start-up date." },
  { num: "03", title: "Documented to audit",  body: "Every coating DFT, torque value and confined-space entry logged and handed over as a closed pack." },
];

const services = [
  { name: "Rope Access Services",        desc: "IRATA-certified access teams",      icon: "rope" },
  { name: "Industrial Painting & Coating", desc: "Protective & marine systems",     icon: "paint" },
  { name: "Abrasive Blasting",           desc: "Surface prep to spec",              icon: "blast" },
  { name: "Hydro Blasting",             desc: "Up to 40,000 psi",                  icon: "water" },
  { name: "High Pressure Water Jetting", desc: "Heat exchangers & lines",           icon: "water" },
  { name: "Tank Cleaning",              desc: "Sludge removal & gas-freeing",       icon: "tank" },
  { name: "Mechanical Maintenance",     desc: "Rotating & static equipment",        icon: "gear" },
  { name: "Shutdown & Turnaround",      desc: "Planned window execution",           icon: "calendar" },
  { name: "Valve Maintenance",          desc: "Overhaul & testing",                 icon: "valve" },
  { name: "Piping Maintenance",         desc: "Repairs & tie-ins",                  icon: "pipe" },
  { name: "Structural Steel",           desc: "Repair & reinforcement",             icon: "structure" },
  { name: "NDT Inspection Support",     desc: "Access & technician supply",         icon: "inspect" },
  { name: "Confined Space Services",    desc: "Entry, standby & rescue",            icon: "confined" },
  { name: "Insulation & Cladding",      desc: "Thermal & acoustic",                 icon: "layers" },
  { name: "Fireproofing",              desc: "Intumescent & cementitious",          icon: "fire" },
  { name: "Corrosion Control",          desc: "CUI mitigation programs",            icon: "shield" },
  { name: "Fabrication & Welding",      desc: "On-site & workshop",                 icon: "weld" },
  { name: "Manpower Supply",            desc: "Skilled trades on demand",           icon: "people" },
];


const marqueeItems = [...services, ...services].map((s) => s.name);

/* ─── Page ────────────────────────────────────────────────────── */

export default function OilGasPage() {
  return (
    <>
      {/* ════ HERO ════ */}
      <section className="bg-surface pt-[65px]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          {/* eyebrow */}
          <motion.p
            className="section-eyebrow text-primary pt-10 pb-6 sm:pt-14"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Industries We Serve — 01&nbsp;/&nbsp;Oil &amp; Gas
          </motion.p>

          {/* 2-col: title ← description+CTAs → */}
          <div className="grid gap-10 pb-10 lg:grid-cols-[3fr_2fr] lg:items-end">
            <motion.h1
              className="font-display font-bold uppercase text-foreground"
              style={{ fontSize: "clamp(3rem, 7.5vw, 8rem)", lineHeight: 0.88 }}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Oil &amp; Gas<br />Industrial<br />Services<span className="text-primary">.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                Comprehensive maintenance, inspection and specialized services for onshore and offshore
                facilities — delivered by certified crews, on schedule and to spec.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#services"
                  className="inline-flex cursor-pointer items-center gap-2 bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Explore 18 Service Lines <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="#approach"
                  className="inline-flex cursor-pointer items-center border border-foreground/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-foreground hover:bg-foreground/5 transition-colors"
                >
                  How We Work
                </a>
              </div>
            </motion.div>
          </div>

          {/* hero image (contained, below text) */}
          <motion.div
            className="relative aspect-[16/7] w-full overflow-hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Image src="/assets/oil-gas.jpg" alt="Oil and gas offshore platform" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            <p className="absolute bottom-5 left-6 text-sm italic text-white/80">
              Platform, refinery, terminal — same standard, any asset.
            </p>
            <p className="absolute bottom-5 right-6 section-eyebrow text-white/50">
              Onshore &amp; Offshore
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════ MARQUEE ════ */}
      <section className="overflow-hidden bg-navy py-5">
        <div className="animate-marquee flex whitespace-nowrap">
          {marqueeItems.map((name, i) => (
            <span key={i} className="inline-flex shrink-0 items-center">
              <span className="section-eyebrow px-8 text-sky/55">{name}</span>
              <span className="text-sky/25 text-lg">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* ════ STATS ════ */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {stats.map((s) => (
              <FadeUp key={s.label}>
                <dd className="font-display font-bold text-foreground" style={{ fontSize: "clamp(2.8rem,6vw,5.5rem)", lineHeight: 1 }}>
                  {s.value}
                </dd>
                <dt className="mt-2 text-[0.62rem] uppercase tracking-widest text-muted-foreground">{s.label}</dt>
              </FadeUp>
            ))}
          </dl>
        </div>
      </section>

      {/* ════ APPROACH ════ */}
      <section id="approach" className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">

            {/* left */}
            <FadeUp>
              <p className="section-eyebrow text-primary">Approach</p>
              <h2
                className="mt-4 font-display font-bold uppercase text-foreground"
                style={{ fontSize: "clamp(2rem,4vw,3.5rem)", lineHeight: 0.92 }}
              >
                One crew,<br />one standard
              </h2>
            </FadeUp>

            {/* right – numbered list */}
            <div>
              {approach.map((item, i) => (
                <FadeUp key={item.num} delay={i * 0.1}>
                  <div className="border-b border-border py-7 first:border-t first:border-border">
                    <div className="flex gap-5">
                      <span className="section-eyebrow mt-0.5 shrink-0 text-primary">{item.num}</span>
                      <div>
                        <h3 className="font-display text-base font-bold uppercase text-foreground">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ SERVICE LINES ════ */}
      <section id="services" className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          {/* 2-col header */}
          <FadeUp>
            <div className="grid gap-6 pb-12 lg:grid-cols-2 lg:items-end">
              <div>
                <p className="section-eyebrow text-primary">Services</p>
                <h2
                  className="mt-4 font-display font-bold uppercase text-foreground"
                  style={{ fontSize: "clamp(2rem,4vw,3.5rem)", lineHeight: 0.92 }}
                >
                  Service Lines
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                From access and surface preparation to inspection support and manpower —
                every discipline under one safety and quality system.
              </p>
            </div>
          </FadeUp>

          {/* card grid */}
          <motion.div
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
            initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {services.map((svc, i) => (
              <motion.div
                key={svc.name}
                variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                className="flex flex-col gap-3 border border-border bg-background p-5 hover:border-primary/25 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <Icon type={svc.icon} className="text-primary" />
                  <span className="font-display text-xs font-bold text-border">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold uppercase leading-tight text-foreground">{svc.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{svc.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section className="bg-foreground py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">

            <FadeUp>
              <h2
                className="font-display font-bold uppercase text-background"
                style={{ fontSize: "clamp(2.5rem,5.5vw,5rem)", lineHeight: 0.9 }}
              >
                Planning a shutdown or turnaround<span className="text-primary">?</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="text-sm leading-relaxed text-background/55">
                Share your scope and we&apos;ll mobilize the right disciplines, certifications and
                manpower for the window.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Request a Scope Review <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="tel:+971567444837"
                  className="inline-flex items-center border border-background/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-background/70 hover:bg-background/8 transition-colors"
                >
                  +971 56 744 4837
                </a>
              </div>


            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
