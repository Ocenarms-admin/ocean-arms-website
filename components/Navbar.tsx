"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const industries = [
  { name: "Oil & Gas", href: "/industries/oil-and-gas" },
  { name: "Marine & Shipping", href: "/industries/marine-and-shipping" },
  { name: "Power & Energy", href: "/industries/power-and-energy" },
  { name: "Civil & Construction", href: "/industries/civil-and-construction" },
];

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setMobileIndustriesOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-navy"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="grid h-9 w-9 place-items-center bg-primary">
              <span className="font-display text-lg font-bold text-primary-foreground leading-none">OA</span>
            </div>
            <span className="block font-display text-lg font-bold uppercase tracking-wide text-navy-foreground">
              Ocean Arms Technical Services
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              href="/#about"
              className="text-sm font-medium text-navy-foreground/70 hover:text-navy-foreground transition-colors"
            >
              About
            </Link>

            {/* Industries dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-navy-foreground/70 hover:text-navy-foreground transition-colors">
                Industries
                <motion.span
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </motion.span>
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-card border border-border shadow-lift overflow-hidden"
                  >
                    {industries.map((ind) => (
                      <Link
                        key={ind.href}
                        href={ind.href}
                        className="block px-5 py-3 text-sm text-foreground hover:bg-sky-soft hover:text-navy transition-colors"
                      >
                        {ind.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/contact"
              className="text-sm font-medium text-navy-foreground/70 hover:text-navy-foreground transition-colors"
            >
              Contact
            </Link>

            <Link
              href="/contact"
              className="bg-primary px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Request a Quote
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-navy-foreground/70 hover:text-navy-foreground transition-colors p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[65px] left-0 right-0 z-40 bg-navy border-t border-navy-foreground/10"
          >
            <div className="mx-auto max-w-6xl px-5 py-4 flex flex-col gap-1">
              <Link
                href="/#about"
                className="px-3 py-2.5 text-sm font-medium text-navy-foreground/80 hover:text-navy-foreground transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>

              <button
                onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-navy-foreground/80 hover:text-navy-foreground transition-colors"
              >
                Industries
                <motion.span animate={{ rotate: mobileIndustriesOpen ? 180 : 0 }}>
                  <ChevronDown className="w-3.5 h-3.5" />
                </motion.span>
              </button>
              <AnimatePresence>
                {mobileIndustriesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="pl-3 overflow-hidden"
                  >
                    {industries.map((ind) => (
                      <Link
                        key={ind.href}
                        href={ind.href}
                        className="block px-3 py-2 text-sm text-navy-foreground/60 hover:text-navy-foreground transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {ind.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Link
                href="/contact"
                className="px-3 py-2.5 text-sm font-medium text-navy-foreground/80 hover:text-navy-foreground transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>

              <Link
                href="/contact"
                className="mt-2 block bg-primary px-5 py-3 text-center text-sm font-semibold uppercase tracking-wide text-primary-foreground"
                onClick={() => setMobileOpen(false)}
              >
                Request a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
