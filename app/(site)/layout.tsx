import type { Metadata } from "next";
import Script from "next/script";
import NavbarV2 from "@/components/NavbarV2";
import FooterV2 from "@/components/FooterV2";

export const metadata: Metadata = {
  title: "Ocean Arms Technical Services LLC — Industrial & Marine Solutions",
  description:
    "UAE-based integrated technical services across Oil & Gas, Marine, Power, and Civil sectors. IRATA certified rope access, inspection, and maintenance throughout the GCC.",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Montserrat:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Instrument+Serif:ital@0;1&display=swap"
        rel="stylesheet"
      />
      <NavbarV2 />
      {children}
      <FooterV2 />
      <Script
        src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"
        strategy="afterInteractive"
      />
    </>
  );
}
