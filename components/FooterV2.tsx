"use client";

import Link from "next/link";

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function FooterV2() {
  return (
    <footer style={{ background: "#0C2340", color: "#FAFAFA", padding: "5rem 0 3rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: "3rem",
            paddingBottom: "4rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]"
        >
          {/* Brand */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/o-a-logo-bg-rmd (1).png"
              alt="Ocean Arms Technical Services"
              style={{
                height: 48,
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
                margin: "0 0 1.75rem",
              }}
            >
              UAE-based integrated technical services for Oil &amp; Gas, Marine,
              Power, and Civil sectors across the GCC region.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { Icon: InstagramIcon, href: "#", label: "Instagram" },
                { Icon: LinkedInIcon, href: "#", label: "LinkedIn" },
                { Icon: TwitterIcon, href: "#", label: "Twitter" },
                { Icon: FacebookIcon, href: "#", label: "Facebook" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    color: "rgba(250,250,250,0.6)",
                    transition: "border-color 0.2s, background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#80B8D8";
                    e.currentTarget.style.background = "rgba(128,184,216,0.1)";
                    e.currentTarget.style.color = "#FAFAFA";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(250,250,250,0.6)";
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {(
            [
              [
                "Services",
                [
                  ["Rope Access", "#"],
                  ["Blasting & Painting", "#"],
                  ["Industrial Cleaning", "#"],
                  ["Hydro Blasting", "#"],
                ],
              ],
              [
                "Industries",
                [
                  ["Oil & Gas", "/industries/oil-and-gas"],
                  ["Marine & Shipping", "/industries/marine-and-shipping"],
                  ["Power & Energy", "/industries/power-and-energy"],
                  ["Civil & Construction", "/industries/civil-and-construction"],
                ],
              ],
              [
                "Company",
                [
                  ["About Us", "/#about"],
                  ["Certifications", "/#certifications"],
                  ["FAQ", "/#faq"],
                  ["Contact Us", "/contact"],
                ],
              ],
            ] as [string, [string, string][]][]
          ).map(([heading, links]) => (
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
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#FAFAFA")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(250,250,250,0.6)")
                      }
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
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
            © {new Date().getFullYear()} Ocean Arms Technical Services LLC. All
            rights reserved. Dubai, UAE.
          </p>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 300,
                    fontSize: "0.78rem",
                    color: "rgba(250,250,250,0.35)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgba(250,250,250,0.6)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(250,250,250,0.35)")
                  }
                >
                  {link}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
