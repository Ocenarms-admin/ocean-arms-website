"use client";

import Link from "next/link";
import { motion } from "motion/react";

const industries = [
  { name: "Oil & Gas", href: "/industries/oil-and-gas" },
  { name: "Marine & Shipping", href: "/industries/marine-and-shipping" },
  { name: "Power & Energy", href: "/industries/power-and-energy" },
  { name: "Civil & Construction", href: "/industries/civil-and-construction" },
];

const services = [
  "Rope Access",
  "Blasting & Painting",
  "Industrial Cleaning",
  "Hydro Blasting",
  "Manpower Supply",
  "Inspection Services",
];

export default function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-5 py-16">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="sm:col-span-2 lg:col-span-1"
        >
          <Link href="/" className="flex items-center gap-3 mb-5">
            <div className="grid h-9 w-9 place-items-center bg-primary shrink-0">
              <span className="font-display text-lg font-bold text-primary-foreground leading-none">OA</span>
            </div>
            <span className="font-display text-base font-bold uppercase tracking-wide text-navy-foreground">
              Ocean Arms
            </span>
          </Link>
          <p className="text-sm text-navy-foreground/60 leading-relaxed mb-5">
            UAE-based industrial services company delivering integrated technical solutions across marine, energy, and construction sectors.
          </p>
          <div className="space-y-1.5 text-sm text-navy-foreground/55">
            <p>Office No. 21MF, Nusrat Rahmanian Building</p>
            <p>Dubai, United Arab Emirates</p>
            <p className="pt-1">
              <a href="tel:+971567444837" className="hover:text-navy-foreground transition-colors">
                +971 56 744 4837
              </a>
            </p>
            <p>
              <a href="mailto:info@oceanarms.ae" className="hover:text-navy-foreground transition-colors">
                info@oceanarms.ae
              </a>
            </p>
          </div>
        </motion.div>

        {/* Industries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="section-eyebrow text-sky mb-5">Industries</p>
          <ul className="space-y-2.5">
            {industries.map((ind) => (
              <li key={ind.href}>
                <Link
                  href={ind.href}
                  className="text-sm text-navy-foreground/60 hover:text-navy-foreground transition-colors"
                >
                  {ind.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <p className="section-eyebrow text-sky mb-5">Services</p>
          <ul className="space-y-2.5">
            {services.map((s) => (
              <li key={s} className="text-sm text-navy-foreground/60">
                {s}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="section-eyebrow text-sky mb-5">Get in Touch</p>
          <p className="text-sm text-navy-foreground/60 leading-relaxed mb-5">
            24/7 emergency response available. Contact us for a consultation on your project requirements.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-navy-foreground/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-navy-foreground/55">
          <p>© {new Date().getFullYear()} Ocean Arms Technical Services LLC. All rights reserved.</p>
          <p>Dubai, United Arab Emirates</p>
        </div>
      </div>
    </footer>
  );
}
