"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const industries = [
  { name: "Oil & Gas", href: "/industries/oil-and-gas" },
  { name: "Marine & Shipping", href: "/industries/marine-and-shipping" },
  { name: "Power & Energy", href: "/industries/power-and-energy" },
  { name: "Civil & Construction", href: "/industries/civil-and-construction" },
];

const prefersHover =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover)").matches;

export default function NavbarV2() {
  const [pastHero, setPastHero] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const pathname = usePathname();

  const isLightPage = pathname.startsWith("/industries/") || pathname === "/contact";

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight - 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileIndustriesOpen(false);
  }, [pathname]);

  const isLight = isLightPage || pastHero;
  const linkColor = isLight ? "#3A5270" : "rgba(247,251,255,0.85)";
  const linkHoverColor = isLight ? "#0C2340" : "#ffffff";

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 65,
          display: "flex",
          alignItems: "center",
          background: isLight ? "#ffffff" : "rgba(12,35,64,0.82)",
          transition: "background 0.4s ease",
          boxShadow: isLight
            ? "0 2px 12px rgba(0,0,0,0.06)"
            : "0 2px 12px rgba(0,0,0,0.15)",
        }}
      >
        <div
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
            style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/o-a-logo-bg-rmd (1).png"
              alt="Ocean Arms Technical Services"
              style={{ height: 62, width: "auto", objectFit: "contain" }}
            />
          </Link>

          {/* Desktop nav */}
          <div
            style={{
              display: "flex",
              gap: "2.2rem",
              alignItems: "center",
            }}
            className="hidden lg:flex"
          >
            {(
              [
                ["About", "/#about"],
                ["Services", "/#services"],
                ["Contact", "/contact"],
              ] as [string, string][]
            ).map(([label, href]) => (
              <Link
                key={label}
                href={href}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "0.7rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: linkColor,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = linkHoverColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = linkColor)
                }
              >
                {label}
              </Link>
            ))}

            {/* Industries dropdown */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setIndustriesOpen(true)}
              onMouseLeave={() => setIndustriesOpen(false)}
            >
              <button
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "0.7rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: linkColor,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: 0,
                }}
              >
                Industries
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  style={{
                    transition: "transform 0.2s",
                    transform: industriesOpen ? "rotate(180deg)" : "rotate(0deg)",
                    stroke: linkColor,
                  }}
                >
                  <path
                    d="M1 1l4 4 4-4"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {industriesOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 230,
                    background: "white",
                    border: "1px solid rgba(53,128,177,0.12)",
                    boxShadow: "0 8px 32px rgba(12,35,64,0.14)",
                    overflow: "hidden",
                  }}
                >
                  {industries.map((ind) => (
                    <Link
                      key={ind.href}
                      href={ind.href}
                      style={{
                        display: "block",
                        padding: "0.75rem 1.25rem",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.875rem",
                        fontWeight: 400,
                        color: "#3A5270",
                        textDecoration: "none",
                        transition: "background 0.15s, color 0.15s",
                        borderBottom: "1px solid rgba(53,128,177,0.06)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#EBF4FA";
                        e.currentTarget.style.color = "#0C2340";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#3A5270";
                      }}
                    >
                      {ind.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
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
                padding: "0.65rem 1.6rem",
                textDecoration: "none",
                transition: "background 0.2s, transform 0.15s",
                display: "inline-block",
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
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
            top: 65,
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
            {(
              [
                ["About", "/#about"],
                ["Services", "/#services"],
                ["Contact", "/contact"],
              ] as [string, string][]
            ).map(([label, href]) => (
              <Link
                key={label}
                href={href}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
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

            {/* Mobile industries */}
            <button
              onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#3A5270",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.65rem 0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                textAlign: "left",
              }}
            >
              Industries
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                style={{
                  transition: "transform 0.2s",
                  transform: mobileIndustriesOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <path
                  d="M1 1l4 4 4-4"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#3A5270"
                />
              </svg>
            </button>

            {mobileIndustriesOpen && (
              <div style={{ paddingLeft: "0.75rem" }}>
                {industries.map((ind) => (
                  <Link
                    key={ind.href}
                    href={ind.href}
                    style={{
                      display: "block",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      color: "#3A5270",
                      textDecoration: "none",
                      padding: "0.5rem 0.75rem",
                      opacity: 0.75,
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {ind.name}
                  </Link>
                ))}
              </div>
            )}

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
