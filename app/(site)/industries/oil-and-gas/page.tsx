"use client";

import { motion } from "motion/react";
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

const keyServices = [
  "Rope Access Inspection",
  "Non-Destructive Testing (NDT)",
  "Blasting & Painting",
  "Surface Preparation",
  "Industrial Cleaning",
  "Hydro Blasting",
  "Tank Cleaning",
  "Pipeline Maintenance",
  "Structural Repairs",
  "Corrosion Protection",
  "Insulation Works",
  "Equipment Installation Support",
  "Scaffold Erection & Dismantling",
  "Manpower Supply",
  "Shutdown & Turnaround Support",
  "Fireproofing Application",
  "Cathodic Protection",
  "Confined Space Entry Works",
];

const otherIndustries = [
  { name: "Marine & Shipping", href: "/industries/marine-and-shipping" },
  { name: "Power & Energy", href: "/industries/power-and-energy" },
  { name: "Civil & Construction", href: "/industries/civil-and-construction" },
];

export default function OilGasPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-navy pt-[65px]">
        <div className="absolute inset-0">
          <Image
            src="/assets/oil-gas.jpg"
            alt="Oil and gas facility"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/50" />

        <div className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-navy-foreground/60 hover:text-navy-foreground transition-colors mb-8"
            >
              ← Back to Home
            </Link>
          </motion.div>

          <motion.p
            className="section-eyebrow text-sky"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Industry We Serve
          </motion.p>

          <motion.h1
            className="mt-5 max-w-2xl font-display text-4xl font-bold uppercase leading-[1.05] text-navy-foreground sm:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Oil &amp; Gas
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-base text-navy-foreground/75"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35 }}
          >
            We provide rope access, inspection, maintenance, and industrial support services for
            onshore and offshore oil and gas facilities. Our certified teams deliver reliable,
            compliant services across refineries, platforms, pipelines, and storage tanks throughout
            the GCC.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <FadeUp>
            <p className="section-eyebrow text-primary">Key Services</p>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase text-navy sm:text-4xl">
              What We Offer in Oil &amp; Gas
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Comprehensive maintenance and access solutions for oil and gas assets onshore and offshore.
            </p>
          </FadeUp>

          <motion.div
            className="mt-12 grid gap-px bg-border border border-border sm:grid-cols-2 lg:grid-cols-3"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {keyServices.map((service) => (
              <motion.div
                key={service}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                }}
                className="flex items-start gap-3 bg-card px-6 py-5"
              >
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-foreground/85">{service}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA + Other Industries */}
      <section className="bg-navy py-20 text-navy-foreground sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
          <FadeUp>
            <p className="section-eyebrow text-sky">Ready to Start?</p>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-tight sm:text-4xl">
              Let&apos;s discuss your project scope
            </h2>
            <p className="mt-5 max-w-md text-navy-foreground/75">
              Our Oil &amp; Gas specialists are ready to mobilize. Contact us for a detailed
              consultation on your asset maintenance or shutdown requirements.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+971567444837"
                className="inline-flex items-center gap-2 border border-navy-foreground/30 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-navy-foreground hover:bg-navy-foreground/10 transition-colors"
              >
                +971 56 744 4837
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <p className="section-eyebrow text-sky mb-6">Explore Other Industries</p>
            <div className="space-y-3">
              {otherIndustries.map((ind) => (
                <Link
                  key={ind.href}
                  href={ind.href}
                  className="group flex items-center justify-between border border-navy-foreground/15 px-5 py-4 hover:border-navy-foreground/35 hover:bg-navy-foreground/5 transition-all"
                >
                  <span className="text-sm font-medium text-navy-foreground/80 group-hover:text-navy-foreground transition-colors">
                    {ind.name}
                  </span>
                  <ArrowRight className="h-4 w-4 text-sky transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
