"use client";

import Link from "next/link";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/oceanarmsllc/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    label: "Facebook",
    href: "#",
    path: "M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ocean-arms-technical-services-llc/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "X",
    href: "#",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.717-8.819L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z",
  },
];

const LINK_COLS: [string, [string, string][]][] = [
  [
    "Explore",
    [
      ["About", "/#about"],
      ["Industries", "/#industries"],
      ["Rope Access Service", "/#services"],
      ["Services", "/#why-us"],
      ["Contact", "/contact"],
    ],
  ],
  [
    "Industries",
    [
      ["Oil & Gas", "/industries/oil-and-gas"],
      ["Marine & Shipping", "/industries/marine-and-shipping"],
      ["Power & Energy", "/industries/power-and-energy"],
      ["Civil & Construction", "/industries/civil-and-construction"],
      ["Ship Designing", "/industries/ship-designing"],
    ],
  ],
];

export default function FooterV2() {
  return (
    <footer
      style={{ background: "#0C2340", color: "#FAFAFA", padding: "5rem 0 3rem" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Top — matches /new-temp-2 footer */}
        <div
          className="nt2-footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr",
            gap: "3rem",
            paddingBottom: "4rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Brand */}
          <div className="nt2-footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/o-a-logo-bg-light.png"
              alt="Ocean Arms Technical Services"
              style={{
                height: 68,
                width: "auto",
                objectFit: "contain",
                marginBottom: "1.25rem",
                display: "block",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontSize: "0.88rem",
                lineHeight: 1.7,
                color: "rgba(250,250,250,0.6)",
                maxWidth: 280,
                margin: "0 0 1.25rem",
              }}
            >
              UAE-based integrated technical services for Oil & Gas, Marine,
              Power, and Civil sectors across the GCC region.
            </p>

            {/* Branches */}
            <div style={{ marginBottom: "1.75rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "0.62rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#80B8D8",
                  margin: "0 0 0.65rem",
                }}
              >
                Branches
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.45rem",
                }}
              >
                {[
                  { city: "Dubai", note: "HQ" },
                  { city: "Mumbai", note: null },
                  { city: "Cochin", note: null },
                ].map(({ city, note }) => (
                  <span
                    key={city}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 400,
                      fontSize: "0.78rem",
                      color: "#FFFFFF",
                      border: "1px solid rgba(255,255,255,0.85)",
                      borderRadius: 9999,
                      padding: "0.35rem 0.75rem",
                      background: "rgba(255,255,255,0.04)",
                    }}
                  >
                    {city}
                    {note ? (
                      <span
                        style={{
                          marginLeft: 6,
                          fontSize: "0.65rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "#FFFFFF",
                        }}
                      >
                        {note}
                      </span>
                    ) : null}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              {SOCIALS.map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    transition: "border-color 0.2s, background 0.2s, color 0.2s",
                    color: "rgba(250,250,250,0.65)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#80B8D8";
                    e.currentTarget.style.background = "rgba(128,184,216,0.1)";
                    e.currentTarget.style.color = "#FAFAFA";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(250,250,250,0.65)";
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {LINK_COLS.map(([heading, links]) => (
            <div key={heading}>
              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#80B8D8",
                  margin: "0 0 1.5rem",
                }}
              >
                {heading}
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 300,
                        fontSize: "0.88rem",
                        color: "rgba(250,250,250,0.6)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#FAFAFA";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "rgba(250,250,250,0.6)";
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="nt2-footer-bottom"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "0.8rem",
              color: "rgba(250,250,250,0.35)",
              margin: 0,
            }}
          >
            © 2026 Ocean Arms Technical Services LLC. All rights reserved.
            Dubai, UAE.
          </p>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media (max-width: 768px) {
          .nt2-footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem 1.25rem !important;
          }
          .nt2-footer-brand { grid-column: 1 / -1 !important; }
          .nt2-footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.85rem !important;
          }
          .nt2-footer-legal { gap: 1rem !important; flex-wrap: wrap !important; }
        }
        @media (max-width: 480px) {
          .nt2-footer-grid { grid-template-columns: 1fr !important; }
        }
      `,
        }}
      />
    </footer>
  );
}
