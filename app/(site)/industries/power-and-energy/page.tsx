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
    plant:     <svg {...base}><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M8 7V4M16 7V4M2 12h20"/></svg>,
    calendar:  <svg {...base}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
    boiler:    <svg {...base}><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 3"/><path d="M8 4l1 2M16 4l-1 2"/></svg>,
    heat:      <svg {...base}><path d="M3 12h18M7 8h10M7 16h10"/><path d="M5 4v16M19 4v16"/></svg>,
    water:     <svg {...base}><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
    tower:     <svg {...base}><path d="M4 20V8l8-4 8 4v12"/><path d="M4 14h16"/><path d="M10 20v-6h4v6"/></svg>,
    paint:     <svg {...base}><path d="M3 7h3l3-4 4 8 2-4h6"/><path d="M3 17h18M3 21h18"/></svg>,
    gear:      <svg {...base}><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.2 4.2l2.9 2.9M16.9 16.9l2.9 2.9M1 12h4M19 12h4M4.2 19.8l2.9-2.9M16.9 7.1l2.9-2.9"/></svg>,
    rope:      <svg {...base}><circle cx="12" cy="5" r="2"/><path d="M12 7v5M9 21l3-9 3 9M10 17h4"/></svg>,
    clean:     <svg {...base}><path d="M4 4h16M6 4v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V4"/><path d="M9 4V2M15 4V2"/></svg>,
    install:   <svg {...base}><path d="M12 2v6M12 16v6M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M2 12h6M16 12h6M4.9 19.1l4.2-4.2M14.9 9.1l4.2-4.2"/></svg>,
    shield:    <svg {...base}><path d="M12 2L4 6v6c0 5.5 3.5 9.7 8 11 4.5-1.3 8-5.5 8-11V6L12 2z"/></svg>,
  };
  return (icons[type] ?? icons.gear) as React.ReactElement;
}

const stats = [
  { value: "12",                label: "Service lines" },
  { value: "Shutdown & Live",   label: "Plant capability" },
  { value: "100%",              label: "Certified crews" },
  { value: "0",                 label: "Safety compromise" },
];

const approach = [
  { num: "01", title: "Zero-outage impact",      body: "Work scoped and sequenced to run within planned maintenance windows — without extending shutdowns or delaying restart." },
  { num: "02", title: "Height & confined",        body: "Certified rope access and confined-space teams handle turbine casings, stacks and cable trays without scaffold lead times." },
  { num: "03", title: "Safety documentation",     body: "Complete permit-to-work, inspection logs and handover records delivered for every task executed on your plant." },
];

const services = [
  { name: "Power Plant Maintenance",      desc: "Routine & corrective works",        icon: "plant" },
  { name: "Shutdown & Turnaround Support",desc: "Planned window execution",           icon: "calendar" },
  { name: "Boiler Cleaning",             desc: "Internal cleaning & inspection",      icon: "boiler" },
  { name: "Heat Exchanger Cleaning",     desc: "Tube-side & shell-side",             icon: "heat" },
  { name: "Hydro Blasting",             desc: "High-pressure water jetting",         icon: "water" },
  { name: "Cooling Tower Maintenance",   desc: "Cleaning, repair & coating",         icon: "tower" },
  { name: "Structural Painting",         desc: "Protective coating systems",          icon: "paint" },
  { name: "Mechanical Maintenance",      desc: "Rotating & static equipment",         icon: "gear" },
  { name: "Rope Access Inspection",      desc: "Turbines, stacks & structures",       icon: "rope" },
  { name: "Industrial Cleaning",         desc: "Vessels, tanks & plant areas",        icon: "clean" },
  { name: "Equipment Installation Support", desc: "Rigging & alignment",             icon: "install" },
  { name: "Corrosion Protection",        desc: "CUI mitigation programs",             icon: "shield" },
];



const marqueeItems = [...services, ...services].map((s) => s.name);

export default function PowerEnergyPage() {
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
            Industries We Serve — 03&nbsp;/&nbsp;Power &amp; Energy
          </motion.p>

          <div className="grid gap-10 pb-10 lg:grid-cols-[3fr_2fr] lg:items-end">
            <motion.h1
              className="font-display font-bold uppercase text-foreground"
              style={{ fontSize: "clamp(3rem, 7.5vw, 8rem)", lineHeight: 0.88 }}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Power &amp;<br />Energy<br />Services<span className="text-primary">.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                Maintenance, inspection and industrial services for conventional and renewable energy
                facilities — delivered within shutdown windows by certified, permit-ready crews.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#services" className="inline-flex cursor-pointer items-center gap-2 bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-primary-foreground hover:opacity-90 transition-opacity">
                  Explore 12 Service Lines <ArrowRight className="h-3.5 w-3.5" />
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
            <Image src="/assets/power.jpg" alt="Power and energy facility" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            <p className="absolute bottom-5 left-6 text-sm italic text-white/80">
              Stack to switchgear, shutdown to live plant — same standard, any facility.
            </p>
            <p className="absolute bottom-5 right-6 section-eyebrow text-white/50">
              Shutdown &amp; Live Plant
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
                One plant,<br />one standard
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
                From rope access and boiler cleaning to shutdown support and corrosion protection —
                every discipline under one safety and quality system.
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
                Planning a plant shutdown or outage<span className="text-primary">?</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-sm leading-relaxed text-background/55">
                Share your maintenance scope and we&apos;ll deploy the right disciplines, certifications and manpower for the window.
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
