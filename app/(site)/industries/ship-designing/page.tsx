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
    concept:   <svg {...base}><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/><circle cx="12" cy="12" r="3"/></svg>,
    hull:      <svg {...base}><path d="M2 14l4-9h12l4 9"/><path d="M2 14c3 5 17 5 20 0"/><path d="M12 5v9"/></svg>,
    calc:      <svg {...base}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h4"/></svg>,
    structure: <svg {...base}><path d="M4 20V4h16v16M4 12h16M12 4v16"/></svg>,
    stability: <svg {...base}><path d="M12 3v18M5 8l7-3 7 3M5 16l7 3 7-3"/></svg>,
    outfit:    <svg {...base}><rect x="3" y="8" width="18" height="12" rx="1"/><path d="M7 8V5h10v3M8 14h3M13 14h3"/></svg>,
    docs:      <svg {...base}><path d="M7 3h8l5 5v13H7z"/><path d="M15 3v5h5M10 13h6M10 17h4"/></svg>,
    class:     <svg {...base}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>,
    convert:   <svg {...base}><path d="M4 7h11M15 7l-3-3M15 7l-3 3M20 17H9M9 17l3-3M9 17l3 3"/></svg>,
    model:     <svg {...base}><path d="M12 3l9 5v8l-9 5-9-5V8z"/><path d="M12 12V3M12 12l9 5M12 12L3 17"/></svg>,
  };
  return (icons[type] ?? icons.concept) as React.ReactElement;
}

const stats = [
  { value: "10",           label: "Design disciplines" },
  { value: "Concept →\nClass", label: "Coverage" },
  { value: "100%",         label: "Build-ready packs" },
  { value: "0",            label: "Guesswork" },
];

const approach = [
  { num: "01", title: "Brief to hull form",        body: "Owner requirements, operating profile, and class notation translated into a practical hull and arrangement concept." },
  { num: "02", title: "Calculated, not assumed",   body: "Structural, stability, and scantling calculations documented so yards and class can review without rework." },
  { num: "03", title: "Yard-ready documentation",  body: "Drawings, specifications, and technical packs issued in formats yards and surveyors actually use." },
];

const services = [
  { name: "Concept Design",              desc: "Owner brief to first arrangement",     icon: "concept" },
  { name: "Naval Architecture",          desc: "Hull form, hydrostatics & lines",      icon: "hull" },
  { name: "Structural Calculations",     desc: "Scantlings and load cases",            icon: "calc" },
  { name: "Hull Structure Design",       desc: "Framing, plating & connections",       icon: "structure" },
  { name: "Stability Analysis",          desc: "Intact, damage & loading conditions",  icon: "stability" },
  { name: "Outfitting Design",           desc: "Accommodation, machinery & systems",   icon: "outfit" },
  { name: "Technical Documentation",     desc: "Specifications and drawing packs",     icon: "docs" },
  { name: "Class Submission Support",    desc: "Plan approval and query close-out",    icon: "class" },
  { name: "Conversion Design",           desc: "Repurpose and life-extension scopes",  icon: "convert" },
  { name: "3D Modelling",                desc: "Visualisation for owner and yard",     icon: "model" },
];

const marqueeItems = [...services, ...services].map((s) => s.name);

export default function ShipDesigningPage() {
  return (
    <>
      <section className="bg-surface pt-[65px]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.p
            className="section-eyebrow text-primary pt-10 pb-6 sm:pt-14"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Industries We Serve — 05&nbsp;/&nbsp;Ship Designing
          </motion.p>

          <div className="grid gap-10 pb-10 lg:grid-cols-[3fr_2fr] lg:items-end">
            <motion.h1
              className="font-display font-bold uppercase text-foreground"
              style={{ fontSize: "clamp(3rem, 7.5vw, 8rem)", lineHeight: 0.88 }}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Ship<br />Designing<br />Services<span className="text-primary">.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                Naval architecture and complete ship design services — from concept drawings and
                structural calculations to build-ready technical documentation for commercial and industrial vessels.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#services" className="inline-flex cursor-pointer items-center gap-2 bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-primary-foreground hover:opacity-90 transition-opacity">
                  Explore 10 Design Lines <ArrowRight className="h-3.5 w-3.5" />
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
            <Image src="/assets/ship-designing-sketch-to-ship.png" alt="From ship sketch to finished vessel" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            <p className="absolute bottom-5 left-6 text-sm italic text-white/80">
              Concept to class — drawings yards can actually build from.
            </p>
            <p className="absolute bottom-5 right-6 section-eyebrow text-white/50">
              Concept to Class
            </p>
          </motion.div>
        </div>
      </section>

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

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-x-8">
            {stats.map((s) => {
              const stacked = s.value.includes("\n");
              return (
              <FadeUp key={s.label} className="min-w-0 flex min-h-[7.75rem] flex-col text-center">
                <dd
                  className={`font-display font-bold text-foreground min-w-0${stacked ? " whitespace-pre-line" : ""}`}
                  style={{
                    fontSize: stacked || s.value.length > 6 ? "clamp(1.55rem, 2.8vw, 2.25rem)" : "clamp(2rem,5vw,4.5rem)",
                    lineHeight: stacked ? 1.15 : 1.1,
                  }}
                >
                  {s.value}
                </dd>
                <dt className="mt-auto pt-2 text-[0.62rem] uppercase tracking-widest text-muted-foreground">{s.label}</dt>
              </FadeUp>
              );
            })}
          </dl>
        </div>
      </section>

      <section id="approach" className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <FadeUp>
              <p className="section-eyebrow text-primary">Approach</p>
              <h2 className="mt-4 font-display font-bold uppercase text-foreground" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", lineHeight: 0.92 }}>
                One design,<br />one standard
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

      <section id="services" className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <FadeUp>
            <div className="grid gap-6 pb-12 lg:grid-cols-2 lg:items-end">
              <div>
                <p className="section-eyebrow text-primary">Services</p>
                <h2 className="mt-4 font-display font-bold uppercase text-foreground" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", lineHeight: 0.92 }}>Design Lines</h2>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                From concept drawings and hull form development to class submission packs —
                naval architecture and vessel design under one technical standard.
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

      <section className="bg-foreground py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <FadeUp>
              <h2 className="font-display font-bold uppercase text-background" style={{ fontSize: "clamp(2.5rem,5.5vw,5rem)", lineHeight: 0.9 }}>
                Starting a newbuild or conversion<span className="text-primary">?</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-sm leading-relaxed text-background/55">
                Share the vessel type and operating brief — we&apos;ll outline the design pack, calculations, and class documentation you need.
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
