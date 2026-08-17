"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import Image from "next/image";

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

const stats = [
  { value: "24/7", label: "Emergency response" },
  { value: "IRATA", label: "Certified technicians" },
  { value: "4", label: "Core industries" },
  { value: "GCC", label: "Coverage" },
];

const coreValues = [
  { Icon: ShieldIcon, label: "Safety First" },
  { Icon: StarIcon, label: "Excellence" },
  { Icon: UsersIcon, label: "Integrity" },
  { Icon: ZapIcon, label: "Efficiency" },
];

const industries = [
  {
    title: "Oil & Gas",
    href: "/industries/oil-and-gas",
    image: "/assets/oil-gas.jpg",
    description:
      "Rope access inspection, maintenance, and support services for onshore and offshore oil and gas facilities throughout the GCC.",
    icon: "⚙️",
  },
  {
    title: "Marine & Shipping",
    href: "/industries/marine-and-shipping",
    image: "/assets/marine.jpg",
    description:
      "Ship repair support, vessel maintenance, hull cleaning, cargo hold cleaning, and specialist marine manpower across UAE ports.",
    icon: "🚢",
  },
  {
    title: "Power & Energy",
    href: "/industries/power-and-energy",
    image: "/assets/power.jpg",
    description:
      "Power plant maintenance, shutdown support, heat exchanger cleaning, and structural services for conventional and renewable energy.",
    icon: "⚡",
  },
  {
    title: "Civil & Construction",
    href: "/industries/civil-and-construction",
    image: "/assets/civil.jpg",
    description:
      "High-rise facade maintenance, building cleaning, structural repairs, and specialist access services for commercial and industrial projects.",
    icon: "🏗️",
  },
];

const ropeAccessServices = [
  "Inspection & NDT",
  "Blasting & Painting",
  "Surface Preparation",
  "Welding Repairs",
  "Hydro Blasting",
  "Insulation Works",
  "Equipment Installation",
  "Building Maintenance",
];

const whyChoosePoints = [
  "IRATA-certified rope access technicians",
  "Full HSSE compliance on every job",
  "24/7 emergency response capability",
  "Single-source multidisciplinary team",
  "Fully equipped with latest tooling",
  "Proven track record across GCC",
  "Competitive pricing with quality assurance",
  "Rapid mobilization and deployment",
  "Experienced project management",
];

const clientSectors = [
  "ADNOC Group",
  "Dubai Petroleum",
  "Drydocks World",
  "DP World",
  "DEWA",
  "Gulf Navigation",
  "Major EPC Contractors",
  "Offshore Operators",
];

const missionPoints = [
  "Deliver safe, compliant, and high-quality services on every engagement",
  "Build long-term partnerships through reliability and technical excellence",
  "Continuously invest in our people and equipment to stay ahead of industry demands",
  "Operate with integrity and transparency in all client relationships",
];

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section ref={heroRef} className="relative isolate overflow-hidden bg-navy pt-[65px]">
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <Image
            src="/assets/hero-ship.jpg"
            alt="Industrial marine vessel"
            fill
            className="object-cover opacity-45"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/35" />

        <motion.div
          className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32 lg:py-40"
          style={{ opacity: heroOpacity }}
        >
          <motion.p
            className="section-eyebrow text-sky"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Dubai, United Arab Emirates
          </motion.p>

          <motion.h1
            className="mt-5 max-w-3xl font-display text-4xl font-bold uppercase leading-[1.05] text-navy-foreground sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            Marine &amp; Industrial Technical Solutions
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-base text-navy-foreground/80 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.4 }}
          >
            Ocean Arms Technical Services LLC is a UAE-based industrial services company delivering
            integrated technical solutions across Oil &amp; Gas, Marine, Power, and Civil sectors
            throughout the GCC region.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Request a quotation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#industries"
              className="inline-flex items-center gap-2 border border-navy-foreground/35 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-navy-foreground hover:bg-navy-foreground/10 transition-colors"
            >
              Industries we serve
            </a>
          </motion.div>

          {/* Stats */}
          <motion.dl
            className="mt-16 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-8 border-t border-navy-foreground/15 pt-8 sm:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 + i * 0.08 }}
              >
                <dt className="font-display text-3xl font-bold text-sky">{stat.value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-navy-foreground/60">
                  {stat.label}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────── */}
      <section id="about" className="scroll-mt-24 bg-background py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeUp>
            <p className="section-eyebrow text-primary">About Us</p>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-tight text-navy sm:text-5xl">
              A trusted industrial services partner in the UAE
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Ocean Arms Technical Services LLC is a UAE-registered company providing specialized
                industrial and marine technical services to clients across the Oil &amp; Gas, Marine &amp;
                Shipping, Power &amp; Energy, and Civil &amp; Construction sectors.
              </p>
              <p>
                With a highly skilled workforce of IRATA-certified rope access technicians, industrial
                painters, blasters, and marine maintenance specialists, we are equipped to handle
                complex scopes in some of the most challenging environments in the region.
              </p>
              <p className="border-l-2 border-primary pl-5 text-foreground">
                Our teams operate 24/7, with rapid mobilization capability across UAE and the broader
                GCC region — ensuring our clients&apos; assets remain operational, compliant, and
                well-maintained at all times.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── VISION / MISSION ─────────────────────────────── */}
      <section className="bg-sky-soft py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2">
          <FadeUp>
            <div className="bg-card p-8 shadow-panel sm:p-10 h-full">
              <p className="section-eyebrow text-primary">Vision</p>
              <h3 className="mt-4 font-display text-2xl font-bold uppercase text-navy">
                To be the leading technical services provider in the UAE marine and industrial sector
              </h3>
              <p className="mt-4 text-muted-foreground">
                We aspire to build a reputation for excellence, reliability, and safety — becoming
                the partner of choice for asset owners and operators across the GCC and beyond.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="bg-navy p-8 text-navy-foreground shadow-panel sm:p-10 h-full">
              <p className="section-eyebrow text-sky">Mission</p>
              <ul className="mt-5 space-y-3.5">
                {missionPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-navy-foreground/85">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CORE VALUES ───────────────────────────────────── */}
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <FadeUp>
            <p className="section-eyebrow text-primary">Core Values</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold uppercase text-navy sm:text-4xl">
              The principles behind every scope we deliver
            </h2>
          </FadeUp>

          <motion.div
            className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-4"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {coreValues.map(({ Icon, label }) => (
              <motion.div
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="flex flex-col items-start gap-3 bg-card p-6"
              >
                <Icon className="h-6 w-6 text-primary" />
                <span className="font-display text-base font-semibold uppercase tracking-wide text-navy">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── INDUSTRIES ─────────────────────────────────────── */}
      <section id="industries" className="scroll-mt-20 bg-sky-soft py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <FadeUp>
            <p className="section-eyebrow text-primary">Industries We Serve</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold uppercase text-navy sm:text-5xl">
              Four sectors. One multidisciplinary team.
            </h2>
          </FadeUp>

          <motion.div
            className="mt-12 grid gap-6 md:grid-cols-2"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {industries.map((ind) => (
              <motion.div
                key={ind.href}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <Link
                  href={ind.href}
                  className="group flex flex-col overflow-hidden bg-card shadow-panel transition-shadow hover:shadow-lift"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={ind.image}
                      alt={ind.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-0 top-0 grid h-12 w-12 place-items-center bg-navy text-navy-foreground text-xl">
                      {ind.icon}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-2xl font-bold uppercase text-navy">
                      {ind.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {ind.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      View services
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ROPE ACCESS ────────────────────────────────────── */}
      <section id="rope-access" className="scroll-mt-20 bg-navy py-20 text-navy-foreground sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
          <FadeUp>
            <p className="section-eyebrow text-sky">Specialist Capability</p>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-tight sm:text-5xl">
              Rope Access Services
            </h2>
            <p className="mt-6 max-w-md text-navy-foreground/80">
              Our IRATA-certified rope access teams provide safe, efficient, and cost-effective access
              solutions for inspection, maintenance, and repair work at height and in confined spaces
              — across all sectors we serve.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 bg-sky px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-navy hover:opacity-90 transition-opacity"
            >
              Discuss your scope
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeUp>

          <FadeUp delay={0.1}>
            <ul className="grid gap-px self-start bg-navy-foreground/15 sm:grid-cols-2">
              {ropeAccessServices.map((service) => (
                <li key={service} className="bg-navy px-5 py-4 text-sm text-navy-foreground/85">
                  {service}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* ── WHY CHOOSE ─────────────────────────────────────── */}
      <section id="why-us" className="scroll-mt-20 bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <FadeUp>
            <p className="section-eyebrow text-primary">Why Choose Us</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold uppercase text-navy sm:text-5xl">
              Strength across every discipline
            </h2>
          </FadeUp>

          <motion.ul
            className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06 } },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {whyChoosePoints.map((point) => (
              <motion.li
                key={point}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                }}
                className="flex items-start gap-3 border-b border-border pb-4 text-sm text-foreground/85"
              >
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {point}
              </motion.li>
            ))}
          </motion.ul>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <FadeUp>
              <div className="bg-sky-soft p-8">
                <h3 className="font-display text-xl font-bold uppercase text-navy">
                  Quality Assurance
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  All works carried out under strict HSSE guidelines with documented quality control
                  processes, third-party inspection support, and full compliance with international
                  standards.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="bg-sky-soft p-8">
                <h3 className="font-display text-xl font-bold uppercase text-navy">
                  Client Sectors
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {clientSectors.map((sector) => (
                    <span key={sector} className="bg-card px-3 py-1.5 text-xs text-foreground/80">
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5">
          <FadeUp>
            <h2 className="font-display text-3xl font-bold uppercase sm:text-4xl">
              Let&apos;s build something reliable together
            </h2>
            <p className="mt-2 text-primary-foreground/80">
              Contact us for a project consultation or emergency support.
            </p>
          </FadeUp>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-navy px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-navy-foreground hover:opacity-90 transition-opacity"
            >
              Contact us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
