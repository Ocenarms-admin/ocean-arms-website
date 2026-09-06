"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const prefersHover =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const NAV_LINKS: [string, string][] = [
  ["About", "/#about"],
  ["Industries", "/#industries"],
  ["Rope Access Service", "/#services"],
  ["Services", "/#why-us"],
];

export default function NavbarV2() {
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Contact / industry pages start on a light surface (no dark hero under the nav)
  const isLightPage =
    pathname.startsWith("/industries/") || pathname === "/contact";
  const isLight = isLightPage || pastHero;

  useEffect(() => {
    const onScroll = () =>
      setPastHero(window.scrollY > window.innerHeight - 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const linkColor = isLight ? "#3A5270" : "rgba(247,251,255,0.95)";
  const linkHoverColor = isLight ? "#0C2340" : "#F7FBFF";

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 80,
          display: "flex",
          alignItems: "center",
          background: isLight ? "#EBF4FA" : "transparent",
          transition: "background 0.4s ease",
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        }}
      >
        <div
          className="nt2-nav-inner"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            width: "100%",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="nt2-nav-logo"
              src={
                isLight
                  ? "/assets/o-a-logo-bg-rmd%20(1).png"
                  : "/assets/o-a-logo-bg-light.png"
              }
              alt="Ocean Arms Technical Services"
              style={{
                height: 62,
                width: "auto",
                objectFit: "contain",
                transition: "opacity 0.3s ease",
              }}
            />
          </Link>

          {/* Desktop links */}
          <div
            className="hidden lg:flex"
            style={{ gap: "2.2rem", alignItems: "center" }}
          >
            {NAV_LINKS.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="nt2-nav-links-text"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: linkColor,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = linkHoverColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = linkColor;
                }}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="nt2-nav-cta"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                background: isLight ? "#0C2340" : "rgba(255,255,255,0.15)",
                color: "white",
                border: isLight ? "none" : "1px solid rgba(255,255,255,0.3)",
                borderRadius: 9999,
                padding: "0.75rem 1.75rem",
                cursor: "pointer",
                transition: "background 0.2s, transform 0.15s",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#3580B1";
                if (prefersHover) e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isLight
                  ? "#0C2340"
                  : "rgba(255,255,255,0.15)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Request a Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              color: linkColor,
            }}
          >
            {mobileOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 80,
            left: 0,
            right: 0,
            zIndex: 40,
            background: "#EBF4FA",
            borderTop: "1px solid rgba(53,128,177,0.12)",
            boxShadow: "0 8px 24px rgba(12,35,64,0.1)",
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "1rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {NAV_LINKS.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#3A5270",
                  textDecoration: "none",
                  padding: "0.65rem 0.75rem",
                }}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}

            <Link
              href="/contact"
              style={{
                marginTop: "0.5rem",
                display: "block",
                background: "#0C2340",
                color: "white",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                borderRadius: 9999,
                padding: "0.85rem 1.5rem",
                textAlign: "center",
                textDecoration: "none",
              }}
              onClick={() => setMobileOpen(false)}
            >
              Request a Quote
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
