"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
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
    building:  <svg {...base}><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22V12h6v10"/><path d="M4 8h16M4 14h16"/></svg>,
    facade:    <svg {...base}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>,
    clean:     <svg {...base}><path d="M4 4h16M6 4v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V4"/><path d="M9 4V2M15 4V2"/></svg>,
    inspect:   <svg {...base}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>,
    glass:     <svg {...base}><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 2v20M4 8h16M4 14h16"/></svg>,
    structure: <svg {...base}><path d="M4 20V4h16v16M4 12h16M12 4v16"/></svg>,
    water:     <svg {...base}><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
    sealant:   <svg {...base}><path d="M3 12h18M12 3v18"/><circle cx="12" cy="12" r="4"/></svg>,
    concrete:  <svg {...base}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18"/></svg>,
    paint:     <svg {...base}><path d="M3 7h3l3-4 4 8 2-4h6"/><path d="M3 17h18M3 21h18"/></svg>,
    shield:    <svg {...base}><path d="M12 2L4 6v6c0 5.5 3.5 9.7 8 11 4.5-1.3 8-5.5 8-11V6L12 2z"/></svg>,
    safety:    <svg {...base}><path d="M12 2L4 5v6c0 4.5 3.5 8.7 8 10 4.5-1.3 8-5.5 8-10V5L12 2z"/><path d="M9 12l2 2 4-4"/></svg>,
    support:   <svg {...base}><path d="M4 20V8l8-4 8 4v12"/><path d="M4 14h16"/><path d="M10 20v-5h4v5"/></svg>,
  };
  return (icons[type] ?? icons.structure) as React.ReactElement;
}

const stats = [
  { value: "14",               label: "Service lines" },
  { value: "High-rise→Ground", label: "Coverage" },
  { value: "100%",             label: "Certified crews" },
  { value: "0",                label: "Safety compromise" },
];

const approach = [
  { num: "01", title: "Integrated access",        body: "Rope access eliminates scaffold lead times on facades, bridges and high-rise structures — faster, cheaper, safer." },
  { num: "02", title: "Surface to structure",      body: "From blast cleaning and primer application through structural repairs — one team, one safety system, one sign-off." },
  { num: "03", title: "Project-ready reporting",   body: "Daily progress reports, method statements and close-out packs aligned with your project manager's format." },
];

const services = [
  { name: "Rope Access Works",              desc: "IRATA-certified technicians",        icon: "rope" },
  { name: "High Rise Building Maintenance", desc: "Facades & superstructure",           icon: "building" },
  { name: "External Facade Maintenance",    desc: "Cladding & curtain wall",            icon: "facade" },
  { name: "Building Cleaning",              desc: "Post-construction & routine",         icon: "clean" },
  { name: "Facade Inspection",              desc: "Visual & close-up surveys",           icon: "inspect" },
  { name: "Glass Replacement",              desc: "Rope access glazing works",           icon: "glass" },
  { name: "Structural Repairs",             desc: "Steel & concrete remediation",        icon: "structure" },
  { name: "Waterproofing",                  desc: "Membrane & joint sealing systems",    icon: "water" },
  { name: "Sealant Application",            desc: "Expansion & curtain-wall joints",     icon: "sealant" },
  { name: "Concrete Repair",               desc: "Crack injection & patch repair",       icon: "concrete" },
  { name: "Steel Structure Painting",       desc: "Protective & decorative coatings",   icon: "paint" },
  { name: "Industrial Coating",             desc: "Anti-corrosion systems",              icon: "shield" },
  { name: "Safety Net Installation",        desc: "Temporary fall protection",           icon: "safety" },
  { name: "Construction Support Services",  desc: "Scaffolding & access",               icon: "support" },
];



const marqueeItems = [...services, ...services].map((s) => s.name);

export default function CivilConstructionPage() {
  return (
    <>
      {/* ════ HERO ════ */}
      <section className="bg-surface pt-[65px]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.p
            className="section-eyebrow text-primary pt-10 pb-6 sm:pt-14"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Industries We Serve — 04&nbsp;/&nbsp;Civil &amp; Construction
          </motion.p>

          <div className="grid gap-10 pb-10 lg:grid-cols-[3fr_2fr] lg:items-end">
            <motion.h1
              className="font-display font-bold uppercase text-foreground"
              style={{ fontSize: "clamp(3rem, 7.5vw, 8rem)", lineHeight: 0.88 }}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Civil &amp;<br />Construction<br />Services<span className="text-primary">.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                Access solutions, facade maintenance and structural services for commercial,
                industrial and infrastructure projects — delivered by rope access specialists,
                safely and on programme.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#services" className="inline-flex cursor-pointer items-center gap-2 bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-primary-foreground hover:opacity-90 transition-opacity">
                  Explore 14 Service Lines <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a href="#approach" className="inline-flex cursor-pointer items-center border border-foreground/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-foreground hover:bg-foreground/5 transition-colors">
                  How We Work
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="relative aspect-[16/7] w-full overflow-hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Image src="/assets/civil.jpg" alt="Civil and construction site" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            <p className="absolute bottom-5 left-6 text-sm italic text-white/80">
              High-rise to ground level, facade to structure — same standard, any asset.
            </p>
            <p className="absolute bottom-5 right-6 section-eyebrow text-white/50">
              High-rise &amp; Ground Level
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
                <dd className="font-display font-bold text-foreground" style={{ fontSize: "clamp(2rem,5vw,4.5rem)", lineHeight: 1 }}>{s.value}</dd>
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
            <FadeUp>
              <p className="section-eyebrow text-primary">Approach</p>
              <h2 className="mt-4 font-display font-bold uppercase text-foreground" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", lineHeight: 0.92 }}>
                One team,<br />one quality system
              </h2>
            </FadeUp>
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
          <FadeUp>
            <div className="grid gap-6 pb-12 lg:grid-cols-2 lg:items-end">
              <div>
                <p className="section-eyebrow text-primary">Services</p>
                <h2 className="mt-4 font-display font-bold uppercase text-foreground" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", lineHeight: 0.92 }}>Service Lines</h2>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                From rope access facade works and structural repairs to waterproofing and
                safety installations — every discipline under one safety and quality system.
              </p>
            </div>
          </FadeUp>
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
              <h2 className="font-display font-bold uppercase text-background" style={{ fontSize: "clamp(2.5rem,5.5vw,5rem)", lineHeight: 0.9 }}>
                Planning a maintenance or construction project<span className="text-primary">?</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-sm leading-relaxed text-background/55">
                Share your scope and we&apos;ll deploy the right access disciplines, certifications and manpower for your project.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground hover:opacity-90 transition-opacity">
                  Request a Scope Review <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="tel:+971567444837" className="inline-flex items-center border border-background/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-background/70 hover:bg-background/8 transition-colors">
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
